class CPU {

	constructor() {
		this.possible_moves = {};
	}

	get_possible_moves() {
		page.board.board.forEach(row => {
			row.forEach(cell => {
		        if (cell.value === "") { this.possible_moves[cell.id] = 0 };
		    })
		})
	}

	test_possible_moves() {
		var temp_board = page.board.board;
		Object.keys(this.possible_moves).forEach(cell => {
			debugger
		})
		debugger
	}

	set_board_array() {
		this.board_array = this.board.map(row => {
			return row.map(cell => {
				return cell.value
		    })
		})
	}


}
