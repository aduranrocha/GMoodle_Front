//Component that will paginate the user list
import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
    selector: 'pager-nav',
    templateUrl: './pager.component.html'
})

export class pagerComponent implements OnInit, OnChanges {

    @Input() pagedor: any;
    //Variables
    pages: number [];
    from: number;
    to: number;

    constructor(){}

    ngOnInit(){
     
        this.initpager();
    }
//This will update the number of pages when the html corresponding is called o rendered
    ngOnChanges(changes : SimpleChanges){
        let updatedPagedor = changes['pagedor'];

        if(updatedPagedor.previousValue){
            this.initpager();
        }
    }
//Actual pager, this will take the initial number of pages and will distribute the list on each page, will add more pages as need!.
    private initpager(): void {
        this.from = Math.min(Math.max(1, this.pagedor.number - 4),
        this.pagedor.totalPages - 5);
        this.to = Math.max(Math.min(this.pagedor.totalPages, this.pagedor.number +4),6);

        if (this.pagedor.totalPages > 5){
            this.pages = new Array(this.to - this.from + 1).fill(0).map((_value, index) => index + this.from);
        } else {
            this.pages = new Array(this.pagedor.totalPages).fill(0).map((__value, index) => index + 1);
        }
    }
}