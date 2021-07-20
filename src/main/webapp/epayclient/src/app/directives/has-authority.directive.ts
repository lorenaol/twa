import {Directive, Input, OnDestroy, OnInit, Output, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthenticationService} from "@app/services/authentication.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";


@Directive({
  selector: '[hasAuthority]'
})
export class HasAuthorityDirective implements OnInit, OnDestroy {

  @Input() hasAuthority!: string;
  stop$ = new Subject();
  isVisible = false;

  constructor(
    private authenticationService: AuthenticationService,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef) {

  }

  // ngOnInit() {
  //   //verif daca exista authoritatea
  //   if (this.authenticationService.hasAuthority(this.hasAuthority)) {
  // //    console.log(this.hasAuthority,true);
  //     this.viewContainer.createEmbeddedView(this.templateRef);
  //   } else {
  //     // If the user does not have a authority,
  //     // we clear the contents of the viewContainer
  //  //   console.log(this.hasAuthority,false);
  //     this.viewContainer.clear();
  //   }
  // }
  //trebuie dat refresh dupa login si logout pt ca nu fol observable care emit event-uri

  ngOnInit() {
    this.authenticationService.hasAuthority(this.hasAuthority).pipe(
      takeUntil(this.stop$)
    ).subscribe(hasAuthority => {
      if (hasAuthority) {
        if (!this.isVisible) {
          this.isVisible = true;
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      } else {
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    })

  }

  ngOnDestroy() {
    this.stop$.next();
  }

}
