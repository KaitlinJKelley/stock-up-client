# StockUp

## Description

StockUp allows a user to register their company, add parts to inventory, and add products that those parts are used to build. The user has full CRUD capabilities on their inventory and products. The user can complete a new order recommendation form by inputting how many of each product they sold in a date range. The app then displays an order report recommending how much of each inventory item the user should order to meet their minimum required inventory amount. The app updates inventory amounts as parts are used and received.

---
![Client](https://img.shields.io/badge/Client%20Side-HTML%2C%20CSS%2C%20React%2C%20React--Bootstrap-blue)
![Server](https://img.shields.io/badge/Server%20Side-Python%2FDjango%2C%20Django--safedelete-blue)

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

My previous employer, who runs a small business selling welding products, asked me to make a spreadsheet to tell him how much inventory to order based on the number of products sold. It sounded like the perfect task for an app to do. Monitoring inventory through the app instead of a spreasheet will hopefully eliminate unnecessary errors and make it easier for the business to scale and track useful trends.  

---

## Installation

1. Clone this repository to your machine
3. [Run the server](https://github.com/KaitlinJKelley/stock-up-server)
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
* Products
    * Search by name
    * Image upload/display/edit
* Vendors
    * List all vendors the company buys from
        * Click on name redirects to vendor detail
    * Search by name
    * User can edit vendor to add:
        * Sales rep name and contact info
        * Login info for vendor site
        * Vendor phone number and address
    * Vendor detail will list all above items as well as list of parts the company buys from that vendor
* Users
    * Admin
        * Full access to all app features 
        * Promote/demote users to/from admin
        * Activate/deactivate other employees 
        * CRUD on general users
        * Approve requested changes a general user makes
        * View reports
        * Indicate which CRUD features a general user can perform without approval
        * View company profile in + other users and their info
    * General 
        * Full CRUD access wherever admin allows with or without approval, depending on administered permissions 
        * Complete order recs
            * Order Rec reports emailed to admin users
        * Image upload/edit 
        * can view company profile info
* Profile 
    * Add order schedule (how often the user orders) and category preference inputs to register form 
    * Company logo image upload/edit at register 
    * Change log tracks all changes made by any user and lists:
        * employee who made the change
        * date changed
        * Note about why change was made
        * approver (if applicable)
        * date approved (if applicable)
* Reports  
    * Displayed in weekly, monthly, quarterly, or yearly view based on selection 
    * Sales
        * Total sales
        * Sales by product
    * Parts
        * Lead time
        * Part used per time frame
        * Average order amount
    * Order Recs
        * Avg time to close an order rec

---
## Contributing

Please feel free to fork this repository and create a pull request with any changes or improvements you can think of. 

---
### Authors & Acknowledgements

Created by [Kaitlin Kelley](https://github.com/kjk1325).

Supported by lead [Hannah Hall](https://github.com/hannahhall) and team members at [Nashville Software School](https://nashvillesoftwareschool.com)

---

## License

Open source.