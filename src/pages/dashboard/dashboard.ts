import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams, LoadingController } from 'ionic-angular';
import { EditPage } from '../Edit/Edit';
import { CreatePage } from '../create/create';
import { FirebaseServices } from '../../services/fireBaseService';
import { RequestPage } from '../request/request';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';


/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  items: any;
  dataret: any;
  loading: any;
  toast: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fire: FirebaseServices,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public afAuth: AngularFireAuth,
    ) {

    // loading
    this.loading = this.loadingCtrl.create({
      content: 'please wait'
    });


    this.toast = this.toastCtrl.create({
      message: 'Some error has occured. Please try agian',
      duration: 2000,
      position: 'bottom'
    });

    this.firebaseFunctions();
    this.doRefresh(event);
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }



  firebaseFunctions() {
 
    // loading control
    this.loading.present();


    // fb function to get dept and aud name from db
    this.fire.readOnce('auditorium')
      .then((response) => {
        // console.log("Read Once Called");
        //objects is stored in var 
        // this.dataret = response;
        let obj = Object.entries(response);

        // Local array to store the array of objects
        let arr = []

        // Loop through the received object
        for (var i = 0; i < obj.length; i++) {
          arr.push(obj[i][1]);
        }

        // Assigining arr to global dataret
        this.dataret = arr;

        // loading dismiss
        this.loading.dismiss();
      })
      .catch((error) => {
        this.loading.dismiss();
        this.toast.setMessage("Some error has occured. Please try again");
        this.toast.present();
        // console.log(error);
      });
  }


  edit(data: any) {
    this.navCtrl.push(EditPage, { data: data });
  }


  create() {
    this.navCtrl.push(CreatePage);
  }


  req(data: any) {
    this.navCtrl.push(RequestPage, { data: data });
  }

  logout() {

    // Present loading
    this.afAuth.auth.signOut()
      .then((response) => {

        // Dismiss loading and set login page as root
        this.navCtrl.setRoot(LoginPage);
      })
      .catch((error) => {

        // Dismiss loading and show error toast message
        this.toast.setMessage("Some error has occured. Please try again");
        this.toast.present();
      });
  }

  doRefresh(refresher: any){

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.dismiss();
    }, 2000);
    
    


 // fb function to get dept and aud name from db
 this.fire.readOnce('auditorium')
 .then((response) => {
   // console.log("Read Once Called");
   //objects is stored in var 
   // this.dataret = response;
   let obj = Object.entries(response);

   // Local array to store the array of objects
   let arr = []

   // Loop through the received object
   for (var i = 0; i < obj.length; i++) {
     arr.push(obj[i][1]);
   }

   // Assigining arr to global dataret
   this.dataret = arr;

   
 })
 .catch((error) => {
  
 });

      
}

}
