import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { FirebaseServices } from '../../services/fireBaseService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
/**
 * Generated class for the CreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

  testRadioOpen: boolean;
  testRadioResult;
  Department: string;
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
    public form: FormBuilder,
    public alert: AlertController,
    public nativePageTransitions: NativePageTransitions) {
    
    this.Department = "Mech";

    // Form Validation
    this.credentialForm = this.form.group({
      name: ['', Validators.compose([
        Validators.required
      ])],
      dept: ['', Validators.compose([
        Validators.required
      ])],
      sCount: ['', Validators.compose([
        Validators.required
      ])]
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePage');
  }

  //Drop-down using alert component
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

    // Initializing Loading Controller
    let loadingCtrl = this.loading.create({
      content: 'Please wait...'
    });

    // Initializing Toast Controller
    let toastCtrl = this.toast.create({
      duration: 3000
    });


    // Presenting loading controller
    loadingCtrl.present();

    // Getting the field values
    var dept = this.Department;
    var name = this.credentialForm.controls['name'].value;
    var sCount = this.credentialForm.controls['sCount'].value;


    // Condition to check, If the field are empty
    if (dept.trim() == '' || name.trim() == '' || sCount.trim() == '') {

      // Dismissing the loading controller
      loadingCtrl.dismiss();

      // Display the toast
      toastCtrl.setMessage("Fill all the fields...")
      toastCtrl.present();

    }
    else if (Number(sCount.trim) > 2000 || Number(sCount.trim) < 50) {

      // Dismissing the loading controller
      loadingCtrl.dismiss();

      // Display the toast
      toastCtrl.setMessage("Seat count should be between 50 and 2000")
      toastCtrl.present();
    }
    else {

      // AudID Generation
      var audId = name.slice(0, 3) + 'cs' + dept;

      // Data to add
      var data = {
        audID: audId,
        name: name,
        dept: dept,
        requests: 0,
        sCount: sCount
      };

      //write in Database
      this.fire.writeInDatabase('auditorium/' + audId, data)
        .then((response) => {

          // Dismissing the loading controller
          loadingCtrl.dismiss();

          // Display the toast
          toastCtrl.setMessage("Auditorium name and dept Created Successfully...!")
          toastCtrl.present();
        })
        .catch((error) => {
          // Dismissing the loading controller
          loadingCtrl.dismiss();

          // Display the toast
          toastCtrl.setMessage("Something is wrong. Please try again later...!")
          toastCtrl.present();

        });
      // console.log('save button clicked');

      // Native slide page transitions
      let options: NativeTransitionOptions = {
        direction: 'left',
        duration: 350,
        slowdownfactor: -1,
        iosdelay: 50
      }

      this.nativePageTransitions.slide(options);
      this.navCtrl.insert(0, DashboardPage);
      this.navCtrl.popToRoot();
    }
  }

}
