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
import {MyProfileComponent} from "@app/components/my-profile/my-profile.component";
import {EditProfileComponent} from "@app/components/edit-profile/edit-profile.component";



const routes: Routes = [

  {
    path: '',
    component: HomePageComponent,
    // data:{breadcrumb:{label:'Home',info: { myData: { icon: 'home', iconType: 'material' }}}},
  },
  { path: 'categories',
    children:[
    {path:'',component: CategoryListComponent},
  { path: ':id', component: CategoryProductsComponent },
   ]
},

 { path: 'products',
   children:[
     {path:'', component: ProductListComponent},
      { path: ':id', component: ProductDetailComponent},
   ]
   },
  { path: 'authorities', component: AuthorityListComponent},
  { path: 'roles', component: RoleListComponent},
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard],data:{authorities:[Authorities.USERS]}},
  { path: 'userroles', component: UserRoleListComponent, canActivate: [AuthGuard],data:{authorities:[Authorities.ADMIN]}},
  { path: 'rolesauthorities', component: RoleauthorityListComponent, canActivate: [AuthGuard],data:{authorities:[Authorities.ADMIN]}},
  { path: 'login', component: LoginComponent},
  { path: 'shoppingcart', component: ShoppingCartComponent},
  { path: 'users/reset-password/:token', component: ResetPasswordComponent},
  { path: 'shoppingcart', component: ShoppingCartComponent},
  { path: 'users/reset-password/:token', component: ResetPasswordComponent},
  { path: 'anunturi', component: CategoryProductsComponent},
  { path: 'profilul-meu', component: MyProfileComponent},
  { path: 'profil-edit', component: EditProfileComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
