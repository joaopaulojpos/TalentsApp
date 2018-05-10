import { Http,RequestOptions,Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import { Vagas } from './vagas';
import { ServicosProvider } from '../servicos/servicos';

@Injectable()
export class VagasService {
  
  public vagas : Array <{}>; 
  public vaga : Vagas;

  constructor(
    private http: Http,
    private URL: ServicosProvider
  ) {}
  
  /****************************************** 
  ***RETORNA VAGAS POR PROFISSIONAL DA API*** 
  ******************************************/

  getVagas(cd_profissional : number) {
    console.log(cd_profissional);
    return this.http.get(this.URL.endereco + `profissional/vagas?cd_profissional=${cd_profissional}`)
    
  }

   /************************************************ 
   **ENVIA REQUISICÃO DA VAGA SELECIONADA PARA API** 
   *************************************************/
 
  vagaSelecionada(tp_acao,cd_vaga,cd_profissional){
    let headers = new Headers({
			'Content-Type': 'application/json'
		});
		let options = new RequestOptions({
			headers: headers
		});
		let body = JSON.stringify({
			tp_acao: tp_acao,
      cd_vaga: cd_vaga,
      cd_profissional: cd_profissional
    });
    
    this.http.post(this.URL.endereco + 'vaga/curtirVaga',body,options)
    .map(res =>{
      res.json()
    }).subscribe(data => console.log(data));

  }
}
