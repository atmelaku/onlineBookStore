const itemsDiv = document.querySelector(".items");
const searchBarInput = document.querySelector("#searchBar");
const cartIcon = document.querySelector(".cart-icon");
const total_ckeckout = document.querySelector(".total_ckeckout");
const searchIcon = document.querySelector("#search-icon");
const searchNotFound = document.querySelector("#search_not_found");
const exitCartBoard = document.querySelector(".exit-cartBoard");
const cartBoard = document.querySelector(".cart-overlay");
const orders_content = document.querySelector(".orders");
const total_items = document.querySelector(".total_items");
const clearBtn = document.querySelector(".clear_btn");
const checkOutBtn = document.querySelector(".ckeckOut_btn");
const input_totalPrice = document.querySelector(".input_totalPrice");
const input_booktitle = document.querySelector(".input_booktitle");

const placeorder_btn = document.querySelector(".placeorder_btn");
const checkout_input = document.querySelector(".checkout_input");
const shopping_cart = document.querySelector(".shopping_cart--div");

// style

checkout_input.style.display = "none";

placeorder_btn.addEventListener("click", function(){
  console.log(placeorder_btn);
  checkout_input.style.display = "block";
  shopping_cart.scrollTo(0, document.body.scrollHeight);
  console.log(cartBoard);
})





//
let one_array = [];
let products = [];

// display all items

let cart = [];

class Products{

    async getProducts(){
        try {
            let result = await fetch('/products');

            let data = await result.json();

              products = data.items;

            products = products.map(item =>{
                const {title, price} = item.fields;
                //const id = item.sys.id;
                const {id} = item.sys;
                const image =item.fields.image.fields.file.url;
                return {title, price, id, image}

            })
            return products;
            console.log(products);
        } catch (error) {
            console.log(error);
        }
    }

}

class UI {


   displayMain(){

       let products = JSON.parse(localStorage.getItem('products'));
       console.log(products);
       products.forEach(item =>{
           const div = document.createElement("div");
              div.classList.add("product");
              div.innerHTML = `
              <p> Title: ${item.title}</p>
              <p>Price:  $${item.price}</p>
              <img src = ${item.image} alt="hello" class = "product-img"
              height ="400"/><br>
              <button id="order_btn" class="order_btn" data-id="${item.id}" >Add to Cart </button>
                    <i class="fa-solid cart-icon--btn fa-person-walking"></i>

              <i class="fa-solid cart-icon--btn fa-cart-shopping"></i>


              `;
           itemsDiv.appendChild(div);

       });

   }



  search() {
 searchBarInput.addEventListener('keyup', (e)=>{
  searchIcon.style.color = "#922B21 ";


  if(e.keyCode === 13) {

      var searchString = e.target.value;

      var searchString = searchString.toLowerCase();
      const filteredChars = products.filter((char)=>{

        return char.title.toLowerCase().includes(searchString) ||

         char.price <=  searchString;
      });

      while(itemsDiv.firstChild) {
              itemsDiv.removeChild(itemsDiv.firstChild);
            }
      filteredChars.forEach(item =>{

           const div = document.createElement("div");
              div.classList.add("product");
              div.innerHTML = `
              <p> Title: ${item.title}</p>
              <p>Price:  $${item.price}</p>
              <img src = ${item.image} alt="hello" class = "product-img"
              height ="400"/><br>
              <button id="order_btn" class="order_btn" data-id="${item.id}" >Add to Cart </button>
                    <i class="fa-solid cart-icon--btn fa-person-walking"></i>

              <i class="fa-solid cart-icon--btn fa-cart-shopping"></i>

              `;
           itemsDiv.appendChild(div);





       });

       if (filteredChars.length === 0) {
         searchNotFound.style.visibility = "visible";

       }

    }
    this.getBagButtons();
  });


}




   getBagButtons(){
     const btns = document.querySelectorAll('#order_btn');
     console.log(btns);
     btns.forEach(element =>{  //element is a variable for EACH BUTTON
        //console.log(element)
        let id = element.dataset.id;
        let inCart = cart.find(item => item.id === id);
        if(inCart){
          element.innerText ="Added";
          element.disabled = true;
        }

        element.addEventListener('click', (event)=>{
          event.target.innerText = "Added";
          event.target.disabled = true;
          let cartItem = {...Storage.getProduct(id), amount: 1};

          cart = [...cart, cartItem]; //...cart means everything we had in cart
          Storage.saveCart(cart);
          this.setCartValues(cart);
          this.addToCart(cartItem);
        })
     })
   }





