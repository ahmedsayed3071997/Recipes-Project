import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ShopingListComponent } from "./shoping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";


@NgModule({
    declarations: [
        ShopingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: 'shopping-list', component: ShopingListComponent}
        ])
    ]
})
export class ShopingListModule {
    
}