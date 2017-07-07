import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule, MdInputModule, MdCheckboxModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";

import { AppComponent } from './app.component';
import { RecipesAndFiltersComponent } from './components/recipes-and-filters/recipes-and-filters.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { FiltersComponent } from './components/filters/filters.component';

import { Backend } from "./services/backend";
import { Recipe} from './models/recipe.model';
import { appReducer } from './store/reducers/reducer';
import { RecipesEffects } from './store/effects/effect';
import { initialState } from './models/model';

@NgModule({
  declarations: [
    AppComponent,
    RecipesAndFiltersComponent,
    RecipesComponent,
    RecipeDetailsComponent,
    RecipeComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    NoopAnimationsModule,

    MaterialModule,
    MdInputModule,
    MdCheckboxModule,

    RouterModule.forRoot([
      { path: '',  pathMatch: 'full', redirectTo: 'recipes' },
      { path: 'recipes',  pathMatch: 'full', component: RecipesAndFiltersComponent },
      { path: 'recipe/:id', component: RecipeDetailsComponent }
    ]),

    StoreModule.forRoot(<any>{app: appReducer}, {initialState}),

    EffectsModule.forRoot([
      RecipesEffects
    ]),

    StoreRouterConnectingModule
  ],
  providers: [
    Backend,
    RecipesEffects
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
