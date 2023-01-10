import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IUsertype } from 'src/app/model/usertype-interface';
import { UsertypeService } from 'src/app/service/usertype.service';
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

  constructor(
    private oUsertypeService: UsertypeService
  ) { }

  ngOnInit() {
    this.getPage();
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
