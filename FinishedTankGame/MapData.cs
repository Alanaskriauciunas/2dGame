namespace ConsoleGame;

class MapData(int width, int height)
{
    
    public int Width { get; } = width;
    public int Height { get; } = height;    
    public void Render(params TankData[] tanks)
    {
        Console.Clear();
        
        for (int i = 0; i < tanks.Length; i++)
            Console.WriteLine("Player {0}: {1}; lives: {2}; x: {3}; y: {4}", i + 1, tanks[i].Name, tanks[i].Lives, tanks[i].X, tanks[i].Y);

        for (int y = 0; y < Height; y++)
        {
            for (int x = 0; x < Width; x++)
            {
                TankData? tank = null;
                foreach(var t in tanks)
                {
                    if (t.X == x && t.Y == y)
                {
                    tank = t;
                    break; 
                }
                }

                if (tank != null)
                    Console.Write(
                        tank.Direction == TankDirection.Up ? "^" :
                        tank.Direction == TankDirection.Down ? "v" :
                        tank.Direction == TankDirection.Left ? "<" :
                        tank.Direction == TankDirection.Right ? ">" :
                        "T");
                else
                    Console.Write(".");
            }

            Console.WriteLine();
        }
    }
}