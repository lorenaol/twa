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

  categoryForm = this.fb.group({
    id: [],
    categoryName: [],
    categoryCode: [],
    categoryDescription: [],
    storeId: [],
    dateAdded: []
  });

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    if (this.inputCategory !== undefined) {
      this.updateForm(this.inputCategory);
    }
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
    const dateAdded = this.categoryForm.get('dateAdded')!.value;
    const category = new Category();
    category.id = this.inputCategory?.id;
    category.categoryName = this.categoryForm.get('categoryName')!.value;
    category.categoryCode = this.categoryForm.get('categoryCode')!.value;
    category.categoryDescription = this.categoryForm.get('categoryDescription')!.value;
    category.storeId = this.categoryForm.get('storeId')!.value;
    category.dateAdded = new Date(dateAdded.year, dateAdded.month-1, dateAdded.day);
    return category;
  }

  private updateForm(category: Category): void {
    const dateAdded = new Date(category?.dateAdded!);
    this.categoryForm.setValue({
      id: category?.id,
      categoryName: category?.categoryName,
      categoryCode: category?.categoryCode,
      categoryDescription: category?.categoryDescription,
      storeId: category?.storeId,
      dateAdded: new NgbDate(dateAdded?.getFullYear(), dateAdded?.getMonth() + 1, dateAdded?.getDate())
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
