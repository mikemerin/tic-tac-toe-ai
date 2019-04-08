class CPU {

	constructor() { // todo: input difficulty, then make the possible moves go X moves out based on difficulty
		this.difficulty = 10;
		this.number_of_moves_to_look_ahead = "";
		this.move_tree = {};
		this.possible_moves_per_turn = { "total": { "total" : 0, "X": 0, "O": 0, "tie": 0, "unknown": 0 }};
	}

	get_best_move() {
		var best_move = "";
		var turn = page.game.turn === "X" ? "O" : "X";

		var empty_spaces = $(".empty").length;

		this.number_of_moves_to_look_ahead = Math.round(empty_spaces * this.difficulty/10) || 1; // todo: implement
		this.move_tree = { "parent": ["this.move_tree"], "board" : page.board.board, "moves" : "unknown" }; // todo: add score?

		this.move_tree["moves"] = this.get_all_next_moves(this.move_tree, turn); // todo: limit moves here
		this.display_possible_moves_per_turn();
		// debugger // todo: pick up here

		// this.display_move_tree(move_tree);
		// return this.get_top_move();
		return Object.keys(this.move_tree["moves"])[0] //tmp, to remove once actual best move algorithm is placed in
		return best_move;
	}

	get_all_next_moves(branch, turn) {
		var all_next_moves = {};
		turn = (turn === "X" ? "O" : "X");

		branch["board"].forEach(row => {
			row.forEach(cell => {
				if (cell.value === "") {
					var board_after_move = this.get_board_after_move(branch["board"], cell.id, turn);
					var next_move = this.get_next_move( board_after_move );
					this.calculate_possible_moves_per_turn(next_move, branch["parent"].length)
					all_next_moves[cell.id] = {"parent" : [...branch["parent"], cell.id], "board" :board_after_move, "moves" : next_move };

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

		if (tied) {
			next_move = "tie"
		} else if (winner) {
			next_move = winner; // todo: change to +/- 1
		} else {
			next_move = "unknown";
		}
		return next_move;
	}

	calculate_possible_moves_per_turn(move, turn_number) {
		if (!this.possible_moves_per_turn[turn_number]) {
			this.possible_moves_per_turn[turn_number] = { "total" : 0, "X": 0, "O": 0, "tie": 0, "unknown": 0 };
		}
		this.possible_moves_per_turn["total"][move]++;
		this.possible_moves_per_turn["total"]["total"]++;
		this.possible_moves_per_turn[turn_number][move]++;
		this.possible_moves_per_turn[turn_number]["total"]++;
	}

// 	set_branch_moves(current_branch, move_tree) {
// 		// debugger
// // var mt = this.create_branch(page.board.board)
// 		var path = current_branch["parent"].slice(1,-1);
// 		var curr = move_tree;
// 		for (var i = 0; i < path.length; i++) {
// 			curr = curr[path[i]];
// 		}
// 		curr["moves"] = {};
// 		curr["moves"][current_branch["parent"].slice(-1)] = current_leaf;
// 	}

	display_possible_moves_per_turn() {
		// todo: massive cleanup here, fix reset as well
		$("#possible_moves_per_turn_table").html($("<tr>").append(
			$("<th>"),
			$("<th>", { text: "X"}),
			$("<th>", { text: "O"}),
			$("<th>", { text: "Tie"}),
			$("<th>", { text: "N/A"}),
			$("<th>", { text: "Total"})
		))

		for (let i = 1; i < Object.keys(this.possible_moves_per_turn).length; i++) {
			$("#possible_moves_per_turn_table").append($("<tr>").append(
					$("<th>", { text: "Turn " + i}),
					$("<th>", { text: this.possible_moves_per_turn[i]["X"]}),
					$("<th>", { text: this.possible_moves_per_turn[i]["O"]}),
					$("<th>", { text: this.possible_moves_per_turn[i]["tie"]}),
					$("<th>", { text: this.possible_moves_per_turn[i]["unknown"]}),
					$("<th>", { text: this.possible_moves_per_turn[i]["total"]})
			))
		}

		$("#possible_moves_per_turn_table").append($("<tr>").append(
				$("<th>", { text: "Total"}),
				$("<th>", { text: this.possible_moves_per_turn["total"]["X"]}),
				$("<th>", { text: this.possible_moves_per_turn["total"]["O"]}),
				$("<th>", { text: this.possible_moves_per_turn["total"]["tie"]}),
				$("<th>", { text: this.possible_moves_per_turn["total"]["unknown"]}),
				$("<th>", { text: this.possible_moves_per_turn["total"]["total"]})
		))
	}

	display_move_tree() {
		$("#move_tree")[0].innerText = JSON.stringify(this.move_tree);
	}
}
