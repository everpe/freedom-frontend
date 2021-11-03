import { Component, OnInit, ViewChild } from '@angular/core';
import { Animal, Corral } from './interfaces/interfaces';
import { CorralsService } from './services/corrals.service';
import { MatDialog } from '@angular/material/dialog';
import { CorralComponent } from './components/corral/corral.component';
import { AnimalComponent } from './components/animal/animal.component';
import { AnimalsService } from './services/animals.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  title = 'freedom-frontend';
  // Data
  public corrals: Corral[] = [];
  public selectedCorral: number = 0;
  public dataSourceAnimals: Animal[] = [];
  public displayedColumnsAnimals: string[] = [ 'name', 'age', 'dangerousness'];


   dataSource!: MatTableDataSource<Animal>;
  paginationGroups = [];
  defaultPagingGroup: number | undefined;
  //Grafiba barras
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  // barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [ ], label: 'Animales por corral de mi granja' }
  ];
  constructor(
    private corralsService: CorralsService,
    public dialog: MatDialog,
    private animalsService: AnimalsService,
    private _snackBar: MatSnackBar
  )
  {}

  setLabelsCorralesToGrafic(){
  this.barChartLabels=this.corrals.map((corral) =>corral.name);
  }
  setValuesCorralGrafic(){
    this.barChartData[0].data=this.corrals.map( (corral) => {
      if(corral.animals)
      return corral?.animals.length;
      else return 0;
    } );
  }
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.corralsService.getAllCorrals().subscribe(
      res => {
        this.corrals = res.corrals;
        this.setLabelsCorralesToGrafic();
        this.setValuesCorralGrafic();
        this.loadAnimals();
      }
    );
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  loadAnimals() {
    const corral = this.corrals.find(corral => corral.id === this.selectedCorral);
    if(corral)
    {
      if(corral.animals){
        this.dataSourceAnimals = corral.animals;
        console.log(this.dataSourceAnimals );
        this.dataSource = new MatTableDataSource(this.dataSourceAnimals ? this.dataSourceAnimals  : []);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }
  }

  changeCorral() {
    this.loadAnimals();
    console.log(this.selectedCorral);
  }

  crearCorral() {
    const dialogRef = this.dialog.open(CorralComponent, {
      width: '450px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.corralsService.addCorral(result.value as Corral).subscribe(
          (res) => {
            this.loadData();
            console.log(res);
            this.openSnackBar("Se ha creado correctamente el corral","OK");
          },
          error=>{console.log(error)}
        );
      }else{
        this.openSnackBar("No se ha podido crear,debe completar el formulario","OK");
      }
    });
  }

  crearAnimal(){
    const dialogRef = this.dialog.open(AnimalComponent, {
      width: '450px',
      data: {
        corralSelected: this.corrals.find(el=>el.id===this.selectedCorral),animal: {a:2}
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result){
          // const animal= result.value as Animal;
          this.animalsService.addAnimal(result.value as Animal).subscribe(
            (res) => {
              this.loadData();
              // this.changeCorral();
              // this.loadAnimals();
              this.openSnackBar("Se ha creado correctamente el animal","OK");
},
            error=>{console.log(error)}
          );
      }else{
        this.openSnackBar("No se ha podido crear,debe completar el formulario","OK");
      }
    });
  }
}
