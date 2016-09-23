function getPos(i) {
	return cellSpace + i * (cellSpace + gridCellWidth);
}

function getNumberBackgroundColor(number) {
	switch (number) {
		case 2:
			return "#eee4da";
			break;
		case 4:
			return "#ede0c8";
			break;
		case 8:
			return "#f2b179";
			break;
		case 16:
			return "#f59563";
			break;
		case 32:
			return "#f67c5f";
			break;
		case 64:
			return "#f65e3b";
			break;
		case 128:
			return "#edcf72";
			break;
		case 256:
			return "#edcc61";
			break;
		case 512:
			return "#9c0";
			break;
		case 1024:
			return "#33b5e5";
			break;
		case 2048:
			return "#09c";
			break;
		case 4096:
			return "#a6c";
			break;
		case 8192:
			return "#93c";
			break;
	}

	return "black";
}

function getNumberColor(number) {
	if (number <= 4)
		return "#776e65";

	return "white";
}

function getNumberText(number) {
	switch (number) {
		case 2:
			return "小白";
			break;
		case 4:
			return "实习生";
			break;
		case 8:
			return "程序猿";
			break;
		case 16:
			return "项目经理";
			break;
		case 32:
			return "架构师";
			break;
		case 64:
			return "技术经理";
			break;
		case 128:
			return "高级经理";
			break;
		case 256:
			return "技术总监";
			break;
		case 512:
			return "副总裁";
			break;
		case 1024:
			return "CTO";
			break;
		case 2048:
			return "总裁";
			break;
		case 4096:
			return "天神";
			break;
		case 8192:
			return "佛祖";
			break;
		default:
			return "black";
	}

}

function noSpace() {
	for (let i = 0; i < 4; i++)
		for (let j = 0; j < 4; j++) {
			if (board[i][j] === 0) {
				return false;
			}
		}

	return true;
}

function canMoveLeft() {
	for (let i = 0; i < 4; i++)
		for (let j = 1; j < 4; j++) {
			if (board[i][j] != 0)
				if (board[i][j - 1] === 0 || board[i][j - 1] === board[i][j])
					return true;
		}

	return false;
}

function canMoveUp() {
	for (let j = 0; j < 4; j++)
		for (let i = 1; i < 4; i++) {
			if (board[i][j] != 0)
				if (board[i - 1][j] === 0 || board[i - 1][j] === board[i][j])
					return true;
		}

	return false;
}

function canMoveRight() {
	for (let i = 0; i < 4; i++)
		for (let j = 2; j >= 0; j--) {
			if (board[i][j] != 0)
				if (board[i][j + 1] === 0 || board[i][j + 1] === board[i][j])
					return true;
		}

	return false;
}

function canMoveDown() {
	for (let j = 0; j < 4; j++)
		for (let i = 2; i >= 0; i--) {
			if (board[i][j] != 0)
				if (board[i + 1][j] === 0 || board[i + 1][j] === board[i][j])
					return true;
		}

	return false;
}

function noBlockHorizontal(row, col1, col2) {
	for (let i = col1 + 1; i < col2; i++)
		if (board[row][i] != 0)
			return false;

	return true;
}

function noBlockVertical(col, row1, row2) {
    for (let i = row1 + 1; i < row2; i++)
        if (board[i][col] != 0)
            return false;

    return true;
}

function updateScore(score) {
    $(".score").text(score);
}

function noMove() {
    if(canMoveUp() || canMoveDown() || canMoveLeft() || canMoveRight())
        return false;
    return true;
}