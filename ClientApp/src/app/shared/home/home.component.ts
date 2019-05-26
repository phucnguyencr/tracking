import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class SharedHomeComponent implements OnInit {
  searchText = '';
  homeText = '';
  constructor(private router: Router) { }

  ngOnInit() {
    this.homeText = `<span class="font-large text-blue"><em>VOSA</em></span>
    <span class="text-blue">Distribution Logistics Solution</span>
    <span class="text-blue">(</span><span class="font-large text-blue"><em>VOSA</em></span>
    <span class="text-blue">DLS</span><span class="text-blue">)</span>
    was split from forwarding department of mother companies since 2014
    to specialize in solutions for Logistics Distribution and Supply Chain Management.`;
  }

  search() {
    this.router.navigate([`tracking/${this.searchText}`]);
  }

}
