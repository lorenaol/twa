import {Component, OnInit} from '@angular/core';
import {ModalTypesEnum} from "@app/enums/modal-types.enum";
import {NgbActiveModal, NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder} from "@angular/forms";
import {Role} from "@app/entities/role";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {RoleService} from "@app/services/role.service";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit {

  ModalTypesEnum = ModalTypesEnum;
  faCalendar = faCalendar;

  modalType?: ModalTypesEnum;
  inputRole?: Role;

  roleForm = this.fb.group({
    id: [],
    name: [],
    code: [],
    startDate: [],
    endDate: []
  });

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private categoryService: RoleService
  ) {
  }

  ngOnInit(): void {
    if (this.inputRole !== undefined) {
      this.updateForm(this.inputRole);
    }
  }

  close(): void {
    this.activeModal.close(false);
  }

  save(): void {
    const role = this.createFromForm();
    if (role.id !== undefined) {
      this.subscribeToSaveResponse(this.categoryService.updateRole(role));
    } else {
      this.subscribeToSaveResponse(this.categoryService.addRole(role));
    }
  }

  private createFromForm(): Role {
    const startDate = this.roleForm.get('startDate')!.value;
    const endDate = this.roleForm.get('endDate')!.value;
    const role = new Role();
    role.id = this.inputRole?.id;
    role.name = this.roleForm.get('name')!.value;
    role.code = this.roleForm.get('code')!.value;
    role.startDate = new Date(startDate.year, startDate.month - 1, startDate.day);
    role.endDate = new Date(endDate.year, endDate.month - 1, endDate.day);

    return role;
  }

  private updateForm(role: Role): void {
    const startDate = new Date(role?.startDate!);
    const endDate = new Date(role?.endDate!);
    this.roleForm.setValue({
      id: role?.id,
      name: role?.name,
      code: role?.code,
      startDate: new NgbDate(startDate?.getFullYear(), startDate?.getMonth() + 1, startDate?.getDate()),
      endDate: new NgbDate(endDate?.getFullYear(), endDate?.getMonth() + 1, endDate?.getDate())
    });
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<Role>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  private onSaveSuccess(): void {
    this.activeModal.close(true);
    if (this.modalType === ModalTypesEnum.CREATE) {
      this.toastr.success('Role created!', 'Success!');
    } else {
      this.toastr.success('Role modified!', 'Success!');
    }
  }

  private onSaveError(): void {
    if (this.modalType === ModalTypesEnum.CREATE) {
      this.toastr.error('Error creating role!', 'Error!');
    } else {
      this.toastr.error('Error modifying role!', 'Error!');
    }
  }


}

