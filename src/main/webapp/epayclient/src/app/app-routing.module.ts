import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryListComponent} from "./components/category-list/category-list.component";
import {ProductListComponent} from "./components/product-list/product-list.component";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {AuthorityListComponent} from "./components/authority-list/authority-list.component";
import {RoleListComponent} from "./components/role-list/role-list.component";
import {UserListComponent} from "./components/user-list/user-list.component";
import {UserRoleListComponent} from "./components/user-role-list/user-role-list.component";
import {RoleauthorityListComponent} from "./components/roleauthority-list/roleauthority-list.component";
import {LoginComponent} from "@app/components/login/login.component";
import {AuthGuard} from "@app/_helpers/auth.guard";
import {Authorities} from "@app/enums/authorities";
import {ShoppingCartComponent} from "@app/components/shopping-cart/shopping-cart.component";
import {ProductDetailComponent} from "@app/components/product-detail/product-detail.component";
import {CategoryProductsComponent} from "@app/components/category-products/category-products.component";
import {ResetPasswordComponent} from "@app/components/reset-password/reset-password.component";
import {ReviewComponent} from "@app/components/review/review.component";

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'categories', component: CategoryListComponent, canActivate: [AuthGuard],data:{authorities:[Authorities.EPAY_CATEG]}},
  { path: 'categories/:id', component: CategoryProductsComponent },
  { path: 'products', component: ProductListComponent},
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'authorities', component: AuthorityListComponent, canActivate: [AuthGuard],data:{authorities:[Authorities.EPAY_AUTH]}},
  { path: 'roles', component: RoleListComponent, canActivate: [AuthGuard],data:{authorities:[Authorities.EPAY_AUTH]}},
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard],data:{authorities:[Authorities.EPAY_USERS]}},
  { path: 'userroles', component: UserRoleListComponent, canActivate: [AuthGuard],data:{authorities:[Authorities.EPAY_ADMIN]}},
  { path: 'rolesauthorities', component: RoleauthorityListComponent, canActivate: [AuthGuard],data:{authorities:[Authorities.EPAY_ADMIN]}},
  { path: 'login', component: LoginComponent},
  { path: 'shoppingcart', component: ShoppingCartComponent},
  { path: 'users/reset-password/:token', component: ResetPasswordComponent},
  { path: 'reviews', component: ReviewComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
