import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileimage: string = 'data:image/png;base64,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'
  constructor(private api: ApiService) { }
  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem('user') || "")
    if (user.profilePic) {
      this.profileimage = user.profilePic
    }
  }
  getFile(event: any) {
    let uploadedFile = event.target.files[0]
    let fr = new FileReader()
    fr.readAsDataURL(uploadedFile)
    fr.onload = (event: any) => {
      this.profileimage = event.target.result
    }
  }
  uploadProfilePic() {
    this.api.editUserApi({ profilePic: this.profileimage }).subscribe((res: any) => {
      sessionStorage.setItem("user", JSON.stringify(res))
      this.profileimage = res.profilePic
      alert('Profile Pic uploaded successfully!')
    })
  }
}
