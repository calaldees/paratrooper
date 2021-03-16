// https://stackoverflow.com/a/28866825
// doctest?! Explain
function isIntersecting(p1, p2, p3, p4) {
    function CCW(p1, p2, p3) {
        //return (p3.y - p1.y) * (p2.x - p1.x) > (p2.y - p1.y) * (p3.x - p1.x);
        return (p3[1] - p1[1]) * (p2[0] - p1[0]) > (p2[1] - p1[1]) * (p3[0] - p1[0]);
    }
    return (CCW(p1, p3, p4) != CCW(p2, p3, p4)) && (CCW(p1, p2, p3) != CCW(p1, p2, p4));
}


class Polygon {
    constructor() {
        this.points = [];
    }
    addPoint(point) {
        this.points.push([...point]);
    }
    * lines() {
        if (!this.points.length) {return;}
        let b = undefined;
        for (let a of this.points) {
            if (a && b) {
                yield [a, b];
            }
            b = a;
        }
        yield [...b, ...this.points[0]];
    }
    isInside(point) {
        let intersections = 0;
        for (let line of this.lines()) {
            if (isIntersecting(...line, point, [-1, -2])) {  // kind of rubbish hard coding ... maybe use int.min?
                intersections++;
                //console.log("oow"); // something up here
            }
        }
        return intersections % 2;  // return 0 for no collision and 1 for collision
    }
    get Path2D() {
        //debugger;
        const p = new Path2D();
        if (!this.points.length) {return p;}
        // duplicated from lines? optimise
        let b = undefined;
        for (let a of this.points) {
            if (!b) {p.moveTo(...a)}
            else {p.lineTo(...a);}
            b = a ;
        }
        p.lineTo(...this.points[0]);
        return p;
    }
}



const screenPoly = new Polygon();
for (let p of [
    [0,0],
    [50,0],
    [50,50],
    [0,50],
]) {
    screenPoly.addPoint(p);
}
