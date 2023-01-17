import { Component, Input, OnInit } from '@angular/core';
import { IDeck } from 'src/app/model/deck-interface';
import { DeckService } from 'src/app/service/deck.service';

@Component({
  selector: 'app-deck-detail-admin-unrouted',
  templateUrl: './deck-detail-admin-unrouted.component.html',
  styleUrls: ['./deck-detail-admin-unrouted.component.css']
})
export class DeckDetailAdminUnroutedComponent implements OnInit {

  @Input() id: number;
  oDeck: IDeck;

    constructor(
      private oDeckService: DeckService
    ) { }

    ngOnInit() {
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

    changeID(ev) {
      this.id = ev.target.value;
    }

  }
