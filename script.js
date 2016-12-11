/**
 * Created by bill on 12/9/16.
 */
$('document').ready(function(){
    $('#p1Attack').click(p1Attack);
    $('#p1SpecialAttack').click(p1SpecialAttack);
    $('#p2Attack').click(p2Attack);
    $('#p2SpecialAttack').click(p2SpecialAttack);

});

function Fighter(name) {
    this.name = name;
    this.div = '';
    this.hitpoints = 100;
    this.atkDmg = function(maxHit){
        return Math.floor(Math.random() * maxHit + 1);
    }
    this.atk = function(opponent){
        var ranDmg = this.atkDmg(10);
        opponent.hitpoints -= ranDmg;
        console.log(this.name + ' hits ' + opponent.name + ' for ' + ranDmg + '.');
        console.log(opponent.name + ' has ' + opponent.hitpoints + ' left.');
        if(opponent.hitpoints <= 0){
            console.log(opponent.name + ' has been knocked out');
            $('#winner').text(this.name + 'wins!');
        }
    }
    this.specialAtk = function(opponent){
        var ranDmg = this.atkDmg(50);
        opponent.hitpoints -= ranDmg;
        var flavor = [' winds up with all he has and smacks ', ' uses all his rage and smashes ', ' pulls out a secret weapon and hits '];
        var ranFlavor = Math.floor(Math.random() * flavor.length);
        console.log(this.name + flavor[ranFlavor] + opponent.name + ' for ' + ranDmg + '.');
        console.log(opponent.name + ' has ' + opponent.hitpoints + ' left.');
        if(opponent.hitpoints <= 0){
            console.log(opponent.name + ' has been knocked out');
            $('#winner').text(this.name + 'wins!');
        }
    }
}

var p1 = new Fighter('BloodSeeker');
var p2 = new Fighter('Axe');
var p3 = new Fighter('Tidehunter');


function p1Attack (){
    p1.atk(p2);
}

function p2Attack (){
    p2.atk(p1);
}

function p1SpecialAttack (){
    p1.specialAtk(p2);
}

function p2SpecialAttack (){
    p2.specialAtk(p1);

}
