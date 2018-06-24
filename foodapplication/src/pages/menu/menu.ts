import { Component } from '@angular/core';
 import  { Http } from '@angular/http';
import { NavController, NavParams, ModalController, Modal, ModalOptions } from 'ionic-angular';
//Pages
import { PaymentPage } from '../payment/payment';
import  { ProductModalPage } from '../product-modal/product-modal'; 
import 'rxjs/add/operator/map';
//Service
import { MenuService } from '../../services/menu.service';
//Models
import { Categories } from '../../models/menu.model'
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  menu: Categories[];
  cart: any[] = [];
  total: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menuService: MenuService,
    private modalCtrl: ModalController
  ) {
    this.menuService.getMenu(navParams.get('restaurant'))
    .then(menu => {
      this.menu = menu.categories;
    });
 }

/**
  * @param {number} catId
  * @param {number} productId
  */
_addToCart = (catId, productId) => {
  this.menu[catId].products[productId].quantity = 
  this.menu[catId].products[productId].quantity
  ? this.menu[catId].products[productId].quantity + 1
  : 1;

  this.cart.push(this.menu[catId].products[productId]);
  this._totalPrice();
}


/**
  * @param {number} catId
  * @param {number} productId
  */
_deleteFromCart = (catId, productId) => {
  this.menu[catId].products[productId].quantity = 
  this.menu[catId].products[productId].quantity === 0 
  ? 0 
  :this.menu[catId].products[productId].quantity - 1;

  const itemToRemove = this.cart.findIndex(item => 
    item.name === this.menu[catId].products[productId].name);
    if(this.cart[itemToRemove] && this.cart[itemToRemove].quantity >= 0) {
      this.cart.splice(itemToRemove, 1);
    }
    this.total -= this.menu[catId].products[productId].price;
    this._totalPrice();
  }

  _onOrder = () => {
    if(this.cart.length > 0) {
      this.navCtrl.push(PaymentPage, {
        cart: this.cart,
        total: this.total,
      });
    }
  }

/**
 
  * @param {number} catId
  * @param {number} productId
  */
_productModal = (catId, productId) => {
  const modalOptions: ModalOptions = { enableBackdropDismiss: true, showBackdrop: true};
  const productModal: Modal = this.modalCtrl.create(ProductModalPage, { 
    product: this.menu[catId].products[productId] 
  }, modalOptions);
   productModal.present();
   productModal.onWillDismiss((param) => {  
     if(param.addToCart) {
      this._addToCart(catId, productId);
     }
   });
}

/**

  */
  _totalPrice = () => {
    this.total = this.cart.length > 0 ? this.cart
    .map(item => item.price)
    .reduce((a, b) => {
      return a+b;
    }) : '0';
  }

  /**
    * @param {number} i
    */
  _toggleCategory = (i) => {
    this.menu[i].open = !this.menu[i].open;
    this.menu.forEach(item => {
      if(item !== this.menu[i]) {
        item.open = false;
      }
    });
  } 
}
