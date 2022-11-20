function rgba2hex(r: number, g: number, b: number, a?: number) {
	let red: string, green: string, blue: string;

	red = r.toString(16);
	if (r > 255) red = (255).toString(16);
	if (r < 0) red = (0).toString(16);
	green = g.toString(16);
	if (g > 255) green = (255).toString(16);
	if (g < 0) green = (0).toString(16);
	blue = b.toString(16);
	if (b > 255) blue = (255).toString(16);
	if (b < 0) blue = (0).toString(16);

	if (red.length === 1) red = '0' + red;
	if (green.length === 1) green = '0' + green;
	if (blue.length === 1) blue = '0' + blue;
	
	const hex = red+green+blue;
	
	if (typeof a !== 'undefined') {
		let alpha = Math.round((a <= 1 ? a : a / 100) * 255).toString(16).substring(0, 2);
		if (alpha.length === 1) alpha = '0' + alpha;
		return ('#' + hex + alpha);
	} else return ('#' + hex);
}

export { rgba2hex };
