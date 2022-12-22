import { Component, OnInit } from '@angular/core';
import { IPlayer } from 'src/app/model/player-interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  oPlayerSession: IPlayer;
  

  constructor() { 
    this.oPlayerSession = JSON.parse(localStorage.getItem("player"));
  }

  ngOnInit() {
  }

}
