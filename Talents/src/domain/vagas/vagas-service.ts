import { Http,RequestOptions,Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import { Vagas } from './vagas';

@Injectable()
export class VagasService {
  public vagas : Array <{}>; 
  public vaga : Vagas;



  constructor(
    private http: Http
  ) {}

  
  /** 
   * RETORNA VAGAS POR PROFISSIONAL DA API 
  */

  getVagas(cd_profissional : number) {
    return this.http.get(`http://talents.heliohost.org/api/public/api/profissional/vagas?cd_profissional=${cd_profissional}`)
  }

   /** 
   * ENVIA REQUISICAO DA VAGA SELECIONADA PARA API 
  */
 
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
    
    this.http.post('http://localhost/talentsweb/api/public/api/vaga/curtirVaga',body,options)
    .map(res =>{
      res.json()
    }).subscribe(data => console.log(data));

  }
}
