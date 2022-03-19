
var type =["d6","d20"];
var i=1;
var rollDice =function(){
  
    var diceURL="http://roll.diceapi.com/json/" +type[i];
    
    fetch(diceURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
            })
        } else {
            console.log("Something went wrong!");
        }
    })
}

rollDice();
