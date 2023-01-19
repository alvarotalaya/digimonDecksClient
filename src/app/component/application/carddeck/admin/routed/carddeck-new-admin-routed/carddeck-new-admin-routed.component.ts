import { ICarddeck2Form, ICarddeck2Send } from 'src/app/model/carddeck-interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICarddeck } from 'src/app/model/carddeck-interface';
import { IDeck } from 'src/app/model/deck-interface';
import { ICard } from 'src/app/model/card-interface';
import { CarddeckService } from 'src/app/service/carddeck.service';
import { DeckService } from 'src/app/service/deck.service';
import { CardService } from 'src/app/service/card.service';
declare let bootstrap: any;
@Component({
  selector: 'app-carddeck-new-admin-routed',
  templateUrl: './carddeck-new-admin-routed.component.html',
  styleUrls: ['./carddeck-new-admin-routed.component.css']
})
export class CarddeckNewAdminRoutedComponent implements OnInit {
  id: number = 0;
  oCarddeck: ICarddeck = null;
  oCarddeck2Form: ICarddeck2Form = null;
  oCarddeck2Send: ICarddeck2Send = null;
  oForm: FormGroup<ICarddeck2Form>;
  // modal
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";
  // foreigns
  CarddeckDescription: string = "";
  DeckDescription: string = "";
  CardDescription: string = "";

  constructor(
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    private oCarddeckService: CarddeckService,
    private oDeckService: DeckService,
    private oCardService: CardService,
    private oFormBuilder: FormBuilder,
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.oForm = <FormGroup>this.oFormBuilder.group({
      id: [ , []],
      copies: [ , [Validators.required, Validators.minLength(1), Validators.maxLength(1)]],
      iddeck: [ , [Validators.required, Validators.pattern(/^\d{1,6}$/)]],
      idcard: [ , [Validators.required, Validators.pattern(/^\d{1,6}$/)]]
    });
    this.updateDeckDescription(this.oCarddeck.deck.id);
    this.updateCardDescription(this.oCarddeck.card.id);
  }

  onSubmit() {
    this.oCarddeck2Send = {
      id: this.oForm.value.id,
      copies: this.oForm.value.copies,
      deck: { id: this.oForm.value.iddeck },
      card: { id: this.oForm.value.idcard }
    }
    if (this.oForm.valid) {
      this.oCarddeckService.newOne(this.oCarddeck2Send).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle = "DIGIMONDECKS";
          this.modalContent = "Carddeck " + data + " created";
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
      this.oRouter.navigate(['/admin/carddeck/view', data])
    })
    this.myModal.show()
  }

  openModalFindDeck(): void {
    this.myModal = new bootstrap.Modal(document.getElementById("finddeck"), { //pasar el myModal como parametro
      keyboard: false
    })
    this.myModal.show()
  }

  closeDeckModal(id_deck: number) {
    this.oForm.controls['iddeck'].setValue(id_deck);
    this.updateDeckDescription(id_deck);
    this.oForm.markAsDirty();
    this.myModal.hide();
  }

  updateDeckDescription(id_deck: number) {
    this.oDeckService.getOne(id_deck).subscribe({
      next: (data: IDeck) => {
        this.DeckDescription = data.name;
      },
      error: (error: any) => {
        this.DeckDescription = "Deck not found";
        this.oForm.controls['id_deck'].setErrors({'incorrect': true});
      }
    })
  }

  openModalFindCard(): void {
    this.myModal = new bootstrap.Modal(document.getElementById("findcard"), { //pasar el myModal como parametro
      keyboard: false
    })
    this.myModal.show()
  }

  closeCardModal(id_card: number) {
    this.oForm.controls['idcard'].setValue(id_card);
    this.updateCardDescription(id_card);
    this.oForm.markAsDirty();
    this.myModal.hide();
  }

  updateCardDescription(id_card: number) {
    this.oCardService.getOne(id_card).subscribe({
      next: (data: ICard) => {
        this.CardDescription = data.name;
      },
      error: (error: any) => {
        this.CardDescription = "Card not found";
        this.oForm.controls['id_card'].setErrors({'incorrect': true});
      }
    })
  }
}
