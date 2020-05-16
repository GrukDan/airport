import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {RoleService} from "../../service/role.service";
import {TaskService} from "../../service/task.service";
import {RatingService} from "../../service/rating.service";
import {AlternativeService} from "../../service/alternative.service";
import {AirportService} from "../../service/airport.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {ValidationService} from "../../service/validation.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {Observable, Subscription} from "rxjs";
import {Task} from "../../model/task";
import {UserViewModel} from "../../model/view-models/user-view-model";
import {Alternative} from "../../model/alternative";
import {Rating} from "../../model/rating";
import {AirportViewModel} from "../../model/view-models/airport-view-model";
import {AlternativeViewModel} from "../../model/view-models/alternative-view-model";
import {tap} from "rxjs/operators";
import {Label} from "ng2-charts";
import {ChartOptions, ChartType} from "chart.js";

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.css']
})
export class TaskPageComponent implements OnInit {

  idTask: number;
  task: Task;
  subscriptions: Subscription[] = [];
  experts: UserViewModel[];
  alternatives: Alternative[];
  ratings: Rating[];
  airportViewModels: AirportViewModel[];
  airportViewModel: AirportViewModel

  solution: Map<number, number>;


  public chartData = {
    labels: [],
    pieData: [],
    pieChartType: 'pie',
    legend: true,
    chartOptions: {
      responsive: true,
      legend: {
        position: 'top',
      },
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            const label = ctx.chart.data.labels[ctx.dataIndex];
            return label;
          },
        },
      }
    },
    colors: [
      {
        backgroundColor: ['rgba(10,255,213,1)',
          'rgba(0,255,0,1)',
          'rgba(234,85,147,1)',
          'rgba(55,31,255,1)',
          'rgba(255,245,104,1)',
          'rgba(11,255,5,1)',
          'rgba(255,119,227,1)',
          'rgba(27,41,255,1)'],
      },
    ]
  }

  public barData = {
    barChartOptions: {
      responsive: true,
      scales: {xAxes: [{}], yAxes: [{}]},
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        }
      }
    },
    barChartLabels: [],
    barChartType: 'bar',
    barChartLegend: false,
    barChartData: [
      {data: [], label: ''}
    ],
  }

  constructor(private userService: UserService,
              private taskService: TaskService,
              private ratingService: RatingService,
              private alternativeService: AlternativeService,
              private airportService: AirportService,
              private route: ActivatedRoute,
              public tokenStorage:TokenStorageService,
              private router: Router) {
    this.subscriptions = [];
    this.experts = [];
    this.alternatives = [];
    this.ratings = [];
    this.airportViewModels = [];
    this.airportViewModel = new AirportViewModel();
    this.solution = new Map;
    this.route.paramMap.subscribe(params => {
      this.idTask = Number(atob(params.get('id')));
      this.loadTask(this.idTask);
    });
  }

  ngOnInit() {
  }

  private loadTask(idTask: number) {
    this.subscriptions.push(this.taskService.getTaskById(idTask).subscribe(task => {
      this.task = task as Task;
      this.loadAlternatives(this.task.idTask);
    }))
  }

  loadAlternatives(idTask: number) {
    this.subscriptions.push(
      this.alternativeService.getAlternativesByTask(idTask).subscribe(alternatives => {
        this.alternatives = alternatives as Alternative[];
        this.loadAirportViewModelsById(this.alternatives.map(alternative => alternative.airport));
        this.loadRatingsByAlternatives(this.alternatives.map(alternative => alternative.idAlternative))
      }))
  }

  loadAirportViewModelsById(airportId: number[]) {
    this.subscriptions.push(
      this.airportService.getAirportViewModelsByIdIn(airportId).subscribe(airportViewModels => {
        this.airportViewModels = airportViewModels as AirportViewModel[];
      }))
  }

  loadRatingsByAlternatives(alternativesId: number[]) {
    this.subscriptions.push(
      this.ratingService.getRatingsByAlternatives(alternativesId).subscribe(ratings => {
        this.ratings = ratings as Rating[];
        this.loadExperts(this.ratings.map(rating => rating.expert))
      }))
  }

  loadExperts(expertsId: number[]) {
    this.subscriptions.push(
      this.userService.getExpertsByIdIn(expertsId).subscribe(experts => {
        this.experts = experts as UserViewModel[];
        this.loadSolution(expertsId, this.alternatives.map(alternative => alternative.idAlternative))
      }))
  }

  loadSolution(expertsId: number[], alternativesId: number[]) {
    this.subscriptions.push(
      this.ratingService.getSolution(expertsId, alternativesId).subscribe(solution => {
        this.solution = solution as Map<number, number>
        this.createPieChart(this.solution, this.alternatives, this.airportViewModels);
        this.createBarChart(this.solution, this.alternatives, this.airportViewModels);
      }))
  }


  createPieChart(solution: Map<number, number>, alternatives: Alternative[], airportViewModels: AirportViewModel[]) {
    for (const key in solution) {
      this.chartData.pieData.push(solution[key]);
      this.chartData.labels.push(airportViewModels
        .find(airport => airport.idAirport == alternatives
          .find(alternative => alternative.idAlternative == +key).airport)
        .airport)
    }
  }

  createBarChart(solution: Map<number, number>, alternatives: Alternative[], airportViewModels: AirportViewModel[]) {
    for (const key in solution) {
      this.barData.barChartData[0].data.push(solution[key])
      this.barData.barChartLabels.push(airportViewModels
        .find(airport => airport.idAirport == alternatives
          .find(alternative => alternative.idAlternative == +key).airport)
        .airport)
    }
  }

  getAlternativeById(idAirport): AirportViewModel {
      return this.airportViewModels.find(airportViewModel => airportViewModel.idAirport === idAirport);
  }

  getRatingByExpertAndAlternative(ratings: Rating[], expert: number, alternative: number, i): number {
    if (expert && alternative)
      return this.ratings
        .find(rating => rating.expert == expert && rating.alternative == alternative).rating;
  }

  btoa(s: string) {
    return btoa(s);
  }

  getGoalsWeightByAlternative(solution: Map<number, number>, alternative: number) {
    return solution[alternative.toString()];
  }

  delete(idTask: number) {
    this.taskService.delete(idTask).subscribe();
    this.router.navigate(['/'])
  }
}
