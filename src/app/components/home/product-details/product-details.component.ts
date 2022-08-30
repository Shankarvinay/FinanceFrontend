import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Products } from 'src/app/models/product';
import { UserPortalService } from 'src/app/Services/user-portal.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productsDetails;
  productId: number;
  userId: string;

  constructor(
    private router: Router,
    public service: UserPortalService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  formModel = {
    EmiDuration: '',
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.productId = id;          //getting the product id from the url and then calling the product details get api
      this.service.getProductDetails(id).subscribe(
        (res) => {
          this.productsDetails = res;
          console.log(res);
        },
        (err) => {
          this.toastr.error(err.error.message);
        }
      );
    });
  }

  onSubmit(formModel: NgForm) {
    this.userId = localStorage.getItem('userId');

    var body = {
      userId: this.userId,
      productId: this.productId,
      emiPeriod: formModel.value.EmiDuration,
    };

    this.service.buyProduct(body).subscribe(
      (res: any) => {
        console.log(res);
        this.router.navigateByUrl('/home/dashboard');
        this.toastr.success(res.message);
      },
      (err) => {
        this.toastr.error(err.error.message);
      }
    );
  }
}
