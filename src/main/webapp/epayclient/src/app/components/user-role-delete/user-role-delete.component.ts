import { Component, OnInit } from '@angular/core';
import {User_role} from "../../entities/user_role";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {User_roleService} from "../../services/user_role.service";

@Component({
  selector: 'app-user-role-delete',
  templateUrl: './user-role-delete.component.html',
  styleUrls: ['./user-role-delete.component.css']
})
export class UserRoleDeleteComponent implements OnInit {

  inputUserRole?: User_role;

  constructor(
    private activeModal: NgbActiveModal,
    private userRoleService: User_roleService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.activeModal.close(false);
  }

  delete(): void {
    this.subscribeToSaveResponse(this.userRoleService.deleteUserrole(this.inputUserRole!));
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<User_role>>): void {
    result.subscribe(
      () => this.onDeleteSuccess(),
      () => this.onDeleteError()
    );
  }

  private onDeleteSuccess(): void {
    this.activeModal.close(true);
    this.toastr.success('User Role deleted!', 'Success!');
  }

  private onDeleteError(): void {
    this.toastr.error('Error deleting User Role!', 'Error!');
  }
}
