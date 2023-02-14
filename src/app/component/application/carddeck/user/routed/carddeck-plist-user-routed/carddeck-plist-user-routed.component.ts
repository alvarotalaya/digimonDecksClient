import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICarddeck, ICarddeck2Send } from 'src/app/model/carddeck-interface';
import { IDeck } from 'src/app/model/deck-interface';
import { ICard } from 'src/app/model/card-interface';
import { SessionService } from 'src/app/service/session.service';
import { CarddeckService } from 'src/app/service/carddeck.service';
import { faEye, faUserPen, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { IPage } from 'src/app/model/generic-types-interface';
declare let bootstrap: any;

@Component({
  selector: 'app-carddeck-plist-user-routed',
  templateUrl: './carddeck-plist-user-routed.component.html',
  styleUrls: ['./carddeck-plist-user-routed.component.css']
})
export class CarddeckPlistUserRoutedComponent implements OnInit {

  responseFromServer: IPage<ICarddeck>;
  //
  oCarddeck2Send: ICarddeck2Send = null;
  strTermFilter: string = "";
  id_cardFilter: number = 0;
  id_deckFilter: number = 0;
  numberOfElements: number = 50;
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
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";
  //
  idCard: number = null;
  strUsertype: string = "";
  id: number = 0;
  //
  datos: string = "";
  plus: string = "plus";
  minus: string = "minus"

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oCarddeckService: CarddeckService,
    private oRouter: Router,
    private oSessionService: SessionService
  ) { 
    this.id = oActivatedRoute.snapshot.params['id'];
    this.id_deckFilter = this.id;
  }

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

  setOrder(order: string): void {
    this.sortField = order;
    if (this.sortDirection == "asc") {
      this.sortDirection = "desc";
    } else {
      this.sortDirection = "asc";
    }
    this.getPage();
  }

  setDirection(direction: string): void{
    if (direction == "asc") {
      this.sortDirection = "asc";
    } else {
      this.sortDirection = "desc";
    }
    this.getPage();
  }


  openModalCard(idCard: number): void {
    this.myModal = new bootstrap.Modal(document.getElementById("carddetail"), { //pasar el myModal como parametro
      keyboard: false
    })
    this.idCard = idCard;
    this.myModal.show()
  }

  closeCardModal() {
    this.myModal.hide();
  }

  changeCopies(idCarddeck:number, copiesSend:number, idCard:number, idDeck:number, signe:string){
    if(signe == "plus"){
      copiesSend++;
    } else if (signe == "minus"){
      copiesSend--;
    }
    this.oCarddeck2Send = {
      id: idCarddeck,
      copies: copiesSend,
      card: {id: idCard},
      deck: {id: idDeck}
    }
    this.oCarddeckService.updateOne(this.oCarddeck2Send).subscribe({
      next: (data: number) => {
        window.location.reload();
      }
    })
  }
}
