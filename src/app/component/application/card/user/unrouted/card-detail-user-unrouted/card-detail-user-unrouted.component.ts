import { ICard } from 'src/app/model/card-interface';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';
import { CardService } from 'src/app/service/card.service';
import { IDeck } from 'src/app/model/deck-interface';
import { DeckService } from 'src/app/service/deck.service';
import { CarddeckService } from 'src/app/service/carddeck.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IPage } from 'src/app/model/generic-types-interface';
import { ICarddeck2Form, ICarddeck2Send } from 'src/app/model/carddeck-interface';
declare let bootstrap: any;

@Component({
  selector: 'app-card-detail-user-unrouted',
  templateUrl: './card-detail-user-unrouted.component.html',
  styleUrls: ['./card-detail-user-unrouted.component.css']
})
export class CardDetailUserUnroutedComponent implements OnInit {

  _id: number = null;
  get id(): number{
    return this._id
  }

  @Input() set id(value: number){
    this._id = value;
    this.getOne();
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
  oCarddeck2Form: ICarddeck2Form = null;
  oCarddeck2Send: ICarddeck2Send = null;
  oForm: FormGroup<ICarddeck2Form>;ç
  // modal
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";
  //
  oCard: ICard = null;
  strUsertype: string = "";
  strEmail: string = "";

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oCardService: CardService,
    private oCarddeckService: CarddeckService,
    private oDeckService: DeckService,
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oSessionService: SessionService
  ) {
    this.strEmail = oSessionService.getPlayer();
    this.oSessionService.getUserId().subscribe((n: number) => this.id_playerFilter = n);
  }

  ngOnInit(): void {
    this.getPage();
    this.oForm = <FormGroup>this.oFormBuilder.group({
      id: [ , []],
      copies: [ ,[Validators.required, Validators.minLength(1), Validators.maxLength(1)]],
      iddeck: [ ,[]],
    });
  }

  getOne() {
    if(this.id){
      this.oCardService.getOne(this.id).subscribe({
        next: (data: ICard) => {
          this.oCard = data;
          console.log(data)
        }
      })
    }
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

  setFilter(term: string): void {
    this.strTermFilter = this.id.toString();
    this.getPage();
  }

  onSubmit() {
    this.oCarddeck2Send = {
      id: this.oForm.value.id,
      copies: this.oForm.value.copies,
      deck: { id: this.oForm.value.iddeck},
      card: { id: this.id }
    }
    if (this.oForm.valid) {
      this.oCarddeckService.newOne(this.oCarddeck2Send).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle = "DIGIMONDECKS";
          this.modalContent = "Card added";
          this.showModal(data);
        }
      })
    }

  }

  showModal = (data) => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.mimodal), { //pasar el myModal como parametro
      keyboard: false
    })
    var myModalEl = document.getElementById(this.mimodal);
    myModalEl.addEventListener('hidden.bs.modal', (event): void => {
    })
    this.myModal.show()
  }
}