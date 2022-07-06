import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-test-dialog',
  templateUrl: './create-test-dialog.component.html',
  styleUrls: ['./create-test-dialog.component.css']
})
export class CreateTestDialogComponent implements OnInit {

  nameTest: string | undefined;

  constructor(public dialogRef: MatDialogRef<CreateTestDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: String) { }

  ngOnInit(): void {
  }

}
