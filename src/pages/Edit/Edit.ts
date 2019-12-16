import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
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

  testRadioOpen: boolean;
  testRadioResult;
  Department: string;
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
              public toast: ToastController,
              public alert: AlertController ) {

    // Getting the data from source page
    this.aud = this.navParams.get('data');

    // Form Validation
    this.credentialForm = this.form.group({
      name: [this.aud.name, Validators.compose([
        Validators.required
      ])]
    });

    
    this.Department = this.aud.dept;

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

  // Drop-down using alert component
  Dept() {
    let alert = this.alert.create();
    alert.setTitle('Departments');

    alert.addInput({
      type: 'radio',
      label: 'Mech',
      value: 'Mech',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'IT',
      value: 'IT'
    });

    alert.addInput({
      type: 'radio',
      label: 'Cse',
      value: 'CSE'
    });

    alert.addInput({
      type: 'radio',
      label: 'Civil',
      value: 'Civil'
    });

    alert.addInput({
      type: 'radio',
      label: 'ECE',
      value: 'ECE'
    });

    alert.addInput({
      type: 'radio',
      label: 'EEE',
      value: 'EEE'
    });

    alert.addInput({
      type: 'radio',
      label: 'BME',
      value: 'BME'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
        this.Department = data;
      }
    });

    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }


  // Saving process of edit page
  save() {

    // Presenting loading controller
    this.loadingCtrl.present();

    // Getting the field values
    var dept = this.Department;
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
          [deptKey]: dept,
          [nameKey]: name
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

        // console.log('save button clicked');
        this.navCtrl.push(DashboardPage)
    }

  }
}
