import { ICard } from 'src/app/model/card-interface';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';
import { CardService } from 'src/app/service/card.service';

@Component({
  selector: 'app-card-detail-user-unrouted',
  templateUrl: './card-detail-user-unrouted.component.html',
  styleUrls: ['./card-detail-user-unrouted.component.css']
})
export class CardDetailUserUnroutedComponent implements OnInit {

  _id: number = null;
  get id(): number{
    return this._id
  }

  @Input() set id(value: number){
    this._id = value;
    this.getOne();
  }

  oCard: ICard = null;
  strUsertype: string = "";

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oCardService: CardService,
    private oRouter: Router,
    private oSessionService: SessionService
  ) { }

  ngOnInit(): void {

  }

  getOne() {
    if(this.id){
      this.oCardService.getOne(this.id).subscribe({
        next: (data: ICard) => {
          this.oCard = data;
          console.log(data)
        }
      })
    }
    }
}