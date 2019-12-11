import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailPage } from '../detail/detail';


/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',

})
export class CalendarPage {
 public data: any;

 text1:Long;

//  ftext1: string;

//  fromtext1:string;

 dept1:string;

 aud:any;

 currentEvents: any;



  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // getting value from detail page

    //for mobile number
    this.text1=this.navParams.get('text');
    
    //To timepicker
    // this.ftext1=this.navParams.get('ftext');

    //From timepicker
    // this.fromtext1=this.navParams.get('fromtext');
   //console.log(this.ftext1);

   //for department
    this.dept1=this.navParams.get('dept');
    
    //getting value from booknew
    this.aud=this.navParams.get('aud');
    console.log(this.aud);


  //default sample code for calendar module
    this.currentEvents = [
      {
        year: 2017,
        month: 11,
        date: 25
      },
      {
        year: 2017,
        month: 11,
        date: 26
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalendarPage');
  }

  //calendar funtion
 public onDaySelect($event){

  //terminating previous pages
   let currentindex=this.navCtrl.getActive().index;
   //console.log($event);
   let data= $event;

   //pushing data to detail page
   this.navCtrl.push(DetailPage ,{getdata : data,text1:this.text1, dept1:this.dept1,aud :this.aud}).then(()=>{//fromtext1:this.fromtext1, ftext1:this.ftext1,
   this.navCtrl.remove(currentindex);
   });

   //console.log(data);
   //this.text1=this.navParams.get('text'); 
   //console.log(this.text1);
  }

}
