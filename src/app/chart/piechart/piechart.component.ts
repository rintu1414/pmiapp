import {Component, Input, OnInit} from '@angular/core';
import {PieChartConfig} from '../../model/PieChartConfig';
import {GooglePieChartsService} from '../../services/google-pie-charts.service';
declare var google: any;
@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})

export class PiechartComponent implements OnInit {

  @Input() data: any[];
  @Input() config: PieChartConfig;
  @Input() elementId: String;

  constructor(private _pieChartService: GooglePieChartsService) {}

  ngOnInit(): void {
    this._pieChartService.BuildPieChart(this.elementId, this.data, this.config);
  }

}
