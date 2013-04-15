var timer = 0;
var newAnim = 0;
var selected_enemy = 0;
var iNumAttack = 0;
var iNumBadGuys = 0;																						//environmental collisions
var direction = 0;
var random = 0;
var iPlayerTurn = 0;
var iBattleBadGuys = 0;
var inBattleMode = false;
var numEnemies_random = 0;
var bgBadGuyTouchedName = "";
var nameSelectedEnemy = "";
var nameEnemyDead = "";
var iEnemyIndex = 0;
var InitHealth = 100;
var InitMana = 100;
var iMaxPlayerHealth = 100;
var player = new Character ();
var Spell = 1;
var aryEnemies = new Array ();
var aryBadGuys = new Array ();
var aryClosestBadGuys = new Array ();
var iClosestBadGuyIndex = 0;
var selectedBadGuy = null;
var modulusTime = 0;
var isCharging = false; 
var charge = 0;
var attackPower = 0;
var iNumBlue = 0;
var iNumFlame = 0;
var iNumGraves = 0;
var iNumDeath = 0;
var iNumJam = 0;

function charging ()
{
	isCharging = true;
	setTimeout ("charged ();", 500);
	//charge++;
	var soundSelect = Game.getMovableByName ("bubble");    //bubble noise AJE
	soundSelect.play();
	setTimeout ("stopMusic (\"" + soundSelect.getName () + "\");", 1000);
	
	
}

function charged () 
{
	if (isCharging == false)
		return;
	charge += player.chargeRate;
	//logMessage (charge);
	//logMessage (player.mana);
	if (player.mana < charge)
	{
		//	alert ("burnout");  // add function that penaltizes player for overcharging
	}
	
	//setTimeout ("charged ();", 500);	
	
}

function setupBattleMode ()
{
	var obj = player.gameObject;
	obj.setVisible (false);
	
	aryEnemies = new Array ();

	//var objCursor = Game.getMovableByName ("cursor");
	//objCursor.setVisible (true);	

	UI(true);
}

function battleMode ()
{
	
}

function selectEnemy ()
{
	var objEnemy = Game.getMovableByName ("liveEnemy" + enemyID);
	var soundSelect = Game.getMovableByName ("select");    //death4 noise AJE
	soundSelect.play();
	setTimeout ("stopMusic (\"" + soundSelect.getName () + "\");", 1000);
	
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
}

function spell1 ()
{
	Spell = 1;
	player.activeSpell = 1;
	logMessage ("Spell 1");
}

function spell2 ()
{
	Spell = 2;
	player.activeSpell = 2;
	logMessage ("Spell 2");
}

