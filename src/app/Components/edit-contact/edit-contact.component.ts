import { IGroup } from './../../models/IGroup';
import { ContactService } from './../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/IContact';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  public loading : boolean = false;
  public groups: IGroup[] = [] as IGroup[];
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public contactId: any | null = null;

  constructor(private activatedRoute: ActivatedRoute, private contactService:ContactService, private router: Router) { }

  ngOnInit(): void {
    this.updateContactById();
  }

  updateContactById(){  
    this.loading = true;
    this.activatedRoute.paramMap.subscribe((param)=>{
      this.contactId = param.get('contactId');
    });

    if(this.contactId){
      
      this.contactService.getContact(this.contactId).subscribe((data)=>{
        this.contact = data;
        this.loading = false;
        this.contactService.getAllGroup().subscribe((data)=>{
          this.groups = data;
        });
      }, (error)=>{
        this.errorMessage = error;
        this.loading = false;
      })
    }
  }

  public editContact(){
    this.contactService.updateContact(this.contact, this.contactId).subscribe((data)=>{
      this.router.navigate(['/']).then();
    }, (error)=>{
      this.errorMessage = error;
      this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
    }
    )
  }


}
