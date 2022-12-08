import {Component, OnInit} from '@angular/core';
import {ModalTypesEnum} from "@app/enums/modal-types.enum";
import {NgbActiveModal, NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder} from "@angular/forms";
import {Product} from "@app/entities/product";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {ProductService} from "@app/services/product.service";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";
import {Category} from "@app/entities/category";
import {CategoryService} from "@app/services/category.service";
import {Image} from "@app/entities/image";
import {ImageService} from "@app/services/image.service";
import {UserService} from "@app/services/user.service";
import {User} from "@app/entities/user";
import {environment} from "@environments/environment";
import {map} from "rxjs/operators";


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
  image?: string;
  images?: Image[] = [];
  uploadedFiles: any[] = [];
  createdDate?: Date;
 

  productForm = this.fb.group({
    id: [],
    detalii: [],
    // tip: [],
    materie: [],
    telefon: [],
    user: [],
    oras: [],
    image:[],
    facultate : [],
    an : [],
    clasa: []
  });

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private userService: UserService,
  ) {}
  user? :User;
  ngOnInit(): void {
    this.userService.getUsersByEmail(JSON.parse(localStorage.getItem("user")!).userName).subscribe((data)=> {
      this.user = data.body!;
    });
    // if (this.inputProduct !== undefined) {
    //   this.updateForm(this.inputProduct);
    // }
    // this.categoryService.getCategories().subscribe(data => {
    //   this.categories = data.body;
    // })
    // let today = new Date();
    // this.createdDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  }

  getBase64Image($event: any): void {
    let me = this;
    let file = $event.originalEvent.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.image = reader.result?.toString().substring(23);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  getBase64MoreImages($event: any): void {
    let me = this;
    let i: number;
    me.images = [];
    for(i = 0; i < $event.currentFiles.length; i++){
      let file = $event.currentFiles[i];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        if(reader.result?.toString().substring(23))
          if(me.images)
            me.images.push({
              imageCode: reader.result?.toString().substring(23)
            });
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }

  getBase64MoreImagesEdit($event: any): void {
    let me = this;
    let i: number;
    for(i = 0; i < $event.currentFiles.length; i++){
      let file = $event.currentFiles[i];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        if(reader.result?.toString().substring(23))
          if (me.inputProduct?.images)
            me.inputProduct?.images.push({
              imageCode: reader.result?.toString().substring(23)
            });
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
    if (this.inputProduct?.images)
      this.images = this.inputProduct.images;
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
    // id: [],
    //   detalii: [],
    //   tip: [],
    //   materie: [],
    //   telefon: [],
    //   user: [],
    //   oras: [],
    // const expireDate = this.productForm.get('expireDate')!.value;
    const product = new Product()
    
    product.price = this.productForm.get('price')!.value;
    product.name = this.productForm.get('name')!.value;
    product.quantity = this.productForm.get('quantity')!.value;
    // product.expireDate = new Date(expireDate.year, expireDate.month - 1, expireDate.day);
    product.sku = this.productForm.get('sku')!.value;
    product.code = this.productForm.get('code')!.value;
    product.category = this.productForm.get('category')!.value;
    product.image = this.image;
    product.images = this.images;
    product.createdDate = this.createdDate;
    return product;
  }

  private updateForm(product: Product): void {
    const expireDate = new Date(product?.expireDate!);
    const createdDate = new Date(product?.createdDate!);
    this.productForm.setValue({
      id: product?.id,
      price: product?.price,
      name: product?.name,
      quantity: product?.quantity,
      expireDate: new NgbDate(expireDate?.getFullYear(), expireDate?.getMonth() + 1, expireDate?.getDate()),
      sku: product?.sku,
      code: product?.code,
      category: product?.category,
      image: product?.image,
      images: product?.images,
      createdDate: new NgbDate(createdDate?.getFullYear(), createdDate?.getMonth() + 1, createdDate?.getDate())
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
      this.toastr.success('Anunt adaugat!', 'Success!');
    } else {
      this.toastr.success('Anunt modificat!', 'Success!');
    }
  }

  private onSaveError(): void {
    if (this.modalType === ModalTypesEnum.CREATE) {
      this.toastr.error('Eroare la crearea anuntului!', 'Error!');
    } else {
      this.toastr.error('Eroare la modificarea produsului!', 'Error!');
    }
  }
}
