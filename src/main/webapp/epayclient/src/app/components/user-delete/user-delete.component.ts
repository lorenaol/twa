import {Component, OnInit} from '@angular/core';
import {User} from "@app/entities/user";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {UserService} from "@app/services/user.service";


@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  inputUser?: User;

  constructor(
    private activeModal: NgbActiveModal,
    private userService: UserService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.activeModal.close(false);
  }

  delete(): void {
    this.subscribeToSaveResponse(this.userService.deleteUser(this.inputUser!));
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<User>>): void {
    result.subscribe(
      () => this.onDeleteSuccess(),
      () => this.onDeleteError()
    );
  }

  private onDeleteSuccess(): void {
    this.activeModal.close(true);
    this.toastr.success('User deleted!', 'Success!');
  }

  private onDeleteError(): void {
    this.toastr.error('Error deleting user!', 'Error!');
  }
}
