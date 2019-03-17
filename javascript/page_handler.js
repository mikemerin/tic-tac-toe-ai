class Page {
	
	constructor() {
		this.board = new Board();
		this.rules = new Rules();
		this.status = "ready";
		this.wins = { "X": 0, "O": 0, "Ties": 0 };
	}

	reset_page() {
		var board_sizes = ["3x3", "3x4", "4x3", "4x4", "4x5", "5x5"];
		
		$("#instructions")[0].innerText = "What size board would you like to play?";
		
		$("#board")[0].innerHTML = "";
		$("#board_array")[0].innerHTML = "";
		$("#game_status")[0].innerText = "";
		this.update_scoreboard()
		
		$("#controls")[0].innerHTML = "";
		$("#controls").unbind();
		
		board_sizes.forEach(size => {
			$("#controls").append($("<div>", { class: "control_board_size", text: size }));
		})	
		$("#controls").click(e => {
			this.board.board_size = e.target.innerText;
			this.game = new Game();
			this.game.start_game();
		})
	}
	
	update_scoreboard() {
		Object.keys(this.wins).forEach(player => {
			$("#scoreboard_" + player)[0].innerText = (player + ": " + this.wins[player]);
		})
	}

	create_alphabet_array(letters) {
		var alphabet_array = [];
		for(let char = 65; char < 65 + letters; char++) {
	        alphabet_array.push(String.fromCharCode(char))
	    }
		return alphabet_array;
	}	
	
}