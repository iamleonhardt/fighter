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

    this.getRanNum = function (maxNum) {
        return Math.floor(Math.random() * maxNum + 1);
    };

    this.updateFighterDOM = function(opponent){
        var opponentDiv = '#' + opponent.name;
        $(opponentDiv + ' .fighterName').text(opponent.name);
        $(opponentDiv + ' .fighterHP').text(opponent.hitpoints);
    }

    this.atk = function (opponent) {
        var ranDmg = this.getRanNum(10);
        opponent.hitpoints -= ranDmg;
        this.updateFighterDOM(opponent);
        $('#display').text(this.name + ' hits ' + opponent.name + ' for ' + ranDmg + '.');
        this.checkIfDead(opponent);
    };

    this.specialAtk = function (opponent) {
        var ranDmg = this.getRanNum(50);
        opponent.hitpoints -= ranDmg;
        this.updateFighterDOM(opponent);

        var flavor = [
            ' winds up with all he has and smacks ',
            ' uses all his rage and smashes ',
            ' pulls out a secret weapon and hits '
        ];
        var ranFlavor = this.getRanNum(flavor.length -1);
        $('#display').text(this.name + flavor[ranFlavor] + opponent.name + ' for ' + ranDmg + '.');
        this.checkIfDead(opponent);
    };

    this.checkIfDead = function (opponent) {
        if (opponent.hitpoints <= 0) {
            $('#display').text(opponent.name + ' has been knocked out');
            $('#' + opponent.name).remove();
            //todo Remove name from array that next player is checking
            //todo Remove object
        }
    };

    this.clickHandler = function () {
        // self.specialAtk(game.fighterList[game.fighterNames[0]]);
        // self.atk(game.fighterList[game.fighterNames[0]]);
        var currentPlayer = game.currentPlayer;
        game.fighterList[currentPlayer].specialAtk(game.fighterList[this.id]);
        // game.fighterList[currentPlayer].atk(game.fighterList[this.id]);
        game.nextPlayer();
    };

    this.createDOMElement = function (startingLeftPos) {
        this.domElement = $("<div>", {
            class: 'fighterElement',
            id: this.name,
            css: {'left' : startingLeftPos +'px'}
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
    };


    this.move = function (e) {
        alert(e.keycode);
    };
}


function gameController(gameAreaDomElem) {
    var self = this;
    this.domElem = gameAreaDomElem;

    this.numberOfFighters = 8;
    this.fighterNames = ['Dan', 'Bill', 'Cung', 'Jason', 'Mike', 'Miles', 'Sean', 'Patrick'];
    this.fighterList = {};
    this.playerPos = -1;
    this.currentPlayer = this.fighterNames[this.playerPos];

    this.nextPlayer = function () {
        this.playerPos++;
        if (this.playerPos > this.numberOfFighters - 1) {
            this.playerPos = 0;
        }
        $('div #' + this.currentPlayer).removeClass('activeFighter');
        this.currentPlayer = this.fighterNames[this.playerPos];
        //focus the new current player
        $('div #' + this.currentPlayer).addClass('activeFighter');
        console.log('The new current player is : ', this.currentPlayer);
    };

    this.createFighters = function () {
        var startingLeftPos = 0;
        for (var i = 0; i < this.numberOfFighters; i++) {
            this.fighterList[this.fighterNames[i]] = new Fighter(this.fighterNames[i]);
            var thisDOMEle = this.fighterList[this.fighterNames[i]].createDOMElement(startingLeftPos);
            $('#gameBoard').append(thisDOMEle);
            startingLeftPos += 120;
        }
    };

    this.initialize = function () {
        this.createFighters();
        this.nextPlayer();
    }
}

$(document).ready(function () {
    game = new gameController($('#gameBoard'));
    game.initialize();
});