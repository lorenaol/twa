import { Component, OnInit } from '@angular/core';
import {Category} from "../../entities/category";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {

  inputCategory?: Category;

  constructor(
    private activeModal: NgbActiveModal,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.activeModal.close(false);
  }

  delete(): void {
    this.subscribeToSaveResponse(this.categoryService.deleteCategory(this.inputCategory!));
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<Category>>): void {
    result.subscribe(
      () => this.onDeleteSuccess(),
      () => this.onDeleteError()
    );
  }

  private onDeleteSuccess(): void {
    this.activeModal.close(true);
    this.toastr.success('Category deleted!', 'Success!');
  }

  private onDeleteError(): void {
    this.toastr.error('Error deleting category!', 'Error!');
  }
}
