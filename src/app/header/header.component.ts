import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn: boolean = false
  loginUserName = ""
  constructor(private router: Router) { }
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
  logOutUser() {
    sessionStorage.clear()
    this.isLoggedIn = false
    this.loginUserName = ""
    this.router.navigateByUrl('/')
  }
}
