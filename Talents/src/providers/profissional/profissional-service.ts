import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Profissional } from './profissional';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { ServicosProvider } from '../servicos/servicos';


@Injectable()
export class ProfissionalService {
  public profissionalservice: Profissional;

  constructor(private http: Http,
              private URL: ServicosProvider,
              private angularFireAuth: AngularFireAuth,
              private facebook: Facebook) {
  }

  /*********************************************
   **LOGIN DO PROFISSIONAL COMUNICAÇÃO COM API** 
   ********************************************/
  login(ds_email: string, ds_senha: string) {

    return this.http.get(this.URL.endereco + `profissional/login?login=${ds_email}&senha=${ds_senha}`)
  }
 
  /**************************************************************
   *CADASTRAR PROFISSIONAL INFOMRMAÇÕES BASICAS COMUNICIACAO API*
   * @param profissional***************************************** 
   **************************************************************/
  cadastrar(profissional) {
    console.log(profissional.ds_email);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = JSON.stringify({
      b_foto: "semfoto.jpg",
      ds_senha: profissional.ds_senha,
      dt_nascimento: profissional.dt_nascimento,
      ds_email: profissional.ds_email,
      nr_latitude: profissional.nr_latitude,
      nr_longitude: profissional.nr_longitude,
      tp_conta: "A",
      tp_sexo: profissional.tp_sexo,
      ds_nome: profissional.ds_nome,
      cd_profissional:profissional.cd_profissional
    });
    console.log(body);
    return this.http.post(this.URL.endereco + 'profissional/salvar', body, options)
      .map(res => res.json())      
  }

 /*****************************************
 ****LOGIN DO PROFISSIONAL VIA FACEBOOK****
 ******************************************/  
loginFacebook() {
  return this.facebook.login(['public_profile', 'email'])
    .then((res: FacebookLoginResponse) => {
      return this.angularFireAuth.auth.signInWithCredential(firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken));
    });
}
 /****************************************** 
  **RETORNA CURSOS POR PROFISSIONAL DA API** 
  ******************************************/

 getCursos(cd_profissional : number) {
  console.log(cd_profissional);
  return this.http.get(this.URL.endereco + `profissional/cursos?cd_profissional=${cd_profissional}`)
  
  }
   /****************************************** 
    **RETORNA CARGOS POR PROFISSIONAL DA API** 
    ******************************************/

 getCargos(cd_profissional : number) {
  console.log(cd_profissional);
  return this.http.get(this.URL.endereco + `profissional/cargos?cd_profissional=${cd_profissional}`)
  
  }
    /******************************************* 
     **RETORNA IDIOMAS POR PROFISSIONAL DA API** 
     *******************************************/

 getIdiomas(cd_profissional : number) {
  console.log(cd_profissional);
  return this.http.get(this.URL.endereco + `profissional/idiomas?cd_profissional=${cd_profissional}`)
  
  }
   /************************************************ 
    **RETORNA COMPETENCIAS POR PROFISSIONAL DA API** 
    ************************************************/

 getCompetencias(cd_profissional : number) {
  console.log(cd_profissional);
  return this.http.get(this.URL.endereco + `profissional/competencias_tecnicas?cd_profissional=${cd_profissional}`)
  
  }
}
