import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: FirebaseServices) {
    this.firebaseFunctions();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }
  //variable name to store the objects from data
  firebaseFunctions(){
    this.fire.readOnce('auditorium')
        .then((response) => {
          console.log("Read Once Called");
          //objects is stored in var 
          // this.dataret = response.val();
          let obj = Object.entries(response.val());
          console.log(obj);
        })
        .catch((error) => {
          console.log(error);
        });
  }
  edit(data: any){
    this.navCtrl.push(EditPage,{data: data});
  }

  create(){
    this.navCtrl.push(CreatePage);
  }
  req(data:any) {
    this.navCtrl.push(RequestPage,{data: data});
  }



}
