import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
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

  // aud data from requestpage
  data: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fire: FirebaseServices,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController) {

    // Data from status page
    this.status = this.navParams.get('status');

    // Data from Request Page
    this.requests = this.navParams.get('requests');

    // From flag
    this.from = this.navParams.get('from');

    // Data from req page
    this.data = this.navParams.get('data');


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WarningPage');
  }

  cancel() {

    if (this.from == 1) {

      // Dismiss the popover
      this.viewCtrl.dismiss();
    }
    else if (this.from == 2) {

      // Dismiss the popover
      this.viewCtrl.dismiss(this.data);
    }

  }

  selected() {

    // Initialising toast and loading instance
    let toast = this.toastCtrl.create({
      duration: 2000,
      position: 'bottom'
    });

    let loading = this.loadingCtrl.create({
      content: 'Please wait'
    });

    if (this.from == 1) {

      // Presenting loading controller
      loading.present();

      // Remove the data
      this.fire.removeField('requests', this.status.reqId)
        .then((response) => {

          // Dismissing the loading controller
          loading.dismiss();

          // Display the toast
          toast.setMessage("Deleted successfully...!")
          toast.present();

          // Dismiss the popover
          this.viewCtrl.dismiss();

        })
        .catch((error) => {

          // Dismissing the loading controller
          loading.dismiss();

          // Display the toast
          toast.setMessage("Something is wrong. Please try again later...!")
          toast.present();

          // Dismiss the popover
          this.viewCtrl.dismiss();

        });
    }
    else if (this.from == 2) {

      // Present loading
      loading.present();

      // Data to update
      let path = 'requests/' + this.requests.reqId + '/status';

      let data = {
        [path]: 3
      }

      this.fire.updateField(data)
        .then((response) => {

          // dismiss the loading
          loading.dismiss();

           // show toast message
           toast.setMessage("Request was successfully rejected.");
           toast.present();

          // Dismiss the popover
          this.viewCtrl.dismiss();

        })
        .catch((error) => {

          // dismiss the loading
          loading.dismiss();

          // show toast message
          toast.setMessage("Some error has occured. Please try again");
          toast.present();

          // Dismiss the popover
          this.viewCtrl.dismiss();

        });
    }
  }

}
