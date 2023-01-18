import { IDeck2Form, IDeck2Send } from 'src/app/model/deck-interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDeck } from 'src/app/model/deck-interface';
import { DeckService } from 'src/app/service/deck.service';
import { PlayerService } from 'src/app/service/player.service';
import { IPlayer } from 'src/app/model/player-interface';
declare let bootstrap: any;

@Component({
  selector: 'app-deck-new-admin-routed',
  templateUrl: './deck-new-admin-routed.component.html',
  styleUrls: ['./deck-new-admin-routed.component.css']
})
export class DeckNewAdminRoutedComponent implements OnInit {

  id: number = 0;
  oDeck: IDeck = null;
  oDeck2Form: IDeck2Form = null;
  oDeck2Send: IDeck2Send = null;
  oForm: FormGroup<IDeck2Form>;
  // modal
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";
  // foreigns
  PlayerDescription: string = "";

  constructor(
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    private oDeckService: DeckService,
    private oFormBuilder: FormBuilder,
    private oPlayerService: PlayerService,
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.oForm = <FormGroup>this.oFormBuilder.group({
      id: [ , [Validators.required]],
      name: [ , [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      description: [ , [Validators.required, Validators.minLength(0), Validators.maxLength(100)]],
      lastupdate: [ , [Validators.required, Validators.minLength(0), Validators.maxLength(100)]],
      idplayer: [ , [Validators.required, Validators.pattern(/^\d{1,6}$/)]]
    });
    this.updatePlayerDescription(this.oDeck.player.id);
  }

  onSubmit() {
    this.oDeck2Send = {
      id: this.oForm.value.id,
      name: this.oForm.value.name,
      description: this.oForm.value.description,
      lastupdate: this.oForm.value.lastupdate,
      player: { id: this.oForm.value.idplayer }
    }
    if (this.oForm.valid) {
      this.oDeckService.updateOne(this.oDeck2Send).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle="DIGIMONDECKS";
          this.modalContent="Deck " + this.id + " updated";
          this.showModal();
        }
      })
    }
  }

  showModal = () => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.mimodal), { //pasar el myModal como parametro
      keyboard: false
    })
    var myModalEl = document.getElementById(this.mimodal);
    myModalEl.addEventListener('hidden.bs.modal', (event): void => {
      this.oRouter.navigate(['/admin/deck/view', this.id])
    })
    this.myModal.show()
  }
  
  openModalFindPlayer(): void {
    this.myModal = new bootstrap.Modal(document.getElementById("findplayer"), { //pasar el myModal como parametro
      keyboard: false
    })
    this.myModal.show()
  }

  closePlayerModal(id_player: number) {
    this.oForm.controls['idplayer'].setValue(id_player);
    this.updatePlayerDescription(id_player);
    this.oForm.markAsDirty();
    this.myModal.hide();
  }

  updatePlayerDescription(id_Player: number) {
    this.oPlayerService.getOne(id_Player).subscribe({
      next: (data: IPlayer) => {
        this.PlayerDescription = data.name;
      },
      error: (error: any) => {
        this.PlayerDescription = "Player not found";
        this.oForm.controls['id_Player'].setErrors({'incorrect': true});
      }
    })
  }

}


