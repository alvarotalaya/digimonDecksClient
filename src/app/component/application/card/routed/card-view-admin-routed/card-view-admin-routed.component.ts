import { ICard } from 'src/app/model/card-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from 'src/app/service/card.service';
@Component({
  selector: 'app-card-view-admin-routed',
  templateUrl: './card-view-admin-routed.component.html',
  styleUrls: ['./card-view-admin-routed.component.css']
})
export class CardViewAdminRoutedComponent implements OnInit {

  id: number = 0;
  oCard: ICard = null;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oCardService: CardService,
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getOne();
  }

  getOne() {
    this.oCardService.getOne(this.id).subscribe({
      next: (data: ICard) => {
        this.oCard = data;
      }
    })
  }

}
