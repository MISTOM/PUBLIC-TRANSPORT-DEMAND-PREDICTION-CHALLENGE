#!/usr/bin/env node
const csv = require('csv-parser')
const fs = require('node:fs')
const content = []
const sundayRidesArr = []
const occourences = {}

/**
 * Formarts Date and returns the day
 * @param {string} date unformated date
 * @return {number} integer corresponding with the day of the week
 */
let formatGetDay = (date) =>{
    const [day, month, year] = date.split('-')
    return new Date(`20${year}`,month, day).getDay()
}

fs.createReadStream('test.csv').pipe(csv({}))
    .on('data', data => {
        content.push(data)
    })
    .on('end', () =>{
        console.log('CONTENT:', content.length)
        const sundayRoutes = content.filter((el)=>{
            return formatGetDay(el.travel_date) == 3
        })
        sundayRidesArr.push(...sundayRoutes)
        
        console.log('SUNDAY ROUTES:',sundayRidesArr.length)
        const travelFrom = new Set()
        for (let i of sundayRidesArr){
            travelFrom.add(i['travel_from'])
        }

        console.log('TRAVEL FROM SET:', travelFrom)
        for (let i of travelFrom) {
            for (let j of sundayRidesArr){
                if (j.travel_from == i){
                    if (!occourences[i]) occourences[i] = 0;
                    occourences[i]++
                }
            }
        }
        console.log('OCCOURENCES:', occourences)

        
    })
        