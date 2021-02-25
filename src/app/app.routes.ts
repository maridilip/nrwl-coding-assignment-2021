import { RouterModule, Routes } from "@angular/router";
import { TicketDetailsComponent } from "./ticket-list/partials/ticket-details/ticket-details.component";
import { TicketListComponent } from "./ticket-list/ticket-list.component";


const routes: Routes = [
    { path: '', redirectTo: 'ticket-list', pathMatch: 'full'  },
    { path: 'ticket-list', component: TicketListComponent },
    { path: 'ticket-details/:id', component: TicketDetailsComponent },
  ];

export const routing = RouterModule.forRoot(routes);