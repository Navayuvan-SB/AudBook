import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPage } from './Edit';
import { FirebaseServices } from '../../services/fireBaseService';

@NgModule({
  declarations: [
    EditPage,
  ],
  imports: [
    IonicPageModule.forChild(EditPage),
  ],
})
export class EditPageModule {}
