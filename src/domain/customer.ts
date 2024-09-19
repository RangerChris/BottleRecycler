import Bottle, { BottleType } from "./Bottle";

class Customer {
  private id: number = 0;
  private plastic: number;
  private glass: number;
  private metal: number;

  constructor(
    customerId: number,
    numberOfPlastic: number = 0,
    numberOfGlass: number = 0,
    numberOfMetal: number = 0
  ) {
    this.id = customerId;
    this.plastic = numberOfPlastic;
    this.glass = numberOfGlass;
    this.metal = numberOfMetal;
  }

  public get Id(): number {
    return this.id ?? 0;
  }

  public get PlasticBottles(): number {
    return this.plastic;
  }
  public set PlasticBottles(bottles: number) {
    this.plastic = bottles;
  }

  public get GlassBottles(): number {
    return this.glass;
  }
  public set GlassBottles(bottles: number) {
    this.glass = bottles;
  }

  public get MetalBottles(): number {
    return this.metal;
  }
  public set MetalBottles(bottles: number) {
    this.metal = bottles;
  }

  public get TotalBottles(): number {
    return this.PlasticBottles + this.MetalBottles + this.GlassBottles;
  }

  public SetRandomNumberOfBottles() {
    const maxBottles = 50;
    this.plastic = Math.floor(Math.random() * (maxBottles - 1 + 1)) + 1;
    this.glass = Math.floor(Math.random() * (maxBottles - 1 + 1)) + 1;
    this.metal = Math.floor(Math.random() * (maxBottles - 1 + 1)) + 1;
  }

  public GetNextBottle(): Bottle | null {
    const types = [this.plastic, this.glass, this.metal];
    const nonZeroTypes = types.filter((x) => x > 0);

    if (nonZeroTypes.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * nonZeroTypes.length);
    const type = types.indexOf(nonZeroTypes[randomIndex]);
    let result: Bottle | null = null;

    switch (type) {
      case 0:
        this.plastic--;
        result = new Bottle(BottleType.Plastic);
        break;
      case 1:
        this.glass--;
        result = new Bottle(BottleType.Glass);
        break;
      case 2:
        this.metal--;
        result = new Bottle(BottleType.Metal);
        break;
    }
    return result;
  }
}

export default Customer;
