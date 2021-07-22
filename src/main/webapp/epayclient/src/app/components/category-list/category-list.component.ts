import {Component, OnInit} from '@angular/core';
import {faArrowsAltV, faEye, faPlus, faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import {Category} from "@app/entities/category";
import {CategoryService} from "@app/services/category.service";
import {ModalService} from "@app/services/modal.service";
import {ModalTypesEnum} from "@app/enums/modal-types.enum";

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
  faArrow = faArrowsAltV;
  page = 1;
  pageSize = 4;
  collectionSize = 0;
  predicate: string = 'id';
  ascending: boolean = true;

  categories?: Category[] | null;
  stat?: string[] = ['id', 'categoryName', 'categoryCode', 'dateAdded']
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
    if (this.id == "" && this.categoryName == "") {
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
      if (result) {
        this.loadData();
      }
    });
  }

  openDeleteModal(category: Category) {
    this.modalService.openDeleteModal(category).then((result) => {
      if (result) {
        this.loadData();
      }
    });
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
        this.predicate = col;
        this.ascending = false;
        this.loadData();
      }
    }
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
