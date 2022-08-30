import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router: Router, private service:UserService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('token') != null){
      let roles = next.data['permittedRoles'] as Array<string>;     //getting the roles from the token
      if(roles){                                //if the roles matches with the roles in routing module then return true
        if(this.service.roleMatch(roles)){
          return true;
        }else{
          this.router.navigate(['/forbidden']); //otherwise redirect to forbidden
          return false;
        }
      }
      return true;
    }
      
    else {
      this.router.navigate(['/']);          //if the token is null redirect to navigate
      return false;
    }

  }
}
