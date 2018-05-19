import { NgModule, ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { TalentsApp } from './app.component';
import { TabsPage    } from '../pages/tabs/tabs';
import { LoginPage   } from '../pages/login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { VagasPageModule } from '../pages/vagas/vagas.module';
import { FavoritasPageModule } from '../pages/favoritas/favoritas.module';
import { PerfilPageModule } from '../pages/perfil/perfil.module';
import { VagasPage } from '../pages/vagas/vagas';
import { PerfilPage } from '../pages/perfil/perfil';
import { FavoritasPage } from '../pages/favoritas/favoritas';
import { HttpModule } from '@angular/http';
import { ServicosProvider } from '../providers/servicos/servicos';
import { ProfissionalService } from '../providers/profissional/profissional-service';
import { ProfissionalPage } from '../pages/profissional/profissional';
import { VagasService } from '../providers/vagas/vagas-service';
import { Geolocation } from '@ionic-native/geolocation';
import { MapsPage } from '../pages/maps/maps';
import { MapsPageModule } from '../pages/maps/maps.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { MenuPageModule } from '../pages/menu/menu.module';
import { MenuPage } from '../pages/menu/menu';
import { AgmCoreModule } from '@agm/core';
import { TesteComportamentalPageModule } from '../pages/teste-comportamental/teste-comportamental.module';
import { IdiomaPage} from '../pages/idioma/idioma';
import { NotificacoesPage } from '../pages/notificacoes/notificacoes';
import { NotificacoesPageModule } from '../pages/notificacoes/notificacoes.module';
import { NotificacoesDetalhesPageModule } from '../pages/notificacoes-detalhes/notificacoes-detalhes.module';
import { NotificacoesDetalhesPage } from '../pages/notificacoes-detalhes/notificacoes-detalhes';
import { HttpClientModule } from '@angular/common/http';
import { LottieAnimationViewModule } from 'ng-lottie';
import { AnimacaoPage } from '../pages/animacao/animacao';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireModule } from 'angularfire2';
import { IdiomaService } from '../providers/idioma/idioma-service';
import { CompetenciaService } from '../providers/competencia/competencia-service';
import { Firebase } from '@ionic-native/firebase';
import { RlTagInputModule } from 'angular2-tag-input';
import { ListIdiomasPage } from '../pages/list-idiomas/list-idiomas';
import { ListCompetenciasPage } from '../pages/listcompetencias/listcompetencias';
import { CompetenciaPage } from '../pages/competencia/competencia';
import { CursoService } from '../providers/curso/curso-service';
import { CursoPage } from '../pages/curso/curso';
import { ListCursosPage } from '../pages/listcursos/listcursos';
import { CargoPage } from '../pages/cargo/cargo';
import { CargoService } from '../providers/cargo/cargo-service';
import { ListCargosPage } from '../pages/list-cargos/list-cargos';
import { FCM } from '@ionic-native/fcm'



const firebaseConfig = {
  apiKey: "AIzaSyBwWbPer0fobodAqFCTV8iU1BL6zQvaakQ",
  authDomain: "",
  databaseURL: "",
  projectId: "talentsmaps",
  storageBucket: "",
  messagingSenderId: ""
};

@NgModule({
  declarations: [
    TalentsApp,
    TabsPage,
    LoginPage,
    ProfissionalPage,
    IdiomaPage,
    AnimacaoPage,
    ListIdiomasPage,
    ListCompetenciasPage,
    CompetenciaPage,
    ListCursosPage,
    CursoPage,
    CargoPage,
    ListCargosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(TalentsApp),
    IonicStorageModule.forRoot(),
    VagasPageModule,
    FavoritasPageModule,
    PerfilPageModule,
    MenuPageModule,
    HttpModule,
    HttpClientModule,
    MapsPageModule,
    NotificacoesPageModule,
    NotificacoesDetalhesPageModule,
    TesteComportamentalPageModule,
    LottieAnimationViewModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RlTagInputModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB8rlkYvUU6FrObUQbsttNDF94uOeuGBCI",
      libraries: ["places"]
  })
     
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TalentsApp,
    TabsPage,
    LoginPage,
    VagasPage,
    PerfilPage,
    FavoritasPage,
    MenuPage,
    ProfissionalPage,
    MapsPage,
    IdiomaPage,
    NotificacoesPage,
    NotificacoesDetalhesPage,
    AnimacaoPage,
    ListIdiomasPage,
    ListCompetenciasPage,
    CompetenciaPage,
    ListCursosPage,
    CursoPage,
    CargoPage,
    ListCargosPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProfissionalService,
    ServicosProvider,
    FCM,
    VagasService,
    Geolocation,
    ScreenOrientation,
    Facebook,
    IdiomaService,
    Firebase,
    CompetenciaService,
    CursoService,
    CargoService
  ]
})
export class AppModule {}
