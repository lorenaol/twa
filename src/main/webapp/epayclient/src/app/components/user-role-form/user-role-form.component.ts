import { Component, OnInit } from '@angular/core';
import {ModalTypesEnum} from "../../enums/modal-types.enum";
import {NgbActiveModal, NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder} from "@angular/forms";
import {User_role} from "../../entities/user_role";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {User_roleService} from "../../services/user_role.service";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";
import {Authority} from "../../entities/authority";
import {Role} from "../../entities/role";
import {User} from "../../entities/user";
import {AuthorityService} from "../../services/authority.service";
import {RoleService} from "../../services/role.service";
import {UserService} from "../../services/userservice.service";

@Component({
  selector: 'app-user-role-form',
  templateUrl: './user-role-form.component.html',
  styleUrls: ['./user-role-form.component.css']
})
export class UserRoleFormComponent implements OnInit {

  ModalTypesEnum = ModalTypesEnum;
  faCalendar = faCalendar;

  modalType?: ModalTypesEnum;
  inputUserRole?: User_role;

  userRoleForm = this.fb.group({
    id: [],
    user: [],
    role: [],
    start_date: [],
    end_date: []
  });
  users?: User[] | null | undefined = [];
  roles?: Role[] | null | undefined = [];
  visibleSidebar2: any;


  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private userRoleService: User_roleService,
    private userService: UserService,
    private roleService : RoleService
  ) { }

  ngOnInit(): void {
    if (this.inputUserRole !== undefined) {
      this.updateForm(this.inputUserRole);
    }

    this.userService.getUsers().subscribe(data => {
      this.users = data.body;
    })

    this.roleService.getRoles().subscribe(data => {
      this.roles = data.body;
    })

  }

  close(): void {
    this.activeModal.close(false);
  }

  save(): void {
    const user_role = this.createFromForm();
    if (user_role.id !== undefined) {
      this.subscribeToSaveResponse(this.userRoleService.updateUserrole(user_role));
    } else {
      this.subscribeToSaveResponse(this.userRoleService.addUserrole(user_role));
    }
  }

  private createFromForm(): User_role {
    const start_date = this.userRoleForm.get('start_date')!.value;
    const end_date = this.userRoleForm.get('end_date')!.value;
    const userRole = new User_role();
    userRole.id = this.inputUserRole?.id;
    userRole.user = this.userRoleForm.get('user')!.value;
    userRole.role = this.userRoleForm.get('role')!.value;
    userRole.start_date = new Date(start_date.year, start_date.month-1, start_date.day);
    userRole.end_date = new Date(end_date.year, end_date.month-1, end_date.day);

    return userRole;
  }

  private updateForm(userRole: User_role): void {
    const start_date = new Date(userRole?.start_date!);
    const end_date = new Date(userRole?.end_date!);
    this.userRoleForm.setValue({
      id: userRole?.id,
      user: userRole?.user,
      role: userRole?.role,
      start_date: new NgbDate(start_date?.getFullYear(), start_date?.getMonth() + 1, start_date?.getDate()),
      end_date: new NgbDate(end_date?.getFullYear(), end_date?.getMonth() + 1, end_date?.getDate())
    });
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<User_role>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  private onSaveSuccess(): void {
    this.activeModal.close(true);
    if (this.modalType === ModalTypesEnum.CREATE) {
      this.toastr.success('User Role created!', 'Success!');
    } else {
      this.toastr.success('User Role modified!', 'Success!');
    }
  }

  private onSaveError(): void {
    if (this.modalType === ModalTypesEnum.CREATE) {
      this.toastr.error('Error creating user role!', 'Error!');
    } else {
      this.toastr.error('Error modifying user role!', 'Error!');
    }
  }
}
