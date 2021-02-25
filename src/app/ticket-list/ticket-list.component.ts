import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { BackendService, Ticket, User } from "../backend.service";

@Component({
  selector: "app-ticket-list",
  templateUrl: "./ticket-list.component.html",
  styleUrls: ["./ticket-list.component.css"]
})
export class TicketListComponent implements OnInit {
  ticketForm: FormGroup;
  toggleForm: boolean;
  tickets$ = this.backend.store$;
  users$: Observable<User[]>;

  constructor(
    private backend: BackendService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  selectTicket(ticket: Ticket) {
    this.router.navigate(["ticket-details", ticket.id]);
  }

  ngOnInit(): void {
    this.users$ = this.backend.users();
    this.ticketForm = this.fb.group({
      desc: ["", Validators.required]
    });
  }

  showForm(): void {
    this.toggleForm = !this.toggleForm;
  }

  assignUser(selectedUserId: string, ticketId: string): void {
    this.backend.assign(+ticketId, +selectedUserId);
  }

  assignStatus(status: boolean, ticketId: number): void {
    this.backend.complete(+ticketId, status);
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      this.backend
        .newTicket({
          description: this.ticketForm.get("desc").value
        })
        .subscribe(ticket => {
          this.ticketForm.get("desc").setValue("");
          this.toggleForm = false;
        });
    }
  }
}
