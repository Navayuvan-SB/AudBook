import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { CalendarPage } from '../calendar/calendar';

/**
 * Generated class for the BookNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-book-new',
  templateUrl: 'book-new.html',
})
export class BookNewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookNewPage');
  }
next(){
  this.navCtrl.push(DetailPage);
}
calendar(){
  const popover= this.popoverCtrl.create(CalendarPage);
    
  popover.present();  
}
}
