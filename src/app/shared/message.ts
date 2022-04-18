import {Offer} from "./offer";
import {User} from "./user";

export class Message {

  constructor(
    public id: number,
    public title: string,
    public text: string,
    public offer: Offer,
    public user: User,
  ) {
  }
}
