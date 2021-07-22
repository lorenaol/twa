import {Component, OnInit} from '@angular/core';
import {faArrowsAltV, faEdit, faEye, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
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
  faArrow = faArrowsAltV;
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
  stat?: string[] = ['id', 'name', 'code', 'startDate', 'endDate']

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
        console.log(this.collectionSize)
        console.log(data)
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

  sort(col: string) {
    if (this.stat !== undefined) {
      if (this.stat.includes(col, 0)) {
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
