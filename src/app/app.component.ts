
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
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
import {Nav} from 'ionic-angular';
import {ViewChild} from '@angular/core';
 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  condi: any = 0;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private angularFire: AngularFireAuth,
    private fbService: FirebaseServices) {

    platform.ready().then(() => {


      this.angularFire.authState.subscribe(user => {

        if (user) {

          // Get the UID of Logged in user
          let uid = user.uid;

          // get the user type and navigate to according to it.
          this.fbService.readOnce('users/' + uid)
            .then((response) => {

              // Check the user type and navigate to the apt page.
              if (response['type'] == 'user') {

                this.rootPage = StatusPage;
                this.condi = 1
 
              } else if (response['type'] == 'admin') {

                this.rootPage = DashboardPage;
                this.condi = 0

              }
            })
            .catch((error) => {

            });
        }else{
          this.rootPage = LoginPage;
        }
      });
    


      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
  }
  sample(){
    this.nav.setRoot(CreatePage);
  }
}
