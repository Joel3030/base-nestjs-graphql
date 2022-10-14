
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class LoginUserInput {
    password: string;
    username: string;
}

export class CreateUserInput {
    username: string;
    password: string;
    roles?: Nullable<Nullable<string>[]>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export class UpdateUserInput {
    username?: Nullable<string>;
    password?: Nullable<string>;
    roles?: Nullable<Nullable<string>[]>;
    updatedAt?: Nullable<DateTime>;
}

export class Login {
    access_token: string;
}

export abstract class IMutation {
    abstract login(loginUserInput: LoginUserInput): Login | Promise<Login>;

    abstract refreshToken(): Login | Promise<Login>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract removeUser(id: string): User | Promise<User>;

    abstract updateUser(id: string, updateUserInput: UpdateUserInput): User | Promise<User>;
}

export class User {
    id: string;
    username: string;
    roles?: Nullable<Nullable<string>[]>;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<DateTime>;
}

export abstract class IQuery {
    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export type DateTime = any;
type Nullable<T> = T | null;
