import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseServices } from '../../services/fireBaseService';
import { StatusPage } from '../status/status';

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

  // Status page
  status: any = {};

  // From flag
  from: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fire: FirebaseServices) {

    // Data from status page
    this.status = this.navParams.get('status');

    // From flag
    this.from = this.navParams.get('from');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WarningPage');
  }

  cancel() {
  }

  selected() {

    if (this.from == 1) {

      // Remove the data
      this.fire.removeField('requests', this.status.reqId)
        .then((response) => {
          
          // Dismiss the popover
          let index = this.navCtrl.getActive().index;
          this.navCtrl.remove(index);
          this.navCtrl.push(StatusPage);
          
        })
        .catch((error) => {
          
        });
    }
    else if (this.from == 2){

      

    }
  }
}
