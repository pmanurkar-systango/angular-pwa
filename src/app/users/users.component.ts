import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users: any = [];

  constructor(
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    const url = 'https://jsonplaceholder.typicode.com/users';
    this.http.getUsers(url).subscribe((data: any) => {
      if(data && data.length) {
        this.users = data;
      }
    })
  }

}
