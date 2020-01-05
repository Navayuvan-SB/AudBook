import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams, LoadingController } from 'ionic-angular';
import { EditPage } from '../Edit/Edit';
import { CreatePage } from '../create/create';
import { FirebaseServices } from '../../services/fireBaseService';
import { RequestPage } from '../request/request';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


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
    public afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth,
  ) {


    this.firebaseFunctions();

    this.updateCount();

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }



  firebaseFunctions() {

    // loading
    let loading = this.loadingCtrl.create({
      content: 'please wait'
    });


    let toast = this.toastCtrl.create({
      message: 'Some error has occured. Please try agian',
      duration: 2000,
      position: 'bottom'
    });

    // loading control
    loading.present();


    // fb function to get dept and aud name from db
    this.afDatabase.database.ref('auditorium')
      .on('value', response => {

        //objects is stored in var 
        let obj = Object.entries(response.val());

        // Local array to store the array of objects
        let arr = []

        // Loop through the received object
        for (var i = 0; i < obj.length; i++) {
          arr.push(obj[i][1]);
        }

        // Assigining arr to global dataret
        this.dataret = arr;

        // loading dismiss
        loading.dismiss();
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

  // doRefresh(refresher: any){

  //   setTimeout(() => {
  //     console.log('Async operation has ended');
  //     refresher.dismiss();
  //   }, 2000);


  updateCount() {

    this.fire.readOnce('auditorium')
      .then((response) => {

        let auds = Object.entries(response);

        console.log(auds);

        auds.forEach((element) => {

          // here readonce function is to get data from database 
          this.fire.readOnce('requests')
            .then((response) => {

              let obj = Object.entries(response);

              let count = 0;

              // Loop to get all the audid in request from database
              for (var i = 0; i < obj.length; i++) {
                let array = (obj[i][1].audId);

                // to check audid in dash page and audid in req from db
                if (element[1].audID == array) {

                  // to check whether the status is 0 if audid matches
                  if (obj[i][1].status == '0') {

                    count = count + 1;

                  }

                }
              }

              // to update request count
              let reqcount = 'auditorium/' + element[1].audID + '/requests';
              let data = {
                [reqcount]: count
              }
              this.fire.updateField(data)
                .then((response) => {

                })
                .catch((error) => {

                  // show toast message
                  let toast = this.toastCtrl.create({
                    duration: 3000
                  });

                  toast.setMessage("Some error has occured. Please try again");
                  toast.present();
                });

            })
            .catch((error) => {

              // show toast message
              let toast = this.toastCtrl.create({
                duration: 3000
              });

              toast.setMessage("Some error has occured. Please try again");
              toast.present();

            });

        });

      })
      .catch((error) => {

        // show toast message
        let toast = this.toastCtrl.create({
          duration: 3000
        });

        toast.setMessage("Some error has occured. Please try again");
        toast.present();
      });
  }

}     
