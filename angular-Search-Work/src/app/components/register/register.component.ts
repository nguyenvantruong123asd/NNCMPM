import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {LoginService} from "../../Service/login.service";
import {User} from "../modal/user";
import {AngularFireDatabase} from "@angular/fire/database";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  listuser: any;


  constructor(private login: LoginService,
              private data: AngularFireDatabase,
              private router: Router
    ) {
    this.listuser = this.data.list('user').valueChanges();
  }

  ngOnInit(): void {
  }

  registerAccount(email:string,pass:string,hovaten:any,gioitinh:any,ngaysinh:any,loaitk:any) {
    let user = new User(email, hovaten, gioitinh,ngaysinh, [], loaitk);
    this.login.signup(email,pass);
    this.login.create(user);
    this.router.navigate(['/']);

  }



}


