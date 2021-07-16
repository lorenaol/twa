import { Component, OnInit } from '@angular/core';
import {ModalTypesEnum} from "../../enums/modal-types.enum";
import {NgbActiveModal, NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder} from "@angular/forms";
import {User} from "../../entities/user";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

import {faCalendar} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  ModalTypesEnum = ModalTypesEnum;
  faCalendar = faCalendar;

  modalType?: ModalTypesEnum;
  inputUser?: User;

  userForm = this.fb.group({
    id: [],
    name: [],
    email: [],
    password: [],
    is_active: [],
    start_date: [],
    end_date: []
  });

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (this.inputUser !== undefined) {
      this.updateForm(this.inputUser);
    }
  }

  close(): void {
    this.activeModal.close(false);
  }

  save(): void {
    const user = this.createFromForm();
    if (user.id !== undefined) {
      this.subscribeToSaveResponse(this.userService.updateUser(user));
    } else {
      this.subscribeToSaveResponse(this.userService.addUser(user));
    }
  }

  private createFromForm(): User {
    const start_date = this.userForm.get('start_date')!.value;
    const end_date = this.userForm.get('end_date')!.value;
    const user = new User();
    user.id = this.inputUser?.id;
    user.name = this.userForm.get('name')!.value;
    user.email = this.userForm.get('email')!.value;
    user.password = this.userForm.get('password')!.value;
    user.is_active = this.userForm.get('is_active')!.value;
    user.start_date = new Date(start_date.year, start_date.month-1, start_date.day);
    user.end_date = new Date(end_date.year, end_date.month-1, end_date.day);
    return user;
  }

  private updateForm(user: User): void {
    const start_date = new Date(user?.start_date!);
    const end_date = new Date(user?.end_date!);
    this.userForm.setValue({
      id: user?.id,
      name: user?.name,
      email: user?.email,
      password: user?.password,
      is_active: user?.is_active,
      start_date: new NgbDate(start_date?.getFullYear(), start_date?.getMonth() + 1, start_date?.getDate()),
      end_date: new NgbDate(end_date?.getFullYear(), end_date?.getMonth() + 1, end_date?.getDate())
    });
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<User>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  private onSaveSuccess(): void {
    this.activeModal.close(true);
    if (this.modalType === ModalTypesEnum.CREATE) {
      this.toastr.success('User created!', 'Success!');
    } else {
      this.toastr.success('User modified!', 'Success!');
    }
  }

  private onSaveError(): void {
    if (this.modalType === ModalTypesEnum.CREATE) {
      this.toastr.error('Error creating user!', 'Error!');
    } else {
      this.toastr.error('Error modifying user!', 'Error!');
    }
  }
}