function spell3 ()
{
	Spell = 3;
	player.activeSpell = 3;
	logMessage ("Spell 3");
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

function attackEnemy (potential)
{
	var iCharge = potential;
	//logMessage (iCharge);
	//attackPower = player.intel + iCharge;
	if (Spell == 1)
	{
		fireAttack (iCharge);
	}
	else if (Spell == 2)
	{
		logMessage ("Kahmeha MEHAAAAAAAAA!!!!!!");
		energyAttack (iCharge);
	}
		//alert("fire attack");
	else if (Spell == 3)
	{
		jamSummon(iCharge);
		//iceAttack ();
		//fireRedAttack (iCharge);
	}

	//player.mana -= iCharge;
	
	
}

function iceAttack ()
{
	
}
function fireRedAttack (energy)
{
	var objObject = player.gameObject;
	var v3dPlayerPos = objObject.getPosition();
	logMessage (v3dPlayerPos.x);
	var beamBox = Game.getMovableByName ("fire");
    var cloneBox = beamBox.clone("newBlue" + iNumBlue);
	var ki = energy;
	var speed = 1 * energy;
	if (ki > 7)
		ki = 7;
	if (ki < 3)
		ki = 3;
		
	cloneBox.setCollides(true);
	cloneBox.setBoundingBoxVisible (true);
	cloneBox.setMaxVelocity ((100 + speed), (100 + speed),0);
	cloneBox.setVisible (true);
	cloneBox.setMaterial ("enemy_Jam");
	//cloneBox.setMaterial ("bluefire_van");
	cloneBox.team = 3;
	cloneBox.isDead = false;
	cloneBox.setScale (2,2,2);
	var time = 250 * ki;
	//setTimeout ("killFlame ('newBlue" + iNumBlue + "');", 2000);
	//setTimeout ("killFlame (" + iNumBlue + ");", time);
	//setTimeout ("spawnTrailRed (" + iNumBlue + ");", 100);
	//setTimeout ("scaleFlame (" + iNumBlue + ");", 200);
	//setTimeout ("spawnFlame ('newBlue" + iNumBlue + "');", 100);
	//setTimeout ("scaleFlame ('newBlue" + iNumBlue + "');", 100);
	iNumBlue++;
	
	if (player.direction == 1)
	{
		cloneBox.setPosition(v3dPlayerPos.x, (v3dPlayerPos.y + 20), 0);	
		cloneBox.setAcceleration(0,(50 + speed) ,0);
	}
	else if (player.direction  == 2)
	{
		cloneBox.setPosition ((v3dPlayerPos.x + 20), v3dPlayerPos.y, 0);
		cloneBox.setAcceleration((50 + speed),0,0);
	}
	else if (player.direction  == 3)
	{
		cloneBox.setPosition (v3dPlayerPos.x, (v3dPlayerPos.y - 20),0);
		cloneBox.setAcceleration(0,(-1*(50 + speed)),0);
	}
	else if (player.direction  == 4)
	{
		cloneBox.setPosition ((v3dPlayerPos.x - 20), v3dPlayerPos.y, 0);
		cloneBox.setAcceleration((-1*(50 + speed)),0,0);
	}
}
function jamSummon (energy)
{
	var objObject = player.gameObject;
	var v3dPlayerPos = objObject.getPosition();
	logMessage (v3dPlayerPos.x);
	var beamBox = Game.getMovableByName ("fire");
    var cloneBox = beamBox.clone("newJam" + iNumJam);
	cloneBox.health = energy;
	var speed = 1;
		
	cloneBox.setCollides(true);
	cloneBox.setBoundingBoxVisible (true);
	cloneBox.setMaxVelocity ((100 + speed), (100 + speed),0);
	cloneBox.setVisible (true);
	cloneBox.setMaterial ("enemy_Jam");
	//cloneBox.setMaterial ("bluefire_van");
	cloneBox.team = 1;
	cloneBox.isDead = false;
	//cloneBox.setScale (2,2,2);
	//var time = 250 * ki;
	//setTimeout ("killFlame ('newBlue" + iNumBlue + "');", 2000);
	//setTimeout ("killFlame (" + iNumBlue + ");", time);
	//setTimeout ("spawnTrailRed (" + iNumBlue + ");", 100);
	//setTimeout ("scaleFlame (" + iNumBlue + ");", 200);
	//setTimeout ("spawnFlame ('newBlue" + iNumBlue + "');", 100);
	//setTimeout ("scaleFlame ('newBlue" + iNumBlue + "');", 100);
	
	
	if (player.direction == 1)
	{
		cloneBox.setPosition(v3dPlayerPos.x, (v3dPlayerPos.y + 20), 0);	
		//cloneBox.setAcceleration(0,(50 + speed) ,0);
	}
	else if (player.direction  == 2)
	{
		cloneBox.setPosition ((v3dPlayerPos.x + 20), v3dPlayerPos.y, 0);
		//cloneBox.setAcceleration((50 + speed),0,0);
	}
	else if (player.direction  == 3)
	{
		cloneBox.setPosition (v3dPlayerPos.x, (v3dPlayerPos.y - 20),0);
		//cloneBox.setAcceleration(0,(-1*(50 + speed)),0);
	}
	else if (player.direction  == 4)
	{
		cloneBox.setPosition ((v3dPlayerPos.x - 20), v3dPlayerPos.y, 0);
		//cloneBox.setAcceleration((-1*(50 + speed)),0,0);
	}
	jamAI(iNumJam);
	iNumJam++;
}

function jamAI (ID)
{
	var objJam = Game.getMovableByName ("newJam" + ID);
	var v3dPlayerPos = player.gameObject.getPosition ();
	var v3dObjJamPos = objJam.getPosition();
	var x = 0;
	var y = 0;
	
	if ( v3dPlayerPos.y > v3dObjJamPos.y)
		y = 20;
	else
		y = -20;
		
	if ( v3dPlayerPos.x > v3dObjJamPos.x)
		x = 20;
	else
		x = -20;
	//logMessage (v3dPlayerPos.y);
	
	objJam.setMaxVelocity(20,20,0);
	objJam.setAcceleration(x,y,0);
	setTimeout ("jamAI(" + ID + ");", 1000);
}
function fireAttack (energy)
{
	var objObject = player.gameObject;
	var v3dPlayerPos = objObject.getPosition();
	logMessage (v3dPlayerPos.x);
	var beamBox = Game.getMovableByName ("bluefire");
    var cloneBox = beamBox.clone("newBlue" + iNumBlue);
	var ki = energy;
	var speed = 5 * energy;
	if (ki > 10)
		ki = 10;
	if (ki < 4)
		ki = 4;
		
	cloneBox.setCollides(true);
	cloneBox.setBoundingBoxVisible (true);
	cloneBox.setMaxVelocity ((100 + speed), (100 + speed),0);
	cloneBox.setVisible (true);
	//cloneBox.setMaterial ("bluefire_van");
	cloneBox.team = 3;
	cloneBox.isDead = false;
	logMessage (ki);
	var time = 100 * ki;
	//setTimeout ("killFlame ('newBlue" + iNumBlue + "');", 2000);
	setTimeout ("killFlame (" + iNumBlue + ");", time);
	setTimeout ("spawnTrail (" + iNumBlue + ");", 100);
	//setTimeout ("scaleFlame (" + iNumBlue + ");", 200);
	//setTimeout ("spawnFlame ('newBlue" + iNumBlue + "');", 100);
	//setTimeout ("scaleFlame ('newBlue" + iNumBlue + "');", 100);
	iNumBlue++;
	
	if (player.direction == 1)
	{
		cloneBox.setPosition(v3dPlayerPos.x, (v3dPlayerPos.y + 20), 0);	
		cloneBox.setAcceleration(0,(50 + speed) ,0);
	}
	else if (player.direction  == 2)
	{
		cloneBox.setPosition ((v3dPlayerPos.x + 20), v3dPlayerPos.y, 0);
		cloneBox.setAcceleration((50 + speed),0,0);
	}
	else if (player.direction  == 3)
	{
		cloneBox.setPosition (v3dPlayerPos.x, (v3dPlayerPos.y - 20),0);
		cloneBox.setAcceleration(0,(-1*(50 + speed)),0);
	}
	else if (player.direction  == 4)
	{
		cloneBox.setPosition ((v3dPlayerPos.x - 20), v3dPlayerPos.y, 0);
		cloneBox.setAcceleration((-1*(50 + speed)),0,0);
	}
}

function spawnTrail (ID)
{
	//spawns trail
	var obj = Game.getMovableByName ("newBlue" + ID);
	if (obj.isDead == true)
	{
		return;
	}
	var v3dPos = obj.getPosition();
	var v3dScale = obj.getScale();
	var flame = Game.getMovableByName ("bluefire");
	var flameClone = flame.clone("newFlame" + iNumFlame);
	flameClone.setPosition(v3dPos.x,v3dPos.y,0);
	flameClone.setScale((v3dScale.x - 0.1), (v3dScale.y - 0.1), v3dScale.z);
	flameClone.setVisible(true);
	setTimeout ("spawnTrail (" + ID + ");", 100);  //make kill timeout dependent on a stat or effect. Potency or something
	setTimeout ("killFlame2 (" + iNumFlame + ");", 1000);
	iNumFlame++;	
	
}

function spawnTrail2 (ID)
{
	//spawns trail
	var obj = Game.getMovableByName ("newBlue" + ID);
	if (obj.isDead == true)
	{
		return;
	}
	var v3dPos = obj.getPosition();
	var v3dScale = obj.getScale();
	var flame = Game.getMovableByName ("bluefire");
	var flameClone = flame.clone("newFlame" + iNumFlame);
	flameClone.setPosition(v3dPos.x,v3dPos.y,0);
	flameClone.setScale((v3dScale.x - 0.1), (v3dScale.y - 0.1), v3dScale.z);
	flameClone.setVisible(true);
	setTimeout ("spawnTrail (" + ID + ");", 100);
	setTimeout ("scaleFlame (" + ID + ");", 100);	
	setTimeout ("killFlame2 (" + iNumFlame + ");", 1000);
	iNumFlame++;	
	
}

function scaleFlame (ID)
{
	logMessage ("Scale");
	var obj = Game.getMovableByName ("newBlue" + ID);
	logMessage (obj.getName());
	if (obj.isDead == true)
	{
		return;
	}
	obj.setScale(0.6,0.6, 1);
	setTimeout ("scaleFlame (" + ID + ");", 100);
}

function killFlame2 (ID)
{
	//logMessage ("Kill");
	//Game.deleteObject ("newFire" + fireID);
	var obj = Game.getMovableByName ("newFlame" + ID);
	obj.setVisible (false);
	obj.setBoundingBoxVisible(false);
	obj.setCollides (false);
	obj.isDead = true;
}

function killFlame (ID)
{
	//Game.deleteObject ("newFire" + fireID);
	var obj = Game.getMovableByName ("newBlue" + ID);
	obj.setVisible (false);
	obj.setBoundingBoxVisible(false);
	obj.setCollides (false);
	obj.isDead = true;
}

function combust ()
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



function energyAttack (energy)
{
	var objObject = player.gameObject;
	var v3dPlayerPos = objObject.getPosition();
	logMessage (v3dPlayerPos.x);
	var beamBox = Game.getMovableByName ("kiBounding");
	// cloneBox = beamBox.clone("newBeam" + iNumBeam);
	var ki = energy * 0.3;
	if (ki > 5)
		ki = 5;
	if (ki < 1)
		ki = 1;
	logMessage (ki);
	//cloneBox.setCollides(true);
	//cloneBox.setBoundingBoxVisible (true);
	//cloneBox.setMaxVelocity (30,30,0);
	//cloneBox.setVisible (true);
	
	beamBox.setCollides(true);
	beamBox.setBoundingBoxVisible (true);
	beamBox.setMaxVelocity (30,30,0);
	beamBox.setVisible (true);
	if (player.direction == 1)
	{
		beamBox.setPosition(v3dPlayerPos.x, (v3dPlayerPos.y + 20), 0);
		beamBox.setScale (1, (ki), 0);
		beamBox.setRotation (0,0,90);
	}
	else if (player.direction  == 2)
	{
		//beamBox.setPosition(50, 0, 0);
		beamBox.setPosition ((v3dPlayerPos.x + 30+ki), v3dPlayerPos.y, 0);
		beamBox.setScale ((ki), 1, 0);
		beamBox.setRotation (0,0,0);
	}
	else if (player.direction  == 3)
	{
		//beamBox.setPosition(0, -50, 0);
		beamBox.setPosition (v3dPlayerPos.x, (v3dPlayerPos.y - 40),0)
		beamBox.setScale (1, (ki), 0);
		beamBox.setRotation (0,0,270);
	}
	else if (player.direction  == 4)
	{
		beamBox.setScale ((ki), 1, 0);
		beamBox.setPosition ((v3dPlayerPos.x - 50), v3dPlayerPos.y, 0);
		beamBox.setRotation (0,0,180);
	}
	//setTimeout ("Game.deleteObject ('newBeam" + iNumBeam + "');", 2000);
	setTimeout ("energyAttackEnd();", 300);
	//iNumBeam++;
	//attackPower 
}

function energyAttackEnd()
{
	var objBeamBox = Game.getMovableByName ("kiBounding");
	objBeamBox.setCollides (false);
	objBeamBox.setVisible (false);
	objBeamBox.setBoundingBoxVisible (false);
	return;
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
		showMenu (true);
		showItems (false);
	}
		
}
function showText (visible)
{
	var objSpells_list = Game.getMovableByName ("spells_list");
	var soundSelect = Game.getMovableByName ("select");
	soundSelect.play();
	setTimeout ("stopMusic (\"" + soundSelect.getName () + "\");", 7000);
	objSpells_list.setVisible(visible);
	
	setTimeout ("stopMusic (\"" + soundSelect.getName () + "\");", 7000);
	if (visible == true)
	{
		showMenu (true);
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
		showMenu (true);
		showSpells (false);
	}
}

