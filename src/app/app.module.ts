import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { ForbiddenAccessComponent } from './components/forbidden-access/forbidden-access.component';
import { ForbiddenPageComponent } from './components/forbidden-page/forbidden-page.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegistrationComponent } from './components/users/registration/registration.component';
import { UserService } from './Services/user.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { SearchFilterePipe } from './Pipes/search-filtere.pipe';
import { AdminDetailsComponent } from './components/admin-details/admin-details.component';
import { DashboardComponent } from './components/home/dashboard/dashboard.component';
import { ProductListComponent } from './components/home/product-list/product-list.component';
import { ProductDetailsComponent } from './components/home/product-details/product-details.component';
import { UserDetailsComponent } from './components/home/user-details/user-details.component';
import { TransactionListComponent } from './components/home/transaction-list/transaction-list.component';
import { OrderListComponent } from './components/home/order-list/order-list.component';
import { EmiPendingListComponent } from './components/home/emi-pending-list/emi-pending-list.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ForgetPasswordComponent } from './components/users/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/users/reset-password/reset-password.component';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { HomebannerComponent } from './components/homebanner/homebanner.component';
import { AdminCreateComponent } from './components/admin-create/admin-create.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    // RouterModule,
    AppRoutingModule,
    Ng2OrderModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    NgHttpLoaderModule.forRoot(),
    ToastrModule.forRoot({
      progressBar: true,
    }),
    FormsModule,
    NgxPaginationModule,
    // RouterModule.forRoot(routes),
  ],
  declarations: [
    AppComponent,
    AdminLoginComponent,
    ForbiddenAccessComponent,
    ForbiddenPageComponent,
    HomeComponent,
    UsersComponent,
    LoginComponent,
    RegistrationComponent,
    AdminDashboardComponent,
    SearchFilterePipe,
    AdminDetailsComponent,
    ProductListComponent,
    ProductDetailsComponent,
    UserDetailsComponent,
    TransactionListComponent,
    OrderListComponent,
    EmiPendingListComponent,
    DashboardComponent,
    LoaderComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    AddProductsComponent,
    HomebannerComponent,
    AdminCreateComponent,
  ],

  providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
