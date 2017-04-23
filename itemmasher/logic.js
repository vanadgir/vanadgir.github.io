console.log("JS File loaded")

function imgRedirect(destination){
 location.href = destination;
}

function pullStats(imagenumber){
  var item = {}
  item = [
  {
  	"id": 0,
  	"name": "TEMPLATE",
    "cost": 9000,
    "stats": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  	"desc": "long string",
  },

  {
  	"id": 1001,
  	"name": "Boots of Speed",
    "cost": 300,
    "stats": [0,0,0,0,0,0,25,0,0,0,0,0,0,0,0,0,0,0,0],
  	"desc": "Speed increase!",
    "index": 1,
  },

  {
  	"id": 1004,
  	"name": "Faerie Charm",
    "cost": 125,
    "stats": [0,0,0,0,0,25,0,0,0,0,0,0,0,0,0,0,0,0,0],
  	"desc": "Mana ++",
    "index": 2,
  },

  {
  	"id": 1006,
  	"name": "Combined thing!",
    "cost": 425,
    "stats": [0,0,0,0,50,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  	"desc": "Combined output",
    "index": 3,
  },

  {
  	"id": 1011,
  	"name": "Giant's Belt",
    "cost": 1000,
    "stats": [380,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  	"desc": "Big health thing",
  },

  {
  	"id": 1018,
  	"name": "Cloak of Agility",
    "cost": 800,
    "stats": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20],
  	"desc": "Invis cloak",
  },

  {
  	"id": 1026,
  	"name": "Blasting Wand",
    "cost": 850,
    "stats": [0,0,0,40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  	"desc": "Magic wand",
  },

  {
  	"id": 1027,
  	"name": "Sapphire Crystal",
    "cost": 350,
    "stats": [0,250,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  	"desc": "Mana thing",
  },

  {
  	"id": 1028,
  	"name": "Ruby Crystal",
    "cost": 400,
    "stats": [150,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  	"desc": "Health thing",
  },

  {
  	"id": 1029,
  	"name": "Cloth Armor",
    "cost": 300,
    "stats": [0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,0,0,0,0],
  	"desc": "Armor thing",
  },

  {
  	"id": 1031,
  	"name": "Chain Vest",
    "cost": 800,
    "stats": [0,0,0,0,0,0,0,0,0,0,40,0,0,0,0,0,0,0,0],
  	"desc": "Armor big thing",
  },

  {
  	"id": 1033,
  	"name": "Null-Magic Mantle",
    "cost": 450,
    "stats": [0,0,0,0,0,0,0,0,0,0,0,25,0,0,0,0,0,0,0],
  	"desc": "Description of mantle",
  },

  {
  	"id": 1036,
  	"name": "Long Sword",
    "cost": 350,
    "stats": [0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  	"desc": "Long sword",
  },

  {
  	"id": 1037,
  	"name": "Pickaxe",
    "cost": 875,
    "stats": [0,0,25,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  	"desc": "Dig thing",
  },

  {
  	"id": 1038,
  	"name": "B. F. Sword",
    "cost": 1300,
    "stats": [0,0,40,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  	"desc": "Big friend sward",
  },

  {
  	"id": 1039,
  	"name": "Hunter's Talisman",
    "cost": 350,
    "stats": [0,0,0,0,0,150,0,0,0,0,0,0,0,0,0,0,0,0,0],
  	"desc": "UNIQUE Passive - Tooth: Damaging a monster with a spell or attack steals 25 Health over 5 seconds.  Killing monsters grants special bonus experience.",
  },

  {
  	"id": 1041,
  	"name": "Hunter's Machete",
    "cost": 350,
    "stats": [0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0],
  	"desc": "UNIQUE Passive - Nail: Basic attacks deal 25 bonus damage on hit vs. Monsters.  Killing monsters grants special bonus experience.",
  },

  {
  	"id": 1042,
  	"name": "Dagger",
    "cost": 300,
    "stats": [0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0],
  	"desc": "Stab thing",
  },

  {
  	"id": 1043,
  	"name": "Recurve Bow",
    "cost": 1000,
    "stats": [0,0,0,0,0,0,0,25,0,0,0,0,0,0,0,0,0,0,0],
  	"desc": "UNIQUE Passive: Basic attacks deal an additional 15 physical damage on hit.",
  },

  {
  	"id": 1051,
  	"name": "Brawler's Gloves",
    "cost": 400,
    "stats": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10],
  	"desc": "Gloves",
  },

  {
  	"id": 1052,
  	"name": "Amplifying Tome",
    "cost": 435,
    "stats": [0,0,0,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  	"desc": "Its a book",
  },

  {
  	"id": 1053,
  	"name": "Vampiric Scepter",
    "cost": 900,
    "stats": [0,0,15,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0],
  	"desc": "Grr steal",
  },

  {
  	"id": 1054,
  	"name": "Doran's Shield",
    "cost": 450,
    "stats": [80,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  	"desc": "Passive: Restores 6 Health every 5 seconds.\nUNIQUE Passive: Blocks 8 damage from single target attacks and spells from champions.",
  },
]


 // console.log("End of pullState function - file name id number of item " + imagenumber)
 imagefilename = "./item/" + imagenumber + ".png"
 // console.log(imagefilename)

 // item.indexOf[item

 //
 // var item1Image = document.getElementById("item1-image");
 // if (item1Image.src == "") {
 //   document.getElementById("item1-image").src=imagefilename;
 // } else if (item1Image.src == imagefilename) {
 //   document.getElementById("item1-image").src= "";
 // }
 // else if (item1Image.src != "" && item1Image.src != imagefilename) {
 //   document.getElementById("item2-image").src=imagefilename;
 // }

 console.log(item[1])

 image1nametext = item[item[1].index].name
 image1costtext = item[item[1].index].cost
 image1statstext = item[item[1].index].stats.length
 image1desctext = item[item[1].index].desc


 document.getElementById("item1-image").src= imagefilename;
 document.getElementById("name1").innerHTML = image1nametext;
 document.getElementById("cost1").innerHTML = image1costtext;
 document.getElementById("stats1").innerHTML = image1statstext;
 document.getElementById("desc1").innerHTML = image1desctext;

 image2nametext = item[2].name
 image2costtext = item[2].cost
 image2statstext = item[2].stats.length
 image2desctext = item[2].desc

 document.getElementById("item2-image").src= imagefilename;
 document.getElementById("name2").innerHTML = image2nametext;
 document.getElementById("cost2").innerHTML = image2costtext;
 document.getElementById("stats2").innerHTML = image2statstext;
 document.getElementById("desc2").innerHTML = image2desctext;

 imagecombonametext = item[3].name
 imagecombocosttext = item[3].cost
 imagecombostatstext = item[3].stats.length
 imagecombodesctext = item[3].desc

 document.getElementById("combo-image").src= imagefilename;
 document.getElementById("namecombo").innerHTML = imagecombonametext;
 document.getElementById("costcombo").innerHTML = imagecombocosttext;
 document.getElementById("statscombo").innerHTML = imagecombostatstext;
 document.getElementById("desccombo").innerHTML = imagecombodesctext;


 // document.getElementById("item2-image").src="item2.jpg";
 // document.getElementById("combo-image").src="combo.jpg";



}
