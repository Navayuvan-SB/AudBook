import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { FirebaseServices } from '../../services/fireBaseService';
import { WarningPage } from '../warning/warning';
import { PopoverController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the RequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})
export class RequestPage {

  reqdata: any;
  display: any;
  present: any = 0;
  loading: any;
  toast: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alerCtrl: AlertController,
    private fire: FirebaseServices,
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {

    // loading
    this.loading = this.loadingCtrl.create({
      content: 'please wait'
    });


    // toast message
    this.toast = this.toastCtrl.create({
      message: 'Some error has occured. Please try agian',
      duration: 2000,
      position: 'bottom'
    });

    // geting data from dashboard page
    this.reqdata = navParams.get('data');

    // from data geting audId from database
    // console.log(this.reqdata.audID);

    this.readData();
  }

  readData() {

    this.loading.present();

    // here readonce function is to get data from database 
    this.fire.readOnce('requests')
      .then((response) => {

        this.loading.dismiss();
        console.log("Read Once Called");
        let obj = Object.entries(response);
        console.log(obj);

        let arr = [];
        let count = 0;

        // Loop to get all the audid in request from database
        for (var i = 0; i < obj.length; i++) {
          let array = (obj[i][1].audId);

          // to check audid in dash page and audid in req from db
          if (this.reqdata.audID == array) {

            // to check whether the status is 0 if audid matches
            if (obj[i][1].status == '0') {
              arr.push(obj[i][1]);
              var p = obj[i][1];
              console.log(p);

              this.present = 1;
              count = count + 1;
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

        if (count != 0) {
          // to update request count
          let reqcount = 'auditorium/' + this.reqdata.audID + '/requests';
          let data = {
            [reqcount]: count
          }
          this.fire.updateField(data)
            .then((response) => {

            })
            .catch((error) => {

            });
        }
      })
      .catch((error) => {

        this.loading.dismiss();
        console.log(error);
        this.toast.setMessage("Some error has occured. Please try again");
        this.toast.present();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestPage');
  }

  conform(redata) {

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

        // Dismiss loading & Show Toast Message
        this.toast.setMessage("Request accepted successfully...");
        this.toast.present();

        // Reloads after updation   
        this.navCtrl.setRoot(DashboardPage);

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

                  })
                  .catch((error) => {

                  });
              }
            }
          }
        }


      })
      .catch((error) => {

        // Dismiss loading & Show Toast Message
        this.toast.setMessage("Some error has occured. Please try again...");
        this.toast.present();
      });

  }

  // tick popup 
  doConfirm(redata: any) {

    let confirm = this.alerCtrl.create({
      title: 'Are you sure?',
      message: 'Do you conform the to request?',
      buttons: [
        {
          text: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'confirm',
          handler: () => {

            this.conform(redata);

          }
        }
      ]
    });
    confirm.present()
  }
  cancel(redata: any) {

    const popover = this.popoverCtrl.create(WarningPage, { requests: redata, from: 2, data: this.reqdata });
    popover.present();

  }

}
