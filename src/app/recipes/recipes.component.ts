import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-recipes',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  allRecipes: any = []
  cuisineArray: any = []
  mealsArray: any = []
  constructor(private api: ApiService) { }
  ngOnInit() {
    this.getAllRecipes()
  }
  getAllRecipes() {
    this.api.getAllRecipesApi().subscribe((res: any) => {
      console.log("All recipes in recipes page:")
      console.log(res)
      this.allRecipes = res
      this.allRecipes.forEach((item: any) => {
        !this.cuisineArray.includes(item.cuisine) &&
          this.cuisineArray.push(item.cuisine)
      });
      console.log("All cuisines:")
      console.log(this.cuisineArray)
      // create meals array
      this.allRecipes.forEach((item: any) => {
        let tempMeal = item.mealType
        if (tempMeal && tempMeal.length > 0) {
          tempMeal.forEach((meal: any) => {
            !this.mealsArray.includes(meal) &&
              this.mealsArray.push(meal)
          })
        }
      })
      console.log("Meals Array")
      console.log(this.mealsArray)
    })
  }

}
