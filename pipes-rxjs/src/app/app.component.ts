import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge, Observable, switchMap, filter, debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiService } from './api/api.service';
const DELAY = 300;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pipes-rxjs';
  filter = new FormControl();
  listAll$:Observable<any> = this.apiService.getNames();
  filter$:Observable<any> = this.filter.valueChanges.pipe(
    debounceTime(DELAY),
    filter((valorDigitado) => valorDigitado.lenght >= 1 || !valorDigitado.lenght),
    distinctUntilChanged(),
    switchMap((valorDigitado) => { return this.apiService.search(valorDigitado) })
  )
  list$ = merge(this.listAll$, this.filter$)

  constructor(private apiService: ApiService) {}

}
