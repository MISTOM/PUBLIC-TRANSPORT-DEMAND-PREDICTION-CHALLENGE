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

fs.createReadStream('train_revised.csv').pipe(csv())
    .on('data', (data) => content.push(data) )
    .on('end', () => {
        const KijauriRoutes = content.filter((el) => {
            return el.travel_from === 'Kijauri'
                && toEpochTime(el.travel_time) < toEpochTime('7:30')
        })
        // console.log(KijauriRoutes)
    })