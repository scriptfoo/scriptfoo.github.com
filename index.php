<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>JS Mage</title>
	<script>
		var require = {
			deps: ['app'],
			//By default load any module IDs from js/lib
			baseUrl: 'js',
			urlArgs: 'bust=' + (new Date()).getTime(),
			paths: {
				// Makes ACE behave
				ace: 'lib/ace'
			},
			shim: {
				'lib/backbone': {
					deps: ['lib/underscore', 'lib/jquery']
				}
			}
		};
	</script>
	<script src="js/lib/require.js"></script>
	<script type="html/mustache" class="template" data-path="layout/default">
		<div id="page">
			<h1>{{pageTitle}}</h1>
			<div id="mainContent">
				{{{body}}}
			<div>
		</div>
	</script>
	<script type="html/mustache" class="template" data-path="page/home">
		<p>{{message}}</p>
	</script>
</head>
<body>
	
</body>
</html>