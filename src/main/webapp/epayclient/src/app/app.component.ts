import {Component, ViewEncapsulation} from '@angular/core';
import {User, UserWithAuthoritiesDto} from "@app/entities/user";
import { Router } from "@angular/router";
import { AuthenticationService } from "@app/services/authentication.service";
import { Authorities } from "@app/enums/authorities";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {Category} from "@app/entities/category";
import {CategoryService} from "@app/services/category.service";
import {MenuItem} from 'primeng/api';
import {UserService} from "@app/services/user.service";
import  {environment} from "@environments/environment";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  Authorities = Authorities;
  faUser = faUser;
  faBars = faBars;
  user!: UserWithAuthoritiesDto | null;
  categories?: Category[] | null;
  items: MenuItem[] = [{}];
  private password: string | undefined;


  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private categoryService: CategoryService,
              private userService: UserService
  ) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }


  ngOnInit(): void {
      this.loadData();

  }

  loadData(): void {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data.body;
      this.loadItems();
    })
  }

  f(category: Category): MenuItem[]{
    let v: MenuItem[]=[];
    if (category.products)
      for(let product of category.products){
         v = v.concat([
           {
             label: product.name,
             url:`${environment.browserURL}` + "products/" + product.id,
           }
           ]);
      }
    return v;
  }

  loadItems(): void{
    let i = 0;
    if(this.categories && this.items){
      for(let category of this.categories){
        if(i === 0)
          this.items[0] = {
            label: `${category.categoryName}`,
            url: `${environment.browserURL}` + "categories/" + category.id,
            items: this.f(category)
          };
        else
          this.items.push({
            label: `${category.categoryName}`,
            url: `${environment.browserURL}` + "categories/" + category.id,
            items: this.f(category)
          });
        i++;
      }
    }

  }

  logout() {
    this.authenticationService.logout();
  }


  login() {
      this.authenticationService.showLogin();
  }

  isLoggedIn(): boolean {
    let user = localStorage.getItem('user');
    if (user) {
      return true;
    }
    return false;
  }

  signin() {
    this.authenticationService.showSignin();
  }

  changepass() {
    this.userService.showFPass();
  }
}


