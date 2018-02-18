import { Component } from '@angular/core';

import { VagasPage } from '../vagas/vagas';
import { FavoritasPage } from '../favoritas/favoritas';
import { PerfilPage } from '../perfil/perfil';
import { ConfiguracoesPage } from '../configuracoes/configuracoes';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root =  ConfiguracoesPage;
  tab2Root = FavoritasPage;
  tab3Root = PerfilPage;

  constructor() {

  }
}
