import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { CadastroProfissionalPage } from '../cadastro-profissional/cadastro-profissional';
import { ServicosProvider } from './../../providers/servicos/servicos';
import {Profissional} from './../../domain/profissional/profissional';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public profissional : Profissional;
  model: Profissional;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private toast: ToastController,
              private servicosProvider: ServicosProvider){

    this.profissional = new Profissional();
  }
   /**
    * CHAMADA TELA DE CADASTRO NOVO PROFISSIONAL
    */   
    cadastrarProfissional(){
      this.navCtrl.push(CadastroProfissionalPage);
    }

    /**
    * CHAMADA DO LOGIN PROFISSIONAL
    */   
    async login() {
      await this.servicosProvider.login
      (this.profissional.ds_email, this.profissional.ds_senha).then(profissional =>{
        //console.log(this.profissional);
        this.navCtrl.setRoot(TabsPage);
      })
      .catch((error)=>{
        console.log(error)
        this.toast.create({ message: 'Erro ao efetuar login Usuario ou Senha Inválidos', duration: 2000 }).present();
      });
    }
  }