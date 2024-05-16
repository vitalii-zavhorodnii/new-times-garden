import BalanceBar from '@components/bars/BalanceBar';
import PlantInfoBar from '@components/bars/PlantInfoBar';
import RingBar from '@components/bars/RingBar';
import PaperModal from '@components/menus/PaperModal';
import PlantsShopMenu from '@components/menus/PlantsShopMenu';

export default class GameInterface {
  public balanceBar: BalanceBar;
  public plantInfoBar: PlantInfoBar;
  public ringBar: RingBar;
  public plantsShopMenu: PlantsShopMenu;
  public paperModal: PaperModal;

  constructor() {
    this.ringBar = new RingBar();
    this.plantInfoBar = new PlantInfoBar();
    this.balanceBar = new BalanceBar();
    this.plantsShopMenu = new PlantsShopMenu();
    this.paperModal = new PaperModal();
  }
}