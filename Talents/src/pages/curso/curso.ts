import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CursoService } from '../../providers/curso/curso-service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-curso',
  templateUrl: 'curso.html',
})
export class CursoPage {
  cursoFormulario: FormGroup; 
  public cursos =[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toast: ToastController,
              public cursoService: CursoService,
              public formBuilder: FormBuilder) {

    this.cursoFormulario = this.createMyForm(); 
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
 /*******************************
  **Metodo chamada salvar curso**
  *******************************/
  adicionar() {
    
    console.log(this.cursoFormulario.value);
  }

  private createMyForm() {

    return this.formBuilder.group({
      cd_profissional:"1",
      cd_curso: ['', Validators.required],
      ds_instituicao: ['', Validators.required],
      dt_fim: ['', Validators.required],
      dt_inicio: ['', Validators.required],
      tp_certificado_validado: "A",
	    nr_certificado:['', Validators.required],
	    nr_periodo: ['', Validators.required]
    });
  }          
}
