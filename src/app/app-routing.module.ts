import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AdminCreateComponent } from './components/admin-create/admin-create.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminDetailsComponent } from './components/admin-details/admin-details.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { ForbiddenAccessComponent } from './components/forbidden-access/forbidden-access.component';
import { ForbiddenPageComponent } from './components/forbidden-page/forbidden-page.component';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { EmiPendingListComponent } from './components/home/emi-pending-list/emi-pending-list.component';
import { HomeComponent } from './components/home/home.component';
import { OrderListComponent } from './components/home/order-list/order-list.component';
import { ProductDetailsComponent } from './components/home/product-details/product-details.component';
import { ProductListComponent } from './components/home/product-list/product-list.component';
import { TransactionListComponent } from './components/home/transaction-list/transaction-list.component';
import { HomebannerComponent } from './components/homebanner/homebanner.component';
import { ForgetPasswordComponent } from './components/users/forget-password/forget-password.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegistrationComponent } from './components/users/registration/registration.component';
import { ResetPasswordComponent } from './components/users/reset-password/reset-password.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', component: HomebannerComponent },
  { path: 'admin', redirectTo: '/admin/login', pathMatch: 'full' },
  { path: 'home', redirectTo: '/home/dashboard', pathMatch: 'full' },
  {
    path: 'user',
    component: UsersComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forget-password', component: ForgetPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ],
  },
  { path: 'admin/login', component: AdminLoginComponent },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { permittedRoles: ['Admin'] },
  },
  {
    path: 'admin/AddAdmin',
    component: AdminCreateComponent,
    canActivate: [AuthGuard],
    data: { permittedRoles: ['Admin'] },
  },
  {
    path: 'admin/details/:id',
    component: AdminDetailsComponent,
    canActivate: [AuthGuard],
    data: { permittedRoles: ['Admin'] },
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { permittedRoles: ['Customer'] },
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', component: ProductDetailsComponent },
      { path: 'transactions', component: TransactionListComponent },
      { path: 'orderHistory', component: OrderListComponent },
      { path: 'EmiPending', component: EmiPendingListComponent },
    ],
  },
  // {path:'home',component:HomeComponent,canActivate:[AuthGuard], data:{permittedRoles:['Customer']}},
  { path: 'forbidden', component: ForbiddenAccessComponent },
  { path: '**', component: ForbiddenPageComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
