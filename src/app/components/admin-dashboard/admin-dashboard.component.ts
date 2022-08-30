import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserData } from 'src/app/models/User-data';
import { AdminService } from 'src/app/Services/admin.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  userDetails;
  // userData;
  res: UserData;

  searchValue: string;
  searchUserValue: string;

  paginationNumber1: number = 1;
  paginationNumber2: number = 1;

  constructor(
    private router: Router,
    private service: AdminService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.service.getAdminProfile().subscribe(
      (res) => {
        this.userDetails = res;
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );

    this.service.getAllUserData().subscribe(
      (res: UserData) => {
        this.res = res;
        console.log(this.res);
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  Search() {
    if (this.searchValue == '') {
      this.ngOnInit();
    } else {
      this.res.adminList = this.res.adminList.filter((res) => {
        return (
          res.userName
            .toLocaleLowerCase()
            .match(this.searchValue.toLocaleLowerCase()) ||
          res.fullName
            .toLocaleLowerCase()
            .match(this.searchValue.toLocaleLowerCase()) ||
          res.email
            .toLocaleLowerCase()
            .match(this.searchValue.toLocaleLowerCase())
        );
      });
    }
  }

  SearchUser() {
    if (this.searchUserValue == '') {
      this.ngOnInit();
    } else {
      this.res.userList = this.res.userList.filter((res) => {
        return (
          res.username
            .toLocaleLowerCase()
            .match(this.searchUserValue.toLocaleLowerCase()) ||
          res.fullName
            .toLocaleLowerCase()
            .match(this.searchUserValue.toLocaleLowerCase()) ||
          res.email
            .toLocaleLowerCase()
            .match(this.searchUserValue.toLocaleLowerCase())
        );
      });
    }
  }

  getDetails(id: string) {
    console.log(id);
    this.router.navigate(['/admin/details', id]);
  }
  DeleteUser(id) {
    this.service.deleteUser(id).subscribe(
      (res: any) => {
        console.log(res);
        this.ngOnInit();
        this.toastr.success(res.message);
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }
}
