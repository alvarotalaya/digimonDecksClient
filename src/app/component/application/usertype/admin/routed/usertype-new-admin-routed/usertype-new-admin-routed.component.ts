import { IUsertype2Form, IUsertype2Send } from 'src/app/model/usertype-interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsertypeService } from 'src/app/service/usertype.service';
import { IUsertype } from 'src/app/model/usertype-interface';
declare let bootstrap: any;

@Component({
  selector: 'app-usertype-new-admin-routed',
  templateUrl: './usertype-new-admin-routed.component.html',
  styleUrls: ['./usertype-new-admin-routed.component.css']
})
export class UsertypeNewAdminRoutedComponent implements OnInit {

  id: number = 0;
  oUsertype: IUsertype = null;
  oUsertype2Form: IUsertype2Form = null;
  oUsertype2Send: IUsertype2Send = null;
  oForm: FormGroup<IUsertype2Form>;
  // modal
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";
  //foreign
  UsertypeDescription: string = "";

  constructor(
    private oRouter: Router,
    private oUsertypeService: UsertypeService,
    private oFormBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.oForm = <FormGroup>this.oFormBuilder.group({
      id: [''],
      type: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    });
  }

  onSubmit() {
    this.oUsertype2Send = {
      id: this.oForm.value.id,
      type: this.oForm.value.type
    }
    if (this.oForm.valid) {
      this.oUsertypeService.newOne(this.oUsertype2Send).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle = "DIGIMONDECKS";
          this.modalContent = "Usertype " + data + " created";
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
      this.oRouter.navigate(['/admin/usertype/view', data])
    })
    this.myModal.show()
  }

}
