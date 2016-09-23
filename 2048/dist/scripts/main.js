"use strict";

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
	if (number <= 4) return "#776e65";

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
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] === 0) {
				return false;
			}
		}
	}return true;
}

function canMoveLeft() {
	for (var i = 0; i < 4; i++) {
		for (var j = 1; j < 4; j++) {
			if (board[i][j] != 0) if (board[i][j - 1] === 0 || board[i][j - 1] === board[i][j]) return true;
		}
	}return false;
}

function canMoveUp() {
	for (var j = 0; j < 4; j++) {
		for (var i = 1; i < 4; i++) {
			if (board[i][j] != 0) if (board[i - 1][j] === 0 || board[i - 1][j] === board[i][j]) return true;
		}
	}return false;
}

function canMoveRight() {
	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			if (board[i][j] != 0) if (board[i][j + 1] === 0 || board[i][j + 1] === board[i][j]) return true;
		}
	}return false;
}

function canMoveDown() {
	for (var j = 0; j < 4; j++) {
		for (var i = 2; i >= 0; i--) {
			if (board[i][j] != 0) if (board[i + 1][j] === 0 || board[i + 1][j] === board[i][j]) return true;
		}
	}return false;
}

function noBlockHorizontal(row, col1, col2) {
	for (var i = col1 + 1; i < col2; i++) {
		if (board[row][i] != 0) return false;
	}return true;
}

function noBlockVertical(col, row1, row2) {
	for (var i = row1 + 1; i < row2; i++) {
		if (board[i][col] != 0) return false;
	}return true;
}

function updateScore(score) {
	$(".score").text(score);
}

function noMove() {
	if (canMoveUp() || canMoveDown() || canMoveLeft() || canMoveRight()) return false;
	return true;
}
//# sourceMappingURL=support.js.map

"use strict";

function showNumberWithAnimation(i, j, num) {
	var numCell = $("#number-cell-" + i + "-" + j);
	numCell.css('background-color', getNumberBackgroundColor(num));
	numCell.css('color', getNumberColor(num));
	numCell.text(getNumberText(num));

	numCell.animate({
		width: gridCellWidth,
		height: gridCellWidth,
		top: getPos(i),
		left: getPos(j)
	}, 100);
}

function showMoveAnimation(fromX, fromY, toX, toY) {
	var numCell = $("#number-cell-" + fromX + "-" + fromY);

	numCell.animate({
		top: getPos(toX),
		left: getPos(toY)
	}, 200);
}
//# sourceMappingURL=animation.js.map

"use strict";

var board = []; // 棋盘格
var score = 0; // 分数
var hasConflicted = []; //
var keyDelay = 210;
var overDelay = 300;

var documentWidth = window.screen.availWidth; // 文档的有效可视距离
var gridContainerWidth = 0.92 * documentWidth; // 棋盘宽度
var gridCellWidth = 0.18 * documentWidth; // 棋盘格宽度
var cellSpace = 0.04 * documentWidth; // 间距

// 触碰坐标
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;
$(function () {
	mediaMobile();
	newGame();
	handlerEvent();
	$("#againBtn").click(function (event) {
		// 初始化棋盘格,
		newGame();
	});
});

/**
 * 适配手机
 * @return {[type]} [description]
 */
function mediaMobile() {
	if (documentWidth > 500) {
		gridContainerWidth = 500;
		gridCellWidth = 100;
		cellSpace = 20;
	}
	$(".grid-container").css({
		"width": gridContainerWidth - 2 * cellSpace,
		"height": gridContainerWidth - 2 * cellSpace,
		"padding": cellSpace,
		"border-radius": 0.02 * gridContainerWidth
	});

	$(".grid-cell").css({
		"width": gridCellWidth,
		"height": gridCellWidth,
		"border-radius": 0.02 * gridContainerWidth
		// "line-height": gridCellWidth,
		// "font-size": "40px"
	});
}

/**
 * 点击按钮
 * @return {[type]} [description]
 */
function newGame() {
	//初始化棋盘格
	init();
	//在随机两个格子生成数字
	generateOneNum();
	generateOneNum();
}

/**
 * 初始化棋盘格
 * @return {[type]} [description]
 */
