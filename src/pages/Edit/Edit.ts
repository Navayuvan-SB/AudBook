import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
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

  credentialForm: FormGroup;
  aud: any;

  // Loading controller
  loadingCtrl: any;

  // Toast controller
  toastCtrl: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private fire: FirebaseServices,
    public form: FormBuilder,
    public loading: LoadingController,
    public toast: ToastController) {

    // Getting the data from source page
    this.aud = this.navParams.get('data');

    // Form Validation
    this.credentialForm = this.form.group({
      name: [this.aud.name, Validators.compose([
        Validators.required
      ])],
      dept: [this.aud.dept, Validators.compose([
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
    console.log('ionViewDidLoad EditPage');
  }

  save() {

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

    } else {
      // Keys
      var deptKey = 'auditorium/' + this.aud.id + '/dept';
      var nameKey = 'auditorium/' + this.aud.id + '/name';

      var data = {
        [deptKey]: this.credentialForm.controls['dept'].value,
        [nameKey]: this.credentialForm.controls['name'].value
      };

      // Update the info.
      this.fire.updateField(data)
        .then((response) => {

          // Dismissing the loading controller
          this.loadingCtrl.dismiss();

          // Display the toast
          this.toastCtrl.setMessage("Auditorium name and dept Updated Successfully...!")
          this.toastCtrl.present();

        })
        .catch((error) => {

          // Dismissing the loading controller
          this.loadingCtrl.dismiss();

          // Display the toast
          this.toastCtrl.setMessage("Something is wrong. Please try again later...!")
          this.toastCtrl.present();

        });
    }

  }
}
