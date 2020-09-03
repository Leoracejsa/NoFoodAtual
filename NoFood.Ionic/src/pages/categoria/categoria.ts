import { ConfigHelper } from './../../app/helpers/configHelper';
import { CategoriaProvider } from './../../providers/categoria/categoria';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { CategoriaModel } from '../../app/models/categoriaModel';


@IonicPage()
@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html',
})
export class CategoriaPage {

  categorias: Array<CategoriaModel> = new Array<CategoriaModel>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private categoriaSrv: CategoriaProvider,
    private ActionSheetCtrl: ActionSheetController) {
  }

  ionViewWillEnter(){
    this.load();
  }

  async load(): Promise<void>{
    try {
      let categoriasResult = await this.categoriaSrv.get();
      if(categoriasResult.success)
        this.categorias = <Array<CategoriaModel>>categoriasResult.data;
    } catch (error) {
      console.log('Problema ao carregar as categorias', error);
      
    }
  }

  adminOptions(): void{
    let action = this.ActionSheetCtrl.create({
      title: 'Administração',
      buttons: [
        {text: 'Gerenciar Categorias', handler: () => {this.gerenciarCategoria(); } },
        {text: 'Gerenciar Produtos', handler: () => {this.gerenciarProduto(); } },
        {text: 'Cancelar', handler: () => { }, role: 'destructive' }
      ]
    });
    action.present();
  }

  selecionarProduto(item: CategoriaModel): void {
    localStorage.setItem(ConfigHelper.storageKeys.selectCategory, JSON.stringify(item));
    this.navCtrl.setRoot('ProdutosPage');
  }

  private gerenciarCategoria(): void{
    this.navCtrl.push('AdmCategoriasPage');
  }

  private gerenciarProduto(): void{
    this.navCtrl.push('AdmProdutosPage');
  }

}
