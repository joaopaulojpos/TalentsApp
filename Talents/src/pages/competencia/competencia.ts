import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CompetenciaService } from '../../providers/competencia/competencia-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListCompetenciasPage } from '../listcompetencias/listcompetencias';

@IonicPage()
@Component({
  selector: 'page-competencia',
  templateUrl: 'competencia.html',
})
export class CompetenciaPage {
  
  competenciaFormulario: FormGroup; 
  public competencias =[];
  public cd_profissional;
  public tela;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private toast: ToastController,
              public competenciaService: CompetenciaService,
              public formBuilder: FormBuilder) {

    this.competenciaFormulario = this.createMyForm();
    this.cd_profissional = navParams.get("cd_profissional");
    this.tela = navParams.get("tela");
  }
  ionViewDidEnter(){
    this.carregaCompetencias();
  }   

  carregaCompetencias(){
    this.competenciaService.getCompetencias().subscribe(data =>{
      const response = (data as any);
      const objeto = JSON.parse(response._body);
      this.competencias = objeto.sucess;
        console.log(this.competencias);
    },error =>{
      console.log(error);
      this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
      }
     )
    }
  /*************************************
   **METODO CHAMADA SALVAR COMPETÊNCIA**
   *************************************/
  adicionar() {

    this.competenciaFormulario.value.cd_profissional = this.cd_profissional;
    this.competenciaService.adicionar(this.competenciaFormulario.value).subscribe(data => {
      console.log(this.competenciaFormulario.value);
      this.navCtrl.setRoot(ListCompetenciasPage,{ cd_profissional: this.cd_profissional,tela:this.tela});
    }, error => {
      console.log("Data Erro: " + error);
    })

  }

  private createMyForm() {

    return this.formBuilder.group({
      cd_competencia_tecnica: ['', Validators.required],
      nr_nivel: ['', Validators.required],
      cd_profissional: "1",
    });
  }        
}
