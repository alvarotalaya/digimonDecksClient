import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ICarddeck } from 'src/app/model/carddeck-interface';
import { CarddeckService } from 'src/app/service/carddeck.service';
import { faEye, faUserPen, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { IPage } from 'src/app/model/generic-types-interface';

@Component({
  selector: 'app-carddeck-plist-admin-routed',
  templateUrl: './carddeck-plist-admin-routed.component.html',
  styleUrls: ['./carddeck-plist-admin-routed.component.css']
})
export class CarddeckPlistAdminRoutedComponent implements OnInit {

  responseFromServer: IPage<ICarddeck>;
  //
  strTermFilter: string = "";
  id_cardFilter: number = 0;
  id_deckFilter: number = 0;
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
    private oCarddeckService: CarddeckService
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oCarddeckService.getCarddecksPlist(this.page, this.numberOfElements, this.strTermFilter, this.id_deckFilter,this.id_cardFilter, this.sortField, this.sortDirection)
      .subscribe({
        next: (resp: IPage<ICarddeck>) => {
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

  setFilterByCard(id: number): void {
    this.id_cardFilter = id;
    this.getPage();
    this.setPage(1);
  }

  setFilterByDeck(id: number): void {
    this.id_deckFilter = id;
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

  generateCarddeck(){
    this.oCarddeckService.generate().subscribe({
      next: (resp: ICarddeck) => {
        this.setPage(this.responseFromServer.totalPages)
        this.getPage();
      }
    });
  }

}