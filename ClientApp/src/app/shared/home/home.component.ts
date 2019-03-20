import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class SharedHomeComponent implements OnInit {
  searchText = '';
  constructor(private router: Router) { }

  ngOnInit() {
    // this.id = this.route.snapshot.paramMap.get('id');
  }

  search() {
    this.router.navigate([`tracking/${this.searchText}`]);
  }

}
