/*    
	Name: Harold Prentiss	  
 	Course:	443
 	Assignment: #1
*/

var playerMoney = 1000;
var cardDeck = new Array();
var deckPos = 0;
var playerCards = new Array();
var compCards = new Array();
var playerBet = 0;
var pName = "player";

function playingCard(value, faceValue, suit){
	this.value = value;
	this.faceValue = faceValue;
	this.suit = suit;
}

function checkFace(i){
	if(i == 1)
	{
		return 'A';
	}
	else if(i == 11){
		return 'J';
	}
	else if(i == 12){
		return 'Q';
	}
	else if(i == 13){
		return 'K';
	}
	else
	{
		return i;
	}
}

function initializeDeck(){
	var card = new playingCard();
	var index = 0;
	var setSuit = 'C';
	for(var i = 1; i<14; i++){
		if(i >= 10){
			cardDeck[index].value = 10; 
		}
		else
		{
			cardDeck[index].value = i;
		}
		cardDeck[index].suit = setSuit;
		cardDeck[index].faceValue = checkFace(i);
		index++;
	}


	setSuit = 'D';
	for(i = 1; i<14; i++){
		if(i >= 10){
			cardDeck[index].value = 10; 
		}
		else
		{
			cardDeck[index].value = i;
		}
		cardDeck[index].suit = setSuit;
		cardDeck[index].faceValue = checkFace(i);
		index++;
	}

	setSuit = 'H';
	for(i = 1; i<14; i++){
		if(i >= 10){
			cardDeck[index].value = 10; 
		}
		else
		{
			cardDeck[index].value = i;
		}
		cardDeck[index].suit = setSuit;
		cardDeck[index].faceValue = checkFace(i);
		index++;
	}

	setSuit = 'S';
	for(i = 1; i<14; i++){
		if(i >= 10){
			cardDeck[index].value = 10; 
		}
		else
		{
			cardDeck[index].value = i;
		}
		cardDeck[index].suit = setSuit;
		cardDeck[index].faceValue = checkFace(i);
		index++;
	}
}

function shuffle(){
	var shuffledDeck = new Array(52);

	// This is a card shuffling algorithm I found online
	for (var i = 0; i < cardDeck.length; i++) {    
        var rand = Math.floor(Math.random() * (i + 1));  
        shuffledDeck[i] = shuffledDeck[rand];
        shuffledDeck[rand] = cardDeck[i];
    }

    cardDeck = shuffledDeck;
}

function startGame(){
	for(var i = 0; i<52; i++){
		cardDeck[i] = new playingCard();
	}
	initializeDeck();
	document.getElementById("betAmount").value = "0";
	document.getElementById("messageText").innerHTML = "Place your bet!";
	document.getElementById("controls").style.visibility = "visible";
	document.getElementById("start").style.visibility = "hidden";
}

function drawBoard(dealerDraw){
	for(var i = 0; i < playerCards.length; i++)
	{
		if(playerCards[i] != null){
			document.getElementById("pCard" + (i+1)).src = "images/cards/" + playerCards[i].faceValue + playerCards[i].suit +".png";
		}
	}

	for(i = 0; i < compCards.length; i++)
	{	
		if(i == 0 && !dealerDraw)
		{
			document.getElementById('compCard' + (i + 1)).src = "images/cards/cardBack.png";
		}
		else
		{
			if(compCards[i] != null){
				document.getElementById('compCard' + (i+1)).src = "images/cards/" + compCards[i].faceValue + compCards[i].suit +".png";
			}
		}
	}
}

function dealHand(){
	shuffle();
	clearCards();
	deckPos = 0;
	dealCard("p",false);
	dealCard("c", false);
	dealCard("p", false);
	dealCard("c", false);
}

function dealCard(target, dealerTurn){
	if(target == "p")
	{
		if(playerCards.length < 5){
			playerCards.push(cardDeck[deckPos]);
		}
	}
	else
	{
		if(compCards.length < 5){
			compCards.push(cardDeck[deckPos]);
		}
	}
	deckPos++;
	drawBoard(dealerTurn);
}

function clearCards(){
	var index = 0;
	while(playerCards.length > 0)
	{
		document.getElementById('pCard' + (index+1)).src = "images/cards/blank.gif";
		playerCards.pop();
		index++;
	}
	index= 0;
	while(compCards.length > 0)
	{
		document.getElementById('compCard' + (index+1)).src = "images/cards/blank.gif";
		compCards.pop();
		index++;
	}
}

