import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn: boolean = false
  loginUserName = ""
  ngOnInit() {
    if (sessionStorage.getItem('token')) {
      const userTemp: any = sessionStorage.getItem('user')
      this.isLoggedIn = true
      this.loginUserName = JSON.parse(userTemp).username
    }
    else {
      this.isLoggedIn = false
      this.loginUserName = ""
    }
  }

}
