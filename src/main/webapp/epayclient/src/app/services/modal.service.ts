import { Injectable } from '@angular/core';
import {ModalTypesEnum} from "../enums/modal-types.enum";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {CategoryFormComponent} from "../components/category-form/category-form.component";
import {Category} from "../entities/category";
import {CategoryDeleteComponent} from "../components/category-delete/category-delete.component";
import {User} from "../entities/user";
import {UserService} from "./userservice.service";
import {UserFormComponent} from "../components/user-form/user-form.component";
import {UserDeleteComponent} from "../components/user-delete/user-delete.component";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalType?: ModalTypesEnum;

  constructor(private modalService: NgbModal) { }

  openUserModal(modalType: ModalTypesEnum, inputUser?: User) {
    const modalRef: NgbModalRef = this.modalService.open(UserFormComponent);
    modalRef.componentInstance.modalType = modalType;
    modalRef.componentInstance.inputUser = inputUser;

    return modalRef.result
      .then(result => {
        return result;
      });
  }

  openDeleteModalUser(inputUser: User) {
    const modalRef: NgbModalRef = this.modalService.open(UserDeleteComponent);
    modalRef.componentInstance.inputUser = inputUser;

    return modalRef.result
      .then(result => {
        return result;
      });
  }
  openCategoryModal(modalType: ModalTypesEnum, inputCategory?: Category) {
    const modalRef: NgbModalRef = this.modalService.open(CategoryFormComponent);
    modalRef.componentInstance.modalType = modalType;
    modalRef.componentInstance.inputCategory = inputCategory;

    return modalRef.result
      .then(result => {
        return result;
      });
  }

  openDeleteModal(inputCategory: Category) {
    const modalRef: NgbModalRef = this.modalService.open(CategoryDeleteComponent);
    modalRef.componentInstance.inputCategory = inputCategory;

    return modalRef.result
      .then(result => {
        return result;
      });
  }

}
