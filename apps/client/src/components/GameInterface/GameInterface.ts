import BalanceBar from '@components/bars/BalanceBar';
import GrowingBar from '@components/bars/GrowingBar';
import PlantInfoBar from '@components/bars/PlantInfoBar';
import RingBar from '@components/bars/RingBar';
import PaperModal from '@components/menus/PaperModal';
import PlantsMenu from '@components/menus/PlantsMenu';

export default class GameInterface {
  public balanceBar: BalanceBar;
  public plantInfoBar: PlantInfoBar;
  public ringBar: RingBar;
  public plantsMenu: PlantsMenu;
  public paperModal: PaperModal;
  public growingBar: GrowingBar;

  constructor() {
    this.ringBar = new RingBar();
    this.plantInfoBar = new PlantInfoBar();
    this.balanceBar = new BalanceBar();
    this.plantsMenu = new PlantsMenu();
    this.paperModal = new PaperModal();
    this.growingBar = new GrowingBar();
  }
}
