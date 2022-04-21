import {User} from "./user";
import {Offer} from "./offer";

export class RequestClass {

  constructor(
    public id: number,
    public offer: Offer,
    public user: User,
    public state: string
  ) {
  }
}
