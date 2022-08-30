import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    public service: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.service.formModel.reset();
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/home');
  }

  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formModel.reset();
          this.toastr.success('New user created!', 'Registration successful.');
          this.router.navigateByUrl('/user/login');
        } else {
          res.errors.forEach((element) => {
            console.log(res);
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error(
                  'Username is already taken',
                  'Registration failed.'
                );
                break;

              default:
                this.toastr.error(element.description, 'Registration failed.');
                break;
            }
          });
        }
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }
}
