import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  form: any;
  listPeligrosidades=[
                      {id: "low",nombre: "baja"},
                      {id: "medium",nombre: "media"},
                      {id: "high",nombre: "alta"}];
  constructor( private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    console.log("Llega id:",this.data.corralSelected.id);
    this.form = this.formBuilder.group({
      id: [''],
      name: ['',Validators.required],
      age: ['',Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(200)]
      )],
      dangerousness: ['',Validators.required],
      corral_id: [this.data.corralSelected.id, Validators.required]
    });
    // this.form.patchValue(this.data?.corral);
    this.form.valueChanges.subscribe((res: any)=>{
      if(res && !this.form.errors){
        this.data.animal=this.form;
      }else{
        this.data.animal={};
      }
    });
  }
}
