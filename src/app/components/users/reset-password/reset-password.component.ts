import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    public service: UserService,
    public route: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  token: string;

  ngOnInit() {
    this.service.formModelReset.reset();
    this.router.queryParams.subscribe((params) => {
      console.log(params);              // getting token from the url
      this.token = params.token;
    });
  }

  onSubmit() {
    this.service.resetPassword(this.token).subscribe(
      (res: any) => {
        this.service.formModelReset.reset();
        this.toastr.success(res.message);
        this.route.navigateByUrl('/user/login');
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }
}