function init() {
	board = [];
	hasConflicted = [];
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var gridCell = $("#grid-cell" + "-" + i + "-" + j);
			console.log(gridCell);
			gridCell.css("top", getPos(i));
			gridCell.css("left", getPos(j));
		}
	}for (var _i = 0; _i < 4; _i++) {
		var tmp = [0, 0, 0, 0];
		var tmp2 = [false, false, false, false];
		board.push(tmp);
		hasConflicted.push(tmp2);
	}

	updateBoardView();
	score = 0;
	updateScore(score);
}

/**
 * 键盘事件绑定
 * @return {[type]} [description]
 */
function handlerEvent() {
	$(document).keydown(function (event) {
		switch (event.keyCode) {
			case 37:
				// 左
				if (moveLeft()) {
					setTimeout("generateOneNum()", keyDelay);
					setTimeout("isGameOver()", overDelay);
				}
				break;
			case 38:
				// 上
				if (moveUp()) {
					setTimeout("generateOneNum()", keyDelay);
					setTimeout("isGameOver()", overDelay);
				}
				break;
			case 39:
				// 右
				if (moveRight()) {
					setTimeout("generateOneNum()", keyDelay);
					setTimeout("isGameOver()", overDelay);
				}
				break;
			case 40:
				// 下
				if (moveDown()) {
					setTimeout("generateOneNum()", keyDelay);
					setTimeout("isGameOver()", overDelay);
				}
				break;
			default:
				return true;

		}
		return false;
	});

	// 开始触碰事件
	document.addEventListener("touchstart", function (event) {
		startX = event.touches[0].pageX;
		startY = event.touches[0].pageY;
	});

	document.addEventListener("touchmove", function (event) {
		event.preventDefault();
	});
	// 触碰结束事件
	document.addEventListener("touchend", function (event) {
		endX = event.changedTouches[0].pageX;
		endY = event.changedTouches[0].pageY;

		var disX = endX - startX; // X轴滑动距离
		var disY = endY - startY; // Y轴滑动距离

		if (Math.abs(disX) < 0.3 * documentWidth && Math.abs(disY) < 0.3 * documentWidth) return false;

		if (Math.abs(disX) >= Math.abs(disY)) {
			if (disX < 0) {
				if (moveLeft()) {
					setTimeout("generateOneNum()", keyDelay);
					setTimeout("isGameOver()", overDelay);
				}
			} else if (moveRight()) {
				setTimeout("generateOneNum()", keyDelay);
				setTimeout("isGameOver()", overDelay);
			}
		} else {
			if (disY < 0) {
				if (moveUp()) {
					setTimeout("generateOneNum()", keyDelay);
					setTimeout("isGameOver()", overDelay);
				}
			} else if (moveDown()) {
				setTimeout("generateOneNum()", keyDelay);
				setTimeout("isGameOver()", overDelay);
			}
		}
		return false;
	});
}

/**
 * 游戏结束处理
 * @return {Boolean} [description]
 */
function isGameOver() {
	if (noSpace() && noMove()) {
		gameOver();
	}

	function gameOver() {
		alert('游戏结束，真是菜');
	}
}

/**
 * 向左移动操作
 * @return {[type]} [description]
 */
function moveLeft() {
	if (!canMoveLeft()) return false;

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] != 0) {
				for (var k = 0; k < j; k++) {
					if (noBlockHorizontal(i, k, j)) {
						if (board[i][k] === 0) {
							showMoveAnimation(i, j, i, k);

							board[i][k] = board[i][j];
							board[i][j] = 0;
							continue;
						} else if (board[i][k] === board[i][j]) {
							showMoveAnimation(i, j, i, k);

							board[i][k] += board[i][j];
							board[i][j] = 0;

							score += board[i][k];
							updateScore(score);
							continue;
						}
					}
				}
			}
		}
	}setTimeout("updateBoardView()", 200);
	return true;
}

/**
 * 向上移动操作
 * @return {[type]} [description]
 */
function moveRight() {
	if (!canMoveRight()) return false;

	for (var i = 0; i < 4; i++) {
		for (var j = 2; j >= 0; j--) {
			if (board[i][j] != 0) {
				for (var k = 3; k > j; k--) {
					if (noBlockHorizontal(i, j, k)) {
						if (board[i][k] === 0) {
							showMoveAnimation(i, j, i, k);

							board[i][k] = board[i][j];
							board[i][j] = 0;
							continue;
						} else if (board[i][k] === board[i][j]) {
							showMoveAnimation(i, j, i, k);

							board[i][k] += board[i][j];
							board[i][j] = 0;

							score += board[i][k];
							updateScore(score);
							continue;
						}
					}
				}
			}
		}
	}setTimeout("updateBoardView()", 200);
	return true;
}

