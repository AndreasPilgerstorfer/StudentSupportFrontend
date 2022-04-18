import {Message} from "./message";

export class MessageFactory {

  static empty(): Message {
    return new Message(0, "", "", {id:0, start_time: "00:00",
      end_time: "11:11", date: new Date(), title:"" ,description:"", state:"",
      course: {id:0, title:"", description:"", number:"", image:{ id:0, url:"", title:""} },
      image: {id:0,url:"", title:""}, user: {id:0, firstname:"", lastname:"", password:"", phone_number:"", email:"",
      image:{ id:0, url:"", title:""}, education:"", is_student:true}},
      {id:0, firstname:"", lastname:"", password:"", phone_number:"",
        email:"", image:{ id:0, url:"", title:""}, education:"", is_student:true})
  }
}
