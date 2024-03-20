var kartenArray = new Array(16);
var seconds = 0;
var gefunden = 0;
var gedrehteKarteID = 0;
var aufgedeckt = 0;
var ableToClick = 1;
var versuche = 0;

function runGame(){
    getName();
    timer();
    placeCards();
}

function getName(){
    let person = window.prompt("Please enter your name", "Player 1");
    document.getElementById("name").innerText = "Spieler: " + person;
}

function timer(){
    if(gefunden < 8){
        seconds++;	
	    document.getElementById('time').innerText = "Zeit: " + seconds;
	    window.setTimeout("timer()",1000);
    }
}

function placeCards(){
    for(var i = 0; i < 16; i++){
        var newDiv = document.createElement("div");
        var id = i+1;
        newDiv.setAttribute("id", id);
        newDiv.setAttribute("class", "karte");
        newDiv.setAttribute("onClick", "vergleichen(" + id + ")");
        // in das Kartenarray einfuegen
        kartenArray[i] = newDiv;
        //newDiv.backgroundImage = "url(pics/card" + i + ".png)";
    }
    var spielbereich = document.getElementById("spielbereich")
    shuffleCards(kartenArray);
	for(var i = 0; i < 16; i++){
    //4 Karten pro Reihe machen
        if (i % 4 == 0){
            kartenArray[i].style.clear = "left";
		}
		spielbereich.appendChild(kartenArray[i]);
    }  
}

function shuffleCards(kartenArray){
    var i, cardToSwap, randomNumber;
    for(i = 0; i < 16; i++){
        cardToSwap = kartenArray[i]; //Karte wird kopiert
        randomNumber = (Math.floor((Math.random() * 16) + 1)) - 1; //Zahl von 0-15
        kartenArray[i] = kartenArray[randomNumber]; //Karte wird mit einer Karte getauscht
        kartenArray[randomNumber] = cardToSwap; //1. Karte wird an der Stelle der 2. Karte platziert
    }  
}

function vergleichen(id){
    //Wenn bereits 2 Karten aufgedeckt sind kann man nichts anklicken
    if(ableToClick == 0){}
    else{
        //Es ist gerade keine Karte aufgedeckt
        if(aufgedeckt == 0){
            gedrehteKarteID = id; //id der 1. Karte merken
            aufgedeckt++;
            document.getElementById(id).style.backgroundImage = "url(pics/card" + id + ".png";
            document.getElementById(id).setAttribute("onClick", "");
        }
        //Es wird die zweite Karte aufgedeckt
        else{
            versuche++;
            aufgedeckt = 0;
            //Karten sind gleich
            if((id + gedrehteKarteID) == 17){
                gefunden++;
                document.getElementById(id).style.backgroundImage = "url(pics/card" + id + ".png";
                ableToClick = 0;
                setTimeout(function(){
                    document.getElementById(id).setAttribute("onClick", "");
                    document.getElementById(id).style.backgroundImage = "url(pics/memoryBgI.png)";
                    document.getElementById(gedrehteKarteID).setAttribute("onClick", "");
                    document.getElementById(gedrehteKarteID).style.backgroundImage = "url(pics/memoryBgI.png)";
                    ableToClick = 1;
                }, 750);
            }
            else{
                document.getElementById(id).style.backgroundImage = "url(pics/card" + id + ".png";
                ableToClick = 0;
                setTimeout(function(){
                    document.getElementById(id).style.backgroundImage = "url(pics/memoryBg.png)";
                    document.getElementById(gedrehteKarteID).style.backgroundImage = "url(pics/memoryBg.png)";
                    document.getElementById(gedrehteKarteID).setAttribute("onClick", "vergleichen(" + gedrehteKarteID + ")");
                    ableToClick = 1;
                }, 750);
            }
        }
    }
    document.getElementById("versuche").innerText = "Versuche: " + versuche;
}