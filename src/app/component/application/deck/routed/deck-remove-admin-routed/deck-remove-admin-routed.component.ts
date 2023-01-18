import { IDeck } from 'src/app/model/deck-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DeckService } from 'src/app/service/deck.service';

@Component({
  selector: 'app-deck-remove-admin-routed',
  templateUrl: './deck-remove-admin-routed.component.html',
  styleUrls: ['./deck-remove-admin-routed.component.css']
})
export class DeckRemoveAdminRoutedComponent implements OnInit {
  id: number = 0;
  oDeck: IDeck = null;
  msg: string = "";

  constructor(
    protected oLocation: Location,
    private oActivatedRoute: ActivatedRoute,
    private oDeckService: DeckService,
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getOne();
  }

  getOne() {
    this.oDeckService.getOne(this.id).subscribe({
      next: (data: IDeck) => {
        this.oDeck = data;
        console.log(data);
      }
    })
  }

  removeOne() {
    this.oDeckService.removeOne(this.id).subscribe({
      next: (data: number) => {
        this.msg = "Deck " + this.id + " removed";        
        //open bootstrap modal here
        alert(this.msg);
        this.oLocation.back();
      }
    })
  }
}