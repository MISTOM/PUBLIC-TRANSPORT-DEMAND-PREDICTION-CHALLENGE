## Challenge 1 
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

First I filter the results using the **travel_date** property so that I have a data set containing travel routes for Sunday only. To find the most travelled routes I use **travel_from** towns to find the number of occourences of it. Since **travel_to** is consistent throughout the dataset.
First, I create a set of all the **travel_from** towns and loop through them cross-checking them with the Sunday Routes Dataset.
```JavaScript
const travelFrom = new Set()
const occourences = {}
for (let i of travelFrom) {
    for (let j of sundayRoutes){
        if (j.travel_from === i){
            if (!occourences[i]) occourences[i] = 0;
            occourences[i]++
        }
        }
    }
```
I populate an object, **occourences** with a key of the town and value of the number of occourences and increment the value for each match

Now I have the number of occourences of each town
```JavaScript
occourences = {
  'Homa Bay': 965,
  'Migori': 974,
  'Keroka': 174,
  'Kisii': 3853,
  'Keumbu': 3,
  'Rongo': 555,
  'Kijauri': 127,
  'Nyachenge': 89,
  'Kehancha': 293,
  'Awendo': 281,
  'Sirare': 668,
  'Rodi': 59,
  'Mbita': 48,
  'Sori': 21,
  'Ndhiwa': 23
}
```
In order to find the top 7 most travelled routes, first I need to sort the occourences object by value. I do this by first converting the object into array of key/values of the enumerable properties; Now the _Array.sort()_ is available in the array. I can also use the slice method to only get the top 7 items.
```JavaScript
const sorted_arr_of_occourences = Object.entries(occourences).sort(([,a], [,b]) => b - a)).slice(0, 7)
```
To convert the *sorted_arr_of_occourences* back to an object:
```JavaScript
const sorted_occourences = Object.fromEntries(sorted_arr_of_occourences)
/*
{
  Kisii: 3853,
  Migori: 974,
  'Homa Bay': 965,
  Sirare: 668,
  Rongo: 555,
  Kehancha: 293,
  Awendo: 281,
}
*/
```
Now we have the top 7 most travelled routes