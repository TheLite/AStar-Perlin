function AStar(map) {
    this.map = map;
    this.tiles = new Array(this.map.xCount);

    this.removeFromArray = function(arr, item)
    {
        for(var i = 0; i < arr.length; i++)
        {
            if(arr[i] === item)
            {
                arr.splice(i, 1);
            }
        }
    }

    this.heuristic = function(A, B)
    {
        return dist(A.i, A.j, B.i, B.j);
    }

    this.findPath = function(start, end)
    {
        var open = new Array();
        var closed = new Array();

        open.push(start);
        while(open.length > 0)
        {
            var current = open[0];
            for(var i = 0; i < open.length; i++)
            {
                var T = open[i];
                if(T.f() < current.f()) current = T;
            }
            if(current == end)
            {
                var path = new Array();
                var T = current;
                path.push(T);
                while(T.parent != null) {
                    path.push(T.parent);
                    T = T.parent;
                }
                return path;
            }
            else
            {
                this.removeFromArray(open, current);
                closed.push(current);

                for(var i = 0; i < current.neighbours.length; i++)
                {
                    var T = current.neighbours[i];
                    if(!closed.includes(T) && !T.obstacle())
                    {
                        var g = current.g + this.heuristic(T, current) + T.dificulty();
                        if(!open.includes(T))
                        {
                            open.push(T);
                            T.g = g;
                            T.parent = current;
                            T.heuristic = this.heuristic(T, end);
                        }
                        else
                        {
                            if(g < T.g)
                            {
                                T.g = g;
                                T.parent = current;
                                T.heuristic = this.heuristic(T, end);
                            }
                        }
                    }
                }
            }
        }
    }

    for(var i = 0; i < this.map.xCount; i++)
    {
        this.tiles[i] = new Array(this.map.yCount);
        for(var j = 0; j < this.map.yCount; j++)
        {
            this.tiles[i][j] = this.map.TileMap[i][j];
            var tile = this.tiles[i][j];

            tile.g = 0;
            tile.heuristic = 0;

            tile.f = function()
            {
                return this.g + this.heuristic;
            }

            tile.neighbours = new Array();

            if (tile.i > 0)
            {
                tile.neighbours.push(this.map.TileMap[i-1][j]);
            }
            if (tile.j > 0)
            {
                tile.neighbours.push(this.map.TileMap[i][j-1]);
            }
            if (tile.i < this.map.xCount-1)
            {
                tile.neighbours.push(this.map.TileMap[i+1][j]);
            }
            if (tile.j < this.map.yCount-1)
            {
                tile.neighbours.push(this.map.TileMap[i][j+1]);
            }
            if (tile.i > 0 && tile.j > 0) {
                tile.neighbours.push(this.map.TileMap[i - 1][j - 1]);
            }
            if (tile.i < this.map.xCount - 1 && tile.j > 0) {
                tile.neighbours.push(this.map.TileMap[i + 1][j - 1]);
            }
            if (tile.i > 0 && tile.j < this.map.yCount - 1) {
                tile.neighbours.push(this.map.TileMap[i - 1][j + 1]);
            }
            if (tile.i < this.map.xCount - 1 && tile.j < this.map.yCount - 1) {
                tile.neighbours.push(this.map.TileMap[i + 1][j + 1]);
            }
        }
    }
}