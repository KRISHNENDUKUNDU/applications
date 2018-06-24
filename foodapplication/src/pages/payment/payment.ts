import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConfirmationPage } from '../confirmation/confirmation';
//Services
import { OrdersService } from '../../services/orders.service';


@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {
  cart: any[];
  total: number;
  
   /**
    *
    * @param {object} cart
    */
  _aggregateCart = (cart) => {
    let newCart = [];
    cart.forEach(function(item) {
     if(newCart.indexOf(item) < 0) {
         newCart.push(item);
      }
    });
    return newCart;
  }

  // Calcumate the new total after adding or deleting items
  _calculateTotal = () => {
    const newTotal = this.cart.length ? this.cart
    .map(item => item.price * item.quantity)
    .reduce((a, b) => a + b) : 0;
    this.total = newTotal;
  }

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private ordersService: OrdersService,
  ) {
    this.cart = this._aggregateCart(navParams.get('cart'));
    this.total = navParams.get('total');
  }

  /**
    * 
    * @param {number} productId
    */
  _addOne = (productId) => {
    this.cart[productId].quantity += 1;
    this._calculateTotal();
  }

  /**
    *
    * @param {number} productId
    */
  _removeOne = (productId) => {
    if(this.cart[productId].quantity === 1) {
      this._deleteProduct(productId);
    } else {
      this.cart[productId].quantity -= 1;
    }
     this._calculateTotal();
  }

  /**
    * 
    * @param {number} productId
    */
  _deleteProduct = (productId) => {
    if(this.cart.length === 1) {
      this.navCtrl.pop();
    } else {
      this.cart.splice(productId, 1);
      this._calculateTotal();
    }
    
  }
  
   /**
    * A
    */
  _addToOrders = () => {
    const lastOrder = {
      date: new Date(),
      total: this.total,
      products: this.cart,
    }
    this.ordersService.newOrder(lastOrder);
  }


  _goBack = () => {
    this.navCtrl.pop();
  }
  

  _onPay = () => {
    this._addToOrders();
    this.navCtrl.push(ConfirmationPage, {
      finalOrder: this.cart,
      total: this.total,
    });
  }
}
