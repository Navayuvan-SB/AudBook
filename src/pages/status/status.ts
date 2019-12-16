import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, PopoverController, LoadingController, ToastController} from 'ionic-angular';
import { BookNewPage } from '../book-new/book-new';
import { WarningPage } from '../warning/warning';
import { FirebaseServices } from '../../services/fireBaseService';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the StatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {

  statusinfo: any;
  userId: any;

  // Loading controller
  loadingCtrl: any;

  // Toast controller
  toastCtrl: any;

  constructor(
    public alertctrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingController,
    public toast: ToastController,
    public popoverCtrl: PopoverController,
    private fire: FirebaseServices,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController) {

    // Initializing Loading Controller
    this.loadingCtrl = this.loading.create({
      content: 'Please wait...'
    });

    // Initializing Toast Controller
    this.toastCtrl = this.toast.create({
      duration: 3000
    });

    //read the userId from database
    this.fire.readOnce('users/' + this.afAuth.auth.currentUser.uid)
      .then((response) => {
        this.userId = response.userId;
      })
      .catch((error) => {

      });

    this.firebaseFunctions();

  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');

  }
  
  //variable name to store the objects from data
  firebaseFunctions() {
    
    // Presenting loading controller
    this.loadingCtrl.present();
  
    this.fire.readOnce('requests')
      .then((response) => {
        console.log("Read Once Called");
        
        //objects is stored in obj
        // this.dataret = response;
        let obj = Object.entries(response);

        // Local array to store the array of objects
        let arr = []

        // Loop through the received object
        for (var i = 0; i < obj.length; i++) {

        //condition to compare the IDs to display the Status
          if (this.userId == obj[i][1].userId) {
            arr.push(obj[i][1]);

          }
        }
        // Assigining arr to global datar
        this.statusinfo = arr;

        console.log(this.statusinfo);

        // Dismissing the loading controller
        this.loadingCtrl.dismiss();

      })
      .catch((error) => {
        console.log(error);

      // Dismissing the loading controller
      this.loadingCtrl.dismiss();

      // Display the toast
      this.toastCtrl.setMessage("Something went wrong ...please try again")
      this.toastCtrl.present();
      
      });

  }

  alert(data: any) {

    // Pass the data to Warning popover
    const popover = this.popoverCtrl.create(WarningPage, { status: data, from: 1 });
    popover.present();
  }

  next1() {

    // Prompt alert for get the seat count from user
    const seatAlert = this.alertCtrl.create({
      title: "Seat Count",
      message: 'Enter the expected Seat count',
      inputs: [
        {
          name: 'count',
          placeholder: 'Count'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Continue',
          handler: data => {

            // Pass the seat count to Book New Page
            this.navCtrl.push(BookNewPage, { sCount: data });
          }
        }
      ]
    });

    seatAlert.present();

  }

}
