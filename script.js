let showStatus = false;
let gameStart = false;

// $("#toggle").on("click", function() {
// 	if (showStatus) {
// 		showStatus = false;
// 		$("#status").css("display", "none");
// 		$("#infoText").css("display", "inline-block");
// 	} else {
// 		showStatus = true;
// 		$("#status").html("");
// 		for (let i = 0; i < gameElements.people.length; i++) {
// 			$("#status").append(`OXEN Number: ${gameElements.wagon.oxenNum}, Hyper drive state: ${gameElements.wagon.hyperDrive}`);
// 		}
// 		$("#status").append(``);
// 		$("#status").css("display", "inline-block");
// 		$("#infoText").css("display", "hidden");
// 	}
// 	$("#toggle").blur();
// });

class Person {
	constructor(name, life, intell, strength) {
		this.name = name;
		this.life = life;
		this.strength = strength;
		this.intell = intell;
	}
}

let gameElements = {
	people: [],
	wagon: {
		oxenNum: 6,
		hyperDrive: 100
	},
	turnsLeft: 20
}

const gameScripts = {
	goodText: [
		["While traveling through space, a slow moving metorite bumps into the WAGON. The metorite carries hyper drive fuel. +20% to hyper drive", "HDRIVE", 20],
		["While traveling through space, the crew meets some aliens. The aliens are from Sector 29343 in System 46388. These aliens are covered in green fur and have bright red eyes. They are approximately five feet tall and are have a humanoid shape. The communicate using tactile rhythms. They offer an OXEN as a gift. +1 OXEN", "OXEN", 1],
		["Along the way, some friendly merchants from Xenon in System 2892 cross paths with the crew. The merchants have a small rodent-like appearence with dark blue eyes. They can fluently speak any language in the local supercluster. The merchants generously give a LIFE-PACK. +2 life to a random person.", "LIFE", 2],
		["The crew continue on their journey, when suddendly, the WAGON is surrounded by a pure white light. A deep, staccato voice speaks. The crew members are unable to understand the words. The light fades away. All crew members feel a surge in vitality and strength. +1 life to everyone.", "ALLIFE", 1],
		["A friendly colony of Xorgs approach the WAGON. They offer two OXEN as gifts. +2 OXEN", "OXEN", 2],
		["A friendly colony of Xorgs approach the WAGON. They offer three OXEN as gifts. +3 OXEN", "OXEN", 3],
		["A wormhole appears in front of the WAGON. The WAGON is pulled into the wormhole due to the immense force from gravity. Space and time bend around the WAGON. The WAGON appears to have moved towards Epsilon Deluvia 5, which has significantly shortened the journey.", "WORMHOLE", -2],
		["A wormhole appears in front of the WAGON. The WAGON is pulled into the wormhole due to the immense force from gravity. Space and time bend around the WAGON. The WAGON appears to have moved towards Epsilon Deluvia 5, which has significantly shortened the journey.", "WORMHOLE", -3],
		["The WAGON passes a super massive black hole. The disortions in space and time result in the time dilating and space contracting. The journey is shortened slightly and the WAGON is accelerated towards Epsilon Deluvia 5.", "WORMHOLE", -1],
		["The WAGON reaches a central space station. Hyper drive fuel is restore at the station. +50% to hyper drive", "HDRIVE", 50],
		["While traveling through space, a slow moving metorite bumps into the WAGON. The metorite carries hyper drive fuel. +20% to hyper drive", "HDRIVE", 20],
		["While traveling through space, the crew meets some aliens. The aliens are from Sector 29343 in System 46388. These aliens are covered in green fur and have bright red eyes. They are approximately five feet tall and are have a humanoid shape. The communicate using tactile rhythms. They offer an OXEN as a gift. +1 OXEN", "OXEN", 1],
		["Along the way, some friendly merchants from Xenon in System 2892 cross paths with the crew. The merchants have a small rodent-like appearence with dark blue eyes. They can fluently speak any language in the local supercluster. The merchants generously give a LIFE-PACK. +2 life to a random person.", "LIFE", 2],
		["The crew continue on their journey, when suddendly, the WAGON is surrounded by a pure white light. A deep, staccato voice speaks. The crew members are unable to understand the words. The light fades away. All crew members feel a surge in vitality and strength. +1 life to everyone.", "ALLIFE", 1],
		["A friendly colony of Xorgs approach the WAGON. They offer two OXEN as gifts. +2 OXEN", "OXEN", 2],
		["A friendly colony of Xorgs approach the WAGON. They offer three OXEN as gifts. +3 OXEN", "OXEN", 3],
		["A wormhole appears in front of the WAGON. The WAGON is pulled into the wormhole due to the immense force from gravity. Space and time bend around the WAGON. The WAGON appears to have moved towards Epsilon Deluvia 5, which has significantly shortened the journey.", "WORMHOLE", -2],
		["A wormhole appears in front of the WAGON. The WAGON is pulled into the wormhole due to the immense force from gravity. Space and time bend around the WAGON. The WAGON appears to have moved towards Epsilon Deluvia 5, which has significantly shortened the journey.", "WORMHOLE", -3],
		["The WAGON passes a super massive black hole. The disortions in space and time result in the time dilating and space contracting. The journey is shortened slightly and the WAGON is accelerated towards Epsilon Deluvia 5", "WORMHOLE", -1],
		["The WAGON reaches a central space station. Hyper drive fuel is restore at the station. +50% to hyper drive", "HDRIVE", 50],
		["A band of space pirates attack the WAGON. Luckily, the space pirates are no match for the WAGON's defense systems. The pirates flee in small capsules, leaving their ships behind. +50 to hyper drive.", "HDRIVE", 50],
		["A band of space pirates attack the WAGON. Luckily, the space pirates are no match for the WAGON's defense systems. The pirates flee in small capsules, leaving their ships behind. +50 to hyper drive.", "HDRIVE", 50],
		["A band of space pirates attack the WAGON. Luckily, the space pirates are no match for the WAGON's defense systems. The pirates flee in small capsules, leaving their ships behind. +3 OXEN", "OXEN", 3],
		["A band of space pirates attack the WAGON. Luckily, the space pirates are no match for the WAGON's defense systems. The pirates flee in small capsules, leaving their ships behind. +3 OXEN", "OXEN", 3],
		["The WAGON passes through a strange purple cloud. The cloud covers the surface of the WAGON, imbuing it with strange space-time bending properties. The WAGON now teleports closer to Epsilon Deluvia 5", "WORMHOLE", -2]

	],
	badText: [
		[" inhale some strange green space dust. The dust induces a lethal allergic reaction that cacuses extreme hypertension and causes cardiac arrest", "SICK", 30],
		[" contracts space dysentery. The space dysentery causes severe stomach cramps and projectile vomiting.", "SICK", 2],
		[" is attacked by a space eel. The space eel injects its venom. The venom causes rashes and blisters", "SICK", 1],
		[" is attacked by a space kraken. The kraken's stings are very painful. They cause dark red splotches all over the skin", "SICK", 2],
		[" is attacked by a pack of Rognar. The Rognar are carnivorous beasts that feed on almost all organisms in the galaxy. The Rognar manage to leave a bloody scar.", "SICK", 1],
		[" inhale some strange green space dust. The dust induces a lethal allergic reaction that cacuses extreme hypertension and causes cardiac arrest", "SICK", 30],
		[" contracts space flu. The space flu causes minor headaches and a fever.", "SICK", 1],
		[" contracts a deadly space virus. The virus causes internal bleeding and is lethal.", "SICK", 30],
		["A meteorite strikes the WAGON. Significant damage is inflicted on the WAGON. The hyper drive is damaged. -30% to hyper drive", "HDRIVE", -30],
		["A meteorite strikes the WAGON. Significant damage is inflicted on the WAGON. The hyper drive is damaged. -20% to hyper drive", "HDRIVE", -20],
		["A crew of wild space pirates attack the WAGON. They steal two OXEN. -4 OXEN", "OXEN", -4],
		["A crew of wild space pirates attack the WAGON. They steal three OXEN. -3 OXEN", "OXEN", -3],
		["A crew of wild space pirates attack the WAGON. They steal an OXEN. -2 OXEN", "OXEN", -2],
		["Solar radiation causes the hyper drive to degrade. -5% to hyper drive", "HDRIVE", -10],
		["A crew of wild space pirates attack the WAGON. The crew fends off the attackers, but the pirates manage to hurt on of the crew members. -2 life to a random person.", "LIFE", -2],
		["The WAGON passes through an astroid belt. The large rocks crash into the WAGON. A OXEN is destroyed from the barrage of rocks. -1 OXEN", "OXEN", -1],
		["A rogue group of space mercenaries approach the WAGON. They demand 20% hyper drive fuel. The crew reluctantly offers fuel and fuel containers if there is no fuel left. -20% to hyper drive", "HDRIVE", -20],
		[" contracts space dysentery. The space dysentery causes severe stomach cramps and projectile vomiting.", "SICK", 2],
		[" is attacked by a space eel. The space eel injects its venom. The venom causes rashes and blisters", "SICK", 1],
		[" is attacked by a space kraken. The kraken's stings are very painful. They cause dark red splotches all over the skin", "SICK", 2],
		[" is attacked by a pack of Rognar. The Rognar are carnivorous beasts that feed on almost all organisms in the galaxy. The Rognar manage to leave a bloody scar.", "SICK", 1],
		[" contracts space flu. The space flu causes minor headaches and a fever.", "SICK", 1],
		[" contracts a deadly space virus. The virus causes internal bleeding and is lethal.", "SICK", 30],
		["A meteorite strikes the WAGON. Significant damage is inflicted on the WAGON. The hyper drive is damaged. -30% to hyper drive", "HDRIVE", -30],
		["A meteorite strikes the WAGON. Significant damage is inflicted on the WAGON. The hyper drive is damaged. -20% to hyper drive", "HDRIVE", -20],
		["A crew of wild space pirates attack the WAGON. They steal two OXEN. -2 OXEN", "OXEN", -2],
		["A crew of wild space pirates attack the WAGON. They steal three OXEN. -3 OXEN", "OXEN", -3],
		["A crew of wild space pirates attack the WAGON. They steal an OXEN. -1 OXEN", "OXEN", -1],
		["Solar radiation causes the hyper drive to degrade. -5% to hyper drive", "HDRIVE", -10],
		["A crew of wild space pirates attack the WAGON. The crew fends off the attackers, but the pirates manage to hurt on of the crew members. -2 life to a random person.", "LIFE", -2],
		["The WAGON passes through an astroid belt. The large rocks crash into the WAGON. A OXEN is destroyed from the barrage of rocks. -1 OXEN", "OXEN", -1],
		["A rogue group of space mercenaries approach the WAGON. They demand 20% hyper drive fuel. The crew reluctantly offers fuel and fuel containers if there is no fuel left. -20% to hyper drive", "HDRIVE", -20],
		["A 100km battleship warps without any warning in front of the WAGON. The WAGON and the battleship collide. The WAGON is destroyed", "DEATH"],
		["The WAGON malfunctions and causes the hyper drive to be damaged. -10% to hyper drive", "HDRIVE", -10],
		["A wormhole appears in front of the WAGON, the wormhole bends space and time. The WAGON travels through the wormhole. Unfortunately, the wormhole sends the WAGON back in time. This sets the WAGON back and further delays the journey.", "WORMHOLE", 1],
		["A wormhole appears in front of the WAGON, the wormhole bends space and time. The WAGON travels through the wormhole. Unfortunately, the wormhole sends the WAGON back in time. This sets the WAGON back and further delays the journey.", "WORMHOLE", 2],
		["The WAGON malfunctions and causes the hyper drive to be damaged. -10% to hyper drive", "HDRIVE", -10],
		["A wormhole appears in front of the WAGON, the wormhole bends space and time. The WAGON travels through the wormhole. Unfortunately, the wormhole sends the WAGON back in time. This sets the WAGON back and further delays the journey.", "WORMHOLE", 1],
		["A wormhole appears in front of the WAGON, the wormhole bends space and time. The WAGON travels through the wormhole. Unfortunately, the wormhole sends the WAGON back in time. This sets the WAGON back and further delays the journey.", "WORMHOLE", 2]
	]
}

