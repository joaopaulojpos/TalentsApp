import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-vagas',
  templateUrl: 'vagas.html',
})
export class VagasPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  detalharvaga(detalhe) {
    var display = document.getElementById(detalhe).style.display;
    if(display == "none")
      document.getElementById(detalhe).style.display = 'block';
    else
      document.getElementById(detalhe).style.display = 'none';  
  }

}
