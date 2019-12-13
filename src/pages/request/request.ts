import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseServices } from '../../services/fireBaseService';
import { DashboardPage } from '../dashboard/dashboard';
/**
 * Generated class for the RequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})
export class RequestPage {

  reqdata : any;
  display : any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alerCtrl: AlertController,
              private fire: FirebaseServices) {
    
    // geting data from dashboard page
    this.reqdata = navParams.get('data');
    
    // from data geting audId from database
    this.reqdata.audID;
    console.log(this.reqdata.audID);
  
    // here readonce function is to get data from database 
    this.fire.readOnce('requests')
      .then((response) =>{ 
          console.log("Read Once Called");
          let obj = Object.entries(response.val());
          console.log(obj);
          
          let arr = [];

          // Loop to get all the audid in request from database
          for (var i = 0; i < obj.length; i++) {
              let array = (obj[i][1].audid);
              // console.log(arr);
              if (this.reqdata.audID == array){
            
                  if (obj[i][1].status == '0'){
                  arr.push(obj[i][1]);
                   var p = obj[i][1];
                   console.log(p);
              }
          }
         }
         this.display = arr;
    })
    .catch((error) => {
         console.log(error);
    });



  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestPage');
  }

    
  // tick popup 
  doConfirm() {
    let confirm = this.alerCtrl.create({
      title: 'Use this lightsaber?',
      message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present()
  }


}
