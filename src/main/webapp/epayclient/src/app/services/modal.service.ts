import { Injectable } from '@angular/core';
import {ModalTypesEnum} from "../enums/modal-types.enum";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {CategoryFormComponent} from "../components/category-form/category-form.component";
import {RoleFormComponent} from "../components/role-form/role-form.component";
import {Category} from "../entities/category";
import {Role} from "../entities/role";
import {CategoryDeleteComponent} from "../components/category-delete/category-delete.component";
import {RoleDeleteComponent} from "../components/role-delete/role-delete.component";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalType?: ModalTypesEnum;

  constructor(private modalService: NgbModal) { }

  openCategoryModal(modalType: ModalTypesEnum, inputCategory?: Category) {
    const modalRef: NgbModalRef = this.modalService.open(CategoryFormComponent);
    modalRef.componentInstance.modalType = modalType;
    modalRef.componentInstance.inputCategory = inputCategory;

    return modalRef.result
      .then(result => {
        return result;
      });
  }

  openRoleModal(modalType: ModalTypesEnum, inputRole?: Role) {
    const modalRef: NgbModalRef = this.modalService.open(RoleFormComponent);
    modalRef.componentInstance.modalType = modalType;
    modalRef.componentInstance.inputRole = inputRole;

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

  openDeleteModalRole(inputRole: Role) {
    const modalRef: NgbModalRef = this.modalService.open(RoleDeleteComponent);
    modalRef.componentInstance.inputRole = inputRole;

    return modalRef.result
      .then(result => {
        return result;
      });
  }

}
