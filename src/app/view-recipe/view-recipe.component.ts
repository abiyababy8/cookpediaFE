import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { jsPDF } from 'jspdf'
import autoTable, { jsPDFDocument } from 'jspdf-autotable';
@Component({
  selector: 'app-view-recipe',
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent {
  recipe_id: string = ''
  recipe: any
  allRelatedRecipes: any = []
  // by using ActivatedRoute we can extract id from url
  constructor(private route: ActivatedRoute, private api: ApiService) { }
  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      console.log(res)
      this.recipe_id = res.id
      this.getRecipeDetails(this.recipe_id)
    })
  }
  getRecipeDetails(id: any) {
    this.api.viewrecipeApi(id).subscribe((res: any) => {
      console.log("Recipe Details:")
      console.log(res)
      this.recipe = res
      this.getAllRelatedRecipes(res.cuisine)
    })
  }
  getAllRelatedRecipes(cuisine: string) {
    this.api.getRelatedRecipesApi(cuisine).subscribe((res: any) => {
      this.allRelatedRecipes = res
      console.log("Related recipes:")
      console.log(this.allRelatedRecipes)
    })
  }
  generatepdf() {
    const pdf = new jsPDF()
    // heading
    pdf.setFontSize(16);
    pdf.setTextColor('orangered')
    pdf.text(this.recipe.name, 10, 10)
    // cuisine
    pdf.setFontSize(12)
    pdf.setTextColor('black')
    pdf.text(`Cuisine: ${this.recipe.cuisine}`, 10, 20)
    // servings
    pdf.text(`Servings: ${this.recipe.servings}`, 10, 25)
    pdf.text(`Mode of Cooking : ${this.recipe.difficulty}`, 10, 30)
    pdf.text(`Total Preparation Time : ${this.recipe.prepTimeMinutes} Minutes`, 10, 35)
    pdf.text(`Total Cooking Time : ${this.recipe.cookTimeMinutes} Minutes`, 10, 40)
    pdf.text(`Total Calorie Per Servings : ${this.recipe.caloriesPerServing}`, 10, 45)
    //table
    let head = [['Ingredients Needed', 'Cooking Instructions']]
    let body: any = []
    body.push([this.recipe.ingredients, this.recipe.instructions])
    autoTable(pdf, { head, body, startY: 50 })
    pdf.output('dataurlnewwindow')
    pdf.save('download_recipe.pdf')
  }
  downloadRecipe() {
    // 1) add to DB
    this.api.downloadRecipeApi(this.recipe_id, this.recipe).subscribe((res: any) => {
      console.log('download:')
      console.log(res)
      // 2) generate PDF
      this.generatepdf()
    })
  }
  saveRecipe() {
    this.api.saveRecipeApi(this.recipe_id, this.recipe).subscribe({
      next: (res: any) => {
        alert(`${this.recipe.name} added successfully to your collection!`)
      },
      error: (reason: any) => {
        alert(reason.error)
      }
    })
  }
}
