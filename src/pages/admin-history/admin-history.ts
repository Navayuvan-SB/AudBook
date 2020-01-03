import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, PopoverController, AlertController } from 'ionic-angular';
import { FirebaseServices } from '../../services/fireBaseService';
import { DashboardPage } from '../dashboard/dashboard';



/**
 * Generated class for the AdminHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for mo re info on
 * Ionic pages and navigation.
 */

@IonicPage()
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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fire: FirebaseServices,
    public toast: ToastController,
    public load: LoadingController,
    public alert: AlertController,
  ) {


<<<<<<< HEAD
    // Initializing Toast Controller
    this.toastCtrl = this.toast.create({
      duration: 3000
    });
=======
>>>>>>> cfcebd213a82158289bc0622500e91247bbec26a

    // Initializing Loading Controller
    this.loadingCtrl = this.load.create({
      content: 'Please wait...'
    });

    // Initializing Toast Controller
    this.toastCtrl = this.toast.create({
      duration: 3000
    });


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
    
    this.fire.readOnce('requests')
      .then((response) => {
        console.log("Read Once Called");

        //objects is stored in obj
        // this.dataret = response;
        let obj = Object.entries(response);

<<<<<<< HEAD

        // Local array to store the array of objects
        let undoArr = []
        for (var j = 0; j < obj.length; j++) {
          this.req = obj[j][1]
          console.log(this.req);
          
        }
=======
        // Local array to store the array of objects
        let arr = []
>>>>>>> cfcebd213a82158289bc0622500e91247bbec26a

        // Presenting loading controllSer
        this.loadingCtrl.present();
        let arr = []
        // Loop through the received object
        for (var i = 0; i < obj.length; i++) {


          if (this.finaldate == obj[i][1].date)
            arr.push(obj[i][1]);

        }

        // Assigining arr to global datar
        this.historyInfo = arr; 
        console.log(this.historyInfo);
        // Dismissing the loading controller
        this.loadingCtrl.dismiss();

      })
      .catch((error) => {
        console.log(error);

        // Dismissing the loading controller
        this.loadingCtrl.dismiss();

        // Display the toast
        this.toastCtrl.setMessage("Something went wrong ...please try again");
        this.toastCtrl.present();

      });

  }
<<<<<<< HEAD


  showConfirm(clickedData : any) {
=======
 
  //UNDO confirmation prompt
  showConfirm() {
>>>>>>> cfcebd213a82158289bc0622500e91247bbec26a

    const confirm = this.alert.create({
      title: 'Warning',
      message: 'Do you agree to undo?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            console.log(clickedData);

            if ( clickedData.status == '2') {
            
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
            else if ( clickedData.status == '3'){
            
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
            
            
            else if( clickedData.status == '1'){

              let path = 'requests/' + clickedData.reqId + '/status';
              let data = {
                [path]: '0'
              }
              this.fire.updateField(data)
                .then((response) => {

                })
                .catch((error) => {

                });
              for (var i = 0; i < this.historyInfo.length; i++){
              if (clickedData.date == this.historyInfo[i].date) {

                if (clickedData.AN == this.historyInfo[i].AN || clickedData.AN != this.historyInfo[i].AN 
                  && clickedData.FN == this.historyInfo[i].FN || clickedData.FN != this.historyInfo[i].FN) {
    
                  if (this.historyInfo[i].reqId != clickedData.reqId) {

                    if(this.historyInfo[i].status == 2){
              
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


}
