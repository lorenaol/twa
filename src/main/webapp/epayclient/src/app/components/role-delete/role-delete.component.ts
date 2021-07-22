import {Component, OnInit} from '@angular/core';
import {Role} from "@app/entities/role";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {RoleService} from "@app/services/role.service";

@Component({
  selector: 'app-role-delete',
  templateUrl: './role-delete.component.html',
  styleUrls: ['./role-delete.component.css']
})
export class RoleDeleteComponent implements OnInit {

  inputRole?: Role;

  constructor(
    private activeModal: NgbActiveModal,
    private roleService: RoleService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.activeModal.close(false);
  }

  delete(): void {
    this.subscribeToSaveResponse(this.roleService.deleteRole(this.inputRole!));
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<Role>>): void {
    result.subscribe(
      () => this.onDeleteSuccess(),
      () => this.onDeleteError()
    );
  }

  private onDeleteSuccess(): void {
    this.activeModal.close(true);
    this.toastr.success('Role deleted!', 'Success!');
  }

  private onDeleteError(): void {
    this.toastr.error('Error deleting role!', 'Error!');
  }

}


