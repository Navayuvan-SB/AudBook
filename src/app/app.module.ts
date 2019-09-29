import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { UloginPage } from '../pages/Ulogin/Ulogin';
import { StatusPage } from '../pages/status/status';
import { EditPage } from '../pages/Edit/Edit';
import { CreatePage } from '../pages/create/create';
import { Audi } from '../firebaseconfig';



import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@NgModule({
  declarations: [
    MyApp,
    UloginPage,
    StatusPage,
    EditPage,
    CreatePage,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(Audi.Auditor)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UloginPage,
    StatusPage,
    EditPage,
    CreatePage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
