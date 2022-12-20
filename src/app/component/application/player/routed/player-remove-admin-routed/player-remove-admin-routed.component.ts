import { IPlayer } from 'src/app/model/player-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-player-remove-admin-routed',
  templateUrl: './player-remove-admin-routed.component.html',
  styleUrls: ['./player-remove-admin-routed.component.css']
})
export class PlayerRemoveAdminRoutedComponent implements OnInit {

  id: number = 0;
  oPlayer: IPlayer = null;
  msg: string = "";

  constructor(
    protected oLocation: Location,
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
        console.log(data);
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
