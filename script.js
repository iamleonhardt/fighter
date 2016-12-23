/**
 * Created by bill on 12/9/16.
 */
var game = null;

// Constructor for Fighters
function Fighter(name) {
    var self = this;
    this.div = '';

    this.name = name;
    this.hitpoints = 100;

    this.top = 0;
    this.left = 0;

    this.atkDmg = function (maxHit) {
        return Math.floor(Math.random() * maxHit + 1);
    }
    this.atk = function (opponent) {
        var ranDmg = this.atkDmg(10);
        opponent.hitpoints -= ranDmg;
        $('#'+opponent.name).text(opponent.name + ' ' + opponent.hitpoints);
        console.log(this.name + ' hits ' + opponent.name + ' for ' + ranDmg + '.');
        console.log(opponent.name + ' has ' + opponent.hitpoints + ' left.');
        if (opponent.hitpoints <= 0) {
            console.log(opponent.name + ' has been knocked out');
            $('#winner').text(this.name + 'wins!');
        }
    }
    this.specialAtk = function (opponent) {
        var ranDmg = this.atkDmg(50);
        opponent.hitpoints -= ranDmg;
        var flavor = [' winds up with all he has and smacks ', ' uses all his rage and smashes ', ' pulls out a secret weapon and hits '];
        var ranFlavor = Math.floor(Math.random() * flavor.length);
        opponentDiv = '#'+opponent.name;
        $('#Sean').text(opponent.name + ' ' + opponent.hitpoints);
        console.log(this.name + flavor[ranFlavor] + opponent.name + ' for ' + ranDmg + '.');
        console.log(opponent.name + ' has ' + opponent.hitpoints + ' left.');
        if (opponent.hitpoints <= 0) {
            console.log(opponent.name + ' has been knocked out');
            $('#winner').text(this.name + 'wins!');
        }
    }

    this.clickHandler = function(){
        self.atk(Sean);
    }

    this.createDOMElement = function(){
        this.domElement = $("<div>",{
            class: 'fighterElement',
            id: this.name
        });
        var nameDiv = $('<div>', {
            class: 'fighterName',
            text: this.name
        });
        var hpDiv = $('<div>', {
            class: 'fighterHP',
            text: this.hitpoints
        });
        this.domElement.append(nameDiv, hpDiv);
        this.domElement.click(this.clickHandler);
        return this.domElement;
    }


    this.move = function(e){
        alert(e.keycode);
    }
}


function gameController(gameAreaDomElem){
    var self = this;
    this.domElem = gameAreaDomElem;

    this.numberOfFighters = 5;
    this.fighterNames = ['Bill', 'Cung', 'Jason', 'Mike', 'Miles', 'Sean', 'Patrick'];
    this.fighterList = {};

    this.createFighters = function(){
        for (var i = 0; i < this.numberOfFighters; i++) {
            this.fighterList[this.fighterNames[i]] = new Fighter(this.fighterNames[i]);


            // var thisFighter = this.fighterArr[i];
            var thisDOMEle = this.fighterList[this.fighterNames[i]].createDOMElement();
            $('#gameBoard').append(thisDOMEle);
        }
    }

    this.initialize = function(){
        this.createFighters();
    }
}

$(document).ready(function () {
    game = new gameController($('#gameBoard'))
    game.initialize();
});