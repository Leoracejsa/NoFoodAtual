import { AlertProvider } from './../../providers/alert/alert';
import { ProdutoProvider } from './../../providers/produto/produto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { CameraProvider } from '../../providers/camera/camera';
import { CategoriaProvider } from '../../providers/categoria/categoria';
import { ProdutoModel } from '../../app/models/produtoModel';
import { CategoriaModel } from '../../app/models/categoriaModel';


@IonicPage()
@Component({
  selector: 'page-adm-produto',
  templateUrl: 'adm-produto.html',
})
export class AdmProdutoPage {

  produto: ProdutoModel;
  categorias: Array<CategoriaModel> = new Array<CategoriaModel>();

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public actionSheetCtrl: ActionSheetController,
     public platform: Platform,
     private cameraSrv: CameraProvider,
     private categoriaSrv: CategoriaProvider,
     private produtoSrv: ProdutoProvider,
     private alertSrv: AlertProvider) {

      let _prod = this.navParams.get('_produto')
      if(_prod && _prod._id){
        this.produto = <ProdutoModel>_prod;
        this.produto.categoriaId = _prod.categoriaId._id;
      }else
        this.produto = new ProdutoModel();

        this.loadData();
  }

  async loadData(): Promise<void>{
    try {
      let categoriasResul = await this.categoriaSrv.get();
      if(categoriasResul.success){
        this.categorias = <Array<CategoriaModel>>categoriasResul.data;
      }
    } catch (error) {
      console.log('Erro ao carregar as categorias', error);
    }
  }

  async excluir(): Promise<void>{
    try {
      this.alertSrv.confirm('Excluir', `Deseja realmente excluir o produto ${this.produto.nome}?`, async () =>{
        let excluirResult = await this.produtoSrv.delete(this.produto._id);
        if(excluirResult.success){
          this.alertSrv.toast('Produto excluído com sucesso', 'bottom');
          this.navCtrl.setRoot('AdmProdutosPage');
        }
        
      });
      
    } catch (error) {
      console.log('Erro ao excluir', error);
    }

  }

  async salvar(): Promise<void>{
    let sucesso = false;
    if(this.produto._id){
      let cadastroResult = await this.produtoSrv.post(this.produto);
      sucesso = cadastroResult.success;
    }else{
      let updateResult = await this.produtoSrv.put(this.produto._id, this.produto);
      sucesso = updateResult.success;
    }
    if(sucesso){
      this.alertSrv.toast('Produto salvo com sucesso!', 'bottom');
      this.navCtrl.setRoot('AdmProdutosPage');
    }
  }

    getPictureOptions(): void {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Adicionar Foto',
        buttons: [
          {
            text: 'Tirar Foto', handler: () => {
              this.cameraSrv.takePicture(photo => {
                this.produto.foto = photo;
              });
            }, icon: this.platform.is('ios') ? null : 'camera'
          },
          {
            text: 'Pegar na Galeria',
            handler: (()=> {
              this.cameraSrv.getPictureFromGallery(photo => {
                this.produto.foto = photo;
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
