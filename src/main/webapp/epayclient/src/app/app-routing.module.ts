import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoryListComponent} from "./components/category-list/category-list.component";
import {ProductListComponent} from "./components/product-list/product-list.component";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {AuthorityListComponent} from "./components/authority-list/authority-list.component";
import {RoleListComponent} from "./components/role-list/role-list.component";

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'categories', component: CategoryListComponent},
  { path: 'authorities', component: AuthorityListComponent},
  { path: 'products', component: ProductListComponent},
  { path: 'roles', component: RoleListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
