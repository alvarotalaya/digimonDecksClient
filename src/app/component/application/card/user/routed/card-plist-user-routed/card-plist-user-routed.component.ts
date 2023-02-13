import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ICard } from 'src/app/model/card-interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/service/card.service';
import { SessionService } from 'src/app/service/session.service';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { IPage } from 'src/app/model/generic-types-interface';
declare let bootstrap: any;

@Component({
  selector: 'app-card-plist-user-routed',
  templateUrl: './card-plist-user-routed.component.html',
  styleUrls: ['./card-plist-user-routed.component.css']
})
export class CardPlistUserRoutedComponent implements OnInit {

  responseFromServer: IPage<ICard>;
  //
  strTermFilter: string = "";
  id_CardFilter: number = 0;
  numberOfElements: number = 5;
  page: number = 0;
  sortField: string = "";
  sortDirection: string = "";
  //
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  //
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

  idCard: number = null;
  bLoading:boolean=false;
  strResult: string;
  strUsertype: string = "";

  constructor(
    private oCardService: CardService,
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    private oSessionService: SessionService
  ) { 
    const expansion =  this.oActivatedRoute.snapshot.params['expansion'];
    if(expansion == "cards"){
        this.strTermFilter = "";
    }else{
        this.strTermFilter = expansion;
        this.sortDirection = "asc"
        this.sortField = "cardnumber"
    }
  }

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oCardService.getCardsPlist(this.page, this.numberOfElements, this.strTermFilter, this.sortField, this.sortDirection)
      .subscribe({
        next: (resp: IPage<ICard>) => {
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

  setDirection(direction: string): void{
    if (direction == "asc") {
      this.sortDirection = "asc";
    } else {
      this.sortDirection = "desc";
    }
    this.getPage();
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

}