import { IPlayer2Form, IPlayer2Send } from 'src/app/model/player-interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPlayer } from 'src/app/model/player-interface';
import { PlayerService } from 'src/app/service/player.service';
declare let bootstrap: any;

@Component({
  selector: 'app-player-new-admin-routed',
  templateUrl: './player-new-admin-routed.component.html',
  styleUrls: ['./player-new-admin-routed.component.css']
})
export class PlayerNewAdminRoutedComponent implements OnInit {

  id: number = 0;
  oPlayer: IPlayer = null;
  oPlayer2Form: IPlayer2Form = null;
  oPlayer2Send: IPlayer2Send = null;
  oForm: FormGroup<IPlayer2Form>;
  // modal
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

  constructor(
    private oRouter: Router,
    private oPlayerService: PlayerService,
    private oFormBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.oForm = <FormGroup>this.oFormBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      idusertype: [[Validators.required, Validators.pattern(/^\d{1,6}$/)]]
    });
  }

  onSubmit() {
    console.log("onSubmit");
    this.oPlayer2Form = {
      id: new FormControl(this.oForm.value.id),
      name: new FormControl(this.oForm.value.name),
      email: new FormControl(this.oForm.value.email),
      idusertype: new FormControl(this.oForm.value.idusertype)
    }
    if (this.oForm.valid) {
      this.oPlayerService.newOne(this.oPlayer2Send).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle = "DIGIMONDECKS";
          this.modalContent = "Player " + data + " created";
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
      this.oRouter.navigate(['/admin/player/view', data])
    })
    this.myModal.show()
  }
}
