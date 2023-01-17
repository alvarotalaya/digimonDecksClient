import { IDeck } from 'src/app/model/deck-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeckService } from 'src/app/service/deck.service';

@Component({
  selector: 'app-deck-view-admin-routed',
  templateUrl: './deck-view-admin-routed.component.html',
  styleUrls: ['./deck-view-admin-routed.component.css']
})
export class DeckViewAdminRoutedComponent implements OnInit {

  id: number = 0;
  oDeck: IDeck = null;

  constructor(
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

}
