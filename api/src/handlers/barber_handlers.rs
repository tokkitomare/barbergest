use axum::{extract::Path, http::StatusCode, Extension, Json};
use chrono::{NaiveDateTime, Utc};
use sea_orm::{prelude::Decimal, ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait};
use serde::{Deserialize, Serialize};
use serde_json::{to_value, Value};
use uuid::Uuid;

use crate::utils::api_error::APIErr;

#[derive(Deserialize, Serialize)]
struct ClientsPayload {
    name: String,
    phone: String,
}

#[derive(Deserialize, Serialize)]
struct StaffPayload {
    name: String,
    role: String,
    phone: String,
}

#[derive(Deserialize, Serialize)]
struct ServicesPayload {
    name: String,
    description: Option<String>,
    price: Decimal,
}

#[derive(Deserialize, Serialize)]
struct AppointmentsPayload {
    client_id: i32,
    staff_id: i32,
    service_id: i32,
    date_time: NaiveDateTime,
    status: String,
}

#[derive(Deserialize, Serialize)]
struct PaymentsPayload {
    appointment_id: i32,
    amount: Decimal,
    payment_method: String,
}

#[derive(Deserialize, Serialize)]
struct ProductsPayload {
    name: String,
    description: Option<String>,
    price: Decimal,
    stock: i32,
}

#[derive(Deserialize, Serialize)]
struct CashRegisterPayload {
    opened_at: NaiveDateTime,
    closed_at: Option<NaiveDateTime>,
    initial_balance: Decimal,
    final_balance: Option<Decimal>,
}

#[derive(Deserialize, Serialize)]
struct ReportsPayload {
    start_date: NaiveDateTime,
    end_date: NaiveDateTime,
    report_type: String,
    file_path: String,
}

#[derive(Deserialize, Serialize)]
struct ClientAppointmentsPayload {
    client_id: i32,
    available_days: String,
    preferred_hours: String,
}

