import { Component, Input } from '@angular/core';
import { RecipeModel } from '../models/recipeModel';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-recipe',
  standalone: false,
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.css'
})
export class ManageRecipeComponent {
  @Input() id!: string
  recipeDetails: RecipeModel = {}
  ingredients: any = []
  instructions: any = []
  mealsArray: any = []
  mealTypeArray: any = []
  constructor(private api: ApiService, private router: Router) { }
  ngOnInit() {
    if (this.id) {
      this.getAllRecipes()
    }
    this.mealTypeArray = ['Dinner', 'Lunch', 'Snack', 'Dessert', 'Appetizer', 'Breakfast', 'Beverage', 'Salad']
  }
  getAllRecipes() {
    this.api.getAllRecipesApi().subscribe((res: any) => {
      if (this.id) {
        this.recipeDetails = res.find((item: any) => item._id === this.id)
        this.ingredients = this.recipeDetails.ingredients
        this.instructions = this.recipeDetails.instructions
        this.mealsArray = this.recipeDetails.mealType
      }
    })
  }
  AddRecipe() {
    console.log("Add Recipe Details:")
    console.log(this.recipeDetails)
    this.recipeDetails.ingredients = this.ingredients
    this.recipeDetails.instructions = this.instructions
    this.recipeDetails.mealType = this.mealsArray
    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType } = this.recipeDetails
    if (name && ingredients!.length > 0 && instructions!.length > 0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length > 0) {
      // add recipe api
      this.api.addRecipeApi(this.recipeDetails).subscribe((res: any) => {
        alert(`${this.recipeDetails.name} added successfully`)
      })
    }
  }
  addIngredients(data: any) {
    if (data.value) {
      this.ingredients.push(data.value)
      data.value = ""
      console.log("Ingredients:")
      console.log(this.ingredients)
    }
  }
  removeIngredient(value: string) {
    this.ingredients = this.ingredients.filter((item: string) => {
      return item !== value
    })
  }
  addInstructions(data: any) {
if(data.value){
  this.instructions.push(data.value)
  data.value=""
  console.log("Instructions:")
      console.log(this.instructions)
}
  }
   removeInstruction(value: string) {
    this.instructions = this.instructions.filter((item: string) => {
      return item !== value
    })
  }
  mealTypeSelect(event: any) {
    if (event.target.checked) {
      !this.mealsArray.includes(event.target.name) && this.mealsArray.push(event.target.name)
    }
    else {
      this.mealsArray = this.mealsArray.filter((item: any) => {
        return item !== event.target.name
      })
    }
    console.log(this.mealsArray)
  }
  updateRecipe() {
    this.recipeDetails.ingredients = this.ingredients
    this.recipeDetails.instructions = this.instructions
    this.recipeDetails.mealType = this.mealsArray
    const { name, ingredients, instructions, prepTimeMinutes, cookTimeMinutes, servings, difficulty, cuisine, caloriesPerServing, image, mealType } = this.recipeDetails
    if (name && ingredients!.length > 0 && instructions!.length > 0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length > 0) {
      this.api.editRecipeApi(this.id, this.recipeDetails).subscribe((res: any) => {
        alert("Recipe updated successfully")
        this.recipeDetails = {}
        this.ingredients = []
        this.instructions = []
        this.router.navigateByUrl('/admin/recipe-list')
      })
    } else {
      alert("please fill the form")
    }
  }
  removeMealType(data: string) {
    this.mealsArray = this.mealsArray.filter((item: any) => item !== data)
  }
}