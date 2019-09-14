import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookNewPage } from './book-new';

@NgModule({
  declarations: [
    BookNewPage,
  ],
  imports: [
    IonicPageModule.forChild(BookNewPage),
  ],
})
export class BookNewPageModule {}
