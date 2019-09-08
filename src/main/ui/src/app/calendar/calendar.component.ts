import { Component, OnInit, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';

@Component({
    selector: 'calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit {
    @ViewChild("tbody") tbody: ElementRef;
    today = new Date();
    currentMonth = this.today.getMonth();
    currentYear = this.today.getFullYear();
    selectYear: any = {};
    selectMonth: any = {};
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    constructor(private renderer: Renderer2) { }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this.showCalendar(this.currentMonth, this.currentYear)
    }

    showCalendar(month, year) {
        let firstDay = (new Date(year, month)).getDay();

        // clearing all previous cells
        this.tbody.nativeElement.innerHTML = ''

        // filing data about month and in the page via DOM.
        //monthAndYear.innerHTML = months[month] + " " + year;
        this.selectYear.value = year;
        this.selectMonth.value = month;

        // creating all cells
        let date = 1;
        for (let i = 0; i < 6; i++) {
            // creates a table row
            let row = this.renderer.createElement("tr");

            //creating individual cells, filing them up with data.
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    let cell = this.renderer.createElement("td");
                    let cellText = this.renderer.createText("");
                    this.renderer.appendChild(cell, cellText);
                    this.renderer.appendChild(row, cell);
                }
                else if (date > this.daysInMonth(month, year)) {
                    break;
                }

                else {
                    let cell = this.renderer.createElement("td");
                    this.renderer.setStyle(cell, 'cursor', 'pointer');
                    let cellText = this.renderer.createText(date.toString());
                    if (date === this.today.getDate() && year === this.today.getFullYear() && month === this.today.getMonth()) {
                        cell.classList.add("bg-info");
                    } // color today's date
                    this.renderer.listen(cell, 'click', () => {
                        console.log("click");
                        this.renderer.setStyle(cell, 'color', 'red');
                    });
                    this.renderer.appendChild(cell, cellText);
                    this.renderer.appendChild(row, cell);
                    date++;
                }
            }
            this.renderer.appendChild(this.tbody.nativeElement, row); // appending each row into calendar body.
        }
    }

    next() {
        this.currentYear = (this.currentMonth === 11) ? this.currentYear + 1 : this.currentYear;
        this.currentMonth = (this.currentMonth + 1) % 12;
        this.showCalendar(this.currentMonth, this.currentYear);
    }

    previous() {
        this.currentYear = (this.currentMonth === 0) ? this.currentYear - 1 : this.currentYear;
        this.currentMonth = (this.currentMonth === 0) ? 11 : this.currentMonth - 1;
        this.showCalendar(this.currentMonth, this.currentYear);
    }

    jump() {
        this.currentYear = parseInt(this.selectYear.value);
        this.currentMonth = parseInt(this.selectMonth.value);
        this.showCalendar(this.currentMonth, this.currentYear);
    }

    daysInMonth(iMonth, iYear) {
        return 32 - new Date(iYear, iMonth, 32).getDate();
    }
}
