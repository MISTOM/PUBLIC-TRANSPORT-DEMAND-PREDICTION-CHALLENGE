# PUBLIC TRANSPORT DEMAND PREDICTION CHALLENGE

## Description of the challenge
[The public transportation demand prediction dataset](https://zindi.africa/competitions/traffic-jam-predicting-peoples-movement-into-nairobi/data) comprises information about tickets
purchased from Mobiticket for 14 routes from “up country” into Nairobi for 7 months.

### The challenge is to: 
1. Find the top 7 most travelled routes for a Sunday on average, indicate the average of
each and rank them in decreasing order. [SOLUTION](Challenge1)
2. The probability that a passenger travelling from Kijauri will take a Shuttle if
they depart before 07:30? [SOLUTION](Challenge2)
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
- max_capacity: number of seats on the vehicle

### How to Run
1. Clone this repo into your machine
2. Ensure you have node version 16 or higher
2. run `npm install` to install the dependancies
3. To run the First Challenge run `npm run start1`
    + to run the Second Challenge run `npm run start2`
```Bash
-> % npm run start1
> node Challenge2/main.js

TOP 7 MOST TRAVELED ROUTES TO NAIROBI:
 [
  'Kisii',    'Migori',
  'Homa Bay', 'Sirare',
  'Rongo',    'Kehancha',
  'Awendo'
]
-> %
-> % npm run start2
> node Challenge2/main.js

The Probability of a passenger travelling from Kijauri will take a shuttle and depart before 7:30 is 53%
```
