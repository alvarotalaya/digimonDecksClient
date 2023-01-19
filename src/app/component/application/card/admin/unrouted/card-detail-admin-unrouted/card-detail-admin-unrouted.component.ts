import { Component, Input, OnInit } from '@angular/core';
import { ICard } from 'src/app/model/card-interface';
import { CardService } from 'src/app/service/card.service';

@Component({
  selector: 'app-card-detail-admin-unrouted',
  templateUrl: './card-detail-admin-unrouted.component.html',
  styleUrls: ['./card-detail-admin-unrouted.component.css']
})
export class CardDetailAdminUnroutedComponent implements OnInit {

  @Input() id: number;
  oCard: ICard;

    constructor(
      private oCardService: CardService
    ) { }

    ngOnInit() {
      this.getOne();
    }

    getOne() {
      this.oCardService.getOne(this.id).subscribe({
        next: (data: ICard) => {
          this.oCard = data;
        }
      })
    }

    changeID(ev) {
      this.id = ev.target.value;
    }
  }
