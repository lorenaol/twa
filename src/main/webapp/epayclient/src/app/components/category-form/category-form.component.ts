import { Component, OnInit } from '@angular/core';
import {ModalTypesEnum} from "@app/enums/modal-types.enum";
import {NgbActiveModal, NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder} from "@angular/forms";
import {Category} from "@app/entities/category";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {CategoryService} from "@app/services/category.service";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";
import {Anunt} from "@app/entities/anunt";
import {Router} from "@angular/router";
import {ReviewService} from "@app/services/review.service";
import {Review} from "@app/entities/review";
import {Solicitare_colaborare} from "@app/entities/solicitare_colaborare";
import {UserService} from "@app/services/user.service";
import {
  Solicitare_colaborareService,
} from "@app/services/solicitare_colaborare.service";
import {ClasaService} from "@app/services/clasa.service";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  ModalTypesEnum = ModalTypesEnum;
  faCalendar = faCalendar;

  modalType?: ModalTypesEnum;
  inputCategory?: Anunt;
  createdDate?: Date;

  categoryForm = this.fb.group({
    nume: [],
    Locatie: [],
    Materie: [],
    Descriere: [],
    Telefon: [],
    Email: []
  });
  reviews : Review[] = []
  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private router: Router,
    private reviewService: ReviewService,
    private userService: UserService,
    private solicitareColaborareService: Solicitare_colaborareService,
    private clasaService: ClasaService
  ) { }

  ngOnInit(): void {
    this.reviewService.getReviewsByProductId(this.inputCategory?.id!).subscribe((data)=>{
      this.reviews = data.body!;
    });
    if (this.inputCategory !== undefined) {
      // this.updateForm(this.inputCategory);
    }
    console.log(this.inputCategory)
    // let today = new Date();
    // this.createdDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }
  redirect2() : void {
    this.activeModal.close(false);
    localStorage.setItem("anunt", JSON.stringify(this.inputCategory!));
    this.router.navigate(["/reviews/"]);
  }
  redirect1() : void {
    this.activeModal.close(false);
    localStorage.setItem("anunt", JSON.stringify(this.inputCategory!));
    this.router.navigate(["/review-list/"]);
  }
  redirect3() : void {
    this.activeModal.close(false);


    this.userService.getUsersByEmail(JSON.parse(localStorage.getItem('user')!).userName).subscribe((data:any) => {
      let solicitare = new Solicitare_colaborare();
      solicitare.accepted = false;
      solicitare.anunt = this.inputCategory;
      solicitare.user = data.body;
      let today = new Date();
      solicitare.dataSolicitare = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      solicitare.dataRaspuns = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      this.solicitareColaborareService.addSolicitare(solicitare).subscribe(()=> {
        localStorage.setItem("anunt", JSON.stringify(this.inputCategory!));
        this.router.navigate(["/anunturi/"]);
      });
    })

  }
  isLoggedIn(): boolean {
    let user = localStorage.getItem('user');
    if (user) {
      return true;
    }
    return false;
  }
  close(): void {
    this.activeModal.close(false);
  }
  ok = true;
   ceva = 0
   ceva2= 0
  help():void {
    // this.ok = true;
    if(this.ceva == 0) {
      this.ceva++;
      this.solicitareColaborareService.getSolicitari().subscribe((data: any) => {
        for (let s of data.body) {
          console.log(data.body)
          console.log(this.inputCategory?.id == s.anunt.id)
          if (s.user.email == JSON.parse(localStorage.getItem('user')!).userName && this.inputCategory?.id == s.anunt.id) {
            this.ok = false;
            console.log(this.ok)
          }
        }
      });
    }
  }

  solicitat() : boolean {
    this.help();
    console.log(this.ok);
   return this.ok;
  }
  ok2 = false;
  help2():void {
    // this.ok = true;
    if(this.ceva2 ==0 ) {
      this.ceva2++;
      this.clasaService.getClase().subscribe((data: any) => {
        for (let s of data.body) {

          if (s.profesor.email == JSON.parse(localStorage.getItem('user')!).userName &&
            this.inputCategory?.user?.email == s.student.email ||
            s.student.email == JSON.parse(localStorage.getItem('user')!).userName &&
            this.inputCategory?.user?.email == s.profesor.email) {
            this.ok2 = true;
            // console.log(this.ok)
          }
        }
      });
    }
  }
  colaborat() : boolean {
    this.help2()
    return this.ok2;
  }

  // save(): void {
  //   const category = this.createFromForm();
  //   if (category.id !== undefined) {
  //     this.subscribeToSaveResponse(this.categoryService.updateCategory(category));
  //   } else {
  //     this.subscribeToSaveResponse(this.categoryService.addCategory(category));
  //   }
  // }
  //
  // private createFromForm(): Category {
  //   const category = new Category();
  //   category.id = this.inputCategory?.id;
  //   category.categoryName = this.categoryForm.get('categoryName')!.value;
  //   category.categoryCode = this.categoryForm.get('categoryCode')!.value;
  //   category.categoryDescription = this.categoryForm.get('categoryDescription')!.value;
  //   category.storeId = this.categoryForm.get('storeId')!.value;
  //   category.createdDate = this.createdDate;
  //   return category;
  // }

  // private updateForm(category: Category): void {
  //   const createdDate = new Date(category?.createdDate!);
  //   this.categoryForm.setValue({
  //     id: category?.id,
  //     categoryName: category?.categoryName,
  //     categoryCode: category?.categoryCode,
  //     categoryDescription: category?.categoryDescription,
  //     storeId: category?.storeId,
  //     createdDate: new NgbDate(createdDate?.getFullYear(), createdDate?.getMonth() + 1, createdDate?.getDate())
  //   });
  // }
  //
  // private subscribeToSaveResponse(result: Observable<HttpResponse<Category>>): void {
  //   result.subscribe(
  //     () => this.onSaveSuccess(),
  //     () => this.onSaveError()
  //   );
  // }

  // private onSaveSuccess(): void {
  //   this.activeModal.close(true);
  //   if (this.modalType === ModalTypesEnum.CREATE) {
  //     this.toastr.success('Category created!', 'Success!');
  //   } else {
  //     this.toastr.success('Category modified!', 'Success!');
  //   }
  // }
  //
  // private onSaveError(): void {
  //   if (this.modalType === ModalTypesEnum.CREATE) {
  //     this.toastr.error('Error creating category!', 'Error!');
  //   } else {
  //     this.toastr.error('Error modifying category!', 'Error!');
  //   }
  // }
}
