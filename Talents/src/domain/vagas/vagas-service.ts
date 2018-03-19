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
   * RETORNA VAGAS DA API 
  */

  getVagas() {
  return this.http.get('http://localhost/talentsweb/api/public/api/vagas');
  /*(.map(res => res.json())
    .subscribe(data =>{
      this.vagas = data;
      console.log(this.vagas);
    }); */
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
    console.log(tp_acao);
    this.http.post('http://localhost/talentsweb/api/public/api/vaga/curtirVaga',body,options)
    .map(res =>{
      res.json()
    }).subscribe(data => console.log(data));

  }
}
