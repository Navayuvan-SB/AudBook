import { Component } from '@angular/core';
import { IonicPage, ToastController, AlertController, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { FirebaseServices } from '../../services/fireBaseService';
import { AngularFireDatabase } from 'angularfire2/database'


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
  profileinfo:any;
  public name: string;
  

  constructor(public fire: FirebaseServices,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public fbAuth: AngularFireAuth,
    public fb: AngularFireModule,
     public fbDatabase    : AngularFireDatabase,
    public toastCtrl: ToastController) {

    this.user = this.fbAuth.auth.currentUser;
    this.firebaseFunctions();


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
            this.oldPwd = data.old;
            this.newPwd = data.new;
            // console.log(data.old);
            // console.log(data.new);


            this.fire.login(this.user.email, this.oldPwd)

              //if login is successful

              .then((response) => {
                //update password if login is successful

                //checking new password characters length for 6

                if (this.newPwd.length >= 6) {

                  this.user.updatePassword(this.newPwd)

                    //if update password is successful

                    .then((response) => {
                      const toastSuccess = this.toastCtrl.create({
                        message: 'Password successfully changed',
                        duration: 3000,

                      });
                      toastSuccess.present();
                      console.log("successfully added!");

                    })
                    .catch(function (error) {
                      console.log("unsuccessful");
                    });
                }
                else {
                  const toastFailure = this.toastCtrl.create({
                    message: 'Password sholud be minimum of 6 characters',
                    duration: 3000,

                  });
                  toastFailure.present();
                }
              })
              .catch((error) => {
                console.log('not successful');
                const toast = this.toastCtrl.create({
                  message: 'Enter the correct password',
                  duration: 3000,
                });
                toast.present();
              });

          }
        }
      ]
    });
    prompt.present();

  }
 
  
     firebaseFunctions() {
     if(this.name !==undefined){
       console.log('dkgjdk');
       return;
     }
    //  this.fire.readOnce('users/' + this.user['uid'])
     else{
       return new Promise((resolve, reject) => {
      this.fbDatabase.database.ref('users/' + this.user['uid'])
      .once("value")
      .then(function(snapshot) {   
         resolve(snapshot.val());
         console.log(snapshot.val().Name);
         console.log(snapshot.val().Phone);
          let profileName=snapshot.val().Name;
          console.log(profileName);
         this.name=snapshot.val().Name;
                
      })
      .catch(function(error){
         reject('Something is wrong');
      });

});
}
     
  }
 
}
