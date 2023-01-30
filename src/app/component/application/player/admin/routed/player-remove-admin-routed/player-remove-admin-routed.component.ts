import { IPlayer } from 'src/app/model/player-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PlayerService } from 'src/app/service/player.service';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-player-remove-admin-routed',
  templateUrl: './player-remove-admin-routed.component.html',
  styleUrls: ['./player-remove-admin-routed.component.css']
})
export class PlayerRemoveAdminRoutedComponent implements OnInit {

  id: number = 0;
  oPlayer: IPlayer = null;
  msg: string = "";
  strUsertype: string = "";

  constructor(
    private oRouter: Router,
    protected oLocation: Location,
    private oActivatedRoute: ActivatedRoute,
    private oPlayerService: PlayerService,
    private oSessionService: SessionService
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
    this.strUsertype = this.oSessionService.getUsertype();
    if (this.strUsertype != "1") {
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
        ;
      }
    })
  }

  removeOne() {
    this.oPlayerService.removeOne(this.id).subscribe({
      next: (data: number) => {
        this.msg = "Player " + this.id + " removed";        
        //open bootstrap modal here
        alert(this.msg);
        this.oLocation.back();
      }
    })
  }
}
