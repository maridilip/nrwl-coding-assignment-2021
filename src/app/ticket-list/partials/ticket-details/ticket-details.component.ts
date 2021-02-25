import { Component, OnDestroy, OnInit } from "@angular/core";
import { tick } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { mergeMap } from "rxjs/operators";
import { BackendService, Ticket, User } from "../../../backend.service";

@Component({
  selector: "app-ticket-details",
  templateUrl: "./ticket-details.component.html",
  styleUrls: ["./ticket-details.component.css"]
})
export class TicketDetailsComponent implements OnInit, OnDestroy {
  ticketId: number;
  private sub: any;
  selectedTicket: Ticket;
  assignedUser: User;

  constructor(private route: ActivatedRoute, private backend: BackendService) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.ticketId = +params["id"];
      this.backend
        .ticket(this.ticketId)
        .pipe(
          mergeMap((ticket: Ticket) => {
            this.selectedTicket = ticket;
            const userId = ticket.assigneeId;
            return this.backend.user(userId);
          })
        )
        .subscribe(user => {
          this.assignedUser = user;
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
