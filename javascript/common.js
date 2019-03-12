function create_alphabet_array(letters) {
	var alphabet_array = [];
	for(let char = 65; char < 65 + letters; char++) {
        alphabet_array.push(String.fromCharCode(char))
    }
	return alphabet_array;
}

function reset_page() {
	$("#instructions")[0].innerText = "What size board would you like to play?";
	$("#controls")[0].innerText = "3";
	$("#board")[0].innerHTML = "";
	$("#board_array")[0].innerHTML = "";
	$("#game_status")[0].innerText = "";
	
	$("#controls").unbind();
	$("#controls").click(e => {
		var game = new Game_handler(parseInt(e.target.innerText, 10));
		game.start_game();
	})
}