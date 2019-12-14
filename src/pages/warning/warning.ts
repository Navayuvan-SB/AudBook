import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServices } from '../../services/fireBaseService';

/**
 * Generated class for the WarningPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-warning',
  templateUrl: 'warning.html',
})
export class WarningPage {


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fire: FirebaseServices) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WarningPage');
  }

  cancel(){
  }

  selected(){
   
     this.fire.removeField('requests','ramya.reqId')
        .then((response) => {
          console.log("removeddd");
        })
        .catch((error) => {
          console.log(error);
        });
   
  } 
}