function gameEventHandler(evt) {
	// Should see the updated text
	if (showStatus) {
		$("#toggle").click();
	}
	switch (evt[1]) {
		case "HDRIVE": 
			gameElements.wagon.hyperDrive += 20;
			$("#infoText").html(evt[0])
			break;
		case "SICK":
			let randPerson = gameElements.people[Math.floor(Math.random()*gameElements.people.length)];
			randPerson.life -= evt[2];
			$("#infoText").html(randPerson.name + evt[0]);
			$("#infoText").append(randPerson.life > 0 ? " " + randPerson.name + " gets better after a few days of recovery." : "");
			break;
		case "OXEN":
			gameElements.wagon.oxenNum += evt[2];
			$("#infoText").html(evt[0]);
			break;
		case "LIFE":
			let ranPerson = gameElements.people[Math.floor(Math.random()*gameElements.people.length)];
			ranPerson.life += evt[2];
			$("#infoText").html(evt[0]);
			break;
		case "ALLIFE":
			for (let i = 0; i < gameElements.people.length; i++) {
				gameElements.people[i].life += evt[2];
			}
			$("#infoText").html(evt[0]);
			break;
		case "WORMHOLE":
			gameElements.turnsLeft += evt[2];
			$("#infoText").html(evt[0]);
			break;
		case "DEATH":
			gameStart = false;
			$("#modal > .modalContent").html("<p>" + evt[0] + "</p>")
			$("#modal").css("display", "inline-block");
			break;
		default:
			alert("Error, something is broken. Ask Jason if this is not Jason. Whoops haha.");
			break;
	}
}

