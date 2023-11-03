const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();


let Itinerary = {
	restaurants: {
		"Cheap Eats": {
			0: {
				name: "Arepera",
				description: "Venezuelan",
				address: "73 Rue Prince-Arthur E",
				price: 15,
				image: "restaurants/Arepera.jpg"
	
			},
			1: {
				name: "Restaurant Dobe & Andy",
				description: "Chinese",
				address: "1071 Rue Saint-Urbain R-12",
				price: 18,
				image: "restaurants/restaurantDobe&Andy.jpg"
			}
		},
		"Moderate": {
			2: {
				name: "Kazu",
				description: "Japanese",
				address: "1844 Saint-Catherine St W",
				price: 40,
				image: "restaurants/Kazu.jpg"
			},
			3: {
				name: "Venice Mtl Vieux-Montreal",
				description: "Californian",
				address: "440 Saint Francois Xavier St",
				price: 48,
				image: "restaurants/veniceMtlVieux-Montreal.jpg"
			}
		},
		"Expensive": {
			4: {
				name: "L'Express",
				description: "French",
				address: "3927 Saint Denis St",
				price: 75,
				image: "restaurants/express.jpg"
			}
		}
	},
	activities: {
		"Family friendly": {
			5: {
				name: "Parc Mont-Royal",
				description: "A vast park in the heart of Montreal, perfect for outdoor activities.",
				address: "2000 Chemin Remembrance Montréal, QC H3H 1A2",
				price: 23,
				image: "activities/parcMontRoyal.jpg"
			},
			6: {
				name: "SOS Labyrinthe",
				description: "A thrilling maze adventure at the Old Port.",
				address: "Clock Tower Pier Old Port of Montréal Montréal, QC H2Y 0B4",
				price: 23,
				image: "activities/SOSLabyrinthe.jpg"
			},
			7: {
				name: "Pirates or Privateers?",
				description: "Experience pirate life with interactive exhibits.",
				address: "Pointe-à-Callière, Montréal Archaeology and History Complex 350 Place Royale Montréal, QC",
				price: 26,
				image: "activities/piratesOrPrivateers.jpg"
			}
		},
		"Non-Family friendly": {
			8: {
				name: "Casino De Montreal",
				description: "Casino", 
				address: "1 Ave du Casino, Montreal, QC H3C 4W7",
				price: 150,
				image: "activities/casinoDeMontreal.jpg"		
			},
			9: {
				name: "Ninja Warrior et Parkour à Montreal",
				description: "indoor activity and family friendly",
				address: "2350 Rue Dickson Local 340, Montréal, QC H1N 3T1",
				price: 30,
				image: "activities/ninjaWarrior.jpg"
			}
		}
		
	}	
}

let order = {};

let budget = 0, subtotal = 0, total = 0, tax = 0;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());


//app.get("/", home);
app.get('/orders', (req, res) => {
    res.status(200).json([Itinerary, order, budget]);
});

// saves the user's order to order collection.
app.post("/orders", (req, res) => {
    subtotal = req.body.subtotal, total = req.body.total,
    tax = req.body.tax, order = req.body.order, budget = req.body.budget;
	console.log(order);
	console.log(budget);
	res.status(200).send();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


let receivedId; // Variable to store the received id

// Define a route to handle the POST request
app.post('/addDestanation', (req, res) => {
    receivedId = req.body.id; // Access the data sent from the client-side
    console.log("Received ID:", receivedId);
    addItem(parseInt(receivedId));
    res.status(200).json({ message: 'Data received successfully', receivedId: receivedId });
});



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

function addItem(id){
    if(order.hasOwnProperty(id)){
        order[id] += 1;
    }else{
        order[id] = 1;
    }
} 


app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
