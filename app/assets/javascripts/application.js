//= require jquery3
//= require popper
//= require rails-ujs
//= require bootstrap-sprockets
//= require loading-bar.js
//= require dictionary.min.js
//= require_tree .

window.onload = function () {
	// pull list from dictionary
	var bacteriaList = dictionary.split(" ");

	// take windows size into account when setting size, default 960x500
	var width = window.innerWidth,
		height = window.innerHeight,
		resolution = 15; // MAYBE maybe add grids according to design

	// load player defense
	rayGun = new Image();
	rayGun.src = 'img/ray-gun.png';

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

	// TODO seed from 
	function randomBacteria(array) {
		var oneString = array[Math.floor(Math.random() * array.length)];
		return oneString;
	}
	// create array of bacterias (x, y, string)
	// TODO clip spawning roughly at top	
	var bacterias = d3.range(20)
		.map(function (id) {
			return {
				x: Math.random(),
				y: Math.random(),
				r: Math.random(),
				uid: id,
				name: randomBacteria(bacteriaList),
				isActive: true
			};
		});

	// set user score to 0
	function resetScore() {
		$("#ui-current-score").html(0);
		$("#ui-current-hits").html('no');
	}

	// reset patient health to 100
	function resetHealth() {
		healthBar.set(player.health);
	}

	//set patient health to 100
	function updateHealth() {
		healthBar.set(player.health);
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

	// items mouvement framerate set at 12fps
	setInterval(function () {
		particles = tick(particles);
		bacterias = viralAttack(bacterias);
		draw(particles, bacterias);
	}, 70);

	// set user gun
	function drawUserGun() {
		// draw the actual thing
		context.drawImage(rayGun, player.x, player.y, 75, 75);
	}

	// move gun to align with targets
	function udpateUserGunPosition(positionX) {
		//	player.x = scale.x(positionX);
		player.x = scale.x(positionX);

	}

	// gun easing
	function easeInOut(t) {
		return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
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

		//align gun
		udpateUserGunPosition(item.x);

		// disable object prop and reset gunner input		
		item.isActive = false;

		// remove typed bacteria, delay for comfort
		setTimeout(function () {
			$('#gun-input').val('');
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

	}

	// update user score and # hits
	function updateScore() {
		$("#ui-current-score").html(player.score);
		$("#ui-current-hits").html(player.hits);
	}

	// check if bacteria has reached bottom TODO refactor
	function hasReachedBottom(item) {
		if (item.y < 0 && item.isActive === true) {

			// disable bacteria and remove hp
			item.isActive = false;
			player.health -= 10;
			updateHealth();
		}
	}

	// check if bacteria has reached bottom FIXME one side not working
	function hasReachedSides(item) {
		if ((item.x > width || item.x < 0) && item.isActive === true) {
			item.isActive = false;
			console.log("has reached one side");
		}
	}

	// monitor user input
	var gunInput = $("#gun-input").on("change keyup paste", function () {
		setInterval(function () {
			checkWordMatch(bacterias, gunInput.val());
		}, 150);
	});

	// draw game 
	function draw(floatingItems, ennemies) {

		//clear at every frame
		context.clearRect(0, 0, width, height);

		var i = 0;
		ennemies.forEach(function (d) {

			// draw only active FIXME i<20
			if (i < 40 && d.isActive === true) {
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

		// draw limulus canon gun
		drawUserGun();

	}
};

// COURSELINK https://stackoverflow.com/questions/2696692/setinterval-vs-settimeout
// https://developingsean.wordpress.com/2012/05/
// https://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-an-object-with-an-attribute-that-e