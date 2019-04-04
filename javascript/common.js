function create_alphabet_array(letters) {
	var alphabet_array = [];
	for(let char = 65; char < 65 + letters; char++) {
        alphabet_array.push(String.fromCharCode(char))
    }
	return alphabet_array;
}

function reset_page() {
	$("#instructions")[0].innerText = "What size board would you like to play?";

	//ToDo: add classes to HTML then iterate here
	$("#board")[0].innerHTML = "";
	// $("#board_array")[0].innerHTML = ""; // todo: future add-on for analytics
	$("#game_status")[0].innerText = "";

	$("#controls")[0].innerHTML = "";
	$("#controls").unbind();

	["3x3", "3x4", "4x4", "4x5", "5x5"].forEach(size => {
		$("#controls").append($("<div>", { class: "control_board_size", text: size }));
	})
	$("#controls").click(e => {
		var game = new Game_handler(e.target.innerText);
		game.start_game();
	})
}
