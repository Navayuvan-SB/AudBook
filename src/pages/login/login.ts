import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseServices } from '../../services/fireBaseService';
import { DashboardPage } from '../dashboard/dashboard';
import { StatusPage } from '../status/status';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  credentialForm: FormGroup

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public fbService: FirebaseServices,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {

    this.credentialForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$'),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])]
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  signIn() {

    // loading instance
    let loading = this.loadingCtrl.create({
      content: 'please wait, logging in'
    });

    // toast instance
    let toast = this.toastCtrl.create({
      message: 'Some error has occured. Please try agian',
      duration: 2000,
      position: 'bottom'
    });

    var email = this.credentialForm.controls['email'].value;
    var password = this.credentialForm.controls['password'].value;

    loading.present();
    this.fbService.login(email, password)
      .then((response) => {
        loading.dismiss();

        // Get the UID of Logged in user
        let uid = response.uid;

        // get the user type and navigate to according to it.
        this.fbService.readOnce('users/' + uid)
        .then((response) => {

          // Check the user type and navigate to the apt page.
          if (response.type == 'user'){

            this.navCtrl.push(StatusPage);

          }else if (response.type == 'admin'){

            this.navCtrl.push(DashboardPage);

          }
        })
        .catch((error) => {

        });

      })
      .catch((error) => {
        toast.present();
        loading.dismiss();
        if (error.message == "The password is invalid or the user does not have a password.") {
          toast.setMessage("Invalid username or password");
          toast.present();
        } else {
          toast.setMessage("Some error has occured. Please try again");
          toast.present();
        }

      });

  }

}


