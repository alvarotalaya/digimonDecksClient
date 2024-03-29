import { HomeComponent } from './component/shared/routed/home/home.component';
import { LoginComponent } from './component/shared/routed/login/login.component';
import { LogoutComponent } from './component/shared/routed/logout/logout.component';
import { GenerateComponent } from './component/shared/routed/generate/generate.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerPlistAdminRoutedComponent } from './component/application/player/admin/routed/player-plist-admin-routed/player-plist-admin-routed.component';
import { PlayerViewAdminRoutedComponent } from './component/application/player/admin/routed/player-view-admin-routed/player-view-admin-routed.component';
import { PlayerRemoveAdminRoutedComponent } from './component/application/player/admin/routed/player-remove-admin-routed/player-remove-admin-routed.component';
import { PlayerEditAdminRoutedComponent } from './component/application/player/admin/routed/player-edit-admin-routed/player-edit-admin-routed.component';
import { PlayerNewAdminRoutedComponent } from './component/application/player/admin/routed/player-new-admin-routed/player-new-admin-routed.component';
import { UsertypePlistAdminRoutedComponent } from './component/application/usertype/admin/routed/usertype-plist-admin-routed/usertype-plist-admin-routed.component';
import { UsertypeViewAdminRoutedComponent } from './component/application/usertype/admin/routed/usertype-view-admin-routed/usertype-view-admin-routed.component';
import { UsertypeRemoveAdminRoutedComponent } from './component/application/usertype/admin/routed/usertype-remove-admin-routed/usertype-remove-admin-routed.component';
import { UsertypeEditAdminRoutedComponent } from './component/application/usertype/admin/routed/usertype-edit-admin-routed/usertype-edit-admin-routed.component';
import { UsertypeNewAdminRoutedComponent } from './component/application/usertype/admin/routed/usertype-new-admin-routed/usertype-new-admin-routed.component';
import { CardPlistAdminRoutedComponent } from './component/application/card/admin/routed/card-plist-admin-routed/card-plist-admin-routed.component';
import { CardViewAdminRoutedComponent } from './component/application/card/admin/routed/card-view-admin-routed/card-view-admin-routed.component';
import { CardRemoveAdminRoutedComponent } from './component/application/card/admin/routed/card-remove-admin-routed/card-remove-admin-routed.component';
import { CardNewAdminRoutedComponent } from './component/application/card/admin/routed/card-new-admin-routed/card-new-admin-routed.component';
import { CardEditAdminRoutedComponent } from './component/application/card/admin/routed/card-edit-admin-routed/card-edit-admin-routed.component';
import { DeckPlistAdminRoutedComponent } from './component/application/deck/admin/routed/deck-plist-admin-routed/deck-plist-admin-routed.component';
import { DeckViewAdminRoutedComponent } from './component/application/deck/admin/routed/deck-view-admin-routed/deck-view-admin-routed.component';
import { DeckRemoveAdminRoutedComponent } from './component/application/deck/admin/routed/deck-remove-admin-routed/deck-remove-admin-routed.component';
import { DeckEditAdminRoutedComponent } from './component/application/deck/admin/routed/deck-edit-admin-routed/deck-edit-admin-routed.component';
import { DeckNewAdminRoutedComponent } from './component/application/deck/admin/routed/deck-new-admin-routed/deck-new-admin-routed.component';
import { CarddeckPlistAdminRoutedComponent } from './component/application/carddeck/admin/routed/carddeck-plist-admin-routed/carddeck-plist-admin-routed.component';
import { CarddeckViewAdminRoutedComponent } from './component/application/carddeck/admin/routed/carddeck-view-admin-routed/carddeck-view-admin-routed.component';
import { CarddeckRemoveAdminRoutedComponent } from './component/application/carddeck/admin/routed/carddeck-remove-admin-routed/carddeck-remove-admin-routed.component';
import { CarddeckEditAdminRoutedComponent } from './component/application/carddeck/admin/routed/carddeck-edit-admin-routed/carddeck-edit-admin-routed.component';
import { CarddeckNewAdminRoutedComponent } from './component/application/carddeck/admin/routed/carddeck-new-admin-routed/carddeck-new-admin-routed.component';
import { CardPlistUserRoutedComponent } from './component/application/card/user/routed/card-plist-user-routed/card-plist-user-routed.component';
import { PlayerInfoUserRoutedComponent } from './component/application/player/user/routed/player-info-user-routed/player-info-user-routed.component';
import { CarddeckPlistUserRoutedComponent } from './component/application/carddeck/user/routed/carddeck-plist-user-routed/carddeck-plist-user-routed.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'generate', component: GenerateComponent},
  { path: 'admin/player/plist', component: PlayerPlistAdminRoutedComponent},
  { path: 'admin/player/view/:id', component: PlayerViewAdminRoutedComponent},
  { path: 'admin/player/remove/:id', component: PlayerRemoveAdminRoutedComponent},
  { path: 'admin/player/edit/:id', component: PlayerEditAdminRoutedComponent},
  { path: 'admin/player/new', component: PlayerNewAdminRoutedComponent},
  { path: 'admin/usertype/plist', component: UsertypePlistAdminRoutedComponent},
  { path: 'admin/usertype/view/:id', component:UsertypeViewAdminRoutedComponent},
  { path: 'admin/usertype/remove/:id', component:UsertypeRemoveAdminRoutedComponent},
  { path: 'admin/usertype/edit/:id', component:UsertypeEditAdminRoutedComponent},
  { path: 'admin/usertype/new', component: UsertypeNewAdminRoutedComponent},
  { path: 'admin/card/plist', component: CardPlistAdminRoutedComponent},
  { path: 'admin/card/view/:id', component: CardViewAdminRoutedComponent},
  { path: 'admin/card/remove/:id', component: CardRemoveAdminRoutedComponent},
  { path: 'admin/card/new', component: CardNewAdminRoutedComponent},
  { path: 'admin/card/edit/:id', component: CardEditAdminRoutedComponent},
  { path: 'admin/deck/plist/player/:id', component: DeckPlistAdminRoutedComponent},
  { path: 'admin/deck/view/:id', component:DeckViewAdminRoutedComponent},
  { path: 'admin/deck/remove/:id', component:DeckRemoveAdminRoutedComponent},
  { path: 'admin/deck/edit/:id', component: DeckEditAdminRoutedComponent},
  { path: 'admin/deck/new', component: DeckNewAdminRoutedComponent},
  { path: 'admin/carddeck/plist/:idCard/:idDeck', component: CarddeckPlistAdminRoutedComponent},
  { path: 'admin/carddeck/view/:id', component: CarddeckViewAdminRoutedComponent},
  { path: 'admin/carddeck/remove/:id', component: CarddeckRemoveAdminRoutedComponent},
  { path: 'admin/carddeck/edit/:id', component: CarddeckEditAdminRoutedComponent},
  { path: 'admin/carddeck/new', component: CarddeckNewAdminRoutedComponent},
  { path: 'user/card/plist/:expansion', component: CardPlistUserRoutedComponent},
  { path: 'user/player/view/:id', component: PlayerInfoUserRoutedComponent},
  { path: 'user/carddeck/plist/:id', component: CarddeckPlistUserRoutedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
