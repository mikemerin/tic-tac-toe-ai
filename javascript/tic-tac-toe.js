class tictactoe {
	constructor(board_size) {
		this.board_size = board_size;
	}


}

function create_board(board_size) {
	var board = [];
	for (let i = 0; i < board_size; i++) {
		var alphabet_array = create_alphabet_array(board_size).map(letter => letter + (i + 1));
		board.push(alphabet_array );
	}
	return board;
}

function create_alphabet_array(letters) {
	var alphabet_array = [];
	for(let char = 65; char < 65 + letters; char++) {
        alphabet_array.push(String.fromCharCode(char))
    }
	return alphabet_array;
}

//------------------------------------------------------------------

function check_if_winner(board) {
	winner = false;

	get_win_lines(board).forEach(line => {
		if (line.every((value) => value === line[0] && lines[0] != "")) {
			winner = line[0];
		};
	})
	console.log(draw_board(board));
	console.log(winner);
	return winner;
}

function get_win_lines(board) {
	var win_lines = board;
	win_lines = win_lines.concat(get_columns(board));
	win_lines = win_lines.concat(get_diagonals(board));
	return win_lines;
}

function get_columns(board) {
	return board.map((row, row_number) => {
		return board.map(column => column[row_number]);
	})
}

function get_diagonals(board) {

    var diagonal_left = [];
    var diagonal_right = [];

    board.forEach((row, row_number) => {
        diagonal_left.push( row[row.length - row_number - 1] );
        diagonal_right.push( row[row_number] );
    })

    return [diagonal_left, diagonal_right];

}

//------------------------------------------------------------------

var test_boards = [
	[["X","X","X"],[4,5,6],[7,8,9]],
	[["X","X","O"],[4,5,6],[7,8,9]],
	[[1,"X","X"],["X",5,6],[7,8,9]],
	[[1,2,3],["X","X","X"],[7,8,9]],
	[[1,2,3],[4,5,6],["X","X","X"]],
	[["X",2,3],["X",5,6],["X",8,9]],
	[[1,"X",3],[4,"X",6],[7,"X",9]],
	[[1,2,"X"],[4,5,"X"],[7,8,"X"]],
	[["X",2,3],[4,"X",6],[7,8,"X"]],
	[[1,2,"X"],[4,"X",6],["X",8,9]]
]

//------------------------------------------------------------------

function reset_page() {
	$("#instructions")[0].innerText = "What size board would you like to play?";
	$("#controls")[0].innerText = "3";
	$("#controls").click(e => {
		start_game(parseInt(e.target.innerText, 10));
	})
	$("#board")[0].innerHTML = "";
}

function start_game(board_size) {
	var board = create_board(board_size);
	draw_board(board);
	$("#controls")[0].innerText = "Restart";
	$("#controls").click(e => {
		reset_page();
	})
}

function draw_board(board) {
	//ToDo: turn into jQuery;
	var board_HTML = "<table><tr><td></td>";
	create_alphabet_array(board.length).forEach(letter => {
		board_HTML += "<td>" + letter + "</td>";
    	})
	board_HTML += "</tr>";
	
	board.forEach((row, row_number) => {
		board_HTML += "<tr><td>" + (row_number + 1) + "</td>" +
				"<td class='playboard'>" + row.join("</td><td class='playboard'>") + "</td></tr>";
	})
	board_HTML += "</table>";
	document.getElementById("board").innerHTML = board_HTML;
}

function player_turn() {
	$("#instructions")[0].innerText = "Player X's Turn";
}

document.addEventListener("DOMContentLoaded", function(e) {
	reset_page();
});
