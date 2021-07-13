import {Component, OnInit} from '@angular/core';
import {faEye, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Product} from "../../entities/product";
import {ProductService} from "../../services/product.service";
import {ModalService} from "../../services/modal.service";
import {ModalTypesEnum} from "../../enums/modal-types.enum";
import {faEdit} from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  ModalTypesEnum = ModalTypesEnum;
  faPlus = faPlus;
  faEdit = faEdit;
  faEye = faEye;
  faTrash = faTrash;

  products?: Product[] | null;

  constructor(
    private productService: ProductService,
    private modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.productService.getProducts().subscribe(data=>{
      this.products = data.body;
    })
  }

  openProductModal(modalTypeEnum: ModalTypesEnum, inputProduct?: Product) {
    this.modalService.openProductModal(modalTypeEnum, inputProduct).then((result) => {
      if(result) {
        this.loadData();
      }
    });
  }

  openDeleteProductModal(product: Product) {
    this.modalService.openDeleteProductModal(product).then((result) => {
      if(result) {
        this.loadData();
      }
    });
  }
}