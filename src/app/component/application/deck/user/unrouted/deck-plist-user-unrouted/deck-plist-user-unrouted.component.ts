import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDeck } from 'src/app/model/deck-interface';
import { DeckService } from 'src/app/service/deck.service';
import { SessionService } from 'src/app/service/session.service';
import { faEye, faUserPen, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { IPage } from 'src/app/model/generic-types-interface';
declare let bootstrap: any;

@Component({
  selector: 'app-deck-plist-user-unrouted',
  templateUrl: './deck-plist-user-unrouted.component.html',
  styleUrls: ['./deck-plist-user-unrouted.component.css']
})
export class DeckPlistUserUnroutedComponent implements OnInit {

  _id: number = null;
  get id(): number{
    return this._id
  }

  @Input() set id(value: number){
    this._id = value;
    this.id_playerFilter = value;
  }

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
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";
  //
  strUsertype: string = "";
  msg: string = "";
  idRemove: number = null;

  constructor(
    private oDeckService: DeckService,
    private oSessionService: SessionService,
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
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

  removeOne() {
    this.oDeckService.removeOne(this.idRemove).subscribe({
      next: (data: number) => {
        this.msg = "Deck removed";        
        //open bootstrap modal here
        alert(this.msg);
        this.closeRemove();
        window.location.reload();
      }
    })
  }

  openModalRemove(remove: number): void {
    this.myModal = new bootstrap.Modal(document.getElementById("removeDeck"), { //pasar el myModal como parametro
      keyboard: false
    })
    this.idRemove = remove;
    this.myModal.show()
  }

  closeRemove() {
    this.myModal.hide();
  }


}
