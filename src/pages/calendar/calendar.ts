import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { FirebaseServices } from '../../services/fireBaseService';



/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',

})
export class CalendarPage {
  public data: any;

  passMobileNum: Long;

  purpose1: string;

  //  ftext1: string;

  //  fromtext1:string;

  dept1: string;

  aud: any;

  currentEvents: any = [];

  firebaseResponse: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fire: FirebaseServices) {
    // getting value from detail page

    //for mobile number
    this.passMobileNum = this.navParams.get('mobileNum');

    //for purpose
    this.purpose1 = this.navParams.get('purpose');
    console.log(this.purpose1);


    this.firebaseResponse = this.navParams.get('data');
    console.log(this.firebaseResponse);

    //To timepicker
    // this.ftext1=this.navParams.get('ftext');

    //From timepicker
    // this.fromtext1=this.navParams.get('fromtext');
    //console.log(this.ftext1);

    //for department
    this.dept1 = this.navParams.get('dept');

    // getting value from booknew
    this.aud = this.navParams.get('aud');
    console.log(this.aud);

    let arr = []
    // default sample code for calendar module
    let statusrec = 0;

    // Flags for AN & FN
    let flagAN = '0';
    let flagFN = '0';
    let core = '0';

    let obj = Object.entries(this.firebaseResponse);
    for (var i = 0; i < obj.length; i++) {

      var date = String(obj[i][1]['date']);
      var splitedDate = date.split('/');

      if ((this.aud['audID'] == obj[i][1]['audId'])) {

        core = '1';

        if ((obj[i][1]['status'] == '1') || (obj[i][1]['status'] == '0')) {

          if (flagAN == '0') {
            flagAN = obj[i][1]['AN'];
          }

          if (flagFN == '0') {
            flagFN = obj[i][1]['FN'];
          }

          if (flagFN == '1' && flagAN == '1') {
            statusrec = 1;
            this.currentEvents.push({
              year: Number(splitedDate[2]),
              month: Number(splitedDate[1]) - 1,
              date: Number(splitedDate[0])
            });

          }

        }

      }

      if (statusrec == 1) {
        break;
      }

    }

    console.log(this.currentEvents);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

  //calendar funtion
  public onDaySelect($event) {

    //terminating previous pages
    let currentindex = this.navCtrl.getActive().index;
    //console.log($event);
    let data = $event;

    //pushing data to detail page
    this.navCtrl.push(DetailPage, { getdata: data, passMobileNum: this.passMobileNum, dept1: this.dept1, aud: this.aud, purpose1: this.purpose1 }).then(() => {//fromtext1:this.fromtext1, ftext1:this.ftext1,
      this.navCtrl.remove(currentindex);
    });

    // console.log(data);
    // this.text1=this.navParams.get('text'); 
    // console.log(this.text1);
  }

}
