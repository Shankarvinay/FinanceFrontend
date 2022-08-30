import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  formModel = {
    email: '',
  };
  constructor(
    private service: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.service.forgetPassword(form.value).subscribe(
      (res: any) => {
        console.log(res);
        form.reset();
        this.toastr.success(res.message);
      },
      (err) => {
        this.toastr.error(err);
      }
    );
  }
}
