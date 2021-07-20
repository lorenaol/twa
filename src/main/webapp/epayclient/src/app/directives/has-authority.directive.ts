import {Directive, Input, OnInit, Output, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthenticationService} from "@app/services/authentication.service";


@Directive({
  selector: '[hasAuthority]'
})
export class HasAuthorityDirective implements OnInit{

  @Input() hasAuthority? :string | string[];

  constructor(
    private authenticationService: AuthenticationService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef)
  {

  }

  ngOnInit() {
    if (this.authenticationService.hasPermissions(this.hasAuthority)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }



}
