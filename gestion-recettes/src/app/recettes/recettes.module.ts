import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecettesPageRoutingModule } from './recettes-routing.module';

import { RecettesPage } from './recettes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecettesPageRoutingModule
  ],
  declarations: [RecettesPage]
})
export class RecettesPageModule {}
