import { NgModule, ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { MyApp } from './app.component';
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
import { ProfissionalService } from '../domain/profissional/profissional-service';
import { ProfissionalPage } from '../pages/profissional/profissional';
import { VagasService } from '../domain/vagas/vagas-service';
import { Geolocation } from '@ionic-native/geolocation';
import { MapsPage } from '../pages/maps/maps';
import { MapsPageModule } from '../pages/maps/maps.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { MenuPageModule } from '../pages/menu/menu.module';
import { MenuPage } from '../pages/menu/menu';
import { AgmCoreModule } from '@agm/core';
import { TesteComportamentalPageModule } from '../pages/teste-comportamental/teste-comportamental.module';
import { ProfissionalIdiomaPage} from '../pages/profissional-idioma/profissional-idioma';
import { NotificacoesPage } from '../pages/notificacoes/notificacoes';
import { NotificacoesPageModule } from '../pages/notificacoes/notificacoes.module';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    ProfissionalPage,
    ProfissionalIdiomaPage
   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    VagasPageModule,
    FavoritasPageModule,
    PerfilPageModule,
    MenuPageModule,
    HttpModule,
    MapsPageModule,
    NotificacoesPageModule,
    TesteComportamentalPageModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB8rlkYvUU6FrObUQbsttNDF94uOeuGBCI",
      libraries: ["places"]
  })
     
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,
    VagasPage,
    PerfilPage,
    FavoritasPage,
    MenuPage,
    ProfissionalPage,
    MapsPage,
    ProfissionalIdiomaPage,
    NotificacoesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProfissionalService,
    ServicosProvider,
    VagasService,
    Geolocation,
    ScreenOrientation,
  ]
})
export class AppModule {}
