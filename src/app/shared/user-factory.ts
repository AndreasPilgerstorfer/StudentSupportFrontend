import {Offer} from "./offer";
import {User} from "./user";

export class UserFactory {

  static empty(): User {
    return new User(0, "", "", "", "", "",
      { id:0, url:"", title:""}, "", true);
  }

}
