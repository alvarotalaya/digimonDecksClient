import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDeck } from 'src/app/model/deck-interface';
import { DeckService } from 'src/app/service/deck.service';
import { SessionService } from 'src/app/service/session.service';
import { faEye, faUserPen, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { IPage } from 'src/app/model/generic-types-interface';


@Component({
  selector: 'app-deck-plist-admin-routed',
  templateUrl: './deck-plist-admin-routed.component.html',
  styleUrls: ['./deck-plist-admin-routed.component.css']
})
export class DeckPlistAdminRoutedComponent implements OnInit {

  responseFromServer: IPage<IDeck>;
  //
  strTermFilter: string = "";
  id_playerFilter: number = 0;
  numberOfElements: number = 5;
  page: number = 0;
  sortField: string = "";
  sortDirection: string = "";
  //
  faEye = faEye;
  faUserPen = faUserPen;
  faTrash = faTrash;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  //
  strUsertype: string = "";

  constructor(
    private oDeckService: DeckService,
    private oSessionService: SessionService,
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
  ) { 
    this.strUsertype = this.oSessionService.getUsertype();
    if (this.strUsertype != "1") {
      this.oRouter.navigate(['/home']);
    } 
  }

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oDeckService.getDecksPlist(this.page, this.numberOfElements, this.strTermFilter, this.id_playerFilter, this.sortField, this.sortDirection)
      .subscribe({
        next: (resp: IPage<IDeck>) => {
          this.responseFromServer = resp;
          console.log(resp)
          if (this.page > resp.totalPages - 1) {
            this.page = resp.totalPages - 1;
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })
  }

  setPage(e: number) {
    this.page = (e - 1);
    this.getPage();
  }

  setRpp(rpp: number) {
    this.numberOfElements = rpp;
    this.getPage();
  }

  setFilter(term: string): void {
    this.strTermFilter = term;
    this.getPage();
  }

  setFilterByPlayer(id: number): void {
    this.id_playerFilter = id;
    this.getPage();
    this.setPage(1);
  }

  setOrder(order: string): void {
    this.sortField = order;
    if (this.sortDirection == "asc") {
      this.sortDirection = "desc";
    } else {
      this.sortDirection = "asc";
    }
    this.getPage();
  }

}
