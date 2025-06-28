import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  allRecipes: any = []
  searchKey: string = ''
  constructor(private api: ApiService) { }
  ngOnInit() {
    this.getAllRecipes()
  }
  getAllRecipes() {
    this.api.getAllRecipesApi().subscribe((res: any) => {
      console.log("All Recipes:")
      console.log(res)
      this.allRecipes = res
    })
  }
  removeRecipe(id: any) {
    this.api.deleteRecipeApi(id).subscribe((res: any) => {
      this.getAllRecipes()
    })
  }
}
