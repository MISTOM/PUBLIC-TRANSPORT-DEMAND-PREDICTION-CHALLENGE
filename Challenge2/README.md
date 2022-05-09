## Challenge 2 
To start working with the data, we need convert the csv data to JavaScript's array of objects. I used a library called [csv-parser](https://www.npmjs.com/package/csv-parser)
```json
"dependencies": {
    "csv-parser": "^3.0.0"
  }
```
To use the module, I create a readable stream to the desired CSV file, instantiate csv, and pipe the stream to csv-parser. Now we have an array of objects.
```JavaScript
[ {
    ride_id: '5777',
    seat_number: '14A',
    payment_method: 'Mpesa',
    payment_receipt: 'MZHGDGS6QZ',
    travel_date: '27-11-17',
    travel_time: '7:10',
    travel_from: 'Homa Bay',
    travel_to: 'Nairobi',
    car_type: 'Bus',
    max_capacity: '49'
  } ... ]
```

First, I need to filter the dataset so as to have only Kijauri -  Nairobi routes before 7:30. I use the filter Array method and check the **travel_from** property equals to Kijauri and convert the time to [Epoch](https://www.cloudhadoop.com/javascript-current-epoch-timestamp/) timestamp enabling to run a conditional statement (to find routes before 7:30)
```JavaScript
content.filter(el => {
    return el.travel_from === 'Kijauri'
        && toEpochTime(el.travel_time) < toEpochTime('7:30')
})
```

Probability (event) = number of favourable outcomes/number of events in the sample space
Therefore, Probability that a passenger travelling from Kijauri will take a shuttle if they depart before 7:30 = number of Kijauri tickets before 7:30 of **car_type** shuttle / total number of Kijauri Tickets before 7:30 of all **car_type**s
