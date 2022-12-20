import { Component, Input, OnInit } from '@angular/core';
import { IPlayer } from 'src/app/model/player-interface';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-player-detail-admin-unrouted',
  templateUrl: './player-detail-admin-unrouted.component.html',
  styleUrls: ['./player-detail-admin-unrouted.component.css']
})
export class PlayerDetailAdminUnroutedComponent implements OnInit {

  @Input() id: number;
    oPlayer: IPlayer;

    constructor(
      private oPlayerService: PlayerService
    ) { }

    ngOnInit() {
      this.getOne();
    }

    getOne() {
      this.oPlayerService.getOne(this.id).subscribe({
        next: (data: IPlayer) => {
          this.oPlayer = data;
          console.log(data);
        }
      })
    }

    changeID(ev) {
      this.id = ev.target.value;
    }

  }


