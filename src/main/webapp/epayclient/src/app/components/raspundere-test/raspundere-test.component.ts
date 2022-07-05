import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Continut} from "@app/entities/continut";
import {Table} from "primeng/table";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ContinutService} from "@app/services/continut.service";

@Component({
  selector: 'app-raspundere-test',
  templateUrl: './raspundere-test.component.html',
  styleUrls: ['./raspundere-test.component.css']
})
export class RaspundereTestComponent implements OnInit {

  @ViewChild('dt1') dt1?: Table;
  test : Continut[] = [{intrebare : 'value', notareMaxima: 2, raspuns:'frfr'}];
  dataSource! : MatTableDataSource<Continut>;
  intrebare!: string;
  notare!: number;
  displayedColumns: string[] = ['intrebare', 'notare'];
  // dataSource = ELEMENT_DATA;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;

  constructor( private changeDetection: ChangeDetectorRef, private continutService: ContinutService) {
  }

  ngOnInit() {
    this.continutService.getClaseByAnuntUserId(JSON.parse(localStorage.getItem('test')!).id).subscribe((data:any)=>{
      this.test = data.body;
    })
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



  saveAnswer() {

  }

}