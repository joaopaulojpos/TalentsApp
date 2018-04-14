import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { ProfissionalService } from '../../domain/profissional/profissional-service';
import { ProfissionalPage } from '../profissional/profissional';
import { MenuPage } from '../menu/menu';
import { Profissional } from '../../domain/profissional/profissional';
import { ConfigProvider } from '../../providers/config/config';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[ProfissionalService]
})
export class LoginPage {
  public ds_email : string;
  public ds_senha : string;
  public profissional :Profissional;

  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private toast: ToastController,
              private profissionalservice: ProfissionalService,
              private config: ConfigProvider
              ){
  }  
  ionViewDidLoad(){
  }                           
   /**   
    * CHAMADA TELA DE CADASTRO NOVO PROFISSIONAL
    */   
    cadastrarProfissional(){
      this.navCtrl.push(ProfissionalPage);
    }

    /**
    * CHAMADA DO LOGIN PROFISSIONAL
    */   
   login(){
     this.profissionalservice.login(this.ds_email , this.ds_senha).subscribe(data =>{
      const response = (data as any);
      const objeto =JSON.parse(response._body);
      this.profissional = objeto.sucess;
      console.log(this.profissional);
      if(this.profissional != null){
        this.navCtrl.setRoot(MenuPage,{profissional: this.profissional});
        this.config.setConfigData(false, this.profissional._ds_nome, this.profissional._ds_email);
      }else{
        this.toast.create({ message: 'Erro ao Efetuar Login. Usuário ou Senha inválidos', duration: 2000 }).present(); 
      }
     },error =>{
      console.log(error);
      this.toast.create({ message: 'Erro ao conectar-se ao servidor', duration: 2000 }).present(); 
     } 
    )
    /**ALTERADO
     * this.profissionalservice.login(this.ds_email , this.ds_senha)
        .then(profissionalservice=>{
         this.navCtrl.setRoot(MenuPage);
         console.log(this.profissionalservice);
    }).catch(()=>{
      this.toast.create({ message: 'Erro ao Efetuar Login. Usuário ou Senha inválidos', duration: 2000 }).present();
    }); **/
   }
  }