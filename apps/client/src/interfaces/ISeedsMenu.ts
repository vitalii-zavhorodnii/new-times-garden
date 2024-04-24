import Plant from "@entities/Plant";

interface ItemList {
    icon: string,
    title: string,
    cost: number,
    plant: Plant
}

export type ISeedsList = Array<ItemList>