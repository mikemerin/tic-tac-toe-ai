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
	$("#controls").click(e => {
		start_game(parseInt(e.target.innerText, 10));
	})
	$("#board")[0].innerHTML = "";
}

function start_game(board_size) {
	var board = new Board();
	board.create_board(board_size);
	board.display_board();
	$("#controls")[0].innerText = "Restart";
	$("#controls").click(e => {
		board.reset_board();
		reset_page();
	})
}