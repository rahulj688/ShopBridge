Steps to clone and run the application locally:
1. Create a folder and open terminal for the same location.
2. git clone https://github.com/rahulj688/ShopBridge.git
3. cd ShopBridge
4. git checkout version1
5. npm install
6. npm start (This will automatically open the browser with the url "http://localhost:3000")

Backend API details:
1. GET API: https://5f44abf43fb92f0016753a78.mockapi.io/products
2. POST API: https://5f44abf43fb92f0016753a78.mockapi.io/products
3. DELETE API: https://5f44abf43fb92f0016753a78.mockapi.io/products/${product.id}

Functionalities Added on FrontEnd:
1. User can add a product to the inventory by providing following details:
  a. Name of product
  b. Description of product (Description should be entered separated by comma)
  c. Price of product
  d. Image (if not provided, a sample image will be added)
  e. On clicking Submit  button the product will get added in the inventory as well as the data will get post in the API.
2. User can see the products present in the inventory on the Home page. The products are fetched from the GET API.
3. On clicking the Product Id, user will be navigated to the next page displaying the product description in detail.
4. On clicking delete icon against the product, the product will get removed from the inventory using DELETE API.
  a. A button will be enabled on the screen above the table after deleting an item showing the Recently Deleted Items.
  b. If user wants to restore the item deleted, he can open the Deleted items Modal by clickng the Button and can restore individual or all products. The restored products will be get posted via tha API.
