import { Injectable } from '@angular/core';

declare var google: any;
export class GoogleChartsBaseService {
  constructor() {
    google.charts.load('current', {'packages': ['corechart']});
  }

  protected buildChart(data: any[], chartFunc: any, options: any): void {
    const func = (chartFunc1, options1) => {
      const datatable = google.visualization.arrayToDataTable(data);
      chartFunc1().draw(datatable, options1);
    };
    var callback = () => func(chartFunc, options);
    google.charts.setOnLoadCallback(callback);
  }
}
