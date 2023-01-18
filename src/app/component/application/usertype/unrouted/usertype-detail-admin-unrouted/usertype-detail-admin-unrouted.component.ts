import { Component, Input, OnInit } from '@angular/core';
import { IUsertype } from 'src/app/model/usertype-interface';
import { UsertypeService } from 'src/app/service/usertype.service';

@Component({
  selector: 'app-usertype-detail-admin-unrouted',
  templateUrl: './usertype-detail-admin-unrouted.component.html',
  styleUrls: ['./usertype-detail-admin-unrouted.component.css']
})
export class UsertypeDetailAdminUnroutedComponent implements OnInit {

  @Input() id: number;
  oUsertype: IUsertype;

    constructor(
      private oUsertypeService: UsertypeService
    ) { }

    ngOnInit() {
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

    changeID(ev) {
      this.id = ev.target.value;
    }

}
