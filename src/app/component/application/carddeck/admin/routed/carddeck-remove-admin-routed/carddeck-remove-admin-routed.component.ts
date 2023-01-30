import { ICarddeck } from 'src/app/model/carddeck-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/service/session.service';
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
  strUsertype: string = "";

  constructor(
    protected oLocation: Location,
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
