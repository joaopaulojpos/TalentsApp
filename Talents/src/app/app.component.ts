import { Component } from '@angular/core';
import { Platform, AlertController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { ConfigProvider } from '../providers/config/config';
import { FCM } from '@ionic-native/fcm';
import { MenuPage } from '../pages/menu/menu';
import { NotificacoesPage } from '../pages/notificacoes/notificacoes';

@Component({
  templateUrl: 'app.html',
  providers: [
    ConfigProvider
  ]
})
export class TalentsApp {
  rootPage: any;

  constructor(
    platform: Platform,
    public fcm: FCM,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    public app: App,
    public session: ConfigProvider
  ) {

    this.verificaUsuario();
    platform.ready().then(() => {
      if(platform.is('android') || platform.is('ios')){
        statusBar.styleDefault();
        splashScreen.hide();
        this.notificacaoFMC();
        
      }else
      if(platform.is('browser')){

      }
    });
  }

    async verificaUsuario(){
      if((await this.session.exist()) || (await this.session.get())) {
        this.rootPage = MenuPage;
      }else{
        this.rootPage = LoginPage;
      }
    }

    notificacaoFMC(){
      this.fcm.onNotification().subscribe(data => {                    
          
        if(data.wasTapped) {         

         console.info("Received in background");    
        } else {
          let alert = this.alertCtrl.create({
            title:'Parabéns, você foi selecionado!',
            message: 'Click e veja os detalhes da vaga',
            buttons: [
              {
                text: 'Cancelar',
                handler: () => {}
              },
              {
                text: 'Ok',
                handler: () => {
                  var nav = this.app.getActiveNav();
                  nav.push(NotificacoesPage);
                }
              }
            ]
          });
          alert.present();
         console.info("Received in foreground");
        
        };
      });
    }
}
