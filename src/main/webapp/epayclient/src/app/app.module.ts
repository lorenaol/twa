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
import {MegaMenuModule} from 'primeng/megamenu';
import {PanelModule} from 'primeng/panel';

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
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import {ButtonModule} from 'primeng/button';
import {FileUploadModule} from 'primeng/fileupload';
import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { TieredMenuModule } from 'primeng/tieredmenu';
import {GalleriaModule} from 'primeng/galleria';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { ReviewComponent } from './components/review/review.component';

import { BreadcrumbModule } from "xng-breadcrumb";
import { BreadcrumbService } from 'xng-breadcrumb';
import { BreadCrumbsComponent } from './components/bread-crumbs/bread-crumbs.component';
import {MatIconModule} from "@angular/material/icon";
import { SpinnerComponent } from './components/spinner/spinner.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {SpinnerInterceptor} from "@app/_helpers/spinner.interceptor";
import { StreamChatModule, StreamAutocompleteTextareaModule } from 'stream-chat-angular';
import { TranslateModule } from '@ngx-translate/core';
import { AnuntComponent } from './components/anunt/anunt.component';
import { ChatComponent } from './components/chat/chat.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ReviewListComponent } from './components/review-list/review-list.component';
import { MyRequestsComponent } from './components/my-requests/my-requests.component';
import { MyAnnouncesComponent } from './components/my-announces/my-announces.component';
import { MyClassesComponent } from './components/my-classes/my-classes.component';
import {MatButtonModule} from "@angular/material/button";
import { CreateClassDialogComponent } from './components/create-class-dialog/create-class-dialog.component';
import { ViewClassComponent } from './components/view-class/view-class.component';
import { MaterialsClassComponent } from './components/materials-class/materials-class.component';
import { TestsClassComponent } from './components/tests-class/tests-class.component';
import { ViewTestComponent } from './components/view-test/view-test.component';

import {MatCardModule} from '@angular/material/card';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { RaspundereTestComponent } from './components/raspundere-test/raspundere-test.component';
import {TableModule} from "primeng/table";
import {TextFieldModule} from "@angular/cdk/text-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

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
    ShoppingCartComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ProductDetailComponent,
    CategoryProductsComponent,
    PasswordChangeComponent,
    BreadCrumbsComponent,
    SpinnerComponent,
    ReviewComponent,
    AnuntComponent,
    ChatComponent,
    MyProfileComponent,
    EditProfileComponent,
    MyRequestsComponent,
    MyAnnouncesComponent,
    MyClassesComponent,
    CreateClassDialogComponent,
    ViewClassComponent,
    MaterialsClassComponent,
    TestsClassComponent,
    ViewTestComponent,
    TestsClassComponent,
    EditProfileComponent,
    ReviewListComponent,
    CreateTestComponent,
    RaspundereTestComponent

  ],
    imports: [
      TableModule,
      TextFieldModule,
      MatPaginatorModule,
      MatFormFieldModule,
      MatInputModule,
      MatTableModule,
        CommonModule,
        HttpClientModule,
        BrowserModule,
        MatIconModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        FontAwesomeModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        DropdownModule,
        FormsModule,
        SidebarModule,
        MatCardModule,
        MegaMenuModule,
        PanelModule,
        ButtonModule,
        TieredMenuModule,
        FileUploadModule,
        GalleriaModule,
        BreadcrumbModule,
        ProgressSpinnerModule,
        StreamAutocompleteTextareaModule,
        StreamChatModule,
        MatDialogModule,
        TranslateModule.forRoot(),
        ToastrModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCEhZvh5fNHbTnI4jZM15Pd08jLNaN3F9w',
            libraries: ['places']
        }),
        MatButtonModule
    ],
  providers: [
    BreadcrumbService,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
