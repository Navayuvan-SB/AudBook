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

  redata: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public fire: FirebaseServices) {

    this.redata = this.navParams.get('data');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WarningPage');
  }


  cancel(){

  }

  selected(){
      
    // Data to update
    let path = 'requests/' + this.redata.reqId + '/status';

    let data = {
      [path] : 2
    }

    this.fire.updateField(data)
    .then((response) => {
      console.log("Successssssssss");
    })
    .catch((error) => {

    })
  }

}
