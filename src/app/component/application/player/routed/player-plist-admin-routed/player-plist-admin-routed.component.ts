import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPlayer } from 'src/app/model/player-interface';
import { PlayerService } from 'src/app/service/player.service';
import { faEye, faUserPen, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { IPage } from 'src/app/model/generic-types-interface';

@Component({
  selector: 'app-player-plist-admin-routed',
  templateUrl: './player-plist-admin-routed.component.html',
  styleUrls: ['./player-plist-admin-routed.component.css']
})
export class PlayerPlistAdminRoutedComponent implements OnInit {

  responseFromServer: IPage<IPlayer>;
  //
  strTermFilter: string = "";
  id_usertypeFilter: number = 0;
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

  constructor(
    private oPlayerService: PlayerService
  ) { }

  ngOnInit() {
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

  generatePlayer(){

    this.oPlayerService.generate().subscribe({
      next: (resp: IPlayer) => {
        this.setPage(this.responseFromServer.totalPages)
        this.getPage();
      }
    });
  }

}
