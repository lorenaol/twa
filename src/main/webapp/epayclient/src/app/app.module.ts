import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {DropdownModule} from 'primeng/dropdown';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CategoryListComponent} from './components/category-list/category-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HomePageComponent} from './components/home-page/home-page.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CategoryFormComponent} from './components/category-form/category-form.component';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SidebarModule} from 'primeng/sidebar';
import { CategoryDeleteComponent } from './components/category-delete/category-delete.component';
import {CommonModule} from "@angular/common";
import { AuthorityListComponent } from './components/authority-list/authority-list.component';
import { AuthorityFormComponent } from './components/authority-form/authority-form.component';
import { AuthorityDeleteComponent } from './components/authority-delete/authority-delete.component';


import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductDeleteComponent } from './components/product-delete/product-delete.component';
import { RoleDeleteComponent } from './components/role-delete/role-delete.component';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { RoleListComponent } from './components/role-list/role-list.component';
import { UserDeleteComponent } from './components/user-delete/user-delete.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { LoginComponent } from './components/login/login.component';
import { BasicAuthInterceptor } from "@app/_helpers/basic-auth.interceptor";
import { ErrorInterceptor } from "@app/_helpers/error.interceptor";
import { HasAuthorityDirective } from './directives/has-authority.directive';
import { AgmCoreModule } from '@agm/core';
import { UsersRomaniaComponent } from './components/users-romania/users-romania.component';

import { RoleauthorityListComponent } from './components/roleauthority-list/roleauthority-list.component';
import { RoleauthorityFormComponent } from './components/roleauthority-form/roleauthority-form.component';
import { RoleauthorityDeleteComponent } from './components/roleauthority-delete/roleauthority-delete.component';

import { UserRoleListComponent } from './components/user-role-list/user-role-list.component';
import { UserRoleFormComponent } from './components/user-role-form/user-role-form.component';
import { UserRoleDeleteComponent } from './components/user-role-delete/user-role-delete.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoryListComponent,
    HomePageComponent,
    CategoryFormComponent,
    CategoryDeleteComponent,
    AuthorityListComponent,
    AuthorityFormComponent,
    AuthorityDeleteComponent,

    ProductListComponent,
    ProductFormComponent,
    ProductDeleteComponent,
    RoleDeleteComponent,
    RoleFormComponent,
    RoleListComponent,
    UserDeleteComponent,
    UserListComponent,
    UserFormComponent,
    RoleauthorityListComponent,
    RoleauthorityFormComponent,
    RoleauthorityDeleteComponent,
    UserRoleListComponent,
    UserRoleFormComponent,
    UserRoleDeleteComponent,
    LoginComponent,
    HasAuthorityDirective,
    UsersRomaniaComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DropdownModule,
    FormsModule,
    SidebarModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCEhZvh5fNHbTnI4jZM15Pd08jLNaN3F9w',
      libraries: ['places']
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
