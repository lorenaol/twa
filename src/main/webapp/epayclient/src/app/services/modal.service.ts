import {Injectable} from '@angular/core';
import {ModalTypesEnum} from "../enums/modal-types.enum";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {CategoryFormComponent} from "../components/category-form/category-form.component";
import {RoleFormComponent} from "../components/role-form/role-form.component";
import {Category} from "../entities/category";
import {Role} from "../entities/role";
import {CategoryDeleteComponent} from "../components/category-delete/category-delete.component";
import {Authority} from "../entities/authority";
import {AuthorityFormComponent} from "../components/authority-form/authority-form.component";
import {AuthorityDeleteComponent} from "../components/authority-delete/authority-delete.component";
import {Product} from "../entities/product";
import {ProductDeleteComponent} from "../components/product-delete/product-delete.component";
import {ProductFormComponent} from "../components/product-form/product-form.component";
import {RoleDeleteComponent} from "../components/role-delete/role-delete.component";
import {User} from "../entities/user";

import {UserFormComponent} from "../components/user-form/user-form.component";
import {UserDeleteComponent} from "../components/user-delete/user-delete.component";
import {UsersRomaniaComponent} from "../components/users-romania/users-romania.component";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalType?: ModalTypesEnum;

  constructor(private modalService: NgbModal) {
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

  openUserModal(modalType: ModalTypesEnum, inputUser?: User) {
    const modalRef: NgbModalRef = this.modalService.open(UserFormComponent, {size: "xl"});
    modalRef.componentInstance.modalType = modalType;
    modalRef.componentInstance.inputUser = inputUser;
    modalRef.componentInstance.latitude = inputUser?.latitude;
    modalRef.componentInstance.longitude = inputUser?.longitude;
    modalRef.componentInstance.address = inputUser?.address;

    return modalRef.result
      .then(result => {
        return result;
      });
  }

  openProductModal(modalType: ModalTypesEnum, inputProduct?: Product) {
    const modalRef: NgbModalRef = this.modalService.open(ProductFormComponent);
    modalRef.componentInstance.modalType = modalType;
    modalRef.componentInstance.inputProduct = inputProduct;

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

  openDeleteModalUser(inputUser: User) {
    const modalRef: NgbModalRef = this.modalService.open(UserDeleteComponent);
    modalRef.componentInstance.inputUser = inputUser;

    return modalRef.result
      .then(result => {
        return result;
      });
  }

  openUsersRomaniaModal(users?: User[]){
    const modalRef: NgbModalRef = this.modalService.open(UsersRomaniaComponent, {size: "xl"});

    return modalRef.result
      .then(result => {
        return result;
      });
  }
  openAuthorityModal(modalType: ModalTypesEnum, inputAuthority?: Authority) {
    const modalRef: NgbModalRef = this.modalService.open(AuthorityFormComponent);
    modalRef.componentInstance.modalType = modalType;
    modalRef.componentInstance.inputAuthority= inputAuthority;

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

    openDeleteAuthorityModal(inputAuthority: Authority) {
      const modalRef: NgbModalRef = this.modalService.open(AuthorityDeleteComponent);
      modalRef.componentInstance.inputAuthority = inputAuthority;

      return modalRef.result
        .then(result => {
          return result;
        });
    }

  openDeleteProductModal(inputProduct: Product) {
    const modalRef: NgbModalRef = this.modalService.open(ProductDeleteComponent);
    modalRef.componentInstance.inputProduct = inputProduct;

    return modalRef.result
      .then(result => {
        return result;
      });
  }

  openDeleteModalRole(inputRole:Role) {
    const modalRef: NgbModalRef = this.modalService.open(RoleDeleteComponent);
    modalRef.componentInstance.inputRole = inputRole;

    return modalRef.result
      .then(result => {
        return result;
      });
  }

}

