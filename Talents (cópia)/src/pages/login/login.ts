import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public email:string ;
  public senha:string ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
    /*Metodo Login do usuario*/
    login(){
      console.log(this.email);
      console.log(this.senha);
      this.navCtrl.setRoot(TabsPage);
  
    }

}



