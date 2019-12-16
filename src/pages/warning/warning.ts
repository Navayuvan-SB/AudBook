import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
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

  // Loading and Toast Instance
  loading : any;
  toast   : any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fire: FirebaseServices,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {

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
    let index = this.navCtrl.getActive().index;
    this.navCtrl.remove(index);
  }

  selected() {

    // Start loading
    this.loading.present();

    if (this.from == 2) {

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
