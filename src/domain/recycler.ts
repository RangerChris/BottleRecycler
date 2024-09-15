enum recyclerState {
  Stopped = "Stopped",
  Running = "Running",
  Full = "Full",
  Error = "Error",
}

class Recycler {
  private id: number = 0;
  private plastic: number = 0;
  private glass: number = 0;
  private metal: number = 0;
  private state: recyclerState = recyclerState.Stopped;

  constructor(recyclerId: number) {
    this.id = recyclerId;
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

  public get State(): recyclerState {
    return this.state;
  }
}

export default Recycler;
