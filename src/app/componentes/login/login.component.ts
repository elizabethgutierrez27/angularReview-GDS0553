import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { response } from 'express';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = this.fb.group({
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required]]
  });


  constructor(private fb: FormBuilder,
    private authService:AuthService,
    private router:Router){

  }

  get email(){
    return this.loginForm.controls['email']
  }

  get password(){
    return this.loginForm.controls['password']
  }

  login(){
    const {email, password}=this.loginForm.value

    this.authService.registerByEmail(email as string).subscribe(
      response=>{
        if(response.length>0 && response[0].password==password){
          sessionStorage.setItem("email",email as string)
          this.router.navigate(['home']);
        }
      },
      error=>{ 

      }
    )

  }
}
