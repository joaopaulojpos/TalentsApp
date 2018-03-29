import { Component } from '@angular/core';

import { PerfilPage } from '../perfil/perfil';
import { ConfiguracoesPage } from '../configuracoes/configuracoes';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root =  ConfiguracoesPage;
  tab2Root = PerfilPage;

  constructor() {

  }
}
