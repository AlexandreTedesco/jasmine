var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });

  it("should update the quality of foo correctly", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    gildedRose.updateQuality();
    const items = gildedRose.items;
    expect(items[0].quality).toBe(0);
  });

  it("should keep the name of foo unchanged", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("should decrease quality by 1 for normal items", function() {
    const gildedRose = new Shop([new Item("Normal Item", 5, 10)]);
    gildedRose.updateQuality();
    const items = gildedRose.items;
    expect(items[0].quality).toBe(9);
  });

  it("should increase quality by 1 for Aged Brie", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 0)]);
    gildedRose.updateQuality();
    const items = gildedRose.items;
    expect(items[0].quality).toBe(1);
  });

  it("should not increase quality above 50", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 50)]);
    gildedRose.updateQuality();
    const items = gildedRose.items;
    expect(items[0].quality).toBe(50);
  });

  it("should decrease quality by 2 for Conjured items", function() {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 3, 6)]);
    gildedRose.updateQuality();
    const items = gildedRose.items;
    expect(items[0].quality).toBe(4);
  });

  it("should decrease quality by 2 for Conjured items after sellIn", function() {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 0, 6)]);
    gildedRose.updateQuality();
    const items = gildedRose.items;
    expect(items[0].quality).toBe(2);
  });

  it("should not change quality of Sulfuras", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    gildedRose.updateQuality();
    const items = gildedRose.items;
    expect(items[0].quality).toBe(80);
  });

  it("should drop quality to 0 for Backstage passes after the concert", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 40)]);
    gildedRose.updateQuality();
    const items = gildedRose.items;
    expect(items[0].quality).toBe(0);
  });

  it("should increase quality by 3 for Backstage passes when 5 days or less", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 40)]);
    gildedRose.updateQuality();
    const items = gildedRose.items;
    expect(items[0].quality).toBe(43);
  });

});
