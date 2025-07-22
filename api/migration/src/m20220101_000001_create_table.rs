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
            ).await?;
            
        // Clients
        manager
            .create_table(
                Table::create()
                    .table(Clients::Table)
                    .if_not_exists()
                    .col(pk_auto(Clients::Id).integer().not_null())
                    .col(string(Clients::Name).not_null())
                    .col(string(Clients::Phone).not_null())
                    .to_owned(),
            )
            .await?;

        // Staff
        manager
            .create_table(
                Table::create()
                    .table(Staff::Table)
                    .if_not_exists()
                    .col(pk_auto(Staff::Id).integer().not_null())
                    .col(string(Staff::Name).not_null())
                    .col(uuid(Staff::Uuid).not_null())
                    .col(string(Staff::Role).not_null())
                    .col(string(Staff::Phone).not_null())
                    .to_owned(),
            )
            .await?;

        // Services
        manager
            .create_table(
                Table::create()
                    .table(Services::Table)
                    .if_not_exists()
                    .col(pk_auto(Services::Id).integer().not_null())
                    .col(string(Services::Name).not_null())
                    .col(text(Services::Description))
                    .col(decimal(Services::Price).not_null())
                    .to_owned(),
            )
            .await?;

        // Appointments
        manager
            .create_table(
                Table::create()
                    .table(Appointments::Table)
                    .if_not_exists()
                    .col(pk_auto(Appointments::Id).integer().not_null())
                    .col(integer(Appointments::ClientId).not_null())
                    .col(integer(Appointments::StaffId).not_null())
                    .col(integer(Appointments::ServiceId).not_null())
                    .col(date_time(Appointments::DateTime).not_null())
                    .col(string(Appointments::Status).not_null())
                    .to_owned(),
            )
            .await?;

        // Payments
        manager
            .create_table(
                Table::create()
                    .table(Payments::Table)
                    .if_not_exists()
                    .col(pk_auto(Payments::Id).integer().not_null())
                    .col(integer(Payments::AppointmentId).not_null())
                    .col(decimal(Payments::Amount).not_null())
                    .col(string(Payments::PaymentMethod).not_null())
                    .to_owned(),
            )
            .await?;

        // Products
        manager
            .create_table(
                Table::create()
                    .table(Products::Table)
                    .if_not_exists()
                    .col(pk_auto(Products::Id).integer().not_null())
                    .col(string(Products::Name).not_null())
                    .col(text(Products::Description))
                    .col(decimal(Products::Price).not_null())
                    .col(integer(Products::Stock).not_null())
                    .to_owned(),
            )
            .await?;

        // Cash Register
        manager
            .create_table(
                Table::create()
                    .table(CashRegister::Table)
                    .if_not_exists()
                    .col(pk_auto(CashRegister::Id).integer().not_null())
                    .col(date_time(CashRegister::OpenedAt).not_null())
                    .col(date_time(CashRegister::ClosedAt))
                    .col(decimal(CashRegister::InitialBalance).not_null())
                    .col(decimal(CashRegister::FinalBalance))
                    .to_owned(),
            )
            .await?;

        // Reports
        manager
            .create_table(
                Table::create()
                    .table(Reports::Table)
                    .if_not_exists()
                    .col(pk_auto(Reports::Id).integer().not_null())
                    .col(date_time(Reports::StartDate).not_null())
                    .col(date_time(Reports::EndDate).not_null())
                    .col(string(Reports::ReportType).not_null())
                    .col(string(Reports::FilePath).not_null())
                    .to_owned(),
            )
            .await?;

        // Client Preferences
        manager
            .create_table(
                Table::create()
                    .table(ClientAppointments::Table)
                    .if_not_exists()
                    .col(pk_auto(ClientAppointments::Id).integer().not_null())
                    .col(integer(ClientAppointments::ClientId).not_null())
                    .col(string(ClientAppointments::AvailableDays).not_null())
                    .col(string(ClientAppointments::PreferredHours).not_null())
                    .to_owned(),
            )
            .await?;

        Ok(())


    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager.drop_table(Table::drop().table(ClientAppointments::Table).to_owned()).await?;
        manager.drop_table(Table::drop().table(Reports::Table).to_owned()).await?;
        manager.drop_table(Table::drop().table(CashRegister::Table).to_owned()).await?;
        manager.drop_table(Table::drop().table(Products::Table).to_owned()).await?;
        manager.drop_table(Table::drop().table(Payments::Table).to_owned()).await?;
        manager.drop_table(Table::drop().table(Appointments::Table).to_owned()).await?;
        manager.drop_table(Table::drop().table(Services::Table).to_owned()).await?;
        manager.drop_table(Table::drop().table(Staff::Table).to_owned()).await?;
        manager.drop_table(Table::drop().table(Clients::Table).to_owned()).await?;
        manager.drop_table(Table::drop().table(User::Table).to_owned()).await?;
        Ok(())
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


#[derive(DeriveIden)]
enum Clients {
    Table,
    Id,
    Name,
    Phone,
}

#[derive(DeriveIden)]
enum Staff {
    Table,
    Id,
    Name,
    Uuid,
    Role,
    Phone,
}

#[derive(DeriveIden)]
enum Services {
    Table,
    Id,
    Name,
    Description,
    Price,
}

#[derive(DeriveIden)]
enum Appointments {
    Table,
    Id,
    ClientId,
    StaffId,
    ServiceId,
    DateTime,
    Status,
}

#[derive(DeriveIden)]
enum Payments {
    Table,
    Id,
    AppointmentId,
    Amount,
    PaymentMethod,
}

#[derive(DeriveIden)]
enum Products {
    Table,
    Id,
    Name,
    Description,
    Price,
    Stock,
}

#[derive(DeriveIden)]
enum CashRegister {
    Table,
    Id,
    OpenedAt,
    ClosedAt,
    InitialBalance,
    FinalBalance,
}

#[derive(DeriveIden)]
enum Reports {
    Table,
    Id,
    StartDate,
    EndDate,
    ReportType,
    FilePath,
}


// TABELAS PARA A ÁREA DOS CLIENTES.
#[derive(DeriveIden)]
enum ClientAppointments {
    Table,
    Id,
    ClientId,
    AvailableDays,
    PreferredHours,
}