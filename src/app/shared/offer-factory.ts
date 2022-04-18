import {Offer} from "./offer";

export class OfferFactory {

  static empty(): Offer {
    return new Offer(0, "00:00", "11:11", new Date(), "" ,"", "",
    {id:0, title:"", description:"", number:"", image:{ id:0, url:"", title:""} },
      {id:0,url:"", title:""},
      {id:0, firstname:"", lastname:"", password:"", phone_number:"", email:"",
        image:{ id:0, url:"", title:""}, education:"", is_student:true} )
  }
}
