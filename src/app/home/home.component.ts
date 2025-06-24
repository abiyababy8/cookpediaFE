import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  allRecipes: any = []
  allFeedbacks: any = []
  constructor(private api: ApiService) { }
  ngOnInit() {
    this.getAllRecipes()
    this.getAllFeedbacks()
  }
  getAllRecipes() {
    this.api.getAllRecipesApi().subscribe((res: any) => {
      console.log("All recipes in Home Page")
      console.log(res)
      this.allRecipes = res.slice(0, 6)
    })
  }
  getAllFeedbacks() {
    this.api.getApprovedFeedbacksApi().subscribe((res: any) => {
      console.log("Approved Feedbacks")
      console.log(res)
      this.allFeedbacks = res
    })
  }
}
