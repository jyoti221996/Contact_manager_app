import { IGroup } from './../../models/IGroup';
import { IContact } from 'src/app/models/IContact';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from './../../services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent implements OnInit {
  public loading: boolean = false;
  public contactId: string | null = null;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public group: IGroup = {} as IGroup;

  constructor(private activatedRoute: ActivatedRoute, private ContactService: ContactService) { }

  ngOnInit(): void {

    this.getSingleContactById();
  }


  getSingleContactById() {
    debugger
    this.activatedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    });

    if (this.contactId) {
      debugger
      this.isNotEmpty();
      this.loading = true;
      this.ContactService.getContact(this.contactId).subscribe((data) => {
        this.contact = data;
        console.log(this.contact)
        this.loading = false;
        this.ContactService.getGroup(data).subscribe((data)=>{
          debugger
          this.group = data;
          console.log(this.group);
        })
      }, (error) => {
        this.errorMessage = error;
        this.loading = false;
      })
    }
  }

  public isNotEmpty(){debugger
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
  }
}

