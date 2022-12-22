import { IPlayer2Form, IPlayer2Send } from 'src/app/model/player-interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPlayer } from 'src/app/model/player-interface';
import { UsertypeService } from 'src/app/service/usertype.service';
import { PlayerService } from 'src/app/service/player.service';
import { IUsertype } from 'src/app/model/usertype-interface';
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
  //foreign
  UsertypeDescription: string = "";

  constructor(
    private oRouter: Router,
    private oPlayerService: PlayerService,
    private oUsertypeService: UsertypeService,
    private oFormBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.oForm = <FormGroup>this.oFormBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      idusertype: ['', [Validators.required, Validators.pattern(/^\d{1,6}$/)]]
    });
    this.updateUsertypeDescription(this.oPlayer.usertype.id)
  }

  onSubmit() {
    console.log("onSubmit");
    this.oPlayer2Send = {
      id: this.oForm.value.id,
      name: this.oForm.value.name,
      email: this.oForm.value.email,
      usertype: { id: this.oForm.value.idusertype }
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

  openModalFindUsertype(): void {
    this.myModal = new bootstrap.Modal(document.getElementById("findusertype"), { //pasar el myModal como parametro
      keyboard: false
    })
    this.myModal.show()
  }

  closeUsertypeModal(id_usertype: number) {
    this.oForm.controls['idusertype'].setValue(id_usertype);
    this.updateUsertypeDescription(id_usertype);
    this.myModal.hide();
  }

  updateUsertypeDescription(id_usertype: number) {
    this.oUsertypeService.getOne(id_usertype).subscribe({
      next: (data: IUsertype) => {
        this.UsertypeDescription = data.type;
      },
      error: (error: any) => {
        this.UsertypeDescription = "Usertype not found";
        this.oForm.controls['id_usertype'].setErrors({'incorrect': true});
      }
    })
  }

}

