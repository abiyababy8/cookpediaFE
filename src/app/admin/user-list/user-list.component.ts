import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  allUsers: any = []
  constructor(private api: ApiService) { }
  ngOnInit() {
    this.getAllUsers()
  }
  getAllUsers() {
    this.api.getAllUserApi().subscribe((res) => {
      console.log('All user list:')
      console.log(res)
      this.allUsers=res
    })
  }
}
