document.addEventListener("DOMContentLoaded", function(e) {
	console.log("ready!")
})


function create_board(board_size) {
	var board = [];
	for (let i = 0; i < board_size; i++) {
		var row = [];
		for (let r = 1; r <= board_size; r++) {
    		row.push(i*board_size + r);
        }
		board.push(row);
	}

	return board;
}

function create_board(board_size) {
	var board = [];
	for (let i = 0; i < board_size; i++) {
		var row = [];
		for (let r = 1; r <= board_size; r++) {
    		row.push(i*board_size + r);
        }
		board.push(row);
	}

	return board;
}

//------------------------------------------------------------------

function check_if_winner(board) {
	winner = false;

	get_win_lines(board).forEach(line => {
		if (line.every((value) => value === line[0])) {
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

function draw_board(board) {
	console.log(
	board.forEach((row, row_number) => {
		console.log( row_number + 1 + " - | " + row.join(" | ") + " |");
	})
}

//------------------------------------------------------------------

var board_size = 3;
var board = create_board(board_size);

