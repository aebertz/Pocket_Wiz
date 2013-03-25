var timer = 0;
var newAnim = 0;
var selected_enemy = 0;
var iNumAttack = 0;
var iNumBadGuys = 0;
var direction = 0;
var iPlayerTurn = -1;
var inBattleMode = false;
var numEnemies_random = 0;

function battleMode (object1, object2)
{
	if ((object1.team == 1) && (object2.team == 2))
	{
		if (inBattleMode == false)
		{
			inBattleMode = true;

			var objEnemy = Game.getMovableByName ("Demon_Imp");
			numEnemies_random = Math.floor ((Math.random () * 3) + 1);

			for (var i=0; i<numEnemies_random; i++)
			{
				var objEnemyClone = objEnemy.clone ("liveEnemy" + i);
				objEnemyClone.setVisible(true);
				objEnemyClone.setScale(2.0,2.0,2.0);
				objEnemyClone.setPosition ((i*45),0,0);
				objEnemyClone.health = 100;
				//var attack_timer = Math.floor ((Math.random () * 7000) + 5000);
				enemyIdle (i);
			}

			//var objCursor = Game.getMovableByName ("cursor");
			//objCursor.setVisible (true);	

			UI(true);
		}
	}
}

function selectEnemy ()
{
	var objEnemy = Game.getMovableByName ("liveEnemy" + enemyID);
	
}

function enemyIdle (enemyID)
{
	var random = Math.floor ((Math.random () * 5000) + 3000);
	var objEnemy = Game.getMovableByName ("liveEnemy" + enemyID);
	objEnemy.setMaterial("Demon_Imp");
	setTimeout ("enemyAttack (" + enemyID + ");", random);
}

function enemyAttack(enemyID)
{
	var objEnemy = Game.getMovableByName ("liveEnemy" + enemyID);
	objEnemy.setMaterial("Demon_Imp_Attack");
	
	
	//var objAttack = Game.getMovableByName ("bluefire");
	//var v3dPos = objEnemy.getPosition ();
	//objAttack.setPosition(v3dPos.x, v3dPos.y, v3dPos.z);
	//objAttack.setVisible(true);
	
	
	hurtPlayer (1);
	setTimeout ("enemyIdle (" + enemyID + ");", 1000);
}

function spellMenu ()
{
	// Display the spell menu
	
	showSpells (true);
	
	var objSpell = Game.getMovableByName ("txtSpell1");
	objSpell.setCaption ("Fire");
	
	var objSpell = Game.getMovableByName ("txtSpell2");
	objSpell.setCaption ("Ice");
	
	var objSpell = Game.getMovableByName ("txtSpell3");
	objSpell.setCaption ("");
}

function showMenu (visible)
{
	var objSpells_list = Game.getMovableByName ("battleMenu");
	objSpells_list.setVisible(visible);

	if (visible == true)
	{
		showSpells (false);
		showItems (false);
	}
}

function moveCursor ()
{
	var objCursor = Game.getMovableByName ("cursor");
	var objEnemyClone = Game.getMovableByName ("liveEnemy" + selected_enemy);
	var v3dPos = objEnemyClone.getPosition ();
	objCursor.setPosition (v3dPos.x, (v3dPos.y + 10), v3dPos.z);
	objCursor.setVisible (true);
}

function showSpells (visible)
{
	var objSpells_list = Game.getMovableByName ("spells_list");
	objSpells_list.setVisible(visible);

	if (visible == true)
	{
		showMenu (false);
		showItems (false);
	}
		
}

function showItems (visible)
{
	var objItems_list = Game.getMovableByName ("items_list");
	objItems_list.setVisible(visible);

	if (visible == true)
	{
		showMenu (false);
		showSpells (false);
	}
}

function isEnemyDead (id)
{
	var objEnemy = Game.getMovableByName ("liveEnemy" + id);

	if (objEnemy.health <= 0)
	{
		//Game.deleteObject ("liveEnemy" + id);
		objEnemy.setVisible (false);
		numEnemies_random--;
		
		if (numEnemies_random <= 0)
		{
			iPlayerTurn = -1;
			inBattleMode = false;
			UI (false);
			showMenu (false);
			showSpells (false);
			showItems (false);
		}
	}
}

function fire ()
{
	var objEnemy = Game.getMovableByName ("liveEnemy" + selected_enemy);
	var objAttack = Game.getMovableByName ("bluefire");
	
	var objClone = objAttack.clone ("newAnim" + iNumAttack);
	var v3dPos = objEnemy.getPosition();
	objEnemy.health -= 50;
	isEnemyDead (selected_enemy);
	
	objClone.setPosition(v3dPos.x, v3dPos.y, 2);
	objClone.setVisible(true);
	setTimeout ("killAnim (" + iNumAttack + ");", 1000);
	iNumAttack++;
}

function killAnim (animId)
{
	var objEnemy = Game.getMovableByName ("newAnim" + animId);
	objEnemy.setVisible (false);
	//Game.deleteObject ("newAnim" + animId);
	
}

