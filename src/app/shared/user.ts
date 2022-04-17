import {Image} from "./image";

export class User {

  constructor(
    public id:number,
    public firstname:string,
    public lastname:string,
    public password:string,
    public phone_number:string,
    public email:string,
    public image:Image,
    public education:string,
    public is_student:boolean
  ) {
  }
}
