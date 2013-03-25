var timer = 0;
var newAnim = 0;
var selected_enemy = 0;
var iNumAttack = 0;
var iNumBadGuys = 0;
var direction = 0;
var random = 0;
var iPlayerTurn = -1;
var iBattleBadGuys = 0;
var inBattleMode = false;
var numEnemies_random = 0;
var bgBadGuyTouchedName = "";
var nameSelectedEnemy = "";
var nameEnemyDead = "";
var iEnemyIndex = 0;
var InitHealth = 17;
var iMaxPlayerHealth = 100;
var player = new Character ();
var iNumSpell = 0;
var aryEnemies = new Array ();
var aryBadGuys = new Array ();
var aryClosestBadGuys = new Array ();
var iClosestBadGuyIndex = 0;
var selectedBadGuy = null;


function transition ()
{
	var objTrans = Game.getMovableByName ("box");
	var startingX = -450;
	var startingXalt = 1;
	var startingZ = -650;
	var alt = false; 
	
	for (var i=0; i<25; i++)
	{
		
		for (var j=0; j<25; j++)
		{    		
			if (alt == false)
			{
				var x = v3dPlayerBattlePos.x + (i * 32) + startingX;
				var y = v3dPlayerBattlePos.y + (j * 32) + startingZ;
				

				var objClone = objTrans.clone ("newTrans-" + i + "-" + j);
				
				objClone.setVisible (true);
				objClone.setMaterial ("space_1");
			
				objClone.setBoundingBoxVisible (false);
				objClone.setPosition (x, y, 5);
				objClone.setMaxVelocity (250, 0, 0);
				objClone.setAcceleration (25, 0, 0);
				alt = true;
			}
			else
			{
				var x = v3dPlayerBattlePos.x + (i * 32) + startingXalt;
				var y = v3dPlayerBattlePos.y + (j * 32) + startingZ;
					

				var objClone = objTrans.clone ("newTrans-" + i + "-" + j);
					
				objClone.setVisible (true);
				objClone.setMaterial ("space_1");
				
				objClone.setBoundingBoxVisible (false);
				objClone.setPosition (x, y, 5);
				objClone.setMaxVelocity (-250, 0, 0);
				objClone.setAcceleration (-27, 0, 0);
				alt = false;
			}

			setTimeout ("Game.deleteObject ('newTrans-" + i + "-" + j + "');", 1000);
		}
	}

	setTimeout ("setupBattleMode ();", 1000);
}

function setupBattleMode ()
{
	var obj = player.gameObject;
	obj.setVisible (false);

	var objEnemy = Game.getMovableByName ("Demon_Imp");
	numEnemies_random = Math.floor ((Math.random () * 3) + 1);
	
	aryEnemies = new Array ();

	for (var i=0; i<numEnemies_random; i++)
	{
		var objEnemyClone = objEnemy.clone ("liveEnemy" + iBattleBadGuys);
		objEnemyClone.setVisible(true);
		objEnemyClone.setScale(2.0,2.0,2.0);
		objEnemyClone.setPosition ((i*20),0,0);
		objEnemyClone.health = 100;
		//var attack_timer = Math.floor ((Math.random () * 7000) + 5000);
		aryEnemies.push (objEnemyClone);
		enemyIdle (i);
		iBattleBadGuys++;
	}
	
	for (var iIdx = 0; iIdx < iNumBadGuys; iIdx++)
	{
		var obj = Game.getMovableByName ("newBadGuy" + iIdx);
		obj.setVisible (false);
	}

	//var objCursor = Game.getMovableByName ("cursor");
	//objCursor.setVisible (true);	

	UI(true);
}

