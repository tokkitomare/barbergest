use axum::extract::Path;
use axum::{Extension, Json};
use axum::http::StatusCode;
use futures::future::join_all;
use migration::Expr;
use sea_orm::{EntityTrait, QueryFilter};
use sea_orm::{ActiveValue::Set, DatabaseConnection, ActiveModelTrait};
use entity::user;
use uuid::Uuid;

use crate::models::user_models::{DeleteUserModel, UpdateUserModel, UpdateUserResponseModel, UserModel};
use crate::utils::api_error::APIErr;

pub async fn update_user(
    Extension(db): Extension<DatabaseConnection>,
    Path(uuid): Path<Uuid>,
    Json(payload): Json<UpdateUserModel>
) -> Result<Json<UpdateUserResponseModel>, APIErr> {
    let mut user: user::ActiveModel = user::Entity::find()
        .filter(Expr::col(user::Column::Uuid).eq(uuid))
        .one(&db)
        .await
        .map_err(|e| {
            APIErr {
                message: e.to_string(),
                status_code: StatusCode::INTERNAL_SERVER_ERROR,
                error_code: Some(50),
            }
        })?
        .ok_or(APIErr {
            message: "User not found.".to_owned(),
            status_code: StatusCode::NOT_FOUND,
            error_code: Some(44)
        })?
        .into();

    user.name = Set(payload.name);
    user.update(&db).await
        .map_err(|e| {
            APIErr {
                message: e.to_string(),
                status_code: StatusCode::INTERNAL_SERVER_ERROR,
                error_code: Some(50),
            }
        })?;

    Ok(Json(UpdateUserResponseModel { message: "User name updated!".to_owned() }))
}

pub async fn delete_user(
    Extension(db): Extension<DatabaseConnection>,
    Path(uuid): Path<Uuid>
) -> Result<Json<DeleteUserModel>, APIErr> {
    let user = user::Entity::find()
        .filter(Expr::col(user::Column::Uuid).eq(uuid))
        .one(&db)
        .await
        .map_err(|e| {
            APIErr {
                message: e.to_string(),
                status_code: StatusCode::INTERNAL_SERVER_ERROR,
                error_code: Some(50),
            }
        })?
        .ok_or(APIErr {
            message: "User not found.".to_owned(),
            status_code: StatusCode::NOT_FOUND,
            error_code: Some(44)
        })?;

    user::Entity::delete_by_id(user.id)
        .exec(&db)
        .await
        .map_err(|e| {
            APIErr {
                message: e.to_string(),
                status_code: StatusCode::INTERNAL_SERVER_ERROR,
                error_code: Some(50),
            }
        })?;

    Ok(Json(DeleteUserModel { message: "Deleted!".to_owned() }))
}

pub async fn delete_all_users(
    Extension(db): Extension<DatabaseConnection>,
) -> Result<Json<DeleteUserModel>, APIErr> {
    let users = user::Entity::find()
        .all(&db)
        .await
        .map_err(|e| APIErr {
            message: e.to_string(),
            status_code: StatusCode::INTERNAL_SERVER_ERROR,
            error_code: Some(50),
        })
        .map_err(|_| APIErr {
            message: "No users in DB.".to_owned(),
            status_code: StatusCode::NOT_FOUND,
            error_code: Some(44),
        })?;

    let deleted = users.into_iter().map(|u| {
        user::Entity::delete_by_id(u.id).exec(&db)
    });

    join_all(deleted).await;

    Ok(Json(DeleteUserModel { message: "All users got deleted!".to_owned() }))
}

pub async fn fetch_all_users(
    Extension(db): Extension<DatabaseConnection>,
) -> Result<Json<Vec<UserModel>>, APIErr> {
    let users = user::Entity::find()
        .all(&db)
        .await
        .map_err(|e| {
            APIErr {
                message: e.to_string(),
                status_code: StatusCode::INTERNAL_SERVER_ERROR,
                error_code: Some(50),
            }
        })?
        .into_iter()
        .map(|data| UserModel {
            name: data.name,
            email: data.email,
            password: data.password,
            is_client: data.is_client,
            is_active: data.is_active,
            uuid: data.uuid,
            created_at: data.created_at,
        })
        .collect::<Vec<UserModel>>();

    Ok(Json(users))
}
