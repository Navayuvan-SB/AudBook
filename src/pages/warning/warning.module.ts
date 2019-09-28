import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WarningPage } from './warning';

@NgModule({
  declarations: [
    WarningPage,
  ],
  imports: [
    IonicPageModule.forChild(WarningPage),
  ],
})
export class WarningPageModule {}
