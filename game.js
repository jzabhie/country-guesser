// Country Guesser Game Logic

const countries = [{ name: 'Italy', coords: [41.9028, 12.4964] },
	{ name: 'France', coords: [46.6034, 1.8883] },
	{ name: 'Germany', coords: [51.1657, 10.4515] },
	{ name: 'Spain', coords: [40.4637, -3.7492] },
	{ name: 'United States', coords: [37.0902, -95.7129] },
	{ name: 'Canada', coords: [56.1304, -106.3468] },
	{ name: 'Brazil', coords: [-14.2350, -51.9253] },
	{ name: 'India', coords: [20.5937, 78.9629] },
	{ name: 'Australia', coords: [-25.2744, 133.7751] },
	{ name: 'Japan', coords: [36.2048, 138.2529] }];

let score = 0;
let currentCountry;

function getRandomCountry() {
    const randomIndex = Math.floor(Math.random() * countries.length);
    return countries[randomIndex];
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + 
              Math.cos(φ1) * Math.cos(φ2) * 
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // in meters
}

function getDirection(lat1, lon1, lat2, lon2) {
    const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - 
              Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
    const angle = Math.atan2(y, x);
    const degree = (angle * 180) / Math.PI;

    if (degree < 0) {
        return 360 + degree;
    }
    return degree;
}

function startGame() {
    currentCountry = getRandomCountry();
    console.log(`Guess the country: Latitude ${currentCountry.coords[0]}, Longitude ${currentCountry.coords[1]}`);
}

function checkGuess(userGuess) {
    const guessedCountry = countries.find(country => country.name.toLowerCase() === userGuess.toLowerCase());
    if (!guessedCountry) {
        console.log('Country not found. Try again!');
        return;
    }

    const distance = calculateDistance(currentCountry.coords[0], currentCountry.coords[1], guessedCountry.coords[0], guessedCountry.coords[1]);
    const direction = getDirection(currentCountry.coords[0], currentCountry.coords[1], guessedCountry.coords[0], guessedCountry.coords[1]);

    console.log(`You are ${distance.toFixed(2)} meters away from ${currentCountry.name} and you should head ${direction.toFixed(2)}° to reach it.`);
    score += Math.max(0, 1000 - distance / 100); // Simplistic scoring
}

startGame();