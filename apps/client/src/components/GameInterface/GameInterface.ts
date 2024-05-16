import BalanceBar from '@components/bars/BalanceBar';
import PlantInfoBar from '@components/bars/PlantInfoBar';
import RingBar from '@components/bars/RingBar';

export default class GameInterface {
  public balanceBar: BalanceBar;
  public plantInfoBar: PlantInfoBar;
  public ringBar: RingBar;

  constructor() {
    this.ringBar = new RingBar();
    this.plantInfoBar = new PlantInfoBar();
    this.balanceBar = new BalanceBar();
  }
}
