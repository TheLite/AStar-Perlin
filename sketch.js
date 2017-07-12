var map;
var astar;
var path = new Array();

var start;
var end;

function setup() {
    createCanvas(500, 500);
    smooth();
    colorMode(HSB);

    map = new Map(width/2, height/2);
    astar = new AStar(map);
    while(true)
    {
        start = map.TileMap[round(random(0, map.xCount-1))][round(random(0, map.yCount-1))];
        if(!start.obstacle()) break;
    }
    while(true)
    {
        end = map.TileMap[round(random(0, map.xCount-1))][round(random(0, map.yCount-1))];
        if(!end.obstacle() && end != start) break;
    }
    path = astar.findPath(start, end);
}

function draw() {
    background(0);
    map.render();

    var w = width / map.xCount;
    var h = height / map.yCount;

    noFill();
    stroke(250,75,255);
    strokeWeight(2);

    beginShape();
    for(var i = 0; i < path.length; i++)
    {
        curveVertex(path[i].i*w, path[i].j*h);
    }
    endShape();

    fill(299, 50, 255);
    stroke(0,0,0);
    strokeWeight(1);
    ellipse(start.i*w+(w/2), start.j*h+(h/2), w*2, h*2)
    ellipse(end.i*w+(w/2), end.j*h+(h/2), w*2, h*2)

    stroke(0,0,0);
    noFill();
    rect(0,0,width-1,height-1);
    noLoop();
}