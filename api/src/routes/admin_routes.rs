use axum::{http::Method, middleware, routing::{delete, get, put}, Router};
use tower_http::cors::{Any, CorsLayer};
use crate::{handlers::admin_handlers::*, utils::guards::guard};

pub fn admin_routes() -> Router {
    let cors = CorsLayer::new()
        .allow_methods([Method::GET, Method::DELETE, Method::PUT])
        .allow_origin(Any);

    Router::new()
        .route("/user/{uuid}/update", put(update_user))
        .route("/user/all/delete", delete(delete_all_users))
        .route("/user/{uuid}/delete", delete(delete_user))
        .route("/user/all", get(fetch_all_users))
        .route_layer(middleware::from_fn(guard))
        .layer(cors)
}