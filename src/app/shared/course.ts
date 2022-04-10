import {Image} from "./image";

export class Course {

  constructor(
    public id:number,
    public title:string,
    public description:string,
    public number:string,
    public image_id:string,
    public image:Image
  ) {
  }
}