function battleMode (object1, object2)
{
	if ((object1.team == 1) && (object2.team == 2))
	{
		if (inBattleMode == false)
		{
			inBattleMode = true;
			bgBadGuyTouchedName = object2.getName ();

			v3dPlayerBattlePos = player.gameObject.getPosition ();
			player.gameObject.setPosition (0,0,-3);
			player.gameObject.setAcceleration (0, 0, 0);
			player.gameObject.setVelocity (0, 0, 0);
			transition();
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
	objSpell.setCaption ("BlueFire");
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
	var objEnemyClone = aryEnemies[(selected_enemy + iEnemyIndex)];
	var v3dPos = objEnemyClone.getPosition ();
	objCursor.setPosition (v3dPos.x, (v3dPos.y + 10), (v3dPos.z + 2));
	objCursor.setVisible (true);
}

function moveCursorToPos (badGuy)
{
	var position = badGuy.getPosition ();
	var objCursor = Game.getMovableByName ("cursor");
	objCursor.setPosition (position.x, position.y, (position.z + 2));
	objCursor.setVisible (true);
}

function attackEnemy (badGuy)
{
	var position = selectedBadGuy.getPosition ();
	var objSpell = Game.getMovableByName ("fireHit");
	var objClone = objSpell.clone("newSpell" + iNumSpell);
	objClone.setPosition (position.x, position.y, (position.z + 2));
	objClone.setVisible (false);
	objClone.setCollides (true);
	objClone.setBoundingBoxVisible(true);
	objClone.team = 3; 
	setTimeout ("killSpell (" + iNumSpell + ");", 500);
	iNumSpell++;
	
}

function killSpell ( spellID)
{
	var obj = Game.getMovableByName ("newSpell" + spellID);
	obj.setVisible (false);
	obj.setCollides (false);
}
function showSpells (visible)
{
	var objSpells_list = Game.getMovableByName ("spells_list");
	var soundSelect = Game.getMovableByName ("select");
	soundSelect.play();
	setTimeout ("stopMusic (\"" + soundSelect.getName () + "\");", 7000);
	objSpells_list.setVisible(visible);
	
	setTimeout ("stopMusic (\"" + soundSelect.getName () + "\");", 7000);
	if (visible == true)
	{
		showMenu (false);
		showItems (false);
	}
		
}

function stopMusic(sound)
{
	effect = Game.getMovableByName (sound);
	effect.stop();
}

function showItems (visible)
{
	var soundSelect = Game.getMovableByName ("select");
	soundSelect.play();
	setTimeout ("stopMusic (\"" + soundSelect.getName () + "\");", 7000);
	var objItems_list = Game.getMovableByName ("items_list");
	objItems_list.setVisible(visible);

	if (visible == true)
	{
		showMenu (false);
		showSpells (false);
	}
}

function isEnemyDead (name)
{
	var objEnemy = Game.getMovableByName (name);

	if (objEnemy == null)
		return;

	if (objEnemy.getVisible () == false)
		return;

	if (objEnemy.health <= 0)
	{
		objEnemy.setVisible (false);
		objEnemy.isDead = true;
		Game.deleteObject (id);
	}

}

function fire ()
{
	var soundSelect = Game.getMovableByName ("select");
	soundSelect.play();
	setTimeout ("stopMusic (\"" + soundSelect.getName () + "\");", 7000);
	var objEnemy = selectedBadGuy;
	var objAttack = Game.getMovableByName ("fire");
	
	var objClone = objAttack.clone ("newAnim" + iNumAttack);
	var v3dPos = objEnemy.getPosition();
	objEnemy.health -= 50;
	
	objClone.setPosition(v3dPos.x, v3dPos.y, 2);
	objClone.setVisible(true);
	setTimeout ("killAnim (" + iNumAttack + ");", 1000);
	isEnemyDead (selectedBadGuy);
	iNumAttack++;
}

function fireHit (object1, object2)
{
	if ((object1.team == 2) && (object2.team == 3))
	{	
		nameSelectedEnemy = object2.getName ();
		var objEnemy = Game.getMovableByName (nameSelectedEnemy);
		var v3dPos = objEnemy.getPosition();
		var objAttack = Game.getMovableByName ("bluefire");
		var objClone = objAttack.clone ("newAnim" + iNumAttack);
		objClone.setPosition(v3dPos.x, v3dPos.y, 2);
		objClone.setVisible(true);
		objClone.setCollides(true);
		objEnemy.health -= 50;
		setTimeout ("killAnim (" + iNumAttack + ");", 200);
		//isEnemyDead ((objEnemy));
		iNumAttack++;
		
	}
}

function bluefire ()
{
	var objEnemy = aryEnemies[(selected_enemy + iEnemyIndex)];
	var objAttack = Game.getMovableByName ("bluefire");
	
	var objClone = objAttack.clone ("newAnim" + iNumAttack);
	var v3dPos = objEnemy.getPosition();
	objEnemy.health -= 50;
	
	objClone.setPosition(v3dPos.x, v3dPos.y, 2);
	objClone.setVisible(true);
	setTimeout ("killAnim (" + iNumAttack + ");", 1000);
	isEnemyDead ((selected_enemy + iEnemyIndex));
	iNumAttack++;
}


function killAnim (animId)
{
	var objAnim = Game.getMovableByName ("newAnim" + animId);
	objAnim.setVisible (false);
	//Game.deleteObject ("newAnim" + animId);
	
}

function ice ()
{
	var objEnemy = aryEnemies[(selected_enemy + iEnemyIndex)];
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
			bluefire ();
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
	
	for (var iIdx = 0; iIdx < 3; iIdx++)
	{
		var objItem = Game.getMovableByName ("txtItem" + (iIdx + 1));
		objItem.setCaption ("");
	}

	for (var iIdx = 0; iIdx < player.inventory.length; iIdx++)
	{
		var objItem = Game.getMovableByName ("txtItem" + (iIdx + 1));
		objItem.setCaption (player.inventory[iIdx]);
	}

	/*var objItem = Game.getMovableByName ("txtItem1");
	objItem.setCaption ("Potion");
	
	objItem = Game.getMovableByName ("txtItem2");
	objItem.setCaption ("Energy Crystal");
	
	objItem = Game.getMovableByName ("txtItem3");
	objItem.setCaption ("");*/
	
}

function potion ()
{
	itemMenu ();

	if (hasItem ("Potion") == false)
	{
		//alert ("You are out of potions!");

		return;
	}
	
	if (player.health < iMaxPlayerHealth)
	{
		player.health += 30;
		removeItem ("Potion");
	}
}

function hasItem (itemName)
{
	for (var iIdx = 0; iIdx < player.inventory.length; iIdx++)
	{
		if (player.inventory[iIdx] == itemName)
			return (true);
	}
	
	return (false);
}

function removeItem (itemName)
{
	for (var iIdx = 0; iIdx < player.inventory.length; iIdx++)
	{
		if (player.inventory[iIdx] == itemName)
		{
			player.inventory.splice (iIdx, 1);

			break;
		}
	}
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
	
	var objBackdrop = Game.getMovableByName ("player_HUD");
	objBackdrop.setVisible(isVisible);
}

function createOtherPlayer (playerName)
{
logMessage ("Creating player: " + playerName);
	if (player.name == playerName)
		return;

	for (var iIdx = 0; iIdx < otherPlayers.length; iIdx++)
	{
		var otherPlayer = otherPlayers[iIdx];

		if (otherPlayer.name == playerName)
			return;
	}

logMessage ("Created player: " + playerName);

	var objPlayer = Game.getMovableByName ("otherPlayer");
	var otherPlayer = new Character ();
	otherPlayer.gameObject = objPlayer.clone ("player-" + otherPlayerId);
	otherPlayer.gameObject.setVisible (true);
	otherPlayer.health = InitHealth;
	otherPlayer.name = playerName;
	otherPlayer.gameObject.team = 1;
	otherPlayer.canBeHurt = true;
	
	otherPlayer.inventory.push ("Potion");
	otherPlayer.inventory.push ("Potion");

	otherPlayers.push (otherPlayer);
	otherPlayerId++;
}

function createPlayer (playerName)
{
	var objPlayer = Game.getMovableByName ("player");
	player.gameObject = objPlayer.clone ("player-" + playerName);
	player.gameObject.setVisible (true);
	player.health = InitHealth;
	player.name = playerName;
	player.gameObject.team = 1;
	player.canBeHurt = true;
	
	player.inventory.push ("Potion");
	player.inventory.push ("Potion");
}

function onKeyUp (event)
{
	if (player.gameObject == null)
		return;

	var objObject = player.gameObject;
	
	var v3dAcceleration = objObject.getAcceleration ();

	if (event.key == Key.ESCAPE)
		quit ();
	
	if (inBattleMode == false)
	{
		if (event.key == Key.H)
			startServer ();

		if (event.key == Key.P)
		{
			var winConnect = App.getAppObjectByName ("winConnect");
			winConnect.setVisible (true);
		}

		if (event.key == Key.UP)
		{
			objObject.setAcceleration (v3dAcceleration.x, 0, v3dAcceleration.z);
			objObject.setMaterial("player_north");
			player.direction = 1;
		}

		if (event.key == Key.DOWN)
		{
			objObject.setAcceleration (v3dAcceleration.x, 0, v3dAcceleration.z);
			objObject.setMaterial("player_south");
			player.direction  = 3;
		}

		if (event.key == Key.LEFT)
		{
			objObject.setAcceleration (0, v3dAcceleration.y, v3dAcceleration.z);
			objObject.setMaterial("player_west");
			player.direction = 4;
		}
			

		if (event.key == Key.RIGHT)
		{
			objObject.setAcceleration (0, v3dAcceleration.y, v3dAcceleration.z);
			objObject.setMaterial("player_east");
			player.direction = 2;
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
			attackEnemy ();

		}
		
		if (event.key == Key.TAB)
		{
			cycleNearEnemy();
		}
	}

	if (iPlayerTurn > 0)
	{
		if (event.key == Key.LEFT)
		{
			selected_enemy--;
			
			if (selected_enemy < 0)
				selected_enemy = (aryEnemies.length - 1);
			
			moveCursor ();
		}

		if (event.key == Key.RIGHT)
		{
			selected_enemy++;
			
			if (selected_enemy >= aryEnemies.length)
				selected_enemy = 0;
				
			moveCursor ();
		}

		if (event.key == Key.RETURN)
		{
			useSpell (iPlayerTurn);
		}
		

	}
} 
 
function cycleNearEnemy()
{
	if (aryClosestBadGuys.length == 0)
		return;

	var objBadGuy = aryClosestBadGuys[iClosestBadGuyIndex];
	
	moveCursorToPos (objBadGuy);
	selectedBadGuy = objBadGuy;
	
	iClosestBadGuyIndex++;

	if (iClosestBadGuyIndex >= aryClosestBadGuys.length)
		iClosestBadGuyIndex = 0;
}


function onKeyDown (event)
{
	if (player.gameObject == null)
		return;

	var objObject = player.gameObject;
	var v3dAcceleration = objObject.getAcceleration ();

	if (event.key == Key.ESCAPE)
		quit ();

	if (inBattleMode == false)
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

function onMousePressed (event)
{
	if (event.buttons[0] == true)
	{
		var v3dNormalize = new Vector3 ();
		
		//var spell = Game.getMovableByName ("fire");
		//var spellClone = spell.clone();
		v3dNormalize.x = 10;
		v3dNormalize.y = 10;
		v3dNormalize.z = 0;
		
		
		v3dNormalize.normalise ();
		//logMessage (v3dNormalize.x + ", " + v3dNormalize.y + "," + v3dNormalize.z);
	}
}

function spawnBadGuy ()
{
	if (inBattleMode == true)
	{
		setTimeout ("killBadGuy (" + iNumBadGuys + ");", 50000);
		setTimeout ("spawnBadGuy ();", 5000);

		return;
	}
	
	var objBadGuy = Game.getMovableByName ("enemy_1");
	var objClone = objBadGuy.clone ("newBadGuy" + iNumBadGuys);
	var v3dPlayerPos = player.gameObject.getPosition ();
	aryBadGuys.push (objClone);
	
	
	var iX = Math.floor ((Math.random() * 100) - 100);
	var iY = Math.floor ((Math.random() * 100) - 100);

	while ((iX >= (v3dPlayerPos.x - 32)) && (iX <= (v3dPlayerPos.x + 32)))
		iX = Math.floor ((Math.random() * 100) - 100);

	while ((iY >= (v3dPlayerPos.y - 32)) && (iY <= (v3dPlayerPos.y + 32)))
		iY = Math.floor ((Math.random() * 100) - 100);

	objClone.setVisible (true);
	objClone.setBoundingBoxVisible (true);
	objClone.setPosition ((v3dPlayerPos.x + iX), (v3dPlayerPos.y + iY),-3);
	objClone.setVelocity ((random + iX), (random + iY),-3);
	objClone.team = 2;
	objClone.isDead = false;
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

function spawnLandGrass ()
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
				
				else if (random <= 5)
				{
					objClone.setMaterial ("tile");
					
				}
				
				
	
				
				objClone.setBoundingBoxVisible (false);
				objClone.setPosition (x, y, -3);
			
		}
	}
}

function spawnLandSpace_Back ()
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
				

				var objClone = objLand.clone ("newLand2-" + i + "-" + j);
				var random = Math.floor ((Math.random () * 11));
				objClone.type = 1;
				objClone.setVisible (true);
				objClone.setMaterial ("space_bk_a");
				
				if (random <= 2)
				{
					objClone.setMaterial ("space_bk_b");
					
				}
				
				else if (random <= 4)
				{
					objClone.setMaterial ("space_bk_c");
					
				}
				
				else if (random <= 6)
				{
					objClone.setMaterial ("space_bk_d");
					
				}
				
				else if (random <= 8)
				{
					objClone.setMaterial ("space_bk_e");
					
				}
				
				else if (random <= 10)
				{
					objClone.setMaterial ("space_bk_f");
					
				}
				
				objClone.setBoundingBoxVisible (false);
				objClone.setPosition (x, y, -4);
			
		}
	}
}
function spawnLandSpace_Front ()
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
				var random = Math.floor ((Math.random () * 11));
				objClone.type = 1;
				objClone.setVisible (true);
				objClone.setMaterial ("space_ft_a");
				
				if (random <= 2)
				{
					objClone.setMaterial ("space_ft_b");
				}
				
				else if (random <= 4)
				{
					objClone.setMaterial ("space_ft_c");
					
				}
				
				else if (random <= 6)
				{
					objClone.setMaterial ("space_ft_d");
					
				}
				else if (random <= 11)
				{
					objClone.setVisible (false);
					
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
	var iDistanceAway = 250;

	for(i = 0; i < aryBadGuys.length; i++)
	{
		var objBadGuy = aryBadGuys[i];
		var v3dPlayerPos = player.gameObject.getPosition ();
		var v3dBadGuyPos = objBadGuy.getPosition ();
		var iLength = v3dPlayerPos.distance (v3dBadGuyPos);

		
		if (aryClosestBadGuys.length == 0)
		{
			if (iLength < iDistanceAway)
				aryClosestBadGuys.push (objBadGuy);
		}
		else
		{
			var bAddToArray = false;

			for(j = 0; j < aryClosestBadGuys.length; j++)
			{
				var objClosestBadGuy = aryClosestBadGuys[j];

				if (objClosestBadGuy.getName () == objBadGuy.getName ())
				{
					if (iLength > iDistanceAway)
						aryClosestBadGuys.splice (j, 1);

					bAddToArray = false;

					break;
				}
				else
					bAddToArray = true;
			}

			if (bAddToArray == true)
			{
				if (iLength < iDistanceAway)
					aryClosestBadGuys.push (objBadGuy);
			}
		}
		
		/*if (selectedBadGuy == null)
			return;
		else*/
		
		
		objBadGuy.setPosition(0,(timer*100), 0);
		
		
		
	}
	moveCursorToPos (selectedBadGuy);
	timer += lastFrameTime;
}

function makePlayerAbleToBeHurt ()
{
	player.canBeHurt = true;
}

function hurtPlayer (iDamage)
{
	if (player.canBeHurt == true)
	{
		player.health--;
		//alert ("Player Hewrt");

		if (player.health <= 0)
		{
			var objShip = Game.getMovableByName ("ship");
			alert ("Player Ded");
			
		}

		//player.canBeHurt = false;
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




function updatePlayerHUD ()
{
	var obj = Game.getMovableByName ("txtHealth");
	obj.setCaption ("Health: " + player.health);
	var objName = Game.getMovableByName ("txtName");
	objName.setCaption ("Name: " + player.name);

	setTimeout ("updatePlayerHUD ();", 250);
}

function startGame ()
{
	var objPlayerNameWindow = App.getAppObjectByName ("winPlayerName");
	var objPlayerName = App.getAppObjectByName ("txtPlayerName");
	createPlayer (objPlayerName.getText ());
	objPlayerNameWindow.setVisible (false);

	spawnLandGrass ();
	//spawnLandSpace_Back();
	//spawnLandSpace_Front ();

	setTimeout ("spawnBadGuy ();", 5000);
	setTimeout ("updatePlayerHUD ();", 250);

}
