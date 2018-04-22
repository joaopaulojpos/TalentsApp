import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfissionalService } from '../../providers/profissional/profissional-service';
import { TesteComportamentalPage } from '../teste-comportamental/teste-comportamental';
import { Profissional } from '../../providers/profissional/profissional';
import { VagasPage } from '../vagas/vagas';
import { ProfissionalPage } from '../profissional/profissional';
import { ProfissionalIdiomaPage } from '../profissional-idioma/profissional-idioma';
@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
  providers:[ProfissionalService]
})
export class PerfilPage {
  public profissional : Profissional;
  constructor(public navCtrl: NavController,
              public navParams: NavParams
            ) {
  }
  
  ionViewDidLoad() { 
  this.profissional = this.navParams.get('profissional');       
  console.log(this.profissional);     
  }

  chamaEditarPerfil(){
    this.navCtrl.push(ProfissionalIdiomaPage,{profissional:this.profissional});
  }
  
  chamaHome(){
    this.navCtrl.push(VagasPage);
  }

  abrirTesteComportamental(){
    this.navCtrl.push(TesteComportamentalPage);    
  }

}