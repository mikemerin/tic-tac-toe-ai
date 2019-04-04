class Rules {

	check_if_tied(board) {
		return board.every(row => {
			return row.every(cell => cell !== "" );
		})
	}

	check_if_winner(board) {
		var winner = false;
		this.get_win_lines(board).forEach(line => {
			if (line.every((value) => value === line[0] && line[0] != "")) {
				winner = line[0];
			};
		})
		return winner;
	}

	get_win_lines(board) {
		var win_lines = board;
		win_lines = win_lines.concat(this.get_columns(board));
		win_lines = win_lines.concat(this.get_diagonals(board));
		return win_lines;
	}

	get_columns(board) {
		return board.map((row, row_number) => {
			return board.map(column => column[row_number]);
		})
	}

	get_diagonals(board) {
		var diagonals = [];
	    var rows = board.length;
	    var cols = board[0].length;
	    var difference = rows-cols;

	    if (rows > cols) {
	    	board = board[0].map((col, i) => board.map(row => row[i]));
	    }

	    for(let i = 0; i <= Math.abs(cols-rows); i++) {
	    	diagonals.push( board.map((cell, col) => cell[col + i]) );
	    	diagonals.push( board.map((cell, col) => cell[cell.length - (col + i + 1)]) );
	    };

	    return diagonals;
	}
}
