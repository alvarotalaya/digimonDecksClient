import { IPlayer } from 'src/app/model/player-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-player-view-admin-routed',
  templateUrl: './player-view-admin-routed.component.html',
  styleUrls: ['./player-view-admin-routed.component.css']
})
export class PlayerViewAdminRoutedComponent implements OnInit {

  id: number = 0;
  oPlayer: IPlayer = null;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oPlayerService: PlayerService,
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
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
