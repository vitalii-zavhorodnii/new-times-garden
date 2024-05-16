import BalanceBar from '@components/bars/BalanceBar';
import PlantInfoBar from '@components/bars/PlantInfoBar';

export default class GameInterface {
  public balanceBar: BalanceBar;
  public plantInfoBar: PlantInfoBar;

  constructor() {
    this.plantInfoBar = new PlantInfoBar();
    this.balanceBar = new BalanceBar();
  }
}
