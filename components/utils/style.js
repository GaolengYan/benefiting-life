const toLine = (name) => {
	return name.replace(/([A-Z])/g, '-$1').toLowerCase();
}
/**
 * style对象转化为style字符串
 * @return {string}
 */
export const getStyleStr = (styleObject) => {
	let transfrom = '';
	for (let i in styleObject) {
		let line = toLine(i);
		transfrom += line + ':' + styleObject[i] + ';';
	}
	return transfrom
}
