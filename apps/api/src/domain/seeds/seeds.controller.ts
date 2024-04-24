import { Controller, Get } from '@nestjs/common';

import { ROUTES } from '@constants/routes.constants'

@Controller(ROUTES.seeds)
export class SeedsController {
  @Get('')
  getPlants(): Array<any> {
    const SEEDS = [{ icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' },
    { icon: './assets/seeds/blueflower.png', title: 'blueflower', growTime: 10, texture: 'blueflower', cost: 10, plant: 'plant' },
    { icon: './assets/seeds/corn.png', title: 'corn', growTime: 10, texture: 'corn', cost: 20, plant: 'grass' },
    { icon: './assets/seeds/lily.png', title: 'lily', growTime: 10, texture: 'lily', cost: 30, plant: 'plant' },
    { icon: './assets/seeds/sunflower.png', title: 'sunflower', growTime: 10, texture: 'sunflower', cost: 40, plant: 'plant' },
    { icon: './assets/seeds/tulip.png', title: 'tulip', growTime: 10, texture: 'tulip', cost: 50, plant: 'grass' }
    ];


    return SEEDS;
  }
}
