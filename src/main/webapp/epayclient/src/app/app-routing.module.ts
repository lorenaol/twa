import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryListComponent} from "./components/category-list/category-list.component";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {UserListComponent} from "./components/user-list/user-list.component";

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'categories', component: CategoryListComponent},
  { path: 'users', component: UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
