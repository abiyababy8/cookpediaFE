import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FooterComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
  userRegister() {
    if (this.registerForm.valid) {
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password
      console.log("Register Form:", username, email, password)
      this.api.registerApi({ username, email, password }).subscribe({
        //next contains success response(200 series status)
        next: (res: any) => {
          alert(`${username} Registered succesfully`)
          this.router.navigateByUrl('/login')
        },
        // error contains failed response(400,500 series errors)
        error: (reason: any) => {
          alert(reason.error)
        }
      })
    }
    else {
      alert("Invalid Form!")
    }
  }
}
