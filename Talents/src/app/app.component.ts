import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { ConfigProvider } from '../providers/config/config';
import { MenuPage } from '../pages/menu/menu';

@Component({
  templateUrl: 'app.html',
  providers: [
    ConfigProvider
  ]
})
export class MyApp {
  rootPage:any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    configProvaider: ConfigProvider
  ) {
      
    platform.ready().then(() => {
      let config = configProvaider.getConfigData();
      if(config == null){
        this.rootPage = LoginPage;
        configProvaider.setConfigData(false)
      }else{
        this.rootPage = MenuPage;
      }
       
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
