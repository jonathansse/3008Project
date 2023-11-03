//The definition of the menu items are left so that the base code works.
//You should remove these for your A2 implementation, as all data should come from the server


let info = {};
let Itinerary = {};
let order = {};
let budget = 0;

function init() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:3000/orders', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var response = JSON.parse(xhr.responseText);
			Itinerary = response[0];
			order = response[1];
			if (budget == 0)  
				budget = response[2];
			console.log(Itinerary, order);
			updateItinerary(false); 
		}
	};
	xhr.send();
}

function removeItem(id){
    if(order.hasOwnProperty(id)){
        order[id] -= 1;
        if(order[id] <= 0){
            delete order[id];
        }
        updateItinerary(false);
    }
}

//Reproduces new HTML containing the order summary and updates the page
//This is called whenever an item is added/removed in the itinerary
function updateItinerary(isSubmitted){
	let result = "";
	let subtotal = 0;

	let obj = viewItinerary(order);
	result += obj.r;
	subtotal += obj.st;
	
	document.getElementById("main-table-body").innerHTML = result;
	itinerarySummaryCost(subtotal, isSubmitted);
}

function viewItinerary(order){
	let result = "";
	let subtotal = 0;
	
	//For each item ID currently in the order
	Object.keys(order).forEach(id =>{
		//Retrieve the item from the menu data using helper function
		//Then update the subtotal and result 
		let item = {}
		if(id < 5) {
			item = getRestaurantById(id);
		}else {
			item = getActivityById(id);
		}
		
		subtotal += (item.price * order[id]);
		result += `
			<tr>
				<td class="remove-item">
					<img src='remove.png' class='remove-item-img' onclick='removeItem(${id})'/>
				</td>
				<td>
					${item.name} x ${order[id]} (${(item.price * order[id]).toFixed(2)})
				</td>
				<td>
					<img src='${item.image}' class='item-img'/>
				</td>
			</tr>`;
	});
	let obj = {st: subtotal, r: result}
	return obj;
}

function itinerarySummaryCost(subtotal, isSubmitted){
	result = "";
	//Add the summary fields to the result HTML, rounding to two decimal places
	result += `Subtotal: \$${subtotal.toFixed(2)}<br>`;
	result += `Tax: \$${(subtotal*0.1).toFixed(2)}<br>`;
	let total = subtotal + (subtotal*0.1);
	result += `Total: \$${total.toFixed(2)}<br>`;
	if(!isSubmitted && (budget - total) >= 0 && budget != 0){
		result += `<button type="button" id="submit" onclick="submitItinerary()">Submit Itinerary</button>`;
	}
	if ((budget - total) < 0 && budget != 0) {
		result += `Please remove some of your itineraries, you're over your budget!`;
	}
	if (budget == 0 ) {
		result += `Please submit you're budget!`;
	}
	info = {};
	info.subtotal = subtotal;
	info.total = total;
	info.tax = subtotal * 0.1;
	info.budget = budget;
	info.order = order;

	document.getElementById("summaryCost").innerHTML = result;
}

function submitBudget(event){
    event.preventDefault();  
    budget = parseInt(document.getElementById('budgetInput').value);
	document.getElementById('budgetInput').placeholder = budget;
    console.log(budget);
    init();
}
	
//Simulate submitting the itinerary
function submitItinerary(){
	req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
			alert("Order placed!")
			console.log(this.responseText);
			updateItinerary(true);
		}
	}
	req.open("POST", `http://localhost:3000/orders`);
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify(info));
}

//Helper function. Given an ID of an restaurant in either the restaurants or activites , returns that item object if it exists.
function getRestaurantById(id){
	let categories = Object.keys(Itinerary.restaurants);
	for(let i = 0; i < categories.length; i++){
		if(Itinerary.restaurants[categories[i]].hasOwnProperty(id)){
			return Itinerary.restaurants[categories[i]][id];
		}
	}
	return null;
}

//Helper function. Given an ID of an activity in either the activites , returns that item object if it exists.
function getActivityById(id){
	let categories = Object.keys(Itinerary.activities);
	for(let i = 0; i < categories.length; i++){
		if(Itinerary.activities[categories[i]].hasOwnProperty(id)){
			return Itinerary.activities[categories[i]][id];
		}
	}
	return null;
}

//Helper function. Returns true if object is empty, false otherwise.
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}