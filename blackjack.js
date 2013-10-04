var player_Money = 1000;
var cardDeck = new Array();
var deckPos = 0;
var playerCards = new Array();
var compCards = new Array();

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
	shuffle();
	clearCards();
	deckPos = 0;
	dealCard("p");
	dealCard("c");
	dealCard("p");
	dealCard("c");
}

function drawBoard(){
	for(var i = 0; i < playerCards.length; i++)
	{
		if(playerCards[i] != null){
			document.getElementById("pCard" + (i+1)).src = "images/cards/" + playerCards[i].faceValue + playerCards[i].suit +".png";
		}
	}

	for(i = 0; i < compCards.length; i++)
	{
		if(compCards[i] != null){
			document.getElementById('compCard' + (i+1)).src = "images/cards/" + compCards[i].faceValue + compCards[i].suit +".png";
		}
	}
}

function dealCard(target){
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
	drawBoard();
}

function clearCards(){
	// Need to set all the img tags to a blank img
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

window.onload = function(){
	var name = prompt("Please enter your name.", "player");
	var tag = document.getElementById('playerName');
	tag.innerHTML = name;
}