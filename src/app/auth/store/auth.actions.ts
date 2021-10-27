import { Action } from "@ngrx/store";

export const LOGIN_START = '[Auth] Login Start';
export const AUTHANTICATE_SUCCESS = '[Auth] Login';
export const AUTHANTICATE_FAIL = '[Auth] Login Fail';
export const CLEAR_ERROR = '[Auth] Clear Error'
export const SINGUP_START = '[Auth] SignUp Start';
export const LOGOUT = '[Auth] Logout';
export const AUTO_LOGIN = '[Auth] Auto Login';



export class AuthanticateSuccess implements Action {
    readonly type = AUTHANTICATE_SUCCESS;
    constructor(public payload: {
        email: string;
        userId: string;
        token: string;
        expirationDate: Date;
        redirect: boolean;
        
    }) { }
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export class Logout implements Action {
    readonly type = LOGOUT;
    constructor() { }
}

export class LoginStart {
    readonly type = LOGIN_START
    constructor(public payload: {email:string, password:string}) { }
}

export class SignUpStart implements Action {
    readonly type = SINGUP_START
    constructor(public payload: {email:string, password:string}) { }
}

export class AuthanticateFail implements Action {
    readonly type = AUTHANTICATE_FAIL;
    constructor(public payload:string) { }
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export type AuthActions = AuthanticateSuccess | Logout | LoginStart | AuthanticateFail  | SignUpStart | ClearError | AutoLogin ;
