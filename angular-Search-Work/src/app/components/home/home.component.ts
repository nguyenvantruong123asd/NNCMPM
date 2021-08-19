import { Component, OnInit } from '@angular/core';
import {WorkService} from "../../Service/work.service";
import {map} from "rxjs/operators";
import {Work} from "../modal/work";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  works:any
  constructor( private work:WorkService) { }

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




}
