import { Component } from '@angular/core';
import { IonicPage, ToastController, AlertController,LoadingController, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { FirebaseServices } from '../../services/fireBaseService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  //Password checking
  oldPwd: any;
  newPwd: any;

  // getting data using uid
  user: any;
  public name: string;

  //enabling the save button
  profupdate:number=0;
 
  // Loading controller
  loadingCtrl: any;

  //toast controller
  toast:any;

  // user detail form
  detailForm: FormGroup;

  //profile user
  prouser:any;

  constructor(public fire: FirebaseServices,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public fbAuth: AngularFireAuth,
    public fb: AngularFireModule,
    public loading: LoadingController,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder ) {

   

    // Get the user details from status page
    this.user = this.navParams.get('response');

    this.detailForm = this.formBuilder.group({
      name: [this.user['name'], Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])],
      phone: [this.user['phone'], Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])]
    });

     // Toast controller
     this.toast = this.toastCtrl.create({
      duration: 3000
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  changePwd() {      
    const prompt = this.alertCtrl.create({

      inputs: [
        {
          name: 'old',
          placeholder: 'Current password'
        },
        {
          name: 'new',
          placeholder: 'New password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {


            // Local scoped user crdentials
            let user = this.fbAuth.auth.currentUser

            console.log(user.email, data.old);
            // Reauthenticate to check if the old 
            // password entered is correct.
            this.fire.login(user.email, data.old)

              //if login is successful
              .then((response) => {

                //update password if login is successful
                //checking new password characters length for 6
                if (this.newPwd.length >= 6) {

                  user.updatePassword(data.new)

                    //if update password is successful
                    .then((response) => {

                      // Display the toast message
                      this.toast.setMessage("Password changed successfully");
                      this.toast.present();
                    })
                    .catch(function (error) {


                      // Display the toast message
                      this.toast.setMessage("Some problem occured...Please try again later");
                      this.toast.present();
                    });
                }
                else {

                  // Display the toast message
                  this.toast.setMessage("Password should be minimum of 6 characters");
                  this.toast.present();
                }
              })
              .catch((error) => {

                // Display the toast message
                this.toast.setMessage("Enter the correct old password");
                this.toast.present();
              });

          }
        }
      ]
    });
    prompt.present();

  }

  profileUpdate(){
    this.profupdate=1;
    console.log(this.profupdate);
  }

  save(){
      // Toast controller
     this.toast = this.toastCtrl.create({
        duration: 3000
      });


    var name = this.detailForm.controls['name'].value;
    var phone = this.detailForm.controls['phone'].value;

     // Keys
     var nameKey = 'users/' + this.fbAuth.auth.currentUser.uid + '/name';
     var phoneKey = 'users/' + this.fbAuth.auth.currentUser.uid + '/phone';

     var data = {
      [nameKey]: name,
      [phoneKey]: phone,
    };


     // Update the info.
     this.fire.updateField(data)
     .then((response) => {


       // Display the toast
       this.toast.setMessage("user name and phone Updated Successfully...!")
       this.toast.present();

     })
     .catch((error) => {


       // Display the toast
       this.toast.setMessage("Something is wrong. Please try again later...!")
       this.toast.present();

     });


  }
}
