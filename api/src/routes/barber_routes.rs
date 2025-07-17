use axum::{http::{Method, StatusCode}, middleware, routing::get, Router};
use tower_http::cors::{Any, CorsLayer};
use crate::utils::guards::verify_auth;

pub fn barber_routes() -> Router {
    let cors = CorsLayer::new()
        .allow_methods([Method::GET, Method::DELETE, Method::PUT])
        .allow_origin(Any);

    Router::new()
        .nest("/barber", 
            Router::new()
                .route("/dashboard", get(async || StatusCode::OK))
        )
        .nest("/client", 
            Router::new()
                .route("/dashboard", get(async || StatusCode::OK))
        )
        .route_layer(middleware::from_fn(verify_auth))
        .layer(cors)
}