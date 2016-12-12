function executeJS(game) {
	var result = eval(game.input.value);
	game.execute.value = result;
}
