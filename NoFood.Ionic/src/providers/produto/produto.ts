import { HttpResultModel } from './../../app/models/HttpResultModel';
import { ProdutoModel } from './../../app/models/produtoModel';
import { Injectable } from '@angular/core';
import { ProviderBase } from '../../app/base/providerBase';
import { ConfigHelper } from '../../app/helpers/configHelper';
import { HttpProvider } from '../http/http';

@Injectable()
export class ProdutoProvider extends ProviderBase<ProdutoModel>{

  url: string = `${ConfigHelper.Url}produto`;

  constructor(public http: HttpProvider) {
    super(`${ConfigHelper.Url}produto`, http);
  }

  async produtosByCategoriaId(id: string): Promise<HttpResultModel>{
    return await this.http.get(`${this.url}/categoria/${id}`);
  }

}