function updateHeaderText() {
	$("#updateHeader p").html(`OXEN Number: ${gameElements.wagon.oxenNum} <br> Hyper Drive State: ${gameElements.wagon.hyperDrive}`);
}

$("#startGame").on("click", function() {
	gameStart = true;
	$("#modal").css("display","none");
	for (let i = 1; i < 5; i++) {
		let $name = $("#person" + i).val();
		let life = Math.random() > 0.5 ? 6 : 4;
		let intell = Math.round(Math.random() * 100);
		let strength = Math.random() > 0.5 ? 6 : 4;
		gameElements.people.push(new Person($name, life, intell, strength));
	}
});


// Check if people are still alive, return false if everyone is dead
function checkGameState() {
	if (gameElements.people.length == 0) {
		return false;
	} else {
		return true;
	}
}

function checkAlive() {
	for (let i = 0; i < gameElements.people.length; i++) {
		if (gameElements.people[i].life <= 0) {
			$("#infoText").append(" " + gameElements.people[i].name + " has died.");
			gameElements.people.splice(i, 1);
		}
	}
}

function checkFuel() {
	if (gameElements.wagon.hyperDrive <= 0) {
		$("#infoText").append(" Hyper drive is not functional, which results in the WAGON slowing down significantly");
		gameElements.turnsLeft -= 0.25
	} else {
		gameElements.wagon.hyperDrive -= 20;
		gameElements.turnsLeft -= 1;
	}

	if (gameElements.wagon.oxenNum <= 0) {
		gameStart = false;
		$("#modal > .modalContent").html("<p>Without any OXEN left, the WAGON is unable to continue moving. Eventually, all critical systems stop functioning. The crew is left stranded in space. Game over. Refresh to try again</p>")
		$("#modal").css("display", "inline-block");
	}
}

