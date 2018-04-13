import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { ConfigProvider } from '../providers/config/config';
import { MenuPage } from '../pages/menu/menu';
import { Push, PushOptions, PushObject } from '@ionic-native/push';

@Component({
  templateUrl: 'app.html',
  providers: [
    ConfigProvider
  ]
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public push: Push,
    public alertCtrl: AlertController,
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
      this.pushSetup();
    });
  }

  pushSetup(){
    const options: PushOptions ={};
    const pushObject: PushObject = this.push.init(options);

    pushObject.on("registration").subscribe((registration: any)=> {});
    pushObject.on("notification").subscribe((notification: any)=> {
      if (notification.additionalData.foreground){
        let yuoralert=  this.alertCtrl.create({
          title: notification.label,
          message: notification.message
        });
        yuoralert.present();
      }
    })
  }
}
