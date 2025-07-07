use lazy_static::lazy_static;
use dotenvy::dotenv;

lazy_static! {
    pub static ref DATABASE_URL: String = set_db();
    pub static ref TOKEN: String = set_token();
}

fn set_db() -> String {
    dotenv().ok();
    dotenvy::var("DATABASE_URL").unwrap()
}

fn set_token() -> String {
    dotenv().ok();
    dotenvy::var("TOKEN").unwrap()
}