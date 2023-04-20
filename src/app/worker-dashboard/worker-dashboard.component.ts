import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { WorkerModel } from './worker-dash board.models';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-worker-dashboard',
  templateUrl: './worker-dashboard.component.html',
  styleUrls: ['./worker-dashboard.component.scss']
})
export class WorkerDashboardComponent {
    formValue !: FormGroup;
    workerData !: any;
    workerModelObj : WorkerModel = new WorkerModel();
    constructor(private formbuilder: FormBuilder,
      private api : ApiService) { }

    ngOnInit(): void {
      this.formValue = this.formbuilder.group({
        nameTask : [''],
        month : [''],
        theDay : [''],
        theHour : [''],
        theTime : ['']
      })
      this.getAllWorker();
    }
    postWorkerDetails() {
    this.workerModelObj.nameTask = this.formValue.value.nameTask;
    this.workerModelObj.month = this.formValue.value.month;
    this.workerModelObj.theDay = this.formValue.value.theDay;
    this.workerModelObj.theHour = this.formValue.value.theHour;
    this.workerModelObj.theTime = this.formValue.value.theTime;

    this.api.postWorker(this.workerModelObj)
    .subscribe(res=> {
      console.log(res);
      alert("Worker Added Successfully")
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    },
    err=>{
      alert("Something Went wrong")
    })

    }
    getAllWorker() {
      this.api.getWorker()
      .subscribe(res=>{
        this.workerData = res;
      })
    }
    deleteWorker(row : any) {
      this.api.deleteWorker(row.nameTask)
      .subscribe(res=> {
        alert("Worker Deleted")
        this.getAllWorker();
      })
    }
    onEdit(row: any) {
      this.workerModelObj.nameTask = row.nameTask;
      this.formValue.controls['taskName'].setValue(row.taskName)
      this.formValue.controls['month'].setValue(row.month)
      this.formValue.controls['theDay'].setValue(row.theDay)
      this.formValue.controls['theHour'].setValue(row.theHour)
      this.formValue.controls['theTime'].setValue(row.theTime)
    }
    addImageWorkerDetails() {
      this.workerModelObj.nameTask = this.formValue.value.nameTask;
      this.workerModelObj.month = this.formValue.value.month;
      this.workerModelObj.theDay = this.formValue.value.theDay;
      this.workerModelObj.theHour = this.formValue.value.theHour;
      this.workerModelObj.theTime = this.formValue.value.theTime;  
      // this.api.updateWorker(this.workerModelObj, this.workerModelObj.nameTask)
    }
}
