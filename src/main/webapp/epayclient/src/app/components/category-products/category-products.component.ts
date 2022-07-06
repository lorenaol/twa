import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CategoryService} from "@app/services/category.service";
import {Category} from "@app/entities/category";
import {Product} from "@app/entities/product";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {ShoppingCartService} from "@app/services/shoppingCart.service";
import {ProductService} from "@app/services/product.service";
import {Anunt} from "@app/entities/anunt";
import {ModalTypesEnum} from "@app/enums/modal-types.enum";
import {ModalService} from "@app/services/modal.service";

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {

  ModalTypesEnum = ModalTypesEnum;
  id?: number;
  category?: Category;
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  faHeart = faHeart;
  faCart = faShoppingCart;
  anunturi? : Anunt[];
  anunturi_currente? : Anunt[];
  facultati= ["Facultatea de Automatica si Calculatoare", "Facultatea de Inginerie Mecanică și Mecatronică",
    "Facultatea de Electronică, Telecomunicații și Tehnologia Informației", "Facultatea de Transporturi"]
  clase = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"]
  materii=["Limba și literatura română","Matematică","Limbi moderne",
    "Chimie","Fizică","Biologie","Istorie","Geografie","Discipline socio-umane","Programare","Html", "CSS",
    "Javascript","C++","Java","Python","Software","Office","Photoshop", "Figma", "Religie",
    "Educație fizică și sport", "Arte plastice", "Educație muzicală", "Altele"];
  roluri=["Meditator", "Student"];
  orase=["Bucuresti", "Cluj", "Timisoara", "Valcea", "Constanta", "Pitesti", "Ploiesti", "Sibiu", "Arad", "Iasi",
  "Craiova", "Brasov"]

  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService,
              private shoppingCartService: ShoppingCartService,
              private productService: ProductService,
              private modalService: ModalService) { }

  ngOnInit(): void {

    (async () => {
      this.loadData();
      await this.delay(1000);
      this.setImage();
      // this.setStock();
    })();
  }
  filter(ceva:any) :void { (async () => {
    this.anunturi_currente = this.anunturi?.filter(word=>word.materie === ceva);
    await this.delay(1000);
    this.setImage();
    // this.setStock();
  })();
  }
  loadData(): void{

      // this.categoryService.getCategoryById(1).subscribe((data: any) => {
      //   this.category = data.body;
      // });
    this.productService.getProducts().subscribe((data)=>{this.anunturi = data.body!;
      this.anunturi_currente = data.body!;
      // this.setImage();
    });
  }

  openCategoryModal(modalTypeEnum: ModalTypesEnum, inputCategory?: Anunt) {
    this.modalService.openCategoryModal(modalTypeEnum, inputCategory).then((result) => {
      // if(result) {
      //   this.loadData();
      // }
    });
  }
  mat? : boolean = true;
  setMatFalse(): void {
    this.mat = false;

  }
  setMatTrue(): void {
    this.mat = true;
  }
  getMat() : boolean {
    return this.mat!;
  }


  addToCart(product?: Product): void {
    this.shoppingCartService.init(product);
  }

  setImage(): void{
    let imageWrapper = document.querySelectorAll('.image');
    console.log(imageWrapper)
    let i;
    // if(this.category?.products)
    for(i = 0; i < this.anunturi!.length;i++){
      let image = new Image(80,80);
      image.src = "data:image/png;base64," + this.anunturi![i].image;
      image.alt = this.anunturi![i].user!.name || "";
      if(imageWrapper) {
        imageWrapper[i].appendChild(image);
      }

      // console.log(image)
    }
  }

  inStock(product: Product): string{
    let stock: string = "Out of stock";
    if(product.quantity){
      if(product.quantity > 10)
        stock = "in stock";
      else if(product.quantity <= 10 && product.quantity > 1)
        stock = `Last ${product.quantity} products`;
      else if(product.quantity === 1)
        stock = "Last product in stock";
    }
    return stock;
  }

  setStock(): void{
    let stock = document.querySelectorAll('.stock');
    let i;
    if(this.category?.products)
      for(i = 0; i < this.category?.products?.length;i++){
        if(this.category.products[i].quantity!==undefined && stock){

          // @ts-ignore
          if(this.category.products[i].quantity > 10)
            stock[i].classList.add("superstock");

          else { // @ts-ignore
            if(this.category.products[i].quantity <=10 && this.category.products[i].quantity >= 1 )
                        stock[i].classList.add("minstock");
                      else
                        stock[i].classList.add("outstock");
          }
        }
      }
  }
  // filter2(ceva:any) :void { (async () => {
  //   this.anunturi_currente = this.anunturi?.filter(word=>word.tip === ceva);
  //   await this.delay(1000);
  //   this.setImage();
  //   // this.setStock();
  // })();
  // }
  filter3(ceva:any) :void { (async () => {
    this.anunturi_currente = this.anunturi?.filter(word=>word.oras === ceva);
    await this.delay(1000);
    this.setImage();
    // this.setStock();
  })();
  }
  filter4(ceva:any) :void { (async () => {

    this.anunturi_currente = this.anunturi?.filter(word=>{word.facultate === ceva; console.log(word.facultate === ceva)});
    await this.delay(1000);
    this.setImage();
    // this.setStock();
  })();
  }
}
