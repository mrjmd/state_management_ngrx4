import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RecipesAndFiltersComponent } from './components/recipes-and-filters/recipes-and-filters.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RateButtonComponent } from './components/rate-button/rate-button.component';
import { FormatRatingPipe } from './format-rating.pipe';
import { FiltersComponent } from './components/filters/filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule, MdInputModule, MdCheckboxModule } from '@angular/material';
import { Backend } from "./backend";
import { WatchService } from "./watch";
import { Recipe} from './models/recipe.model';
import { appReducer } from './reducers/reducer';
import { RecipesEffects } from './effects/effect';
import { initialState, State } from './models/model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, ActionReducer, combineReducers } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";

@NgModule({
  declarations: [
    AppComponent,
    RecipesAndFiltersComponent,
    RecipesComponent,
    RecipeDetailsComponent,
    RecipeComponent,
    RateButtonComponent,
    FormatRatingPipe,
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
    ], {useHash: true}),

    StoreModule.forRoot(<any>{app: appReducer}, {initialState}),

    EffectsModule.forRoot([
      RecipesEffects
    ]),

    StoreRouterConnectingModule
  ],
  providers: [
    Backend,
    WatchService,
    RecipesEffects
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
