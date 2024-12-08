import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjouterModifierPageRoutingModule } from './ajouter-modifier-routing.module';

import { AjouterModifierPage } from './ajouter-modifier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjouterModifierPageRoutingModule
  ],
  declarations: [AjouterModifierPage]
})
export class AjouterModifierPageModule {}
