import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthRespnseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitForm(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    let authObs: Observable<AuthRespnseData>;
    
    if (this.isLoginMode) {
      //.. Loging
      authObs = this.authService.loging(email, password)
      
    } else {
      // .. Sign Up
      authObs = this.authService.signUp(email, password)
       
    }

    // Shared Observable To  Subscribe For Both Login and Sign up 
    authObs.subscribe(
      // Success Condition 
      (responseData) => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);

      },

      // failed condition
      (errorMessage) => {
        console.log(errorMessage);
        // Switch For Errors Was here
        this.error = errorMessage;
        this.isLoading = false;
      }
    )
    form.reset()

  }
  
  onHandleError() {
    this.error = null;
  }


}
