import { IDeck } from 'src/app/model/deck-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeckService } from 'src/app/service/deck.service';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-deck-view-admin-routed',
  templateUrl: './deck-view-admin-routed.component.html',
  styleUrls: ['./deck-view-admin-routed.component.css']
})
export class DeckViewAdminRoutedComponent implements OnInit {

  id: number = 0;
  oDeck: IDeck = null;
  strUsertype: string = "";

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oDeckService: DeckService,
    private oRouter: Router,
    private oSessionService: SessionService
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
    this.strUsertype = this.oSessionService.getUsertype();
    if (this.strUsertype != "1") {
      this.oRouter.navigate(['/home']);
    } 
  }

  ngOnInit(): void {
    this.getOne();
  }

  getOne() {
    this.oDeckService.getOne(this.id).subscribe({
      next: (data: IDeck) => {
        this.oDeck = data;
        ;
      }
    })
  }

}
