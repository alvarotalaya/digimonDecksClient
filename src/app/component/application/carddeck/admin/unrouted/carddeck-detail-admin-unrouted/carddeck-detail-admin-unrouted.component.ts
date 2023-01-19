import { Component, Input, OnInit } from '@angular/core';
import { ICarddeck } from 'src/app/model/carddeck-interface';
import { CarddeckService } from 'src/app/service/carddeck.service';

@Component({
  selector: 'app-carddeck-detail-admin-unrouted',
  templateUrl: './carddeck-detail-admin-unrouted.component.html',
  styleUrls: ['./carddeck-detail-admin-unrouted.component.css']
})
export class CarddeckDetailAdminUnroutedComponent implements OnInit {

  @Input() id: number;
  oCarddeck: ICarddeck;

    constructor(
      private oCarddeckService: CarddeckService
    ) { }

    ngOnInit() {
      this.getOne();
    }

    getOne() {
      this.oCarddeckService.getOne(this.id).subscribe({
        next: (data: ICarddeck) => {
          this.oCarddeck = data;
          ;
        }
      })
    }

    changeID(ev) {
      this.id = ev.target.value;
    }

  }

