import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IdiomaService } from '../../domain/idioma/idioma-service';
@IonicPage()
@Component({
  selector: 'page-profissional-idioma',
  templateUrl: 'profissional-idioma.html'
})
export class ProfissionalIdiomaPage {
  private idiomas = [];
 
  constructor(public navCtrl: NavController, 
              public navParams: NavParams
  ) {

    this.inicializaIdiomas();
  }

  inicializaIdiomas() {
    this.idiomas = [
      'Inglês',
      'Português',
      'Alemão',
      'Espanhol',
      'Mandarin'
    ];
  }

  getIdiomas(ev) {
    this.inicializaIdiomas();

    var val = ev.target.value;

    if (val && val.trim() != '') {
      this.idiomas = this.idiomas.filter((idioma) => {
        return (idioma.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


}
