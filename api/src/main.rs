use api::{routes::{admin_routes::admin_routes, barber_routes::barber_routes, user_routes::user_routes}, utils::{constants::DATABASE_URL, guards::guard}};
use axum::{self, http::HeaderValue, middleware, Extension, Router};
use tower_http::cors::{Any, CorsLayer};
use anyhow::Error;

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing_subscriber::fmt::init();
    
    let db_url = (*DATABASE_URL).clone();
    let db = sea_orm::Database::connect(db_url).await?;

    let cors = CorsLayer::new()
        .allow_origin("http://localhost:5173".parse::<HeaderValue>()?)
        .allow_methods(Any)
        .allow_headers(Any);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await?;
    println!("Server running on: http://localhost:3000");
    
    let app = Router::new()
        .merge(admin_routes())
        .route_layer(middleware::from_fn(guard))
        .merge(barber_routes())
        .route_layer(middleware::from_fn(f))
        .merge(user_routes())
        .layer(cors)
        .layer(Extension(db));

    axum::serve(listener, app).await?;

    Ok(())
}
