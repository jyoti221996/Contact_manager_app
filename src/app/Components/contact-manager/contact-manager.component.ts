import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/IContact';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.scss']
})
export class ContactManagerComponent implements OnInit {

  public loading: boolean = false;
  public contacts: IContact[] = [];
  public errorMessage: string | null = null;

  constructor(private ContactService: ContactService) { }

  ngOnInit(): void {
    debugger
    this.loading = true;
    this.ContactService.getAllContact().subscribe((data)=>{
      debugger
      this.contacts = data;
      this.loading = false;
    }, (error) => {
      this.errorMessage = error;
      this.loading = false;
    });

  }

}