function checkWin() {
	if (gameElements.turnsLeft <= 0) {
		gameStart = false;
		let livingNames = "";
		for (let i = 0; i < gameElements.people.length; i++) {
			if (i == gameElements.people.length - 1) {
				if (gameElements.people.length > 1) {
					livingNames += "and "
				}
				livingNames += (gameElements.people[i].name);
			} else {
				if (gameElements.people.length > 2) {
					livingNames += (gameElements.people[i].name + ", ");
				} else {
					livingNames += (gameElements.people[i].name + " ");
				}
			}	
		}
		if (gameElements.people.length > 1) {
			$("#modal > .modalContent").html("<p>You Win! " + livingNames + " successfully make it to Epsilon Deluvia 5! Refresh to explore again. Thanks for playing!</p>")
		} else {
			$("#modal > .modalContent").html("<p>You Win! " + livingNames + " successfully makes it to Epsilon Deluvia 5! Refresh to explore again. Thanks for playing!</p>")
		}
		
		$("#modal").css("display", "inline-block");
	} else {
		$("#infoHeader").html("Sol " + (20 - gameElements.turnsLeft));
	}
}

updateHeaderText();

$(document).keypress(function(e) {
	if (e.which == 32 && gameStart) {
		if (checkGameState()) {
			if (Math.random() > 0.5) {
				gameEventHandler(gameScripts.goodText[Math.floor(Math.random() * gameScripts.goodText.length)]);
			} else {
				gameEventHandler(gameScripts.badText[Math.floor(Math.random() * gameScripts.badText.length)]);
			}
			checkAlive();
			checkFuel();
			checkWin();
			updateHeaderText();
		} else {
			gameStart = false;
			$("#modal > .modalContent").html("<p>Game Over! Everyone is dead. Refresh to try again.</p>")
			$("#modal").css("display", "inline-block");
		}
	}
});
