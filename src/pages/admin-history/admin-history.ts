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

  

  date: any;
  
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


  dateChanged(){

    if (this.date){
      this.firebaseFunctions();
    }
    }
    

  //variable name to store the objects from data
  firebaseFunctions() {
    
    this.fire.readOnce('requests')
      .then((response) => {
        console.log("Read Once Called");

        //objects is stored in obj
        // this.dataret = response;
        let obj = Object.entries(response);


        // Local array to store the array of objects
        let undoArr = []
        for (var j = 0; j < obj.length; j++) {
          this.req = obj[j][1]
          console.log(this.req);
          
        }

        // Presenting loading controllSer
        this.loadingCtrl.present();
        let arr = []
        // Loop through the received object
        for (var i = 0; i < obj.length; i++) {


          if (this.dateChanged== obj[i][1].date)
            arr.push(obj[i][1]);
console.log(this.date);
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


  showConfirm(clickedData : any) {

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
                    console.log("======================dbhjsdbh=======sdh")
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
