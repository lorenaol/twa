import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "@app/services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  changeForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string ;
  error = '';
  password: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.changeForm = this.formBuilder.group({
      firstPassword: ['', Validators.required],
      changePassword: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.changeForm!.controls;
  }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.changeForm!.invalid) {
      return;
    }

    let email = JSON.parse(localStorage.getItem('user')!).userName;
    this.loading = true;
    this.userService.resetPasswordLoggedIn(this.f.firstPassword.value, this.f.changePassword.value, email)
      .subscribe(
        data => {
          if (data.body == true) {

            let auth = window.btoa(email + ':' + this.f.changePassword.value);
            let user = JSON.parse(localStorage.getItem('user')!);
            user.authdata = auth;
            localStorage.setItem('user', JSON.stringify(user));
            this.toastr.success('Password changed', 'Success!');
            window.setTimeout(function(){location.reload()},3000)
            this.router.navigate([this.returnUrl]);

          }
        },
        (error) => {
          this.toastr.error('Password does not match', 'Error!');
          this.error = error;
          this.loading = false;
        });
  }

}
