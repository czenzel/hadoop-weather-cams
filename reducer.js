#!/usr/bin/env node

var streamingUtils = require('hadoop-streaming-utils');
var iterateJsonLines = streamingUtils.iterateJsonLines;
var emitJson = streamingUtils.emitJson;
var iterateKeysWithJsonValues = streamingUtils.iterateKeysWithJsonValues;

var md5 = require('./md5.js');
var mapreduce = require('mapred')();
var request = require('sync-request');

iterateKeysWithJsonValues(function (key, value) {
	// Now reduce and get our camera imagery as base64 JPEG images
	var base64_root = 'data:image/jpeg;base64,';
	var camera_images = {};

	var neighborhood = key;
	var camera_url = value;
	var camera_data = '';

	var res = request('GET', camera_url);
	camera_data = base64_encode(res.getBody());
	camera_data = base64_root + camera_data;

	emitJson(neighborhood, camera_data);
});

function base64_encode(file) {
	return new Buffer(file).toString('base64');
}