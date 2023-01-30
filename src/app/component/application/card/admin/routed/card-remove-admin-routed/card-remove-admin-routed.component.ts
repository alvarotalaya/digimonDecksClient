import { ICard } from 'src/app/model/card-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CardService } from 'src/app/service/card.service';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-card-remove-admin-routed',
  templateUrl: './card-remove-admin-routed.component.html',
  styleUrls: ['./card-remove-admin-routed.component.css']
})
export class CardRemoveAdminRoutedComponent implements OnInit {

  id: number = 0;
  oCard: ICard = null;
  msg: string = "";
  strUsertype:  string = "";

  constructor(
    protected oLocation: Location,
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

  removeOne() {
    this.oCardService.removeOne(this.id).subscribe({
      next: (data: number) => {
        this.msg = "Card " + this.id + " removed";        
        //open bootstrap modal here
        alert(this.msg);
        this.oLocation.back();
      }
    })
  }
}
