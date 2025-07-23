export interface UserModel {
    name: string;
    email: string;
    password: string;
    is_client: boolean;
    is_active: boolean;
    uuid: string;
    created_at: Date;
}

export interface CreateUserModel {
    name: string;
    email: string;
    password: string;
    is_client: boolean;
}

export interface CreateUserResponseModel {
    message: string;
}

export interface LoginUserModel {
    email: string;
    password: string;
}

export interface LoginUserResponseModel {
    token: string;
}

export interface UpdateUserModel {
    name: string;
}

export interface UpdateUserResponseModel {
    message: string;
}

export interface DeleteUserModel {
    message: string;
}
