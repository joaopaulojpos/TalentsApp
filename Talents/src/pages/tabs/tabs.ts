import { Component } from '@angular/core';

import { VagasPage } from '../vagas/vagas';
import { FavoritasPage } from '../favoritas/favoritas';
import { PerfilPage } from '../perfil/perfil';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = VagasPage;
  tab2Root = FavoritasPage;
  tab3Root = PerfilPage
    ;

  constructor() {

  }
}
