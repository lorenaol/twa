import {Component, OnInit} from '@angular/core';
import {faArrowsAltV, faEye, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Product} from "@app/entities/product";
import {ProductService} from "@app/services/product.service";
import {ModalService} from "@app/services/modal.service";
import {ModalTypesEnum} from "@app/enums/modal-types.enum";
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {HttpResponse} from "@angular/common/http";


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
  faArrow = faArrowsAltV;
  predicate: string = 'id';
  ascending: boolean = true;
  page = 1;
  pageSize = 4;
  collectionSize = 0;
  name: string = "";
  id: string = "";
  code: string = "";
  sku: string = "";

  products?: Product[] | null;
  stat?: string[] = ['id', 'name', 'price', 'quantity', 'code', 'expire_date', 'sku']

  constructor(
    private productService: ProductService,
    private modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    if (this.name == "" &&
      this.code == "" &&
      this.id == "" && this.sku == ""
    ) {
      this.productService.getProducts({
        page: this.page - 1,
        size: this.pageSize,
        sort: this.sort2()
      }).subscribe((data: HttpResponse<Product[]>) => {
        this.products = data.body;
        this.collectionSize = Number(data.headers.get('X-Total-Count'));
      })
    } else {
      this.filter();
    }
  }

  openProductModal(modalTypeEnum: ModalTypesEnum, inputProduct?: Product) {
    this.modalService.openProductModal(modalTypeEnum, inputProduct).then((result) => {
      if (result) {
        this.loadData();
      }
    });
  }

  openDeleteProductModal(product: Product) {
    this.modalService.openDeleteProductModal(product).then((result) => {
      if (result) {
        this.loadData();
      }
    });
  }

  sort2(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  sort(col: string) {
    if (this.stat !== undefined) {
      if (this.stat.includes(col, 0)) {
        this.stat.splice(this.stat.indexOf(col, 0));
        this.predicate = col;
        this.ascending = true;
        this.loadData();
      } else {
        this.stat.push(col);
        this.ascending = false;
        this.predicate = col;
        this.loadData();
      }
    }
  }

  filter() {
    this.productService.filterProducts(this.id, this.name, this.code, this.sku, {
      page: this.page - 1,
      size: this.pageSize,
      sort: this.sort2()
    }).subscribe(data => {
      this.products = data.body;
      this.collectionSize = Number(data.headers.get('X-Total-Count'));
    })
  }
}
