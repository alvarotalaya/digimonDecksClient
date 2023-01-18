import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/shared/routed/home/home.component';
import { LoginComponent } from './component/shared/routed/login/login.component';
import { LogoutComponent } from './component/shared/routed/logout/logout.component';
import { MenuComponent } from './component/shared/unrouted/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { AjaxService } from './service/ajax.service.service';
import { PaginationComponent } from './component/shared/unrouted/pagination/pagination.component';
import { SearchUnroutedComponent } from './component/shared/unrouted/search-unrouted/search-unrouted.component';
import { DropdownRegisterPageComponent } from './component/shared/unrouted/dropdown-register-page/dropdown-register-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationUnroutedComponent } from './component/shared/unrouted/pagination-unrouted/pagination-unrouted.component';
import { PaginationService } from './service/pagination.service';
import { PlayerPlistAdminRoutedComponent } from './component/application/player/routed/player-plist-admin-routed/player-plist-admin-routed.component';
import { PlayerViewAdminRoutedComponent } from './component/application/player/routed/player-view-admin-routed/player-view-admin-routed.component';
import { PlayerRemoveAdminRoutedComponent } from './component/application/player/routed/player-remove-admin-routed/player-remove-admin-routed.component';
import { PlayerEditAdminRoutedComponent } from './component/application/player/routed/player-edit-admin-routed/player-edit-admin-routed.component';
import { PlayerNewAdminRoutedComponent } from './component/application/player/routed/player-new-admin-routed/player-new-admin-routed.component';
import { PlayerDetailAdminUnroutedComponent } from './component/application/player/unrouted/player-detail-admin-unrouted/player-detail-admin-unrouted.component';
import { UsertypeFinderAdminUnroutedComponent } from './component/application/usertype/unrouted/usertype-finder-admin-unrouted/usertype-finder-admin-unrouted.component';
import { UsertypePlistAdminRoutedComponent } from './component/application/usertype/routed/usertype-plist-admin-routed/usertype-plist-admin-routed.component';
import { UsertypeViewAdminRoutedComponent } from './component/application/usertype/routed/usertype-view-admin-routed/usertype-view-admin-routed.component';
import { UsertypeDetailAdminUnroutedComponent } from './component/application/usertype/unrouted/usertype-detail-admin-unrouted/usertype-detail-admin-unrouted.component';
import { UsertypeRemoveAdminRoutedComponent } from './component/application/usertype/routed/usertype-remove-admin-routed/usertype-remove-admin-routed.component';
import { UsertypeEditAdminRoutedComponent } from './component/application/usertype/routed/usertype-edit-admin-routed/usertype-edit-admin-routed.component';
import { UsertypeNewAdminRoutedComponent } from './component/application/usertype/routed/usertype-new-admin-routed/usertype-new-admin-routed.component';
import { CardPlistAdminRoutedComponent } from './component/application/card/routed/card-plist-admin-routed/card-plist-admin-routed.component';
import { CardViewAdminRoutedComponent } from './component/application/card/routed/card-view-admin-routed/card-view-admin-routed.component';
import { CardDetailAdminUnroutedComponent } from './component/application/card/unrouted/card-detail-admin-unrouted/card-detail-admin-unrouted.component';
import { CardRemoveAdminRoutedComponent } from './component/application/card/routed/card-remove-admin-routed/card-remove-admin-routed.component';
import { CardNewAdminRoutedComponent } from './component/application/card/routed/card-new-admin-routed/card-new-admin-routed.component';
import { CardEditAdminRoutedComponent } from './component/application/card/routed/card-edit-admin-routed/card-edit-admin-routed.component';
import { DeckPlistAdminRoutedComponent } from './component/application/deck/routed/deck-plist-admin-routed/deck-plist-admin-routed.component';
import { DeckViewAdminRoutedComponent } from './component/application/deck/routed/deck-view-admin-routed/deck-view-admin-routed.component';
import { DeckDetailAdminUnroutedComponent } from './component/application/deck/unrouted/deck-detail-admin-unrouted/deck-detail-admin-unrouted.component';
import { DeckRemoveAdminRoutedComponent } from './component/application/deck/routed/deck-remove-admin-routed/deck-remove-admin-routed.component';
import { DeckEditAdminRoutedComponent } from './component/application/deck/routed/deck-edit-admin-routed/deck-edit-admin-routed.component';
import { PlayerFinderAdminUnroutedComponent } from './component/application/player/unrouted/player-finder-admin-unrouted/player-finder-admin-unrouted.component';
import { DeckNewAdminRoutedComponent } from './component/application/deck/routed/deck-new-admin-routed/deck-new-admin-routed.component';
import { CarddeckPlistAdminRoutedComponent } from './component/application/carddeck/routed/carddeck-plist-admin-routed/carddeck-plist-admin-routed.component';
import { CarddeckDetailAdminUnroutedComponent } from './component/application/carddeck/unrouted/carddeck-detail-admin-unrouted/carddeck-detail-admin-unrouted.component';
import { CarddeckViewAdminRoutedComponent } from './component/application/carddeck/routed/carddeck-view-admin-routed/carddeck-view-admin-routed.component';
import { CarddeckRemoveAdminRoutedComponent } from './component/application/carddeck/routed/carddeck-remove-admin-routed/carddeck-remove-admin-routed.component';
import { CardFinderAdminUnroutedComponent } from './component/application/card/unrouted/card-finder-admin-unrouted/card-finder-admin-unrouted.component';
import { DeckFinderAdminUnroutedComponent } from './component/application/deck/unrouted/deck-finder-admin-unrouted/deck-finder-admin-unrouted.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    MenuComponent,
    PaginationComponent,
    SearchUnroutedComponent,
    DropdownRegisterPageComponent,
    PaginationUnroutedComponent,
    PlayerPlistAdminRoutedComponent,
    PlayerViewAdminRoutedComponent,
    PlayerRemoveAdminRoutedComponent,
    PlayerEditAdminRoutedComponent,
    PlayerNewAdminRoutedComponent,
    PlayerDetailAdminUnroutedComponent,
    PlayerFinderAdminUnroutedComponent,
    UsertypeFinderAdminUnroutedComponent,
    UsertypePlistAdminRoutedComponent,
    UsertypeViewAdminRoutedComponent,
    UsertypeDetailAdminUnroutedComponent,
    UsertypeRemoveAdminRoutedComponent,
    UsertypeEditAdminRoutedComponent,
    UsertypeNewAdminRoutedComponent,
    CardPlistAdminRoutedComponent,
    CardViewAdminRoutedComponent,
    CardDetailAdminUnroutedComponent,
    CardRemoveAdminRoutedComponent,
    CardNewAdminRoutedComponent,
    CardEditAdminRoutedComponent,
    CardFinderAdminUnroutedComponent,
    DeckPlistAdminRoutedComponent,
    DeckViewAdminRoutedComponent,
    DeckDetailAdminUnroutedComponent,
    DeckRemoveAdminRoutedComponent,
    DeckEditAdminRoutedComponent,
    DeckNewAdminRoutedComponent,
    DeckFinderAdminUnroutedComponent,
    CarddeckPlistAdminRoutedComponent,
    CarddeckDetailAdminUnroutedComponent,
    CarddeckViewAdminRoutedComponent,
    CarddeckRemoveAdminRoutedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    AjaxService,
    PaginationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
