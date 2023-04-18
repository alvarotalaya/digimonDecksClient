import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICarddeck, ICarddeck2Send } from 'src/app/model/carddeck-interface';
import { SessionService } from 'src/app/service/session.service';
import { CarddeckService } from 'src/app/service/carddeck.service';
import { faEye, faUserPen, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { IPage } from 'src/app/model/generic-types-interface';

import { Chart } from 'angular-highcharts';

declare let bootstrap: any;
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-carddeck-plist-user-routed',
  templateUrl: './carddeck-plist-user-routed.component.html',
  styleUrls: ['./carddeck-plist-user-routed.component.css'],
  template: '<div [chart]="chart"></div>',
})
export class CarddeckPlistUserRoutedComponent implements OnInit {

  responseFromServer: IPage<ICarddeck>;
  //
  oCarddeck2Send: ICarddeck2Send = null;
  strTermFilter: string = "";
  id_cardFilter: number = 0;
  id_deckFilter: number = 0;
  numberOfElements: number = 50;
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
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";
  //
  idCard: number = null;
  strUsertype: string = "";
  id: number = 0;
  //
  datos: string = "";
  plus: string = "plus";
  minus: string = "minus"
  //
  level2: number = 0;
  level3: number = 0;
  level4: number = 0;
  level5: number = 0;
  level6: number = 0;
  level7: number = 0;
  tamers: number = 0;
  digitama: number = 0;
  digimon: number = 0;
  tamer: number = 0;
  option: number = 0;
  listCards: string = "";

  columnChart

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oCarddeckService: CarddeckService,
    private oRouter: Router,
    private oSessionService: SessionService
  ) { 
    this.id = oActivatedRoute.snapshot.params['id'];
    this.id_deckFilter = this.id;
  }

  ngOnInit() {
    this.getPage();
    this.grafico();
  }

  getPage() {
    this.oCarddeckService.getCarddecksPlist(this.page, this.numberOfElements, this.strTermFilter, this.id_deckFilter,this.id_cardFilter, this.sortField, this.sortDirection)
      .subscribe({
        next: (resp: IPage<ICarddeck>) => {
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
    this.setPage(1);
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

  setDirection(direction: string): void{
    if (direction == "asc") {
      this.sortDirection = "asc";
    } else {
      this.sortDirection = "desc";
    }
    this.getPage();
  }

  openModalCard(idCard: number): void {
    this.myModal = new bootstrap.Modal(document.getElementById("carddetail"), { //pasar el myModal como parametro
      keyboard: false
    })
    this.idCard = idCard;
    this.myModal.show()
  }

  closeCardModal() {
    this.myModal.hide();
  }

  changeCopies(idCarddeck:number, copiesSend:number, idCard:number, idDeck:number, signe:string){
    if(signe == "plus"){
      copiesSend++;
    } else if (signe == "minus"){
      copiesSend--;
    }
    this.oCarddeck2Send = {
      id: idCarddeck,
      copies: copiesSend,
      card: {id: idCard},
      deck: {id: idDeck}
    }
    this.oCarddeckService.updateOne(this.oCarddeck2Send).subscribe({
      next: (data: number) => {
        window.location.reload();
      }
    })
  }

  stats(){
    for(let i = 0; i <= this.responseFromServer.totalElements; i++){
      switch(this.responseFromServer.content[i].card.level){
        case 2:{
          this.level2++;
          break;
        }
        case 3:{
          this.level3++;
          break;
        }
        case 4:{
          this.level4++;
          break;
        }
        case 5:{
          this.level5++;
          break;
        }
        case 6:{
          this.level6++;
          break;
        }
        case 7:{
          this.level7++;
          break
        }
        default:{
          break;
        }
      }

      switch(this.responseFromServer.content[i].card.type){
        case "Digi-Egg":{
          this.digitama++
          break;
        }
        case "Digimon":{
          this.digimon++
          break;
        }
        case "Option":{
          this.option++
          break;
        }
        case "Tamer":{
          this.tamer++
          break;
        }
        default:{
          break;
        }
      }
    }
  }

  textPdf(){
    for(let i = 0; i <= this.responseFromServer.totalElements - 1; i++){
      this.listCards += this.responseFromServer.content[i].copies + "x " +
      this.responseFromServer.content[i].card.name + " " + this.responseFromServer.content[i].card.cardnumber + "\n"
    }
  }

  pruebaPdf(){
    this.textPdf();
    const pdfDefinition: any = {
      content:[
        {
          text: this.responseFromServer.content[1].deck.name,
          style: 'header',
          alignment: 'center'
        },
        {
          text: 'by ' + this.responseFromServer.content[1].deck.player.name,
          style: 'subheader',
          alignment: 'center'
        },
        this.listCards
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 15,
          bold: true
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        }
      }
    }

    const pdf  = pdfMake.createPdf(pdfDefinition);
    pdf.open();
    this.listCards = "";
  }

  grafico(){
    this.columnChart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Monthly Average Rainfall'
      },
      subtitle: {
        text: 'Source: WorldClimate.com'
      },
      xAxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Rainfall (mm)'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        type: "column",
        name: 'Tokyo',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4,
          194.1, 95.6, 54.4]
    
      }, {
        type: "column",
        name: 'New York',
        data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5,
          106.6, 92.3]
    
      }, {
        type: "column",
        name: 'London',
        data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3,
          51.2]
    
      }, {
        type: "column",
        name: 'Berlin',
        data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8,
          51.1]
    
      }]
    });
  }
}
