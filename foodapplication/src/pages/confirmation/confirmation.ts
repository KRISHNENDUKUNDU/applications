import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html'
})

export class ConfirmationPage {
  
  constructor(public navCtrl: NavController) {
    setTimeout(() => {
      this.navCtrl.popToRoot();
    }, 2000)
  }
  
  _goHome = () => {
    this.navCtrl.popToRoot();
  }
}
