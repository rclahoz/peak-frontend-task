import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  @Output() termnsToSearch = new EventEmitter<string>();
  notifier = new Subject();

  constructor() { }

  ngOnInit(): void {
    this.onSearchTermChanged();
  }

  form = new FormGroup({
    searchTerms: new FormControl('')
  });

  get f(){
    return this.form.controls;
  }

  onSearchTermChanged() {
    this.form.valueChanges.pipe(
      takeUntil(this.notifier),
      debounceTime(700)
    ).subscribe(term => {
      this.termnsToSearch.emit(term);
    });
  }

  ngOnDestroy() {
    this.notifier.next()
    this.notifier.complete()
  }

}
