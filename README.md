# CarCar

Team:

* Person 1 - Isaac - Service Microservice
* Person 2 - Ian LI - Sales

## Design
Our design encompassed a user friendly interface that was easy to read and easy to utilize, endeavoring to fully take advantage of the strengths of the microservice model.

The starter application comes with a fully-functioning scaffold of microservices, a front-end application, and a database. The bold text services in the following list are the ones that you and your teammate will implement:
Inventory API: provides Manufacturer, Model, and Automobile RESTful API endpoints but needs a front-end
Database: the PostgreSQL database that will hold the data of all of the microservices

## Service microservice

Explain your models and integration with the inventory
microservice, here.

AutomovileVO model- build to be able to have a communication between the Inventory microservice and the Service microservice, in order for this to work I had to make a poller to be pulling data from the Inventory microservice.

Technician model- built thinking about how  someone in the future might have to have the name of the technician, with a maximum amount of text of 100 letters and also a unique ID less than 2500 since this specific branch of sales and services will not have more than that amount of employees.

Appointment Model- a vin was made, this time it didn't have to be unique becuase a customer can have more than one appointment with the same vin. customer_name to type the owner of the vehicle, date/time: to know when the appointment took place and at a specific time. Reason to know why the client was coming to get a service, vip as default as no one was considered vid unless they were in the inventory database, is_finished to know if the car didn't have to be in the appointment list any longer, and at last the technician foreign key as we want to assign a technician to that speific appointment.

The vin and href properties were used for my AutomobileVO that were updated every 10 seconds thanks to the poller that was built, this allowed me to compare the VIN number in the inventory microservice to the Appointment model in my Service microservice. This allowed me to change the value of vip in my appointment model from the default of false to true once it was confirmed that the vin was in the inventory.

## Sales microservice
We chose salespoerson, customer, salesrecord and automobile as our Value object.  The intentionb was for a salesrecord filtered through the sales person and we included a salesperson and technician form together as an employee list.

We will needs to creat Salesrecord.
AutomobileForm creat Automobile-vin, 
SalesPersonForm creat salesperson, 
CustomerForm creat customer, 
at the end, SalesForm submit then.



