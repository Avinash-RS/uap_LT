import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'uap-system-readiness-check',
  templateUrl: './system-readiness-check.component.html',
  styleUrls: ['./system-readiness-check.component.scss']
})
export class SystemReadinessCheckComponent implements OnInit {

  constructor( private http:HttpClient,) { }

  ngOnInit(): void {
  }



  demo(){
    
  }

}
