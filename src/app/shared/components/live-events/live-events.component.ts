import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {LiveEventsService} from "../../services/live-events.service";
import {LiveEventsLeagueInterface} from "../../interfaces/live-events-league.interface";
import {LoaderState} from "../../interfaces/team-profile.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-live-events',
  templateUrl: './live-events.component.html',
  styleUrls: ['./live-events.component.scss']
})
export class LiveEventsComponent implements OnInit {

  events: any[] = [];
  allEvents: any[] = [];
  loaderState: LoaderState = {
    val: false
  };
  page = 0;
  count = 10;

  constructor(private readonly liveEventsService: LiveEventsService,
              private readonly router: Router) {
  }

  @Output() informParent = new EventEmitter();

  ngOnInit(): void {
    this.initializeValues();
  }

  more() {
    this.loaderState = {
      val: false
    };
    this.page += 1;
    this.events = this.allEvents.filter((_, i) => this.page * this.count > i);

  }

   currentLeague(leagueName: string) {
    if (this.router.url.includes('league')) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/league', leagueName]);
      });
    } else {
      this.router.navigate(['/league', leagueName]);
    }

  }

  initializeValues() {
    this.liveEventsService.getLiveEvents().subscribe((res: LiveEventsLeagueInterface[]) => {
      this.allEvents = res;
      this.more();
    })
  }
}
