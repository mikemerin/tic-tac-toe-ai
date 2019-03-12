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
	    var diagonal_left = [];
	    var diagonal_right = [];

	    board.forEach((row, row_number) => {
	        diagonal_left.push( row[row.length - row_number - 1] );
	        diagonal_right.push( row[row_number] );
	    })
	    return [diagonal_left, diagonal_right];
	}
}