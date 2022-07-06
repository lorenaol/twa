import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {Test} from "@app/entities/test";
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from '@angular/material/table';
import {Table} from "primeng/table";
import {Continut} from "@app/entities/continut";
import {ContinutService} from "@app/services/continut.service";

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {


  @ViewChild('dt1') dt1?: Table;
  test : Continut[] = [];
  dataSource! : MatTableDataSource<Test>;
  intrebare!: string;
  notare!: number;
  displayedColumns: string[] = ['intrebare', 'notare'];
  // dataSource = ELEMENT_DATA;
  current_test? : Test;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;

  constructor( private changeDetection: ChangeDetectorRef, private continutService: ContinutService) {
  }

  ngOnInit() {
    this.current_test = JSON.parse(localStorage.getItem('test')!);
    // this.test.push({intrebare : 'value', notareMaxima: 2});
    // this.test.push( {intrebare : 'value', notareMaxima: 2});
    // console.log(this.test);
    // this.dt1?.reset();

    // this.dataSource  = new MatTableDataSource<Test>(this.test);
  }

  // refresh() {
  //   this.myService.doSomething().subscribe((data: PeriodicElement[]) => {
  //     this.dataSource = test;
  //   });
  // }



  //
  // ngOnInit(): void {
  //   this.test = [{intrebare : 'value', notare: 2}];
  // }

  addToList(value: string, numberInput: string) {
    let continut = new Continut();
    continut.intrebare = value;
    continut.notareMaxima = Number(numberInput);
    continut.test = this.current_test;
    console.log(continut)
    this.test.push(continut);
    this.continutService.addContinut(continut).subscribe();
    // const addTest : Continut = {intrebare : value, notareMaxima: Number(numberInput)};
    // this.test=[...this.test, addTest];
    // this.dataSource = new MatTableDataSource(this.test);
    // this.changeDetection.detectChanges();
    // this.dt1?.reset();

  }


}
