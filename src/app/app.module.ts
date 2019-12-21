import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { StatusPage } from '../pages/status/status';
import { EditPage } from '../pages/Edit/Edit';
import { CreatePage } from '../pages/create/create';
import { Audi } from '../firebaseconfig';
import { BookNewPage } from '../pages/book-new/book-new';
import { DetailPage } from '../pages/detail/detail';
import { WarningPage } from '../pages/warning/warning';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { RequestPage } from '../pages/request/request';
import { FirebaseServices } from '../services/fireBaseService'
import { CalendarModule } from 'ionic3-calendar-en';
import { ProfilePage } from '../pages/profile/profile';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginPage } from '../pages/login/login';
import { CalendarPage } from '../pages/calendar/calendar';



@NgModule({
  declarations: [
    MyApp,
    StatusPage,
    EditPage,
    CreatePage,
    LoginPage,
    StatusPage,
    BookNewPage,
    DetailPage,
    WarningPage,
    DashboardPage,
    RequestPage,
    CalendarPage,
    ProfilePage,
    
  ],
  imports: [
    BrowserModule,
    CalendarModule,
    IonicModule.forRoot(MyApp, {
      mode: 'md'
    }),
    AngularFireModule.initializeApp(Audi.Auditor)
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StatusPage,
    EditPage,
    CreatePage,
    StatusPage,
    BookNewPage,
    DetailPage,
    WarningPage,
    LoginPage,
    StatusPage,
    DashboardPage,
    RequestPage,
    CalendarPage,
    ProfilePage,
   
  ],
  providers: [
  
    StatusBar,
    SplashScreen,
    FirebaseServices,
    AngularFireAuth,
    AngularFireDatabase,
    AngularFireModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule { }
