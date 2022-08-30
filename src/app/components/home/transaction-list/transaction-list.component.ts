import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  TransactionHistory,
  UserDashboardModel,
} from 'src/app/models/user-dashboard-model';
import { UserPortalService } from 'src/app/Services/user-portal.service';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent implements OnInit {
  searchValue: string;
  searchUserValue: string;
  paginationNumber2: number = 1;
  data: UserDashboardModel;
  sorted: TransactionHistory[];

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
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
    console.log(this.data.transactionHistory);
  }

  //filtering the table as per the serch value
  SearchUser() {
    if (this.searchUserValue == '') {
      this.ngOnInit();
    } else {
      this.data.transactionHistory = this.data.transactionHistory.filter(
        (res) => {
          return res.productName
            .toLocaleLowerCase()
            .match(this.searchUserValue.toLocaleLowerCase());
        }
      );
    }
  }
}
