import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Profissional } from './profissional';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class ProfissionalService {

  private API = "http://localhost/talentsweb/api/public/api/profissional/";
  public profissionalservice: Profissional;

  constructor(private http: Http,
              private angularFireAuth: AngularFireAuth,
              private facebook: Facebook) {
  }

  /*********************************************
   **LOGIN DO PROFISSIONAL COMUNICAÇÃO COM API** 
   ********************************************/
  login(ds_email: string, ds_senha: string) {

    return this.http.get(this.API+`login?login=${ds_email}&senha=${ds_senha}`)
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
      nr_latitude: profissional.nr_latitude || -8.1721658,
      nr_longitude: profissional.nr_longitude || -34.9986835,
      tp_conta: "A",
      tp_sexo: profissional.tp_sexo,
      ds_nome: profissional.ds_nome
    });
    console.log(body);
    return this.http.post(this.API+'salvar', body, options)
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
  
}
