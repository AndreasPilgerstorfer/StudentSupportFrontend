import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from "../../shared/message";
import {MessageService} from "../../shared/message.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'div.studSup-message-overview-item',
  templateUrl: './message-overview-item.component.html',
  styleUrls: [
    "message-overview-item.component.scss"
  ]
})
export class MessageOverviewItemComponent implements OnInit {

  @Input() public message: Message | undefined;
  @Output() reloadMessages = new EventEmitter<any>();

  constructor(
    private ms: MessageService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
  }

  public cropText(text: any): string {
    return text.substring(0, 70) + " ...";
  }

  // delete message
  public deleteMessage(id: any) {
    this.ms.remove(id).subscribe(res => {
      this.toastr.success("Gelöscht", "Nachricht erfolgreich gelöscht!");
      this.reloadMessages.emit();
    });
  }
}
