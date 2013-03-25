var netServer = null;
var netClient = null;

var strPlayerNetworkInfo = "";

var otherPlayers = new Array ();
var otherPlayerId = 0;

function startServer ()
{
	if (netServer == null)
	{
		netServer = new NetworkServer ();
		netServer.listen (2040);
		netServer.onAccept = onAccept;
		netServer.onReceived = onServerReceived;

		logMessage ("Server started...");
		startNetworking ();
	}
}

function startClient ()
{
	if (netClient == null)
	{
		var objIP = App.getAppObjectByName ("txtIP");
		netClient = new NetworkClient ();
		netClient.connect (2040, objIP.getText ());
		netClient.onConnected = onConnected;
		netClient.onReceived = onClientReceived;

		var winConnect = App.getAppObjectByName ("winConnect");
		winConnect.setVisible (false);
	}
}

function getNetworkInfo (networkPlayer)
{
	var aryInfo = new Array ();
	var v3dPos = networkPlayer.gameObject.getPosition ();
	var facing = networkPlayer.direction;
	var health = networkPlayer.health;
	var mana = networkPlayer.mana;
	var attack = networkPlayer.activeAttack;
	var spell = networkPlayer.activeSpell;
	var attacking = networkPlayer.isAttacking;
	var casting = networkPlayer.isCasting;

	aryInfo.push (v3dPos.x);
	aryInfo.push (v3dPos.y);
	aryInfo.push (v3dPos.z);
	aryInfo.push (facing);
	aryInfo.push (health);
	aryInfo.push (mana);
	aryInfo.push (attack);
	aryInfo.push (spell);
	aryInfo.push (attacking);
	aryInfo.push (casting);

	return (aryInfo);
}

function decodeNetworkInfo (networkPlayer, aryInfo)
{
	var x = aryInfo[0];
	var y = aryInfo[1];
	var z = aryInfo[2];
	var direction = aryInfo[3];
	var health = aryInfo[4];
	var mana = aryInfo[5];
	var attack = aryInfo[6];
	var spell = aryInfo[7];
	var attacking = aryInfo[8];
	var casting = aryInfo[9];
	
	networkPlayer.gameObject.setPosition (x, y, z);
	if (direction  == 1)
		{
			networkPlayer.gameObject.setMaterial("player_north");
		}
		else if (direction  == 2)
		{
			networkPlayer.gameObject.setMaterial("player_east");
		}
		else if (direction  == 3)
		{
			networkPlayer.gameObject.setMaterial("player_south");
		}
		else if (direction  == 4)
		{
			networkPlayer.gameObject.setMaterial("player_west");
		}
	if (casting == true)
	{
		networkPlayer.gameObject.setMaterial("player_south_a");
	}
	if (attacking == true)
	{
		networkPlayer.gameObject.setMaterial("player_south_aEnd");
	}
}

function getPlayerInfoNetworkingString (playerObject)
{
	var aryInfo = getNetworkInfo (playerObject);
	var strPlayerInfo = playerObject.name + ",";

	for (var iIdx = 0; iIdx < aryInfo.length; iIdx++)
		strPlayerInfo += aryInfo[iIdx] + ",";

	strPlayerInfo = strPlayerInfo.substr (0, (strPlayerInfo.length - 1));

	return (strPlayerInfo);
}

function getPlayerInfoFromNetworkingString (infoString)
{
	var aryStrings = infoString.split (",");
	var strPlayerName = aryStrings[0];

	if (strPlayerName == player.name)
		return;

	//logMessage ("Got data from player: " + strPlayerName);
	var aryInfo = new Array ();

	for (var iIdx = 1; iIdx < aryStrings.length; iIdx++)
	{
		var objData = aryStrings[iIdx];

		if (isNaN (objData) == false)
			objData = parseFloat (objData);

		aryInfo.push (objData);
	}

	for (var iIdx = 0; iIdx < otherPlayers.length; iIdx++)
	{
		var otherPlayer = otherPlayers[iIdx];

		if (otherPlayer.name == strPlayerName)
			decodeNetworkInfo (otherPlayer, aryInfo);
	}
}

function sendNetworkingInfo ()
{
	var strPlayerInfo = getPlayerInfoNetworkingString (player);

	if (netServer != null)
	{
		var strOtherPlayers = "";

		for (var iIdx = 0; iIdx < otherPlayers.length; iIdx++)
		{
			var otherPlayer = otherPlayers[iIdx];
			var strOtherPlayerInfo = getPlayerInfoNetworkingString (otherPlayer);

			strOtherPlayers += "1-" + strOtherPlayerInfo + "|";
		}

		netServer.sendToAll ("1-" + strPlayerInfo + "|" + strOtherPlayers);
	}

	if (netClient != null)
		netClient.send ("1-" + strPlayerInfo);

	setTimeout ("sendNetworkingInfo ();", 30);
}

function startNetworking ()
{
	setTimeout ("sendNetworkingInfo ();", 30);
}

function onAccept ()
{
	logMessage ("Client connected!");
}

function onConnected ()
{
	logMessage ("Connected to server!");
	netClient.send ("3-");

	setTimeout ("netClient.send (\"2-" + player.name + "\");", 100);
	startNetworking ();
}

function onServerReceived (clientDatas)
{
	for (var iIdx = 0; iIdx < clientDatas.length; iIdx++)
	{
		var strData = clientDatas[iIdx];

		if (strData.indexOf ("1-") > -1)		// Position received
		{
			var strString = strData.substr (2);
			getPlayerInfoFromNetworkingString (strString);
		}

		if (strData.indexOf ("2-") > -1)		// Create player
		{
			var strString = strData.substr (2);
			createOtherPlayer (strString);
		}

		if (strData.indexOf ("3-") > -1)		// Get players
		{
			var strOtherPlayers = "";

			for (var iIdx = 0; iIdx < otherPlayers.length; iIdx++)
			{
				var otherPlayer = otherPlayers[iIdx];

				strOtherPlayers += "2-" + otherPlayer.name + "|";
			}

			netServer.sendToAll ("2-" + player.name + "|" + strOtherPlayers);
		}
	}
}

function onClientReceived (data)
{
	var aryStrings = data.split ("|");

	for (var iIdx = 0; iIdx < aryStrings.length; iIdx++)
	{
		var strData = aryStrings[iIdx];

		if (strData.indexOf ("1-") > -1)		// Position received
		{
			var strString = strData.substr (2);
			getPlayerInfoFromNetworkingString (strString);
		}

		if (strData.indexOf ("2-") > -1)		// Create player
		{
			var strString = strData.substr (2);
			logMessage ("Creating player: " + strString);
			createOtherPlayer (strString);
		}
	}
}

