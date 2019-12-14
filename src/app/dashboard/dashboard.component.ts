import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClientService } from '../service/http-client.service';
declare var $;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  productList: any;
  cartList: any = [];
  totalPrice: any;
  isDataLoaded: boolean = false;
  constructor(
    private httpClient: HttpClientService
  ) { }
  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.httpClient.getRequest('1bv6ws', {}).then(res => {
      this.isDataLoaded = true;
      this.productList = res;
      this.productList.forEach(element => {
        element.quantityList = this.quantityList(element.product_qty);
        element.selectedQuantity = 1;
      });
    });
  }

  quantityList(quantity) {
    var arr = [];
    for (var i = 1; i <= quantity; i++) {
      arr.push(i);
    }
    return arr;
  }

  addToCart(product, index) {
    let totalproductPrice = product.selectedQuantity * product.product_price;
    let data = { quantity: product.selectedQuantity, product: product.product_name, price: product.product_price, index: index, totalPrice: totalproductPrice };
    let remaingQuantity = 0;
    let isProductExist = this.checkProductExistInCart(data);
    if (isProductExist) {
      this.cartList.forEach(element => {
        if (element.product === data.product) {
          let totalselectQuantity = element.quantity + data.quantity;
          element.quantity = totalselectQuantity;
          remaingQuantity = product.product_qty - totalselectQuantity;
          element.totalPrice = element.price * totalselectQuantity;
        }
      });
    } else {
      this.cartList.push(data);
      remaingQuantity = product.product_qty - product.selectedQuantity;

    }
    this.productList[index].selectedQuantity = 1;
    this.productList[index].quantityList = this.quantityList(remaingQuantity);
    console.log(this.productList);
    console.log(this.cartList);
  }

  checkProductExistInCart(data) {
    let isexist: boolean = false;
    if (this.cartList.length > 0) {
      this.cartList.forEach(element => {        
        if (element.product === data.product) {
          isexist= true;
        }
      });
    } else {
      isexist= false;
    }

    return isexist;
  }
  getTotalPrice(){
    let totalAmount = 0;
    this.cartList.forEach(element => {
      totalAmount = totalAmount + element.totalPrice;
    });

    return totalAmount;
  }

  removeProduct(product, index){
    this.cartList.splice(index,1);
    this.productList[product.index].quantityList = this.quantityList(this.productList[product.index].product_qty);
  }
}