function isEnemyDead (objEnemy)
{
	if (objEnemy == null)
	{
		return;
	}

	if (objEnemy.getVisible () == false)
	{
		return;
	}

	if (objEnemy.health <= 0)
	{
		objEnemy.setVisible (false);
		objEnemy.setCollides (false);
		objEnemy.isDead = true;
		var v3dPos = objEnemy.getPosition ();
		var objDeath = Game.getMovableByName ("death");
		var death_Anim = objDeath.clone ("deathAnim" + iNumDeath);
		death_Anim.setPosition (v3dPos.x, v3dPos.y, v3dPos.z);
		death_Anim.setVisible (true);
		death_Anim.setMaterial ("enemy_Ghost_Death");
		setTimeout ("killDeath (" + iNumDeath + ");", 1300);
		iNumDeath++;
		
		//aryBadGuys.splice (objEnemy);
		//Game.deleteObject (id);
	}

}
function killDeath (ID)
{
	var objAnim = Game.getMovableByName ("deathAnim" + ID);
	objAnim.setVisible (false);
   
	var soundSelect = Game.getMovableByName ("death4");    //death4 noise AJE
	soundSelect.play();
	setTimeout ("stopMusic (\"" + soundSelect.getName () + "\");", 1000);
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

	var soundSelect = Game.getMovableByName ("explode10");
	soundSelect.play();
	setTimeout ("stopMusic (\"" + soundSelect.getName () + "\");", 7000);
}

