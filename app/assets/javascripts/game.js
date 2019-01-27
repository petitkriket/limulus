// user icon
class Player {
	constructor(name, icon) {
		this.name = "NO NAME" || name;
		this.userStats = {
			health: 100,
			score: 0,
			hits: 0
		};

		this.userPosition = {
			x: width / 2,
			y: height / 1.1,
			angle: 180,
			icon: icon
		};
	}

	// methods
	move(destinationX) { // positionX

		let x = this.userPosition.x;
		let y = this.userPosition.y;

		// to left
		if (x < scale.x(destinationX)) {
			while (x < scale.x(destinationX)) {
				x += 0.1;
			}
		}

		// to right
		if (x > scale.x(destinationX)) {
			while (x > scale.x(destinationX)) {
				x += 0.1;
			}
		}
	}

	updateHealth() {
		healthBar.set(this.userStats.health);
	}

	resetScore() {
		this.userStats.score = 0;
		this.userStats.hits = 0;
		$("#ui-current-score").html(this.userStats.health);
		$("#ui-current-hits").html('no');
	}

	resetUser() {
		resetHealth();
		resetScore();
	}

	draw() {
		context.drawImage(icon.src, this.userPosition.x, this.userPosition.y, icon.width, icon.height);
	}

}

// words to shoot
class Bacteria {
	constructor(name) {
		this.x = Math.random();
		this.y = Math.random();
		this.r = Math.random();
		this.uid = i;
		this.name = name;
		this.isActive = true;
	}

	// Adding a method to the constructor
	draw() {
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
	}

}

// floating in backgrounds
class Particle {
	constructor() {
		this.x = Math.random();
		this.y = Math.random();
		this.r = Math.random() / 2;
		this.t = Math.random() * 0.5 * Math.PI;
	}

	// Adding methods
	greet() {}

	// make particles position variate
	tick() {
		this.t += Math.random() * 0.5 - 0.25;
		this.x += 0.001 * Math.cos(this.t);
		this.y += 0.001 * Math.sin(this.t);
		this.r += Math.random() * 0.01 - 0.005;
		if (this.x < 0 || this.x > width) {
			this.x = 0.5;
			this.r = 0.1;
		}
		if (this.y < 0 || this.y > height) {
			this.y = 0.5;
			this.r = 0.1;
		}
		if (this.r <= 0) this.r = 0.1;
		return this;
	}

	draw() {
		// scale according to screen size
		var x = scale.x(this.x),
			y = scale.y(this.y),
			r = scale.r(this.r),
			a = scale.a(this.t);

		// particle style
		context.beginPath();
		context.arc(x, y, r, 0, 2 * Math.PI);
		context.fillStyle = "rgba(255, 255, 255," + a + ")";
		context.fill();
	}

}