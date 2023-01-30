import { IUsertype } from 'src/app/model/usertype-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsertypeService } from 'src/app/service/usertype.service';
import { SessionService } from 'src/app/service/session.service';
@Component({
  selector: 'app-usertype-remove-admin-routed',
  templateUrl: './usertype-remove-admin-routed.component.html',
  styleUrls: ['./usertype-remove-admin-routed.component.css']
})
export class UsertypeRemoveAdminRoutedComponent implements OnInit {

  id: number = 0;
  oUsertype: IUsertype = null;
  msg: string = "";
  strUsertype = "";

  constructor(
    protected oLocation: Location,
    private oActivatedRoute: ActivatedRoute,
    private oUsertypeService: UsertypeService,
    private oSessionService: SessionService,
    private oRouter: Router
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

  removeOne() {
    this.oUsertypeService.removeOne(this.id).subscribe({
      next: (data: number) => {
        this.msg = "Usertype " + this.id + " removed";        
        //open bootstrap modal here
        alert(this.msg);
        this.oLocation.back();
      }
    })
  }
}
