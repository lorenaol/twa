import {Component, OnInit} from '@angular/core';
import {faEye, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {User} from "../../entities/user";

import {ModalService} from "../../services/modal.service";
import {ModalTypesEnum} from "../../enums/modal-types.enum";
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {UserService} from "../../services/userservice.service";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  ModalTypesEnum = ModalTypesEnum;
  faPlus = faPlus;
  faEdit = faEdit;
  faEye = faEye;
  faTrash = faTrash;

  users?: User[] | null;

  constructor(
    private userService: UserService,
    private modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.userService.getUsers().subscribe((data: any) => {
      this.users = data.body;
    })
  }

  openUserModal(modalTypeEnum: ModalTypesEnum, inputUser?: User) {
    this.modalService.openUserModal(modalTypeEnum, inputUser).then((result) => {
      if(result) {
        this.loadData();
      }
    });
  }

  openDeleteModalUser(user: User) {
    this.modalService.openDeleteModalUser(user).then((result) => {
      if(result) {
        this.loadData();
      }
    });
  }


}
