import { Component, OnInit } from '@angular/core';
import {Product} from "@app/entities/product";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {ProductService} from "@app/services/product.service";

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  inputProduct?: Product;

  constructor(
    private activeModal: NgbActiveModal,
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.activeModal.close(false);
  }

  delete(): void {
    this.subscribeToSaveResponse(this.productService.deleteProduct(this.inputProduct!));
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<Product>>): void {
    result.subscribe(
      () => this.onDeleteSuccess(),
      () => this.onDeleteError()
    );
  }

  private onDeleteSuccess(): void {
    this.activeModal.close(true);
    this.toastr.success('Product deleted!', 'Success!');
  }

  private onDeleteError(): void {
    this.toastr.error('Error deleting product!', 'Error!');
  }
}
