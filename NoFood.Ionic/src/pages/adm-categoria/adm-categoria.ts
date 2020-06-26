import { HttpResultModel } from './../../app/models/HttpResultModel';
import { AlertProvider } from './../../providers/alert/alert';
import { CategoriaProvider } from './../../providers/categoria/categoria';
import { CameraProvider } from './../../providers/camera/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { CategoriaModel } from '../../app/models/categoriaModel';

@IonicPage()
@Component({
  selector: 'page-adm-categoria',
  templateUrl: 'adm-categoria.html',
})
export class AdmCategoriaPage {

  categoria: CategoriaModel;

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public actionSheetCtrl: ActionSheetController,
     public platform: Platform,
     private cameraSrv: CameraProvider,
     private categoriaSrv: CategoriaProvider,
     private alertSrv: AlertProvider) {

      let _categ = this.navParams.get('_categoria')
      if(_categ)
        this.categoria = <CategoriaModel>_categ;
      else
        this.categoria = new CategoriaModel();
  }

  async salvar(): Promise<void>{
    let sucesso = false;
    if(this.categoria._id){
      let cadastroResult = await this.categoriaSrv.post(this.categoria);
      sucesso = cadastroResult.success;
    }else{
      let updateResult = await this.categoriaSrv.put(this.categoria._id, this.categoria);
      sucesso = updateResult.success;
    }
    if(sucesso){
      this.alertSrv.toast('Categoria salva com sucesso!', 'bottom');
      this.navCtrl.setRoot('AdmCategoriasPage');
    }
  }

    getPictureOptions(): void {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Adicionar Foto',
        buttons: [
          {
            text: 'Tirar Foto', handler: () => {
              this.cameraSrv.takePicture(photo => {
                this.categoria.foto = photo;
              });
            }, icon: this.platform.is('ios') ? null : 'camera'
          },
          {
            text: 'Pegar na Galeria',
            handler: (()=> {
              this.cameraSrv.getPictureFromGallery(photo => {
                this.categoria.foto = photo;
              });
            }),
            icon: this.platform.is('ios') ? null : 'images'
          },
          {
            text: 'Cancelar',
            role: 'destructive',
            icon: this.platform.is('ios')? null : 'close',
            handler: () => {

            }
          }
        ]
      });

      actionSheet.present();
    }  

}
