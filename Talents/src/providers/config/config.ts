import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Profissional } from '../../providers/profissional/profissional';
import { Firebase } from '@ionic-native/firebase';

//let config_key_name = "config";

@Injectable()
export class ConfigProvider {

  constructor(public storage: Storage,
              private firebase: Firebase)
              {}


  // setando uma seção e passando o tipo de usuário
  create(profissional: Profissional) {
    this.storage.set('profissional', profissional);
    //this.firebase.onTokenRefresh().subscribe((token: string) => console.log('Um novo token foi gerado ${token}'));
  }

  get(): Promise<any> {
   // this.firebase.getToken()
     // .then(token => console.log('O token é ${token}'))
      //.catch(error => console.error('Erro ao pegar token', error));
    
    return this.storage.get('profissional');
  }

  // Quando deslogar deve remova do storage
  remove() {
      this.storage.remove('profissional');
  }

  exist() {
      this.get().then(res => {
          console.log('resultado >>> ', res);
          if(res) {
              console.log('resultado IF');
              return true;
          } else {
              console.log('resultado else');
              return false;
          }
      });
  }

  //recupera os Dados do localtorage
  // getConfigData(): any{
  //   return localStorage.getItem(config_key_name);
  // }

  // //grava os Dados do localstorage
  // setConfigData(showLogin?: boolean, name?: string, userName?: string){
  //   let config = {
  //     showLogin: false,
  //     name: "",
  //     userName: ""
  //   };

  //   if(showLogin){
  //     config.showLogin = showLogin;
  //   }
  //   if(name){
  //     config.name = name;
  //   }
  //   if(userName){
  //     config.userName = userName;
  //   }
  //   localStorage.setItem(config_key_name, JSON.stringify(config));
  // }

}