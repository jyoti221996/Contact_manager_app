import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  public loading : boolean = false;
  public groups: IGroup[] = [] as IGroup[];
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  constructor(private activatedRoute: ActivatedRoute,private contactService:ContactService, private router: Router) { }

  ngOnInit(): void {
    this.addContactById();
  }

  addContactById(){  
    this.contactService.getAllGroup().subscribe((data)=>{
      this.groups = data;
    }, (error)=>{
      this.errorMessage = error;
    })
  }

  public createSubmit(){
    debugger
    this.contactService.createContact(this.contact).subscribe((data)=>{
      this.router.navigate(['/']).then();
    }, (error)=>{
      this.errorMessage = error;
      this.router.navigate(['/contacts/add']).then();
    } 
    )
    this.addContactById();
  }
}
