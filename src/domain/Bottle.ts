export enum BottleType {
  Plastic = "Plastic",
  Metal = "Metal",
  Glass = "Glass",
}

class Bottle {
  private bottleType: BottleType;

  constructor(t: BottleType) {
    this.bottleType = t;
  }

  public get Type() {
    return this.bottleType;
  }
}

export default Bottle;
