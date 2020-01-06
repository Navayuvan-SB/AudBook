import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReservedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-reserved',
  templateUrl: 'reserved.html',
})
export class ReservedPage {

  // Request details
  requests: any;

  // Auditorium details
  auditorium: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    // get auditorium details
    this.auditorium = this.navParams.get('aud');

    // get date from the source page
    let rawDate = this.navParams.get('getData');
    let day = rawDate.date;
    let month = Number(rawDate.month) + 1;
    let year = rawDate.year;
    let date = String(day + '/' + month + '/' + year);

    // get the collection of requests from source page
    let requests = this.navParams.get('data');

    // request array
    let obj = Object.entries(requests);
    
    // empty the request array if any
    this.requests = []
    obj.forEach((element) => {

      if(element[1]['date'] == date && element[1]['status'] == '1') {

        this.requests.push(element[1]);
        console.log(element[1]);
      }

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservedPage');
  }

}
