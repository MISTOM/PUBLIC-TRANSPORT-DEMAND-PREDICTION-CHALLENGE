# PUBLIC TRANSPORT DEMAND PREDICTION CHALLENGE

## Description of the challenge
[The public transportation demand prediction dataset](https://zindi.africa/competitions/traffic-jam-predicting-peoples-movement-into-nairobi/data) comprises information about tickets
purchased from Mobiticket for 14 routes from “up country” into Nairobi for 7 months.

### The challenge is to:
1.  Find the top 7 most travelled routes for a Sunday on average, indicate the average of
each and rank them in decreasing order.
2. The probability that a passenger travelling from Kijauri will take a Shuttle if
they depart before 07:30?
3. The Sequence ‘MK’ appears in a payment reference. Based on the distribution of
characters in all the payment references what do you think is the most probable next
character (if any)?

**Sample of the data**
```csv
ride_id,seat_number,payment_method,payment_receipt,travel_date,travel_time,travel_from,travel_to,car_type,max_capacity
1442,15A,Mpesa,UZUEHCBUSO,17-10-17,7:15,Migori,Nairobi,Bus,49
5437,14A,Mpesa,TIHLBUSGTE,19-11-17,7:12,Migori,Nairobi,Bus,49
5710,8B,Mpesa,EQX8Q5G19O,26-11-17,7:05,Keroka,Nairobi,Bus,49
```

Variables Description
- **ride_id**: unique ID of a vehicle on a specific route on a specific day and time.
- **seat_number**: seat assigned to ticket
- **payment_method**: method used by customer to purchase ticket from Mobiticket (cash or Mpesa)
- **payment_receipt**: unique id number for ticket purchased from Mobiticket
- **travel_date**: date of ride departure. (MM/DD/YYYY)
- **travel_time**: scheduled departure time of ride. Rides generally depart on time. (hh:mm)
- **travel_from**: town from which ride originated
- **travel_to**: destination of ride. All rides are to Nairobi.
- **car_type**: vehicle type (shuttle or bus)
max_capacity: number of seats on the vehicle
___
## Challenge 1 
To start working with the data, we need convert the csv data to JavaScript's array of objects. I used a library called csv-parser
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
In order to find the top 7 most travelled routes, first I need to sort the occourences object by value. I do this by first converting the object into array of key/values of the enumerable properties; Now the _Array.sort()_ is available in the array.
```JavaScript
const sorted_arr_of_occourences = Object.entries(occourences).sort(([,a], [,b]) => b - a))
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
  Keroka: 174,
  Kijauri: 127,
  Nyachenge: 89,
  Rodi: 59,
  Mbita: 48,
  Ndhiwa: 23,
  Sori: 21,
  Keumbu: 3
}
*/
```
