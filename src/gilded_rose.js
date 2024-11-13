class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (let item of this.items) {
      // Diminuer le sellIn d'abord
      item.sellIn--;

      // Logique pour mettre à jour la qualité
      if (item.name === "Aged Brie") {
        item.quality = Math.min(item.quality + 1, 50);
      } else if (item.name === "Sulfuras, Hand of Ragnaros") {
        // La qualité de Sulfuras ne change pas
        continue;
      } else if (item.name.startsWith("Conjured")) {
        item.quality = Math.max(item.quality - 2, 0);
      } else {
        item.quality = Math.max(item.quality - 1, 0);
      }

      // Si la date de péremption est passée
      if (item.sellIn < 0) {
        if (item.name === "Aged Brie") {
          item.quality = Math.min(item.quality + 1, 50);
        } else if (item.name.startsWith("Conjured")) {
          item.quality = Math.max(item.quality - 2, 0);
        } else {
          item.quality = Math.max(item.quality - 1, 0);
        }
      }

      // Gestion des Backstage passes
      if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        if (item.sellIn < 0) {
          item.quality = 0; // La qualité tombe à 0 après le concert
        } else if (item.sellIn <= 5) {
          item.quality = Math.min(item.quality + 3, 50); // Augmente de 3 si 5 jours ou moins
        } else if (item.sellIn <= 10) {
          item.quality = Math.min(item.quality + 2, 50); // Augmente de 2 si 10 jours ou moins
        } else {
          item.quality = Math.min(item.quality + 1, 50); // Augmente de 1 pour les autres
        }
      }
    }
    return this.items;
  }
}

module.exports = { Shop, Item };
