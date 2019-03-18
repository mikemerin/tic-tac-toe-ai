class Page {
	
	constructor() {
		this.board = new Board();
		this.rules = new Rules();
		this.player_X = "Human";
		this.player_O = "Human";
		this.status = "ready";
		this.wins = { "X": 0, "O": 0, "Ties": 0 };
		// todo: separate wins for 1p/2p/etc with a function to sort which one for games/UI
		
		this.create_UI();
	}
	
	create_UI() {
		var board_sizes = ["3x3", "3x4", "4x3", "4x4", "4x5", "5x5"];
		var players = ["Human", "CPU"]; 

		board_sizes.forEach(size => {
			var id = "control_board_size_" + size;
			$("#board_sizes").append($("<th>", { class: "control_board_size", id: id, text: size }));
			$("#" + id).click(e => {
				this.board.board_size = size;
				this.toggle_UI();
			})
		})
		
		players.forEach(player => {
			["X", "O"].forEach(letter => {
				var className = "player_" + letter;
				var id = className + "_" + player;
				$("#" + className).append($("<option>", { class: className, id: id, text: player }));

				$("#" + className).change(e => {
					if (letter === "X") {
						this.player_X = player;
					} else {
						this.player_O = player;
					}
					this.toggle_UI();
				})				
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
			
			$(".game_mode").removeClass("selected");
			$("#game_mode_" + this.game_mode).addClass("selected");
			
			$("#new_game").show(); //todo: refactor these shows/hides
			$("#board_sizes").show();
			$("#game_modes").show();
			$(".player_select").each((i,x) => $(x).show());
			$(".player_status").each((i,x) => $(x).hide());
			$("#game_status").hide();
			$("#restart").hide();
			$("#board").hide();
		} else {
			$("#player_status_X")[0].innerText = page.player_X;
			$("#player_status_O")[0].innerText = page.player_O;
			
			$("#new_game").hide();
			$("#board_sizes").hide();
			$("#game_modes").hide();
			$(".player_select").each((i,x) => $(x).hide());
			$(".player_status").each((i,x) => $(x).show());
			$("#game_status").show();
			$("#player_status").show();
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
	
	update_status_text(turn = "") {
		if (turn) {
			this.status = "Player " + turn + "'s Turn";
			$(".player_status").each((i,x) => $(x).removeClass("selected"));
			$("#player_status_" + turn).addClass("selected");
		}
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