var json = require('./camera-database-original.json');

for (var i = 0; i < json.ICONS.length; i++) {
	var camera = json.ICONS[i];
	
	var action_line = {
		'id': camera.id,
		'neighborhood': camera.neighborhood,
		'image': camera.image,
	};
	
	process.stdout.write(JSON.stringify(action_line));
	process.stdout.write("\n");	
}