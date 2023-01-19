import { ICard } from 'src/app/model/card-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CardService } from 'src/app/service/card.service';

@Component({
  selector: 'app-card-remove-admin-routed',
  templateUrl: './card-remove-admin-routed.component.html',
  styleUrls: ['./card-remove-admin-routed.component.css']
})
export class CardRemoveAdminRoutedComponent implements OnInit {

  id: number = 0;
  oCard: ICard = null;
  msg: string = "";

  constructor(
    protected oLocation: Location,
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
