import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, PopoverController, LoadingController, ToastController } from 'ionic-angular';
import { BookNewPage } from '../book-new/book-new';
import { WarningPage } from '../warning/warning';
import { FirebaseServices } from '../../services/fireBaseService';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { AngularFireDatabase } from 'angularfire2/database';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

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

  // Class for blur the background when popup
  blurClass: any;

  constructor(
    public alertctrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingController,
    public toast: ToastController,
    public popoverCtrl: PopoverController,
    private fire: FirebaseServices,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    public fbAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase,
    public nativePageTransitions: NativePageTransitions) {

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

        // get the userId and call the firebase functions
        this.userId = response['userId'];
        this.firebaseFunctions();
      })
      .catch((error) => {

      });



  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');

  }

  //variable name to store the objects from data
  firebaseFunctions() {

    // Presenting loading controller
    this.loadingCtrl.present();

    this.afDatabase.database.ref('requests')
      .on("value", (response) => {

        //objects is stored in obj
        // this.dataret = response;

        console.log(response.val());

        let obj = Object.entries(response.val());

        // Local array to store the array of objects
        let arr = []

        // Loop through the received object
        for (var i = 0; i < obj.length; i++) {

          //condition to compare the IDs to display the Status
          if (this.userId == obj[i][1]['userId']) {
            arr.push(obj[i][1]);

          }
        }
        // Assigining arr to global datar
        this.statusinfo = this.addAuditoriumImage(arr);

        // Dismissing the loading controller
        this.loadingCtrl.dismiss();

      }, (error) => {

        // Dismissing the loading controller
        this.loadingCtrl.dismiss();

        // Display the toast
        this.toastCtrl.setMessage("Something went wrong ...please try again")
        this.toastCtrl.present();

      });

  }

  alert(data: any) {

    this.blurClass = 'blur';
    // Pass the data to Warning popover
    const popover = this.popoverCtrl.create(WarningPage, { status: data, from: 1 });

    popover.onDidDismiss((data) => {
      this.blurClass = false;
    });

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
            // Native slide page transitions
            let options: NativeTransitionOptions = {
              direction: 'left',
              duration: 350,
              slowdownfactor: -1,
              iosdelay: 50
            }

            this.nativePageTransitions.slide(options);
            this.navCtrl.push(BookNewPage, { sCount: data });
          }
        }
      ]
    });

    seatAlert.present();

  }

  addAuditoriumImage(requests) {

    // Access the auditorium id and add image in the property
    requests.map(element => {
      
      this.fire.readOnce('auditorium/' + element['audId'] + '/image')
      .then((response) => {
        return element['image'] = response;
      })
      .catch((error) => {
      
      });

    });

    return requests;

  }

}
