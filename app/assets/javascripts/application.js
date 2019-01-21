// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery3
//= require popper
//= require rails-ujs
//= require bootstrap-sprockets
//= require particles.min.js
//= require_tree .

window.onload = function () {

	// take windows size into account when setting size, default 960x500
	var width = window.innerWidth,
		height = window.innerHeight,
		// MAYBE maybe add grids according to design
		resolution = 15;

	rayGun = new Image();
	rayGun.src = 'img/ray-gun.png';

	// set item scale after window size
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

	// set arrayv of particles (x, y, radius and transparency)
	var particles = d3.range(250)
		.map(function () {
			return {
				x: Math.random(),
				y: Math.random(),
				r: Math.random() / 2,
				t: Math.random() * 0.5 * Math.PI
			};
		});

	// create array of bacterias (x, y, string)
	var bacterias = d3.range(5)
		.map(function (id) {
			return {
				x: Math.random(),
				y: Math.random(),
				r: Math.random(),
				name: 'Bacteria #' + (id + 1),
				uid: id
			};
		});
	console.log(bacterias);
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

	// move items redraw at 12fps rate
	setInterval(function () {
		particles = tick(particles);
		bacterias = viralAttack(bacterias);
		draw(particles, bacterias);
	}, 100);

	function make_base() {
		context.drawImage(rayGun, width / 2, (height / 1.12), 75, 75);
	}


	// draw game 
	function draw(floatingItems, ennemies) {

		//clear at every frame
		context.clearRect(0, 0, width, height);

		// bacterias x, y, label and style
		var i = 0;
		ennemies.forEach(function (d) {
			if (i < 20) {
				i += 1;
				var x = scale.x(d.x),
					y = scale.y(d.y),
					name = d.name;
				// MAYBE add images 
				// TODO dynamic color according to difficulty
				context.fillStyle = "rgba(255, 255, 255," + 1 + ")";
				context.font = "14px Arial";
				context.fillText(name, x, y);
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

		make_base();

	}
};