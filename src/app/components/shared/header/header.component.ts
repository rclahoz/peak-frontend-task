import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private appService: AppService,  private router: Router) { }

  ngOnInit(): void {
  }

  searchByTerms(event: string) {
    const searchTermns = this.formatSearch(event);
    this.router.navigate(['/search-results']);
    const currentSelection = this.appService.getUserSelectionData();
    currentSelection.order = 'newest';
    currentSelection.search = searchTermns;
    this.appService.setUserSelectionAndDispatchCurrentData(currentSelection);
    this.appService.setTitleName('Search Result');
    this.appService.setVisibility(true);

  }

  formatSearch(event: any) {
    const { searchTerms } = event;
    const result = searchTerms.split(' ');
    let formated = '';
    result.forEach((item:string) => formated += formated ? ` AND ${item}` : item);
    return formated;
  }

}
