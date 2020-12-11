import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, PopoverController, AlertController } from 'ionic-angular';
import { FirebaseServices } from '../../services/fireBaseService';
import { DashboardPage } from '../dashboard/dashboard';
import { AngularFireDatabase } from 'angularfire2/database';



/**
 * Generated class for the AdminHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for mo re info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-admin-history',
  templateUrl: 'admin-history.html',
})
export class AdminHistoryPage {

  // getting the date from datepicker 
  date: any;

  //getting date acc to our format
  split: any;
  splitDate: any;
  splitMonth: any;
  finaldate: any;

  historyInfo: any;

  // Loading controller
  loadingCtrl: any;

  // Toast controller
  toastCtrl: any;

  req: any;

  // emptyFlag 
  emptyFlag: Boolean = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fire: FirebaseServices,
    public toast: ToastController,
    public load: LoadingController,
    public alert: AlertController,
    public afDatabase: AngularFireDatabase
  ) {


  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminHistoryPage');
  }

  //To get  the date from date picker and to modify the date format
  dateChanged() {

    // to split the date,month,year from currentformat
    this.split = this.date.split("-");

    // converting date from number to string to seperate
    this.splitDate = this.split[2].toString();
    if ((this.splitDate.charAt(0)) == '0') {
      this.splitDate = this.splitDate.charAt(1);
    }

    // converting month from number to string to seperate
    this.splitMonth = this.split[1].toString();
    if ((this.splitMonth.charAt(0)) == '0') {
      this.splitMonth = this.splitMonth.charAt(1);
    }

    //concatenating the date according to our format
    this.finaldate = this.splitDate + "/" + this.splitMonth + "/" + this.split[0];
    console.log(this.finaldate);

    this.firebaseFunctions();
  }


  //variable name to store the objects from data
  firebaseFunctions() {

    // Initializing Loading Controller
    let loadingCtrl = this.load.create({
      content: 'Please wait...'
    });

    // Initializing Toast Controller
    let toastCtrl = this.toast.create({
      duration: 3000
    });


    this.afDatabase.database.ref('requests')
      .on("value", (response) => {
        console.log("Read Once Called");


        //objects is stored in obj
        // this.dataret = response;
        let obj = Object.entries(response.val());


        // Local array to store the array of objects
        let undoArr = []
        for (var j = 0; j < obj.length; j++) {
          this.req = obj[j][1]
          console.log(this.req);

        }

        let arr = []
        // Loop through the received object
        for (var i = 0; i < obj.length; i++) {

          if (this.finaldate == obj[i][1]['date'])
            arr.push(obj[i][1]);

        }

        // Check and update the empty flag
        if (arr.length == 0) {
          this.emptyFlag = true;
        }
        else {
          this.emptyFlag = false;
        }

        // Assigining arr to global datar
        this.historyInfo = this.addAuditoriumImage(arr);



      }, (error) => {

        // Display the toast
        toastCtrl.setMessage("Something went wrong ...please try again");
        toastCtrl.present();
      });

  }


  showConfirm(clickedData: any) {

    const confirm = this.alert.create({
      title: 'Warning',
      message: 'Do you agree to undo?',
      buttons: [
        {
          text: 'No',
          handler: () => {

          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            console.log(clickedData);

            if (clickedData.status == '2') {

              let path = 'requests/' + clickedData.reqId + '/status';
              let data = {
                [path]: '0'
              }
              this.fire.updateField(data)
                .then((response) => {

                })
                .catch((error) => {

                });

            }
            else if (clickedData.status == '3') {

              let path = 'requests/' + clickedData.reqId + '/status';
              let data = {
                [path]: '0'
              }
              this.fire.updateField(data)
                .then((response) => {

                })
                .catch((error) => {

                });

            }


            else if (clickedData.status == '1') {

              let path = 'requests/' + clickedData.reqId + '/status';
              let data = {
                [path]: '0'
              }
              this.fire.updateField(data)
                .then((response) => {

                })
                .catch((error) => {

                });

              for (var i = 0; i < this.historyInfo.length; i++) {
                if (clickedData.date == this.historyInfo[i].date) {

                  if (clickedData.AN == this.historyInfo[i].AN || clickedData.AN != this.historyInfo[i].AN
                    && clickedData.FN == this.historyInfo[i].FN || clickedData.FN != this.historyInfo[i].FN) {

                    if (this.historyInfo[i].reqId != clickedData.reqId) {

                      if (this.historyInfo[i].status == 2) {

                        let path = 'requests/' + this.historyInfo[i].reqId + '/status';
                        let data = {
                          [path]: 0
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
              }
            }

          }

        }
      ]
    });
    confirm.present();
  }

  // Add auditorium image to respective request
  addAuditoriumImage(requests) {

    // Access the auditorium id and add image in the property
    requests.map(element => {

      this.fire.readOnce('auditorium/' + element['audId'] + '/image')
        .then((response) => {
          return element['image'] = response;
        })
        .catch((error) => {

        });

    });

    return requests;

  }

}
