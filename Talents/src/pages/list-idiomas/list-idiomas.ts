import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { IdiomaPage } from '../idioma/idioma';
import { ProfissionalService } from '../../providers/profissional/profissional-service';

@IonicPage()
@Component({
  selector: 'page-list-idiomas',
  templateUrl: 'list-idiomas.html',
})
export class ListIdiomasPage {

  idiomas: any = [];
 
  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private toast: ToastController,
              private profissionalservice: ProfissionalService) {

  }

  async ionViewDidEnter(){
    this.carregaIdiomas(1);
  }

  carregaIdiomas(cd_profissional){
    this.profissionalservice.getIdiomas(cd_profissional).subscribe(data =>{
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


  adicionar(){
    this.navCtrl.push(IdiomaPage);
  }

  editar(idioma){

  }

  deletar(idioma){

      let index = this.idiomas.indexOf(idioma);

      if(index > -1){
          this.idiomas.splice(index, 1);
      }
  }

}
