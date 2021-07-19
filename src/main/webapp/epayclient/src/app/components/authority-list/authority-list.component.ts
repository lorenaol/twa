import {Component, OnInit} from '@angular/core';
import {faEye, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {ModalTypesEnum} from "../../enums/modal-types.enum";
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {Authority} from "../../entities/authority";
import {ModalService} from "../../services/modal.service";
import {AuthorityService} from "../../services/authority.service";
import {Role} from "../../entities/role";

@Component({
  selector: 'app-authority-list',
  templateUrl: './authority-list.component.html',
  styleUrls: ['./authority-list.component.css']
})
export class AuthorityListComponent implements OnInit {
  ModalTypesEnum = ModalTypesEnum;
  faPlus = faPlus;
  faEdit = faEdit;
  faEye = faEye;
  faTrash = faTrash;

  authorities?: Authority[] | null;
  stat?: string[] = ['id', 'name', 'code', 'startDate', 'endDate']

  constructor( private authorityService: AuthorityService,
               private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.authorityService.getAuthorities().subscribe(data => {
      this.authorities = data.body;
    })
  }

  openAuthorityModal(modalTypeEnum: ModalTypesEnum, inputAuthority?: Authority) {
    this.modalService.openAuthorityModal(modalTypeEnum, inputAuthority).then((result) => {
      if(result) {
        this.loadData();
      }
    });
  }

  openDeleteAuthorityModal(authority: Authority) {
    this.modalService.openDeleteAuthorityModal(authority).then((result) => {
      if(result) {
        this.loadData();
      }
    });
  }

  sort(col : string) {
    if(this.stat !== undefined) {
      if(this.stat.includes(col, 0)) {
        this.stat.splice(this.stat.indexOf(col, 0));
        this.authorityService.sortAuthorities(col, 'asc').subscribe(data => {
          this.authorities = data.body;
        })
      } else {
        this.stat.push(col);
        this.authorityService.sortAuthorities(col, 'desc').subscribe(data => {
          this.authorities = data.body;
        })
      }
    }
  }

}
