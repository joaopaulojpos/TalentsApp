import { Component } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import { LottieAnimationViewModule } from 'ng-lottie';
import { MenuPage } from '../menu/menu';
import { ProfissionalService } from '../../providers/profissional/profissional-service';
import { ConfigProvider } from '../../providers/config/config';

@Component({
  selector: 'page-animacao',
  templateUrl: 'animacao.html',
})
export class AnimacaoPage {
  public profissionalAnimacao;
  lottieConfig:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private profissionalservice: ProfissionalService,
              private config: ConfigProvider,
              private toast: ToastController) {
    this.profissionalAnimacao = navParams.get("profissional");
    console.log(this.profissionalAnimacao);
    LottieAnimationViewModule.forRoot();

    this.lottieConfig = {
      path: 'assets/json/animation.json',
      autoplay: true,
      loop: true
    }
  }
  ionViewDidEnter(){

    this.login();
    

  }
  login(){
    this.profissionalservice.login(this.profissionalAnimacao.ds_email , this.profissionalAnimacao.ds_senha).subscribe(data =>{
     const response = (data as any);
     const objeto =JSON.parse(response._body);
     this.profissionalAnimacao = objeto.sucess;
     if(this.profissionalAnimacao != null){
       this.navCtrl.setRoot(MenuPage,{profissional: this.profissionalAnimacao});
       //this.config.setConfigData(false, this.profissionalAnimacao.ds_nome, this.profissionalAnimacao.ds_email);
     }else{
       this.toast.create({ message: 'Erro ao Efetuar Login. Usuário ou Senha inválidos', duration: 2000 }).present(); 
     }
    },error =>{
     console.log(error);
     this.toast.create({ message: 'Erro ao conectar-se ao servidor', duration: 2000 }).present(); 
    } 
   )
  }

}