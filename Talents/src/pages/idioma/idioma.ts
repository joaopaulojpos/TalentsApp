import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { IdiomaService } from '../../providers/idioma/idioma-service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ListIdiomasPage } from '../list-idiomas/list-idiomas';
@IonicPage()
@Component({
  selector: 'page-idioma',
  templateUrl: 'idioma.html'
})
export class IdiomaPage {
    
    idiomaFormulario: FormGroup; 
    public idiomas =[];
  public cd_profissional;
  public tela;
 
    constructor(public navCtrl: NavController,
                public alertCtrl: AlertController,
                public idiomaService: IdiomaService,
                private toast: ToastController,
                public formBuilder: FormBuilder,
                public navParams: NavParams) {
     
    this.idiomaFormulario = this.createMyForm();
    this.cd_profissional = navParams.get("cd_profissional");
    this.tela = navParams.get("tela"); 

    }
    ionViewDidEnter(){
        this.carregaIdiomas();
      }   
    
      carregaIdiomas(){
        this.idiomaService.getIdiomas().subscribe(data =>{
          const response = (data as any);
          const objeto = JSON.parse(response._body);
          this.idiomas = objeto.sucess;
        },error =>{
          console.log(error);
          this.toast.create({ message: 'Não foi possível estabelecer conexão.', duration: 2000 }).present(); 
          }
         )
        }

  /********************************
   **Metodo chamada salvar idioma**
   ********************************/
  adicionar() {
    this.idiomaFormulario.value.cd_profissional = this.cd_profissional;
    this.idiomaService.adicionar(this.idiomaFormulario.value).subscribe(data => {
      this.navCtrl.setRoot(ListIdiomasPage,{ cd_profissional: this.cd_profissional,tela: this.tela});
    }, error => {
      console.log("Data Erro: " + error);
    })
  }

  private createMyForm() {

    return this.formBuilder.group({
      cd_idioma: ['', Validators.required],
      nr_nivel: ['', Validators.required],
      cd_profissional:this.cd_profissional,
    });
  }        

      
}
