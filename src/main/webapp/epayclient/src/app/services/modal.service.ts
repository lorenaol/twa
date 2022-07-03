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
import {Roleauthority} from "../entities/roleauthority";
import {RoleauthorityDeleteComponent} from "../components/roleauthority-delete/roleauthority-delete.component";
import {RoleauthorityFormComponent} from "../components/roleauthority-form/roleauthority-form.component";
import {User_role} from "../entities/user_role";
import {UserRoleDeleteComponent} from "../components/user-role-delete/user-role-delete.component";
import {UserRoleFormComponent} from "../components/user-role-form/user-role-form.component";
import {ShoppingCartComponent} from "@app/components/shopping-cart/shopping-cart.component";
import {Anunt} from "@app/entities/anunt";


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalType?: ModalTypesEnum;

  constructor(private modalService: NgbModal) {
  }

  openCategoryModal(modalType: ModalTypesEnum, inputCategory?: Anunt) {
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
    modalRef.componentInstance.setData(modalType,inputUser!);


    return modalRef.result
      .then(result => {
        return result;
      });
  }

  openUserRoleModal(modalType: ModalTypesEnum, inputUserRole?: User_role) {
    const modalRef: NgbModalRef = this.modalService.open(UserRoleFormComponent);
    modalRef.componentInstance.modalType = modalType;

    modalRef.componentInstance.inputUserRole = inputUserRole;
    modalRef.componentInstance.isOpen = true;
    return modalRef.result
      .then(result => {
        return result;
      });
  }

  openProductModal(modalType: ModalTypesEnum, inputProduct?: Product) {
    const modalRef: NgbModalRef = this.modalService.open(ProductFormComponent);
    modalRef.componentInstance.modalType = modalType;
    modalRef.componentInstance.inputProduct = inputProduct;
    modalRef.componentInstance.image = inputProduct?.image;
    modalRef.componentInstance.images = inputProduct?.images;
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

  openDeleteUserRoleModal(inputUserRole: User_role) {
    const modalRef: NgbModalRef = this.modalService.open(UserRoleDeleteComponent);
    modalRef.componentInstance.inputUserRole = inputUserRole;

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

  openRoleauthorityModal(modalType: ModalTypesEnum, inputRoleauthority?: Roleauthority) {
    const modalRef: NgbModalRef = this.modalService.open(RoleauthorityFormComponent);
    modalRef.componentInstance.modalType = modalType;

    modalRef.componentInstance.inputRoleauthority = inputRoleauthority;
    modalRef.componentInstance.isOpen2 = true;

    return modalRef.result
      .then(result => {
        return result;
      });
  }
  openDeleteRoleauthorityModal(inputRoleauthority: Roleauthority) {

    const modalRef: NgbModalRef = this.modalService.open(RoleauthorityDeleteComponent);
    modalRef.componentInstance.inputRoleauthority = inputRoleauthority;

    return modalRef.result
      .then(result => {
        return result;
      });
  }

  openSideBar(user_role: User_role) {
    const modalRef: NgbModalRef = this.modalService.open(UserRoleFormComponent);
    modalRef.componentInstance.inputUserRole = user_role;
    modalRef.componentInstance.isOpen = true;

    return modalRef.result
      .then(result => {
        return result;
      });

  }

}