function playerHit(){
	if(playerBet == 0)
	{
		document.getElementById("messageText").innerHTML = "Your bet cannot be 0!";
	}
	else
	{
		dealCard("p", false);
		checkHand();
	}
}

function playerStay(){
	if(playerBet == 0)
	{
		document.getElementById("messageText").innerHTML = "Your bet cannot be 0!";
	}
	else
	{
		computerTurn();
	}
}

function computerTurn(){
	drawBoard(true);
	var compTotal  = compCards[0].value + compCards[1].value;
	if(compTotal == 21)
	{
		playerMoney -= playerBet;
		document.getElementById("messageText").innerHTML = "The Dealer has hit 21. You lose.";
		if(playerMoney > 0){
			document.getElementById("playerBank").innerHTML = "$"+ playerMoney;
			playerBet = 0;
			document.getElementById("messageText").innerHTML += "<br>Place your next bet.";
		}
		else
		{
			clearCards();
			document.getElementById("controls").style.visibility = "hidden";
			document.getElementById("playerBank").innerHTML = "$"+ playerMoney;
			document.getElementById("messageText").innerHTML = "You lost all your money. Better think of a good excuse.";
		}
	}
	else
	{
		var playerTotal = 0;
		for(var i = 0; i < playerCards.length; i++)
		{
			playerTotal += playerCards[i].value;
		}
		while(compTotal < playerTotal && compTotal <= 21)
		{
			dealCard("c", true);
			compTotal = 0;
			for(var j =0; j<compCards.length; j++)
			{
				compTotal += compCards[j].value;
			}
		}
		if(compTotal > 21)
		{
			playerMoney += playerBet;
			document.getElementById("messageText").innerHTML = "The Dealer has busted. You won!";
			document.getElementById("playerBank").innerHTML = "$"+ playerMoney;
			playerBet = 0;
			document.getElementById("messageText").innerHTML += "<br>Place your next bet.";
		}
		else
		{
			playerMoney -= playerBet;
			document.getElementById("messageText").innerHTML = "The Dealer has defeated you with " + compTotal;
			if(playerMoney > 0){
				document.getElementById("playerBank").innerHTML = "$"+ playerMoney;
				playerBet = 0;
				document.getElementById("messageText").innerHTML += "<br>Place your next bet.";
			}
			else
			{
				clearCards();
				document.getElementById("controls").style.visibility = "hidden";
				document.getElementById("playerBank").innerHTML = "$"+ playerMoney;
				document.getElementById("messageText").innerHTML = "You lost all your money. Better think of a good excuse.";
			}
		}
	}
}

function placeBet(){
	var betToBePlaced = parseInt(document.getElementById("betAmount").value);
	playerBet = 0;

	if(betToBePlaced > playerMoney)
	{
		document.getElementById("messageText").innerHTML += "<br> You don't have that much to bet!";
	}
	else if(betToBePlaced == 0)
	{
		document.getElementById("messageText").innerHTML = "Your bet cannot be 0!";
	}
	else
	{
		playerBet = betToBePlaced;
		document.getElementById("messageText").innerHTML = pName + " bets " + playerBet;
		dealHand();
	}
}

function checkHand(){
	var total = 0;

	for(var i = 0; i < playerCards.length; i++)
	{
		total += playerCards[i].value;
	}

	if(total > 21)
	{
		document.getElementById("messageText").innerHTML = pName + " busted with " + total;
		playerMoney -= playerBet;
		if(playerMoney > 0){
			document.getElementById("playerBank").innerHTML = "$"+ playerMoney;
			playerBet = 0;
			document.getElementById("messageText").innerHTML += "<br>Place your next bet.";
		}
		else
		{
			clearCards();
			document.getElementById("controls").style.visibility = "hidden";
			document.getElementById("playerBank").innerHTML = "$"+ playerMoney;
			document.getElementById("messageText").innerHTML = "You lost all your money. Better think of a good excuse.";
		}
	}
	else
	{
		document.getElementById("messageText").innerHTML = pName + " has " + total + ".<br> Dealer is showing " + compCards[1].value;
	}
} 

window.onload = function(){
	var name = prompt("Please enter your name.", "player");
	var tag = document.getElementById('playerName');
	tag.innerHTML = name;
	pName = name;
}