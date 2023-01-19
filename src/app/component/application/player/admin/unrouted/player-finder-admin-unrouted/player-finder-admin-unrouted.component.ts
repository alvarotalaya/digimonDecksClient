import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faEye, faUserPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IPage } from 'src/app/model/generic-types-interface';
import { IPlayer } from 'src/app/model/player-interface';
import { SessionService } from 'src/app/service/session.service';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-player-finder-admin-unrouted',
  templateUrl: './player-finder-admin-unrouted.component.html',
  styleUrls: ['./player-finder-admin-unrouted.component.css']
})
export class PlayerFinderAdminUnroutedComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<number>();

  responseFromServer: IPage<IPlayer>;
  //
  strTermFilter: string = "";
  id_usertypeFilter: number = 0;
  numberOfElements: number = 5;
  page: number = 0;
  sortField: string = "";
  sortDirection: string = "";

  faEye = faEye;
  faUserPen = faUserPen;
  faTrash = faTrash;

  constructor(
    private oPlayerService: PlayerService,
    private oSessionService: SessionService
  ) { }

  ngOnInit(): void {
      localStorage.getItem;
    this.getPage();
  }

  getPage() {
    this.oPlayerService.getPlayersPlist(this.page, this.numberOfElements, this.strTermFilter, this.id_usertypeFilter, this.sortField, this.sortDirection)
      .subscribe({
        next: (resp: IPage<IPlayer>) => {
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

  setFilterByUsertype(id: number): void {
    this.id_usertypeFilter = id;
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

  selectionPlayer(id: number): void {
    this.closeEvent.emit(id);
  }

}