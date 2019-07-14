import { CardComponent } from './../shared/card/card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {SharedModule} from './../shared/shared.module'
import { IonicModule } from '@ionic/angular';

import { CardDetailPage } from './card-detail.page';
const routes: Routes = [
  {
    path: '',
    component: CardDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CardDetailPage]
})
export class CardDetailPageModule {
  
}