/**
 * 向上移动操作
 * @return {[type]} [description]
 */
function moveUp() {
	if (!canMoveUp()) return false;

	for (var j = 0; j < 4; j++) {
		for (var i = 1; i < 4; i++) {
			if (board[i][j] != 0) {
				for (var k = 0; k < i; k++) {
					if (noBlockVertical(j, k, i)) {
						if (board[k][j] === 0) {
							showMoveAnimation(i, j, k, j);

							board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						} else if (board[k][j] === board[i][j]) {
							showMoveAnimation(i, j, k, j);

							board[k][j] += board[i][j];
							board[i][j] = 0;

							score += board[k][j];
							updateScore(score);
							continue;
						}
					}
				}
			}
		}
	}setTimeout("updateBoardView()", 200);
	return true;
}

/**
 * 向上移动操作
 * @return {[type]} [description]
 */
function moveDown() {
	if (!canMoveDown()) return false;

	for (var j = 0; j < 4; j++) {
		for (var i = 2; i >= 0; i--) {
			if (board[i][j] != 0) {
				for (var k = 3; k > i; k--) {
					if (noBlockVertical(j, i, k)) {
						if (board[k][j] === 0) {
							showMoveAnimation(i, j, k, j);

							board[k][j] = board[i][j];
							board[i][j] = 0;
							continue;
						} else if (board[k][j] === board[i][j]) {
							showMoveAnimation(i, j, k, j);

							board[k][j] += board[i][j];
							board[i][j] = 0;

							score += board[k][j];
							updateScore(score);
							continue;
						}
					}
				}
			}
		}
	}setTimeout("updateBoardView()", 200);
	return true;
}

/**
 * 更新数字版信息
 * @return {[type]} [description]
 */
function updateBoardView() {
	// 清除数字格
	console.log('length');
	console.log($(".number-cell").length);
	$(".number-cell").remove();
	console.log('lengthEnd');
	console.log($(".number-cell").length);
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$(".grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
			var $numCell = $("#number-cell-" + i + "-" + j);
			if (board[i][j] == 0) {
				$numCell.css('width', '0px');
				$numCell.css('height', '0px');
				$numCell.css('top', getPos(i) + gridCellWidth / 2);
				$numCell.css('left', getPos(j) + gridCellWidth / 2);
			} else {
				$numCell.css('width', gridCellWidth);
				$numCell.css('height', gridCellWidth);
				$numCell.css('top', getPos(i));
				$numCell.css('left', getPos(j));
				$numCell.css('background-color', getNumberBackgroundColor(board[i][j]));
				$numCell.css('color', getNumberColor(board[i][j]));
				$numCell.text(getNumberText(board[i][j]));
			}
			hasConflicted[i][j] = false;
		}
	}$('.number-cell').css('line-height', gridCellWidth + 'px');
	$('.number-cell').css('font-size', 0.2 * gridCellWidth + 'px');
}

/**
 * 随机生成数字
 * @return {[type]} [description]
 */
function generateOneNum() {
	if (noSpace(board)) return false;

	// 随机一个位置
	var ranX = parseInt(Math.floor(Math.random() * 4));
	var ranY = parseInt(Math.floor(Math.random() * 4));
	console.log(ranX);
	console.log(ranY);
	var times = 0;
	while (times++ < 50) {
		if (board[ranX][ranY] === 0) break;

		ranX = parseInt(Math.floor(Math.random() * 4));
		ranY = parseInt(Math.floor(Math.random() * 4));
	}

	// 人工赋值
	if (times === 50) {
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (board[i][j] === 0) {
					ranX = i;
					ranY = j;
				}
			}
		}
	}

	// 随机一个数字
	var ranNumber = Math.random() < 0.5 ? 2 : 4;
	board[ranX][ranY] = ranNumber;
	console.log(board);
	console.log('num------------');

	showNumberWithAnimation(ranX, ranY, ranNumber);
	return true;
}
//# sourceMappingURL=main.js.map
