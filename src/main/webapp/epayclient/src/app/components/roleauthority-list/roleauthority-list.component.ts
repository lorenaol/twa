import {Component, OnInit} from '@angular/core';
import {faEdit, faEye, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Roleauthority} from "@app/entities/roleauthority";
import {RoleauthorityService} from "@app/services/roleauthority.service";
import {ModalService} from "@app/services/modal.service";
import {ModalTypesEnum} from "@app/enums/modal-types.enum";

@Component({
  selector: 'app-roleauthorities-list',
  templateUrl: './roleauthority-list.component.html',
  styleUrls: ['./roleauthority-list.component.css']
})
export class RoleauthorityListComponent implements OnInit {

  ModalTypesEnum = ModalTypesEnum;
  faPlus = faPlus;
  faEdit = faEdit;
  faEye = faEye;
  faTrash = faTrash;

  roleauthorities?: Roleauthority[] | null;

  constructor(
    private roleauthorityService: RoleauthorityService,
    private modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.roleauthorityService.getRoleAuthorities().subscribe(data => {
      this.roleauthorities = data.body;
    })
  }

  openRoleauthorityModal(modalTypeEnum: ModalTypesEnum, inputRoleauthority?: Roleauthority) {
    this.modalService.openRoleauthorityModal(modalTypeEnum, inputRoleauthority).then((result) => {
      if (result) {
        this.loadData();
      }
    });
  }

  openDeleteRoleauthorityModal(roleauthority: Roleauthority) {
    console.log(roleauthority);
    this.modalService.openDeleteRoleauthorityModal(roleauthority).then((result) => {
      if (result) {
        this.loadData();
      }
    });
  }
}
