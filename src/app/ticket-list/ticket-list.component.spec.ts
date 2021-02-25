import { ComponentFixture, TestBed } from "@angular/core/testing";
import {
  Form,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { Observable, of } from "rxjs";
import { BackendService, Ticket, User } from "../backend.service";

import { TicketListComponent } from "./ticket-list.component";

describe("TicketListComponent", () => {
  let component: TicketListComponent;
  let fixture: ComponentFixture<TicketListComponent>;
  let backendService: Partial<BackendService>;
  let formGroup: FormGroup;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [TicketListComponent],
      providers: [{ provide: BackendService, useValue: backendService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketListComponent);
    component = fixture.componentInstance;
    backendService = TestBed.inject(BackendService);
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should initialize variables", () => {
      formGroup = formBuilder.group({
        desc: ["", Validators.required],
        assignee: ["", Validators.required]
      });
      component.ticketForm = formGroup;
      const users: User[] = [
        { id: 111, name: "Victor" },
        { id: 112, name: "Mari" }
      ];
      const tickets: Ticket[] = [
        {
          id: 0,
          description: "Install a monitor arm",
          assigneeId: 111,
          completed: false
        }
      ];
      spyOn(backendService, "users").and.returnValue(of(users));
      spyOn(backendService, "tickets").and.returnValue(of(tickets));
      component.ngOnInit();
      component.tickets.subscribe(ticket => {
        expect(ticket[0].description).toBe("Install a monitor arm");
      });
      component.users.subscribe(user => {
        expect(user[0].name).toBe("Victor");
      });
    });
  });

  describe("showForm", () => {
    it("should set toggleForm to true", () => {
      component.toggleForm = false;
      component.showForm();
      expect(component.toggleForm).toBe(true);
    });

    it("should set toggleForm to false", () => {
      component.toggleForm = true;
      component.showForm();
      expect(component.toggleForm).toBe(false);
    });
  });
});
