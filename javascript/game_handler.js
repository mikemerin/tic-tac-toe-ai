class Game_handler {
	
	constructor(board_size) {
		this.board = new Board(board_size);
		this.rules = new Rules();
		this.turn = "";
		this.status = "ready";
	}
	
	start_game(board_size) {
		this.turn = "X";
		this.status = "started";
		this.board.create_board();
		this.board.display_board();
		
		this.attach_listeners();
		
		$("#controls")[0].innerText = "Restart";
		$("#controls").unbind();
		$("#controls").click(e => {
			this.board.reset_board();
			reset_page();
		})
	}

	end_game(winner = "") {
		$(".playboard").each((i, cell) => $(cell).unbind() );
		this.game_status = winner ? winner + " has won!" : "Tie game!";
		$("#game_status")[0].innerText = this.game_status;		
	}
	
	attach_listeners() {
		$(".playboard").each((i, cell) => {
			$(cell).click(e => {
				if ( cell.innerText === "" ) {
					var [col, row] = cell.id.split("_");
					col = col.charCodeAt() - 65;
					row = parseInt(row, 10) - 1;
					
					var player = this.player_turn();
					this.board.board[row][col].value = e.target.innerText = player;
					this.board.set_board_array();
					
					var winner = this.rules.check_if_winner(this.board.board_array);
					if ( winner ) {
						this.end_game(winner);
					} else if ( this.rules.check_if_tied(this.board.board_array) ) {
						this.end_game();
					}
				} else {
//					$("#instructions")[0].innerText = ("invalid move");					
				}
		    })
		})
	}
	
	player_turn() {
		var player = "X"
		$("#instructions")[0].innerText = "Player " + player + "'s Turn";
		return player;
	}

	
}