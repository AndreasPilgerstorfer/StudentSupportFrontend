import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RequestClass as Request} from "../../shared/request";
import {ToastrService} from "ngx-toastr";
import {RequestService} from "../../shared/request.service";
import {OfferService} from "../../shared/offer.service";
import {AuthenticationService} from "../../shared/authentication.service";

@Component({
  selector: 'div.studSup-request-overview-item',
  templateUrl: './request-overview-item.component.html',
  styleUrls: [
    "request-overview-item.component.scss"
  ]
})
export class RequestOverviewItemComponent {

  @Input() public request: Request | undefined;
  @Output() reloadRequests = new EventEmitter<any>();
  public requests: Request[] = [];

  constructor(
    private rs: RequestService,
    private os: OfferService,
    private toastr: ToastrService,
    private authService: AuthenticationService,
  ) {
  }


  // accept request
  public acceptRequest(requestId: number | undefined, studentId: number | undefined, offerId: number | undefined) {
    const requestBodyRequest = {
      state: "accepted"
    }

    // Set Request to Accepted
    this.rs.updateRequest(requestId, requestBodyRequest).subscribe(res => {
      // Offer: State auf Gebucht + Associated User setzen
      const requestBodyOffer = {
        state: "Gebucht",
        associatedStudent: studentId
      }

      this.os.updateOffer(offerId, requestBodyOffer).subscribe(res => {
        this.toastr.success("Angenommen", "Anfrage erfolgreich angenommen");
      });

      // andere offene Requests für dieses Angebot holen und Status auf Ablehnen setzen
      this.rs.getPendingByTeacherId(this.authService.getCurrentUserId()).subscribe(res => {
        this.requests = res;

        for (let request of this.requests) {
          if (request.offer.id == offerId) {
            const requestBody = {
              state: "closed"
            }
            this.rs.updateRequest(request.id, requestBody).subscribe(res => {
              this.reloadRequests.emit();
            });
          }
        }
      });
    });
  }

  // decline request (set to closed)
  public declineRequest(requestId: number | undefined) {
    const requestBody = {
      state: "closed"
    }

    this.rs.updateRequest(requestId, requestBody).subscribe(res => {
      this.toastr.success("Abgelehnt", "Anfrage erfolgreich abgelehnt!");
      this.reloadRequests.emit();
    });
  }

}
