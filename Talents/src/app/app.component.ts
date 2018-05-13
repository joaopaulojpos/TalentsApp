import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { ConfigProvider } from '../providers/config/config';
import { FCM } from '@ionic-native/fcm';
import { MenuPage } from '../pages/menu/menu';

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
    public session: ConfigProvider
  ) {

    this.verificaUsuario();
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

    async verificaUsuario(){
      if((await this.session.exist()) || (await this.session.get())) {
        this.rootPage = MenuPage;
      }else{
        this.rootPage = LoginPage;
      }
    }
  
}
