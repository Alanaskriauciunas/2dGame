namespace ConsoleGame;

class Controller
{
    static void Main(params string[] arguments)
    {
        if (arguments.Length != 2)
        {
            Console.WriteLine("Enter tank names as run arguments");
            return;
        }

        
        MapData map = new(32, 8);
        TankData tank1 = new(map, arguments[0], 1, 1, 100);
        TankData tank2 = new(map, arguments[1], 10, 5, 100);

        tank1.Turret = new Railgun();
        tank2.Turret = new Smoky();

        int moveId = 0;

        while (true)
        {
            map.Render(tank1, tank2);

            TankData currentTank = moveId % 2 == 0 ? tank1 : tank2;
            TankData oponentTank = moveId % 2 == 0 ? tank2 : tank1;
            Console.WriteLine("Current move for: {0}", currentTank.Name);
            if (currentTank.IsTurretRecharging)
                {
                Console.WriteLine($"{currentTank.Name}'s turret is recharging and cannot shoot this turn.");
                currentTank.IsTurretRecharging = false;
                moveId++;
                continue;
                }

            Console.Write("Move direction WASD, X - shoot): ");
            char moveDirection = Console.ReadKey().KeyChar;

            if(tank1.X == tank2.X && tank1.Y == tank2.Y )
            {
                System.Console.WriteLine("");
                System.Console.WriteLine("Both tanks exploded - even");
                break;
            }
            if (moveDirection == 'w') currentTank.MoveUp();
            else if (moveDirection == 'a') currentTank.MoveLeft();
            else if (moveDirection == 's') currentTank.MoveDown();
            else if (moveDirection == 'd') currentTank.MoveRight();
            else if (moveDirection == 'x')
            {
                
                Console.WriteLine();
                Console.WriteLine("Shooting.");
                bool hit = false;

                if (currentTank.IsTurretRecharging)
                {
                    Console.WriteLine($"{currentTank.Name}'s turret is recharging and cannot shoot. Any key to continue.");
                    currentTank.IsTurretRecharging = false;
                }

                if (currentTank.Direction == TankDirection.Left && currentTank.Y == oponentTank.Y && currentTank.X > oponentTank.X)
                {
                    hit = true;
                }

                if (currentTank.Direction == TankDirection.Right && currentTank.Y == oponentTank.Y && currentTank.X < oponentTank.X)
                {
                    hit = true;
                }

                if (currentTank.Direction == TankDirection.Up && currentTank.X == oponentTank.X && currentTank.Y > oponentTank.Y)
                {
                    hit = true;
                }

                if (currentTank.Direction == TankDirection.Down && currentTank.X == oponentTank.X && currentTank.Y < oponentTank.Y)
                {
                    hit = true;
                }


                if (hit)
                {
                    currentTank.Shoot(oponentTank);
                    int damage = currentTank.Turret.CalculateDamage(currentTank, oponentTank);
                    oponentTank.Lives -= damage;

                    Console.WriteLine($"Hit other tank. Damage: {damage}. Remaining lives: {oponentTank.Lives}. Any key to continue.");
                }
                else
                    Console.WriteLine("Missed other tank. Any key to continue.");
                Console.ReadKey();
                if(oponentTank.Lives <= 0)
                {
                    System.Console.WriteLine($"{currentTank.Name} won!");
                    return;
                }
            }
            else
            {
                Console.WriteLine("Skipped move.");
            }
            moveId++;
        }
    }
}