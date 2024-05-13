import { DateTime } from 'luxon';
import { Scene } from 'phaser';
import { Pinch } from 'phaser3-rex-plugins/plugins/gestures.js';

import { EventBus } from '@game/EventBus';

import Decoration from '@entities/Decoration';
import Dummy from '@entities/Dummy';
import Plant from '@entities/Plant';
import Soil from '@entities/Soil';

import { mapFieldRows } from '@mappers/mapFieldRows';
import { userGardenMapper } from '@mappers/mapUserGarden';

import { randomNumberHelper } from '@helpers/random-number';

import { CAMERA_BOUNDRIES } from '@constants/camera-bounds';
import { CONTAINERS_DEPTH } from '@constants/containers-depth';
import { DECORATION_LIST } from '@constants/decorations';
import { PLANTS_ANIMATED } from '@constants/plants-sprites';
import { PLANTS_MARGIN, ROWS_GAP, ROW_MAP } from '@constants/rows.constants';

import type { IPlantListItem } from '@interfaces/IPlantListItem';
import type { IShopItem } from '@interfaces/IShopItem';
import type { IUserData } from '@interfaces/IUserData';
import type { ICellData } from '@interfaces/IUserData';

interface IData {
  user: IUserData;
  shopList: IShopItem[];
  settings: any;
}

export class Game extends Scene {
  public isBlocked: boolean;

  public camera: Phaser.Cameras.Scene2D.Camera;

  public pinchDistance: number | null;
  public settings: any;
  public pickedPlant: IPlantListItem | null;

  private user: IUserData;
  private balanceCoins: number;
  private balanceTokens: number;
  private balanceXp: number;
  private field: ICellData[][];

  private plants: (Plant | Dummy)[][];
  private soil: Soil[][];
  private decorations: Decoration[];

  private decorationContainer: Phaser.GameObjects.Container | null;
  private gardenContainer: Phaser.GameObjects.Container[];
  private soilContainer: Phaser.GameObjects.Container[];

  private growingInterval: ReturnType<typeof setInterval>;

  constructor() {
    super('Game');

    this.pickedPlant = null;
    this.soilContainer = [];
    this.gardenContainer = [];
    this.decorationContainer = null;
    this.decorations = [];
    this.plants = [];
    this.soil = [];
    this.isBlocked = false;
  }

  public init(data: IData): void {
    this.user = data.user;

    this.settings = data.settings;
    this.balanceCoins = data.user.balanceCoins;
    this.balanceTokens = data.user.balanceTokens;
    this.balanceXp = data.user.xp;
    this.field = userGardenMapper(data.user.garden.field);
  }

