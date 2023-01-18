import { ICarddeck } from 'src/app/model/carddeck-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CarddeckService } from 'src/app/service/carddeck.service';
@Component({
  selector: 'app-carddeck-remove-admin-routed',
  templateUrl: './carddeck-remove-admin-routed.component.html',
  styleUrls: ['./carddeck-remove-admin-routed.component.css']
})
export class CarddeckRemoveAdminRoutedComponent implements OnInit {

  id: number = 0;
  oCarddeck: ICarddeck = null;
  msg: string = "";

  constructor(
    protected oLocation: Location,
    private oActivatedRoute: ActivatedRoute,
    private oCarddeckService: CarddeckService,
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
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

  removeOne() {
    this.oCarddeckService.removeOne(this.id).subscribe({
      next: (data: number) => {
        this.msg = "Carddeck " + this.id + " removed";        
        //open bootstrap modal here
        alert(this.msg);
        this.oLocation.back();
      }
    })
  }
}
