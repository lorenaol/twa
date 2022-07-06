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

      console.log(file)
      console.log(JSON.stringify(file))
      // localStorage.setItem(file.name, JSON.stringify(file));
      let doc = new Document();
      doc.clasa = JSON.parse(localStorage.getItem('clasa')!);
      let today = new Date();
      doc.dataIncarcare = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      doc.denumire = file.name;
      this.documentService.addDocument(doc).subscribe(()=>{
        this.ngOnInit();
      });
    }


    // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  // postFile(fileToUpload: File): Observable<boolean> {
  //   // const endpoint = 'your-destination-url';
  //   // const formData: FormData = new FormData();
  //   // formData.append('fileKey', fileToUpload, fileToUpload.name);
  //   // return this.httpSvc
  //   //   .post(endpoint, formData)
  //   //   .pipe(map(() => { return true; }));
  // }

  // public getStoredFile(key: string, urlIfNotExist: string): Observable<string> {
  //   const storedFile = this.getFromStorage(key);
  //   if (storedFile) {
  //     return this.objectToObserver<string>(storedFile);
  //   } else {
  //     return this.downloadDataAsBase64(urlIfNotExist).pipe(
  //       map((b64Result: string) => {
  //         this.saveToStorage(key, b64Result);
  //         return b64Result;
  //       })
  //     );
  //   }
  // }
  // private saveToStorage(key: string, b64Result: string) {
  //   localStorage.setItem(key, b64Result);
  // }
  //
  // private getFromStorage(key: string) {
  //   return localStorage.getItem(key);
  // }
  // private downloadAsBlob(url: string) {
  //   return this.httpSvc.get(url, { responseType: 'blob' });
  // }
  //
  // private downloadDataAsBase64(url: string): Observable<string> {
  //   return this.downloadAsBlob(url).pipe(
  //     flatMap(blob => {
  //       return this.blobToBase64(blob).pipe(
  //         map((b64Result: string) => {
  //           return b64Result;
  //         })
  //       );
  //     })
  //   );
  // }
  //
  // private blobToBase64(blob: Blob): Observable<{}> {
  //   const fileReader = new FileReader();
  //   const observable = new Observable(observer => {
  //     fileReader.onloadend = () => {
  //       observer.next(fileReader.result);
  //       observer.complete();
  //     };
  //   });
  //   fileReader.readAsDataURL(blob);
  //   return observable;
  // }
  //
  // private objectToObserver<T>(storedFile: T): Observable<T> {
  //   return new Observable<T>(observer => {
  //     observer.next(storedFile);
  //     observer.complete();
  //   });
  // }
}
