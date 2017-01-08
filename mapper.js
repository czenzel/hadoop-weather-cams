#!/usr/bin/env node

var streamingUtils = require('hadoop-streaming-utils');
var iterateJsonLines = streamingUtils.iterateJsonLines;
var emitJson = streamingUtils.emitJson;

var md5 = require('./md5.js');
var request = require('sync-request');
var base64 = require('./node_modules/js-base64/base64.js').Base64;

iterateJsonLines(function(myJson) {
	var date = new Date();
	var datestamp = date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) +  ("0" + (date.getDate() + 1)).slice(-2);
	var timestamp = ("0" + date.getHours()).slice(-2) + ("0" + date.getMinutes()).slice(-2);

	var camera_base_url = 'https://icons.wunderground.com';
	var camera_keys = [];
	
	console.log(myJson);

	var camera = myJson;
	var camera_id = camera.id;
	var camera_link = camera_base_url + camera.image;
	var camera_neighborhood = camera.neighborhood;
	var camera_file = md5(camera_link) + '.jpg';
	
	emitJson(camera_neighborhood, camera_link);
});