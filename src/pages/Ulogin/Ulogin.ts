import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StatusPage } from '../status/status';
import { FirebaseServices } from '../../services/fireBaseService';

@Component({
  selector: 'page-login',
  templateUrl: 'Ulogin.html'
})
export class UloginPage {

  credentialForm  : FormGroup

  constructor(public navCtrl      : NavController, 
              public navParams    : NavParams,
              public formBuilder  : FormBuilder,
              public fbService    : FirebaseServices,
              public toastCtrl    : ToastController,
              public loadingCtrl  : LoadingController) {

                this.credentialForm = this.formBuilder.group({
                   Email       :  ['', Validators.compose([
                                       Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$'),
                                       Validators.required
                  ])],
                  password      : ['',Validators.compose([
                                    Validators.required,
                                    Validators.minLength(8)
                  ])]
                })
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  navToSignUp(){
    
    this.navCtrl.push(StatusPage);
  }

  signIn(){

    // loading instance
    let loading = this.loadingCtrl.create({
      content: 'please wait, logging in'
    });

    // toast instance
    let toast = this.toastCtrl.create({
      message   : 'Some error has occured. Please try agian',
      duration  : 2000,
      position  : 'bottom'
    });

    var Email = this.credentialForm.controls[' Email'].value;
    var password = this.credentialForm.controls['password'].value;

    loading.present();
    this.fbService.login(Email, password)
              .then((response) => {
                loading.dismiss();
                this.navCtrl.push(StatusPage);
              })
              .catch((error) => {
                // toast.present();
                loading.dismiss();
                if (error.message == "The password is invalid or the user does not have a password."){
                  toast.setMessage("Invalid username or password");
                  toast.present();
                }else{
                  toast.setMessage("Some error has occured. Please try again");
                  toast.present();
                }

              });
    // this.navCtrl.push(StatusPage);
  }

}
