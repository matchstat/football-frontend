import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Fixture } from '../../interfaces/fixtures.interface';
import {
  LeagueAndSeasons,
  LoaderState,
  SeasonsOfLeague,
} from '../../interfaces/team-profile.interface';
import { LeagueService } from '../../services/league.service';

@Component({
  selector: 'app-fixtures-table',
  templateUrl: './fixtures-table.component.html',
  styleUrls: ['./fixtures-table.component.scss'],
})
export class FixturesTableComponent {
  @Input() title!: string | undefined;
  @Input() hasLeague = true;
  @Input() hasSeason = true;
  @Input() fixtures: Fixture[] = [];
  @Input() seasons: SeasonsOfLeague[] = [];
  @Input() seasonId: number | undefined | string;
  @Input() leagues: LeagueAndSeasons[] = [];
  @Input() leagueId: number | undefined;
  @Input() lastLength: number = 0;
  @Input() loaderState: LoaderState = {
    val: false,
  };
  @Input() leagueInfo: any;

  @Output() getMore = new EventEmitter();
  @Output() selectedSeason = new EventEmitter<number>();
  @Output() selectedLeague = new EventEmitter<number>();

  selectedLeagueValue: string = '';

  constructor(private router: Router, private readonly leagueService: LeagueService) {}

  ngOnChanges(): void {
    const name = this.leagues.filter((x) => this.leagueId === x.leagueId);
    name ? (this.selectedLeagueValue = name[0]?.leagueName) : '';
    if(this.selectedLeagueValue) this.getGeneralInfo(this.selectedLeagueValue)
  }

  navigateToH2h(firstTeamId: number, secondTeamId: number) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['h2h', firstTeamId, secondTeamId]));
  }

  navigateToEvent(fixtureId: number) {
    this.router.navigate(['live', fixtureId]);
  }

  navigateToTeamPage(teamName: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['team', teamName]));
  }

    
  getGeneralInfo(leagueName: string): void {
    if(leagueName && this.leagueInfo?.name !== leagueName) this.leagueService.getGeneralInfo(leagueName).subscribe(res => this.leagueInfo = res)
  }
}