function fireHit (object1, object2)
{
	if ((object1.team == 2) && (object2.team == 3))
	{	
		var nameSelectedEnemy = object1.getName ();
		var objEnemy = Game.getMovableByName (nameSelectedEnemy);
		var v3dPos = objEnemy.getPosition();
		var objAttack = Game.getMovableByName ("bluefire");
		var objClone = objAttack.clone ("newAnim" + iNumAttack);
		objClone.setPosition(v3dPos.x, v3dPos.y, 2);
		objClone.setVisible(true);
		objClone.setCollides(true);
		objEnemy.health -= 50;
		setTimeout ("killAnim (" + iNumAttack + ");", 200);
		isEnemyDead (objEnemy);
		iNumAttack++;

		var soundSelect = Game.getMovableByName ("explode1");    //death4 noise AJE
	soundSelect.play();
	setTimeout ("stopMusic (\"" + soundSelect.getName () + "\");", 1000);
		
	}
}

function fireRedHit (object1, object2)
{
	if ((object1.team == 2) && (object2.team == 3))
	{	
		nameSelectedEnemy = object1.getName ();
		var objEnemy = Game.getMovableByName (nameSelectedEnemy);
		var v3dPos = objEnemy.getPosition();
		var objAttack = Game.getMovableByName ("fire");
		var objClone = objAttack.clone ("newAnim" + iNumAttack);
		objClone.setPosition(v3dPos.x, v3dPos.y, 2);
		objClone.setVisible(true);
		objClone.setCollides(true);
		objEnemy.health -= 50;
		setTimeout ("killAnim (" + iNumAttack + ");", 200);
		isEnemyDead (objEnemy);
		iNumAttack++;

		var soundSelect = Game.getMovableByName ("explode2");    //explide noise AJE
	soundSelect.play();
	setTimeout ("stopMusic (\"" + soundSelect.getName () + "\");", 1000);
		
	}
}
function plasmaHit (object1, object2)
{
	if ((object1.team == 2) && (object2.team == 3))
	{
		var objObject = Game.getMovableByName ("player");
		var objHit = Game.getMovableByName ("hit");
		var objLoc = Game.getMovableByName ("kiBounding");
		var objClone = objHit.clone ("newAnim" + iNumAttack);
		var v3dPosition = objLoc.getPosition();
	    bgBadGuyTouchedName = object1.getName ();
		object1.health -= 1;
		var obj = Game.getMovableByName ("player");
		var v3dPosition = object1.getPosition();
		objClone.setPosition(v3dPosition.x, v3dPosition.y, v3dPosition.z);
		objClone.setVisible(true);
		setTimeout ("killAnim (" + iNumAttack + ");", 300);
		iNumAttack++;
		isEnemyDead ((bgBadGuyTouchedName));		

		var soundSelect = Game.getMovableByName ("explode3");    //death4 noise AJE
	soundSelect.play();
	setTimeout ("stopMusic (\"" + soundSelect.getName () + "\");", 1000);
	}
}

function elecHit (object1, object2)
{
	if ((object1.team == 2) && (object2.team == 3))
	{	
		nameSelectedEnemy = object1.getName ();
		var objEnemy = Game.getMovableByName (nameSelectedEnemy);
		var v3dPos = objEnemy.getPosition();
		var objAttack = Game.getMovableByName ("bluefire");
		var objClone = objAttack.clone ("newAnim" + iNumAttack);
		objClone.setPosition(v3dPos.x, v3dPos.y, 2);
		objClone.setVisible(true);
		objClone.setCollides(true);
		objEnemy.health -= 50;
		setTimeout ("killAnim (" + iNumAttack + ");", 200);
		isEnemyDead (objEnemy);
		iNumAttack++;

		var soundSelect = Game.getMovableByName ("laser3");    //death4 noise AJE
	soundSelect.play();
	setTimeout ("stopMusic (\"" + soundSelect.getName () + "\");", 1000);
		
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

	var soundSelect = Game.getMovableByName ("misc1");    //death4 noise AJE
	soundSelect.play();
	setTimeout ("stopMusic (\"" + soundSelect.getName () + "\");", 1000);
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

	var soundSelect = Game.getMovableByName ("misc2");    //death4 noise AJE
	soundSelect.play();
	setTimeout ("stopMusic (\"" + soundSelect.getName () + "\");", 1000);
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
	//moveCursor ();
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

		return;
	}
	
	if (player.health < iMaxPlayerHealth)
	{
		player.health += 30;
		removeItem ("Potion");
	}

	var soundSelect = Game.getMovableByName ("spritz");    //death4 noise AJE
	soundSelect.play();
	setTimeout ("stopMusic (\"" + soundSelect.getName () + "\");", 1000);
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
	objBackdrop.setVisible(false);
	
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
	otherPlayer.mana = InitMana;
	otherPlayer.name = playerName;
	otherPlayer.gameObject.team = 1;
	otherPlayer.canBeHurt = true;
	otherplayer.focus = 10;
	otherplayer.will = 10;
	otherplayer.vigor = 10;
	otherplayer.intel = 10; 
	
	
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
	player.mana = InitMana;
	player.name = playerName;
	player.gameObject.team = 1;
	player.canBeHurt = true;
	player.focus = 10;
	player.will = 10;
	player.vigor = 10;
	player.intel = 10; 

	player.inventory.push ("Potion");
	player.inventory.push ("Potion");
}

