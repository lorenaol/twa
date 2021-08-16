import {Component, OnInit} from '@angular/core';
import {faArrowUp, faArrowDown, faFilter, faEye, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Product} from "../../entities/product";
import {ProductService} from "../../services/product.service";
import {ModalService} from "../../services/modal.service";
import {ModalTypesEnum} from "../../enums/modal-types.enum";
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {HttpResponse} from "@angular/common/http";
import * as fileSaver from 'file-saver';



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
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faFilter = faFilter;
  predicate: string = 'id';
  ascending: boolean = true;
  page = 1;
  pageSize = 4;
  collectionSize = 0;
  name: string = "";
  id: string = "";
  code: string = "";
  sku: string = "";
  category: string= "";

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

  sort(col: string, ascending: boolean) {
    this.predicate = col;
    this.ascending = ascending;
    this.loadData();
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

  exportExcel() {
    this.productService.exportToExcel(this.id, this.name, this.code, this.sku, {
      sort: this.sort2()
    })
      .subscribe((response:HttpResponse<Blob>) => {
        // console.log(response);
        const str = response.headers.get("Content-Disposition");
        const splitted = str!.split("=");
        const fileName = splitted[1];
        // console.log(splitted)
          fileSaver.saveAs(response.body!, fileName);
      }
      , error => console.log('Error downloading the file')
      , () => console.log('File downloaded successfully'));
  }


  exportPdf() {
    this.productService.exportToPdf(this.id, this.name, this.code, this.sku, {
      sort: this.sort2()
    })
      .subscribe((response:HttpResponse<Blob>) => {
          // console.log(response);
          const str = response.headers.get("Content-Disposition");
          const splitted = str!.split("=");
          const fileName = splitted[1];
          // console.log(splitted)
          fileSaver.saveAs(response.body!, fileName);
        }
        , error => console.log('Error downloading the file')
        , () => console.log('File downloaded successfully'));
  }


}
