import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private fb: FormBuilder, private http: HttpClient) {}
  readonly BaseURI = 'https://localhost:44333/api';

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+'),
      ],
    ],
    FullName: ['', Validators.required],
    DateOfBirth: ['', Validators.required],
    BankName: ['', Validators.required],
    Address: ['', Validators.required],
    IFSCcode: ['', Validators.required],
    BranchName: ['', Validators.required],
    AccountNumber: ['', Validators.required],
    CardType: ['', Validators.required],
    PhoneNumber: ['', [Validators.required, Validators.minLength(10)]],
    Passwords: this.fb.group(
      {
        Password: ['', [Validators.required, Validators.minLength(4)]],
        ConfirmPassword: ['', Validators.required],
      },
      { validator: this.comparePasswords }
    ),
  });

  formModelReset = this.fb.group({
    Email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'),
      ],
    ],
    Passwords: this.fb.group(
      {
        Password: ['', [Validators.required, Validators.minLength(4)]],
        ConfirmPassword: ['', Validators.required],
      },
      { validator: this.comparePasswords }
    ),
  });

  //method for comparing passwrod
  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (
      confirmPswrdCtrl.errors == null ||
      'passwordMismatch' in confirmPswrdCtrl.errors
    ) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else confirmPswrdCtrl.setErrors(null);
    }
  }

  //method of register
  register() {
    var body = {
      username: this.formModel.value.UserName,
      email: this.formModel.value.Email,
      fullName: this.formModel.value.FullName,
      password: this.formModel.value.Passwords.Password,
      dateOfBirth: this.formModel.value.DateOfBirth,
      phoneNumber: this.formModel.value.PhoneNumber,
      bankname: this.formModel.value.BankName,
      branch: this.formModel.value.BranchName,
      ifscCode: this.formModel.value.IFSCcode,
      accountNumber: this.formModel.value.AccountNumber,
      cardType: this.formModel.value.CardType,
      userAddress: this.formModel.value.Address,
    };
    return this.http.post(this.BaseURI + '/User/Register', body);
  }

  //method of login 
  login(formData) {
    return this.http.post(this.BaseURI + '/User/Login', formData);
  }

  //method for getting userProfile
  getUserProfile() {
    // var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
    // return this.http.get(this.BaseURI + '/UserProfile', {headers : tokenHeader});
    return this.http.get(this.BaseURI + '/UserProfile/GetUserProfile');
  }

  //method for checking if the user is authorized for any router or not
  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payload = JSON.parse(
      window.atob(localStorage.getItem('token').split('.')[1])
    );
    var userRole = payload.role;
    allowedRoles.forEach((element) => { 
      if (userRole == element) {                //matching every roles from the routing module with the role in token from backend
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

  //method for submitting joining fees
  postJoiningFees(id, form: NgForm) {
    return this.http.put(
      this.BaseURI + `/UserProfile/PostJoiningFees/${id}`,
      form
    );
  }

  //method for forget password and accept the form as a parameter
  forgetPassword(form) {
    return this.http.post(
      this.BaseURI + `/User/forgetPassword?email=${form.email}`,
      form
    );
  }

  //method for reset password and accept a token
  resetPassword(token) {
    var body = {
      email: this.formModelReset.value.Email,
      token: token,
      password: this.formModelReset.value.Passwords.Password,
    };
    return this.http.post(this.BaseURI + `/User/resetPassword`, body);
  }
}
