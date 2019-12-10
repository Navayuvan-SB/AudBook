import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { CalendarPage } from '../calendar/calendar';
import { FirebaseServices } from '../../services/fireBaseService';

/**
 * Generated class for the BookNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */ 

@IonicPage()
@Component({
  selector: 'page-book-new',
  templateUrl: 'book-new.html',
})
export class BookNewPage {
 audinfo : any;
 

  constructor(public fire : FirebaseServices,public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
    this.firebaseFunctions();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookNewPage');
  }
next(){
  this.navCtrl.push(DetailPage);
}
calendar( aud: any){
  
  const popover= this.popoverCtrl.create(CalendarPage,{aud:aud});
  
    
  popover.present();  
}


firebaseFunctions(){
  this.fire.readOnce('auditorium')
        .then((response) => {
          console.log("Read Once Called");
          let obj = Object.entries(response. val());
          //local array to store array of objects
          let arr=[]
          //loop through the received object
          for(var i=0;i <obj.length; i++){
            arr.push(obj[i][1]);
          }
          //assigning arr to global audinfo
          this.audinfo = arr;

        //objects are stored in variable
        //this.audinfo= response. val();
        //  console.log(this.audinfo);
        })
        .catch((error) => {
          console.log(error);
        });
       } 
 
}
