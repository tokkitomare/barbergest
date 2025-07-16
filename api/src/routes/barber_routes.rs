use axum::{http::Method, routing::{delete, get, put}, Router};
use tower_http::cors::{Any, CorsLayer};
use crate::handlers::admin_handlers::*;

pub fn barber_routes() -> Router {
    let cors = CorsLayer::new()
        .allow_methods([Method::GET, Method::DELETE, Method::PUT])
        .allow_origin(Any);

    Router::new()
        
        .layer(cors)
}