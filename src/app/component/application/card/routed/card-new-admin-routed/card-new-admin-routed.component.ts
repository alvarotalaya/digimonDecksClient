import { ICard2Form, ICard2Send } from 'src/app/model/card-interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/service/card.service';
import { ICard } from 'src/app/model/card-interface';
declare let bootstrap: any;

@Component({
  selector: 'app-card-new-admin-routed',
  templateUrl: './card-new-admin-routed.component.html',
  styleUrls: ['./card-new-admin-routed.component.css']
})
export class CardNewAdminRoutedComponent implements OnInit {

  id: number = 0;
  oCard: ICard = null;
  oCard2Form: ICard2Form = null;
  oCard2Send: ICard2Send = null;
  oForm: FormGroup<ICard2Form>;
  // modal
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";
  //foreign
  CardDescription: string = "";

  constructor(
    private oRouter: Router,
    private oCardService: CardService,
    private oFormBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.oForm = <FormGroup>this.oFormBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(50)]],
      type: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(50)]],
      color: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      stage: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(20)]],
      digitype: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(50)]],
      attribute: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(50)]],
      level: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(1)]],
      playcost: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      evolutioncost: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(2)]],
      dp: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(10)]],
      cardnumber: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      maineffect: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(1000)]],
      sourceeffect: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(1000)]],
      image: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]]
    });
  }

  onSubmit() {
    console.log("onSubmit");
    this.oCard2Send = {
      id: this.oForm.value.id,
      name: this.oForm.value.name,
      type: this.oForm.value.type,
      color: this.oForm.value.color,
      stage: this.oForm.value.stage,
      digitype: this.oForm.value.digitype,
      attribute: this.oForm.value.attribute,
      level: this.oForm.value.level,
      playcost: this.oForm.value.playcost,
      evolutioncost: this.oForm.value.evolutioncost,
      dp: this.oForm.value.dp,
      cardnumber: this.oForm.value.cardnumber,
      maineffect: this.oForm.value.maineffect,
      sourceeffect: this.oForm.value.sourceeffect,
      image: this.oForm.value.image
    }
    if (this.oForm.valid) {
      this.oCardService.newOne(this.oCard2Send).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle = "DIGIMONDECKS";
          this.modalContent = "Card " + data + " created";
          this.showModal(data);
        }
      })
    }

  }

  showModal = (data) => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.mimodal), { //pasar el myModal como parametro
      keyboard: false
    })
    var myModalEl = document.getElementById(this.mimodal);
    myModalEl.addEventListener('hidden.bs.modal', (event): void => {
      this.oRouter.navigate(['/admin/card/view', data])
    })
    this.myModal.show()
  }

}

