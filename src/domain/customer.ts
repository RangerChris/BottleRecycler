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

  public get GlassBottles(): number {
    return this.glass;
  }

  public get MetalBottles(): number {
    return this.metal;
  }

  public SetRandomNumberOfBottles() {
    const maxBottles = 50;
    this.plastic = Math.floor(Math.random() * (maxBottles - 1 + 1)) + 1;
    this.glass = Math.floor(Math.random() * (maxBottles - 1 + 1)) + 1;
    this.metal = Math.floor(Math.random() * (maxBottles - 1 + 1)) + 1;
  }
}

export default Customer;
