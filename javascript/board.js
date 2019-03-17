class Board {
	
	constructor() {
		this.board = [];
		this.board_array = "";
		this.board_size = "3x3";		
	}
	
	clear_board() {
		this.board = [];
		this.board_array = "";
	}
	
	create_board() {
		var [cols, rows] = this.board_size.split("x").map(x => parseInt(x, 10));
		for (let i = 0; i < cols; i++) {
			var row = page.create_alphabet_array(rows).map(letter => {
			    return { id: letter + "_" + (i + 1), value: "" }
			})
			this.board.push(row);
		}
	}
	
	display_board() {
		$("#board")[0].innerHTML = "";

		var header = this.board[0].map(cell => {
			var text = cell.id.split("_")[0]
			return $("<td>",  { class: "board_cell", text: text });
		})
	    
	    var body = this.board.map((row, row_number) => {
	    	var playboard = row.map(cell => {
	    		return $("<td>",  { class: 'playboard', id: cell.id, text: cell.value });
	    	})
			
	    	return $("<tr>").append(
				$("<td>", { class: "board_cell", text: row_number + 1 }),
				playboard
			)
		})
		
		$("#board").append(
			$("<tr>").append(
				$("<td>"), header
			),
			body
		);
		
//		debugger
		
//		$("#board_analytics").append( board_analytics );
//		$("#board_array").append( this.board.map(cell => $("<p>", { text: cell.join(", ") })) );
	}
	
	reset_board() {
		this.board = [];
	}
	
	set_board_array() {
		this.board_array = this.board.map(row => {
			return row.map(cell => {
				return cell.value
		    })
		})
	}
	
}

