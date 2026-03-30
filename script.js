// ================== PRODUCTS ==================
let foods = [

{name:"Kabsa",price:20,img:"img/kabsa.jpg",category:"food"},
{name:"Pizza",price:22,img:"img/pizza.jpg",category:"food"},
{name:"Shawarma",price:18,img:"img/shaworma.jpg",category:"food"},

{name:"Mango Juice",price:10,img:"img/mango.jpg",category:"drink"},
{name:"Orange Juice",price:8,img:"img/orange.jpg",category:"drink"},
{name:"Strawberry Juice",price:9,img:"img/strawberry.jpg",category:"drink"},

{name:"Strawberry Cake",price:12,img:"img/cake1.jpg",category:"dessert"},
{name:"White Cake",price:12,img:"img/cake2.jpg",category:"dessert"}

];

// ================== CART ==================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================== LOAD MENU ==================
function loadMenu(){
let menu = document.getElementById("menu");

if(menu){
menu.innerHTML = "";

foods.forEach(item => {

let card = `
<div class="card">
<img src="${item.img}">
<h3>${item.name}</h3>
<p>RM ${item.price}</p>
<button onclick="addToCart('${item.name}',${item.price})">Add</button>
</div>
`;

menu.innerHTML += card;

});
}
}

// ================== FILTER ==================
function filterMenu(type){
let menu = document.getElementById("menu");

menu.innerHTML = "";

foods
.filter(f => type === "all" || f.category === type)
.forEach(item => {

let card = `
<div class="card">
<img src="${item.img}">
<h3>${item.name}</h3>
<p>RM ${item.price}</p>
<button onclick="addToCart('${item.name}',${item.price})">Add</button>
</div>
`;

menu.innerHTML += card;

});
}

// ================== ADD TO CART ==================
function addToCart(name, price){
cart.push({name, price});
localStorage.setItem("cart", JSON.stringify(cart));
updateCount();
alert("Added to cart");
}

// ================== UPDATE CART COUNT ==================
function updateCount(){
let c = document.getElementById("count");
if(c){
c.textContent = cart.length;
}
}

// ================== DISPLAY CART ==================
function displayCart(){
let list = document.getElementById("cartList");
let total = 0;

if(list){
list.innerHTML = "";

cart.forEach(item => {
let li = document.createElement("li");
li.textContent = item.name + " - RM " + item.price;
list.appendChild(li);
total += item.price;
});

let totalEl = document.getElementById("total");
if(totalEl){
totalEl.textContent = "Total: RM " + total;
}
}
}

// ================== CHECKOUT ==================
function placeOrder(){

console.log("Checkout clicked");

let name = document.getElementById("name").value;
let phone = document.getElementById("phone") ? document.getElementById("phone").value : "";
let address = document.getElementById("address").value;

let payment = document.querySelector('input[name="pay"]:checked');

if(name === "" || address === "" || !payment){
alert("Please fill all fields");
return;
}

// create order
let order = {
name: name,
phone: phone,
address: address,
payment: payment.value,
items: cart
};

// save orders
let orders = JSON.parse(localStorage.getItem("orders")) || [];
orders.push(order);
localStorage.setItem("orders", JSON.stringify(orders));

// clear cart
cart = [];
localStorage.removeItem("cart");

// redirect
window.location.href = "success.html";

}

// ================== ADMIN ==================
function loadOrders(){

let list = document.getElementById("orders");

if(list){

let orders = JSON.parse(localStorage.getItem("orders")) || [];
list.innerHTML = "";

orders.forEach((o, index) => {

let li = document.createElement("li");

li.innerHTML = `
<b>Customer:</b> ${o.name}<br>
<b>Phone:</b> ${o.phone}<br>
<b>Address:</b> ${o.address}<br>
<b>Payment:</b> ${o.payment}<br>
<b>Items:</b> ${o.items.map(i => i.name).join(", ")}
<hr>
`;

list.appendChild(li);

});
}
}
function toggleDark(){
document.body.classList.toggle("dark");
}
function showCard(){
document.getElementById("cardBox").style.display="block";
}

// ================== CLEAR ORDERS ==================
function clearOrders(){
localStorage.removeItem("orders");
location.reload();
}

// ================== ON LOAD ==================
window.onload = function(){
loadMenu();
displayCart();
updateCount();
loadOrders();
};