import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';


/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',

})
export class CalendarPage {
 public data: any;
currentEvents: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
    this.currentEvents = [
      {
        year: 2017,
        month: 11,
        date: 25
      },
      {
        year: 2017,
        month: 11,
        date: 26
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }
 public onDaySelect($event){
   console.log($event);
   let data= $event;
   this.navCtrl.push(DetailPage ,{getdata : data});
   console.log(data);
  }

}
