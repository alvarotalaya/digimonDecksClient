import { IPlayer, IPlayer2Form, IPlayer2Send} from 'src/app/model/player-interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from 'src/app/service/player.service';
import { SessionService } from 'src/app/service/session.service';
declare let bootstrap: any;
@Component({
  selector: 'app-player-info-user-routed',
  templateUrl: './player-info-user-routed.component.html',
  styleUrls: ['./player-info-user-routed.component.css']
})
export class PlayerInfoUserRoutedComponent implements OnInit {

  oPlayer: IPlayer = null;
  oPlayer2Form: IPlayer2Form = null;
  oPlayer2Send: IPlayer2Send = null;
  oForm: FormGroup<IPlayer2Form>;
   // modal
   mimodal: string = "mimodal";
   myModal: any;
   modalTitle: string = "";
   modalContent: string = "";
  //
  strId: number = 0;
  id: number = 0;
  strEmail: string = "";
  edit: number = 0;

  constructor(
    private oRouter: Router,
    private oFormBuilder: FormBuilder,
    private oActivatedRoute: ActivatedRoute,
    private oPlayerService: PlayerService,
    private oSessionService: SessionService
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
    this.strEmail = this.oSessionService.getPlayer();
    if (this.strEmail == null) {
      this.oRouter.navigate(['/home']);
    } 
    this.oSessionService.getUserId().subscribe((n: number) => this.strId = n);
    if (this.strId == this.id) {
      this.oRouter.navigate(['/home']);
    } 
  }

  ngOnInit(): void {
    this.getOne();
  }

  getOne() {
    this.oPlayerService.getOne(this.id).subscribe({
      next: (data: IPlayer) => {
        this.oPlayer = data;
        this.oForm = <FormGroup>this.oFormBuilder.group({
          name: [data.name, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
          email: [data.email, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        });
        ;
      }
    })
  }

  changeEdit(){
    this.edit = 1;
  }

  onSubmit() {
    this.oPlayer2Send = {
      id: this.oPlayer.id,
      name: this.oForm.value.name,
      email: this.oForm.value.email,
      usertype: { id: 2}
    }
    if (this.oForm.valid) {
      this.oPlayerService.updateOne(this.oPlayer2Send).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle="DIGIMONDECKS";
          this.modalContent="Player updated";
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
      this.edit = 0
      window.location.reload();
    })
    this.myModal.show()
  }

}