  // Create scene method
  public create(): void {
    this.camera = this.cameras.main;

    // fix
    // set camera zoom from local storage
    // const savedZoom = JSON.parse(window.localStorage.getItem('zoom') || '');
    // const zoom = parseFloat(savedZoom) || 1;
    // this.camera.setZoom(zoom, zoom);

    /*
     * Render background and decors
     * bg
     */
    const { height, width, worldView } = this.cameras.main;
    const centerX = worldView.x + width / 2;
    const centerY = worldView.y + height / 2;

    const backgroundImage = this.add.image(centerX, centerY, 'background');
    backgroundImage.x = backgroundImage.x - 280;
    backgroundImage.y = backgroundImage.y - 118;
    /*
      Create animations
    */
    PLANTS_ANIMATED.forEach((sprite) => {
      this.anims.create({
        key: `tap-0-${sprite}`,
        frameRate: 20,
        frames: this.anims.generateFrameNumbers(sprite, { start: 4, end: 15 }),
        repeat: 0
      });
      this.anims.create({
        key: `tap-1-${sprite}`,
        frameRate: 20,
        frames: this.anims.generateFrameNumbers(sprite, { start: 16, end: 27 }),
        repeat: 0
      });
      this.anims.create({
        key: `tap-2-${sprite}`,
        frameRate: 20,
        frames: this.anims.generateFrameNumbers(sprite, { start: 28, end: 39 }),
        repeat: 0
      });
      this.anims.create({
        key: `tap-3-${sprite}`,
        frameRate: 20,
        frames: this.anims.generateFrameNumbers(sprite, { start: 40, end: 51 }),
        repeat: 0
      });
    });

    // Define event emitters
    EventBus.on('pick-plant', (plant: IPlantListItem) => {
      this.handlePlantChoose(plant);
    });

    EventBus.on('clear-pick-plant', () => {
      this.pickedPlant = null;
    });

    EventBus.on(
      'change-balance',
      (data: { balanceCoins: number; balanceTokens: number; balanceXp: number }) => {
        this.balanceCoins = data.balanceCoins;
        this.balanceTokens = data.balanceTokens;
        this.balanceXp = data.balanceXp;
      }
    );

    EventBus.on('block-game', () => {
      this.isBlocked = true;
    });

    EventBus.on('unblock-game', () => {
      this.isBlocked = false;
    });

    // Start render game objects
    this.renderPlantsField();
  }
  /*
      Render methods
      Render garden field
  */
  // Render plants on field
  private renderPlantsField(): void {
    // create plants sprites in 2 array
    this.plants = this.field.map((fieldRow) => {
      const plantsRow = fieldRow.map((cell) => {
        // if cell has no plantedAt return Dummy sprites
        if (!cell.plantedAt) {
          return new Dummy(this);
        }
        // return new Plant sprites
        return new Plant(this, cell.plant, cell.plantedAt);
      });

      return plantsRow;
    });
    // defining center points for Plants
    const { height, width, worldView } = this.cameras.main;
    const centerX = worldView.x + width / 2;
    const centerY = worldView.y + height / 2 - PLANTS_MARGIN;
    // added rows to container
    this.plants.forEach((row, index) => {
      const container = this.add.container(
        centerX + (index - 2) * ROWS_GAP.x,
        centerY + (index - 2) * ROWS_GAP.y
      );
      // define z-index of plants
      container.depth = CONTAINERS_DEPTH.plant;
      // add Plants sprites to cantainer
      this.gardenContainer.push(container);
      this.gardenContainer[index].add(row);
    });
    // run growing checker to set needed frame
    this.growingChecker();
    // run next step of render: Soil field
    this.renderSoil(this.plants);
  }
  // Rener soil
  private renderSoil(plants: (Plant | Dummy)[][]): void {
    // Map garden field, concat X and Y
    const soilfield = mapFieldRows(ROW_MAP);
    // Update soil field 2D array
    this.soil = soilfield.map((row, rowIndex: number) => {
      const soilRow = row.map(({ x, y }, soilIndex: number) => {
        // Create Soil sprite
        const soil = new Soil(this, x, y);
        // Set random frame for Sprite
        const i = randomNumberHelper(0, 5);
        soil.setFrame(i);
        soil.setInteractive(this.input.makePixelPerfect());

        // Update Plant sprite link to Soil sprite
        // Find plant in Plants 2D array
        const plant = plants[rowIndex][soilIndex];
        // Add Plant to Soil if NOT Dummy
        if (!plant['dummy']) {
          soil.placePlant(plant as Plant);
        }
        // Add handler to Soil
        soil.on('pointerdown', () => {
          this.handleSoilClick(soil, rowIndex, soilIndex);
        });

        return soil;
      });

      return soilRow;
    });
    // define position of soil
    const { height, width, worldView } = this.cameras.main;
    const centerX = worldView.x + width / 2;
    const centerY = worldView.y + height / 2;
    // create containers for soil sprites
    this.soil.forEach((row, index) => {
      const container = this.add.container(
        centerX + (index - 2) * ROWS_GAP.x,
        centerY + (index - 2) * ROWS_GAP.y
      );
      // set z-index for soil layer
      container.depth = CONTAINERS_DEPTH.soil;
      // push sprites to game container
      this.soilContainer.push(container);
      this.soilContainer[index].add(row);
    });
    // run next step: render Decorations
    this.renderDecorations();
  }
  // Render decorations
  private renderDecorations(): void {
    this.decorations = DECORATION_LIST.map(
      ({ texture, decorationName, x, y, scale }) => {
        const decoration = new Decoration(
          this,
          x,
          y,
          decorationName,
          texture,
          scale
        );

        decoration.setInteractive(this.input.makePixelPerfect());

        decoration.on('pointerdown', () => {
          this.handleDecorationClick(decoration);
        });

        return decoration;
      }
    );

    const { height, width, worldView } = this.cameras.main;
    const positionX = worldView.x + width / 2;
    const positionY = worldView.y + height / 2;

    this.decorationContainer = this.add.container(positionX, positionY);

    this.decorationContainer.depth = CONTAINERS_DEPTH.plant;
    this.decorationContainer.add(this.decorations);
    // Run post render methods
    this.renderCompletion();
  }
  // action on end of renders
  private renderCompletion(): void {
    this.initiateControls();

    EventBus.emit('current-scene-ready', this);

    this.growingInterval = setInterval(() => this.growingChecker(), 2000);
  }
  /*
   *
   *  Utilities methods
   *
   */
  // Check full 2D array of Plants sprites
  private growingChecker(): void {
    const currentTime = DateTime.now();
    // Run through 2D plants sprite array
    this.plants.forEach((row) => {
      row.forEach((plant: Plant | Dummy) => {
        if (!plant.dummy && 'growTime' in plant) {
          this.updateGrowPhase(plant, currentTime);
        }
      });
    });
  }
  // Update grow phase and animations of Plant sprite
  private updateGrowPhase(plant: Plant, currentTime: DateTime): void {
    // Calculate time with Luxon {DateTime}
    // Difference between end grow time and current time in Milliseconds
    // Calculate % in
    const endGrowTime = DateTime.fromMillis(plant.plantedAt + plant.growTime);
    const difference = endGrowTime.diff(currentTime).toMillis();
    const percentLeft = Math.floor((difference / plant.growTime) * 100);
    // Update static animation and play anim
    if (percentLeft < 0) {
      if (plant.phase === 3) return;
      // Update phase and static frame
      plant.setFrame(3);
      plant.phase = 3;
      // Check if plant is animated, must contain name of plant in {PLANTS_ANIMATED}
      if (PLANTS_ANIMATED.includes(plant.title.toLowerCase())) {
        plant.play(`tap-3-${plant.title.toLowerCase()}`);
      }

      return;
    }

    if (percentLeft < 30) {
      if (plant.phase === 2) return;
      // Update phase and static frame
      plant.setFrame(2);
      plant.phase = 2;
      // Check if plant is animated, must contain name of plant in {PLANTS_ANIMATED}
      if (PLANTS_ANIMATED.includes(plant.title.toLowerCase())) {
        plant.play(`tap-2-${plant.title.toLowerCase()}`);
      }

      return;
    }

    if (percentLeft < 80) {
      if (plant.phase === 1) return;
      // Update phase and static frame
      plant.setFrame(1);
      plant.phase = 1;
      // Check if plant is animated, must contain name of plant in {PLANTS_ANIMATED}
      if (PLANTS_ANIMATED.includes(plant.title.toLowerCase())) {
        plant.play(`tap-1-${plant.title.toLowerCase()}`);
      }

      return;
    }
  }
  /*
   *
   * Handlers
   *
   */
  // Handle planting process
  private async placeNewPlant(
    soil: Soil,
    plant: IPlantListItem,
    rowIndex: number,
    plantIndex: number
  ): Promise<void> {
    // Check if Plant price is less then balance
    if (
      plant.gamePrice > this.balanceCoins ||
      plant.tokenPrice > this.balanceTokens
    ) {
      // Clear picked plant
      this.pickedPlant = null;
      EventBus.emit('clear-pick-plant');
      // Stop method
      return;
    }
    // Update user balance
    EventBus.emit('withdraw-balance', {
      coins: plant.gamePrice,
      tokens: plant.tokenPrice
    });
    // Define planted time on Client
    const plantedAt = DateTime.now().toMillis();
    // Send update on server
    EventBus.emit('plant-new-plant', {
      id: plant._id,
      rowIndex,
      plantIndex,
      plantedAt
    });
    // Create props with X and Y for plant from Soil coords
    const props = {
      x: soil.x,
      y: soil.y,
      ...plant
    };
    // Set new Plant sprite in given Cell
    this.plants[rowIndex][plantIndex] = new Plant(this, props, plantedAt);
    // Get Plant sprite to local variable
    const newPlant = this.plants[rowIndex][plantIndex] as Plant;
    // Place new Plant sprite to Soil
    soil.placePlant(newPlant);
    // Update Plant sprite in container at Coords
    this.gardenContainer[rowIndex].addAt(newPlant, plantIndex);
    // Play animation if Plant is in {PLANTS_ANIMATED} list
    if (PLANTS_ANIMATED.includes(plant.title.toLowerCase())) {
      newPlant.play(`tap-0-${newPlant.title.toLowerCase()}`);
    }
    // Update balance
    this.balanceCoins -= plant.gamePrice;
    this.balanceTokens -= plant.tokenPrice;
    // Post plant check balance
    if (
      plant.gamePrice > this.balanceCoins ||
      plant.tokenPrice > this.balanceTokens
    ) {
      // Clear picked plant
      EventBus.emit('clear-pick-plant');
      this.pickedPlant = null;
    }
  }
  // Handle clicks on soil
  private handleSoilClick(soil: Soil, rowIndex: number, plantIndex: number): void {
    // Block clicking
    if (this.isBlocked) return;
    // Check of Soil is not occupied yet, plant new Plant
    if (!soil.isOccupied && this.pickedPlant) {
      this.placeNewPlant(soil, this.pickedPlant, rowIndex, plantIndex);

      return;
    }
    // Check if occupied, harvers / play animation
    if (soil.isOccupied) {
      // Calculate time with Luxon {DateTime}
      // Difference between end grow time and current time in Milliseconds
      // Calculate % in
      const { plantedAt, growTime } = soil.plant;
      const currentTime = DateTime.now();
      const endGrowTime = DateTime.fromMillis(plantedAt + growTime);
      const difference = endGrowTime.diff(currentTime).toMillis();
      const percentLeft = Math.floor((difference / growTime) * 100);
      // If percent to grow is more then 0, play animation
      if (percentLeft > 0) {
        if (PLANTS_ANIMATED.includes(soil.plant.title.toLowerCase())) {
          soil.plant.play(
            `tap-${soil.plant.phase}-${soil.plant.title.toLowerCase()}`
          );
        }

        return;
      }
      // Refill balance from harvesting
      EventBus.emit('harvest', {
        plant: soil.plant,
        rowIndex: rowIndex,
        plantIndex: plantIndex
      });
      // Remove sprite from container and replace width Dummy
      this.gardenContainer[rowIndex].remove(this.plants[rowIndex][plantIndex]);
      this.plants[rowIndex][plantIndex].destroy();
      this.plants[rowIndex][plantIndex] = new Dummy(this) as Plant;
      // Variable of placed Dummy
      const dummy = this.plants[rowIndex][plantIndex] as Plant;
      // Put dummy in Soil.plant
      soil.placePlant(dummy);
      // Add new Dummy Sprite container garden
      this.gardenContainer[rowIndex].addAt(dummy, plantIndex);
    }
  }
  // Handle decoration click
  private handleDecorationClick(decoration: Decoration): void {
    if (decoration.decorationName === 'house') {
      this.scene.switch('HouseScene');
    }
  }
  /*
   *
   * Handle emitted eventes from UI
   *
   */
  // Handle pick plants menu
  private handlePlantChoose(plant: IPlantListItem): void {
    if (
      this.user.balanceCoins < plant.gamePrice ||
      this.user.balanceTokens < plant.tokenPrice
    ) {
      return;
    }

    this.pickedPlant = plant;
  }
  /*
   *  Game controls
   *
   *   Init controls
   */
  private initiateControls(): void {
    const pinch = new Pinch(this);
    pinch.setEnable(true);

    pinch.on('pinch', () => {
      if (!this.pinchDistance) {
        this.pinchDistance = pinch.distanceBetween;
        return;
      }

      if (this.pinchDistance > pinch.distanceBetween) {
        const zoom = pinch.scaleFactor * this.camera.zoom;
        if (zoom > 0.65) {
          this.camera.setZoom(zoom, zoom);
        }
      }
      if (this.pinchDistance < pinch.distanceBetween) {
        const zoom = pinch.scaleFactor * this.camera.zoom;
        if (zoom < 1.2) {
          this.camera.setZoom(zoom, zoom);
        }

        // this.camera.setZoom(1, 1);
      }

      this.pinchDistance = pinch.distanceBetween;
    });

    pinch.on('pinchend', () => {
      const zoom = pinch.scaleFactor * this.camera.zoom;
      window.localStorage.setItem('zoom', JSON.stringify(zoom) || '');
      this.pinchDistance = null;
    });

    this.input.on('pointermove', (p: any) => {
      if (!p.isDown) return;

      const distance = p.x - p.prevPosition.x;

      if (distance >= -1 && distance <= 1) return;

      if (this.pinchDistance) return;

      const { scrollX } = this.camera;
      const { left, right } = CAMERA_BOUNDRIES;

      this.camera.scrollX -= distance;

      if (scrollX <= left) {
        this.camera.scrollX = left + 5;
      }

      if (scrollX >= right) {
        this.camera.scrollX = right - 5;
      }
    });
  }
}
