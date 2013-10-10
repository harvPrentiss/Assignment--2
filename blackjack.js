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
		if(i == 1)
		{
			cardDeck[index].value = 11;
		}
		else if(i >= 10){
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
		if(i == 1)
		{
			cardDeck[index].value = 11;
		}
		else if(i >= 10){
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
		if(i == 1)
		{
			cardDeck[index].value = 11;
		}
		else if(i >= 10){
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
		if(i == 1)
		{
			cardDeck[index].value = 11;
		}
		else if(i >= 10){
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
	if(compCards[0].value + compCards[1].value == 21)
	{
		drawBoard(true);
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
		var playerTotal = getPlayerTotal();
		
		while(compTotal < playerTotal && compTotal <= 21)
		{
			dealCard("c", true);
			compTotal = getCompTotal();
		}

		if(compTotal > 21)
		{
			for(var k = 0; k < compCards.length; k++)
				{
					if(compCards[k].faceValue == "A")
					{
						compCards[k].value = 1;
					}
				}
			compTotal = getCompTotal();

			while(compTotal < playerTotal && compTotal <= 21)
			{
				dealCard("c", true);
				compTotal = getCompTotal();
			}

			if(compTotal > 21)
			{
				playerMoney += playerBet;
				document.getElementById("messageText").innerHTML = "The Dealer has busted at " + compTotal + ". You won!";
				document.getElementById("playerBank").innerHTML = "$"+ playerMoney;
				playerBet = 0;
				document.getElementById("messageText").innerHTML += "<br>Place your next bet.";
			}
			else
			{
				playerMoney -= playerBet;
				document.getElementById("messageText").innerHTML = "The Dealer has defeated your " + playerTotal+ " with " + compTotal;
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
		else
		{
				playerMoney -= playerBet;
				document.getElementById("messageText").innerHTML = "The Dealer has defeated your " + playerTotal+ " with " + compTotal;
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
	var fullHand = true;
	var index = 0;
	while(index < playerCards.length && fullHand)
	{
		if(playerCards[index] == null)
		{
			fullHand = false;
		}
		index++;
	}
	if(fullHand && playerCards.length == 5)
	{
		playerMoney += playerBet;
		document.getElementById("messageText").innerHTML = "You got 5 cards without busting! You win!";
		document.getElementById("playerBank").innerHTML = "$"+ playerMoney;
		playerBet = 0;
		document.getElementById("messageText").innerHTML += "<br>Place your next bet.";
	}
	else
	{
		var total = getPlayerTotal();
		var changed = false;

		if(total > 21)
		{
			for(var j = 0; j < playerCards.length; j++)
			{
				if(playerCards[j].faceValue == "A" && playerCards[j].value != 1)
				{
					console.log("Changing the Ace of " + playerCards[j].suit + " from 11 to 1. Total is " + total);
					playerCards[j].value = 1;
					changed = true;
				}
			}
			if(!changed)
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
				total = getPlayerTotal();
				document.getElementById("messageText").innerHTML = pName + " has " + total + ".<br> Dealer is showing " + compCards[1].value;
			}
		}
		else
		{
			document.getElementById("messageText").innerHTML = pName + " has " + total + ".<br> Dealer is showing " + compCards[1].value;
		}
	}
} 

function getPlayerTotal(){
	var total = 0;

	for(var i = 0; i < playerCards.length; i++)
	{
		total += playerCards[i].value;
	}

	return total;
}

function getCompTotal(){
	var total = 0;

	for(var i = 0; i < compCards.length; i++)
	{
		total += compCards[i].value;
	}

	return total;
}

window.onload = function(){
	var name = prompt("Please enter your name.", "player");
	var tag = document.getElementById('playerName');
	tag.innerHTML = name;
	pName = name;
}