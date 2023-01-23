import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faEye, faUserPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IPage } from 'src/app/model/generic-types-interface';
import { IDeck } from 'src/app/model/deck-interface';
import { SessionService } from 'src/app/service/session.service';
import { DeckService } from 'src/app/service/deck.service';

@Component({
  selector: 'app-deck-finder-admin-unrouted',
  templateUrl: './deck-finder-admin-unrouted.component.html',
  styleUrls: ['./deck-finder-admin-unrouted.component.css']
})
export class DeckFinderAdminUnroutedComponent implements OnInit {

  @Output() closeEvent = new EventEmitter<number>();

  responseFromServer: IPage<IDeck>;
  //
  strTermFilter: string = "";
  id_playerFilter: number = 0;
  numberOfElements: number = 5;
  page: number = 0;
  sortField: string = "";
  sortDirection: string = "";

  faEye = faEye;
  faUserPen = faUserPen;
  faTrash = faTrash;

  constructor(
    private oDeckService: DeckService,
    private oSessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.getPage();
  }

  getPage() {
    this.oDeckService.getDecksPlist(this.page, this.numberOfElements, this.strTermFilter, this.id_playerFilter, this.sortField, this.sortDirection)
      .subscribe({
        next: (resp: IPage<IDeck>) => {
          this.responseFromServer = resp;
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
    this.setPage(1);
  }

  setFilter(term: string): void {
    this.strTermFilter = term;
    this.getPage();
  }

  setFilterByPlayer(id: number): void {
    this.id_playerFilter = id;
    this.getPage();
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

  selectionDeck(id: number): void {
    this.closeEvent.emit(id);
  }

}

