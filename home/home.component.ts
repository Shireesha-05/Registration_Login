import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService } from '../share.service';
import {ApiService} from '../api.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

searchText:any;
userData:any;

  constructor(private router:Router,public shareService:ShareService,private api:ApiService) { }


  ngOnInit(): void {
    this.api.getApi().subscribe((data:any)=>{
      console.log("get api data",data);
      this.userData=data;
      console.log("Api Array Printed",data);
    })


  }

 
}
