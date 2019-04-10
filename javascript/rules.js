class Rules {

	check_if_end_of_game(board) {
		var board_array = this.convert_board_to_array(board);
		var tied = this.check_if_tied(board_array);
		var winner = this.check_if_winner(board_array);
		return [tied, winner];
	}

	convert_board_to_array(board) {
		return board.map(row => {
			return row.map(cell => {
				return cell.value;
	    })
		})
	}

	check_if_tied(board_array) {
		return board_array.every(row => {
			return row.every(cell => cell !== "" );
		})
	}

	check_if_winner(board_array) {
		var winner = false;
		this.get_win_lines(board_array).forEach(line => {
			if (line.every((value) => value === line[0] && line[0] != "")) {
				winner = line[0];
			};
		})
		return winner;
	}

	get_win_lines(board_array) {
		var win_lines = board_array;
		win_lines = win_lines.concat(this.get_columns(board_array));
		win_lines = win_lines.concat(this.get_diagonals(board_array));
		return win_lines;
	}

	get_columns(board_array) {
		return board_array.map((row, row_number) => {
			return board_array.map(column => column[row_number]);
		})
	}

	get_diagonals(board_array) {
		var diagonals = [];
	    var rows = board_array.length;
	    var cols = board_array[0].length;

	    if (rows > cols) {
	    	board_array = board_array[0].map((col, i) => board_array.map(row => row[i]));
	    }

	    for(let i = 0; i <= Math.abs(cols-rows); i++) {
	    	diagonals.push( board_array.map((cell, col) => cell[col + i]) );
	    	diagonals.push( board_array.map((cell, col) => cell[cell.length - (col + i + 1)]) );
	    };

	    return diagonals;
	}
}
