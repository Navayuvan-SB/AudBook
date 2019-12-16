import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FirebaseServices } from '../../services/fireBaseService';
import { StatusPage } from '../status/status';
import { DashboardPage } from '../dashboard/dashboard';
import { RequestPage } from '../request/request';

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

  // Request data
  requests: any;

  // From flag
  from: number;

  // Loading and Toast Instance
  loading: any;
  toast: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fire: FirebaseServices,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {

    // Data from status page
    this.status = this.navParams.get('status');

    // Data from Request Page
    this.requests = this.navParams.get('requests');

    // From flag
    this.from = this.navParams.get('from');

    // Initialising toast and loading instance
    this.toast = this.toastCtrl.create({
      duration: 2000,
      position: 'bottom'
    });

    this.loading = this.loadingCtrl.create({
      content: 'Please wait'
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WarningPage');
  }

  cancel() {

    if (this.from == 1) {
      // Dismiss the popover
      let index = this.navCtrl.getActive().index;
      this.navCtrl.remove(index);
      this.navCtrl.push(StatusPage);
    }
    else if (this.from == 2) {

      // Dismiss the popover
      let index = this.navCtrl.getActive().index;
      this.navCtrl.remove(index);
      this.navCtrl.push(RequestPage);
    }

  }

  selected() {

    if (this.from == 1) {

      // Presenting loading controller
      this.loadingCtrl.present();

      // Remove the data
      this.fire.removeField('requests', this.status.reqId)
        .then((response) => {

          // Dismiss the popover
          let index = this.navCtrl.getActive().index;
          this.navCtrl.remove(index);
          this.navCtrl.push(StatusPage);

          // Dismissing the loading controller
          this.loadingCtrl.dismiss();

          // Display the toast
          this.toastCtrl.setMessage("Done successfully...!")
          this.toastCtrl.present();


        })
        .catch((error) => {

          // Dismissing the loading controller
          this.loadingCtrl.dismiss();

          // Display the toast
          this.toastCtrl.setMessage("Something is wrong. Please try again later...!")
          this.toastCtrl.present();


        });
    }
    else if (this.from == 2) {

      // Present loading
      this.loading.present();
      
      // Data to update
      let path = 'requests/' + this.requests.reqId + '/status';

      let data = {
        [path]: 2
      }

      this.fire.updateField(data)
        .then((response) => {

          // console.log("Successssssssss");
          // Remove the active index
          let index = this.navCtrl.getActive().index;
          this.navCtrl.remove(index);
          this.loading.dismiss();
        })
        .catch((error) => {

          this.loading.dismiss();
          this.toast.setMessage("Some error has occured. Please try again");
          this.toast.present();
        });


    }
  }

}
