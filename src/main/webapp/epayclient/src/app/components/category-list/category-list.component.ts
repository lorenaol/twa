import {Component, OnInit} from '@angular/core';
import {faEye, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
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

  categories?: Category[] | null;
  stat?: string[] = ['id', 'categoryName', 'categoryCode', 'dateAdded']

  constructor(
    private categoryService: CategoryService,
    private modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data.body;
    })
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

  sort(col : string) {
    if(this.stat !== undefined) {
      if(this.stat.includes(col, 0)) {
        this.stat.splice(this.stat.indexOf(col, 0));
        this.categoryService.sortCategories(col, 'asc').subscribe(data => {
          this.categories = data.body;
        })
      } else {
        this.stat.push(col);
        this.categoryService.sortCategories(col, 'desc').subscribe(data => {
          this.categories = data.body;
        })
      }
    }
  }
}
