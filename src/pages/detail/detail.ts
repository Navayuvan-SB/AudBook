import { Component, HostBinding } from '@angular/core';
import { IonicPage, AlertController, PopoverController, NavController, NavParams, Platform } from 'ionic-angular';
import { StatusPage } from '../status/status';
import { CalendarPage } from '../calendar/calendar';
import { getParentRenderElement } from '@angular/core/src/view/util';



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
 
  
  data:any;
  data1:string;
  data2:string;
  data3:string;
  data4:number;

  findata:string;

  text:Long;
  text1:Long;

  // fromtext:any='fromtext';
  // fromtext1:string;

  // ftext:any='ftext';
  // ftext1:string;
  
  department:string;
  dept1:string;

  aud:any;

  audname:any;
  auddept:any;

  // value: string= "green";

  // private coloor: string ="#707070";
  

  // public event = {
  //   month: '1990-02-19',
  //   timeStarts: '07:43',
  //   timeEnds: '1990-02-20'
  // }

  // Button check status
  anStatus : number = 0;
  fnStatus : number = 0;

  anpassStatus: any;
  fnpassStatus:any;

  anreceivedStatus: any;
  fnreceivedStatus: any;

  constructor( public popoverCtrl: PopoverController, public alertCtrl: AlertController, public navCtrl: NavController, public platform: Platform, public navParams: NavParams) {

    // this.platform.registerBackButtonAction(() => {
      document.documentElement.style.setProperty(`--button-clicked-an`, '1px solid #000');
      document.documentElement.style.setProperty(`--button-clicked-fn`, '1px solid #000');
    //   console.log("backPressed 1");
    // });


    // getting value from calendar page

    //for getting the date,month,time
    this.data =navParams.get('getdata');

    // for mobile number
    this.text1=navParams.get('text1');

    

    // to time picker
    //this.ftext1=navParams.get('ftext1');
     // this.ftext= this.ftext1;

    //from timepicker
    //this.fromtext1=navParams.get('fromtext1');
     //this.fromtext= this.fromtext1;
   
     //for department
     this.dept1=navParams.get('dept1'); 
    if(this.dept1 == undefined){
      this.department='Department';
    }
    else{
      this.department=this.dept1;
    }


    //for seperating the values from the array of date, time , month 
    this.data1= this.data.date;
    this.data2=this.data.month;
    this.data4=Number(this.data2);
    this.data4=this.data4+1;
    this.data3=this.data.year;
    this.findata= this.data1+' '+'|'+' '+this.data4+' '+'|'+' '+this.data3;
    console.log(this.findata);
    
    //getting aud values of aud from calendar page
    this.aud=navParams.get('aud');
    console.log(this.aud);

   // seperating the values needed from the array
   this.audname=this.aud.name;
    this.auddept=this.aud.dept;

    //getting border status from calendar page
    this.anreceivedStatus=navParams.get('anpassStatus');
    this.fnreceivedStatus=navParams.get('fnpassStatus');
    if(this.anreceivedStatus==1){
      document.documentElement.style.setProperty(`--button-clicked-an`, '1px solid #00ff00');
    }
    if(this.fnreceivedStatus==1){
      document.documentElement.style.setProperty(`--button-clicked-fn`, '1px solid #00ff00')
    }

   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    // document.documentElement.style.setProperty(`--button-clicked-an`, '1px solid #000');
    // document.documentElement.style.setProperty(`--button-clicked-fn`, '1px solid #000');

  }
  ionViewDidEnter() {
    // this.navBar.backButtonClick = () => {
      ///here you can do wathever you want to replace the backbutton event
      // document.documentElement.style.setProperty(`--button-clicked-an`, '1px solid #000');
      // document.documentElement.style.setProperty(`--button-clicked-fn`, '1px solid #000');
    // };
    }
 
  dept(){
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
        this.department= data;
      }
    });
    alert.present();
}

 
 

  // clicking book

  stat()
  {
    let currentindex=this.navCtrl.getActive().index;
    this.navCtrl.push(StatusPage);
    this.navCtrl.remove(currentindex);
    //console.log(this.ftext);
  }

  // AN button trigger
  mycolorAn(){
    
    // Check the Initial state
    if (this.anStatus == 0){

      // If checked, change it to 1 and set the border color as Green
      document.documentElement.style.setProperty(`--button-clicked-an`, '1px solid #00ff00');
      this.anStatus = 1;
      this.anpassStatus=this.anStatus;
    }
    else{

      // If Unchecked, Change it to 0 and set the border as normal
      document.documentElement.style.setProperty(`--button-clicked-an`, '1px solid #000');
      this.anStatus = 0;
  
    }
    
      
   }


   // Fn button trigger
   mycolorFn(){
    
    // Check the Initial state
    if (this.fnStatus == 0){

      // If checked, change it to 1 and set the border color as Green
      document.documentElement.style.setProperty(`--button-clicked-fn`, '1px solid #00ff00');
      this.fnStatus = 1;
      this.fnpassStatus=this.fnStatus;
    }
    else{

      // If Unchecked, Change it to 0 and set the border as normal
      document.documentElement.style.setProperty(`--button-clicked-fn`, '1px solid #000');
      this.fnStatus = 0;
    }
      
   }
   cal(){
   
    //passing data to calendar page
    let pop=this.popoverCtrl.create(CalendarPage,{text:this.text,dept:this.department, aud: this.aud,anpassStatus:this.anpassStatus,fnpassStatus:this.fnpassStatus});//fromtext: this.fromtext, ftext:this.ftext
    
    //for terminating previous pages
    let currentindex=this.navCtrl.getActive().index;
    pop.onDidDismiss(()=>{
      this.navCtrl.remove(currentindex);
    });

    pop.present();
  }

} 
