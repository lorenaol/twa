import {Component, OnInit} from '@angular/core';
import {faEye, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {User_role} from "../../entities/user_role";
import {User_roleService} from "../../services/user_role.service";
import {ModalService} from "../../services/modal.service";
import {ModalTypesEnum} from "../../enums/modal-types.enum";
import {faEdit} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-user-role-list',
  templateUrl: './user-role-list.component.html',
  styleUrls: ['./user-role-list.component.css']
})
export class UserRoleListComponent implements OnInit {

  ModalTypesEnum = ModalTypesEnum;
  faPlus = faPlus;
  faEdit = faEdit;
  faEye = faEye;
  faTrash = faTrash;

  user_roles?: User_role[] | null;

  constructor(
    private userRoleService: User_roleService,
    private modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.userRoleService.getUserrole().subscribe(data => {
      this.user_roles = data.body;
    })
  }

  openUserRoleModal(modalTypeEnum: ModalTypesEnum, inputUserrole?: User_role) {
    this.modalService.openUserRoleModal(modalTypeEnum, inputUserrole).then((result) => {
      if(result) {
        this.loadData();
      }
    });
  }

  openDeleteUserRoleModal(userRole: User_role) {
    this.modalService.openDeleteUserRoleModal(userRole).then((result) => {
      if(result) {
        this.loadData();
      }
    });
  }

  openSideBar(user_role: User_role) {
    this.modalService.openSideBar(user_role).then((result) => {
      if(result) {
        this.loadData();
      }
    });
  }
}
