import { ICard } from 'src/app/model/card-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';
import { CardService } from 'src/app/service/card.service';
@Component({
  selector: 'app-card-view-admin-routed',
  templateUrl: './card-view-admin-routed.component.html',
  styleUrls: ['./card-view-admin-routed.component.css']
})
export class CardViewAdminRoutedComponent implements OnInit {

  id: number = 0;
  oCard: ICard = null;
  strUsertype: string = "";

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oCardService: CardService,
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
    this.oCardService.getOne(this.id).subscribe({
      next: (data: ICard) => {
        this.oCard = data;
      }
    })
  }

}
