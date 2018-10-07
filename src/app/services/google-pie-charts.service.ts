import { Injectable } from '@angular/core';
import {PieChartConfig} from '../model/PieChartConfig';
import {GoogleChartsBaseService} from './google-charts-base.service';


declare var google: any;

@Injectable()
export class GooglePieChartsService extends GoogleChartsBaseService {

  constructor() { super(); }

  public BuildPieChart(elementId: String, data: any[], config: PieChartConfig): void {
    var chartFunc = () => {
      return new google.visualization.PieChart(document.getElementById(<string>elementId));
    };
    const options = {
      title: config.title,
      pieHole: config.pieHole,
    };

    this.buildChart(data, chartFunc, options);
  }
}
