import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { TesteComportamentalProvider } from '../../providers/teste-comportamental/teste-comportamental';


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
  providers: [
    TesteComportamentalProvider
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

  //Métodos
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    public loadingCtrl: LoadingController,
    private comportamentalProvider: TesteComportamentalProvider
  ) {

  }

  testarPromiseLeandro() {
    this.promiseTemplate1()
      .then((fromResolve) => {
        alert(fromResolve)
      })
      .then(() => { this.promiseTemplate2() })
  }

  public leandroo: Array<any>;
  testarPromiseLeandro2() {
    this.leandroo = new Array<any>();
    this.promiseTemplate1()
      .then(() => {
        alert("faz algo após promiseTemplate1 ser executado")
      })
      .then(() => { this.promiseTemplate2() })
  }

  promiseTemplate1(): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log("promiseTemplate1()")
      this.leandroo.push("jkl");

      resolve("qualquer coisa")
    })
  }

  promiseTemplate2(): Promise<string> {
    return new Promise((resolve, reject) => {


      console.log("promiseTemplate2()")
      console.log(this.leandroo[0])
      resolve("qualquer coisa")
    })
  }


  metodoPrincipal() {

    //this.testarPromiseLeandro2();

    this.carregaPerguntasViaApi()


  }
  ionViewDidEnter() {

    this.metodoPrincipal();


  }


  buscarAlternativasNaMao() {
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

  buscarPerguntasNaMao() {
    //Enquanto não tem API...
    this.lista_perguntas.push(this.pergunta_comp1)
    this.lista_perguntas.push(this.pergunta_comp2)
  }

  preparaRespostaDaPergunta(cd_da_pergunta: number): Array<any> {
    console.log("cd_da_pergunta " + cd_da_pergunta)
    if (this.listaObjeto == null) {
      console.log("Tá NULL")
    }
    console.log(this.listaObjeto.length)

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
    if (this.listaEscolhas == null) {
      console.log("entrou no if")
      this.listaEscolhas = new Array<any>()
    }


    let pergunta_resposta = {
      cd_pergunta: pergunta,
      cd_resposta: escolha
    }
    let indexx;
    if (this.listaEscolhas.length > 0) {
      console.log("entrou no 2 if")
      for (let x of this.listaEscolhas) {
        indexx = this.listaEscolhas.indexOf(x);
        if (x.cd_pergunta == pergunta) {
          console.log("entrou no 3 if")
          this.listaEscolhas.splice(indexx);
        }
      }
    }
    console.log("deu push")
    this.listaEscolhas.push(pergunta_resposta);
  }

  finalizarTeste() {
  
      if (this.listaEscolhas.length < 25) {

      this.toast.create({ message: 'Responda todas as questões', duration: 2000 }).present();

    } else {
      
      alert("Teste enviado!(ainda não) Lenght: " + this.listaEscolhas.length);
      let f = "";
      for (let x of this.listaEscolhas) {
        f = f + "\nPergunta: " + x.cd_pergunta + " Alternativa: " + x.cd_resposta;
      }
      alert(f)
    }
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
  //Animação de carregamento das perguntas na tela;
  abreCarregandoAlternativas() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando Alternativas..."
    });
    this.loader.present();
  }
  fechaCarregandoAlternativas() {
    this.loader.dismiss();
  }

  organizarPerguntasAlternativas() {
    this.listaObjeto = new Array<any>();

    //A cada pergunta...
    for (let perguntas of this.lista_perguntas) {
      let listaA = new Array<any>();
      //E a cada alternativa...
      for (let resp of this.lista_alternativas) {
        //Setar na variável listaA as alternativas referentes a pergunta do for() acima
        if (resp.cd_pergunta_perfil_comp == perguntas.cd_pergunta_perfil_comp) {
          listaA.push(resp);
        }
      }

      //Um objeto que terá o código de uma pergunta e a lista de suas alternativas respectivas
      let objeto = {
        cd: perguntas.cd_pergunta_perfil_comp,
        lista: listaA
      }
      //Adicionando para uma lista o objeto q tem o código da pergunta com suas alternativas
      this.listaObjeto.push(objeto)

    }


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

  //Carrega as alternativas via API
  carregaAlternativasViaApi(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.lista_alternativas = new Array<any>();
      this.comportamentalProvider.getAlternativas().subscribe(data => {

        this.abreCarregandoAlternativas();

        const response = (data as any);
        this.lista_alternativas = response.sucess;
        this.fechaCarregandoAlternativas();
      }, error => {
        console.log(error);
        this.fechaCarregandoAlternativas();
      }
      )
      resolve("qualquer coisa")
    })
  }

  metodoInutilPodeExcluir() {
    this.comportamentalProvider.getPerguntasAlternativas().subscribe(data => {
      console.log(data)
    })
    console.log("Perguntas: " + this.lista_perguntas.length + "\nAlternativas: " + this.lista_alternativas.length)
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
