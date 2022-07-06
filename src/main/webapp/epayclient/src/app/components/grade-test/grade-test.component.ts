import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {Continut} from "@app/entities/continut";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ContinutService} from "@app/services/continut.service";
import {TestService} from "@app/services/test.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-grade-test',
  templateUrl: './grade-test.component.html',
  styleUrls: ['./grade-test.component.css']
})
export class GradeTestComponent implements OnInit {

  @ViewChild('dt1') dt1?: Table;
  test : Continut[] = [{intrebare : 'Problema de matematică de clasa a 3-a pe care 99% dintre adulţi NU ştiu să o rezolve. Este dintr-o culegere din România. Tu reuşeşti?',
    notareMaxima: 3, raspuns:'Raspuns 1 Raspuns 1 Raspuns 1 Raspuns 1 Raspuns 1 Raspuns 1 '},
    {intrebare : ' Problema de matematică de clasa a 3-a pe care 99% dintre adulţi NU ştiu să o rezolve. Este dintr-o culegere din România. Tu reuşeşti? Problema de matematică de clasa a 3-a pe care 99% dintre adulţi NU ştiu să o rezolve. Este dintr-o culegere din România. Tu reuşeşti?',
      notareMaxima: 5, raspuns:'Raspuns 2 Raspuns 2 Raspuns 2 Raspuns 2 Raspuns 2 Raspuns 2 '}];
  dataSource! : MatTableDataSource<Continut>;
  intrebare!: string;
  notare!: number;
  displayedColumns: string[] = ['intrebare', 'notare'];
  // dataSource = ELEMENT_DATA;

  nameTest = "Test matematica X";

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;

  constructor( private changeDetection: ChangeDetectorRef, private continutService: ContinutService,
               private testService: TestService, private router: Router) {

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

  submit(): void {
    let t = JSON.parse(localStorage.getItem('test')!)
    t.stare = "2";
    this.testService.updateTest(t).subscribe((data:any)=>{
      localStorage.setItem("test", JSON.stringify(data.body))
      this.router.navigate(["/teste-clasa"]);
    })
  }

  saveGrade(q: any, grade: any): void {
    q.raspuns = grade;
    this.continutService.updateContinut(q).subscribe(()=>{

    });

}

}
