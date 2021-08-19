import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../Service/login.service";
import {AngularFireDatabase} from "@angular/fire/database";
import {Observable} from "rxjs";
import {User} from "../modal/user";
import {map} from "rxjs/operators";
import {Route, Router} from "@angular/router";
import firebase from "firebase";
import {stringify} from "@angular/compiler/src/util";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  ILoggedIn = false;
  list:any
  loginEmail:any;
  tageturl='';

  provider:any;
  constructor(private loginService:LoginService,
              private data:AngularFireDatabase,
              private route:Router
  ) {
  }

  ngOnInit(): void {


    this.retrieveUser();

    if(localStorage.getItem('user')!== null)
      this.ILoggedIn =true;
    else
      this.ILoggedIn =false;
  }

  async onSinin(email:string,password:string){
    await this.loginService.signin(email,password)
    if(this.loginService.isLoggedIn){
      this.ILoggedIn = true;
      this.loginEmail = JSON.parse(<string>localStorage.getItem('user'));
      this.loadUrl();
      this.route.navigate([this.tageturl]);
    }

  }

  retrieveUser(): void {
    this.loginService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.list = data;
    });
  }

  loadUrl(){
    for(let item of this.list){
      if(item.email==this.loginEmail && item.loaitk=='admin'){
        this.tageturl = '/admin'
      }if(item.email==this.loginEmail && item.loaitk=='user'){
        this.tageturl = ''
      }if(item.email==this.loginEmail && item.loaitk=='enterprise'){
        this.tageturl = '/enterprise'
      }
    }
  }


  facebookLogin() {
    var providers = new firebase.auth.FacebookAuthProvider();
    this.provider = providers;


    firebase.auth().signInWithPopup(providers).then(function (result){
      var  user = result.user;
      console.log(user);
    }).catch(function (error){
      var errorcode = error.code;
      var errorMes = error.message;
      var email = error.email;
      var creddential = error.credential;
    })
  }

  gmailLogin(){
    var providers = new firebase.auth.GoogleAuthProvider();

    this.provider =providers;

    firebase.auth()
      .signInWithPopup(providers)
      .then((result) => {
        // The signed-in user info.
        var user = result.user;
        localStorage.setItem('user',JSON.stringify(user?.email));
        this.loginEmail = JSON.parse(<string>localStorage.getItem('user'));
        this.checkExistUser(user?.email);
        this.loadUrl();
        this.route.navigate([this.tageturl]);
        // ...
      }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  checkExistUser(u:any){
    let ex = true;
    for (let i =0;i< this.list.length;i++) {
      if(this.loginEmail != this.list[i].email && i == this.list.length - 1){
         ex= false;
      }
    }
    if(!ex){
      let t = new User(u,u,'chưa cài','chưa cài',[],false);
      this.loginService.create(t);
    }
  }
}
