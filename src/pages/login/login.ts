import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseServices } from '../../services/fireBaseService';
import { DashboardPage } from '../dashboard/dashboard';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  credentialForm  : FormGroup

  constructor(public navCtrl: NavController,
              public navParams    : NavParams,
              public formBuilder  : FormBuilder,
              public fbService    : FirebaseServices,
              public toastCtrl    : ToastController,
              public loadingCtrl  : LoadingController) {
    
                this.credentialForm = this.formBuilder.group({
                  email   : ['',Validators.compose([
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

    var  email = this.credentialForm.controls['email'].value;
    var password = this.credentialForm.controls['password'].value;

    loading.present();
    this.fbService.filterData(this.fbService.equalTo,'users',null,this.fbService.orderByChild,'email', email)
        .then((response) => {
          // let obj = Object.entries(response.val());
          // let email = obj[0][1].email;
          this.fbService.login(email, password)
              .then((response) => {
                loading.dismiss();
                this.navCtrl.push(DashboardPage);
              })
              .catch((error) => {
                toast.present();
                loading.dismiss();
                if (error.message == "The password is invalid or the user does not have a password."){
                  toast.setMessage("Invalid username or password");
                  toast.present();
                }else{
                  toast.setMessage("Some error has occured. Please try again");
                  toast.present();
                }

              });
          
        })
        .catch((error) =>{
          loading.dismiss();
          toast.setMessage("Some error has occured. Please try again");
          toast.present();
        })
    
  }

}


