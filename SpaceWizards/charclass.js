function Character ()
{
	this.name = "";
	this.gameObject = null;
	this.v3dPlayerBattlePos = new Vector3 ();
	this.health = 100;
	this.damage = 5;
	this.mana = 100;
	this.focus = 10;	//increases chance to crit, resistence to being distrupted
	this.will = 10;		//decreases cast time, increases resistence to status change
	this.vigor = 10; 	// base HP, HP regen rate
	this.intel = 10;	//affects time to master spell, number of spells that can be learned 
	this.spells = new Array ();
	this.inventory = new Array ();
	this.spellsMastered = new Array();
	this.Abuffs = new Array();
	this.BdeBuffs = new Array();
	this.Bbuffs = new Array();
	this.status = 1;
	this.equipHead = 0;
	this.equipBody = 0;
	this.equipRing = 0;
	this.equipLeft = 0;
	this.equipRight = 0;
	this.lvl = 1;
	this.exp = 0;
	this.nextLevelXp = 100;
	this.friends = new Array();
	this.rivals = new Array();
	this.party = new Array();
	this.location = 0;
	this.direction = 1;
	this.activeAttack = 0;
	this.activeSpell = 0;
	this.isAttacking = false;
	this.isCasting = false; 
	this.attackPower = 0;
	this.team = 3;
	this.chargeRate = 1;
	
	
	this.usePotion = function ()
	{
	}
	
	this.useElixer = function ()
	{
	}
	
	this.doVengfulGhost = function ()
	{
		// When targeted enemy is destroyed, it spawns a ghost that attacks other enemies
	}

	this.doFireBallSpell = function ()
	{
		//moderate fire damage
	}
	this.doCombustion = function ()
	{
		//instant fire damage
	}
	
	this.doFireStorm = function ()
	{
		//fire damage
		// attacks all enemies
	}
	
	this.doEngulf = function ()
	{
		// lite fire damage over multiple turns
		// chance of distrupting player
	}
	
	this.doSacrificialFlame = function ()
	{
		//lite damage attack that grants damage buff enemy is killed with attack.
	}
	
	this.doSoulBurn = function ()
	{
		// Consumes part of targets soul, lowering all base stats until battle is complete
		// low chance
	}
	
	this.doBackFlame = function()
	{
		//extra powerful attack
		// long cast time, chance to set off engulf effect
	}
	
	
	this.doIceSpell = function()
	{
		//moderate ice damage
	}
	
	this.doHealSpell = function()
	{
		
	}
	
	this.doCrystalBarrage = function()
	{
		// chance to hit 3 to 7 times
	}
	
	this.doCrystalMagnification = function()
	{	
		// increases focus
	}
	
	this.doCrystalShell = function()
	{
		// increases defense
	}
	this.doQuantumNonlocality = function()
	{
		//clones player, making 2 versions allowing double attacks, but splits HP and MP
	}
}

