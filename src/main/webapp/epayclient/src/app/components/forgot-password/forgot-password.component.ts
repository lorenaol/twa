import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "@app/services/user.service";
import {AuthenticationService} from "@app/services/authentication.service";
import {first} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {HttpResponse} from "@angular/common/http";
import {User} from "@app/entities/user";
import {Observable} from "rxjs";
type EntityArrayResponseType = HttpResponse<User[]>;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {


  forgotForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string ;
  error = '';
  response !: Observable<EntityArrayResponseType>;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      email: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.forgotForm!.controls;
  }



  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotForm!.invalid) {
      return;
    }

    this.loading = true;
    this.userService.forgotPassword(this.f.email.value)
      .pipe(first())
      .subscribe(
        data => {
          // this.toastr.success('Check your email! Click the link to change your password ', 'Success!');
          this.router.navigate([this.returnUrl]);
        },
        error => {
          // this.toastr.error('Email does not exist!');
          this.error = error;
          this.loading = false;
        });


    }

  // onSubmit(): void{
  //   this.userService.forgotPassword(this.f.email.value).subscribe(
  //     () => this.onSaveSuccess(),
  //     () => this.onSaveError()
  //   );
  // }
  //
  // private onSaveSuccess(): void {
  //
  //     this.toastr.success('e bine', 'Success!');
  // }
  //
  // private onSaveError(): void {
  //
  //     this.toastr.error('nu e bine!', 'Error!');
  //
  // }



}
