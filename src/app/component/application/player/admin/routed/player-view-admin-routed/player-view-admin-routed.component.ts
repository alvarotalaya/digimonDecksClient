import { IPlayer } from 'src/app/model/player-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from 'src/app/service/player.service';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-player-view-admin-routed',
  templateUrl: './player-view-admin-routed.component.html',
  styleUrls: ['./player-view-admin-routed.component.css']
})
export class PlayerViewAdminRoutedComponent implements OnInit {

  id: number = 0;
  oPlayer: IPlayer = null;
  strUsertype: string = "";

  constructor(
    private oRouter: Router,
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

}
