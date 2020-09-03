import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriaPage } from './categoria';

@NgModule({
  declarations: [
    CategoriaPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(CategoriaPage),
  ],
})
export class CategoriaPageModule {}
