function showNumberWithAnimation(i, j, num) {
	let numCell = $("#number-cell-" + i + "-" + j);
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
	let numCell = $("#number-cell-" + fromX + "-" + fromY);

	numCell.animate({
		top: getPos(toX),
		left: getPos(toY)
	}, 200);
}
