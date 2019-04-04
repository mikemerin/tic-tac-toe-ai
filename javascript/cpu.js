class CPU {

	constructor() {
		this.difficulty = 1;
		this.possible_moves = {};
	}

	reset_possible_moves() {
		this.possible_moves = {};
	}

	set_possible_moves() {
		this.reset_possible_moves();
		$(".empty").each((i,x) => page.CPU.possible_moves[x.id] = {});
	}

	test_possible_moves() {
		var start_board = page.board.board;
		debugger
		Object.keys(this.possible_moves).forEach(cell => {
			debugger
		})
		debugger
	}

}
