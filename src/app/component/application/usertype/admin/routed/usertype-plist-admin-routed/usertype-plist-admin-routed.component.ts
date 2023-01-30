import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsertype } from 'src/app/model/usertype-interface';
import { UsertypeService } from 'src/app/service/usertype.service';
import { SessionService } from 'src/app/service/session.service';
import { faEye, faUserPen, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { IPage } from 'src/app/model/generic-types-interface';
@Component({
  selector: 'app-usertype-plist-admin-routed',
  templateUrl: './usertype-plist-admin-routed.component.html',
  styleUrls: ['./usertype-plist-admin-routed.component.css']
})
export class UsertypePlistAdminRoutedComponent implements OnInit {

  responseFromServer: IPage<IUsertype>;
  //
  strTermFilter: string = "";
  id_usertypeFilter: number = 0;
  numberOfElements: number = 5;
  page: number = 0;
  sortField: string = "";
  sortDirection: string = "";
  //
  faEye = faEye;
  faUserPen = faUserPen;
  faTrash = faTrash;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  //
  strUsertype: string = "";

  constructor(
    private oUsertypeService: UsertypeService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router,
    private oSessionService: SessionService
  ) { }

  ngOnInit() {
    this.getPage();
    this.strUsertype = this.oSessionService.getUsertype();
    if (this.strUsertype != "1") {
      this.oRouter.navigate(['/home']);
    } 
  }

  getPage() {
    this.oUsertypeService.getUsertypePlist(this.page, this.numberOfElements)
      .subscribe({
        next: (resp: IPage<IUsertype>) => {
          this.responseFromServer = resp;
          if (this.page > resp.totalPages - 1) {
            this.page = resp.totalPages - 1;
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })
  }

  setPage(e: number) {
    this.page = (e - 1);
    this.getPage();
  }

  setRpp(rpp: number) {
    this.numberOfElements = rpp;
    this.getPage();
  }

  setFilter(term: string): void {
    this.strTermFilter = term;
    this.getPage();
  }

  setOrder(order: string): void {
    this.sortField = order;
    if (this.sortDirection == "asc") {
      this.sortDirection = "desc";
    } else {
      this.sortDirection = "asc";
    }
    this.getPage();
  }

}
