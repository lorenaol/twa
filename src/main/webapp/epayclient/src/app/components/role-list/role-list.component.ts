import { Component, OnInit } from '@angular/core';
import {faEye, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Role} from "../../entities/role";
import {RoleService} from "../../services/role.service";
import {ModalService} from "../../services/modal.service";
import {ModalTypesEnum} from "../../enums/modal-types.enum";
import {faEdit} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  ModalTypesEnum = ModalTypesEnum;
  faPlus = faPlus;
  faEdit = faEdit;
  faEye = faEye;
  faTrash = faTrash;

  roles?: Role[] | null;

  constructor(
    private roleService: RoleService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.roleService.getRoles().subscribe(data => {
      this.roles = data.body;
    })
  }

  openRoleModal(modalTypeEnum: ModalTypesEnum, inputRole?: Role) {
    this.modalService.openRoleModal(modalTypeEnum, inputRole).then((result) => {
      if(result) {
        this.loadData();
      }
    });
  }

  openDeleteModalRole(role: Role) {
    this.modalService.openDeleteModalRole(role).then((result) => {
      if(result) {
        this.loadData();
      }
    });
  }

}

