use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(User::Table)
                    .if_not_exists()
                    .col(pk_auto(User::Id).integer().not_null())
                    .col(string(User::Name).not_null())
                    .col(string(User::Email).unique_key().not_null())
                    .col(string(User::Password).not_null())
                    .col(string(User::IsClient).boolean().default(false).not_null())
                    .col(string(User::IsActive).boolean().default(true).not_null())
                    .col(string(User::Uuid).uuid().unique_key().not_null())
                    .col(string(User::CreatedAt).date_time().not_null())
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(User::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum User {
    Table,
    Id,
    Name,
    Email,
    Password,
    IsClient,
    IsActive,
    Uuid,
    CreatedAt,
}
