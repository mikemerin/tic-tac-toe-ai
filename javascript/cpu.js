class CPU {

	constructor() { // todo: input difficulty, then make the possible moves go X moves out based on difficulty
		this.difficulty = 10;
		this.number_of_moves_to_look_ahead = "";
		this.move_tree = {};
		this.player = "";
		this.possible_moves_per_turn = {};
	}

	get_best_move() {
		var turn = page.game.turn === "X" ? "O" : "X";
		$("#possible_moves_per_turn_table")[0].innerHTML = "";
		this.possible_moves_per_turn = { "total": { "total" : 0, "X": 0, "O": 0, "tie": 0, "unknown": 0 }};

		var empty_spaces = $(".empty").length;

		this.player = page.game.turn;
		this.number_of_moves_to_look_ahead = Math.round(empty_spaces * this.difficulty/10) || 1; // todo: implement
		this.move_tree = { "parent": ["this.move_tree"], "board" : page.board.board, "moves" : "unknown", "best_moves" : {} }; // todo: add score?

		this.move_tree["moves"] = this.get_all_next_moves(this.move_tree, turn); // todo: limit moves here
		this.display_possible_moves_per_turn();
		return this.calculate_best_move();
	}

	get_all_next_moves(branch, turn) {
		var all_next_moves = {};
		turn = (turn === "X" ? "O" : "X");

		branch["board"].forEach(row => {
			row.forEach(cell => {
				if (cell.value === "") {
					var board_after_move = this.get_board_after_move(branch["board"], cell.id, turn);
					var next_move = this.get_next_move( board_after_move );
					this.calculate_possible_moves_per_turn(next_move, branch);
					all_next_moves[cell.id] = {"parent" : [...branch["parent"], cell.id], "board" :board_after_move, "moves" : next_move, "wins" : 0, "losses" : 0 };

					if (next_move === "unknown") {
						all_next_moves[cell.id]["moves"] = this.get_all_next_moves(all_next_moves[cell.id], turn);
					};
				};
			})
		})
		return all_next_moves;
	}

	get_board_after_move(board, move, turn) {
		return board.map(row => {
			return row.map(cell => {
				var cell_value = (cell.id === move ? turn : cell.value);
				return { id: cell.id, value: cell_value };
			})
		})
	}

	get_next_move(board) {
		var next_move = ""
		var [tied, winner] = page.rules.check_if_end_of_game( board );

		if (winner) {
			next_move = winner;
		} else if (tied) {
			next_move = "tie"
		} else {
			next_move = "unknown";
		}
		return next_move;
	}

	calculate_possible_moves_per_turn(move, branch) {
		var primary_move = branch["parent"][1];
		if (primary_move) {
			if (!this.move_tree["best_moves"][primary_move]) {
				this.move_tree["best_moves"][primary_move] = {"wins" : 0, "losses" : 0};
		    }
			if (move !== "unkown" && move !== "tie") {
				var win_or_lose = (this.player === move ? "wins" : "losses" );
				this.move_tree["best_moves"][primary_move][win_or_lose]++;
		    }
		}

		var turn_number = branch["parent"].length;

		if (!this.possible_moves_per_turn[turn_number]) {
			this.possible_moves_per_turn[turn_number] = { "total" : 0, "X": 0, "O": 0, "tie": 0, "unknown": 0 };
		}
		this.possible_moves_per_turn["total"][move]++;
		this.possible_moves_per_turn["total"]["total"]++;
		this.possible_moves_per_turn[turn_number][move]++;
		this.possible_moves_per_turn[turn_number]["total"]++;
	}

	display_possible_moves_per_turn() {
		// todo: move to page.js
		var fields = ["X", "O", "Tie", "N/A", "Total"];
		var header = fields.map(field => $("<th>", { text: field}));
		// todo: massive cleanup here, fix reset as well
		$("#possible_moves_per_turn_table")[0].innerHTML = "";
		$("#possible_moves_per_turn_table").append($("<tr>").append(
			$("<th>"),
			header
		))

		for (let i = 1; i < Object.keys(this.possible_moves_per_turn).length; i++) {

			$("#possible_moves_per_turn_table").append($("<tr>").append(
					$("<th>", { text: "Turn " + i}),
					$("<td>", { text: this.possible_moves_per_turn[i]["X"]}),
					$("<td>", { text: this.possible_moves_per_turn[i]["O"]}),
					$("<td>", { text: this.possible_moves_per_turn[i]["tie"]}),
					$("<td>", { text: this.possible_moves_per_turn[i]["unknown"]}),
					$("<td>", { text: this.possible_moves_per_turn[i]["total"]})
			))
		}

		$("#possible_moves_per_turn_table").append($("<tr>").append(
				$("<th>", { text: "Total"}),
				$("<td>", { text: this.possible_moves_per_turn["total"]["X"]}),
				$("<td>", { text: this.possible_moves_per_turn["total"]["O"]}),
				$("<td>", { text: this.possible_moves_per_turn["total"]["tie"]}),
				$("<td>", { text: this.possible_moves_per_turn["total"]["unknown"]}),
				$("<td>", { text: this.possible_moves_per_turn["total"]["total"]})
		))
	}

	calculate_best_move() {
		var over_under = { "move" : undefined, "score" : undefined };
		var rows = [];
		Object.keys(this.move_tree["best_moves"]).forEach(move => {
			var wins_losses = this.move_tree["best_moves"][move];
			var score = wins_losses["wins"] - wins_losses["losses"];
			rows.push( { move: move, wins_losses : wins_losses, score: score });

			if (over_under["score"] === undefined || score > over_under["score"]) {
				over_under = { "move" : move, "score" : score };
	    }
		})
		this.display_best_move_table(rows);
		return over_under["move"];
	}

	display_best_move_table(rows) {
		// todo: move to page.js
		var fields = ["Move", "Wins", "Losses", "Score"];
		var header = fields.map(field => $("<th>", { text: field}));

		$("#possible_best_move_table")[0].innerHTML = "";
		$("#possible_best_move_table").append($("<tr>").append(header))

		rows.forEach(row => {
			$("#possible_best_move_table").append($("<tr>").append(
				$("<th>", { text : row["move"] }),
				$("<td>", { text : row["wins_losses"]["wins"] }),
				$("<td>", { text : row["wins_losses"]["losses"] }),
				$("<td>", { text : row["score"] })
			))
		})
	}
}
