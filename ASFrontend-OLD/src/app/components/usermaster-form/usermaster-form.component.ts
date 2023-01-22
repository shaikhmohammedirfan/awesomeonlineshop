import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { usermaster } from 'src/app/interfaces/umaster';

@Component({
  selector: 'app-usermaster-form',
  templateUrl: './usermaster-form.component.html',
  styleUrls: ['./usermaster-form.component.scss'],
})
export class UsermasterFormComponent implements OnInit {
  public usermasterform = this.fb.group({
    USERNAME: ['', [Validators.required]],
  });
  constructor(private fb: FormBuilder) {}
  @Input() usermasterdata: any;

  ngOnInit(): void {
    console.log(this.usermasterdata);
    if (this.usermasterdata) {
      // this.editingIndex = this.packagemaster.indexOf(this.packagemaster);
      // console.log('editing index = ', this.editingIndex);
      // this.packagecode = this.packagemaster.packagecode;
      this.setEditForm(this.usermasterdata);
    }
  }

  setEditForm(usermaster: any): void {
    console.log('edit packagecode =', usermaster.email);
  }
  // uid: string;
  // username: string;
  // useremail: string;
  // usermobile: string;
  // userverified: boolean;
  // useractive: boolean;
  // userrole: string;
  // deliveryPinCode: string;
  // deliveryState: string;
  // deliveryCity: string;
  // deliveryArea: string;
  // deliveryRoadOrLandmark: string;
  // deliveryBldgOrAptsName: string;
  // deliveryFlatorAptsNo: string;
  // deliverryFloorNo: string;
  // deliveryGPSCord: string;
  // cartkey: string;
  // lastmodified: Date;
}
