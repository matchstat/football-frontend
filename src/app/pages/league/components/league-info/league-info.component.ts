import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { LeagueService } from "../../../../shared/services/league.service";
import {
  GeneralInfoLeague,
  PastChampions,
  SeachLeague,
} from "../../../../shared/interfaces/league.interface";
import { UnsubscribeDirective } from "../../../../shared/directive/unsubscribe.directive";
import { takeUntil } from "rxjs/operators";
import { SeasonsOfLeague } from "../../../../shared/interfaces/team-profile.interface";
import { Subject } from "rxjs";
import { MetaTagsService } from "src/app/shared/services/meta-tags.service";
@Component({
  selector: 'app-league-info',
  templateUrl: './league-info.component.html',
  styleUrls: ['./league-info.component.scss'],
})
export class LeagueInfoComponent
  extends UnsubscribeDirective
  implements OnInit, OnChanges
{
  leagueInfo!: GeneralInfoLeague;
  pastChampions: PastChampions[] = [];

  constructor(
    private readonly leagueService: LeagueService,
    private readonly metaTagService: MetaTagsService
  ) {
    super();
  }

  @Input() seasons: SeasonsOfLeague[] = [];
  @Input() league!: SeachLeague | null;

  ngOnChanges(changes: SimpleChanges): void {
    const seasonsIds = changes['seasons']?.currentValue?.map(
      (season: { seasonId: number }) => season.seasonId
    );
    this.initializeValue(seasonsIds);
  }

  ngOnInit(): void {
    this.getGeneralInfo();
  }

  private getGeneralInfo() {
    this.leagueService
      .getGeneralInfo(this.leagueService.league.name)
      .pipe(takeUntil(this.subscription))
      .subscribe((res) => {
        this.leagueInfo = res;
        const currseason = this.seasons.filter(
          (x) => x.seasonId === this.league?.currentSeasonId
        );
        const metaObject = {
          title: `${this.league?.name} (${this.leagueInfo.country}) ${currseason[0].seasonName} Table, Stats, Results |  SteveGfootball`,
          description: `${this.league?.name} (${this.leagueInfo.country}) tables, results, fixtures, stats ${currseason[0].seasonName} season. Detailed stats info.. FTS, BTTS, Clean Sheets, Goals Scored, Corners, Top Scorers, Over 2.5`,
          keywords: `${this.league?.name}, FTS, BTTS, Clean Sheets, Goals Scored, Corners, Top Scorers, Over 2.5, Football, Table, Stats, Results, SteveGfootball`,
        };
        this.metaTagService.updateTheMetaTags(metaObject);
        this.selectedSeason(this.leagueService.league.currentSeasonId);
      });
  }

  selectedSeason(seasonId: number) {
    this.leagueService.seasonStartEndDate(seasonId).subscribe((res) => {
      this.leagueInfo.seasonsDates = res;
    });
  }

  initializeValue(seasonsIds: number[]) {
    this.leagueService.pastChampions(seasonsIds).subscribe((res) => {
      const data = res.reverse().slice(1);
      data.map((res) => {
        if (res) this.pastChampions.push(res);
      });
    });
  }
}
