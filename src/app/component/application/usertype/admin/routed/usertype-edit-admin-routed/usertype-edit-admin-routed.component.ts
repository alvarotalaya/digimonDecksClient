import { IUsertype2Form, IUsertype2Send } from 'src/app/model/usertype-interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsertype } from 'src/app/model/usertype-interface';
import { UsertypeService } from 'src/app/service/usertype.service';
declare let bootstrap: any;

@Component({
  selector: 'app-usertype-edit-admin-routed',
  templateUrl: './usertype-edit-admin-routed.component.html',
  styleUrls: ['./usertype-edit-admin-routed.component.css']
})
export class UsertypeEditAdminRoutedComponent implements OnInit {

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
  // foreigns
  UsertypeDescription: string = "";

  constructor(
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    private oUsertypeService: UsertypeService,
    private oFormBuilder: FormBuilder,
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getOne();
  }

  getOne() {
    this.oUsertypeService.getOne(this.id).subscribe({
      next: (data: IUsertype) => {
        this.oUsertype = data;
        ;
        this.oForm = <FormGroup>this.oFormBuilder.group({
          id: [data.id, [Validators.required]],
          type: [data.type, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]]  
        });
      }
    })
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