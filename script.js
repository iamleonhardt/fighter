/**
 * Created by bill on 12/9/16.
 */

// Constructor for Fighters
function Fighter(name) {
    var self = this;
    this.name = name;
    this.div = '';
    this.hitpoints = 100;
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
}

// List of Fighters
var Cung = new Fighter('Cung');
var Jason = new Fighter('Jason');
var Mike = new Fighter('Mike');
var Miles = new Fighter('Miles');
var Patrick = new Fighter('Patrick');
var Sean = new Fighter('Sean');

var fighterArr = [Cung, Jason, Mike, Miles, Patrick, Sean];

function createFighters() {
    for (var i = 0; i < fighterArr.length; i++) {
        var thisFighter = fighterArr[i];
        var thisDOMEle = thisFighter.createDOMElement();
        $('#gameBoard').append(thisDOMEle);
    }
}

$(document).ready(function () {
    createFighters();
});