import { Component } from '@angular/core';

import { PerfilPage } from '../perfil/perfil';
import { MenuPage } from '../menu/menu';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root =  MenuPage;
  tab2Root = PerfilPage;

  constructor() {

  }
}
