import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contact',
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  testimonyForm: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService) {
    this.testimonyForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    })
  }
  addTestimony() {
    if (this.testimonyForm.valid) {
      const name = this.testimonyForm.value.name
      const email = this.testimonyForm.value.email
      const message = this.testimonyForm.value.message
      console.log(name, email, message)
      this.api.addTestimonyApi({ name, email, message }).subscribe((res) => {
        alert("Testimony Added Successfully")
        this.testimonyForm.reset()
      })
    }
    else {
      alert('Invalid Form!')
    }
  }

}
