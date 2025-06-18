import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';
// import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-recipes',
  imports: [HeaderComponent, FooterComponent, SearchPipe, FormsModule, NgxPaginationModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  allRecipes: any = []
  allRecipesDummy: any = []
  cuisineArray: any = []
  mealsArray: any = []
  searchKey: string = ''
  p: number = 1;
  constructor(private api: ApiService, private router:Router) { }
  ngOnInit() {
    this.getAllRecipes()
  }
  getAllRecipes() {
    this.api.getAllRecipesApi().subscribe((res: any) => {
      console.log("All recipes in recipes page:")
      console.log(res)
      this.allRecipes = res
      this.allRecipesDummy = res
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
  filterAllRecipes(value: string) {
    this.allRecipes = this.allRecipesDummy.filter((item: any) => item['cuisine'].includes(value))
  }
  filterByMealType(value: string) {
    this.allRecipes = this.allRecipesDummy.filter((item: any) => item['mealType'].includes(value))
  }
  getAllItems() {
    this.allRecipes = this.allRecipesDummy
  }
  viewRecipe(id: any) {
    if (sessionStorage.getItem("token")) {
this.router.navigateByUrl(`/recipe/${id}/view`)
    } else {
      alert("Please login to explore more features!")
    }
  }
}
