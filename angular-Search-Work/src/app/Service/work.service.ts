import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {Work} from "../components/modal/work";
import {LoginService} from "./login.service";
import {map} from "rxjs/operators";
import {Listwork} from "../components/modal/listwork";

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  works: AngularFireList<Work>;
  user:any;
  constructor( private data:AngularFireDatabase) {
    this.works = this.data.list('works');
  }


  getAll():AngularFireList<Work>{
    return this.works;
  }

  create(work:Work){
    return this.works.push(work);
  }

  update(key: any, value: any):Promise<void>{
    return this.works.update(key,value);
  }

  delete(key: any):Promise<void>{
    return this.works.remove(key);
  }


}
