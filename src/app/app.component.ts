
import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusPage } from '../pages/status/status';
import { EditPage } from '../pages/Edit/Edit';
import { CreatePage } from '../pages/create/create';
import { Audi } from '../firebaseconfig';
import { BookNewPage } from '../pages/book-new/book-new';
import { DetailPage } from '../pages/detail/detail';
import { WarningPage } from '../pages/warning/warning';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { RequestPage } from '../pages/request/request';
import { LoginPage } from '../pages/login/login';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseServices } from '../services/fireBaseService';
import { Nav } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams, LoadingController } from 'ionic-angular';
import { AdminHistoryPage } from '../pages/admin-history/admin-history';
import { ProfilePage } from '../pages/profile/profile';





@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  loading: any;
  toast: any;
  pages: Array<{ title: string, component: any, icon: string, color: string }>

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private angularFire: AngularFireAuth,
    private fbService: FirebaseServices,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public fire: FirebaseServices) {



    platform.ready().then(() => {

      this.angularFire.authState.subscribe(user => {

        if (user) {

          // Get the UID of Logged user
          let uid = user.uid;

          // get the user type and navigate according to it.
          this.fbService.readOnce('users/' + uid)
            .then((response) => {

              // Check the user type and navigate to the apt page.
              if (response['type'] == 'user') {

                this.rootPage = StatusPage;
                this.pages = [
                  { title: 'Status', component: StatusPage, icon: "logo-buffer", color: '' }
                ]

              }
              else if (response['type'] == 'admin') {

                this.rootPage = DashboardPage;

                this.pages = [
                  { title: 'History', component: AdminHistoryPage, icon: "time", color: '' },
                ]
              }
            })
            .catch((error) => {

            });
        }

        else {
          this.rootPage = LoginPage;
        }
      });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }


  //navigation to pages
  navPages(pages) {
    this.nav.setRoot(pages.component);
  }


  // logout for both user and admin
  logout() {

    // loading  
    let loading = this.loadingCtrl.create({
      content: 'please wait'
    });

    // toast
    let toast = this.toastCtrl.create({
      message: 'Some error has occured. Please try agian',
      duration: 2000,
      position: 'bottom'
    });

    // Conformation alert
    let alert = this.alertCtrl.create({
      title: 'Oops..!',
      message: 'Are you sure want to logout?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Yes',
          handler: data => {

            // show loading
            loading.present();

            // Present loading
            this.afAuth.auth.signOut()
              .then((response) => {

                loading.dismiss();

                // Dismiss loading and set login page as root
                this.nav.setRoot(LoginPage);
              })
              .catch((error) => {

                loading.dismiss();

                // Dismiss loading and show error toast message
                this.toast.setMessage("Some error has occured. Please try again");
                this.toast.present();
              });
          }
        }
      ]
    });

    alert.present();
  }

  // navigate to profile page
  navToProfile() {
    let user = this.afAuth.auth.currentUser;
    this.fire.readOnce('users/' + user['uid'])
      .then((response) => {
        this.nav.setRoot(ProfilePage, { response: response });
      });
  }

}
