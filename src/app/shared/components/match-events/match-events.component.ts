import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { LiveEventsService } from "../../services/live-events.service";
import { LoaderState } from "../../interfaces/team-profile.interface";
import {
  EventInterface,
  LineupInterFace,
  MatchInterface,
} from "../../interfaces/match.interface";
import { INFERRED_TYPE } from "@angular/compiler/src/output/output_ast";

interface EventInfo {
  extra_minute: null;
  fixture_id: number;
  id: number;
  injuried: null;
  minute: number;
  on_pitch: boolean;
  player_id: number;
  player_name: string;
  reason: null;
  related_player_id: number;
  related_player_name: string;
  result: null;
  team_id: string;
  type: string;
  var_result: null;
}

interface EventMatch {
  away?: EventInfo;
  home?: EventInfo;
}

@Component({
  selector: "app-match-events",
  templateUrl: "./match-events.component.html",
  styleUrls: ["./match-events.component.scss"],
})
export class MatchEventsComponent implements OnInit, OnChanges {
  events: EventMatch[] | undefined = [];
  allEvents: EventMatch[] | undefined = [];
  loaderState: LoaderState = {
    val: false,
  };
  page = 0;
  count = 10;
  firstHalf: any = [];
  secondHalf: any = [];
  newObj: any;

  constructor(private readonly _liveEventsService: LiveEventsService) {}

  @Input() matchData: MatchInterface | undefined;

  ngOnInit(): void {
    this.matchData?.events.forEach((ev) => {
      ev?.minute < 45 ? this.firstHalf.push(ev) : this.secondHalf.push(ev);
    });
  }

  more() {
    this.loaderState = {
      val: false,
    };
    this.page += 1;
    this.events = this.allEvents?.filter((_, i) => this.page * this.count > i);
    const data = this.events;
    const firstHalf: any[] = [];
    const secondHalf: any[] = [];
    data?.map(res => {
      if(res.away) {
        if(res.away.minute < 45) {
          firstHalf.push(res);
        } else {
          secondHalf.push(res);
        }
      } 
      
      if(res.home) {
        if(res.home.minute < 45) {
          firstHalf.push(res);
        } else {
          secondHalf.push(res);
        }
      } 
    })
    this.newObj = {
      firstHalf: firstHalf,
      secondHalf: secondHalf
    }
    
  }

  ngOnChanges(): void {
    this.matchData?.events.forEach((ev) => {
      if (+ev.team_id === this.matchData?.localTeam?.id) {
        this.allEvents?.push({ home: ev });
      } else {
        this.allEvents?.push({ away: ev });
      }
    });
    if (this.matchData?.events.length) {
      this.more();
    }
  }
}
