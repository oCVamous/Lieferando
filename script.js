meals = ['Mafia Deluxe', 'John Gotti NYC', 'Narcos Spezial', 'Police', 'Geldwäsche'];
desciptions = ['Fleisch, Fleisch und noch mehr Fleisch', 'Mit SUCUK Fleisch Bruder!', 'Richtig fett SCHARF + <b>Überraschung</b>', 'Pizza ohne Fleisch und Käse, du 31er! <b>(Für Veganer)</b>', 'Krass leckere Tiefkühl-Nudel-Pizza'];
prices = [23.95, 19.95, 17.95, 500, 30];

mealsInBasket = [];
pricesInBasket = [];
amounts = [];

function renderMenu() {

    for (let i = 0; i < meals.length; i++) {
        document.getElementById('recipe').innerHTML += `
        <div class="recipe1" onclick="addToBasket(${i})">
            <div class="recipeTop">
                <h2>${meals[i]}</h2>
                <button onclick="addToBasket(${meals[i]})" class="addBtn">+</button>
            </div>
            <div class="recipe-Middle">
                <p><em>${desciptions[i]}</em></p>
            </div>
            <div class="recipeBottom">
                <h2 type="number">${prices[i]} €</h2>
            </div>
        </div>
               `;
    }
    showBasket();
    load();
    
}

function addToBasket(i) {
    let index = mealsInBasket.indexOf(meals[i]);

    if (index == -1) {
        let chosenMeal = meals[i];
        let chosenPrice = prices[i];
        let amount = 1;

        mealsInBasket.push(chosenMeal);
        pricesInBasket.push(chosenPrice);
        amounts.push(amount);
    } else {
        let IndexOfMeal = mealsInBasket.indexOf(meals[i]);
        amounts[IndexOfMeal]++;
    }
    showBasket();
    save();
    
}

function addMeal(i) {
    amounts[i]++;
    showBasket();
}

function subtractMeal(i) {
    

    if (amounts[i] <= 1) {
        mealsInBasket.splice(i, 1);     //array.splice(index, howmany, item1, ....., itemX)
        pricesInBasket.splice(i, 1);
        amounts.splice(i, 1);
    } else {
        amounts[i]--;
    }
    save();
    showBasket();
}





function save() {
    let basketMeals = JSON.stringify(mealsInBasket);
    localStorage.setItem('mealsInBasket', basketMeals);

    let basketPrices = JSON.stringify(pricesInBasket);
    localStorage.setItem('pricesInBasket', basketPrices);

    let basketAmounts = JSON.stringify(amounts);
    localStorage.setItem('amounts', basketAmounts);

}

function load(i) {
    let basketMeals = localStorage.getItem('mealsInBasket');
    if (basketMeals) {
        mealsInBasket = JSON.parse(basketMeals);
    }

    let basketPrices = localStorage.getItem('pricesInBasket');
    if (basketPrices) {
        pricesInBasket = JSON.parse(basketPrices);
    }

    let basketAmounts = localStorage.getItem('amounts');
    if (basketAmounts) {
        amounts = JSON.parse(basketAmounts);
    }
}

function showBasket() {

    document.getElementById('shoppingCart2').innerHTML = '';
    if (mealsInBasket.length < 1) {
        document.getElementById('shoppingCart2').innerHTML = `
        <div class="shoppingCart2">
            <img src="img/einkaufswagen.png">
            <h2>Fülle deinen Warenkorb</h2>
            <p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
        </div>
        `;
    } else {
        let subTotal = 0;
        let deliveryCost = 3.50;
        
        for (let i = 0; i < mealsInBasket.length; i++) {
            let priceOfMeal = pricesInBasket[i]*amounts[i];
            subTotal += priceOfMeal;
            document.getElementById('shoppingCart2').innerHTML += '';
            document.getElementById('shoppingCart2').innerHTML += `
            <div class="shoppingCart3">
                <div class="shoppingCart3-top">
                    <div class="shoppingCart3-top-left">
                        <p>${amounts[i]}</p>
                    </div>
                    <div class="shoppingCart3-top-middle">
                        <p>${mealsInBasket[i]}</p>
                    </div>
                    <div class="shoppingCart3-top-right">
                        <span>${priceOfMeal.toFixed(2)} €</span>
                    </div>
                </div>
                <div class="shoppingCart3-bottom">
                    <p onclick="openNote(${i})">Anmerkung hinzufügen</p>
                    <button onclick="addMeal(${i})" class="basketBtn">+</button>
                    <button onclick="subtractMeal(${i})" class="basketBtn">-</button>
                </div>
                <div id="note${i}" class="note"></div>
                <div class="seperator"></div>
            </div>
        `;
        }
        let total = subTotal + deliveryCost;
        document.getElementById('shoppingCart2').innerHTML += `
        <div class="bill">
            <div class="sum d-flex">
                <div class="sum-text">
                    <span>Zwischensumme: </span>
                </div>
                
                <div class="sum-value">
                    <span>${subTotal.toFixed(2)} €</span>
                </div>
            </div>
            <div class="deliveryCost d-flex">
                <div class="deliveryCost-text">
                    <span>Lieferkosten: </span>
                </div>
                
                <div class="deliveryCost-value">
                    <span>${deliveryCost.toFixed(2)} €</span>
                </div>
            </div>
            <div class="endBill d-flex">
                <div class="endBill-text">
                    <span><b>Gesamt: </b></span>
                </div>
                
                <div class="endBill-value">
                    <span> <b>${total.toFixed(2)} € </b> </span>
                </div>
            </div>
            
        </div>

        <div class="billBtn">
            <button class="endBtn">Bezahlen(${total.toFixed(2)} €)</button> 
        </div>
        `;

    }
    
}

function openNote(i) {
    document.getElementById('note' + i).innerHTML += `
    <div class="note">
        <textarea id="note" placeholder="Ihr Wunsch..."></textarea>
    </div>
    `;
}

/** 
function closeNote(i) {
    document.getElementById('note' + i).innerHTML 
}
*/