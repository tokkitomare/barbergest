use axum::{Extension, Json};
use axum::http::StatusCode;
use bcrypt::{verify, DEFAULT_COST};
use chrono::Utc;
use migration::Expr;
use sea_orm::{Condition, EntityTrait, QueryFilter};
use sea_orm::{ActiveValue::Set, DatabaseConnection, ActiveModelTrait};
use entity::user;
use uuid::Uuid;

use crate::models::user_models::{CreateUserModel, CreateUserResponseModel, LoginUserModel, LoginUserResponseModel};
use crate::utils::api_error::APIErr;
use crate::utils::jwt::encode_jwt;

pub async fn create_user(
    Extension(db): Extension<DatabaseConnection>,
    Json(payload): Json<CreateUserModel>,
) -> Result<Json<CreateUserResponseModel>, APIErr> {
    let user = user::Entity::find()
        .filter(Expr::col(user::Column::Email).eq(payload.email.clone()))
        .one(&db)
        .await
        .map_err(|e| {
            APIErr {
                message: e.to_string(),
                status_code: StatusCode::INTERNAL_SERVER_ERROR,
                error_code: Some(50),
            }
        })?;

    if user.is_some() {
        return Err(APIErr {
            message: "User already exists.".to_owned(),
            status_code: StatusCode::CONFLICT,
            error_code: Some(49)
        });
    }

    println!("n: {} e: {} s: {}, c: {}", payload.name, payload.email, payload.password, payload.is_client);

    let user_model = user::ActiveModel {
        name: Set(payload.name.to_owned()),
        email: Set(payload.email.to_owned()),
        password: Set(bcrypt::hash(payload.password.to_owned(), DEFAULT_COST)
            .map_err(|e| APIErr {
                message: e.to_string(),
                status_code: StatusCode::INTERNAL_SERVER_ERROR,
                error_code: Some(50),
            })?),
        is_client: Set(payload.is_client),
        uuid: Set(Uuid::new_v4()),
        created_at: Set(Utc::now().naive_utc()),
        ..Default::default()
    };

    user_model.insert(&db).await
        .map_err(|e| {
            APIErr {
                message: e.to_string(),
                status_code: StatusCode::INTERNAL_SERVER_ERROR,
                error_code: Some(50),
            }
        })?;

    Ok(Json(CreateUserResponseModel { message: "User created successfully!".to_owned() }))
}

pub async fn login_user(
    Extension(db): Extension<DatabaseConnection>,
    Json(payload): Json<LoginUserModel>,
) -> Result<Json<LoginUserResponseModel>, APIErr> {
    let user = user::Entity::find()
        .filter(
            Condition::all()
                .add(Expr::col(user::Column::Email).eq(payload.email))
        ).one(&db)
        .await
        .map_err(|e| {
            APIErr {
                message: e.to_string(),
                status_code: StatusCode::INTERNAL_SERVER_ERROR,
                error_code: Some(50),
            }
        })?
        .ok_or(APIErr {
            message: "User doesn't exists. Email or password incorrect.".to_owned(),
            status_code: StatusCode::NOT_FOUND,
            error_code: Some(44)
        })?;

    if !verify(&payload.password, &user.password)
        .map_err(|e| APIErr { 
            message: e.to_string(), 
            status_code: StatusCode::INTERNAL_SERVER_ERROR, 
            error_code: Some(50) 
        })? {
            return Err(APIErr {
                message: "User doesn't exists. Email or password incorrect.".to_owned(),
                status_code: StatusCode::NOT_FOUND,
                error_code: Some(44)
            });
        }

    let token = encode_jwt(user.email, user.is_client)
        .map_err(|_| APIErr {
            message: "Failed to login".to_owned(),
            status_code: StatusCode::UNAUTHORIZED,
            error_code: Some(41)
        })?;

    Ok(Json(LoginUserResponseModel { token }))
}
