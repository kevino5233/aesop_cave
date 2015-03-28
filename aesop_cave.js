var names = [
{
	name: "ayy lmao",
	used: false
},
{
	name: "Kappa",
	used: false
},
{
	name: "das it mane",
	used: false
},
{
	name: "Sanic",
	used: false
},
{
	name: "The Donger",
	used: false
},
{
	name: "HOO, HAH!",
	used: false
},
{
	name: "Resident Sleeper",
	used: false
},
{
	name: "Fight me IRL",
	used: false
}
];

var scenes = [
{
	name: "Sudden Encounter",
	encountered: false
},
{
	name: "Out of Food",
	encountered: false
},
{
	name: "Sharing the Loot",
	encountered: false
},
{
	name: "A Heart to Heart Discussion",
	encountered: false
},
{
	name: "Running in Circles",
	encountered: false
}
];

var party = [
{
	name: "",
	alive: true,
	experience: 0,
	mercy: 0,
	greed: 0,
	bravery: 0,
	wit: 0,
	suspicion: 0,
	paranoia: 0
},
{
	name: "",
	alive: true,
	experience: 0,
	mercy: 0,
	greed: 0,
	bravery: 0,
	wit: 0,
	suspicion: 0,
	paranoia: 0
},
{
	name: "",
	alive: true,
	experience: 0,
	mercy: 0,
	greed: 0,
	bravery: 0,
	wit: 0,
	suspicion: 0,
	paranoia: 0
},
{
	name: "",
	alive: true,
	experience: 0,
	mercy: 0,
	greed: 0,
	bravery: 0,
	wit: 0,
	suspicion: 0,
	paranoia: 0
}
];

var seed = 0;

function nextRand(){
	var rand = Math.sin(seed++) * 10000;
	return rand - Math.floor(rand);
}

//<<printname $index>>
macros['printname'] = {
	handler: function(place, macroName, params, parser) {
		insertText(place, party[params[0]]["name"]);
	}
};

//<<seedify $name>>
macros['seedify'] = {
	handler: function(place, macroName, params, parser) {
		var name = state.history[0].variables[params[0].substring(1)];
		seed = 0;
		for (var i = 0; i < name.length; i++){
			seed += name.charCodeAt(i);
		}
		//instantiate party members
		for (var i = 0; i < party.length; i++){
			//instantiate name
			var randNameIndex = nextRand();
			randNameIndex = Math.floor(randNameIndex * names.length);
			var nameObj = names[randNameIndex];
			while (nameObj.used){
				randNameIndex++;
				randNameIndex %= names.length;
				nameObj = names[randNameIndex];
			}
			party[i].name = nameObj.name;
			nameObj.used = true;
			
			//instantiate other stuff
			var randall;
			
			//instantiate experience
			randall = Math.floor(nextRand() * 3) + 1;
			randall *= 25;
			party[i].experience = randall;
			
			//instantiate greed
			randall = Math.floor(nextRand() * 3) + 1;
			randall *= 25;
			party[i].greed = randall;
			
			//instantiate mercy
			randall = Math.floor(nextRand() * 3) + 1;
			randall *= 25;
			party[i].mercy = randall;
			
			//instantiate bravery
			randall = Math.floor(nextRand() * 3) + 1;
			randall *= 25;
			party[i].bravery = randall;
			
			//instantiate wit
			randall = Math.floor(nextRand() * 3) + 1;
			randall *= 25;
			party[i].wit = randall;
			
			//instantiate paranoia
			randall = Math.floor(nextRand() * 3) + 1;
			randall *= 10;
			party[i].paranoia = randall;
			
			console.log(JSON.stringify(party[i]));
		}
	}
}

//<nextscene $scene>>
macros['nextscene'] = {
	handler: function(place, macroname, params, parser) {
		var randSceneIndex = nextRand();
		randSceneIndex = Math.floor(randSceneIndex * scenes.length);
		var sceneObj = scenes[randSceneIndex];
		var timesLooped = 0;
		while (sceneObj.used && timesLooped < scenes.length){
			timesLooped++;
			randSceneIndex++;
			randSceneIndex %= scenes.length;
			sceneObj = scenes[randSceneIndex];
		}
		if (sceneObj.used && timesLooped >= scenes.length){
			state.history[0].variables[params[0].substring(1)] = "Final Encounter";
		} else {
			sceneObj.used = true;
			state.history[0].variables[params[0].substring(1)] = sceneObj.name;
		}
	}
}

//<<getvalue $destination $member $key>>
macros['getvalue'] = {
	handler: function(place, macroname, params, parser) {
		var val = party[params[1]][params[2]];
		state.history[0].variables[params[0].substring(1)] = val;
	}
}

//<<incsuspicion $source $dest>>
macros['incsuspicion'] = {
	handler: function(place, macroname, params, parser) {
		party[params[1]].suspicion += party[params[0]].paranoia;
	}
}