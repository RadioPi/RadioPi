# PLAYER DOCUMENTATION

## TODO:

player.setFile() a besoin d'être try/catch
car il crash si le morceau précédent est fini
à utiliser de cette manière-ci:
	try{
		player.setFile(file);
	} catch(error) {
		console.log(error);
		player = new Mplayer(file);
	}
Si on l'appelle alors qu'on morceau est en train d'être joué
player.setFile() va stop le morceau actuel.

player.play() crash si on l'appelle alors qu'un
morceau est déjà en train d'être joué.
Il faut donc arrêter le morceau qui est entrain
d'être joué pour lancer le nouveau
Utiliser de cette manière-ci:
	try{
		player.stop();
	} catch(error) {
		console.log(error);
	}
	player.play();

player.pause()/player.stop() crash si rien n'est joué,
pareil que les autres il faut les try/catch:
	try{
		player.pause()/stop();
	} catch(error) {
		console.log(error);
	}

player.checkPlaying() retourne:
	true si le player est en train de jouer ou si il est en pause
	false dans tous les autres cas.