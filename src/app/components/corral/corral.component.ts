import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-corral',
  templateUrl: './corral.component.html',
  styleUrls: ['./corral.component.css']
})
export class CorralComponent implements OnInit {
  
  form: any;
  constructor( private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['',Validators.required],
      capacity: ['',Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(10000)]
      )]
    });
    // this.form.patchValue(this.data?.corral);
    this.form.valueChanges.subscribe((res: any)=>{
      if(res && !this.form.errors){
        this.data.corral=this.form;
      }else{
        this.data.corral={};
      }
    });
  }

}

