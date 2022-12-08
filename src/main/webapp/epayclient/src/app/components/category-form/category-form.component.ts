import { Component, OnInit } from '@angular/core';
import {ModalTypesEnum} from "@app/enums/modal-types.enum";
import {NgbActiveModal, NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder} from "@angular/forms";
import {Category} from "@app/entities/category";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {CategoryService} from "@app/services/category.service";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {ReviewService} from "@app/services/review.service";
import {Review} from "@app/entities/review";
import {UserService} from "@app/services/user.service";


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  ModalTypesEnum = ModalTypesEnum;
  faCalendar = faCalendar;

  modalType?: ModalTypesEnum;
  inputCategory?: Category;
  createdDate?: Date;

  categoryForm = this.fb.group({
    nume: [],
    Locatie: [],
    Materie: [],
    Descriere: [],
    Telefon: [],
    Email: []
  });
  reviews : Review[] = []
  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private router: Router,
    private reviewService: ReviewService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.reviewService.getReviewsByProductId(this.inputCategory?.id!).subscribe((data)=>{
      this.reviews = data.body!;
    });
    if (this.inputCategory !== undefined) {
      // this.updateForm(this.inputCategory);
    }
    console.log(this.inputCategory)
    // let today = new Date();
    // this.createdDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }
  redirect2() : void {
    this.activeModal.close(false);
    localStorage.setItem("anunt", JSON.stringify(this.inputCategory!));
    this.router.navigate(["/reviews/"]);
  }
  redirect1() : void {
    this.activeModal.close(false);
    localStorage.setItem("anunt", JSON.stringify(this.inputCategory!));
    this.router.navigate(["/review-list/"]);
  }
  redirect3() : void {
    this.activeModal.close(false);


    this.userService.getUsersByEmail(JSON.parse(localStorage.getItem('user')!).userName).subscribe((data:any) => {

    })

  }
  isLoggedIn(): boolean {
    let user = localStorage.getItem('user');
    if (user) {
      return true;
    }
    return false;
  }
  close(): void {
    this.activeModal.close(false);
  }


  save(): void {
    const category = this.createFromForm();
    if (category.id !== undefined) {
      this.subscribeToSaveResponse(this.categoryService.updateCategory(category));
    } else {
      this.subscribeToSaveResponse(this.categoryService.addCategory(category));
    }
  }

  private createFromForm(): Category {
    const category = new Category();
    category.id = this.inputCategory?.id;
    category.categoryName = this.categoryForm.get('categoryName')!.value;
    category.categoryCode = this.categoryForm.get('categoryCode')!.value;
    category.categoryDescription = this.categoryForm.get('categoryDescription')!.value;
    category.storeId = this.categoryForm.get('storeId')!.value;
    category.createdDate = this.createdDate;
    return category;
  }

  private updateForm(category: Category): void {
    const createdDate = new Date(category?.createdDate!);
    this.categoryForm.setValue({
      id: category?.id,
      categoryName: category?.categoryName,
      categoryCode: category?.categoryCode,
      categoryDescription: category?.categoryDescription,
      storeId: category?.storeId,
      createdDate: new NgbDate(createdDate?.getFullYear(), createdDate?.getMonth() + 1, createdDate?.getDate())
    });
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<Category>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  private onSaveSuccess(): void {
    this.activeModal.close(true);
    if (this.modalType === ModalTypesEnum.CREATE) {
      this.toastr.success('Category created!', 'Success!');
    } else {
      this.toastr.success('Category modified!', 'Success!');
    }
  }

  private onSaveError(): void {
    if (this.modalType === ModalTypesEnum.CREATE) {
      this.toastr.error('Error creating category!', 'Error!');
    } else {
      this.toastr.error('Error modifying category!', 'Error!');
    }
  }
}
