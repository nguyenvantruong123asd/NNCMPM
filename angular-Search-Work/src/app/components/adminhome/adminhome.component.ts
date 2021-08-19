import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WorkService} from "../../Service/work.service";
import {Work} from "../modal/work";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.scss']
})
export class AdminhomeComponent implements OnInit {
  works:any;

  constructor(private work:WorkService) {
  }




  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.work.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.works = data;
    });
  }

  update(key:any){
    this.work.update(key,{status:'accept'});
  }

  delete(key:any){
    this.work.delete(key);
  }


}
