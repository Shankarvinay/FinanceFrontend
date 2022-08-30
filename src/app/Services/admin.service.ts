import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserData } from '../models/User-data';
import { UserDetailsModel } from '../models/user-details-model';
import * as moment from 'moment';
import 'moment/locale/pt-br';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private fb: FormBuilder, private http: HttpClient) {} //injecting dependency
  readonly BaseURI = 'https://localhost:44333/api'; //backend Url for api

  //get method for getting admin profile
  getAdminProfile() {
    // var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
    // return this.http.get(this.BaseURI + '/UserProfile', {headers : tokenHeader});
    return this.http.get(this.BaseURI + '/Admin/UserProfile');
  }

  //method for getting AllUsers List
  getAllUserData() {
    return this.http.get(this.BaseURI + '/Admin/getAllUsers');
  }

  //method for geting user Details
  getUserDetails(id: string) {
    return this.http.get(this.BaseURI + `/Admin/GetUserDetails/${id}`);
  }

  formModel = this.fb.group({
    TotalCredits: ['', Validators.required],
    CardNumber: ['', Validators.required],
    validity: [
      '',
      [
        Validators.required,
        Validators.pattern('(0[1-9]|1[0-2])/([0-9]{4}|[0-9]{2})'),
      ],
    ],
  });

  //method for activating the account
  ActivateAccount(id, bankDetails: UserDetailsModel) {
    var body = {
      bankname: bankDetails.data.bankname,
      branch: bankDetails.data.branch,
      ifscCode: bankDetails.data.ifscCode,
      accountNumber: bankDetails.data.accountNumber,
      CardType: bankDetails.data.cardType,
      RemainingBalance: this.formModel.value.TotalCredits,
      amountSpent: 0.0,
      totalCredit: this.formModel.value.TotalCredits,
      cardNumber: this.formModel.value.CardNumber,
      Validity: this.formModel.value.validity,
      cardStatus: 'Activated',
      bankId: bankDetails.data.bankId,
      userId: id,
    };
    return this.http.put(this.BaseURI + `/Admin/ActivateAccount/${id}`, body);
  }

  //method for deleting the user
  deleteUser(id) {
    return this.http.post(this.BaseURI + `/Admin/DeleteUser/${id}`, {
      data: id,
    });
  }

  //method for adding admin user
  AddAdmin(form) {
    var body = {
      username: form.value.username,
      email: form.value.username,
      password: form.value.username,
      fullName: form.value.username,
    };
    return this.http.post(this.BaseURI + `/Admin/Signup/`, body);
  }

  //format date using moment js
  getFormat(date) {
    moment.locale('en');
    return moment(date).format('LL');
  }

  
}
