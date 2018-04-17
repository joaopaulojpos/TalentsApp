import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { TesteComportamentalProvider } from '../../providers/teste-comportamental/teste-comportamental';
import { TesteComportamentalService } from '../../domain/teste-comportamental/teste-comportamental-service';
import { AnimacaoPage } from '../animacao/animacao';

@IonicPage()
@Component({
  selector: 'page-teste-comportamental',
  templateUrl: 'teste-comportamental.html',
  providers: [
    TesteComportamentalProvider,
    TesteComportamentalService
  ]
})
export class TesteComportamentalPage {

  //Atributos
  public lista_alternativas: Array<any>;
  public lista_perguntas: Array<any>;
  public lista_alternativas_da_pergunta: Array<any>;
  public listaObjeto: Array<any>;
  public listaEscolhas: Array<any>;
  public loader;

  public profissionalTesteComportamental;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    public loadingCtrl: LoadingController,
    private comportamentalProvider: TesteComportamentalProvider,
    private comportamentalService: TesteComportamentalService
  ) {

    this.profissionalTesteComportamental = navParams.get("profissional");    
  }

  ionViewDidEnter() {
    this.metodoPrincipal();
  }

  //Métodos
  metodoPrincipal() {
    this.carregaPerguntasViaApi()
  }

  //Carrega as perguntas via API
  carregaPerguntasViaApi(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.lista_perguntas = new Array<any>();

      this.comportamentalProvider.getPerguntasAlternativas().subscribe(data => {
        this.abreCarregandoPerguntas();
        const response = (data as any);
        this.lista_perguntas = response.sucess;
        this.fechaCarregandoPerguntas();
      }, error => {
        console.log(error);
        this.fechaCarregandoPerguntas();
      }
      )
      resolve("qualquer coisa")
    })
  }

  //Animação de carregamento das perguntas na tela;
  abreCarregandoPerguntas() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando Perguntas..."
    });
    this.loader.present();
  }
  fechaCarregandoPerguntas() {
    this.loader.dismiss();
  }

  radioChecked(escolha: string, pergunta: any) {
    let indexDePerguntaAntiga = 99;
    let isIgual: boolean = false;

    let pergunta_resposta = {
      cd_pergunta: pergunta,
      cd_resposta: escolha
    }

    if (this.listaEscolhas == null) {
      this.listaEscolhas = new Array<any>()
    }

    for (let x of this.listaEscolhas) {
      if (x.cd_pergunta == pergunta_resposta.cd_pergunta) {
        isIgual = true;
        indexDePerguntaAntiga = this.listaEscolhas.indexOf(x);
      }
    }
    if (isIgual) {
      this.listaEscolhas.splice(indexDePerguntaAntiga);
      isIgual = false;
    }
    this.listaEscolhas.push(pergunta_resposta);
  }

  finalizarTeste() {
    console.log(this.profissionalTesteComportamental)

    //if (this.listaEscolhas.length < 25) {
    let asdf: boolean = false;
    if (asdf) {
      this.toast.create({ message: 'Responda todas as questões.\nRespondidas: ' + this.listaEscolhas.length + "//25", duration: 2000 }).present();
    } else {
      this.comportamentalService.enviarTesteComportamental(this.listaEscolhas[0].cd_pergunta, this.listaEscolhas[0].cd_resposta, 1)
      this.navCtrl.push(AnimacaoPage,{profissionalTesteComportamental: this.profissionalTesteComportamental});

      /*
      alert("Teste enviado!(ainda não) Lenght: " + this.listaEscolhas.length);
      let f = "";
      for (let x of this.listaEscolhas) {
        f = f + "\nPergunta: " + x.cd_pergunta + " Alternativa: " + x.cd_resposta;
      }
      alert(f)
      */
    }
  }




}
