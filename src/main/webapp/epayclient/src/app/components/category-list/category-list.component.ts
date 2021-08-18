import {Component, OnInit} from '@angular/core';
import {faArrowUp, faArrowDown, faFilter, faEye, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Category} from "../../entities/category";
import {CategoryService} from "../../services/category.service";
import {ModalService} from "../../services/modal.service";
import {ModalTypesEnum} from "../../enums/modal-types.enum";
import {faEdit} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  ModalTypesEnum = ModalTypesEnum;
  faPlus = faPlus;
  faEdit = faEdit;
  faEye = faEye;
  faTrash = faTrash;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faFilter = faFilter;
  page = 1;
  pageSize = 4;
  collectionSize = 0;
  predicate: string = 'id';
  ascending: boolean = true;

  categories?: Category[] | null;
  id: string = ""
  categoryName: string = ""
  categoryCode: string = ""


  constructor(
    private categoryService: CategoryService,
    private modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    if(this.id == "" && this.categoryName == "") {
      this.categoryService.getCategories({
          page: this.page - 1,
          size: this.pageSize,
          sort: this.sort2()
        }
      ).subscribe(data => {
        this.categories = data.body;
        this.collectionSize = Number(data.headers.get('X-Total-Count'));
      })
    } else {
      this.filter();
    }
  }

  openCategoryModal(modalTypeEnum: ModalTypesEnum, inputCategory?: Category) {
    this.modalService.openCategoryModal(modalTypeEnum, inputCategory).then((result) => {
      if(result) {
        this.loadData();
      }
    });
  }

  openDeleteModal(category: Category) {
    this.modalService.openDeleteModal(category).then((result) => {
      if(result) {
        this.loadData();
      }
    });
  }

  sort(col : string, ascending: boolean) {
    this.predicate = col;
    this.ascending = ascending;
    this.loadData();
  }

  sort2(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  filter() {
    this.categoryService.filterCategories(this.id, this.categoryName, this.categoryCode, {
      page: this.page - 1,
      size: this.pageSize,
      sort: this.sort2()
    }).subscribe(data => {
      this.categories = data.body;
      this.collectionSize = Number(data.headers.get('X-Total-Count'));
    })
  }
}
