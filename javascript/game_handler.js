class Game {

	constructor() {
		this.turn = "";
	}

	start_game() {
		this.attach_listeners();
		this.next_move();
	}

	attach_listeners() {
		$(".playboard").each((i, cell) => {
			$(cell).click(e => {
				if ( cell.innerText === "" ) {
					this.make_a_move(cell.id);
				}
			})
		})
	}

	make_a_move(cell_id) {
		var [col, row] = cell_id.split("_");
		col = col.charCodeAt() - 65;
		row = parseInt(row, 10) - 1;

		$("#" + cell_id).removeClass("empty");
		$("#" + cell_id)[0].innerText = page.board.board[row][col].value = this.turn;

		var [tied, winner] = page.rules.check_if_end_of_game( page.board.board );

		if (winner) {
			this.end_game(winner);
		} else if (tied) {
			this.end_game();
		} else {
			this.next_move();
		}
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
		page.update_status_text();
	}

	next_move() {
		this.turn = (this.turn === "X" ? "O" : "X");
		page.update_status_text(this.turn);
		if (page.player[this.turn] === "CPU") {
			var move = page.CPU.get_best_move();
			page.sleep(2000).then(()=> { this.make_a_move(move); });
		}
	}

}
