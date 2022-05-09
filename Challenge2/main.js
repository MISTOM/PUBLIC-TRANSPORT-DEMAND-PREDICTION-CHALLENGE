const csv = require('csv-parser')
const fs = require('node:fs')
const content = []

/**
 *Converts the time to Epoch time
 * @param {string} time
 */
const toEpochTime = (time) => {
    
    const [hrs, min] = time.toString().split(':')
    const time_a = new Date(2000, 1, 1)
    time_a.setHours(hrs, min, 0, 0)
    return time_a.getTime()
}

/**
 * @param {number} no_of_outcome
 * @param {number} total_no_of_outcome
 * @returns {number} probability percentage
 */
const probability = (no_of_outcome, total_no_of_outcome) => {
    return Math.round((no_of_outcome/total_no_of_outcome) * 100)
}

fs.createReadStream('train_revised.csv').pipe(csv())
    .on('data', (data) => content.push(data) )
    .on('end', () => {
        const kijauri_Routes =
        content.filter(el => { return el.travel_from === 'Kijauri'
            && toEpochTime(el.travel_time) < toEpochTime('7:30')
        })
        const no_of_kijauri_routes = kijauri_Routes.length
        const no_of_kijauri_shuttle_routes =
            kijauri_Routes.filter(el => el.car_type == 'shuttle').length
            
        console.log(`The Probability of a passenger travelling from Kijauri will take a shuttle and depart before 7:30 is ${probability(no_of_kijauri_shuttle_routes, no_of_kijauri_routes)}%`)
        
    })