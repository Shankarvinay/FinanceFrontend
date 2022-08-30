import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  orderHistory,
  TransactionHistory,
  UserDashboardModel,
} from 'src/app/models/user-dashboard-model';
import { UserPortalService } from 'src/app/Services/user-portal.service';
import * as moment from 'moment';
import 'moment/locale/pt-br';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  data: UserDashboardModel;

  paginationNumber1: number = 1; //pagination numbers
  paginationNumber2: number = 1; //pagination numbers

  sorted: TransactionHistory[];
  SortedOrder: orderHistory[];

  moment = moment();

  constructor(
    private router: Router,
    private service: UserPortalService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.service.getUserDashboardDetails().subscribe(
      (res: UserDashboardModel) => {
        this.data = res;
        this.sorted = this.service.sortList(this.data.transactionHistory);
        this.SortedOrder = this.service.sortOrderList(this.data.orderHistory);
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }
}
