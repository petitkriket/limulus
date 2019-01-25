//= require jquery3
//= require popper
//= require rails-ujs
//= require bootstrap-sprockets
//= require loading-bar.js
//= require dictionary.min.js
//= require_tree .

window.onload = function () {
	//testing button tool
	$('#wave').on('click', function () {
		handleMsg("Excellent! More are coming !");

		setTimeout(function () {
			// start game msg
			seedBacterias(bacterias, 3);
		}, 500);

		if (isWaveActive(bacterias) === false) {
			$(window).trigger('wave-cleared');
			//	console.log(bacterias);
		}
	});

	gameInit = false;

	// open title screen so user launch the game
	$('#title-screen').modal('toggle');

	// set array to receive initial wave
	var bacterias = [];

	// focus on input when game start TODO REFACTOR GAME START FUNC
	$('#title-screen').on('hidden.bs.modal', function () {

		$('#user-input').focus();
		seedBacterias(bacterias, 3);
		gameInit = true;
		setTimeout(function () {
			// start game msg
			handleMsg("Type to heal bacterias !");
		}, 500);
		startLoop();
	});

	// pull list from dictionary
	var bacteriaList = dictionary.split(" ");

	// take windows size into account when setting size, default 960x500
	var width = window.innerWidth,
		height = window.innerHeight,
		resolution = 15; // MAYBE maybe add grids according to design

	// load player defense
	limulusIcon = new Image();
	limulusIcon.src = 'img/user-icon.png';

	// set items scale
	var scale = {
		x: d3.scale.linear().domain([0, 1]).range([0, width]),
		y: d3.scale.linear().domain([0, 1]).range([height, 0]),
		r: d3.scale.linear().domain([0, 1]).range([1, 4]),
		a: d3.scale.linear().domain([0, 1]).range([0.1, 0.6])
	};

	// assign d3 to game container 
	var canvas = d3.select("#game-canvas").append("canvas")
		.attr("width", width)
		.attr("height", height);

	// setting canvas context
	var context = canvas.node().getContext("2d");

	// set user
	var player = {
		name: "no name",
		hits: 0,
		score: 0,
		health: 100,
		x: (width / 2),
		y: (height / 1.1)
	};

	// set patient health bar
	var healthBar = document.getElementById('health-bar').ldBar;
	healthBar.set(player.health);

	// set array of particles (x, y, radius and transparency)
	var particles = d3.range(250)
		.map(function () {
			return {
				x: Math.random(),
				y: Math.random(),
				r: Math.random() / 2,
				t: Math.random() * 0.5 * Math.PI
			};
		});

	// select a random bacteria TODO add levels 
	function randomBacteria(array) {
		var oneString = array[Math.floor(Math.random() * array.length)];
		return oneString;
	}

	// create array of bacterias (x, y, string)  TODO clip spawning roughly at top
	function seedBacterias(array, int) {
		for (var i = 0; i < int; i++) {
			var oneBacteria = {
				x: Math.random(),
				y: Math.random(),
				r: Math.random(),
				uid: i,
				name: randomBacteria(bacteriaList),
				isActive: true
			};

			array.push(oneBacteria);
		}

	}

	// update UI 
	function updateHealth() {
		healthBar.set(player.health);
	}

	// set user score to 0
	function resetScore() {
		$("#ui-current-score").html(0);
		$("#ui-current-hits").html('no');
	}

	// reset patient health to 100
	function resetUser() {
		player.name = "no name";
		player.hits = 0;
		player.score = 0;
		player.health = 100;
		player.x = (width / 2);
		player.y = (height / 1.1);
	}

	// restart game
	function resetGame() {
		// reset user stats and UI
		resetUser();
		updateHealth();
		resetScore();

		// reset bacterias and game state
		bacterias = [];
		gameInit = true;
		isGameOver = false;

		// notification
		setTimeout(function () {
			// start game msg
			handleMsg("Type to heal bacterias !");
		}, 500);
		startLoop();

		// add bacterias
		setTimeout(function () {
			seedBacterias(bacterias, 3);
		}, 500);


	}

	var isGameOver = false;
	//monitor patient health
	function monitorHealth() {
		if (player.health < 0 && isGameOver === false) {

			//stop the loop
			clearInterval(loop);

			// check if user made a top score
			isTopScore();

			// open title screen
			setTimeout(function () {
				// start game msg
				$('#ending-screen').modal('show');
				isGameOver = true;
				gameInit = false;
			}, 2000);



			// add the form here
		}
	}

	// make particles position variate
	function tick(item) {
		return item.map(function (d) {
			d.t += Math.random() * 0.5 - 0.25;
			d.x += 0.001 * Math.cos(d.t);
			d.y += 0.001 * Math.sin(d.t);
			d.r += Math.random() * 0.01 - 0.005;
			if (d.x < 0 || d.x > width) {
				d.x = 0.5;
				d.r = 0.1;
			}
			if (d.y < 0 || d.y > height) {
				d.y = 0.5;
				d.r = 0.1;
			}
			if (d.r <= 0) d.r = 0.1;
			return d;
		});
	}

	// make bacterias attack ! (top to bottom with an organic spinning)
	function viralAttack(item) {
		return item.map(function (d) {
			d.x += 0.001 * Math.cos(d.r * -3); // FIXME direction variation
			d.y += 0.001 * Math.sin(d.r * -3);
			return d;
		});
	}

	var loop;

	function startLoop() {
		// game timeline that do things at 14fps
		loop = setInterval(function () {

			// randomize movement to get it organic
			particles = tick(particles);
			bacterias = viralAttack(bacterias);

			// draw the actual thing
			draw(particles, bacterias);

			// monitor patient health
			monitorHealth();

			// send new wave if clear
			isWaveActive(bacterias);
		}, 70);
	}

	// set user limulus
	function drawLimulusIcon() {
		// draw the actual thing
		context.drawImage(limulusIcon, player.x, player.y, 75, 75);
	}

	// move limulus to align with targets
	function udpateLimulusPosition(positionX) {


		if (player.x < scale.x(positionX)) {
			//	console.log("dans un sens");

		}
		if (player.x > scale.x(positionX)) {
			//console.log("de l'autre");
		}
		player.x = scale.x(positionX);

	}

	// check if user input is matching with any bacteria
	function checkWordMatch(array, value) {
		for (var i = 0; i < array.length; i++) {
			if (array[i].name === value && array[i].isActive === true) {
				destroyBacteria(array[i]);
				break;
			}
		}
	}

	// destroy bacteria if it's a match
	function destroyBacteria(item) {

		//align limulus
		udpateLimulusPosition(item.x);

		// disable object prop and reset user input		
		item.isActive = false;

		// remove typed bacteria, delay for comfort
		setTimeout(function () {
			$('#user-input').val('');
		}, 150);

		// add points and update ui
		addPoints(item.name);
		updateScore();
	}

	// add points to user score
	// TODO add difficulty scale to word object prop
	function addPoints(word) {
		var value = word.length;
		// set 3 levels of difficulty
		if (value > 3) {
			player.score += 15;
		} else if (value > 5) {
			player.score += 30;
		} else {
			player.score += 5;

		}
		// add one kill
		player.hits += 1;

		// regen some health
		player.health += 2;
		updateHealth();

	}

	// update user score and # hits and animate
	function updateScore() {
		$("#ui-current-score").html(player.score);

		// animate it with a timer
		$("#score-wrapper").addClass("animated heartBeat slow");

		setTimeout(function () {
			$("#score-wrapper").removeClass("animated heartBeat slow");
		}, 500);

		$("#ui-current-hits").html(player.hits);
	}

	// display instructions and state
	function handleMsg(string) {
		// change text
		$("#notification").html("<h1>" + string + "</h1>");
		//display and animate
		$("#notification").removeClass("d-none");
		$("#notification").addClass("animated fadeOut heartBeat infinite slow");

		setTimeout(function () {
			// stop animation and hide
			$("#notification").removeClass("animated fadeOut heartBeat infinite slow");
			$("#notification").addClass("d-none");

		}, 2000);
	}

	// check if bacteria has reached bottom TODO refactor
	function hasReachedBottom(item) {
		if (item.y < 0 && item.isActive === true) {

			// disable bacteria and remove hp
			item.isActive = false;
			player.health -= 30;
			updateHealth();
		}
	}

	// check if bacteria has reached sides to turn them off
	function hasReachedSides(item) {
		if ((item.x < 0) && item.isActive === true) {
			item.isActive = false;
			//console.log(item.name, "has escaped left (x < 1)");
		}

		if ((item.x > 1) && item.isActive === true) {
			item.isActive = false;
			//console.log(item.name, "has espaced right(x > 1)");
		}
	}

	// determine if bacterias still around to heal
	function isWaveActive(array) {
		for (var i = 0; i < array.length; i++) {

			// check if there is a remaining active bacteria
			if (array[i].isActive === true && gameInit === true) {
				return true;
			}
		}
		$(window).trigger('wave-cleared');
		return false;
	}
	// user has made an highscore
	function isTopScore() {
		var titleValue = "";

		// chech if user made better score than the fifth one in table
		if (player.score > gon.min_high_score.mark) {
			handleMsg("You made it through to high score!");

			// user made it to the top
			titleValue = "Your limulus has done well!!";

			// show the form and place user mark
			document.getElementById("score-mark").value = parseFloat(player.score);
			$(".ending-title").html(titleValue);
			$(".best-score").removeClass("d-none");


		} else {
			handleMsg("Limulus is gone...");
			titleValue = "Limulus is gone..";
			$(".ending-title").html(titleValue);
		}
	}


	// add a new wave when body is cleared
	$(window).on('wave-cleared', function () {
		handleMsg("Excellent! More are coming !");
		seedBacterias(bacterias, bacterias.length + 1);

	});

	// monitor user input
	var userInput = $("#user-input").on("change keyup paste", function () {
		setInterval(function () {
			checkWordMatch(bacterias, userInput.val());
		}, 150);
	});

	// disable form submission
	$('#user-input').on('keyup keypress', function (e) {
		var keyCode = e.keyCode || e.which;
		if (keyCode === 13) {
			e.preventDefault();
			return false;
		}
	});

	// focus on input on any click
	$(".ui-overlay ").click(function () {
		$('#user-input').focus();
	});

	//restart game
	$('#game-restart').on('click', function () {
		resetGame();
	});

	// draw game 
	function draw(floatingItems, ennemies) {

		//clear at every frame
		context.clearRect(0, 0, width, height);

		var i = 0;
		ennemies.forEach(function (d) {

			// clip # ennemies on screen 
			if (i < 200 && d.isActive === true) {
				i += 1;
				var x = scale.x(d.x),
					y = scale.y(d.y);
				// bacterias x, y, label and style
				// MAYBE add images and dynamic color according to difficulty
				context.fillStyle = "rgba(255, 255, 255," + 1 + ")";
				context.font = "14px Arial";
				context.fillText(d.name, x, y);

				// check if particle has reached bottom or sides
				hasReachedBottom(d);
				hasReachedSides(d);
			}
		});

		// set each particule size, position and opacity
		floatingItems.forEach(function (d) {
			var x = scale.x(d.x),
				y = scale.y(d.y),
				r = scale.r(d.r),
				a = scale.a(d.t);

			// make them glow circles with different sizes
			context.beginPath();
			context.arc(x, y, r, 0, 2 * Math.PI);
			context.fillStyle = "rgba(255, 255, 255," + a + ")";
			context.fill();

		});

		// draw limulus 
		drawLimulusIcon();

	}
};

// COURSELINK https://stackoverflow.com/questions/2696692/setinterval-vs-settimeout
// https://developingsean.wordpress.com/2012/05/
// https://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-an-object-with-an-attribute-that-e
// MAYBE enforce bouds (but as dormant and harmless viruses exists, conceptually make sense)
// https://stackoverflow.com/questions/15344104/smooth-character-movement-in-canvas-game-using-keyboard-controls

// MAYBE enforce bouds (but as dormant and harmless viruses exists, conceptually make sense)
// https://stackoverflow.com/questions/15344104/smooth-character-movement-in-canvas-game-using-keyboard-controls