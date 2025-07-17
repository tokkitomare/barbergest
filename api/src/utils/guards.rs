use axum::{extract::Request, http::StatusCode, middleware::Next, response::Response};
use axum_extra::headers::{HeaderMapExt, Authorization, authorization::Bearer};
use entity::user;
use migration::Expr;
use sea_orm::{DatabaseConnection, EntityTrait, QueryFilter};

use crate::utils::{api_error::APIErr, jwt::decode_jwt};

pub async fn guard(mut req: Request, next: Next) -> Result<Response, APIErr> {
    let token = req.headers()
        .typed_get::<Authorization<Bearer>>()
        .ok_or(APIErr {
            message: "No auth token found".to_owned(),
            status_code: StatusCode::BAD_REQUEST,
            error_code: Some(40)
        })?
        .token()
        .to_owned();

    let claim = decode_jwt(token)
        .map_err(|_| APIErr { 
            message: "Unauthorized.".to_owned(), 
            status_code: StatusCode::UNAUTHORIZED, 
            error_code: Some(41) 
        })?.claims;

    let db = req.extensions().get::<DatabaseConnection>()
        .ok_or(APIErr {
            message: "Can't connect to database.".to_owned(),
            status_code: StatusCode::INTERNAL_SERVER_ERROR,
            error_code: Some(50),
        })?;

    let identity = user::Entity::find()
        .filter(Expr::col(user::Column::Email).eq(claim.email.to_lowercase()))
        .one(db)
        .await
        .map_err(|e| APIErr {
            message: e.to_string(),
            status_code: StatusCode::INTERNAL_SERVER_ERROR,
            error_code: Some(50)
        })?
        .ok_or(APIErr {
            message: "Unauthorized.".to_owned(), 
            status_code: StatusCode::UNAUTHORIZED, 
            error_code: Some(41) 
        })?;

    req.extensions_mut().insert(identity);

    Ok(next.run(req).await)
}

pub async fn verify_auth(req: Request, next: Next) -> Result<Response, APIErr> {
    let token = req.headers()
        .typed_get::<Authorization<Bearer>>()
        .ok_or(APIErr {
            message: "No auth token found".to_owned(),
            status_code: StatusCode::BAD_REQUEST,
            error_code: Some(40)
        })?
        .token()
        .to_owned();

    let claim = decode_jwt(token)
        .map_err(|_| APIErr {
            message: "Unauthorized.".to_owned(), 
            status_code: StatusCode::UNAUTHORIZED, 
            error_code: Some(41) 
        })?.claims;

    let db = req.extensions().get::<DatabaseConnection>()
        .ok_or(APIErr {
            message: "Can't connect to database.".to_owned(),
            status_code: StatusCode::INTERNAL_SERVER_ERROR,
            error_code: Some(50),
        })?;

    let identity = user::Entity::find()
        .filter(Expr::col(user::Column::IsClient).eq(claim.is_client))
        .one(db)
        .await
                .map_err(|e| APIErr {
            message: e.to_string(),
            status_code: StatusCode::INTERNAL_SERVER_ERROR,
            error_code: Some(50)
        })?
        .ok_or(
            APIErr::err("Unauthorized", StatusCode::UNAUTHORIZED, 41)
        )?;
    
    match req.uri().path() {
        "/barber/dashboard" => {
            if !identity.is_client {
                return Ok(next.run(req).await);
            } else {
                Err(APIErr::err("Forbidden", StatusCode::FORBIDDEN, 43))
            }
        },
        "/client/dashboard" => {
            if identity.is_client {
                return Ok(next.run(req).await);
            } else {
                Err(APIErr::err("Forbidden", StatusCode::FORBIDDEN, 43))
            }
        }
        _ => Ok(next.run(req).await),
    }
}