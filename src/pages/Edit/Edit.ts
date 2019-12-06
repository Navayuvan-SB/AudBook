import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { FirebaseServices } from '../../services/fireBaseService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-Edit',
  templateUrl: 'Edit.html',
})
export class EditPage {

  credentialForm  : FormGroup
  aud             : any

  constructor(public navCtrl: NavController, public navParams: NavParams, private fire: FirebaseServices,public form  : FormBuilder) {

    this.credentialForm = this.form.group({
      
      name  : ['',Validators.compose([
        Validators.required
])],
      dept : ['',Validators.compose([
                       Validators.required
      ])]
    })
    this.aud = this.navParams.get('data');
    console.log(this.aud);
  }

  ionViewDidLoad() {                                   
    console.log('ionViewDidLoad EditPage');
    // this.firebaseFunctions();
  }                           


//   firebaseFunctions(){
//  var data = {
//       'auditorium/dept': this.credentialForm.controls['dept'].value,
//       'auditorium/name': this.credentialForm.controls['name'].value

//     };
  //   this.fire.updateField(data)
  //       .then((response) => {
  //         console.log("Update Field Called");
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });

  // }
  save() {
    console.log('save button clicked');
    this.navCtrl.push(DashboardPage)
  }
}
