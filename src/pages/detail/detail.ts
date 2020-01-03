import { Component, HostBinding } from '@angular/core';
import { IonicPage, AlertController, PopoverController, NavController, NavParams, Platform, LoadingController, ToastController } from 'ionic-angular';
import { StatusPage } from '../status/status';
import { CalendarPage } from '../calendar/calendar';
import { getParentRenderElement } from '@angular/core/src/view/util';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseServices } from '../../services/fireBaseService';
import { AngularFireAuth } from 'angularfire2/auth';



/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',

})

export class DetailPage {

  // Loading controller
  loadingCtrl: any;

  // Toast controller
  toastCtrl: any;

  //form validation
  credentialForm: FormGroup

  // date declaration
  calenDateData: any;
  date: string;
  oldMonth: string;
  month: number;
  year: string;

  //final concatenated date
  findata: string;

  text: string = '';

  department: string;
  dept1: string;

  aud: any;

  audname: any;
  auddept: any;

  // for comparing id for availability check
  audid: any;

  //database status 
  statusrec: number;

  //getting fn and an values
  foren: number = 1;
  aftern: number = 1;




  // public event = {
  //   month: '1990-02-19',
  //   timeStarts: '07:43',
  //   timeEnds: '1990-02-20'
  // }

  // Button check status
  anStatus: number = 0;
  fnStatus: number = 0;

  // User Id
  userId: any;


