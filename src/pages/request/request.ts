import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseServices } from '../../services/fireBaseService';
import { WarningPage } from '../warning/warning';
import { PopoverController } from 'ionic-angular';

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

  reqdata: any;
  display: any;
  present: any = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alerCtrl: AlertController,
    private fire: FirebaseServices,
    public popoverCtrl: PopoverController) {

    // geting data from dashboard page
    this.reqdata = navParams.get('data');

    // from data geting audId from database
    this.reqdata.audID;
    console.log(this.reqdata.audID);

    // here readonce function is to get data from database 
    this.fire.readOnce('requests')
      .then((response) => {
        console.log("Read Once Called");
        let obj = Object.entries(response.val());
        console.log(obj);

        let arr = [];

        // Loop to get all the audid in request from database
        for (var i = 0; i < obj.length; i++) {
          let array = (obj[i][1].audid);
          // console.log(arr);

          // to check audid in dash page and audid in req from db
          if (this.reqdata.audID == array) {

            // to check whether the status is 0 if audid matches
            if (obj[i][1].status == '0') {
              arr.push(obj[i][1]);
              var p = obj[i][1];
              console.log(p);

              this.present = 1;
            }
            else {
              if (this.present == 1) {
                this.present = 1
              }
              else {
                this.present = 0;
              }
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
  doConfirm(redata: any) {

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

            // Change the accepted status as 1
            let path = 'requests/' + redata.reqId + '/status';

            let data = {
              [path]: '1'
            }

            // Get the Selected request info
            let anStatus = redata.AN;
            let fnStatus = redata.FN;
            let dateSelected = redata.date;

            this.fire.updateField(data)
              .then((response) => {

              })
              .catch((error) => {

              });


            // Compare the selected info with other 
            for (var i = 0; i < this.display.length; i++) {

              if (dateSelected == this.display[i].date) {

                if (anStatus == this.display[i].AN || fnStatus == this.display[i].FN) {

                  if (this.display[i].reqId != redata.reqId) {
                    // Set status as 2 for affected requests
                    let path = 'requests/' + this.display[i].reqId + '/status';
                    let data = {
                      [path]: 2
                    }

                    this.fire.updateField(data)
                      .then((response) => {

                        // Reloads after updation   
                        this.navCtrl.push(RequestPage, { data: this.reqdata });

                      })
                      .catch((error) => {
                        // Show Toast Message
                      });
                  }
                }
              }
            }
          }
        }
      ]
    });
    confirm.present()
  }
  cancel(redata: any) {

    const popover = this.popoverCtrl.create(WarningPage, {data: redata});
    popover.present();

    // Disable the popover
    let index = this.navCtrl.getActive().index;
    popover.onDidDismiss(() => {
      this.navCtrl.remove(index);
    })

  }

}
