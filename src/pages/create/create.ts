import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { FirebaseServices } from '../../services/fireBaseService';
/**
 * Generated class for the CreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: FirebaseServices ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
    // this.firebaseFunctions();
  }

  // firebaseFunctions(){
  //    fetch("/assets/data/auditorium.json")
  //                     .then(response => response.json())
  //                     .then(json => {
  //                       this.fire.writeInDatabase('auditorium', json)
  //                           .then((response)=> {
  //                             console.log("Fetched from Local and Updated in DB");
  //                           })
  //                           .catch((error) => {
  //                             console.log("Database Updation Failed");
  //                           })
  //                       this. = json;
  //                     }); 
    
  // }
  save(){
    console.log('save button clicked');
    this.navCtrl.push(DashboardPage)
  }
}
