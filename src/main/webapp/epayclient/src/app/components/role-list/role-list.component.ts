import { Component, OnInit, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import {faArrowsAltV, faEye, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Role} from "../../entities/role";
import {RoleService} from "../../services/role.service";
import {ModalService} from "../../services/modal.service";
import {ModalTypesEnum} from "../../enums/modal-types.enum";
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {HttpResponse} from "@angular/common/http";
import {Data} from "@angular/router";

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  page = 1;
  pageSize = 4;
  collectionSize = 0;
  ModalTypesEnum = ModalTypesEnum;
  faPlus = faPlus;
  faArrow = faArrowsAltV;
  faEdit = faEdit;
  faEye = faEye;
  faTrash = faTrash;
  stat?: string[] = ['id', 'name', 'code', 'startDate', 'endDate']
  predicate: string = 'id';
  ascending: boolean = true;
  name: string = "";
  id:string ="";
  startDate?: Data;
  endDate?: Data;
  code: string="";

  roles?: Role[] | null;

  constructor(
    private roleService: RoleService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    if(this.name =="" &&
      this.code =="" &&
      this.id ==""
    ) {
      this.roleService.getRoles( {
        page: this.page - 1,
        size: this.pageSize,
        sort: this.sort2()
      }).subscribe((data : HttpResponse<Role[]>) => {
        this.roles = data.body;
        this.collectionSize = Number(data.headers.get('X-Total-Count'));
        console.log(this.collectionSize)
        console.log(data)
      })
    } else {
      this.filter();
    }

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

  sort2(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }


  filter() {
    console.log(this.code)
    this.roleService.filterRoles(this.id, this.name, this.code, this.startDate, this.endDate, {
      page: this.page - 1,
      size: this.pageSize,
      sort: this.sort2()
    }).subscribe(data => {
      this.roles = data.body;
      this.collectionSize = Number(data.headers.get('X-Total-Count'));
    })

  }

}






