class CPU {

	constructor() { // todo: input difficulty, then make the possible moves go X moves out based on difficulty
		this.difficulty = 10;
		this.move_tree = {};
		this.turn = "";
		this.reset_move_tree();
	}

	reset_move_tree() {
		this.move_tree = { "parent": "this.move_tree", "board" : {}, "moves" : "unknown" }; // todo: add score?
	}

	get_move() {
		var best_move = "";
		var board = page.board.board
		var current_branch = 0;
		var total_possible_moves = $(".empty").length;
		var number_of_moves_to_see = Math.round(total_possible_moves * this.difficulty/10) || 1;
		this.reset_move_tree();
		this.turn = page.game.turn;

		while (current_branch < number_of_moves_to_see) {
			if (current_branch === 0 ) {
				this.move_tree = this.create_branch(board);
			} else {
				var current_leaf = Object.values(this.move_tree)[0] //tmp, remove once loop is done
				// todo: turn here
				while (current_leaf["moves"] === "unknown") {
					var branch = this.create_branch(current_leaf["board"], current_leaf["parent"])
					var current_leaf = Object.values(branch)[0];
					console.log(current_leaf)
					// this.set_leaf_moves(current_leaf);
					// todo: turn here
				}
				// todo: can most likely remove the this.turn and change into var, will see (leave for end after working)
				// start with one brange and recursively complete it until no boards remain to resolve//
				debugger
				this.move_tree = this.function_here()
				// this.move_tree = this.create_the_rest_of_the_branches(board);
				//Object.value(this.move_tree).forEach(branch => {

				var current_leaf = Object.values(this.move_tree)[0] //tmp, remove once loop is done

				while (current_leaf["moves"] === "unknown") {
					var branch = this.create_branch(current_leaf["board"], current_leaf["parent"])
					var current_leaf = Object.values(branch)[0];
					console.log(current_leaf)
				}

				//})

				this.move_tree
				//make recursive here instead of iterating each time
				Object.values(current_branch_moves).map(move => move["parent"]).forEach(move => {
					var leaf = this.get_leaf(move)
			    if (typeof(leaf["moves"]) !== "string") {
						var branch = this.create_branch( leaf["moves"], leaf["parent"] );
						this.set_leaf( leaf["parent"], branch );
			    }
				})
			}
			this.change_turn();
			current_branch++;
			// debugger
		}
		debugger
		this.display_move_tree();
		// return this.get_top_move();
		// debugger
		return best_move;
	}

	create_branch(board, parent = ["this.move_tree"]) {
		// todo: may need a score system at top?
		var branch = {};
		board.forEach(row => {
			row.forEach(cell => {
				if (cell.value === "") {
					var board_after_move = this.get_board_after_move(board, cell.id);
					var next_move = this.get_next_move( board_after_move );
					branch[cell.id] = {};
					branch[cell.id]["parent"] = [...parent, cell.id];
					branch[cell.id]["board"] = board_after_move;
					branch[cell.id]["moves"] = next_move;
				};
			})
		})
		return branch;
	}

	get_board_after_move(board, move) {
		return board.map(row => {
			return row.map(cell => {
				var cell_value = (cell.id === move ? this.turn : cell.value);
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

	set_leaf_moves(current_leaf) {
		// debugger
// var mt = this.create_branch(page.board.board)
		var path = current_leaf["parent"].slice(1,-1);
		var curr = this.move_tree;
// var curr = mt;
		for (var i = 0; i < path.length; i++) {
			console.log("hit", i, path[i], curr[path[i]]);
			debugger
			curr = curr[path[i]];
		}
		debugger
		curr["moves"] = current_leaf;
	}
	// set_leaf(parent, replacement) {
	// 	var path = parent.slice(1);
	// 	var curr = this.move_tree;
	// 	for (var i = 0; i < path.length-1; i++) {
	// 		console.log("hit");
	// 		debugger
	// 		curr = curr[path[i]];
	// 	}
	// 	curr[path[i]]["moves"] = replacement;
	// }
	//
	// get_leaf(position) {
	// 	return position.slice(1).reduce((key, val) => key[val], this.move_tree);
	// }

	change_turn() {
		this.turn = (this.turn === "X" ? "O" : "X");
	}

	display_move_tree() {
		$("#move_tree")[0].innerText = JSON.stringify(this.move_tree);
	}
}