function itemGain (stringItem)
{
	player.inventory.push (stringItem)
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
			//objObject.setMaterial("player_north");
			objObject.setMaterial("randalf_north");
			player.direction = 1;
		}

		if (event.key == Key.DOWN)
		{
			objObject.setAcceleration (v3dAcceleration.x, 0, v3dAcceleration.z);
			//objObject.setMaterial("player_south");
			objObject.setMaterial("randalf_south");
			player.direction  = 3;
		}

		if (event.key == Key.LEFT)
		{
			objObject.setAcceleration (0, v3dAcceleration.y, v3dAcceleration.z);
			//objObject.setMaterial("player_west");
			objObject.setMaterial("randalf_west");
			player.direction = 4;
		}
			

		if (event.key == Key.RIGHT)
		{
			objObject.setAcceleration (0, v3dAcceleration.y, v3dAcceleration.z);
			//objObject.setMaterial("player_east");
			objObject.setMaterial("randalf_east");
			player.direction = 2;
		}
		
		if (event.key == Key.A)
		{
			if (direction  == 1)
			{
				objObject.setMaterial("randalf_north");
			}
			else if (player.direction  == 2)
			{
				objObject.setMaterial("randalf_east");
			}
			else if (player.direction  == 3)
			{
				objObject.setMaterial("randalf_south_a");
			}
			else if (player.direction  == 4)
			{
				objObject.setMaterial("randalf_west");
			}
		}

		

		if (event.key == Key.B)   //aje bag functionality
		{
		//	var objinterface_bag = Game.getMovableByName("playerInventory")
		//	objObject.setMaterial("playerInventory"); //player inventory png
			bags ();      //open bag & visible
			logMessage ("bags opened");  //bag log
		}

		//var objInterface_main = Game.getMovableByName ("interface_main");

		//objInterface_main.setVisible(isVisible);
	//	showMenu (isVisible);
		


		if (event.key == Key.SPACE)
		{
			//objObject.setMaterial("player_south_a");
			if (direction  == 1)
			{
				objObject.setMaterial("randalf_north");
			}
			else if (player.direction  == 2)
			{
				objObject.setMaterial("randalf_east");
			}
			else if (player.direction  == 3)
			{
				objObject.setMaterial("player_south_aEnd");
			}
			else if (player.direction  == 4)
			{
				objObject.setMaterial("randalf_west");
			}
			isCharging = false;
			player.isAttacking = true;
			player.isCasting = false;
			attackEnemy (charge);
			charge = 0;
			//fireAttack();
		}
		if (event.key == Key.RETURN)
		{
			objObject.setMaterial("player_south_a");
			useSpell ();
		}
		
		if (event.key == Key.TAB)
		{
			cycleNearEnemy();
		}
	}
}

