import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { IdiomaService } from '../../providers/idioma/idioma-service';
import { CONSTANTS } from '@firebase/util';
@IonicPage()
@Component({
  selector: 'page-idioma',
  templateUrl: 'idioma.html'
})
export class IdiomaPage {
  
  public listaIdiomas: Array<any>;
  adicionadosIdiomas = [];
  name: string;
  idiomas = [];
  preparedTags = [
    'Ionic',
    'Angular',
    'Javascript',
    'Mobile',
    'Hybrid',
    'CrossPlatform'
  ]
 

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public idiomaService: IdiomaService,
              private toast: ToastController
  ) {

  }
  ionViewDidEnter(){
    this.carregaIdiomas();
  }   

  carregaIdiomas(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.listaIdiomas = new Array<any>();

      this.idiomaService.getIdiomas().subscribe(data => {
        const response = (data as any);
        this.listaIdiomas = response._body;
        console.log(response._body);
      }, error => {
        console.log(error);
      }
      )
      resolve("")
    })
  }

  adicionar() {

    this.idiomas.push({name: this.name, adicionadosIdiomas: this.adicionadosIdiomas});
      console.log(this.adicionadosIdiomas.length);
    
  }
}
