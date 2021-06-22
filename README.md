# StockUp

## Description

StockUp allows a user to register their company, add parts to inventory, and add products that those parts are used to build. The user has full CRUD capabilities on their inventory and products. The user can complete a new order recommendation form by inputting how many of each product they sold in a date range. The app then displays an order report recommending how much of each inventory item the user should order to meet their minimum required inventory amount. The app updates inventory amounts as parts are used and received.

---
![Client](https://img.shields.io/badge/Client%20Side-HTML%2C%20CSS%2C%20React%2C%20React--Bootstrap-blue)
![Server](https://img.shields.io/badge/Server%20Side-Python%2FDjango-blue)

## Features
* User can register their company and personal info
* CRUD functionality on products
    * Add/remove parts from a product
    * Edit name or amount of a part used on a product
* CRUD functionality on inventory
    * Add part to inventory from the part database
    * Edit amount in stock, minimum required, and cost
* Create/Read functionality on part database
    * Add a new part to the database, which also adds it to user inventory
        * Add new vendor or new unit of measurement when adding a new part to the database
        * Alert message appears if user tries to add a database part that already exists
* Create/Read/Update on Order Reports
    * User submits new Order Recommendation Form by inputting the amount of each product they sold in a date range
        * Inventory is adjusted based on number of parts needed for products sold
    * Users can only start a new order rec if they have closed their previous report
    * User can edit sales on open or closed reports
        * Editing sales will readjust inventory and will readjust order recommendation on open order reports
    * User can mark parts as Ordered and input date and amount ordered
    * User can mark part as received and input date received
        * Inventory is adjusted when a part is marked received
    * When a part is removed from inventory or a product is deleted the data will still be available on the reports

---
## Background

My previous employer, who runs a small business selling welding products, asked me to make a spreadsheet to tell him how much inventory to order based on the number of products sold. It sounded like the perfect task for an app to do. Monitoring inventory through the app instead of a spreasheet will hopefully eliminate unnecessary errors and make it easier for the business to scale their stock and track useful trends.  

---

## Installation

### Requirements

### Instructions for Use
1. Clone this repository to your machine
3. Run server from the app [instructions](url to server repo)
3. Run `npm start` from the root directory to launch app

## Support

* Please fill out an issue ticket if you run into any major issues or bugs that should be addressed.
* If you have access to the Nashville Software School slack, you can send a message to `@Kaitlin Kelley`

---
## Roadmap

### Future features could include:

* Order Recs
    * Auto fill suggested date range when starting a new order rec form based on user's order schedule 
    * Display which user marked a part as ordered/received in order rec detail
* Inventory
    * Search by name or part # 
    * Filter by vendor 
    * Order by name, amount in stock, or vendor 
    * Image upload/display/edit
    * Change vendor
        * If name, number, vendor combo exists inventory is updated with that part
        * If combo doesn't exist part is added to database and inventory
* Part Database
    * Add category to part 
    * Displayed by category with user's preferred category on top
    * search by name or part #
* 
* 
* 
* 
*
*
*
*
*
*
*

Products
User can search products by name
Product Detail
Image displayed
Add/Edit Form
Image upload/edit
Vendors
Vendor List
Display list of all vendors the user buys parts from
User can search vendors by name
Click on vendor name redirects to Vendor Detail
Vendor Detail/Edit
Initially only has vendor url
User can add contact/sales rep info and login info
User can edit any vendor info except url
On mobile, click on Parts redirects to Parts List filtered by vendor (report?)
Multiple User Types
Admin
Full CRUD on everything
Promote/demote users
add/inactivate/reactivate users
Approve requested changes from general users
View reports
Decide which changes a general user can make independently, which should be approved, and which should not be accessible
Can view all users and edit them
General
Can request changes on anything they have access to
View access to products, parts inventory, and order recs
Complete order recs (ordered/received)
Will be allowed to complete order recs (mark parts as ordered/received)
Upload images to parts and products
Profile
When registering, user can add
Order schedule (how often they order)
Category preference
Company logo
Displays company info, but only admin can see other users
Change log tracks all changes made, employee who made the change, date changed, approver, and date approved
Reports
Weekly, Monthly, Quarterly, Yearly views
Sales
Total sales
Individual product sales
Parts
Lead time
Parts used per time frame
Average order amount
Cost over time
Order Recs
Avg time to close and order rec

---
## Contributing

The more the merrier! Please feel free to fork this repository and create a pull request with any changes or improvements you can think of. 

---
### Authors & Acknowledgements

Created by [Kaitlin Kelley](https://github.com/kjk1325).

Supported by my amazing mentor [Jisie David](https://github.com/jisie) and team members at [Nashville Software School](https://nashvillesoftwareschool.com)

---

## License

Open source.