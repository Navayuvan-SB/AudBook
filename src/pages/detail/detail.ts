import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
import { StatusPage } from '../status/status';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  data:any;
  public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
   this.data =navParams.get('getdata');
   console.log(this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }
  dept(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose dept');

    alert.addInput({
      type: 'radio',
      label: 'INFO TECH',
      value: 'IT',
      // checked: true
    });
    

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
     
    });
    alert.present();
  }
  

}
