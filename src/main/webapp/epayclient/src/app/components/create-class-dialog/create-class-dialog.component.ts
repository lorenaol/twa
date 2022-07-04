import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-class-dialog',
  templateUrl: './create-class-dialog.component.html',
  styleUrls: ['./create-class-dialog.component.css']
})
export class CreateClassDialogComponent implements OnInit {

  nameClass: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
