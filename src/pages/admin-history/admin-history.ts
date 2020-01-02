import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, PopoverController, AlertController } from 'ionic-angular';
import { FirebaseServices } from '../../services/fireBaseService';



/**
 * Generated class for the AdminHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for mo re info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-history',
  templateUrl: 'admin-history.html',
})
export class AdminHistoryPage {

  

  date: any;
  
  historyInfo: any;

  // Loading controller
  loadingCtrl: any;

  // Toast controller
  toastCtrl: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fire: FirebaseServices,
    public toast: ToastController,
    public load: LoadingController,
    public alert: AlertController,
  ) {

   
  
  // Initializing Loading Controller
  this.loadingCtrl = this.load.create({
    content: 'Please wait...'
  });

  // Initializing Toast Controller
  this.toastCtrl = this.toast.create({
    duration: 3000
  });

   
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminHistoryPage');
  }


  dateChanged(){

    if (this.date){
      this.firebaseFunctions();
    }
    }
    

  //variable name to store the objects from data
  firebaseFunctions() {


    this.fire.readOnce('requests')
      .then((response) => {
        console.log("Read Once Called");

        //objects is stored in obj
        // this.dataret = response;
        let obj = Object.entries(response);

       // Local array to store the array of objects
        let arr = []

        // Presenting loading controllSer
        this.loadingCtrl.present();

        // Loop through the received object
        for (var i = 0; i < obj.length; i++) {


          if (this.dateChanged== obj[i][1].date)
            arr.push(obj[i][1]);
console.log(this.date);
        }
        // Assigining arr to global datar
        this.historyInfo = arr;
        console.log(this.historyInfo);

        // Dismissing the loading controller
        this.loadingCtrl.dismiss();

      })
      .catch((error) => {
        console.log(error);

        // Dismissing the loading controller
        this.loadingCtrl.dismiss();

        // Display the toast
        this.toastCtrl.setMessage("Something went wrong ...please try again");
        this.toastCtrl.present();

      });

  }

  showConfirm() {

    const confirm = this.alert.create({
      title: 'Warning',
      message: 'Do you agree to undo?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }


}
