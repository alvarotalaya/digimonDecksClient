import { IPlayer } from 'src/app/model/player-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from 'src/app/service/player.service';
import { SessionService } from 'src/app/service/session.service';
@Component({
  selector: 'app-player-info-user-routed',
  templateUrl: './player-info-user-routed.component.html',
  styleUrls: ['./player-info-user-routed.component.css']
})
export class PlayerInfoUserRoutedComponent implements OnInit {

  strId: number = 0;
  id: number = 0;
  oPlayer: IPlayer = null;
  strEmail: string = "";

  constructor(
    private oRouter: Router,
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
