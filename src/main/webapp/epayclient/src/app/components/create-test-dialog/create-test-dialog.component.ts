import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-test-dialog',
  templateUrl: './create-test-dialog.component.html',
  styleUrls: ['./create-test-dialog.component.css']
})
export class CreateTestDialogComponent implements OnInit {

  nameTest: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
