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
  constructor(private api: ApiService) { }
  ngOnInit() {
    this.getAllRecipes()
  }
  getAllRecipes() {
    this.api.getAllRecipesApi().subscribe((res: any) => {
      console.log("All recipes in Home Page")
      console.log(res)
      this.allRecipes = res.slice(0, 6)
    })
  }
}
