import { Component, OnInit } from '@angular/core';
import {ProductService} from "@app/services/product.service";
import {Anunt} from "@app/entities/anunt";
import {ModalTypesEnum} from "@app/enums/modal-types.enum";
import {ModalService} from "@app/services/modal.service";

@Component({
  selector: 'app-my-announces',
  templateUrl: './my-announces.component.html',
  styleUrls: ['./my-announces.component.css']
})
export class MyAnnouncesComponent implements OnInit {

  constructor(private productService: ProductService, private modalService: ModalService) { }
  ModalTypesEnum = ModalTypesEnum;
  anunturi_currente?: Anunt[];
  ngOnInit(): void {

    (async () => {
      this.loadData();
      await this.delay(1000);
      this.setImage();
      // this.setStock();
    })();



  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  loadData(): void{

    // this.categoryService.getCategoryById(1).subscribe((data: any) => {
    //   this.category = data.body;
    // });
    this.productService.getAnunturiByUserEmail(JSON.parse(localStorage.getItem('user')!).userName).subscribe((data:any)=> {
      this.anunturi_currente = data.body;
      this.setImage();
    });
  }
  setImage(): void{
    let imageWrapper = document.querySelectorAll('.image');
    console.log(imageWrapper)
    let i;
    // if(this.category?.products)
    for(i = 0; i < this.anunturi_currente!.length;i++){
      let image = new Image(80,80);
      image.src = "data:image/png;base64," + this.anunturi_currente![i].image;
      image.alt = this.anunturi_currente![i].user!.name || "";
      if(imageWrapper) {
        imageWrapper[i].appendChild(image);
      }

      // console.log(image)
    }
  }

  openCategoryModal(modalTypeEnum: ModalTypesEnum, inputCategory?: Anunt) {
    this.modalService.openCategoryModal(modalTypeEnum, inputCategory).then((result) => {
      // if(result) {
      //   this.loadData();
      // }
    });
  }

}

