import { Component, OnInit } from '@angular/core';
import {WorkService} from "../../Service/work.service";
import {Work} from "../modal/work";
import {Router} from "@angular/router";

@Component({
  selector: 'app-upwork',
  templateUrl: './upwork.component.html',
  styleUrls: ['./upwork.component.scss']
})
export class UpworkComponent implements OnInit {

  constructor(private work:WorkService ,private route:Router) {}
  ngOnInit(): void {
  }

  uploadWork(tencv:any,loai:any,diachi:any,luong:any,soluong:any,time:any,mota:any){
    let t = JSON.parse(<string>localStorage.getItem('user'));
    let w = new Work(tencv,luong,t,diachi,time,mota,soluong,loai,'waiting');

    if(tencv == ''){
      window.alert('hãy điền đầy đủ thông tin');
    }else {
      this.work.create(w);
      window.alert('Thành công! chờ admin xét duyệt');
      this.route.navigate(['/enterprise']);
    }
  }
}
