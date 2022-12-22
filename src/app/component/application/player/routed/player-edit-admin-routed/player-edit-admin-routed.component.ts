import { IPlayer2Form, IPlayer2Send } from 'src/app/model/player-interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPlayer } from 'src/app/model/player-interface';
import { PlayerService } from 'src/app/service/player.service';
import { UsertypeService } from 'src/app/service/usertype.service';
import { IUsertype } from 'src/app/model/usertype-interface';
declare let bootstrap: any;

@Component({
  selector: 'app-player-edit-admin-routed',
  templateUrl: './player-edit-admin-routed.component.html',
  styleUrls: ['./player-edit-admin-routed.component.css']
})
export class PlayerEditAdminRoutedComponent implements OnInit {

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
  // foreigns
  UsertypeDescription: string = "";

  constructor(
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    private oPlayerService: PlayerService,
    private oFormBuilder: FormBuilder,
    private oUsertypeService: UsertypeService,
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getOne();
  }

  getOne() {
    this.oPlayerService.getOne(this.id).subscribe({
      next: (data: IPlayer) => {
        this.oPlayer = data;
        console.log(data);
        this.oForm = <FormGroup>this.oFormBuilder.group({
          id: [data.id, [Validators.required]],
          name: [data.name, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
          email: [data.email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
          idusertype: [data.usertype.id, [Validators.required, Validators.pattern(/^\d{1,6}$/)]]
        });
        this.updateUsertypeDescription(this.oPlayer.usertype.id);
      }
    })
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
      this.oPlayerService.updateOne(this.oPlayer2Send).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle="DIGIMONDECKS";
          this.modalContent="Player " + this.id + " updated";
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
      this.oRouter.navigate(['/admin/player/view', this.id])
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

