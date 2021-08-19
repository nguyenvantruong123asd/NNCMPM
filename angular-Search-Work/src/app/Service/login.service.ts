import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {User} from "../components/modal/user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn = false;
  users: AngularFireList<User>;
  constructor(private firebaseAuth:AngularFireAuth, private data:AngularFireDatabase) {
   this.users = this.data.list('user');
  }
  async signin(email:string ,password:string){
      await this.firebaseAuth.signInWithEmailAndPassword(email,password).then(res=>{
        this.isLoggedIn = true;
        localStorage.setItem('user',JSON.stringify(res.user?.email));
      });
  }

  async signup(email:string ,password:string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password).then(res=>{
    });
  }

  logout(){
    this.firebaseAuth.signOut();
    this.isLoggedIn=false;
    localStorage.removeItem('user');
  }

  getAll():AngularFireList<User>{
    return this.users;
  }

  create(user:User):any{
    this.data.list('user').push(user);
  }
  update(key:any,value:any):Promise<void>{
  return this.users.update(key,value);
  }

  delete(email:any):Promise<void>{
    return this.users.remove(email);
  }
  deleteAll(): Promise<void> {
    return this.users.remove();
  }



}
