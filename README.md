<p align="center"> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a>  </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a>  </p>

<h1 align="center">
  Orderly - Inventory Tracking and Order Automation
</h1>
Orderly allows businesses to have orders placed automatically when each product's in stock amount hits it's target point. Once the orders are automatically placed, the user will be notified of order and the expected arrival date of the shipment. What makes Orderly different from other order automation technologies? See features below:
<section align="center">
<a href="https://orderly.pro/" target="_blank" rel="noreferrer">
<img src="https://i.ibb.co/9H01gcr/orderly-Pic.png" alt="orderly picture" width="620" height="400"/>
</a>
  </section>
  
## Features
### Inventory tracking:
- Pin inventory items to the top of the list. This is useful for the products that are used the most.
- Filter dropdown allows users to filter by SKU, Brand, or QTY in ascending or descending order.
- Add, edit, and delete inventory items. 
- Add many items at once (via CSV file upload feature) and delete many items at once (via checkbox selection popup)

### Inventory and Orders:
- A Preview of active orders is shown on the inventory page making it simple for the user to see everything they need from the inventory page.
- When an inventory item's checkbox is selected, the items and it's corresponding orders are highlighted the same color. The colors alternate from one product to the next making it visually appealing to match orders in the order table to the product in inventory table 
- Users can edit the "target" or "reorder at" points of each product and the amount to be ordered.
### Order automation:
- Orders are automatically created when the target point for that order is hit. 
- Orders are also created autmatically at multiple poinits below target point (40% to 70% of stock and 0% to 40% of stock) to insure that stock stays up despite possible slow delivery times.
### Manual Orders and Deliveries:
- Create one time orders with desired quantity via the "order now" popup assigned to each product. This can be usefull if you have a busy season coming up.
- Once delivery arrived, user can mark order as delivered and this send the order to the order history section of the orders page and increases the "In Stock" amount

## Usage
In this section, you can describe how to use your app and provide examples of typical workflows. This can include how to add inventory items, how to create orders, and how to access reports.

### Installation
- clone repo
- add one .env file to Server folder and one to Client folder. Request contents from one of us project owners. Insert all env variables
- cd server -> npx prisma generate -> npm install -> npm run dev
- new terminal - cd client -> npm install -> npm run dev

### License
This work is licensed under a <a href="https://creativecommons.org/licenses/by-nc/4.0/legalcode" target="_blank">Creative Commons Attribution-NonCommercial 4.0 International License</a>.

### Acknowledgments
Credit to Danny Thompson and Scott Thompson of Dallas Software Developers for volunteering and organizing this cohort!<br>
They set the foundation that allowed us to build a successful application.
