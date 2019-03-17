class Game {
	
	constructor() {
		this.turn = "";
	}
	
	start_game() {
		page.status = "started";
		page.board.create_board();
		page.board.display_board();
		
		this.move_made();
		this.attach_listeners();
		page.update_scoreboard();
		
		$("#controls")[0].innerText = "Restart";
		$("#controls").unbind();
		$("#controls").click(e => {
			page.board.reset_board();
			page.reset_page();
		})
	}

	end_game(winner = "") {
		$(".playboard").each((i, cell) => $(cell).unbind() );
		if (winner) {
			page.status = winner + " has won!";
			page.wins[winner]++;
		} else {
			page.status = "Tie Game!";
			page.wins["Ties"]++;
		}
		page.update_scoreboard();
		$("#instructions")[0].innerText = $("#game_status")[0].innerText = page.status;		
	}
	
	move_made() {
		this.turn = (this.turn === "X" ? "O" : "X"); 
		$("#instructions")[0].innerText = "Player " + this.turn + "'s Turn";
	}
	
	attach_listeners() {
		$(".playboard").each((i, cell) => {
			$(cell).click(e => {
				if ( cell.innerText === "" ) {
					var [col, row] = cell.id.split("_");
					col = col.charCodeAt() - 65;
					row = parseInt(row, 10) - 1;
					
					page.board.board[row][col].value = e.target.innerText = this.turn;
					page.board.set_board_array();
					
					var winner = page.rules.check_if_winner(page.board.board_array);
					if ( winner ) {
						this.end_game(winner);
					} else if ( page.rules.check_if_tied(page.board.board_array) ) {
						this.end_game();
					} else {
						this.move_made();
					}
				} else {
					$("#instructions")[0].innerText = ("invalid move");					
				}
		    })
		})
	}

	
}