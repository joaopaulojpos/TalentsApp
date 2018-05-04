import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CursoService } from '../../providers/curso/curso-service';

@IonicPage()
@Component({
  selector: 'page-curso',
  templateUrl: 'curso.html',
})
export class CursoPage {

  public cursos =[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toast: ToastController,
              public cursoService: CursoService) {
  }
  ionViewDidEnter(){
    this.carregaCursos();
  }   

  carregaCursos(){
    this.cursoService.getCursos().subscribe(data =>{
      const response = (data as any);
      const objeto = JSON.parse(response._body);
      this.cursos = objeto.sucess;
        console.log(this.cursos);
    },error =>{
      console.log(error);
      this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
      }
     )
    }
}
