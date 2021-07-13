import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Authority} from "../../entities/authority";
import {AuthorityService} from "../../services/authority.service";


@Component({
  selector: 'app-authority-delete',
  templateUrl: './authority-delete.component.html',
  styleUrls: ['./authority-delete.component.css']
})
export class AuthorityDeleteComponent implements OnInit {

  inputAuthority?: Authority;

  constructor(
    private activeModal: NgbActiveModal,
    private authorityService: AuthorityService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }
  close(): void {
    this.activeModal.close(false);
  }
  delete(): void {
    this.subscribeToSaveResponse(this.authorityService.deleteAuthority(this.inputAuthority!));
  }
  private subscribeToSaveResponse(result: Observable<HttpResponse<Authority>>): void {
    result.subscribe(
      () => this.onDeleteSuccess(),
      () => this.onDeleteError()
    );
  }
  private onDeleteSuccess(): void {
    this.activeModal.close(true);
    this.toastr.success('Authority deleted!', 'Success!');
  }
  private onDeleteError(): void {
    this.toastr.error('Error deleting authority!', 'Error!');
  }

}
