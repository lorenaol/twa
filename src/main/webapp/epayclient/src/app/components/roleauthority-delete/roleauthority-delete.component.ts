import { Component, OnInit } from '@angular/core';
import {Roleauthority} from "../../entities/roleauthority";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {RoleauthorityService} from "../../services/roleauthority.service";

@Component({
  selector: 'app-roleauthority-delete',
  templateUrl: './roleauthority-delete.component.html',
  styleUrls: ['./roleauthority-delete.component.css']
})
export class RoleauthorityDeleteComponent implements OnInit {

  inputRoleauhority?: Roleauthority;

  constructor(
    private activeModal: NgbActiveModal,
    private roleauthorityService: RoleauthorityService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.activeModal.close(false);
  }

  delete(): void {
    this.subscribeToSaveResponse(this.roleauthorityService.deleteRoleAuthority(this.inputRoleauhority!));
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<Roleauthority>>): void {
    result.subscribe(
      () => this.onDeleteSuccess(),
      () => this.onDeleteError()
    );
  }

  private onDeleteSuccess(): void {
    this.activeModal.close(true);
    this.toastr.success('Role Authority deleted!', 'Success!');
  }

  private onDeleteError(): void {
    this.toastr.error('Error deleting role authority!', 'Error!');
  }
}
