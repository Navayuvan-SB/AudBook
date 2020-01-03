import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, ToastController } from 'ionic-angular';
import { CalendarPage } from '../calendar/calendar';
import { FirebaseServices } from '../../services/fireBaseService';

/**
 * Generated class for the BookNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-book-new',
  templateUrl: 'book-new.html',
})
export class BookNewPage {

  // Loading controller
  loadingCtrl: any;

  // Toast controller
  toastCtrl: any;

  // data from database
  audinfo: any;

  // Seat Count
  sCount: number = 0;

  constructor(public fire: FirebaseServices,
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public loading: LoadingController,
    public toast: ToastController) {


    // Initializing Loading Controller
    this.loadingCtrl = this.loading.create({
      content: 'Please wait...'
    });

    // Initializing Toast Controller
    this.toastCtrl = this.toast.create({
      duration: 3000
    });


    // Getting the Seat count from Status page
    this.sCount = this.navParams.get('sCount').count;

    this.sCount = Number(this.sCount);

    console.log(this.sCount);

    this.firebaseFunctions();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookNewPage');
  }


  //passing data to calendar
  calendar(aud: any) {

    this.fire.readOnce('requests')
      .then((response) => {
        const popover = this.popoverCtrl.create(CalendarPage, { aud: aud, data: response });
        popover.present();
      });

  }

  //getting data from firebase
  firebaseFunctions() {

    // Presenting loading controller
    this.loadingCtrl.present();

    this.fire.readOnce('auditorium')
      .then((response) => {
        console.log("Read Once Called");
        let obj = Object.entries(response);

        //local array to store array of objects
        let arr = []

        //loop through the received object
        for (var i = 0; i < obj.length; i++) {
          arr.push(obj[i][1]);
        }

        //assigning arr to global audinfo
        this.audinfo = this.seatSort(arr);

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


  // Sort the array of objects according to the seat count
  seatSort(displayArray) {

    // Sorting in Ascending order
    displayArray.sort((a, b) => {
      return (a.sCount - b.sCount)
    });

    // Array to store the sorted list
    let sArr = [];

    // Length of the array
    let length = displayArray.length;

    // Index variable for sorting function
    let index = 0;

    // Flag for completion of a cycle
    let flag = 0;

    // Sort according the seat count
    for (var i = 0; i < length; i++) {

      // Check if this is a first cycle
      if (flag == 0) {

        // Check If the Auditorium seat count is less than the entered seat count
        if (this.sCount <= displayArray[i].sCount) {

          sArr.push(displayArray[i]);
        }
        else {
          index = i;
        }

        // If the 1st cycle is gonna end, set the length and reset the i variable 
        if (i == length - 1 && index != 0) {
          length = index + 1;
          i = -1;
          flag = 1;
        }

      }

      // If not the initial cycle
      else if (flag == 1) {

        sArr.push(displayArray[i]);
      }

    }

    console.log(sArr);
    return sArr;

  }

}
