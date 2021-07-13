import { Component, OnInit } from '@angular/core';
import {ModalTypesEnum} from "../../enums/modal-types.enum";
import {NgbActiveModal, NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder} from "@angular/forms";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";
import {Authority} from "../../entities/authority";
import {AuthorityService} from "../../services/authority.service";

@Component({
  selector: 'app-authority-form',
  templateUrl: './authority-form.component.html',
  styleUrls: ['./authority-form.component.css']
})
export class AuthorityFormComponent implements OnInit {

  ModalTypesEnum = ModalTypesEnum;
  faCalendar = faCalendar;

  modalType?: ModalTypesEnum;
  inputAuthority?: Authority;

  authorityForm = this.fb.group({
    id: [],
    name: [],
    code: [],
    startDate: [],
    endDate: []
  });

  constructor(private fb: FormBuilder,
              private activeModal: NgbActiveModal,
              private toastr: ToastrService,
              private authorityService: AuthorityService) { }

  ngOnInit(): void {
    if (this.inputAuthority !== undefined) {
      this.updateForm(this.inputAuthority);
    }
  }

  close(): void {
    this.activeModal.close(false);
  }

  save(): void {
    const authority = this.createFromForm();
    if (authority.id !== undefined) {
      this.subscribeToSaveResponse(this.authorityService.updateAuthority(authority));
    } else {
      this.subscribeToSaveResponse(this.authorityService.addAuthority(authority));
    }
  }

  private createFromForm(): Authority {
    const startDate = this.authorityForm.get('startDate')!.value;
    const endDate = this.authorityForm.get('endDate')!.value;
    const authority = new Authority();
    authority.id = this.inputAuthority?.id;
    authority.name = this.authorityForm.get('name')!.value;
    authority.code = this.authorityForm.get('code')!.value;
    authority.startDate = new Date(startDate.year, startDate.month-1, startDate.day);
    authority.endDate = new Date(endDate.year, endDate.month-1, endDate.day);


    return authority;
  }

  private updateForm(authority: Authority): void {
    const startDate = new Date(authority?.startDate!);
    const endDate = new Date(authority?.endDate!);
    this.authorityForm.setValue({
      id: authority?.id,
      name: authority?.name,
      code: authority?.code,
      startDate: new NgbDate(startDate?.getFullYear(),startDate?.getMonth() + 1, startDate?.getDate() ),
      endDate: new NgbDate(endDate?.getFullYear(),endDate?.getMonth() + 1, endDate?.getDate() )

    });
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<Authority>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }
  private onSaveSuccess(): void {
    this.activeModal.close(true);
    if (this.modalType === ModalTypesEnum.CREATE) {
      this.toastr.success('Authority created!', 'Success!');
    } else {
      this.toastr.success('Authority modified!', 'Success!');
    }
  }

  private onSaveError(): void {
    if (this.modalType === ModalTypesEnum.CREATE) {
      this.toastr.error('Error creating authority!', 'Error!');
    } else {
      this.toastr.error('Error modifying authority!', 'Error!');
    }
  }

}
