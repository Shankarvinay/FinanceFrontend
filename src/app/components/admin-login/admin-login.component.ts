import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  formModel = {
    email: '',
    Password: '',
  };
  constructor(
    private service: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/admin/dashboard');
  }

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/admin/dashboard');
      },
      (err) => {
        if (err.status == 400)
          this.toastr.error(
            'Incorrect email or password.',
            'Authentication failed.'
          );
        else this.toastr.error(err.error.message);
      }
    );
  }
}
