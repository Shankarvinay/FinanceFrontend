import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userDetails;
  showBurger: boolean = false;
  isSelected: boolean = false;
  currentRoute = '/home/dashboard';
  joiningAmount: number = 0;

  formModel = {
    joiningFeesAmount: 0,
  };

  constructor(
    private router: Router,
    private service: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.service.getUserProfile().subscribe(
      (res: any) => {
        this.userDetails = res;
        localStorage.setItem('fullName', this.userDetails.data.fullName);
        localStorage.setItem('userId', this.userDetails.data.userId);
        localStorage.setItem('email', this.userDetails.data.email);
        localStorage.setItem(
          'cardStatus',
          this.userDetails.data.isCardActivated
        );
        if (this.userDetails.cardType == 'Premium') {
          this.joiningAmount = 10000;
          this.formModel = {
            joiningFeesAmount: 10000,
          };
        } else {
          this.joiningAmount = 20000;
          this.formModel = {
            joiningFeesAmount: 20000,
          };
        }
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );

    this.currentRoute = this.router.url;
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('cardStatus');
    this.router.navigate(['/']);
  }

  handleBurger() {
    this.showBurger = !this.showBurger;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.service
      .postJoiningFees(this.userDetails.data.userId, form.value)
      .subscribe(
        (res) => {
          console.log(res);
          this.ngOnInit();
          this.toastr.success('Joining Fees Submitted');
        },
        (err) => {
          this.toastr.error(err.error.message);
        }
      );
  }
}
