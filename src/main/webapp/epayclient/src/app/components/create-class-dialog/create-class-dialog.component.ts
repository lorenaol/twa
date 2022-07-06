import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-class-dialog',
  templateUrl: './create-class-dialog.component.html',
  styleUrls: ['./create-class-dialog.component.css']
})
export class CreateClassDialogComponent implements OnInit {

  nameClass: string | undefined;

  constructor( public dialogRef: MatDialogRef<CreateClassDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: String) { }

  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }

}
