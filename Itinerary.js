//The definition of the menu items are left so that the base code works.
//You should remove these for your A2 implementation, as all data should come from the server
let aragorn = {
	name: "Aragorn's Orc BBQ",
	min_order: 20,
	delivery_fee: 5,
	menu: {
		"Appetizers": {
			0: {
				name: "Orc feet",
				description: "Seasoned and grilled over an open flame.",
				price: 5.50,
				image: "orc_feet.jpeg"
			},
			1: {
				name: "Pickled Orc fingers",
				description: "Served with warm bread, 5 per order.",
				price: 4.00,
				image: "pickled_orc_fingers.jpeg"
			},
			2: { //Thank you Kiratchii
				name: "Sauron's Lava Soup",
				description: "It's just really spicy water.",
				price: 7.50,
				image: "sauron.jpeg"
			},
			3: {
				name: "Eowyn's (In)Famous Stew",
				description: "Bet you can't eat it all.",
				price: 0.50
			},
			4: {
				name: "The 9 rings of men.",
				description: "The finest of onion rings served with 9 different dipping sauces.",
				price: 14.50
			}
		},
		"Combos": {
			5: {
				name: "Buying the Farm",
				description: "An arm and a leg, a side of cheek meat, and a buttered biscuit.",
				price: 15.99
			},
			6: {
				name: "The Black Gate Box",
				description: "Lots of unidentified pieces. Serves 50.",
				price: 65.00
			},
			7: {//Thanks to M_Sabeyon
				name: "Mount Doom Roast Special with Side of Precious Onion Rings.",
				description: "Smeagol's favorite.",
				price: 15.75
			},
			8: { //Thanks Shar[TA]
				name: "Morgoth's Scorched Burgers with Chips",
				description: "Blackened beyond recognition.",
				price: 13.33
				
			},
			10: {
				name: "Slab of Lurtz Meat with Greens.",
				description: "Get it while supplies last.",
				price: 17.50
			},
			11: {
				name: "Rangers Field Feast.",
				description: "Is it chicken? Is it rabbit? Or...",
				price: 5.99
			}
		},
		"Drinks": {
			12: {
				name: "Orc's Blood Mead",
				description: "It's actually raspberries - Orc's blood would be gross.",
				price: 5.99
			},
			13: {
				name: "Gondorian Grenache",
				description: "A fine rose wine.",
				price: 7.99
			},
			14: {
				name: "Mordor Mourvedre",
				description: "A less-fine rose wine.",
				price: 5.99
			}
		}	
	}
}

const restaurant = aragorn;

//Called on page load. Initialize the drop-down list, add event handlers, and default to the first restaurant.
function init() {
    order = { 4: 1, 2: 4, 3: 2, 10: 3 };
    updateItinerary();
}

//Responsible for removing one of the items with given id from the order and updating the summary
function removeItem(id){
	if(order.hasOwnProperty(id)){
		order[id] -= 1;
		if(order[id] <= 0){
			delete order[id];
		}
		updateItinerary();
	}
}

//Reproduces new HTML containing the order summary and updates the page
//This is called whenever an item is added/removed in the order
function updateItinerary(){
	let result = "";
	let subtotal = 0;
	
	//For each item ID currently in the order
	Object.keys(order).forEach(id =>{
		//Retrieve the item from the menu data using helper function
		//Then update the subtotal and result HTML
		let item = getItemById(id);
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
	document.getElementById("main-table-body").innerHTML = result;
	itinerarySummaryCost(subtotal)
}

function itinerarySummaryCost(subtotal){
	result = "";
	//Add the summary fields to the result HTML, rounding to two decimal places
	result += `Subtotal: \$${subtotal.toFixed(2)}<br>`;
	result += `Tax: \$${(subtotal*0.1).toFixed(2)}<br>`;
	result += `Delivery Fee: \$${restaurant.delivery_fee.toFixed(2)}<br>`;
	let total = subtotal + (subtotal*0.1) + restaurant.delivery_fee;
	result += `Total: \$${total.toFixed(2)}<br>`;

	//Decide whether to show the Submit Order button or the Order X more label
	if(subtotal >= restaurant.min_order){
		result += `<button type="button" id="submit" onclick="submitOrder()">Submit Order</button>`
	}else{
		result += `Add \$${(restaurant.min_order - subtotal).toFixed(2)} more to your order.`;
	}

	document.getElementById("base").innerHTML = result;
}

//Simulated submitting the order
//For A2, you will likely make an XMLHttpRequest here
function submitOrder(){
	alert("Order placed!")
	order = {}
}

//Helper function. Given an ID of an item in the current restaurant's menu, returns that item object if it exists.
function getItemById(id){
	let categories = Object.keys(restaurant.menu);
	for(let i = 0; i < categories.length; i++){
		if(restaurant.menu[categories[i]].hasOwnProperty(id)){
			return restaurant.menu[categories[i]][id];
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