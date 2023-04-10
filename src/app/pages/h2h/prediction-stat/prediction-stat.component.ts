import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-prediction-stat',
  templateUrl: './prediction-stat.component.html',
  styleUrls: ['./prediction-stat.component.scss'],
})
export class PredictionStatComponent implements OnInit {
  constructor() {}
  @Input() firstTeamName!: string | undefined;
  @Input() secondTeamName!: string | undefined;
  ngOnInit(): void {}
}
