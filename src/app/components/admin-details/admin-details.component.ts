import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDetailsModel } from 'src/app/models/user-details-model';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css'],
})
export class AdminDetailsComponent implements OnInit {
  userDetails: UserDetailsModel;
  userId: string;
  constructor(
    private router: Router,
    public service: AdminService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.userId = id;
      this.service.getUserDetails(id).subscribe(
        (res: UserDetailsModel) => {
          this.userDetails = res;
          console.log(res);
        },
        (err) => {
          this.toastr.error(err.error.message);
        }
      );
    });
  }

  onSubmit() {
    this.service.ActivateAccount(this.userId, this.userDetails).subscribe(
      (res: any) => {
        if (res) {
          this.service.formModel.reset();
          this.toastr.success('The user accounts is activated', 'Successfully');
          this.ngOnInit();
        }
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
}