#[axum_macros::debug_handler]
pub async fn add_event(
    Path(name): Path<String>,
    Extension(db): Extension<DatabaseConnection>,
    Json(payload): Json<Value>,
) -> Result<StatusCode, APIErr> {
    match name.as_str() {
        "clients" => {
            let data: ClientsPayload = serde_json::from_value(payload)
                .map_err(|e| APIErr::err(
                    e.to_string().as_str(), StatusCode::BAD_REQUEST, 40
                ))?;
            let model = entity::clients::ActiveModel {
                name: Set(data.name),
                phone: Set(data.phone),
                ..Default::default()
            };
            
            model.insert(&db)
                .await
                .map_err(|e| APIErr::err(e.to_string().as_str(), StatusCode::INTERNAL_SERVER_ERROR, 50))?;
        },
        "staff" => {
            let data: StaffPayload = serde_json::from_value(payload)
                .map_err(|e| APIErr::err(
                    e.to_string().as_str(), StatusCode::BAD_REQUEST, 40
                ))?;
            let model = entity::staff::ActiveModel {
                name: Set(data.name),
                uuid: Set(Uuid::new_v4()),
                role: Set(data.role),
                phone: Set(data.phone),
                ..Default::default()
            };
            
            model.insert(&db)
                .await
                .map_err(|e| APIErr::err(e.to_string().as_str(), StatusCode::INTERNAL_SERVER_ERROR, 50))?;
        },
        "services" => {
            let data: ServicesPayload = serde_json::from_value(payload)
                .map_err(|e| APIErr::err(
                    e.to_string().as_str(), StatusCode::BAD_REQUEST, 40
                ))?;
            let model = entity::services::ActiveModel {
                name: Set(data.name),
                description: Set(data.description.unwrap_or_else(|| "Sem descrição".to_owned())),
                price: Set(data.price),
                ..Default::default()
            };
            
            model.insert(&db)
                .await
                .map_err(|e| APIErr::err(e.to_string().as_str(), StatusCode::INTERNAL_SERVER_ERROR, 50))?;
        },
        "appointments" => {
            let data: AppointmentsPayload = serde_json::from_value(payload)
                .map_err(|e| APIErr::err(
                    e.to_string().as_str(), StatusCode::BAD_REQUEST, 40
                ))?;
            let model = entity::appointments::ActiveModel {
                client_id: Set(data.client_id),
                staff_id: Set(data.staff_id),
                service_id: Set(data.service_id),
                date_time: Set(data.date_time),
                status: Set(data.status),
                ..Default::default()
            };
            
            model.insert(&db)
                .await
                .map_err(|e| APIErr::err(e.to_string().as_str(), StatusCode::INTERNAL_SERVER_ERROR, 50))?;
        },
        "payments" => {
            let data: PaymentsPayload = serde_json::from_value(payload)
                .map_err(|e| APIErr::err(
                    e.to_string().as_str(), StatusCode::BAD_REQUEST, 40
                ))?;
            let model = entity::payments::ActiveModel {
                appointment_id: Set(data.appointment_id),
                amount: Set(data.amount),
                payment_method: Set(data.payment_method),
                ..Default::default()
            };
            
            model.insert(&db)
                .await
                .map_err(|e| APIErr::err(e.to_string().as_str(), StatusCode::INTERNAL_SERVER_ERROR, 50))?;
        },
        "products" => {
            let data: ProductsPayload = serde_json::from_value(payload)
                .map_err(|e| APIErr::err(
                    e.to_string().as_str(), StatusCode::BAD_REQUEST, 40
                ))?;
            let model = entity::products::ActiveModel {
                name: Set(data.name),
                description: Set(data.description.unwrap_or_else(|| "Sem descrição".to_owned())),
                price: Set(data.price),
                stock: Set(data.stock),
                ..Default::default()
            };
            
            model.insert(&db)
                .await
                .map_err(|e| APIErr::err(e.to_string().as_str(), StatusCode::INTERNAL_SERVER_ERROR, 50))?;
        },
        "cash_register" => {
            let data: CashRegisterPayload = serde_json::from_value(payload)
                .map_err(|e| APIErr::err(
                    e.to_string().as_str(), StatusCode::BAD_REQUEST, 40
                ))?;
            let model = entity::cash_register::ActiveModel {
                opened_at: Set(data.opened_at),
                closed_at: Set(data.closed_at.unwrap_or_else(|| Utc::now().naive_utc())),
                initial_balance: Set(data.initial_balance),
                final_balance: Set(data.final_balance.unwrap_or_else(|| Decimal::new(0, 0))),
                ..Default::default()
            };
            
            model.insert(&db)
                .await
                .map_err(|e| APIErr::err(e.to_string().as_str(), StatusCode::INTERNAL_SERVER_ERROR, 50))?;
        },
        "reports" => {
            let data: ReportsPayload = serde_json::from_value(payload)
                .map_err(|e| APIErr::err(
                    e.to_string().as_str(), StatusCode::BAD_REQUEST, 40
                ))?;
            let model = entity::reports::ActiveModel {
                start_date: Set(data.start_date),
                end_date: Set(data.end_date),
                report_type: Set(data.report_type),
                file_path: Set(data.file_path),
                ..Default::default()
            };
            
            model.insert(&db)
                .await
                .map_err(|e| APIErr::err(e.to_string().as_str(), StatusCode::INTERNAL_SERVER_ERROR, 50))?;
        },
        "client_appointments" => {
            let data: ClientAppointmentsPayload = serde_json::from_value(payload)
                .map_err(|e| APIErr::err(
                    e.to_string().as_str(), StatusCode::BAD_REQUEST, 40
                ))?;
            let model = entity::client_appointments::ActiveModel {
                client_id: Set(data.client_id),
                available_days: Set(data.available_days),
                preferred_hours: Set(data.preferred_hours),
                ..Default::default()
            };
            
            model.insert(&db)
                .await
                .map_err(|e| APIErr::err(e.to_string().as_str(), StatusCode::INTERNAL_SERVER_ERROR, 50))?;
        },
        _ => {
            return Err(APIErr::err("Entity type no supported", StatusCode::BAD_REQUEST, 40));
        }
    }

    Ok(StatusCode::OK)
}


