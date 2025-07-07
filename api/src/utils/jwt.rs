use chrono::{Duration, Utc};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, TokenData, Validation};
use serde::{Deserialize, Serialize};
use axum::http::StatusCode;

use crate::utils::constants;

#[derive(Serialize, Deserialize)]
pub struct Claims {
    pub exp: u64,
    pub iat: u64,
    pub is_client: bool,
    pub email: String,
}

pub fn encode_jwt(email: String, is_client: bool) -> Result<String, StatusCode> {
    let now = Utc::now();
    let expire = Duration::days(30);

    let claims = Claims { 
        exp: (now+expire).timestamp() as u64, 
        iat: now.timestamp() as u64, 
        email, 
        is_client,
    };
    let secret = (*constants::TOKEN).clone();

    encode(
        &Header::default(), 
        &claims, 
        &EncodingKey::from_secret(secret.as_ref())
    )
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)
}

pub fn decode_jwt(jwt: String) -> Result<TokenData<Claims>, StatusCode> {
    let secret = (*constants::TOKEN).clone();

    decode(
        &jwt, 
        &DecodingKey::from_secret(secret.as_ref()), 
        &Validation::default()
    )
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)
}