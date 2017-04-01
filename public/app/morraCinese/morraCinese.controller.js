(function(){
	'use strict';

	angular.module('App.morraCinese')
		.controller('morraCineseCtrl', morraCineseCtrl);

		morraCineseCtrl.$inject = ['$location', '$timeout', '$scope', '$route'];

		function morraCineseCtrl($location, $timeout, $scope, $route){

			var app = this;
			app.titolo = "Game Setup";
			app.loadingMsg = "";
			app.count = 1;
			app.loading= false;
			app.finalLoading = false;
			app.setup = true;
			app.fight = false;
			app.fighting = false;
			app.fightResult = false;
			app.player1={ 'name' : '', 'points': 0, 'mossa': ''};
			app.player2={ 'name' : 'Computer', 'points': 0, 'mossa': ''};
			app.mosse=[
				{'nome': 'sasso', 'punteggio': 1, 'immagineV': 'assets/images/sassoV.png', 'immagineB': 'assets/images/sassoB.png'},
				{'nome': 'carta', 'punteggio': 2, 'immagineV': 'assets/images/cartaV.png', 'immagineB': 'assets/images/cartaB.png'},
				{'nome': 'forbice', 'punteggio': 3, 'immagineV': 'assets/images/forbiceV.png', 'immagineB': 'assets/images/forbiceB.png'},
			];

			app.goToGame = function(){
				$location.path('/gioco');
			};

			app.newMatch = function(){
				if(app.fight && app.fightResult){
					app.fight = false;
					app.fightResult = false;
					app.count++;
					app.titolo = "Morra Cinese: partita " + app.count + " di " + $scope.matches;
					if(app.count == $scope.matches){
						app.noMoreGames = true;
					}
				} else {
					alert("Prima di passassare al prossimo match completa il match attuale");
				}
			};

			//funzione che ricarica la pagina e permette il setup di una nuova partita
			app.resetGame = function(){
				app.loadingMsg = "Attendi mentre ti reindizzo al setup di una nuova partita...";
				app.loading = true;
				$timeout(function () {
					app.loading = false;
					$route.reload();
				}, 2000);
			}

			//funzione che interrompe la partita e reindirizza alla home page
			app.exitGame = function(){
				app.loadingMsg = "Attendi mentre ti reindirizzo alla home...";
				app.loading = true;
				$timeout(function () {
					app.loading = false;
					$location.path('/home');
				}, 2000);
			};

			//funzione di passaggio fra il setup del gioco (fase 1) alla (fase 2) il gioco
			app.startGame = function(){
				app.loadingMsg = "Inizializzo la partita...attendi...";
				app.loading = true;
				if(app.count==$scope.matches){
					app.noMoreGames = true;
				}
				$timeout(function(){
					app.titolo = "Morra Cinese: partita " + app.count + " di " + $scope.matches;
					app.loading = false;
					app.setup = false;
				}, 2000);
			};

			//funzione che randomizza la scelta del computer, che calcola chi vince e incrementa il punteggio
			app.startFight = function(val){
				app.fight = true;
				app.fighting = true;
				app.random = Math.floor(Math.random() * 3);

				$timeout(function(){
					app.fighting = false;
					if(val == 1){
						app.fightResult = true;
						app.player1.mossa = app.mosse[0].immagineV;
						app.player2.mossa = app.mosse[app.random].immagineB;

						if((app.mosse[0].punteggio - app.mosse[app.random].punteggio) == 0){
							app.score = "Avete pareggiato!!!";
						} else if ((app.mosse[0].punteggio - app.mosse[app.random].punteggio) == -1) {
							app.score = "Carta batte Sasso...Il " + app.player2.name + " ha vinto, spiacente";
							app.player2.points++;
						} else {
							app.score = "Sasso batte Forbice...Complimenti " + app.player1.name + " hai vinto!!!";
							app.player1.points++;
						}
					} else if( val == 2){
						app.fightResult = true;
						app.player1.mossa = app.mosse[1].immagineV;
						app.player2.mossa = app.mosse[app.random].immagineB;

						if((app.mosse[1].punteggio - app.mosse[app.random].punteggio) == 0){
							app.score = "Avete pareggiato!!!";
						} else if ((app.mosse[1].punteggio - app.mosse[app.random].punteggio) == -1){
							app.score = "Forbice batte Carta...Il " + app.player2.name + " ha vinto, spiacente";
							app.player2.points++;
						} else {
							app.score = "Carta batte Sasso...Complimenti " + app.player1.name + " hai vinto!!!";
							app.player1.points++;
						}
					}else {
						app.fightResult = true;
						app.player1.mossa = app.mosse[2].immagineV;
						app.player2.mossa = app.mosse[app.random].immagineB;

						if((app.mosse[2].punteggio - app.mosse[app.random].punteggio) == 0){
							app.score = "Avete pareggiato!!!";
						} else if((app.mosse[2].punteggio - app.mosse[app.random].punteggio) == 2){
							app.score = "Sasso batte Forbice...Il " + app.player2.name + " ha vinto, spiacente";
							app.player2.points++;
						} else {
							app.score = "Forbice batte Carta...Complimenti " + app.player1.name + " hai vinto!!!";
							app.player1.points++;
						}
					}
					if(app.count == $scope.matches){
						$timeout(function(){
							app.fightResult = false;
							app.finalMsg = true;
							app.finalLoading = true;
							app.finalWinnerMsg = "Partita conclusa. Attendi mentre calcolo il vincitore finale!!!";

							$timeout(function(){
								app.finalWinnerMsg = "E il vincitore finale èèèèèèèèè........";
								app.endGame();
							},3000);
						},3000)
					}
				}, 2000);
			};

			//funzione finale per il calcolo del vincitore
			app.endGame = function(){
				$timeout(function(){
						app.finalLoading = false;
						if(app.player1.points > app.player2.points){
							app.finalWinnerMsg = "Il vincitore finale della partita è....." + app.player1.name + " con " + app.player1.points + " punti, congratulazioni!!!";
						} else if (app.player1.points < app.player2.points){
							app.finalWinnerMsg = "Il vincitore finale della partita è.....Il " + app.player2.name + " con " + app.player2.points + " punti, mi dispiace " + app.player1.name + " non arrenderti!!!";
						} else {
							app.finalWinnerMsg = "Nessun vincitore nella partita corrente, entrambi avete vinto esattamente " + app.player1.points + " partite!!";
						}
				}, 2000);
			};
		}
})();
