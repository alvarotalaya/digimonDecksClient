import { ICarddeck } from 'src/app/model/carddeck-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarddeckService } from 'src/app/service/carddeck.service';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-carddeck-view-admin-routed',
  templateUrl: './carddeck-view-admin-routed.component.html',
  styleUrls: ['./carddeck-view-admin-routed.component.css']
})
export class CarddeckViewAdminRoutedComponent implements OnInit {

  id: number = 0;
  oCarddeck: ICarddeck = null;
  strUsertype: string = "";

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oCarddeckService: CarddeckService,
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
    this.oCarddeckService.getOne(this.id).subscribe({
      next: (data: ICarddeck) => {
        this.oCarddeck = data;
        ;
      }
    })
  }

}

