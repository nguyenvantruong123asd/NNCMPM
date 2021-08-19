import { Component, OnInit } from '@angular/core';
import {WorkService} from "../../Service/work.service";

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.scss']
})
export class EnterpriseComponent implements OnInit {
  works:any;
  constructor(private work:WorkService) {
    this.works =this.work.getAll().valueChanges();
  }

  ngOnInit(): void {
  }

}
