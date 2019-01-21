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

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
//particlesJS.load("game-canvas", "/particlesjs-config.json");
//console.log(particlesJS);
// load canvas after page is fully loaded
window.onload = function () {

	var canvas = document.getElementById("game-layer");
	var ctx = canvas.getContext("2d");

	// take windows size into accoun
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
};