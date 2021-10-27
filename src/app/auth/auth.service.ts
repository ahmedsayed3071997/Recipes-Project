import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import {environment } from"../../environments/environment"
import { Store } from "@ngrx/store";
import * as fromAppReducer from '../store/app-reducer';
import * as fromAuthActions from '../auth/store/auth.actions'
export interface AuthRespnseData {
    
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    //for Signin option so it's optional
    registered?: boolean
}

@Injectable({
    providedIn: "root"
})
    
export class AuthService {

    // user = new BehaviorSubject<User>(null);

    private tokenExpirationtimer: any;

    constructor(private http: HttpClient, private router: Router,private store:Store<fromAppReducer.AppState>) { }
    signUp(email: string, password: string) {
        return this.http.post<AuthRespnseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebasKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(
                catchError(this.handleError),
                tap((resData) => {
                    console.log(resData);
                    this.handleAuthantication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
                })
            );
        
    }


    loging(email:string, password: string) {
        return this.http.post<AuthRespnseData>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + environment.firebasKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(
                catchError(this.handleError),
                tap((resData) => {
                    this.handleAuthantication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
                })
            )
           
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );
        if (loadedUser.token) {
            // this.user.next(loadedUser);
            this.store.dispatch(new fromAuthActions.AuthanticateSuccess({
                email: loadedUser.email,
                userId: loadedUser.id,
                token: loadedUser.token,
                expirationDate: new Date(userData._tokenExpirationDate),
                redirect:false
            }))
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
            this.autoLogout(expirationDuration);
        }
    }


    logout() {
        // this.user.next(null);
        this.store.dispatch(new fromAuthActions.Logout());
        // this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationtimer) {
            clearTimeout(this.tokenExpirationtimer);
        }
        this.tokenExpirationtimer = null;
    }
    
    autoLogout(expirationDuration: number) {
        this.tokenExpirationtimer = setTimeout(() => {
        this.logout()
        }, expirationDuration)
        console.log( "reamaiming Time For The Session " + expirationDuration);
    }

    private handleAuthantication(email: string, userId: string, token: string, expiresIn: number) {

        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000 );
            const user = new User(
                email,
                userId,
                token,
                expirationDate
            );
        // this.user.next(user);
        this.store.dispatch(new fromAuthActions.AuthanticateSuccess({
            email: email,
            userId: userId,
            token: token,
            expirationDate: expirationDate,
            redirect:true
        }))

        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
        
    }
    private handleError(errorResponse: HttpErrorResponse) {

        let errorMessage = 'An Unkown Error Occurred !'
            if ( !errorResponse.error || !errorResponse.error.error) {
               return throwError(errorMessage)
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
            return throwError(errorMessage);
        
    }

    setTimerLogout(expirationDuration: number) {
        this.tokenExpirationtimer = setTimeout(() => {
            this.store.dispatch(new fromAuthActions.Logout())
        }, expirationDuration)
        console.log( "reamaiming Time For The Session " + expirationDuration);
    }

    clearLogoutTimer() {
        if (this.tokenExpirationtimer) {
            clearTimeout(this.tokenExpirationtimer);
            this.tokenExpirationtimer = null;
         }
    }

}