import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isSideBarOpen: boolean = true;
  column_width: string = 'col-lg-10'
  userCount: number = 0
  recipeCount = 0
  downloadCount = 0
  requestCount = 0
  selected = new Date()
  // highchart implementation
  Highcharts: typeof Highcharts = Highcharts;
  // chartOptions: Highcharts.Options = {
  //   // your chart options here
  //   series: [{
  //     data: [1, 2, 3],
  //     type: 'bar'
  //   }]
  // };
  chartOptions = {}


  constructor(private router: Router, private api: ApiService) {
    let chartData = []
    if (sessionStorage.getItem('chart')) {
      chartData = JSON.parse(sessionStorage.getItem('chart') || '')
    }
    this.chartOptions = {
      charts: {
        type: 'bar'
      },
      title: {
        text: 'Analysis of Download of Recipe based on Cuisine',
        align: 'left'
      },
      xAxis: {
        type: 'Category'
      },
      yAxis: {
        title: {
          text: 'Total Download Recipe Count'
        }
      },
      //content
      series: [{
        name: 'Cuisine',
        colorByPoint: true,
        type: 'bar',
        data: chartData
      }]
    }
  }
  ngOnInit() {
    this.getUserCount()
    this.getRecipeCount()
    this.getDownloadsCount()
    this.getNewRequestsCount()
  }
  menuBtnClick() {
    this.isSideBarOpen = !this.isSideBarOpen;
    this.isSideBarOpen ? this.column_width = 'col-lg-10' : this.column_width = 'col-lg-12'
  }
  logoutAdmin() {
    sessionStorage.clear()
    this.router.navigateByUrl('/')
  }
  // get all users
  getUserCount() {
    this.api.getAllUserApi().subscribe((res: any) => {
      if (res && res.length > 0) {
        this.userCount = res.length
      }
      else {
        this.userCount = 0
      }
    })
  }
  getRecipeCount() {
    this.api.getAllRecipesApi().subscribe((res: any) => {
      if (res && res.length > 0) {
        this.recipeCount = res.length
      }
      else {
        this.recipeCount = 0
      }
    })
  }
  getDownloadsCount() {
    this.api.getAllDownloadsApi().subscribe((res: any) => {
      this.downloadCount = res.map((item: any) => item.count).reduce((a: any, b: any) => a + b)
    })
  }
  getNewRequestsCount() {
    this.api.getAllFeedbacksApi().subscribe((res: any) => {
      this.requestCount = res.filter((item: any) => item.status === 'Pending').length
    })
  }
}
