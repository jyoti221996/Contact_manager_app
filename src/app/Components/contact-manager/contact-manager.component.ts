import { ContactService } from './../../services/contact.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
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
  searchTerm: any;
  itemsCopy: any;
  items: any;

  constructor(private ContactService: ContactService) { }

  ngOnInit(): void {
   this.getAllContactFromService();
  }

  getAllContactFromService(){    
    this.loading = true;
    this.ContactService.getAllContact().subscribe((data)=>{      
      this.contacts = data;
      this.loading = false;
    }, (error) => {
      this.errorMessage = error;
      this.loading = false;
    });
  }


  deleteContact(contactId: string | undefined){
    debugger
    if(contactId){
      this.ContactService.deleteContact(contactId).subscribe((data)=>{
        this.getAllContactFromService();
      }, (error)=>{
        this.errorMessage = error;
      });
    }
  }
 

public searchText:string = '';


  onSearchTextEntered(searchValue:any){
    this.searchText = searchValue;
    console.log(this.searchText)
  }

}
