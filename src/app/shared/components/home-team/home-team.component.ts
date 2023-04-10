import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-home-team',
  templateUrl: './home-team.component.html',
  styleUrls: ['./home-team.component.scss'],
})
export class HomeTeamComponent implements OnInit {
  @Input() home?: string = '';
  @Input() homeEmblem?: string = '';
  @Input() needSmallIcon: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
