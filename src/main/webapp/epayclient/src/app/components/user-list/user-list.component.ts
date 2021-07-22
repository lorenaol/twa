import {Component, OnInit} from '@angular/core';
import {faArrowsAltV, faEye, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {User} from "../../entities/user";

import {ModalService} from "../../services/modal.service";
import {ModalTypesEnum} from "../../enums/modal-types.enum";
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {UserService} from "../../services/user.service";

import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  ModalTypesEnum = ModalTypesEnum;
  faPlus = faPlus;
  faEdit = faEdit;
  faArrow = faArrowsAltV;
  faEye = faEye;
  faTrash = faTrash;
  page = 1;
  pageSize = 4;
  predicate: string = 'id';
  ascending: boolean = true;
  collectionSize = 0;
  stat?: string[] = ['id', 'name', 'email', 'password', 'isActive', 'startDate', 'endDate']
  id: string = ""
  name: string = ""
  email: string = ""

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
    if(this.name =="" &&
      this.email =="" &&
      this.id ==""
    ) {
      this.userService.getUsers( {
        page: this.page - 1,
        size: this.pageSize,
        sort: this.sort2()
      }).subscribe((data : HttpResponse<User[]>) => {
        this.users = data.body;
        this.collectionSize = Number(data.headers.get('X-Total-Count'));
      })
    } else {
      this.filter();
    }
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

  sort2(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  sort(col : string) {
    if(this.stat !== undefined) {
      if(this.stat.includes(col, 0)) {
        this.stat.splice(this.stat.indexOf(col, 0));
        this.predicate = col;
        this.ascending = true;
        this.loadData();
      } else {
        this.stat.push(col);
        this.ascending = false;
        this.predicate = col;
        this.loadData();
      }
    }
  }
  filter() {
    this.userService.filterUsers(this.id, this.name, this.email, {
      page: this.page - 1,
      size: this.pageSize,
      sort: this.sort2()
    }).subscribe(data => {
      this.users = data.body;
      this.collectionSize = Number(data.headers.get('X-Total-Count'));
    })
  }


}
