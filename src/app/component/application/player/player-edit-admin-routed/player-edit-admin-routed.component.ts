import { IPlayer2Form, IPlayer2Send } from 'src/app/model/player-interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPlayer } from 'src/app/model/player-interface';
import { PlayerService } from 'src/app/service/player.service';
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
  oForm: FormGroup<IPlayer2Form>;
  // modal
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

  constructor(
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    private oPlayerService: PlayerService,
    private oFormBuilder: FormBuilder
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
        });
      }
    })
  }

  onSubmit() {
    console.log("onSubmit");
    this.oPlayer2Form = {
      id: new FormControl(this.oForm.value.id),
      name: new FormControl(this.oForm.value.name),
      email: new FormControl(this.oForm.value.email),
      usertype: new FormControl({
        id: this.oPlayer.usertype.id
      })
    }
    if (this.oForm.valid) {
      this.oPlayerService.updateOne(this.oPlayer2Form).subscribe({
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
      this.oRouter.navigate(['/admin/Player/view', this.id])
    })
    this.myModal.show()
  }

}
