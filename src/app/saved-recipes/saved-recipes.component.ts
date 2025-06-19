import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-saved-recipes',
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './saved-recipes.component.html',
  styleUrl: './saved-recipes.component.css'
})
export class SavedRecipesComponent {
  allRecipes: any = []
  constructor(private api: ApiService) { }
  ngOnInit() {
    this.getAllSavedRecipes()
  }
  getAllSavedRecipes() {
    this.api.getSavedRecipeApi().subscribe((res: any) => {
      console.log('Saved Recipes:')
      console.log(res)
      this.allRecipes = res
    })
  }
  deleteRecipe(id:any){
    this.api.removeSavedRecipeApi(id).subscribe((res)=>{
      this.getAllSavedRecipes()
    })
  }
}
