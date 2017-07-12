function Map(xCount, yCount)
{
    this.xCount = xCount;
    this.yCount = yCount;

    this.TileMap = new Array(xCount);
    for(var i = 0; i < xCount; i++)
    {
        this.TileMap[i] = new Array(yCount);
        for(var j = 0; j < yCount; j++)
            this.TileMap[i][j] = new Tile(i, j);
    }

    this.render = function ()
    {
        for(var i = 0; i < this.xCount; i++)
            for(var j = 0; j < this.yCount; j++)
                this.TileMap[i][j].draw(width / this.xCount, height / this.yCount);
    }

}

function Tile(i, j)
{
    this.i = i;
    this.j = j;
    this.threshold = 0.133;
    this.heat = noise(this.i*this.threshold, this.j*this.threshold);
    this.heatColor = map(this.heat, 0.0, 1.0, 0, 255);

    this.obstacle = function()
    {
        if(this.heat < 0.25) return true;
        else if(this.heat > 0.75) return true;
        return false;
    }

    this.dificulty = function()
    {
        return pow(this.heat + (-0.5), 2)*pow(3, 2);
    }

    this.draw = function(w,h)
    {
        noStroke();
        fill(this.heatColor, 50, 255);
        rect(this.i*w, this.j*h, w, h);
    }
}