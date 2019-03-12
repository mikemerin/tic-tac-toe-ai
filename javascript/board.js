class Gameplay {

	end_game(winner = "") {
		$(".playboard").each((i, cell) => $(cell).unbind() );
		var game_status = winner ? winner + " has won!" : "Tie game!";
		$("#game_status")[0].innerText = game_status;		
	}
	
	check_if_tied() {
		return this.board.every(row => {
			return row.every(cell => this.check_if_filled(cell) );
		})
	}
	
	check_if_winner() {
		var winner = false;

		this.get_win_lines(this.board).forEach(line => {
			if (line.every((value) => value === line[0] && line[0] != "")) {
				winner = line[0];
			};
		})

		return winner;
	}
	
	check_if_filled(cell) {
		return cell.indexOf("_") < 0;
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

class Board extends Gameplay {
	constructor() {
		super();
		this.board_size = "";
		this.board = [];
	}
	
	create_board(board_size) {
		this.board_size = board_size;
		for (let i = 0; i < this.board_size; i++) {
			var alphabet_array = create_alphabet_array(this.board_size).map(letter => letter + "_" + (i + 1));
			this.board.push(alphabet_array);
		}
	}
	
	reset_board() {
		this.board = [];
	}
	
	display_board() {
		
		$("#board_div")[0].innerHTML = "";
		$("#board_array")[0].innerHTML = "";
		
		var header = create_alphabet_array(this.board.length).map(letter => {
			return $("<td>", { class: "board_cell", text: letter });
	    })
	    
	    var body = this.board.map((row, row_number) => {
	    	var playboard = row.map(cell => {
	    		var text = this.check_if_filled(cell) ? cell : ""; 
	    		return $("<td>",  { class: 'playboard', id: cell, text: text });
	    	})
			
	    	return $("<tr>").append(
				$("<td>", { class: "board_cell", text: row_number + 1 }),
				playboard
			)
		})
		
		$("#board_div").append(
			$("<table>", { id: "board" }).append(
				$("<tr>").append(
					$("<td>"), header
				),
				body
			)
		);
		
		this.attach_listeners();
		
		$("#board_array").append( this.board.map(cell => $("<p>", { text: cell.join(", ") })) );
	}
	
	attach_listeners() {
		$(".playboard").each((i, cell) => {
			$(cell).click(e => {
				if ( this.check_if_filled(cell.id) ) {
					console.log("invalid move");					
				} else {
					var [col, row] = cell.id.split("_");
					col = col.charCodeAt() - 65;
					row = parseInt(row, 10) - 1;
					this.board[row][col] = "X";
					this.display_board();
					var winner = this.check_if_winner();
					if ( winner ) {
						this.end_game(winner);
					} else if ( this.check_if_tied() ) {
						this.end_game();
					}
				}
		    })
		})
	}
}

