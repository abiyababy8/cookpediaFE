import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ProfileComponent } from './profile/profile.component';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    //define path to load a specific component
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'all-recipes', component: RecipesComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'saved-recipe', component: SavedRecipesComponent },
    { path: 'recipe/:id/view', component: ViewRecipeComponent },
    //manage path that not defined- we use wild card path
    { path: '**', component: PageNotFoundComponent }
];
