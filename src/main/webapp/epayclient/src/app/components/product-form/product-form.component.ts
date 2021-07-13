import { Component, OnInit } from '@angular/core';
import {ModalTypesEnum} from "../../enums/modal-types.enum";
import {NgbActiveModal, NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder} from "@angular/forms";
import {Product} from "../../entities/product";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {ProductService} from "../../services/product.service";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  ModalTypesEnum = ModalTypesEnum;
  faCalendar = faCalendar;

  modalType?: ModalTypesEnum;
  inputProduct?: Product;
  productForm = this.fb.group({
    id: [],
    price: [],
    name: [],
    quantity: [],
    expire_date: [],
    sku: [],
    code: []
  });

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    if (this.inputProduct !== undefined) {
      this.updateForm(this.inputProduct);
    }
  }

  close(): void {
    this.activeModal.close(false);
  }

  save(): void {
    const product = this.createFromForm();
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.updateProduct(product));
    } else {
      this.subscribeToSaveResponse(this.productService.addProduct(product));
    }
  }

  private createFromForm(): Product {
    const expireDate = this.productForm.get('expire_date')!.value;
    const product = new Product();
    product.id = this.inputProduct?.id;
    product.price = this.productForm.get('price')!.value;
    product.name = this.productForm.get('name')!.value;
    product.quantity = this.productForm.get('quantity')!.value;
    product.expire_date = new Date(expireDate.year, expireDate.month-1, expireDate.day);
    product.sku = this.productForm.get('sku')!.value;
    product.code = this.productForm.get('code')!.value;

    return product;
  }

  private updateForm(product: Product): void {
    const expireDate = new Date(product?.expire_date!);
    this.productForm.setValue({
      id: product?.id,
      price: product?.price,
      name: product?.name,
      quantity: product?.quantity,
      expire_date: new NgbDate(expireDate?.getFullYear(), expireDate?.getMonth() + 1, expireDate?.getDate()),
      sku: product?.sku,
      code: product?.code
    });
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<Product>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  private onSaveSuccess(): void {
    this.activeModal.close(true);
    if (this.modalType === ModalTypesEnum.CREATE) {
      this.toastr.success('Product created!', 'Success!');
    } else {
      this.toastr.success('Product modified!', 'Success!');
    }
  }

  private onSaveError(): void {
    if (this.modalType === ModalTypesEnum.CREATE) {
      this.toastr.error('Error creating product!', 'Error!');
    } else {
      this.toastr.error('Error modifying product!', 'Error!');
    }
  }
}
