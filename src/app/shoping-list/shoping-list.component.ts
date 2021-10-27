import {  AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingrediants } from '../shared/ingrediants.model';
import { shoppingService } from './shopping.service';

import * as shoppingListActions from '../shoping-list/store/shopping-list.actions';
import * as fromAppReducer from '../store/app-reducer'


@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css'],
  
})
export class ShopingListComponent implements OnInit, AfterViewInit,OnDestroy {
  
  // private igChangeSub: Subscription; 
  ingrediants: Observable<any>;
  @ViewChild('myCanvas', { static: false }) myCanvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  constructor(private shoppingService: shoppingService,
    private store: Store<fromAppReducer.AppState>) { }

 
  ngOnInit() {
  
    this.ingrediants = this.store.select('shoppingList');

    // This is A Service Way
    // this.ingrediants = this.shoppingService.getIngrediants();
    // this.igChangeSub=  this.shoppingService.onChangeIngrediants
    //   .subscribe(
    //   (commingIngrediants: Ingrediants[]) => {
    //     this.ingrediants = commingIngrediants;
    //   }
    // )
  }

  onEditItem(index: number) {
    // this.shoppingService.startEditing.next(index);
    this.store.dispatch(new shoppingListActions.StartEdit(index));
  }
  

ngOnDestroy(): void {
  // this.igChangeSub.unsubscribe()  
}

  // no need as we using service way
  // onIngrediantAdded(ingrediant:Ingrediants) {
  //   this.ingrediants.push(ingrediant);
  // }

  ngAfterViewInit() {

    // draw Chart With For loop

    // this.store.select('ShoppingList').subscribe(
    //   res => {
    //     console.log(res.ingrediants);
    //     this.ctx = this.myCanvas.nativeElement.getContext('2d');
    //     this.ctx.lineWidth = 10;
    //     let w = this.myCanvas.nativeElement.width;
    //     let h = this.myCanvas.nativeElement.height;
    //     let x = 50;
    //     let y = h - 50;
    //     for (let i = 0; i < res.ingrediants.length; i++) {
    //       this.ctx.fillStyle = '#d35400'
    //       this.ctx.fillRect(x, h - y, 60, y);
    //       this.ctx.fillStyle = '#fff'
    //       this.ctx.fillText(`${i + 1}`, x+25, h - 20);
    //       x += 100;
    //       y -= 50;
    //     }
    //   }
    // )

    this.ctx = this.myCanvas.nativeElement.getContext('2d');
    this.ctx.lineWidth = 1;
    let w = this.myCanvas.nativeElement.width;
    let h = this.myCanvas.nativeElement.height;
    // let theGrediant = this.ctx.createLinearGradient(0, 0, 200, 0);
    // theGrediant.addColorStop(0,'red')
    // theGrediant.addColorStop(1,'blue')
    // this.ctx.strokeStyle = theGrediant;
    // this.ctx.strokeRect(20, 20, 200, 100);
    // this.ctx.font = "22px tahoma";
    // this.ctx.fillStyle = theGrediant;
    // this.ctx.fillText('Hellow Canvas', 50, 50);

    // draw Chart Column 
    // this.ctx.font = '22px tahoma'
    
    // this.ctx.fillStyle = '#d35400'
    // this.ctx.fillRect(50, 50, 60, h - 50);
    // this.ctx.fillStyle = '#fff'
    // this.ctx.fillText('1',70,h-20)

    // this.ctx.fillStyle = '#16a085'
    // this.ctx.fillRect(150, 100, 60, h - 100)
    // this.ctx.fillStyle = '#fff'
    // this.ctx.fillText('2',170,h-20)


    // this.ctx.fillStyle = '#8e44ad'
    // this.ctx.fillRect(250, 150, 60, h - 150)
    // this.ctx.fillStyle = '#fff'
    // this.ctx.fillText('3',270,h-20)


    // this.ctx.fillStyle = '#c0392b'
    // this.ctx.fillRect(350, 200, 60, h - 200)
    // this.ctx.fillStyle = '#fff'
    // this.ctx.fillText('4',370,h-20)


    // this.ctx.fillStyle = '#27ae60'
    // this.ctx.fillRect(450, 250, 60, h - 250)
    // this.ctx.fillStyle = '#fff'
    // this.ctx.fillText('5',470,h-20)


    // this.ctx.fillStyle = '#2c3e50'
    // this.ctx.fillRect(550, 300, 60, h - 300)
    // this.ctx.fillStyle = '#fff'
    // this.ctx.fillText('6',570,h-20)


    // draw A line 
    // this.ctx.lineWidth = 5;
    // this.ctx.beginPath();
    // this.ctx.moveTo(50, 50);
    // this.ctx.lineTo(100, 100);
    // this.ctx.strokeStyle = 'blue'
    // this.ctx.stroke();

    //draw Circle
    // this.ctx.arc(300, 200, 150, 0, 6.82, false);
    // this.ctx.fill();
    // this.ctx.stroke();
    

    // shadow
    // this.ctx.shadowColor = "rgba(0,0,0,.5)";
    // this.ctx.shadowBlur = 5;
    // this.ctx.shadowOffsetX = 10;
    // this.ctx.shadowOffsetY = 20;
    // this.ctx.fillStyle = 'green';
    // this.ctx.fillRect(50,50,200,100)

    // transformation and save and restor context
    // this.ctx.fillStyle = 'green';
    // this.ctx.strokeRect(50, 50, 200, 100);
    // this.ctx.fillRect(50, 50, 200, 100);


    // this.ctx.fillStyle = 'red';
    // this.ctx.fillRect(150, 150, 200, 100);


    // make a Smile Face

    this.ctx.fillStyle = "#666";
    this.ctx.fillRect(0, 0, w, h);


    //main Face Circel

    this.ctx.beginPath();
    this.ctx.fillStyle="#ffff02"
    this.ctx.arc(300, 200, 100, 0, Math.PI * 2);
    this.ctx.fill();


    // mouth Circle 


    this.ctx.beginPath();
    this.ctx.fillStyle = "#FFF";
    this.ctx.arc(300, 200, 80, 0, Math.PI);
    this.ctx.fill();


    //left eay
    this.ctx.beginPath();
    this.ctx.fillStyle = "#000";
    this.ctx.arc(260, 160, 15, 0, Math.PI*2);
    this.ctx.fill();

    //right eay

    this.ctx.beginPath();
    this.ctx.fillStyle = "#000";
    this.ctx.arc(340, 160, 15, 0, Math.PI*2);
    this.ctx.fill();



  }

}
