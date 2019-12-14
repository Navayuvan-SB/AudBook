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

  // Request data
  requests: any;

  // From flag
  from: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fire: FirebaseServices) {

    // Data from Request Page
    this.requests = this.navParams.get('requests');

    // From flag
    this.from = this.navParams.get('from');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WarningPage');
  }


  cancel() {
    let index = this.navCtrl.getActive().index;
    this.navCtrl.remove(index);
  }

  selected() {


    if (this.from == 2) {

      // Data to update
      let path = 'requests/' + this.requests.reqId + '/status';

      let data = {
        [path]: 2
      }

      this.fire.updateField(data)
        .then((response) => {
          console.log("Successssssssss");
          let index = this.navCtrl.getActive().index;
          this.navCtrl.remove(index);
        })
        .catch((error) => {

        });
    }

  }

}
