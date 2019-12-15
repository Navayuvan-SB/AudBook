import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ToastController } from 'ionic-angular';
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

  // Loading controller
  loadingCtrl: any;

  // Toast controller
  toastCtrl: any;


  // Status page
  status: any = {};

  // From flag
  from: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fire: FirebaseServices,
    public loading: LoadingController,
    public toast: ToastController) {

    // Data from status page
    this.status = this.navParams.get('status');

    // From flag
    this.from = this.navParams.get('from');

    // Initializing Loading Controller
    this.loadingCtrl = this.loading.create({
      content: 'Please wait...'
    });

    // Initializing Toast Controller
    this.toastCtrl = this.toast.create({
      duration: 3000
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WarningPage');
  }

  cancel() {

     
          // Dismiss the popover
          let index = this.navCtrl.getActive().index;
          this.navCtrl.remove(index);
          this.navCtrl.push(StatusPage);
          
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
    else if (this.from == 2){

      

    }
  }
}
