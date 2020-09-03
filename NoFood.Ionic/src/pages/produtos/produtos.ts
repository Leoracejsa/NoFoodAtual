import { ProdutoProvider } from './../../providers/produto/produto';
import { ConfigHelper } from './../../app/helpers/configHelper';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaModel } from '../../app/models/categoriaModel';
import { ProdutoModel } from '../../app/models/produtoModel';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  categoriaSelecionada: CategoriaModel = new CategoriaModel();
  produtos : Array<ProdutoModel> = new Array<ProdutoModel>();
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     private produtoSrv: ProdutoProvider) {
  }

  ionViewWillEnter(){
    this.categoriaSelecionada = <CategoriaModel>JSON.parse(localStorage.getItem(ConfigHelper.storageKeys.selectCategory));
    this.load();
  }

  async load(): Promise<void> {
    try {
      let produtosResult = await this.produtoSrv.produtosByCategoriaId(this.categoriaSelecionada._id);
      if(produtosResult.success)
        this.produtos = <Array<ProdutoModel>>produtosResult.data;
    } catch (error) {
      console.log('Problema ao carregar os produtos', error);
      
    }
  }

  quantidadeAlterada(produto: ProdutoModel, evt: number): void {
    console.log(`${produto.nome} - quantidade: ${evt}`);
  }

}
