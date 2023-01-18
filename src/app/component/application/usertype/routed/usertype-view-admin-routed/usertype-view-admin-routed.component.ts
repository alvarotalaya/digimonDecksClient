import { IUsertype } from 'src/app/model/usertype-interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsertypeService } from 'src/app/service/usertype.service';

@Component({
  selector: 'app-usertype-view-admin-routed',
  templateUrl: './usertype-view-admin-routed.component.html',
  styleUrls: ['./usertype-view-admin-routed.component.css']
})
export class UsertypeViewAdminRoutedComponent implements OnInit {

  id: number = 0;
  oUsertype: IUsertype = null;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oUsertypeService: UsertypeService,
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
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
