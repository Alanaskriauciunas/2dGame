using System.Transactions;

namespace ConsoleGame;

class TankData(MapData map, string name, int x, int y, int lives) : CoordinateData(x, y)
{

    public TurretBase Turret { get; set; }
    public MapData Map { get; } = map;
    public string Name { get; } = name;
    
    public int Lives { get; set; } = lives;
    public TankDirection Direction { get; private set; } = TankDirection.Down;

    public bool IsTurretRecharging { get; set; } = false;


    private void Move(int moveX, int moveY)
    {
        if (moveX < 0) Direction = TankDirection.Left;
        if (moveX > 0) Direction = TankDirection.Right;
        if (moveY < 0) Direction = TankDirection.Up;
        if (moveY > 0) Direction = TankDirection.Down;

        X = Math.Clamp(X + moveX, 0, Map.Width - 1);
        Y = Math.Clamp(Y + moveY, 0, Map.Height - 1);
    }

    public void MoveUp() => Move(0, -1);
    public void MoveDown() => Move(0, 1);
    public void MoveLeft() => Move(-1, 0);
    public void MoveRight() => Move(1, 0);

    public void Shoot(TankData target)
    {
        if (Turret is Railgun)
        {
            IsTurretRecharging = true;
            Console.WriteLine($"{Name}'s Railgun is gonna recharge, this will take one turn.");
        }
    }
}