function ice ()
{
	var objEnemy = Game.getMovableByName ("liveEnemy" + selected_enemy);
	var objAttack = Game.getMovableByName ("ice");
	
	var objClone = objAttack.clone ("newAnim" + iNumAttack);
	var v3dPos = objEnemy.getPosition();
	
	objClone.setPosition(v3dPos.x, v3dPos.y, 2);
	objClone.setVisible(true);
	setTimeout ("killAnim (" + iNumAttack + ");", 1000);
	iNumAttack++;
}


function useSpell (spellNumber)
{
	switch (spellNumber)
	{
		case 1:
			fire ();
			break;
		case 2:
			ice ();
			break;
		case 3:
			break;
		case 4:
			showMenu (true);
			break;
	}
	var objCursor = Game.getMovableByName ("cursor");
	objCursor.setVisible (false);
}

function selectTarget (attackType)
{
	iPlayerTurn = attackType;
	moveCursor ();
}

function itemMenu ()
{
	showItems (true);

	var objItem = Game.getMovableByName ("txtItem1");
	objItem.setCaption ("Potion");
	
	var objItem = Game.getMovableByName ("txtItem2");
	objItem2.setCaption ("Energy Crystal");
	
	var objItem = Game.getMovableByName ("txtItem3");
	objItem2.setCaption ("");
	
}

function potion ()
{
	alert ("poshun");
}

function eCrystal ()
{
	alert ("Enogy Creestol!");
}


function useItem (itemNumber)
{
	switch (itemNumber)
	{
		case 1:
			potion ();
			break;
		case 2:
			eCrystal ();
			break;
		case 3:
			break;
		case 4:
			showMenu (true);
			break;
	}
}

function UI (isVisible)
{
	var objInterface_main = Game.getMovableByName ("interface_main");

	objInterface_main.setVisible(isVisible);
	showMenu (isVisible);
	var objBackdrop = Game.getMovableByName ("backdrop");
	objBackdrop.setVisible(isVisible);
}

function onKeyUp (event)
{
	var objObject = Game.getMovableByName ("player");
	var v3dAcceleration = objObject.getAcceleration ();

	if (event.key == Key.ESCAPE)
		quit ();

	if (iPlayerTurn == -1)
	{
		if (event.key == Key.UP)
		{
			objObject.setAcceleration (v3dAcceleration.x, 0, v3dAcceleration.z);
			objObject.setMaterial("player_north");
			direction = 1;
		}

		if (event.key == Key.DOWN)
		{
			objObject.setAcceleration (v3dAcceleration.x, 0, v3dAcceleration.z);
			objObject.setMaterial("player_south");
			direction  = 3;
		}

		if (event.key == Key.LEFT)
		{
			objObject.setAcceleration (0, v3dAcceleration.y, v3dAcceleration.z);
			objObject.setMaterial("player_west");
			direction = 4;
		}
			

		if (event.key == Key.RIGHT)
		{
			objObject.setAcceleration (0, v3dAcceleration.y, v3dAcceleration.z);
			objObject.setMaterial("player_east");
			direction = 2;
		}
		
		if (event.key == Key.A)
		{
			if (direction  == 1)
			{
				objObject.setMaterial("player_north");
			}
			else if (direction  == 2)
			{
				objObject.setMaterial("player_east");
			}
			else if (direction  == 3)
			{
				objObject.setMaterial("player_south");
			}
			else if (direction  == 4)
			{
				objObject.setMaterial("player_west");
			}
		}

		if (event.key == Key.SPACE)
		{
			
		
		}
	}

	if (iPlayerTurn > 0)
	{
		if (event.key == Key.LEFT)
		{
			selected_enemy--;
			
			if (selected_enemy < 0)
				selected_enemy = (numEnemies_random - 1);
			
			moveCursor ();
		}

		if (event.key == Key.RIGHT)
		{
			selected_enemy++;
			
			if (selected_enemy >= numEnemies_random)
				selected_enemy = 0;
				
			moveCursor ();
		}

		if (event.key == Key.RETURN)
		{
			useSpell (iPlayerTurn);
		}
	}
} 
 
function onKeyDown (event)
{
	var objObject = Game.getMovableByName ("player");
	var v3dAcceleration = objObject.getAcceleration ();

	if (event.key == Key.ESCAPE)
		quit ();

	if (iPlayerTurn == -1)
	{
		if (event.key == Key.UP)
		{
			objObject.setAcceleration (v3dAcceleration.x, (v3dAcceleration.y + 20), v3dAcceleration.z);
			objObject.setMaterial("player_north_anim");
			
		}

		if (event.key == Key.DOWN)
		{
			objObject.setAcceleration (v3dAcceleration.x, (v3dAcceleration.y -20), v3dAcceleration.z);
			objObject.setMaterial("player_south_anim");
		}

		if (event.key == Key.LEFT)
		{
			objObject.setAcceleration ((v3dAcceleration.x - 20), v3dAcceleration.y, v3dAcceleration.z);
			objObject.setMaterial("player_west_anim");
		}

		if (event.key == Key.RIGHT)
		{
			objObject.setAcceleration ((v3dAcceleration.x + 20), v3dAcceleration.y, v3dAcceleration.z);
			objObject.setMaterial("player_east_anim");
		}
		
		if (event.key == Key.A)
		{
			if (direction  == 1)
			{
				objObject.setMaterial("attack_north");
			}
			else if (direction  == 2)
			{
				objObject.setMaterial("attack_east");
			}
			else if (direction  == 3)
			{
				objObject.setMaterial("attack_south");
			}
			else if (direction  == 4)
			{
				objObject.setMaterial("attack_west");
			}
			

		}
	}
}




