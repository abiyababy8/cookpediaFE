import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'app-login',
  imports: [FooterComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
  loginUser() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
      console.log(email, password)
      this.api.loginApi({ email, password }).subscribe({
        next: (res: any) => {
          console.log("Login successful!")
          console.log(res)
          sessionStorage.setItem("token", res.token)
          sessionStorage.setItem("user", JSON.stringify(res.user))
          this.loginForm.reset()
          if (res.user.role === 'User') {
            this.router.navigateByUrl('/')
          }
        },
        error: (reason: any) => {
          console.log(reason.error)
        }
      })
    }
    else {
      alert('Invalid Form!')
    }
  }
}
