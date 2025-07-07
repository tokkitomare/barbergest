use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Deserialize, Serialize, Clone)]
pub struct UserModel {
    pub name: String,
    pub email: String,
    pub password: String,
    pub is_client: bool,
    pub is_active: bool,
    pub uuid: Uuid,
    pub created_at: NaiveDateTime,
}

#[derive(Deserialize, Serialize)]
pub struct CreateUserModel {
    pub name: String,
    pub email: String,
    pub password: String,
    pub is_client: bool,
}

#[derive(Deserialize, Serialize)]
pub struct CreateUserResponseModel {
    pub message: String,
}

#[derive(Deserialize, Serialize)]
pub struct LoginUserModel {
    pub email: String,
    pub password: String,
}

#[derive(Deserialize, Serialize)]
pub struct LoginUserResponseModel {
    pub token: String,
}

#[derive(Deserialize, Serialize)]
pub struct UpdateUserModel {
    pub name: String,
}

#[derive(Deserialize, Serialize)]
pub struct UpdateUserResponseModel {
    pub message: String,
}

#[derive(Deserialize, Serialize)]
pub struct DeleteUserModel {
    pub message: String,
}
