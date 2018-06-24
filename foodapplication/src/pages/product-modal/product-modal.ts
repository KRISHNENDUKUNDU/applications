import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
//Service
// import { MenuService } from '../../services/menu.service';
//Models
import { Product } from '../../models/menu.model'

@Component({
  selector: 'page-product-modal',
  templateUrl: 'product-modal.html',
})
export class ProductModalPage {
  product: Product;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,

    private view: ViewController
    ) {
      this.product = this.navParams.get('product');
  }

  _closeModal = (addToCart) => {
    this.view.dismiss({addToCart});
  }

}
