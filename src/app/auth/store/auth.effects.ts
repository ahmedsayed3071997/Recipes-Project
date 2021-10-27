import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of, throwError } from "rxjs";
import { catchError, switchMap,map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";
import { User } from "../user.model";
import * as AuthActions from './auth.actions'

export interface AuthRespnseData {
    
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    //for Signin option so it's optional
    registered?: boolean
}

const handleAuthantication = (expiresIn:number, email:string, userId:string, token:string ) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate)
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.AuthanticateSuccess({
        email: email,
        userId: userId,
        token: token,
        expirationDate: expirationDate,
        redirect: true
    })
};
const handleError = (errorResponse) => {
    let errorMessage = 'An Unkown Error Occurred !'
                        if ( !errorResponse.error || !errorResponse.error.error) {
                           return of(new AuthActions.AuthanticateFail(errorMessage))
                        }
                        switch (errorResponse.error.error.message) {
                            case 'EMAIL_EXISTS':
                                errorMessage = 'This Email Is Exists Already';
                                break;
                            case 'EMAIL_NOT_FOUND':
                                errorMessage = 'This Email Does Not Exists';
                                break;
                            case 'INVALID_PASSWORD':
                                errorMessage = 'You Entered a Wrong Password'
                                break;
                            
                        }
                        
                        return of(new AuthActions.AuthanticateFail(errorMessage));
}
@Injectable()

export class AuthEffects {

    

    @Effect()
    authSignUp = this.actions$.pipe(
        ofType(AuthActions.SINGUP_START),
        switchMap((SignUpAction: AuthActions.SignUpStart) => {
            return this.http.post<AuthRespnseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebasKey,
                {
                    email: SignUpAction.payload.email,
                    password: SignUpAction.payload.password,
                    returnSecureToken: true
                }).pipe(
                    tap((resData) => {
                        this.authService.setTimerLogout(+resData.expiresIn * 1000);
                     }),
                    map(resData => {
                       return handleAuthantication(+resData.expiresIn, resData.email, resData.localId, resData.idToken )
                    }),
                    catchError(errorResponse => {
                        return handleError(errorResponse);
                    })
                );
        })
    )

    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap(
            (authData: AuthActions.LoginStart) => {
                return this.http.post<AuthRespnseData>(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebasKey,
                    {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true
                    }
                ).pipe(
                    tap((resData) => {
                        this.authService.setTimerLogout(+resData.expiresIn * 1000);
                     }),
                    map(resData => {
                        return handleAuthantication(+resData.expiresIn, resData.email, resData.localId, resData.idToken )
                    }),
                    catchError(errorResponse => {
                        return handleError(errorResponse);
                    })
                );
                    
            }
        ),
    );
    @Effect({dispatch:false})
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.AUTHANTICATE_SUCCESS,AuthActions.LOGOUT),
        tap((authanticateSuccess:AuthActions.AuthanticateSuccess) => {
            if (authanticateSuccess.payload.redirect) {
                this.router.navigate(['/']);
             }
        })
    )

    @Effect({dispatch:false})
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.router.navigate(['/auth']);
            localStorage.removeItem('userData');
            this.authService.clearLogoutTimer();
        })
    )

    @Effect()
    autoLoging = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            const userData: {
                email: string,
                id: string,
                _token: string,
                _tokenExpirationDate: string
            } = JSON.parse(localStorage.getItem('userData'));
            if (!userData) {
                return {type: 'dummy'};
            }
            const loadedUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate)
            );
            if (loadedUser.token) {
                // this.user.next(loadedUser);
                 const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
                this.authService.setTimerLogout(expirationDuration)
                return new AuthActions.AuthanticateSuccess({
                    email: loadedUser.email,
                    userId: loadedUser.id,
                    token: loadedUser.token,
                    expirationDate: new Date(userData._tokenExpirationDate),
                    redirect: false
                });
                // const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
                // this.autoLogout(expirationDuration);
            }
            return {type: 'dummy'};
        })

    )


    // @Effect()
    // authRedirect = this.actions$.pipe(
    //     ofType(AuthActions.AUTHANTICATE_SUCCESS),
    //     tap(
    //         () => { this.router.navigate(['/'])}
    //     )
    // )

    constructor(private actions$: Actions, private http:HttpClient, private router: Router,private authService:AuthService) { }
}