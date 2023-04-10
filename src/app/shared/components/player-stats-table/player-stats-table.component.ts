import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { PlayerStats } from "../../interfaces/stats.interface";
import {
  LoaderState,
  SeasonsOfLeague,
} from "../../interfaces/team-profile.interface";
import { Observable } from "rxjs";
import { Player } from "../../interfaces/player.interface";
import { Router } from "@angular/router";
import { devOnlyGuardedExpression } from "@angular/compiler";

@Component({
  selector: "app-player-stats-table",
  templateUrl: "./player-stats-table.component.html",
  styleUrls: ["./player-stats-table.component.scss"],
})
export class PlayerStatsTableComponent {
  @Input() title!: string | undefined;
  @Input() coachShow: boolean = true;
  @Input() seasonId!: number | undefined;
  @Input() seasons: SeasonsOfLeague[] = [];
  @Input() playerStats!: PlayerStats;
  @Input() allPlayers: Player[] = [];
  @Input() loaderState: LoaderState = {
    val: false,
  };
  @Output() selectedSeason = new EventEmitter<number>();
  @Output() more = new EventEmitter<void>();

  constructor(private router: Router) {}

  navigateToPlayerProfile(playerName: string) {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate(["player", playerName]));
  }

  sortByGP() {
    this.playerStats.players = this.playerStats.players.sort(
      (a, b) => b.gamesPlayed - a.gamesPlayed
    );
  }

  sortByGoals() {
    this.playerStats.players = this.playerStats.players.sort(
      (a, b) => b.goals - a.goals
    );
  }

  sortByAssists() {
    this.playerStats.players = this.playerStats.players.sort(
      (a, b) => b.assists - a.assists
    );
  }

  sortByCards() {
    this.playerStats.players = this.playerStats.players.sort(
      (a, b) => b.cards - a.cards
    );
  }

  sortBytimePlayed() {
    this.playerStats.players = this.playerStats.players.sort(
      (a, b) => b.timePlayed - a.timePlayed
    );
  }

  sortByRating() {
    this.playerStats.players = this.playerStats.players.sort(
      (a, b) => +b.rating - +a.rating
    );
  }

  sortByYellowCards() {
    this.playerStats.players = this.playerStats.players.sort(
      // @ts-ignore
      (a, b) => b.yellowcards - a.yellowcards
    );
  }

  sortByRedCards() {
    this.playerStats.players = this.playerStats.players.sort(
      // @ts-ignore
      (a, b) => b.redcards - a.redcards
    );
  }

  calcAge(birthdate: string | null | undefined) {
    if (birthdate === undefined || birthdate === null) return;

    const [date, month, year] = birthdate.split("/");

    const dob = new Date(Number(year), Number(month), Number(date));

    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }
}
