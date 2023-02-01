import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/shared/routed/home/home.component';
import { LoginComponent } from './component/shared/routed/login/login.component';
import { LogoutComponent } from './component/shared/routed/logout/logout.component';
import { MenuComponent } from './component/shared/unrouted/menu/menu.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AjaxService } from './service/ajax.service.service';
import { PaginationComponent } from './component/shared/unrouted/pagination/pagination.component';
import { SearchUnroutedComponent } from './component/shared/unrouted/search-unrouted/search-unrouted.component';
import { DropdownRegisterPageComponent } from './component/shared/unrouted/dropdown-register-page/dropdown-register-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationUnroutedComponent } from './component/shared/unrouted/pagination-unrouted/pagination-unrouted.component';
import { PaginationService } from './service/pagination.service';
import { PlayerPlistAdminRoutedComponent } from './component/application/player/admin/routed/player-plist-admin-routed/player-plist-admin-routed.component';
import { PlayerViewAdminRoutedComponent } from './component/application/player/admin/routed/player-view-admin-routed/player-view-admin-routed.component';
import { PlayerRemoveAdminRoutedComponent } from './component/application/player/admin/routed/player-remove-admin-routed/player-remove-admin-routed.component';
import { PlayerEditAdminRoutedComponent } from './component/application/player/admin/routed/player-edit-admin-routed/player-edit-admin-routed.component';
import { PlayerNewAdminRoutedComponent } from './component/application/player/admin/routed/player-new-admin-routed/player-new-admin-routed.component';
import { PlayerDetailAdminUnroutedComponent } from './component/application/player/admin/unrouted/player-detail-admin-unrouted/player-detail-admin-unrouted.component';
import { UsertypeFinderAdminUnroutedComponent } from './component/application/usertype/admin/unrouted/usertype-finder-admin-unrouted/usertype-finder-admin-unrouted.component';
import { UsertypePlistAdminRoutedComponent } from './component/application/usertype/admin/routed/usertype-plist-admin-routed/usertype-plist-admin-routed.component';
import { UsertypeViewAdminRoutedComponent } from './component/application/usertype/admin/routed/usertype-view-admin-routed/usertype-view-admin-routed.component';
import { UsertypeDetailAdminUnroutedComponent } from './component/application/usertype/admin/unrouted/usertype-detail-admin-unrouted/usertype-detail-admin-unrouted.component';
import { UsertypeRemoveAdminRoutedComponent } from './component/application/usertype/admin/routed/usertype-remove-admin-routed/usertype-remove-admin-routed.component';
import { UsertypeEditAdminRoutedComponent } from './component/application/usertype/admin/routed/usertype-edit-admin-routed/usertype-edit-admin-routed.component';
import { UsertypeNewAdminRoutedComponent } from './component/application/usertype/admin/routed/usertype-new-admin-routed/usertype-new-admin-routed.component';
import { CardPlistAdminRoutedComponent } from './component/application/card/admin/routed/card-plist-admin-routed/card-plist-admin-routed.component';
import { CardViewAdminRoutedComponent } from './component/application/card/admin/routed/card-view-admin-routed/card-view-admin-routed.component';
import { CardDetailAdminUnroutedComponent } from './component/application/card/admin/unrouted/card-detail-admin-unrouted/card-detail-admin-unrouted.component';
import { CardRemoveAdminRoutedComponent } from './component/application/card/admin/routed/card-remove-admin-routed/card-remove-admin-routed.component';
import { CardNewAdminRoutedComponent } from './component/application/card/admin/routed/card-new-admin-routed/card-new-admin-routed.component';
import { CardEditAdminRoutedComponent } from './component/application/card/admin/routed/card-edit-admin-routed/card-edit-admin-routed.component';
import { DeckPlistAdminRoutedComponent } from './component/application/deck/admin/routed/deck-plist-admin-routed/deck-plist-admin-routed.component';
import { DeckViewAdminRoutedComponent } from './component/application/deck/admin/routed/deck-view-admin-routed/deck-view-admin-routed.component';
import { DeckDetailAdminUnroutedComponent } from './component/application/deck/admin/unrouted/deck-detail-admin-unrouted/deck-detail-admin-unrouted.component';
import { DeckRemoveAdminRoutedComponent } from './component/application/deck/admin/routed/deck-remove-admin-routed/deck-remove-admin-routed.component';
import { DeckEditAdminRoutedComponent } from './component/application/deck/admin/routed/deck-edit-admin-routed/deck-edit-admin-routed.component';
import { PlayerFinderAdminUnroutedComponent } from './component/application/player/admin/unrouted/player-finder-admin-unrouted/player-finder-admin-unrouted.component';
import { DeckNewAdminRoutedComponent } from './component/application/deck/admin/routed/deck-new-admin-routed/deck-new-admin-routed.component';
import { CarddeckPlistAdminRoutedComponent } from './component/application/carddeck/admin/routed/carddeck-plist-admin-routed/carddeck-plist-admin-routed.component';
import { CarddeckDetailAdminUnroutedComponent } from './component/application/carddeck/admin/unrouted/carddeck-detail-admin-unrouted/carddeck-detail-admin-unrouted.component';
import { CarddeckViewAdminRoutedComponent } from './component/application/carddeck/admin/routed/carddeck-view-admin-routed/carddeck-view-admin-routed.component';
import { CarddeckRemoveAdminRoutedComponent } from './component/application/carddeck/admin/routed/carddeck-remove-admin-routed/carddeck-remove-admin-routed.component';
import { CardFinderAdminUnroutedComponent } from './component/application/card/admin/unrouted/card-finder-admin-unrouted/card-finder-admin-unrouted.component';
import { DeckFinderAdminUnroutedComponent } from './component/application/deck/admin/unrouted/deck-finder-admin-unrouted/deck-finder-admin-unrouted.component';
import { CarddeckEditAdminRoutedComponent } from './component/application/carddeck/admin/routed/carddeck-edit-admin-routed/carddeck-edit-admin-routed.component';
import { CarddeckNewAdminRoutedComponent } from './component/application/carddeck/admin/routed/carddeck-new-admin-routed/carddeck-new-admin-routed.component';
import { PopupComponent } from './component/shared/unrouted/popup/popup.component';
import { GenerateComponent } from './component/shared/routed/generate/generate.component';
import { CardPlistUserRoutedComponent } from './component/application/card/user/routed/card-plist-user-routed/card-plist-user-routed.component';
import { CardDetailUserUnroutedComponent } from './component/application/card/user/unrouted/card-detail-user-unrouted/card-detail-user-unrouted.component';
import { PlayerInfoUserRoutedComponent } from './component/application/player/user/routed/player-info-user-routed/player-info-user-routed.component';
import { DeckPlistUserUnroutedComponent } from './component/application/deck/user/unrouted/deck-plist-user-unrouted/deck-plist-user-unrouted.component';

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
    PopupComponent,
    GenerateComponent,
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
    CarddeckEditAdminRoutedComponent,
    CarddeckNewAdminRoutedComponent,
    CardPlistUserRoutedComponent,
    CardDetailUserUnroutedComponent,
    PlayerInfoUserRoutedComponent,
    DeckPlistUserUnroutedComponent,
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
    PaginationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
