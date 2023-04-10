import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Fixture} from '../../interfaces/fixtures.interface';
import {
  LeagueAndSeasons,
  LoaderState,
  SeasonsOfLeague,
} from '../../interfaces/team-profile.interface';
import { LeagueService } from '../../services/league.service';
import { TeamComponent } from '../team/team.component';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss'],
})
export class ResultTableComponent {
  @Input() title!: string | undefined;
  @Input() hasLeague = true;
  @Input() hasSeason = true;
  @Input() results: Fixture[] = [];
  @Input() seasons: SeasonsOfLeague[] = [];
  @Input() seasonId: number | undefined | string;
  @Input() leagues: LeagueAndSeasons[] = [];
  @Input() leagueId: number | undefined;
  @Input() lastLength: number = 0;
  @Input() currentTeamId: number = 0;
  @Input() loaderState: LoaderState = {
    val: false,
  };
  @Input() isLeague: boolean = false;
  @Input() leagueInfo: any;
  intialLeaguePage: boolean = false;

  @Output() getMore = new EventEmitter();
  @Output() selectedSeason = new EventEmitter<number>();
  @Output() selectedLeague = new EventEmitter<number>();
  selectedLeagueValue: string = '';

  constructor(private router: Router, private readonly leagueService: LeagueService) {}

  ngOnInit(): void {
    this.intialLeaguePage = this.isLeague
  }

  ngOnChanges(): void {
    const name = this.leagues.filter((x) => this.leagueId === x.leagueId);
    if(this.intialLeaguePage === true && this.title) {
      this.getGeneralInfo(this.title)
    } else {
      name ? (this.selectedLeagueValue = name[0]?.leagueName) : '';
      this.getGeneralInfo(this.selectedLeagueValue)
    }
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

  selectedLeagueEmit(event: any): void {
    this.selectedLeagueValue = event;
  }

  checkWinStatus(homeTeam: any, awayTeam: any): boolean {
    let currentTeamType = '';

    if (this.currentTeamId === homeTeam.id) {
      return homeTeam.score > awayTeam.score;
    } else {
      return awayTeam.score > homeTeam.score;
    }
  }

  checkStatus(homeTeam: any, awayTeam: any): any {
    let currentTeamType = '';

     if (this.currentTeamId === homeTeam.id) 
     {
      return homeTeam.score > awayTeam.score ? 'W' : homeTeam.score === awayTeam.score ? 'D' : 'L';
    }
    else {
      return awayTeam.score > homeTeam.score? 'W' : homeTeam.score === awayTeam.score ? 'D' : 'L';

    }
  }
  
  getGeneralInfo(leagueName: string): void {
    if(leagueName && this.leagueInfo?.name !== leagueName) this.leagueService.getGeneralInfo(leagueName).subscribe(res => this.leagueInfo = res)
    if(this.leagueInfo) this.intialLeaguePage = false;
  }
  
}