function spawnBadGuy ()
{
	var objPlayer = Game.getMovableByName ("player");
	var objBadGuy = Game.getMovableByName ("enemy_1");
	var objClone = objBadGuy.clone ("newBadGuy" + iNumBadGuys);
	
	var iX = Math.floor ((Math.random() * 100) - 100);
	var iY = Math.floor ((Math.random() * 100) - 100);

	objClone.setVisible (true);
	objClone.setBoundingBoxVisible (false);
	objClone.setPosition (iX,iY,-3);
	objClone.team = 2;
	setTimeout ("killBadGuy (" + iNumBadGuys + ");", 50000);
	//setTimeout ("badGuyShoots (" + iNumBadGuys + ");", 2000);
	setTimeout ("spawnBadGuy ();", 5000);

	iNumBadGuys++;
}
function easeIn( t, v1, v2 ) 
{
  return v1 + (t * t * t) * (v2 - v1);
}

function spawnBadGuy2 ()
{
	var objPlayer = Game.getMovableByName ("player");
	var objBadGuy = Game.getMovableByName ("enemy_1");
	var objClone = objBadGuy.clone ("newBadGuy" + iNumBadGuys);
	objClone.setVisible (true);
	objClone.setBoundingBoxVisible (false);
	var iX = Math.floor ((Math.random () * 500));

	objClone.team = 2;
	//objClone.index = aryBadGuys.length;
	
	aryBadGuys2.push (objClone);

	setTimeout ("killBadGuy (" + iNumBadGuys + ");", 50000);
	setTimeout ("badGuyShoots (" + iNumBadGuys + ");", 2000);
	setTimeout ("spawnBadGuy2 ();", iSpawnTime_badGuy);

	iNumBadGuys++;
}

function spawnLand ()
{
	var objLand = Game.getMovableByName ("box");
	var startingX = -550;
	var startingZ = -250;
	
	for (var i=0; i<50; i++)
	{
		
		for (var j=0; j<50; j++)
		{    		
		
				var x = (i * 32) + startingX;
				var y = (j * 32) + startingZ;
				

				var objClone = objLand.clone ("newLand-" + i + "-" + j);
				var random = Math.floor ((Math.random () * 10));
				objClone.type = 1;
				objClone.setVisible (true);
				
				if (random <= 2)
				{
					objClone.setMaterial ("grass_2");
					objClone.type = 5;
				}
				
				if (objClone.type == 5)
				{
					
				}
	
				
				objClone.setBoundingBoxVisible (false);
				objClone.setPosition (x, y, -3);
			
		}
	}
}


function killBadGuy (iBadGuyID)
{
	Game.deleteObject ("newBadGuy" + iBadGuyID);
	//aryBadGuys.splice (objBadGuy.index, 1);
}

function killBattleEnemy (iBadGuyID)
{
	Game.deleteObject ("liveEnemy" + iBadGuyID);
}


function frameStarted (lastFrameTime)
{
	var objPlayer = Game.getMovableByName ("player");

	timer += lastFrameTime;
}

function makePlayerAbleToBeHurt ()
{
	var objPlayer = Game.getMovableByName ("player");
	objPlayer.canBeHurt = true;
}

function hurtPlayer (iDamage)
{
	var objPlayer = Game.getMovableByName ("player");

	if (objPlayer.canBeHurt == true)
	{
		objPlayer.health--;
		//alert ("Player Hewrt");

		if (objPlayer.health <= 0)
		{
			var objShip = Game.getMovableByName ("ship");
			alert ("Player Ded");
			
		}

		//objPlayer.canBeHurt = false;
		//setTimeout ("makePlayerAbleToBeHurt ();", 2000);
	}
}
function gameOver ()
{

}

function asteroidCrash (object1, object2)
{
	if (object2.team == 3)
	{ 
		if (object1.isPlayer == true)
		{
			hurtPlayer (1);
		}
	}
}




function updateScore ()
{
	var objScore = Game.getMovableByName ("txtScore");

	objScore.setCaption ("Score: " + iScore);
}



function startGame ()
{
	var objPlayer = Game.getMovableByName ("player");
	objPlayer.health = 17;
	objPlayer.team = 1;
	objPlayer.canBeHurt = true;
	spawnLand ()

	setTimeout ("spawnBadGuy ();", 5000);

}
