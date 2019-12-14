import { Component, HostBinding } from '@angular/core';
import { IonicPage, AlertController, PopoverController, NavController, NavParams, Platform } from 'ionic-angular';
import { StatusPage } from '../status/status';
import { CalendarPage } from '../calendar/calendar';
import { getParentRenderElement } from '@angular/core/src/view/util';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseServices } from '../../services/fireBaseService';



/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',

})
// @ViewChild('Navbar') navBar: Navbar;
export class DetailPage {
  credentialForm: FormGroup

  data: any;
  data1: string;
  data2: string;
  data3: string;
  data4: number;

  findata: string;

  text: string = '';

  // fromtext:any='fromtext';
  // fromtext1:string;

  // ftext:any='ftext';
  // ftext1:string;

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



  constructor(public fire: FirebaseServices, public formBuilder: FormBuilder, public popoverCtrl: PopoverController, public alertCtrl: AlertController, public navCtrl: NavController, public platform: Platform, public navParams: NavParams) {
    this.credentialForm = this.formBuilder.group({
      text1: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])],

    });

    this.firebaseFunctions()
      .then((response) => {

        console.log(this.statusrec);
        //color change of the dot in detail page
        if (this.statusrec == 0) {
          document.documentElement.style.setProperty(`--rocolor`, ' #FFFF00 ');
        }
        else if ((this.statusrec == 1) || (this.statusrec == 2)) {
          document.documentElement.style.setProperty(`--rocolor`, ' #ff0000 ');
        }

        // })
        // .catch((error)=> {
        else {
          document.documentElement.style.setProperty(`--rocolor`, '  #35AE59 ');
        }
      });

    // getting value from calendar page

    //for getting the date,month,time
    this.data = navParams.get('getdata');

    // for mobile number
    this.text = navParams.get('text1');



    // to time picker
    //this.ftext1=navParams.get('ftext1');
    // this.ftext= this.ftext1;

    //from timepicker
    //this.fromtext1=navParams.get('fromtext1');
    //this.fromtext= this.fromtext1;

    //for department
    this.dept1 = navParams.get('dept1');
    if (this.dept1 == undefined) {
      this.department = 'Mech';
    }
    else {
      this.department = this.dept1;
    }

    //for seperating the values from the array of date, time , month 
    this.data1 = this.data.date;
    this.data2 = this.data.month;
    this.data4 = Number(this.data2);
    this.data4 = this.data4 + 1;
    this.data3 = this.data.year;
    this.findata = String(this.data1 + '/' + this.data4 + '/' + this.data3);
    console.log(this.findata);

    //getting aud values of aud from calendar page
    this.aud = navParams.get('aud');
    console.log(this.aud);

    // seperating the values needed from the array
    this.audname = this.aud.name;
    this.auddept = this.aud.dept;
    this.audid = String(this.aud.audID);
    console.log(this.audid);

    document.documentElement.style.setProperty(`--button-clicked-an`, '1px solid #000');
    document.documentElement.style.setProperty(`--button-clicked-fn`, '1px solid #000');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');

    this.aftern = 1;
    this.foren = 1;

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
    
    // Req Id Generation
    var write = this.audname + this.text.substring(3, 6) + 'wr' + this.foren + this.aftern;
    

    // Data to write
    let data = {
      'AN': this.anStatus,
      'FN': this.fnStatus,
      'audName': this.audname,
      'audid': this.auddept,
      'date': this.findata,
      'dept': this.department,
      'phone': this.credentialForm.controls['text1'].value,
      'reqid': write,
      'status': 0
    }

    this.fire.writeInDatabase('requests/' + write, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });


    this.navCtrl.push(StatusPage);



    if ((this.anStatus == 0) && (this.fnStatus == 0)) {
      console.log('adsjhvdsjg');
    }


  }

  // AN button trigger
  mycolorAn() {

    // Check the Initial state
    if (this.anStatus == 0) {

      // If checked, change it to 1 and set the border color as Green
      document.documentElement.style.setProperty(`--button-clicked-an`, '2px solid  #35AE59');
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
    return new Promise((resolve) => {
      this.fire.readOnce('requests')
        .then((response) => {

          // Flags for AN & FN
          let flagAN = '0';
          let flagFN = '0';

          console.log("Read Once Called");
          let obj = Object.entries(response.val());
          for (var i = 0; i < obj.length; i++) {


            if ((this.audid == obj[i][1].audid) && (this.findata == obj[i][1].date)) {

              if ((String(obj[i][1].status) == '1') || (String(obj[i][1].status) == '2')) {

                if (flagAN == '0')
                  flagAN = obj[i][1].AN;
              }

              if (flagFN == '0') {
                flagFN = obj[i][1].FN;
              }

              if (flagFN == '1' && flagAN == '1') {
                this.statusrec = 1;
                break;
              }

              else {
                this.statusrec = 0
              }

              resolve();
              //break;

            }
            else {

              this.statusrec = 3;
              resolve();
            }

          }
          // console.log(this.statusrec);
          // console.log(flagFN);
          // console.log(flagAN);

          if ((flagAN == '0' && flagFN == '1') || (flagAN == '1' && flagFN == '0')) {
            this.statusrec = 0;
          }

          if (flagFN == '1') {
            this.foren = 0;
          }

          if (flagAN == '1') {
            this.aftern = 0;
          }

        })
        //objects are stored in variable
        //this.audinfo= response. val();
        //  console.log(this.audinfo);

        .catch((error) => {
          console.log(error);
        });
    });
  }

  cal() {

    //passing data to calendar page
    let pop = this.popoverCtrl.create(CalendarPage, { text: this.text, dept: this.department, aud: this.aud });//fromtext: this.fromtext, ftext:this.ftext

    //for terminating previous pages
    let currentindex = this.navCtrl.getActive().index;
    pop.onDidDismiss(() => {
      this.navCtrl.remove(currentindex);
    });

    pop.present();
  }


} 
