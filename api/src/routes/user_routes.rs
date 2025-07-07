use axum::{http::{HeaderValue, Method, header}, routing::post, Router};
use tower_http::cors::CorsLayer;
use crate::handlers::user_handlers::*;

pub fn user_routes() -> Router {
    let cors = CorsLayer::new()
        .allow_methods([Method::POST, Method::OPTIONS])
        .allow_origin("http://localhost:5173".parse::<HeaderValue>().unwrap())
        .allow_headers([header::CONTENT_TYPE, header::AUTHORIZATION])
        .allow_credentials(true);

    Router::new()
        .route("/user/register", post(create_user))
        .route("/user/login", post(login_user))
        .layer(cors)
}