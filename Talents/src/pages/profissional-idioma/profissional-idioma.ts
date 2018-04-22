import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { IdiomaService } from '../../providers/idioma/idioma-service';
@IonicPage()
@Component({
  selector: 'page-profissional-idioma',
  templateUrl: 'profissional-idioma.html'
})
export class ProfissionalIdiomaPage {
  private idiomas = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public idiomaService: IdiomaService,
              private toast: ToastController
  ) {

    this.inicializaIdiomas();
  }
  
  inicializaIdiomas() {
    this.idiomaService.getIdiomas()
    .subscribe(data =>{
      const response = (data as any);
      const objeto = JSON.parse(response._body);
      this.idiomas = objeto.sucess;
        console.log(this.idiomas);
    },error =>{
      console.log(error);
      this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
      }
     )
  }

  getIdiomas(ev) {
    this.inicializaIdiomas();

    var val = ev.target.value;

    if (val && val.trim() != '') {
      this.idiomas = this.idiomas.filter((ds_idioma) => {
        return (ds_idioma.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


}
