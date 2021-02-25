import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BackendService } from "./backend.service";
import { routing } from "./app.routes";
import { TicketDetailsComponent } from "./ticket-list/partials/ticket-details/ticket-details.component";
import { TicketListComponent } from "./ticket-list/ticket-list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, TicketDetailsComponent, TicketListComponent],
  imports: [BrowserModule, routing, FormsModule, ReactiveFormsModule],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule {}
