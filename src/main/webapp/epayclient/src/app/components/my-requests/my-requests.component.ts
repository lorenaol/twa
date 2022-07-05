import { Component, OnInit } from '@angular/core';
import {EditProfileComponent} from "@app/components/edit-profile/edit-profile.component";
import {MatDialog} from "@angular/material/dialog";
import {CreateClassDialogComponent} from "@app/components/create-class-dialog/create-class-dialog.component";
import {Solicitare_colaborare} from "@app/entities/solicitare_colaborare";
import {Solicitare_colaborareService} from "@app/services/solicitare_colaborare.service";
import {ClasaService} from "@app/services/clasa.service";
import {Clasa} from "@app/entities/clasa";

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {

  info = [{colaborator: "Ana", anunt: "Mate clasa a X-a"},
    {colaborator: "Lorena", anunt: "Info clasa a IX-a"},
    {colaborator: "Andreea", anunt: "Fizica clasa a X-a"}];

  requests? : Solicitare_colaborare[];
  constructor(public dialog: MatDialog, private solicitareColaborareService: Solicitare_colaborareService,
              private clasaService: ClasaService) { }

  ngOnInit(): void {
    this.solicitareColaborareService.getSolicitariByAnuntUserId(JSON.parse(localStorage.getItem('user')!).userName).subscribe((data:any) => {
      this.requests = data.body;
    })
  }

  acceptRequest(i: Solicitare_colaborare) {
    const dialogRef = this.dialog.open(CreateClassDialogComponent, {
      // width: '250px',
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
      console.log(result)
      let clasa = new Clasa();
      if(i.user?.rol == "Student") {
        clasa.student = i.user;
        clasa.profesor = i.anunt?.user;
      } else {
        clasa.profesor = i.user;
        clasa.student = i.anunt?.user;
      }
      clasa.name = result;
      this.clasaService.addClasa(clasa).subscribe(() => {
        this.solicitareColaborareService.deleteSolicitare(i).subscribe(()=>{
          this.ngOnInit();
        })
      });
    });
  }

  cancelRequest(i : Solicitare_colaborare) {
    this.solicitareColaborareService.deleteSolicitare(i).subscribe(()=>{
      this.ngOnInit();
    })
  }

}
