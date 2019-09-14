import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { BookNewPage } from '../book-new/book-new';

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

  constructor(public alertctrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');
  }
  alert(){
        const alert=this.alertctrl.create({
        title: '<center><b>Warning</b></center>',
        cssClass:'alert-alert',
        message: 'Are you sure you want to delete the order?', 
        buttons: ['Cancel','Yes'],
      
  });
  alert.present(); 
  }
  
  next1(){
    this.navCtrl.push(BookNewPage);
  }

}
