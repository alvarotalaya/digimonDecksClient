import { ICarddeck } from 'src/app/model/carddeck-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarddeckService } from 'src/app/service/carddeck.service';

@Component({
  selector: 'app-carddeck-view-admin-routed',
  templateUrl: './carddeck-view-admin-routed.component.html',
  styleUrls: ['./carddeck-view-admin-routed.component.css']
})
export class CarddeckViewAdminRoutedComponent implements OnInit {

  id: number = 0;
  oCarddeck: ICarddeck = null;

  constructor(
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

}

