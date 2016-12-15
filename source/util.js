// steelblue: 70, 130, 180
import * as d3 from 'd3';

export const colorScale = (point, color, data) => {
    let min = 0;
    let max = 0;

    for (var i = 0; i < data.length; i++) {
        if (data[i] > max) max = data[i];
        if (data[i] < min) min = data[i];
    }

    const range = max - min;
    const spot = point - min;

    const ratio = spot / range;

    // Need to map it in reverse to the color.

    const red = 255 - (ratio * (255 - color[0]));
    const green = 255 - (ratio * (255 - color[1]));
    const blue = 255 - (ratio * (255 - color[2]));

    return `rgb(${parseInt(red)}, ${parseInt(green)}, ${parseInt(blue)})`;
}
