import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-some-page',
  templateUrl: './some-page.component.html',
  styleUrls: ['./some-page.component.scss']
})
export class SomePageComponent implements OnInit {
  joke: Observable<Joke>;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.joke = this.dataService.getChukJoke();
  }

}

export class Joke {
  public icon_url: string;
  public value: string;
}
