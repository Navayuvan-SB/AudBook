import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { FirebaseServices } from '../../services/fireBaseService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

credentialForm: FormGroup;

// Loading controller
loadingCtrl: any;

// Toast controller
toastCtrl: any;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private fire: FirebaseServices,
              public loading: LoadingController,
              public toast: ToastController,
              public form: FormBuilder, ) {

   

    // Form Validation
    this.credentialForm = this.form.group({
      name: ['', Validators.compose([
        Validators.required
      ])],
      dept: ['', Validators.compose([
        Validators.required
      ])]
    });

    // Initializing Loading Controller
    this.loadingCtrl = this.loading.create({
      content: 'Please wait...'
    });

    // Initializing Toast Controller
    this.toastCtrl = this.toast.create({
      duration: 3000
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
  }

 
  save(){

    // Presenting loading controller
    this.loadingCtrl.present();

    // Getting the field values
    var dept = this.credentialForm.controls['dept'].value;
    var name = this.credentialForm.controls['name'].value;


    // Condition to check, If the field are empty
    if (dept.trim() == '' || name.trim() == '') {

      // Dismissing the loading controller
      this.loadingCtrl.dismiss();

      // Display the toast
      this.toastCtrl.setMessage("Auditorium Name and Dept should not be empty...!")
      this.toastCtrl.present();

    }

    else {
      
      // AudID Generation
      var audId = name.slice(0, 3) + 'cs' + dept;

      // Data to add
      var data = {
        audID: audId,
        name: name,
        dept: dept,
        requests: 0
      };
 
     this.fire.writeInDatabase('auditorium/' + audId, data)
        .then((response) => {
           // Dismissing the loading controller
           this.loadingCtrl.dismiss();

           // Display the toast
           this.toastCtrl.setMessage("Auditorium name and dept Created Successfully...!")
           this.toastCtrl.present();
        })
        .catch((error) => {
          // Dismissing the loading controller
          this.loadingCtrl.dismiss();

          // Display the toast
          this.toastCtrl.setMessage("Something is wrong. Please try again later...!")
          this.toastCtrl.present();

        });         
    console.log('save button clicked');
    this.navCtrl.push(DashboardPage)
  }
}
}
