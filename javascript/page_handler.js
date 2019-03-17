class Page {
	
	constructor() {
		this.board = new Board();
		this.rules = new Rules();
		this.status = "ready";
		this.wins = { "X": 0, "O": 0, "Ties": 0 };
		
		this.create_UI();
	}
	
	create_UI() {
		var board_sizes = ["3x3", "3x4", "4x3", "4x4", "4x5", "5x5"];

		board_sizes.forEach(size => {
			var id = "control_board_size_" + size;
			$("#board_sizes").append($("<div>", { class: "control_board_size", id: id, text: size }));
			$("#" + id).click(e => {
				this.board.board_size = size;
				this.toggle_UI();
			})
		})
		
		$("#new_game").click(e => {
			this.board.create_board();
			this.board.display_board();
			this.game = new Game();
			this.game.start_game();
			this.toggle_UI();
		})
		
		$("#restart").click(e => {
			this.board.clear_board();
			this.status = "ready";
			this.toggle_UI();
		})
		
	}
	
	toggle_UI() {
		if (this.status === "ready") {
			$(".control_board_size").removeClass("selected");
			$("#control_board_size_" + this.board.board_size).addClass("selected");
			
			$("#new_game").show(); //todo: refactor these shows/hides
			$("#board_sizes").show();
			$("#game_status").hide();
			$("#restart").hide();
			$("#board").hide();
		} else {
			$("#new_game").hide();
			$("#board_sizes").hide();
			$("#game_status").show();
			$("#restart").show();
			$("#board").show();
		}
		this.update_scoreboard();
		this.update_status_text();
	}
	
	update_scoreboard() {
		Object.keys(this.wins).forEach(player => {
			$("#scoreboard_" + player)[0].innerText = (player + ": " + this.wins[player]);
		})
	}
	
	update_status_text() {
		$("#game_status")[0].innerText = this.status;
	}

	create_alphabet_array(letters) {
		var alphabet_array = [];
		for(let char = 65; char < 65 + letters; char++) {
	        alphabet_array.push(String.fromCharCode(char))
	    }
		return alphabet_array;
	}	
	
}