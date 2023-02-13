import { Component, OnInit } from '@angular/core';
import { Events, SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  strId: number = 0;
  strName: string = "";
  strEmail: string = "";
  strUsertype: string = "";

  constructor(
    private oSessionService: SessionService,
  ) {
    this.strEmail = oSessionService.getPlayer();
    this.strUsertype = this.oSessionService.getUsertype();
    if(this.strEmail){
      this.oSessionService.getUserId().subscribe((n: number) => this.strId = n);
      this.oSessionService.getUserName().subscribe((n: string) => this.strName = n);
    }
  }

  ngOnInit() {
    this.oSessionService.on(Events.login).subscribe(
      (data: string) => {
        this.strEmail = this.oSessionService.getPlayer();
        this.strUsertype = this.oSessionService.getUsertype();
        this.oSessionService.getUserId().subscribe((n: number) => this.strId = n);
        this.oSessionService.getUserName().subscribe((n: string) => this.strName = n);
      });
    this.oSessionService.on(Events.logout).subscribe(
      (data: string) => {
        this.strEmail = '';
        this.strId = null;
        this.strUsertype = '';
        this.strName = '';

      });
  }

}