   addToCart(item) {

     const div = document.createElement('div');
     div.classList.add('cart-item');
     div.innerHTML = `

                    <div class="ordered_cols">
                      <div >
                        <img src=${item.image} height ="200"; width = "150";>
                        <h4>${item.title}</h4>
                      </div>
                    <div class="order_col2">
                      <h5>$${item.price}</h5>

                      <i class="fa-solid fa-plus" data-id =${item.id}></i>
                      <p class="p_item-amount">Quanty:<span class="item-amount"> ${item.amount}</span></p>
                      <i class="fa-solid fa-minus" data-id =${item.id}></i>
                      <p class="remove-item" data-id =${item.id}>remove</p>
                    </div>
                  </div>
     `;
      let string = item.title;
      console.log(string);
      one_array.push(string);
      input_booktitle.value = one_array;
      orders_content.appendChild(div);

   }


setCartValues(cart){
     let tempTotal = 0;
     let itemsTotal =0;
     cart.forEach(item =>{
       tempTotal += item.price* item.amount;
       itemsTotal += item.amount;
     })

     total_ckeckout.innerText = parseFloat(tempTotal.toFixed(2));
     input_totalPrice.value = "$" + parseFloat(tempTotal.toFixed(2));

     total_items.innerText = itemsTotal;
   }


cartLogic(){
     const btns = document.querySelectorAll('#order_btn');
     clearBtn.addEventListener('click', ()=>{
       cart =[];
       Storage.saveCart(cart);
       this.setCartValues(cart);
       btns.forEach(element =>{
         element.innerHTML = `
               Add to Cart`;
         element.disabled = false;
       });
       while(orders_content.children.length > 0){
         console.log(orders_content.children[0])
         orders_content.removeChild(orders_content.children[0]);
       }
     });
     orders_content.addEventListener('click', (event)=>{
       if(event.target.classList.contains('remove-item')){
         let removeItem = event.target;
         let id = removeItem.dataset.id;
         this.removeItem(id);
         console.log(orders_content);
         orders_content.removeChild(removeItem.parentElement.parentElement.parentElement);
       }
       if(event.target.classList.contains('fa-plus')){
         let addAmount = event.target;
         let id = addAmount.dataset.id;
         let tempItem = cart.find(item => item.id === id);
         tempItem.amount ++;
         Storage.saveCart(cart);
         this.setCartValues(cart);
         addAmount.nextElementSibling.innerText = "Quanty: " + tempItem.amount;
       }

       if(event.target.classList.contains('fa-minus')){
         let subAmount = event.target;
         let id = subAmount.dataset.id;
         let tempItem = cart.find(item => item.id === id);
         tempItem.amount --;
         if(tempItem.amount > 0){
          Storage.saveCart(cart);
           this.setCartValues(cart);
           subAmount.previousElementSibling.innerText = "Quanty: " + tempItem.amount;
         }else{
           orders_content.removeChild(subAmount.parentElement.parentElement.parentElement);
           this.removeItem(id);
         }
       }


     });
   }


removeItem(id){
     cart = cart.filter(item => item.id !== id);
     this.setCartValues(cart);
     Storage.saveCart(cart);
     let button = this.getSingleBtn(id);
     button.disabled = false;
     button.innerHTML =`
               Add to Cart`;
   }

   getSingleBtn(id){
     const btns = document.querySelectorAll('#order_btn');
     let button;
     btns.forEach(element =>{
       if(element.dataset.id === id){
         button = element;
       }
     });
     return button;
   }


   setupApp(){
     cart = Storage.getCart();
     this.setCartValues(cart);
     cart.forEach(item => this.addToCart(item));


}

}
cartIcon.addEventListener("click", function() {

    cartBoard.style.display = "block";
  })

exitCartBoard.addEventListener("click", function() {


    cartBoard.style.display = "none";

  })







class Storage {
    static saveProducts(products){
      //JSON.stringify() method converts a JavaScript object or value to a JSON string
      //the key is "products"
        localStorage.setItem("products", JSON.stringify(products));
    }

    static getProduct(id){
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find( product=> product.id === id);
    }

    static saveCart(cart){
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    static getCart(){
      return localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')) : [];
    }

}


document.addEventListener("DOMContentLoaded", ()=>{ //everything starts here
    const ui = new UI();
    const products = new Products();

    products.getProducts().then(products => Storage.saveProducts(products));

    ui.displayMain();
    ui.search();
    ui.getBagButtons();
    ui.cartLogic();
    ui.setupApp();

})
