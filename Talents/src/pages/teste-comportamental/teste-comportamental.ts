import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';


/**
 * Generated class for the TesteComportamentalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teste-comportamental',
  templateUrl: 'teste-comportamental.html',
})
export class TesteComportamentalPage {

  //Atributos
  public lista_alternativas = new Array<any>();
  public lista_perguntas = new Array<any>();
  public lista_alternativas_da_pergunta = new Array<any>();
  public listaObjeto = new Array<any>();
  public listaEscolhas = new Array<any>();  

  //Métodos
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController) {
  }

  ionViewDidLoad() {
    this.buscarAlternativasViaAPI();
    this.buscarPerguntasViaAPI();

    //A cada pergunta...
    for (let perguntas of this.lista_perguntas) {
      let listaA = new Array<any>();
      //E a cada alternativa...
      for (let resp of this.lista_alternativas) {
        //Setar na variável listaA as alternativas referentes a pergunta do for() acima
        if (resp.pergunta_comp.cd == perguntas.cd) {
          listaA.push(resp);
        }
      }

      //Um objeto que terá o código de uma pergunta e a lista de suas alternativas respectivas
      let objeto = {
        cd: perguntas.cd,
        lista: listaA
      }
      //Adicionando para uma lista o objeto q tem o código da pergunta com suas alternativas
      this.listaObjeto.push(objeto)

    }

  }


  buscarAlternativasViaAPI() {
    //Enquanto não tem API...
    this.lista_alternativas.push(this.alternativa_comp1)
    this.lista_alternativas.push(this.alternativa_comp2)
    this.lista_alternativas.push(this.alternativa_comp3)
    this.lista_alternativas.push(this.alternativa_comp4)
    this.lista_alternativas.push(this.alternativa_comp11)
    this.lista_alternativas.push(this.alternativa_comp12)
    this.lista_alternativas.push(this.alternativa_comp13)
    this.lista_alternativas.push(this.alternativa_comp14)
  }

  buscarPerguntasViaAPI() {
    //Enquanto não tem API...
    this.lista_perguntas.push(this.pergunta_comp1)
    this.lista_perguntas.push(this.pergunta_comp2)
  }

  preparaRespostaDaPergunta(cd_da_pergunta: number): Array<any> {

    //listaObjeto é uma lista que tem objetos contendo pergunta e alternativas respectivas.
    for (let obj of this.listaObjeto) {
      //Se a pergunta do objeto da iteração for a mesma pergunta do ngFor do HTML então retorne as alternativas
      //referentes a pergunta em questao.
      if (obj.cd == cd_da_pergunta) {
        return obj.lista;
      }
    }

  }



  radioChecked(escolha: string, pergunta: any) {

    let pergunta_resposta = {
      cd_pergunta: pergunta,
      cd_resposta: escolha
    }
    let indexx;
    if (this.listaEscolhas.length > 0) {
      for (let x of this.listaEscolhas) {
        indexx = this.listaEscolhas.indexOf(x);
        if (x.cd_pergunta == pergunta) {          
          this.listaEscolhas.splice(indexx);
        }
      }
    }

    this.listaEscolhas.push(pergunta_resposta);
  }

  finalizarTeste() {
    if (this.listaEscolhas.length < 2) {
    
      this.toast.create({ message: 'Responda todas as questões', duration: 2000 }).present();
    
    } else {


      alert("Teste enviado!(ainda não)");
      let f = "";
      for (let x of this.listaEscolhas) {
        f = f + "\nPergunta: " + x.cd_pergunta + " Resposta: " + x.cd_resposta;
      }
      alert(f)
    }
  }

  //Enquanto não tem API...
  public pergunta_comp1 = {
    cd: 1,
    ds_pergunta: "Qual sua linguagem favorita?",
  }

  public alternativa_comp1 = {
    cd: 1,
    ds_resposta: "Java.",
    nr_letra: "A",
    pergunta_comp: this.pergunta_comp1
  }

  public alternativa_comp2 = {
    cd: 2,
    ds_resposta: "PHP.",
    nr_letra: "I",
    pergunta_comp: this.pergunta_comp1
  }

  public alternativa_comp3 = {
    cd: 3,
    ds_resposta: "Python.",
    nr_letra: "O",
    pergunta_comp: this.pergunta_comp1
  }

  public alternativa_comp4 = {
    cd: 4,
    ds_resposta: "C#.",
    nr_letra: "B",
    pergunta_comp: this.pergunta_comp1
  }



  public pergunta_comp2 = {
    cd: 2,
    ds_pergunta: "Qual sua marca favorita?",
  }

  public alternativa_comp11 = {
    cd: 5,
    ds_resposta: "Microsoft.",
    nr_letra: "A",
    pergunta_comp: this.pergunta_comp2
  }

  public alternativa_comp12 = {
    cd: 6,
    ds_resposta: "Apple.",
    nr_letra: "B",
    pergunta_comp: this.pergunta_comp2
  }

  public alternativa_comp13 = {
    cd: 7,
    ds_resposta: "Motorola.",
    nr_letra: "I",
    pergunta_comp: this.pergunta_comp2
  }

  public alternativa_comp14 = {
    cd: 8,
    ds_resposta: "Lenovo.",
    nr_letra: "O",
    pergunta_comp: this.pergunta_comp2
  }


}
