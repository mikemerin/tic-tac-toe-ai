class Board {
	constructor() {
		this.board_size = 3;
		this.board = [];
	}
	
	create_board(board_size) {
		this.board_size = board_size;
		for (let i = 0; i < this.board_size; i++) {
			var alphabet_array = create_alphabet_array(this.board_size).map(letter => letter + (i + 1));
			this.board.push(alphabet_array);
		}
	}
	
	reset_board() {
		this.board = [];
	}
	
	display_board() {
		var board_HTML = "<table><tr><td></td>";
		create_alphabet_array(this.board.length).forEach(letter => {
			board_HTML += "<td>" + letter + "</td>";
	    	})
		board_HTML += "</tr>";
		
		this.board.forEach((row, row_number) => {
			board_HTML += "<tr><td>" + (row_number + 1) + "</td>" +
					"<td class='playboard'>" + row.join("</td><td class='playboard'>") + "</td></tr>";
		})
		board_HTML += "</table>";
		document.getElementById("board").innerHTML = board_HTML;
	}
	
	check_if_winner() {
		winner = false;

		get_win_lines(this.board).forEach(line => {
			if (line.every((value) => value === line[0] && line[0] != "")) {
				winner = line[0];
			};
		})
		console.log(winner);
		return winner;
	}

	get_win_lines() {
		var win_lines = this.board;
		win_lines = win_lines.concat(this.get_columns(this.board));
		win_lines = win_lines.concat(this.get_diagonals(this.board));
		return win_lines;
	}

	get_columns() {
		return this.board.map((row, row_number) => {
			return this.board.map(column => column[row_number]);
		})
	}

	get_diagonals() {
	    var diagonal_left = [];
	    var diagonal_right = [];

	    this.board.forEach((row, row_number) => {
	        diagonal_left.push( row[row.length - row_number - 1] );
	        diagonal_right.push( row[row_number] );
	    })
	    return [diagonal_left, diagonal_right];
	}
	
}