import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent {
  allFeedbacks: any = []
  constructor(private api: ApiService) { }
  ngOnInit() {
    this.getAllFeedbacks()
  }
  getAllFeedbacks() {
    this.api.getAllFeedbacksApi().subscribe((res) => {
      console.log("Feedbacks:")
      console.log(res)
      this.allFeedbacks = res
    })
  }
  updateFeedback(id:any,status:string){
    this.api.updateFeedbackStatusApi(id,status).subscribe((res)=>{
      this.getAllFeedbacks()
    })
  }
}
