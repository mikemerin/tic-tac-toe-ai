class CPU {

	constructor() {
		// todo: input difficulty, then make the possible moves go X moves out based on difficulty
		this.difficulty = 10;
		this.move_tree = {};
		// this.possible_moves = [];
		this.turn = "";
	}

	get_move() {
		var best_move = "";
		var board = page.board.board
		var current_node = [];
		var current_depth = 0;
		var total_possible_moves = $(".empty").length;
		var number_of_moves_to_see = Math.round(total_possible_moves * this.difficulty/10) || 1;
		this.move_tree = {};
		this.turn = page.game.turn;
		debugger
		while (current_depth < number_of_moves_to_see) {
			if (current_depth === 0 ) { // add test here if the node has moves remaining
				this.move_tree = this.get_move_tree(board);
			} else {
				debugger
				Object.keys(this.move_tree).forEach(move => {
					if (typeof(this.move_tree[move]) !== String) {
						this.move_tree[move] = this.get_move_tree(this.move_tree[move]);
				  }
				})
			}
			debugger
			this.change_turn();
			current_depth++;
			debugger
		}
		debugger
		this.display_move_tree();
		// return this.get_top_move();
		// debugger
		return best_move;
	}

	get_move_tree(board) {
		// todo: may need a score system at top?
		var move_tree = {};
		board.forEach(row => {
			row.forEach(cell => {
				if (cell.value === "") {
					var board_after_move = this.make_a_move(board, cell.id);
					var next_move = this.get_next_move( board_after_move );
					move_tree[cell.id] = next_move;
				};
			})
		})
		return move_tree;
	}

	make_a_move(board, move) { // todo: change name to something like "try a move"?
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
			next_move = winner; // Todo: change to +/- 1
		} else {
			next_move = board;
		}

		return next_move;
	}

	change_turn() {
		this.turn = (this.turn === "X" ? "O" : "X");
	}

	display_move_tree() {
		$("#move_tree")[0].innerText = JSON.stringify(this.move_tree);
	}
}
