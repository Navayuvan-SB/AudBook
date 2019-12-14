import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, PopoverController } from 'ionic-angular';
import { BookNewPage } from '../book-new/book-new';
import { WarningPage } from '../warning/warning';
import { FirebaseServices } from '../../services/fireBaseService';

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
  UserID: any= 'user01';

  constructor(
      public alertctrl: AlertController, 
      public navCtrl: NavController,
      public navParams: NavParams,
      public popoverCtrl: PopoverController,
      private fire: FirebaseServices,
      ) {

        this.firebaseFunctions();
        

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');
  }

  //variable name to store the objects from data
  firebaseFunctions() {
    this.fire.readOnce('requests')
      .then((response) => {
        console.log("Read Once Called");
        //objects is stored in obj
        // this.dataret = response.val();
        let obj = Object.entries(response.val());

        // Local array to store the array of objects
        let arr = []
      
        // Loop through the received object
        for (var i = 0; i < obj.length; i++) {

        //condition to compare the IDs to display the Status
        if(this.UserID == obj[i][1].userId){
          arr.push(obj[i][1]);
          
      }
        }
        // Assigining arr to global datar
        this.statusinfo = arr;

        console.log(this.statusinfo); 

      })
      .catch((error) => {
        console.log(error);
      });
      
  } 

  alert(ramya:any){
    console.log(ramya);
    const popover= this.popoverCtrl.create(WarningPage);
    popover.present();  


 
  }
  
  next1(){
    this.navCtrl.push(BookNewPage);
  }
  
}
