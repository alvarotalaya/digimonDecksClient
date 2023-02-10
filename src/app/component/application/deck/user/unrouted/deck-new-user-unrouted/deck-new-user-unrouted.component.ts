import { IDeck2Form, IDeck2Send } from 'src/app/model/deck-interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDeck } from 'src/app/model/deck-interface';
import { DeckService } from 'src/app/service/deck.service';
import { PlayerService } from 'src/app/service/player.service';
import { SessionService } from 'src/app/service/session.service';
import { IPlayer } from 'src/app/model/player-interface';
declare let bootstrap: any;
@Component({
  selector: 'app-deck-new-user-unrouted',
  templateUrl: './deck-new-user-unrouted.component.html',
  styleUrls: ['./deck-new-user-unrouted.component.css']
})
export class DeckNewUserUnroutedComponent implements OnInit {

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
  strUsertype: string = "";
  PlayerId: number = null;

  constructor(
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    private oDeckService: DeckService,
    private oFormBuilder: FormBuilder,
    private oPlayerService: PlayerService,
    private oSessionService: SessionService
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
    this.strUsertype = this.oSessionService.getUsertype();
    this.oSessionService.getUserId().subscribe((n: number) => this.PlayerId = n);
    if (this.strUsertype != "1") {
      this.oRouter.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.oForm = <FormGroup>this.oFormBuilder.group({
      name: [ , [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      description: [ , [Validators.required, Validators.minLength(0), Validators.maxLength(100)]],
    });
  }

  onSubmit() {
    this.oDeck2Send = {
      id: null,
      name: this.oForm.value.name,
      description: this.oForm.value.description,
      lastupdate: null,
      player: { id: this.PlayerId}
    }
    if (this.oForm.valid) {
      this.oDeckService.newOne(this.oDeck2Send).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle="DIGIMONDECKS";
          this.modalContent="Deck " + this.oForm.value.name + " created";
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
      window.location.reload();
    })
    this.myModal.show()
  }

}
