import {Image} from "./image";
import {Course} from "./course";
import {User} from "./user";

export class Offer {

  constructor(
    public id: number,
    public start_time: string,
    public end_time: string,
    public date: Date,
    public title: string,
    public description: string,
    public state: string,
    public associatedStudent: any,
    public course: Course,
    public image: Image,
    public user: User,
  ) {
  }

}
