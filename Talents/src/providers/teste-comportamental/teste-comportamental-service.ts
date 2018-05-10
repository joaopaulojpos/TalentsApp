import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { ServicosProvider } from '../servicos/servicos';

@Injectable()
export class TesteComportamentalService {
  
  constructor(private http: Http,
              private URL: ServicosProvider,
              public httpC: HttpClient
  ) 
    { }

  getPerguntasAlternativas() {
    console.log(this.URL.endereco + "pergunta_perfil_comp");
    return this.httpC.get(this.URL.endereco + "pergunta_perfil_comp");
  }

  enviarTesteComportamental(cd_pergunta_perfil_comp, cd_alternativa_perfil_comp, cd_profissional) {        
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = JSON.stringify({
      cd_pergunta_perfil_comp: cd_pergunta_perfil_comp,
      cd_alternativa_perfil_comp: cd_alternativa_perfil_comp,
      cd_profissional: cd_profissional
    });       
    this.http.post(this.URL.endereco + 'inserir_resposta', body, options)
      .map(res => {
        res.json()
      }).subscribe(data => console.log(data));
    /*
  .map(res => {
    res.json()
  }).subscribe(data =>
    alert(data)
    ) ;
        */


  }

  gerarCalculoPerfilComp(cd_profissional) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = JSON.stringify({
      cd_profissional: cd_profissional
    });

    this.http.post(this.URL.endereco + 'CalculoPerfilComp', body, options)
      .map(res => {
        res.json()
      }).subscribe(data => console.log(data));

  }
}