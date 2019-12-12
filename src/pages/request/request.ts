import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseServices } from '../../services/fireBaseService';
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

  // reqdata: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alerCtrl: AlertController,
    private fire: FirebaseServices) {
    
    //geting data from dashboard page
    // this.reqdata = this.navParams.get('data');

    //from data geting audId from database
    //this.reqdata.audid;
    // console.log(this.reqdata);
    
    this.fire.readOnce('requests')
      .then((response) =>{ 
        console.log("Read Once Called");
        // objects is stored in var 
        // this.reqdata = response.val(); 
        let obj = Object.entries(response.val());
        console.log(obj);
        // Local array to store the array of objects
          let arr = [];
        // Loop through the received object
           for (var i = 0; i < obj.length; i++) {
           arr.push(obj[i][1]);
         }
        // Assigining arr to global dataret
        //  this.reqdata = arr;
        console.log(arr);
        // console.log(this.reqdata);

      })
      .catch((error) => {
        console.log(error);
      });

      var reqdata = this.navParams.get('data');
      console.log(reqdata);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestPage');
  }

  
    // this.fire.readOnce('requests')
    //   .then((response) => { 
    //     console.log("Read Once Called");
    //     //objects is stored in var 
    //     this.reqdata = response.val();
    //     let obj = Object.entries(response.val());
    //     console.log(obj);
    //     // Local array to store the array of objects
    //       let arr = []

    //     // Loop through the received object
    //        for (var i = 0; i < obj.length; i++) {
    //        arr.push(obj[i][1]);
    //      }

    //     // Assigining arr to global dataret
    //     //  this.reqdata = arr;
    //     console.log(arr);
    //     console.log(this.reqdata);

    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  

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