pub async fn view_events(
    Path(name): Path<String>,
    Extension(db): Extension<DatabaseConnection>,
) -> Result<Json<Value>, APIErr> {
    match name.as_str() {
        "clients" => {
            let data = entity::clients::Entity::find()
                .one(&db)
                .await
                .map_err(|e| APIErr::err(&e.to_string(), 
                StatusCode::INTERNAL_SERVER_ERROR, 50))?
                .ok_or(APIErr::err("No clients", StatusCode::NOT_FOUND, 44))?;

                let payload = ClientsPayload {
                    name: data.name,
                    phone: data.phone,
                };

                let value = to_value(payload)
                    .map_err(|e| APIErr::err(&e.to_string(), StatusCode::INTERNAL_SERVER_ERROR, 50))?;

                return Ok(Json(value));
        },
        "staff" => {
            let data = entity::staff::Entity::find()
                .one(&db)
                .await
                .map_err(|e| APIErr::err(&e.to_string(), 
                StatusCode::INTERNAL_SERVER_ERROR, 50))?
                .ok_or(APIErr::err("No staff", StatusCode::NOT_FOUND, 44))?;

                let payload = StaffPayload {
                    name: data.name,
                    role: data.role,
                    phone: data.phone,
                };

                let value = to_value(payload)
                    .map_err(|e| APIErr::err(&e.to_string(), StatusCode::INTERNAL_SERVER_ERROR, 50))?;

                return Ok(Json(value));
        },
        "services" => {
            let data = entity::services::Entity::find()
                .one(&db)
                .await
                .map_err(|e| APIErr::err(&e.to_string(), 
                StatusCode::INTERNAL_SERVER_ERROR, 50))?
                .ok_or(APIErr::err("No services", StatusCode::NOT_FOUND, 44))?;

                let payload = ServicesPayload {
                    name: data.name,
                    description: Some(data.description),
                    price: data.price,
                };

                let value = to_value(payload)
                    .map_err(|e| APIErr::err(&e.to_string(), StatusCode::INTERNAL_SERVER_ERROR, 50))?;

                return Ok(Json(value));
        },
        "appointments" => {
            let data = entity::appointments::Entity::find()
                .one(&db)
                .await
                .map_err(|e| APIErr::err(&e.to_string(), 
                StatusCode::INTERNAL_SERVER_ERROR, 50))?
                .ok_or(APIErr::err("No appointments", StatusCode::NOT_FOUND, 44))?;

                let payload = AppointmentsPayload {
                    client_id: data.client_id,
                    staff_id: data.staff_id,
                    service_id: data.service_id,
                    date_time: data.date_time,
                    status: data.status,
                };

                let value = to_value(payload)
                    .map_err(|e| APIErr::err(&e.to_string(), StatusCode::INTERNAL_SERVER_ERROR, 50))?;

                return Ok(Json(value));
        },
        "payments" => {
            let data = entity::payments::Entity::find()
                .one(&db)
                .await
                .map_err(|e| APIErr::err(&e.to_string(), 
                StatusCode::INTERNAL_SERVER_ERROR, 50))?
                .ok_or(APIErr::err("No payments", StatusCode::NOT_FOUND, 44))?;

                let payload = PaymentsPayload {
                    appointment_id: data.appointment_id,
                    amount: data.amount,
                    payment_method: data.payment_method,
                };

                let value = to_value(payload)
                    .map_err(|e| APIErr::err(&e.to_string(), StatusCode::INTERNAL_SERVER_ERROR, 50))?;

                return Ok(Json(value));
        },
        "products" => {
            let data = entity::products::Entity::find()
                .one(&db)
                .await
                .map_err(|e| APIErr::err(&e.to_string(), 
                StatusCode::INTERNAL_SERVER_ERROR, 50))?
                .ok_or(APIErr::err("No products", StatusCode::NOT_FOUND, 44))?;

                let payload = ProductsPayload {
                    name: data.name,
                    description: Some(data.description),
                    price: data.price,
                    stock: data.stock,
                };

                let value = to_value(payload)
                    .map_err(|e| APIErr::err(&e.to_string(), StatusCode::INTERNAL_SERVER_ERROR, 50))?;

                return Ok(Json(value));
        },
        "cash_register" => {
            let data = entity::cash_register::Entity::find()
                .one(&db)
                .await
                .map_err(|e| APIErr::err(&e.to_string(), 
                StatusCode::INTERNAL_SERVER_ERROR, 50))?
                .ok_or(APIErr::err("No cash register entries", StatusCode::NOT_FOUND, 44))?;

                let payload = CashRegisterPayload {
                    opened_at: data.opened_at,
                    closed_at: Some(data.closed_at),
                    initial_balance: data.initial_balance,
                    final_balance: Some(data.final_balance),
                };

                let value = to_value(payload)
                    .map_err(|e| APIErr::err(&e.to_string(), StatusCode::INTERNAL_SERVER_ERROR, 50))?;

                return Ok(Json(value));
        },
        "reports" => {
            let data = entity::reports::Entity::find()
                .one(&db)
                .await
                .map_err(|e| APIErr::err(&e.to_string(), 
                StatusCode::INTERNAL_SERVER_ERROR, 50))?
                .ok_or(APIErr::err("No reports", StatusCode::NOT_FOUND, 44))?;

                let payload = ReportsPayload {
                    start_date: data.start_date,
                    end_date: data.end_date,
                    report_type: data.report_type,
                    file_path: data.file_path,
                };

                let value = to_value(payload)
                    .map_err(|e| APIErr::err(&e.to_string(), StatusCode::INTERNAL_SERVER_ERROR, 50))?;

                return Ok(Json(value));
        },
        "client_appointments" => {
            let data = entity::client_appointments::Entity::find()
                .one(&db)
                .await
                .map_err(|e| APIErr::err(&e.to_string(), 
                StatusCode::INTERNAL_SERVER_ERROR, 50))?
                .ok_or(APIErr::err("No client appointments", StatusCode::NOT_FOUND, 44))?;

                let payload = ClientAppointmentsPayload {
                    client_id: data.client_id,
                    available_days: data.available_days,
                    preferred_hours: data.preferred_hours,
                };

                let value = to_value(payload)
                    .map_err(|e| APIErr::err(&e.to_string(), StatusCode::INTERNAL_SERVER_ERROR, 50))?;

                return Ok(Json(value));
        },
        _ => {
            return Err(APIErr::err("Entity type no supported", StatusCode::BAD_REQUEST, 40));
        }
    }
}