  constructor(public fire: FirebaseServices,
    public formBuilder: FormBuilder,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public platform: Platform,
    public navParams: NavParams,
    public loading: LoadingController,
    public toast: ToastController,
    public afAuth: AngularFireAuth
  ) {

    this.credentialForm = this.formBuilder.group({
      text1: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])]

    });

    // Initializing Loading Controller
    this.loadingCtrl = this.loading.create({
      content: 'Please wait...'
    });

    // Initializing Toast Controller
    this.toastCtrl = this.toast.create({
      duration: 3000
    });

    this.fire.readOnce('users/' + this.afAuth.auth.currentUser.uid)
      .then((response) => {
        this.userId = response['userId'];
      })
      .catch((error) => {

      });

    this.firebaseFunctions();

    // getting value from calendar page

    //for getting the date,month,time
    this.calenDateData = navParams.get('getdata');

    // for mobile number
    this.text = navParams.get('text1');


    //for department
    this.dept1 = navParams.get('dept1');

    if (this.dept1 == undefined) {
      this.department = 'Mech';
    }
    else {
      this.department = this.dept1;
    }

    //for seperating the values from the array of date, time , month 
    this.date = this.calenDateData.date;
    this.oldMonth = this.calenDateData.month;
    this.month = Number(this.oldMonth);
    this.month = this.month + 1;
    this.year = this.calenDateData.year;
    this.findata = String(this.date + '/' + this.month + '/' + this.year);
    console.log(this.findata);

    //getting aud values of aud from calendar page
    this.aud = navParams.get('aud');
    console.log(this.aud);

    // seperating the values needed from the array
    this.audname = this.aud.name;
    this.auddept = this.aud.dept;
    this.audid = String(this.aud.audID);
    console.log(this.audid);

    // for-after-noon border color back to normal when visiting page again 
    document.documentElement.style.setProperty(`--button-clicked-an`, '1px solid #000');
    document.documentElement.style.setProperty(`--button-clicked-fn`, '1px solid #000');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  dept() {
    // for dropdown -radio alert
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose dept');

    alert.addInput({
      type: 'radio',
      label: 'Mech',
      value: 'Mech',
      checked: true
    }
    );
    alert.addInput({
      type: 'radio',
      label: 'IT',
      value: 'IT',
      // checked: true
    }
    );
    alert.addInput({
      type: 'radio',
      label: 'Biomed',
      value: 'Bio-med',
      // checked: true
    }
    );
    alert.addInput({
      type: 'radio',
      label: 'Civil',
      value: 'Civil',
      // checked: true
    }
    );
    alert.addInput({
      type: 'radio',
      label: 'CSE',
      value: 'CSE',
      // checked: true
    }
    );
    alert.addInput({
      type: 'radio',
      label: 'ECE',
      value: 'ECE',
      // checked: true
    }
    );
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.department = data;
      }
    });
    alert.present();
  }




  // clicking book

  stat() {

    var phoneNumber = this.credentialForm.controls['text1'].value;

    if ((this.anStatus == 1) || (this.fnStatus == 1) && (phoneNumber != '')) {

      // Req Id Generation
      var write = this.audname + phoneNumber.substring(3, 6) + 'wr' + this.foren + this.aftern;

      // Data to write
      let data = {
        'AN': this.anStatus,
        'FN': this.fnStatus,
        'audName': this.audname,
        'audId': this.audid,
        'date': this.findata,
        'dept': this.department,
        'phone': phoneNumber,
        'reqId': write,
        'userId': this.userId,
        'status': 0
      }

      // Presenting loading controller
      this.loadingCtrl.present();

      // Write the request to database
      this.fire.writeInDatabase('requests/' + write, data)
        .then((response) => {
          console.log(response);
          // Dismissing the loading controller
          this.loadingCtrl.dismiss();

          this.changeRequestCount();
        })
        .catch((error) => {
          console.log(error);
          // Dismissing the loading controller
          this.loadingCtrl.dismiss();

          // Display the toast
          this.toastCtrl.setMessage("Something went wrong ....please try again")
          this.toastCtrl.present();
        });

      this.navCtrl.setRoot(StatusPage);

    }
    else {

      this.toastCtrl.setMessage("Enter all the fields correctly..");
      this.toastCtrl.present();
    }

  }

  // AN button trigger
  mycolorAn() {

    // Check the Initial state
    if (this.anStatus == 0) {

      // If checked, change it to 1 and set the border color as Green
      document.documentElement.style.setProperty(`--button-clicked-an`, '2px solid #35AE59');
      this.anStatus = 1;
      // this.anpassStatus=this.anStatus;
    }
    else {

      // If Unchecked, Change it to 0 and set the border as normal
      document.documentElement.style.setProperty(`--button-clicked-an`, '1px solid #000');
      this.anStatus = 0;

    }


  }


  // Fn button trigger
  mycolorFn() {

    // Check the Initial state
    if (this.fnStatus == 0) {

      // If checked, change it to 1 and set the border color as Green
      document.documentElement.style.setProperty(`--button-clicked-fn`, '2px solid  #35AE59');
      this.fnStatus = 1;

    }
    else {

      // If Unchecked, Change it to 0 and set the border as normal
      document.documentElement.style.setProperty(`--button-clicked-fn`, '1px solid #000');
      this.fnStatus = 0;
    }
    ;

  }

  firebaseFunctions() {
    this.fire.readOnce('requests')
      .then((response) => {

        // Flags for AN & FN
        let flagAN = '0';
        let flagFN = '0';
        let core = '0';

        console.log("Read Once Called");
        let obj = Object.entries(response);
        for (var i = 0; i < obj.length; i++) {


          if ((this.audid == obj[i][1].audId) && (this.findata == obj[i][1].date)) {

            core = '1';

            if ((obj[i][1].status == '1') || (obj[i][1].status == '0')) {

              if (flagAN == '0') {
                flagAN = obj[i][1].AN;
              }

              if (flagFN == '0') {
                flagFN = obj[i][1].FN;
              }

              if (flagFN == '1' && flagAN == '1') {
                // this.statusrec = 1;
                document.documentElement.style.setProperty(`--rocolor`, ' #ff0000 ');
              }

            }
            else if (obj[i][1].status == '0') {
              if (this.statusrec != 1) {
                // this.statusrec = 0;
                document.documentElement.style.setProperty(`--rocolor`, ' #FFFF00 ');
              }

            }

          }

          if (this.statusrec == 1) {
            break;
          }

        }

        if (core == '0') {
          // this.statusrec = 3;
          document.documentElement.style.setProperty(`--rocolor`, '  #35AE59 ');
        }

        if ((flagAN == '0' && flagFN == '1') || (flagAN == '1' && flagFN == '0')) {
          // this.statusrec = 0;
          document.documentElement.style.setProperty(`--rocolor`, ' #FFFF00 ');
        }

        if (flagFN == '1') {
          this.foren = 0;
        }

        if (flagAN == '1') {
          this.aftern = 0;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  cal() {

    
    this.fire.readOnce('requests')
      .then((response) => {

        //passing data to calendar page
        let pop = this.popoverCtrl.create(CalendarPage, { text: this.text, dept: this.department, aud: this.aud, data: response });//fromtext: this.fromtext, ftext:this.ftext

        //for terminating previous pages
        let currentindex = this.navCtrl.getActive().index;
        pop.onDidDismiss(() => {
          this.navCtrl.remove(currentindex);
        });

        pop.present();
      });

  }

  // TO change the request count in booked aud
  changeRequestCount() {

    // Read the current value in the request of aud
    this.fire.readOnce('auditorium/' + this.aud.audID)
      .then((response) => {

        // Count of requests
        let count = response['requests'];

        // Path string and data to update
        let path = 'auditorium/' + this.aud.audID + '/requests';

        let data = {
          [path]: count + 1
        }

        // Update function
        this.fire.updateField(data)
          .then((response) => {

          })
          .catch((error) => {

            // Show toast message
            this.toastCtrl.setMessage("Some error has occured. Please try again");
            this.toastCtrl.present();
          });

      })
      .catch((error) => {

      });
  }
} 
