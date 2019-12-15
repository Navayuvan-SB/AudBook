import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController, NavParams, LoadingController } from 'ionic-angular';
import { EditPage } from '../Edit/Edit';
import { CreatePage } from '../create/create';
import { FirebaseServices } from '../../services/fireBaseService';
import { RequestPage } from '../request/request';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  dataret: any;
  loading : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: FirebaseServices, public toastCtrl    : ToastController,  public loadingCtrl  : LoadingController) {

    this.loading = this.loadingCtrl.create({
      content: 'please wait, logging in'
    });

    this.firebaseFunctions();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }
  //variable name to store the objects from data
  firebaseFunctions() {
    this.loading.present();
    this.fire.readOnce('auditorium')
      .then((response) => {
        // this.loading.dismiss();
        console.log("Read Once Called");
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
        this.loading.dismiss();
      })
      .catch((error) => {
        this.loading.dismiss();
        console.log(error);
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



}
    