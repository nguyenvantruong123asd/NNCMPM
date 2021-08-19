import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../Service/login.service";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {Router} from "@angular/router";
import firebase from "firebase";
import {WorkService} from "../../Service/work.service";




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  ILoggedIn = false;
  user:any;
  list:any
  constructor(private login:LoginService,private data:AngularFireDatabase,private route:Router,private work:WorkService) {
    this.user = this.data.list('user').valueChanges();
  }

  ngOnInit(): void {
  this.update();
  }

  update(){
    setInterval(()=>{
      if(localStorage.getItem('user')!== null){
        this.ILoggedIn =true;
      }
      else{
        this.ILoggedIn =false;
      }
    })
  }

  logout(){
    this.login.logout();
    firebase.auth().signOut().then(function (){
      console.log('log out');
    }).catch(function (error){

    });
    this.route.navigate(['/']);
  }

  getEmail(){
    let t = JSON.parse(<string>localStorage.getItem('user'));
    return t;
  }

}
