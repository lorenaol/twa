import { Component, OnInit } from '@angular/core';
import {DocumentService} from "@app/services/document.service";
import {Document} from "@app/entities/document";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {flatMap, map} from "rxjs/operators";

@Component({
  selector: 'app-materials-class',
  templateUrl: './materials-class.component.html',
  styleUrls: ['./materials-class.component.css']
})
export class MaterialsClassComponent implements OnInit {

  constructor(private documentService: DocumentService, private httpSvc: HttpClient) { }

  uploadedFiles : any = [];

  ngOnInit(): void {
    // console.log("ceva")
    // this.documentService.getDocumentByClasaId(JSON.parse(localStorage.getItem('clasa')!).id).subscribe((data:any)=>{
    //   for(let i = 0; i < data.body.length; i++) {
    //     console.log(localStorage.getItem(data.body[i].denumire)!)
    //     this.httpSvc.get(JSON.parse(localStorage.getItem(data.body[i].denumire)!).changingThisBreaksApplicationSecurity,
    //       {observe : "response"}).pipe(map((res: any) => res)).subscribe((data:any) =>{
    //         this.uploadedFiles.push(data.body);
    //         console.log(data.body);
    //     });
    //   }
    // })
  }

  onUpload($event:any) {
    console.log("se apeleaza")
    for(let file of $event!.files) {
      // this.uploadedFiles.push(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
        reader.onload = () => {
          console.log(reader.result);
          let doc = new Document();
          doc.clasa = JSON.parse(localStorage.getItem('clasa')!);
          let today = new Date();
          doc.dataIncarcare = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          doc.denumire = file.name;

          const imageFile = new File([this.dataURItoBlob(reader.result)], file.name, { type: 'image/*' });
          console.log(imageFile)
          this.documentService.addDocument(doc).subscribe(()=>{
            this.ngOnInit();
          });
        };
      console.log(file)
      console.log(JSON.stringify(file))
      // localStorage.setItem(file.name, JSON.stringify(file));

    }


    // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  dataURItoBlob(dataURI :any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/*' });
    return blob;
  }


}
