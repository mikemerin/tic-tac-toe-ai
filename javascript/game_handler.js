class Game {

	constructor() {
		this.turn = "";
	}

	start_game() {
		this.attach_listeners();
		this.move_made();
	}

	end_game(winner = "") {
		$(".playboard").each((i, cell) => {
			$(cell).unbind();
			$(cell).removeClass("empty");
		});

		if (winner) {
			page.status = winner + " has won!";
			page.wins[winner]++;
		} else {
			page.status = "Tie Game!";
			page.wins["Ties"]++;
		}
		page.update_scoreboard();
		$("#game_status")[0].innerText = page.status;
	}

	move_made() {
		this.turn = (this.turn === "X" ? "O" : "X");
		page.update_status_text(this.turn);
		if (page.player[this.turn] === "CPU") {
			debugger
			//todo: pick up here with CPU
		}
	}

	attach_listeners() {
		$(".playboard").each((i, cell) => {
			$(cell).click(e => {
				if ( cell.innerText === "" ) {
					var [col, row] = cell.id.split("_");
					col = col.charCodeAt() - 65;
					row = parseInt(row, 10) - 1;

					$(cell).removeClass("empty");
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
				}
	    })
		})
	}


}
