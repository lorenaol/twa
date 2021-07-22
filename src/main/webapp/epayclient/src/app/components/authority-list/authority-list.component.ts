import {Component, OnInit} from '@angular/core';
import {faEdit, faEye, faPlus, faTrash, faArrowUp, faArrowDown, faFilter} from '@fortawesome/free-solid-svg-icons';
import {ModalTypesEnum} from "@app/enums/modal-types.enum";
import {Authority} from "@app/entities/authority";
import {ModalService} from "@app/services/modal.service";
import {AuthorityService} from "@app/services/authority.service";
import {HttpResponse} from "@angular/common/http";

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
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faFilter = faFilter;
  faTrash = faTrash;
  name: string = ""
  code: string = ""
  id: string = ""
  page = 1;
  pageSize = 4;
  collectionSize = 0;
  predicate: string = 'id';
  ascending: boolean = true;

  authorities?: Authority[] | null;

  constructor(private authorityService: AuthorityService,
              private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    if (this.name == "" &&
      this.code == "" &&
      this.id == ""
    ) {

      this.authorityService.getAuthorities({
        page: this.page - 1,
        size: this.pageSize,
        sort: this.sort2()
      }).subscribe((data: HttpResponse<Authority[]>) => {
        this.authorities = data.body;
        this.collectionSize = Number(data.headers.get('X-Total-Count'));
      })
    } else {
      this.filter();
    }
  }

  openAuthorityModal(modalTypeEnum: ModalTypesEnum, inputAuthority?: Authority) {
    this.modalService.openAuthorityModal(modalTypeEnum, inputAuthority).then((result) => {
      if (result) {
        this.loadData();
      }
    });
  }

  openDeleteAuthorityModal(authority: Authority) {
    this.modalService.openDeleteAuthorityModal(authority).then((result) => {
      if (result) {
        this.loadData();
      }
    });
  }

  sort(col : string, ascending: boolean) {
    this.predicate = col;
    this.ascending = ascending;
    this.loadData();
  }

  sort2(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  filter() {
    this.authorityService.filterAuthorities(this.id, this.name, this.code, {
      page: this.page - 1,
      size: this.pageSize,
      sort: this.sort2()
    }).subscribe(data => {
      this.authorities = data.body;
      this.collectionSize = Number(data.headers.get('X-Total-Count'));
    })
  }

}