function bags(){

		var objinterface_bag = Game.getMovableByName("playerInventory");
		//objObject.setMaterial("playerInventory"); //player inventory png
		objinterface_bag.setvisible (true);

		if (objinterface_bag.setvisible(true)
		{
			objInterface_bag.setVisible(false);
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
			objObject.setAcceleration (v3dAcceleration.x, (v3dAcceleration.y + 10), v3dAcceleration.z);
			//objObject.setMaterial("player_north_anim");
			objObject.setMaterial("randalf_north_anim");
			
		}

		if (event.key == Key.DOWN)
		{
			objObject.setAcceleration (v3dAcceleration.x, (v3dAcceleration.y -10), v3dAcceleration.z);
			//objObject.setMaterial("player_south_anim");
			objObject.setMaterial("randalf_south_anim");
		}

		if (event.key == Key.LEFT)
		{
			objObject.setAcceleration ((v3dAcceleration.x - 10), v3dAcceleration.y, v3dAcceleration.z);
			//objObject.setMaterial("player_west_anim");
			objObject.setMaterial("randalf_west_anim");
		}

		if (event.key == Key.RIGHT)
		{
			objObject.setAcceleration ((v3dAcceleration.x + 10), v3dAcceleration.y, v3dAcceleration.z);
			//objObject.setMaterial("player_east_anim");
			objObject.setMaterial("randalf_east_anim");
		}
		
		if (event.key == Key.SPACE)
		{
			//chargeTimer(); 
			objObject.setMaterial("player_south_a");
			charging();
			player.isCasting = true;
		}
		
		if (event.key == Key.Q)
		{
			Spell = 1;
			logMessage ("spell one");
		}
		if (event.key == Key.W)
		{
			Spell = 2;
			logMessage ("spell two");
		}
		if (event.key == Key.E)
		{
			Spell = 3;
			logMessage ("spell three");
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
				objObject.setMaterial("player_south_a");
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

function spawnBadGuy (id)
{
	if (inBattleMode == true)
	{
		setTimeout ("killBadGuy (" + iNumBadGuys + ");", 50000);
		setTimeout ("spawnBadGuy ();", 5000);

		return;
	}
	
	var objBadGuy = Game.getMovableByName ("enemy_Ghost");
	var objGrave = Game.getMovableByName ("newGrave" + id);
	var objClone = objBadGuy.clone ("newBadGuy" + iNumBadGuys);
	var v3dPlayerPos = objGrave.getPosition();
	var v3dPlayerPos = player.gameObject.getPosition (); 
	
	//aryBadGuys.push (objClone);
	
	
	var iX = Math.floor ((Math.random() * 100) - 100);
	var iY = Math.floor ((Math.random() * 100) - 100);

	while ((iX >= (v3dPlayerPos.x - 32)) && (iX <= (v3dPlayerPos.x + 32)))
		iX = Math.floor ((Math.random() * 100) - 100);

	while ((iY >= (v3dPlayerPos.y - 32)) && (iY <= (v3dPlayerPos.y + 32)))
		iY = Math.floor ((Math.random() * 100) - 100);

	objClone.setVisible (true);
	objClone.setBoundingBoxVisible (false);
	objClone.setPosition ((v3dPlayerPos.x + iX), (v3dPlayerPos.y + iY),0);
	objClone.setMaxVelocity (0, 0,0);
	objClone.setAcceleration (0, 0,0);
	objClone.team = 2;
	objClone.health = 100;
	objClone.isDead = false;
	badGuyMove(iNumBadGuys);
	setTimeout ("killBadGuy (" + iNumBadGuys + ");", 50000);
	//setTimeout ("spawnBadGuy (" + iNumBadGuys + ");", 5000)
	//setTimeout ("badGuyShoots (" + iNumBadGuys + ");", 2000);
	//setTimeout ("spawnBadGuy ();", 5000);

	iNumBadGuys++;
}

function spawnGhost (id)
{
	if (inBattleMode == true)
	{
		setTimeout ("killBadGuy (" + iNumBadGuys + ");", 50000);
		setTimeout ("spawnBadGuy ();", 5000);

		return;
	}
	
	var objBadGuy = Game.getMovableByName ("enemy_Ghost");
	var objGrave = Game.getMovableByName ("newBadGuy" + id);
	//var objGrave = Game.getMovableByName ("enemy_Horror");
	var objClone = objBadGuy.clone ("newBadGuy" + iNumBadGuys);
	var v3dPlayerPos = objGrave.getPosition();
	//var v3dPlayerPos = player.gameObject.getPosition (); 
	
	//aryBadGuys.push (objClone);
	
	
	var iX = Math.floor ((Math.random() * 100) - 100);
	var iY = Math.floor ((Math.random() * 100) - 100);

	while ((iX >= (v3dPlayerPos.x - 32)) && (iX <= (v3dPlayerPos.x + 32)))
		iX = Math.floor ((Math.random() * 100) - 100);

	while ((iY >= (v3dPlayerPos.y - 32)) && (iY <= (v3dPlayerPos.y + 32)))
		iY = Math.floor ((Math.random() * 100) - 100);

	objClone.setVisible (true);
	objClone.setBoundingBoxVisible (false);
	objClone.setPosition ((v3dPlayerPos.x + iX), (v3dPlayerPos.y + iY),0);
	objClone.setMaxVelocity (0, 0,0);
	objClone.setAcceleration (0, 0,0);
	objClone.team = 2;
	objClone.health = 100;
	objClone.damage = 1;
	objClone.isDead = false;
	badGuyMove(iNumBadGuys);
	setTimeout ("killBadGuy (" + iNumBadGuys + ");", 50000);
	//setTimeout ("spawnBadGuy (" + iNumBadGuys + ");", 5000)
	//setTimeout ("badGuyShoots (" + iNumBadGuys + ");", 2000);
	//setTimeout ("spawnBadGuy ();", 5000);

	iNumBadGuys++;
}

function spawnHorror ()
{
	
	var objBadGuy = Game.getMovableByName ("enemy_Horror");
	//var objGrave = Game.getMovableByName ("newGrave" + id);
	var objClone = objBadGuy.clone ("newBadGuy" + iNumBadGuys);
	//var v3dPlayerPos = objGrave.getPosition();
	var v3dPlayerPos = player.gameObject.getPosition (); 
	
	//aryBadGuys.push (objClone);
	
	
	var iX = Math.floor ((Math.random() * 100) - 100);
	var iY = Math.floor ((Math.random() * 100) - 100);

	while ((iX >= (v3dPlayerPos.x - 32)) && (iX <= (v3dPlayerPos.x + 32)))
		iX = Math.floor ((Math.random() * 100) - 100);

	while ((iY >= (v3dPlayerPos.y - 32)) && (iY <= (v3dPlayerPos.y + 32)))
		iY = Math.floor ((Math.random() * 100) - 100);

	objClone.setVisible (true);
	objClone.setBoundingBoxVisible (false);
	objClone.setPosition ((v3dPlayerPos.x + iX), (v3dPlayerPos.y + iY),0);
	objClone.setMaxVelocity (0, 0,0);
	objClone.setAcceleration (0, 0,0);
	objClone.team = 2;
	objClone.health = 1000;
	objClone.damage = 3;
	objClone.setScale (1.3,1.3,0);
	objClone.isDead = false;
	badGuyMove(iNumBadGuys);
	setTimeout ("killBadGuy (" + iNumBadGuys + ");", 50000);
	//setTimeout ("badGuyShoots (" + iNumBadGuys + ");", 2000);
	//setTimeout ("spawnerHorror ();", 2000);
	setTimeout ("spawnerHorror (" + iNumBadGuys + ");", 3000);

	iNumBadGuys++;
}

function spawnerHorror(ID)
{
	var obj = Game.getMovableByName ("newBadGuy" + ID);
	if (obj.isDead == true)
	{
		logMessage ("dead");
		return;
	}
	spawnGhost (ID);
	setTimeout ("spawnerHorror (" + ID + ");", 3000);
}


function badGuyMove(id)
{
	var v3dPlayerPos = player.gameObject.getPosition ();
	var objBadGuy = Game.getMovableByName ("newBadGuy" + id);
	var v3dBadGuyPos = objBadGuy.getPosition();
	var x = 0;
	var y = 0;
	
	if ( v3dPlayerPos.y > v3dBadGuyPos.y)
		y = 10;
	else
		y = -10;
		
	if ( v3dPlayerPos.x > v3dBadGuyPos.x)
		x = 10;
	else
		x = -10;
	//logMessage (v3dPlayerPos.y);
	
	objBadGuy.setMaxVelocity(10,10,0);
	objBadGuy.setAcceleration(x,y,0);
	setTimeout ("badGuyMove(" + id + ");", 2000);
}
function easeIn( t, v1, v2 ) 
{
  return v1 + (t * t * t) * (v2 - v1);
}

function spawnBadGuy2 ()
{
	var objBadGuy = Game.getMovableByName ("enemy_Ghost");
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

function spawnLandStone ()
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
				objClone.setVisible (true);
				objClone.setMaterial ("tile");
				
				if (random <= 2)
					objClone.setMaterial ("tile2");
					
				objClone.setBoundingBoxVisible (false);
				objClone.setPosition (x, y, -3);
			
		}
	}
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
function spawnLandFunGrove ()
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
				objClone.setMaterial ("grass_Grove_1");
				if (random <= 2)
				{
					objClone.setMaterial ("grass_Grove_2");
					
				}
				
				else if (random <= 4)
				{
					objClone.setMaterial ("grass_Grove_3");
					
				}
				
				else if (random <= 6)
				{
					objClone.setMaterial ("grass_Grove_4a");
					
				}
				
				else if (random <= 8)
				{
					objClone.setMaterial ("grass_Grove_5");
					
				}
				
				else if (random <= 10)
				{
					objClone.setMaterial ("grass_Grove_6b");
				}
				
				objClone.setBoundingBoxVisible (false);
				objClone.setPosition (x, y, -6);
				
		}
	}
}

