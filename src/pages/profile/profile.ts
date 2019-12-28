import { Component } from '@angular/core';
import { IonicPage, ToastController, AlertController, NavController, NavParams } from 'ionic-angular';
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

  // user detail form
  detailForm: FormGroup;


  constructor(public fire: FirebaseServices,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public fbAuth: AngularFireAuth,
    public fb: AngularFireModule,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder ) {

    // Toast controller
    let toast = this.toastCtrl.create({
      duration: 3000
    });

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

            // Toast controller
            let toast = this.toastCtrl.create({
              duration: 3000
            });

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
                      toast.setMessage("Password changed successfully");
                      toast.present();
                    })
                    .catch(function (error) {


                      // Display the toast message
                      toast.setMessage("Some problem occured...Please try again later");
                      toast.present();
                    });
                }
                else {

                  // Display the toast message
                  toast.setMessage("Password should be minimum of 6 characters");
                  toast.present();
                }
              })
              .catch((error) => {

                // Display the toast message
                toast.setMessage("Enter the correct old password");
                toast.present();
              });

          }
        }
      ]
    });
    prompt.present();

  }
}
