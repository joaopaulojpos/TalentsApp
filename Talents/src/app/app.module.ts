import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
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
import { ConfiguracoesPage } from '../pages/configuracoes/configuracoes';
import { ConfiguracoesPageModule } from '../pages/configuracoes/configuracoes.module';
import { CadastroProfissionalPage } from '../pages/cadastro-profissional/cadastro-profissional';
import { HttpModule } from '@angular/http';
import { ServicosProvider } from '../providers/servicos/servicos';
import { ProfissionalService } from '../domain/profissional/profissional-service';
import { ProfissionalPage } from '../pages/profissional/profissional';
import { VagasService } from '../domain/vagas/vagas-service';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    CadastroProfissionalPage,
    ProfissionalPage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    VagasPageModule,
    FavoritasPageModule,
    PerfilPageModule,
    ConfiguracoesPageModule,
    HttpModule,
     
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,
    VagasPage,
    PerfilPage,
    FavoritasPage,
    ConfiguracoesPage,
    CadastroProfissionalPage,
    ProfissionalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProfissionalService,
    ServicosProvider,
    VagasService
  ]
})
export class AppModule {}
