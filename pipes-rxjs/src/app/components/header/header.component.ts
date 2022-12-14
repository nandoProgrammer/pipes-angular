import { Component, OnInit, Input, DoCheck, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() filterValue: FormControl;
  
  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    console.log(this.filterValue.valueChanges)
  }

  search() {
    
  }

}