function spawnLandGrove ()
{
	var objTree = Game.getMovableByName ("tree");
	var objBlock = Game.getMovableByName ("block");
	var startingX = 0;
	var startingZ = 0;
	
	for (var i=0; i<5; i++)
	{
		
		for (var j=0; j<5; j++)
		{    		
		
				var x = (i * 32) + startingX;
				var y = (j * 32) + startingZ;
				

				var objCloneTree = objTree.clone ("newTree-" + i + "-" + j);
				var objCloneBlock = objBlock.clone ("newBlock-" + i + "-" + j);
				
				var random = Math.floor ((Math.random () * 10));
				objCloneBlock.team = 4;
				objCloneTree.setMaterial ("heart_tree");
				
			
					
					objCloneTree.setVisible (true);
					objCloneBlock.setVisible (false);
					objCloneBlock.setCollides (true);
					objCloneBlock.setBoundingBoxVisible (true);
				
				
				//objTree.setScale ( 2.1, 2.5, 1);
				objCloneTree.setPosition (x, y, 0);
				objCloneBlock.setPosition (x, y, 0);
				//objCloneTree.setPosition ((x + (random * 15)), (y + (random * 10)), -2);
				
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

	var soundSelect = Game.getMovableByName ("death");    //death4 noise AJE
	soundSelect.play();
	setTimeout ("stopMusic (\"" + soundSelect.getName () + "\");", 1000);
}


function frameStarted (lastFrameTime)
{
	var iDistanceAway = 250;
	var objPlayer = Game.getMovableByName ("player");
	//var objCloud = Game.getMovableByName ("cloudLayer");
	var v3dPos = objPlayer.getPosition ();

	//objCloud.setPosition (0, (v3dPos.y - 100), (v3dPos.z - 100));

	/*for(i = 0; i < aryBadGuys.length; i++)
	{
		var objBadGuy = aryBadGuys[i];
		var v3dPlayerPos = player.gameObject.getPosition ();
		var v3dBadGuyPos = objBadGuy.getPosition ();
		var iLength = v3dPlayerPos.distance (v3dBadGuyPos);

		//objBadGuy.setPosition(v3dBadGuyPos,(timer+v3dBadGuyPos), v3dBadGuyPos);
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
					break;
						
					//if (objBadGuy.isDead == true)	
					//	aryClosestBadGuys.splice (j, 1);
					//break;
				}
				else
					bAddToArray = true;
			}
			
			//if (objBadGuy.isDead == true)
			//	aryBadGuys.splice(i,i);
			if (bAddToArray == true)
			{
				if (iLength < iDistanceAway)
					aryClosestBadGuys.push (objBadGuy);
			}
			
		}
		
		
		 //(selectedBadGuy == null)
			//return;
		
		
		
	}*/
	//moveCursorToPos (selectedBadGuy);
	//modulusTime = 1000 % timer;
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
		player.health -= iDamage;
		logMessage ("Player Hewrt");

		if (player.health <= 0)
		{
			logMessage ("You Have Died!");		
		}

		//player.canBeHurt = false;
		//setTimeout ("makePlayerAbleToBeHurt ();", 2000);
	}
}
function gameOver ()
{

var soundSelect = Game.getMovableByName ("death3");    //death4 noise AJE
	soundSelect.play();
	setTimeout ("stopMusic (\"" + soundSelect.getName () + "\");", 1000);

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
	obj.setCaption (InitHealth + " / " + player.health);
	var obj = Game.getMovableByName ("txtMana");
	obj.setCaption (player.mana + " / " + player.mana);
	var objName = Game.getMovableByName ("txtName");
	objName.setCaption ("Name: " + player.name);

	setTimeout ("updatePlayerHUD ();", 250);
}
function spawnNPC()
{
	var objParky = Game.getMovableByName ("Parky");
	
	aryBadGuys.push (objClone);
	
	
	var iX = Math.floor ((Math.random() * 100) - 100);
	var iY = Math.floor ((Math.random() * 100) - 100);

	while ((iX >= (v3dPlayerPos.x - 32)) && (iX <= (v3dPlayerPos.x + 32)))
		iX = Math.floor ((Math.random() * 100) - 100);

	while ((iY >= (v3dPlayerPos.y - 32)) && (iY <= (v3dPlayerPos.y + 32)))
		iY = Math.floor ((Math.random() * 100) - 100);

	objClone.setVisible (true);
	objClone.setBoundingBoxVisible (false);
	objClone.setPosition ((v3dPlayerPos.x + iX), (v3dPlayerPos.y + iY),-3);
	objClone.setVelocity ((random + iX), (random + iY),-3);
	objClone.team = 4;
	objClone.health = 100;

	iNumBadGuys++;
}

function spawnParky()
{
	var objParky = Game.getMovableByName ("Parky");
	var objBlock = Game.getMovableByName ("block");
	var objPlayer = Game.getMovableByName ("player");	
	var v3dPlayerPos = objPlayer.getPosition();
	objParky.setVisible (true);
	objParky.setBoundingBoxVisible (false);
	objParky.setCollides(true);
	objParky.setPosition ((v3dPlayerPos.x + 100), (v3dPlayerPos.y + 100),v3dPlayerPos.z);
	objParky.setMaxVelocity (500, 1000,0);
	
	objBlock.setVisible (true);
	objBlock.setBoundingBoxVisible (false);
	objBlock.setCollides(true);
	objBlock.setPosition ((v3dPlayerPos.x + 200), (v3dPlayerPos.y + 200),v3dPlayerPos.z);
	objBlock.team = 4;
	
	objParky.setVelocity (500, 1000,0);
	
	objParky.team = 4;
	logMessage (objParky.team);
	
}

function interactionParky (object1, object2)
{
	if ((object1.team == 1) && (object2.team == 4))
	{	
		var objSpells_list = Game.getMovableByName ("parkyDialog");
		parkyDialog();
		setTimeout ("parkyTooFar();" , 2000);
		//objEnemy.setMaterial ("shade");
		//player.inventory.push ("Potion");
	
		
	}
}
function showParkyDialog (visible)
{
	var objDialog = Game.getMovableByName ("parkyConversation");
	objDialog.setVisible(visible);
}

function parkyPotion(maybe)
{
	if (maybe == true)
	{
		itemGain (potion);
		showAttaBoy(true);
	}
	else
	{
		showParkyDialog(false);
		return;
	}
	
}
function showAttaBoy (visible)
{
	var objText = Game.getMovableByName ("atta_Boy");
	objText.setVisible(visible);
}
function endAttaBoy ()
{
	showAttaBoy(false);
	showParkyDialog(false);
}

function parkyDialog()
{
		//Sets up dialog for parky
		var objConversation = Game.getMovableByName ("parkyConversation");
		showParkyDialog (true);
	
		var objDialog1 = Game.getMovableByName ("parkDialog_intro");
		objDialog1.setCaption ("hey bro!");
		
		var objSpell = Game.getMovableByName ("parkDialog_Question_1");
		objSpell.setCaption ("Want a potion");
	
}

function parkyTooFar ()
{
	//checks to see if player has gone out of range
	var objPlayer = player.gameObject;
	var v3dPlayerPos = player.gameObject.getPosition ();
	var objParky = Game.getMovableByName ("Parky");
	var v3dParkyPos = objParky.getPosition ();
	var iDistance = v3dPlayerPos.distance (v3dParkyPos);
	//logMessage (v3dPlayerPos.x);
	if (iDistance > 10)
	{
		showParkyDialog (false);
		showAttaBoy (false);
		return;
	}
	setTimeout ("parkyTooFar();" , 2000);
}

function spawnGraveYard ()
{
	
	var objLand = Game.getMovableByName ("box");
	var startingX = -223;
	var startingZ = -75;
	
	for (var i=0; i<5; i++)
	{
		
		for (var j=0; j<5; j++)
		{    		
				var x = (i * 64) + startingX;
				var y = (j * 64) + startingZ;
				

				//var objClone = objLand.clone ("newLand-" + i + "-" + j);
				

				var objClone = objLand.clone ("newGrave-" + i + "-" + j);
				var random = Math.floor ((Math.random () * 10));
				objClone.type = 2;
				objClone.setMaterial("enemy_Grave_1");
				objClone.setVisible (true);
				
				
				if (random <= 2)
					objClone.setMaterial ("enemy_Grave_2");
				
				else if (random <= 5)
					objClone.setMaterial ("enemy_Grave_1");

	
				objClone.setBoundingBoxVisible (false);
				objClone.setPosition (x, y, -3);
				//setTimeout ("spawnGhost ("- + i + "-" + j ");", 5000);
				//iNumGraves++;
			
		}
	}
	
	
}
function placeGrave ()
{
	var objBadGuy = Game.getMovableByName ("enemy_Grave");
	var objClone = objBadGuy.clone ("newGrave" + iNumGraves);
	var v3dPlayerPos = player.gameObject.getPosition ();
	var iX = Math.floor ((Math.random() * 100) - 100);
	var iY = Math.floor ((Math.random() * 100) - 100);
	while ((iX >= (v3dPlayerPos.x - 32)) && (iX <= (v3dPlayerPos.x + 32)))
		iX = Math.floor ((Math.random() * 100) - 100);
	while ((iY >= (v3dPlayerPos.y - 32)) && (iY <= (v3dPlayerPos.y + 32)))
		iY = Math.floor ((Math.random() * 100) - 100);
	objClone.setVisible (true);
	objClone.setBoundingBoxVisible (false);
	objClone.setPosition ((v3dPlayerPos.x + iX), (v3dPlayerPos.y + iY),-3);
	objClone.setMaxVelocity (0, 0,0);
	objClone.setAcceleration (0, 0,0);
	objClone.team = 2;
	objClone.health = 100;
	objClone.isDead = false;
	//badGuyMove(iNumBadGuys);spawnTrail 
	setTimeout ("spawnBadGuy (" + iNumGraves + ");", 5000);
	iNumGraves++
}
function damagePlayer (object1, object2)
{
	if ((object1.team == 2) && (object2.team == 1))
	{
		var damage = object1.damage;
		//logMessage (damage);
		hurtPlayer (damage);
		player.canBeHurt = false;
		setTimeout ("makePlayerAbleToBeHurt ();", 3000);
	}
}

function obstacle(object1, object2)
{
	if ((object1.team == 4) && (object2.team == 1))
	{
		
		var nameObs = object1.getName ();
		var objObs = Game.getMovableByName (nameObs);
		
		var objPlayer = player.gameObject;
		var v3dObsPos = objObs.getPosition();
		var v3dPlayerPos = objPlayer.getPosition();
		objPlayer.setAcceleration(0,0,0);
		if (player.direction  == 1)
			{
				objPlayer.setPosition (v3dPlayerPos.x, (v3dObsPos.y - 40), v3dPlayerPos.z);
			}
			else if (player.direction  == 2)
			{
				objPlayer.setPosition ((v3dObsPos.x - 48), v3dPlayerPos.y, v3dPlayerPos.z);
			}
			else if (player.direction  == 3)
			{
				objPlayer.setPosition (v3dPlayerPos.x, (v3dObsPos.y + 37), v3dPlayerPos.z);
			}
			else if (player.direction  == 4)
			{
				objPlayer.setPosition ((v3dObsPos.x + 39), v3dPlayerPos.y, v3dPlayerPos.z);
			}		
	}			
}

function obstacle2 (object1, object2)
{
	if ((object1.team == 4) && (object2.team == 1))
	{
		
		var nameObs = object1.getName ();
		var objObs = Game.getMovableByName (nameObs);
		var nameMovable = object2.getName ();
		var objMovable = Game.getMovableByName (nameMovable);
		
		var v3dObsPos = objObs.getPosition();
		var v3dPlayerPos = objMovable.getPosition();
		objMovable.setAcceleration(0,0,0);
		if (player.direction  == 1)
			{
				objMovable.setPosition (v3dPlayerPos.x, (v3dObsPos.y - 40), v3dPlayerPos.z);
			}
			else if (player.direction  == 2)
			{
				objMovable.setPosition ((v3dObsPos.x - 48), v3dPlayerPos.y, v3dPlayerPos.z);
			}
			else if (player.direction  == 3)
			{
				objMovable.setPosition (v3dPlayerPos.x, (v3dObsPos.y + 37), v3dPlayerPos.z);
			}
			else if (player.direction  == 4)
			{
				objMovable.setPosition ((v3dObsPos.x + 39), v3dPlayerPos.y, v3dPlayerPos.z);
			}		
	}			
}
function startGame ()
{
	var objPlayer = Game.getMovableByName ("player");
	var objPlayerNameWindow = App.getAppObjectByName ("winPlayerName");
	var objPlayerName = App.getAppObjectByName ("txtPlayerName");
	createPlayer (objPlayerName.getText ());
	objPlayerNameWindow.setVisible (false);
	objPlayer.team = 1;
	//spawnLandStone ();
	//spawnLandGrass ();
	//spawnLandSpace_Back ();
	spawnLandFunGrove();
	//spawnLandGrove();
	
	spawnParky ();
	//spawnLandSpace_Front ();
	UI(true);
	//setTimeout ("spawnNPC ();", 50000);
	//placeGrave ();
	spawnHorror ();
	setTimeout ("updatePlayerHUD ();", 250);

}
