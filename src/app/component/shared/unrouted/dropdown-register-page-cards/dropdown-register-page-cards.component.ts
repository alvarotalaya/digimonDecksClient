import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-register-page-cards',
  templateUrl: './dropdown-register-page-cards.component.html',
  styleUrls: ['./dropdown-register-page-cards.component.css']
})
export class DropdownRegisterPageCardsComponent implements OnInit {

  @Input() PageSize!: number;

  Rpp:number = 20
  @Output() eeRpp = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  onChangeRpp(nRpp:number){
    this.Rpp = nRpp;
    this.eeRpp.emit(nRpp);
  }
}
