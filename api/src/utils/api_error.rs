use axum::{http::{header, StatusCode}, response::IntoResponse, Json};
use serde_json::json;

#[derive(Debug)]
pub struct APIErr {
    pub message: String,
    pub status_code: StatusCode,
    pub error_code: Option<i8>,
}

impl IntoResponse for APIErr {
    fn into_response(self) -> axum::response::Response {
        let status_code = self.status_code;
        (status_code, [(header::CONTENT_TYPE, "application/json")], Json(json!({
            "status_code": self.status_code.as_u16(),
            "error_code": self.error_code,
            "message": self.message
        }))).into_response()
    }
}