import { IUsertype } from 'src/app/model/usertype-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsertypeService } from 'src/app/service/usertype.service';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-usertype-view-admin-routed',
  templateUrl: './usertype-view-admin-routed.component.html',
  styleUrls: ['./usertype-view-admin-routed.component.css']
})
export class UsertypeViewAdminRoutedComponent implements OnInit {

  id: number = 0;
  oUsertype: IUsertype = null;
  strUsertype: string = "";

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oUsertypeService: UsertypeService,
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
    this.oUsertypeService.getOne(this.id).subscribe({
      next: (data: IUsertype) => {
        this.oUsertype = data;
        ;
      }
    })
  }

}
