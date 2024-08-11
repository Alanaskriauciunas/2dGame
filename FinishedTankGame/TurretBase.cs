namespace ConsoleGame;
abstract class TurretBase
{
    public virtual string Name { get; }
    public virtual int DamageCoefficient { get; }

    public int DistanceTo(TankData shooter, TankData target)
    {
        return (int)Math.Round(Math.Sqrt(Math.Pow(shooter.X - target.X, 2) + Math.Pow(shooter.Y - target.Y, 2)));
    }

    public int CalculateDamage(TankData shooter, TankData target)
    {
        int distance = DistanceTo(shooter, target);
        int damage = Math.Max(DamageCoefficient - (distance - 1) * 2, 1);
        return damage;
    }
}
