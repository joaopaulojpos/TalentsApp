import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { ConfigProvider } from '../providers/config/config';
import { MenuPage } from '../pages/menu/menu';
import { FCM } from '@ionic-native/fcm';

@Component({
  templateUrl: 'app.html',
  providers: [
    ConfigProvider
  ]
})
export class TalentsApp {
  rootPage: any = LoginPage;

  constructor(
    platform: Platform,
    private fcm: FCM,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    configProvaider: ConfigProvider,
  ) {
      
    platform.ready().then(() => {

      //this.fcm.subscribeToTopic('talents');
  
      this.fcm.onNotification().subscribe(data => {
        alert('message received')
        if(data.wasTapped) {
        console.info("Received in background");
        } else {
        console.info("Received in foreground");
        };
      });
       
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
