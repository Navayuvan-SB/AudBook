import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, PopoverController } from 'ionic-angular';
import { BookNewPage } from '../book-new/book-new';
import { WarningPage } from '../warning/warning';

/**
 * Generated class for the StatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {

  constructor(public alertctrl: AlertController,
              public navCtrl: NavController, 
              public navParams: NavParams, 
              public popoverCtrl: PopoverController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');
  }
  alert(){
    const popover= this.popoverCtrl.create(WarningPage);
    
    popover.present();  
 
  }
  
  next1(){
    this.navCtrl.push(BookNewPage);
  }

}
