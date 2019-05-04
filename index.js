'use strict';

const ical = require('ical');
const Cleaning = require("./Cleaning");
const DEFAULT_WINDOW = 7;
let eventcount = 0;
let events = [];

Date.prototype.addDays = function(days){
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

let url = 'https://www.airbnb.com/calendar/ical/1094225.ics?s=9afed13a021bd20a73a558c08914b3eb';

ical.fromURL(url, {}, function(err, data){
    for (let k in data){
        if (data.hasOwnProperty(k)) {
            let ev = data[k];
            if(data[k].type === 'VEVENT') {
                events.push(ev);
            }
        }
    }
    for(let i = 0; i < events.length; i++){
        let cleaning = new Cleaning();
        let start = events[i].end;
        let end = events[i+1] === undefined ? new Date(events[i].end).addDays(DEFAULT_WINDOW) : events[i+1].start;
        cleaning.stay = events[i].uid
        cleaning.start = start.getMonth().toString() + "/" +
            start.getDate().toString() + "/" +
            start.getFullYear().toString();
        cleaning.end = end.getMonth().toString() + "/" +
            end.getDate().toString() + "/" +
            end.getFullYear().toString();
        cleaning.property = 1;
        cleaning.cleaner = 2;

        if(i === events.length - 1){
            console.log("FINAL EVENT!");
        }
        console.log(cleaning);
    }
});
// if(++eventcount === 1){
//
// }
// //console.log(`${ev.summary} is in ${ev.location} on the ${ev.start.getDate()} of ${months[ev.start.getMonth()]} at ${ev.start.toLocaleTimeString('en-GB')}`);
// let cleaning = new Cleaning();
// let start = ev.start;
// let end = ev.end;
// cleaning.start = start.getMonth().toString() + "/" +
//     start.getDate().toString() + "/" +
//     start.getFullYear().toString();
// cleaning.end = end.getMonth().toString() + "/" +
//     end.getDate().toString() + "/" +
//     end.getFullYear().toString();
//
// cleaning.property = 1;
// cleaning.cleaner = 2;
//
// console.log(`Cleaning ${eventcount}`);
// console.log(cleaning);