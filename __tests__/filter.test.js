import { Filter, Key } from "../jtools";
let small_data = require("./data/20.json");

test("test nested", () => {
    let items = new Filter(Key("friends.0.name").eq("Webster Green")).many(small_data);
    expect(items.length).toStrictEqual(1);
    expect(items[0]._id).toStrictEqual("5e2797c05aa0585816ce8b8c");
});

test("test eye color", () => {
    let items = new Filter(Key("eyeColor").eq("brown")).many(small_data);
    expect(items.length).toStrictEqual(6);
});

test("test eye color - raw filters", () => {
    let items = new Filter([{field: "eyeColor", operator: "==", value: "brown"}]).many(small_data);
    expect(items.length).toStrictEqual(6);
});

test("test split convert", () => {
    let items = new Filter(Key('balance.$range(1).$replace(",", "").$float').gt(3800)).many(small_data);
    let not_items = new Filter(Key('balance.$range(1).$replace(",", "").$float').lt(3800)).many(small_data);
    expect(items.length).toStrictEqual(2);
    expect(not_items.length).toStrictEqual(18);
});

test("test nested map", () => {
    let items = new Filter(Key("favoriteFruit.strawberry").eq(0.4242)).many(small_data);
    expect(items.length).toStrictEqual(1);
    expect(items[0]._id).toStrictEqual("5e2797c0efc296e33c198e4c");
});

test("test or", () => {
    let items = new Filter(
        Key("address").contains("Texas").or_(
            Key("address").contains("West Virginia")
        )).many(small_data);
    expect(items.length).toStrictEqual(2);
});

test("test or + and", () => {
    let items = new Filter(
        Key("address").contains("Texas").or_(
            Key("address").contains("West Virginia")
        ).and_(
            Key("company").eq("XYLAR")
        )).many(small_data);
    expect(items.length).toStrictEqual(1);
    expect(items[0]._id).toStrictEqual("5e2797c05aa0585816ce8b8c");
});

test("test basic not", () => {
    let items = new Filter(Key("company").eq("XYLAR").not_()).many(small_data);
    expect(items.length).toStrictEqual(small_data.length - 1);
});

test("test not + or", () => {
    let items = new Filter(
        Key("address").contains("Texas").or_(
            Key("address").contains("West Virginia")
        ).not_()).many(small_data);
    expect(items.length).toStrictEqual(small_data.length - 2);
});

test("test filtering on datetime specials", () => {
    let items = new Filter(Key('registered.$strptime("YYYY-MM-DD[T]HH:mm:ss ZZ").$strftime("YYYY").$int').gte(2017)).many(small_data);
    let items2 = new Filter(Key('registered.$split("-").0.$int').gt(2017)).many(small_data);
    let items3 = new Filter(Key('registered.$strptime("YYYY-MM-DD[T]HH:mm:ss ZZ").$datetime("year")').gte(2016)).many(small_data);

    expect(items.length).toStrictEqual(9);
    expect(items2.length).toStrictEqual(6);
    expect(items3.length).toStrictEqual(13);
});

test("test interval", () => {
    let key = Key('registered.$strptime("YYYY-MM-DD[T]HH:mm:ss ZZ").$datetime("year")');
    let items = new Filter(key.interval([2016, 2017])).many(small_data);
    let items2 = new Filter(
        key.gte(2016).and_(key.lte(2017))
    ).many(small_data);

    expect(items.length).toStrictEqual(7);
    expect(items2.length).toStrictEqual(items.length);
});

test("test not interval", () => {
    let key = Key('registered.$strptime("YYYY-MM-DD[T]HH:mm:ss ZZ").$datetime("year")');
    let items = new Filter(key.not_interval([2016, 2017])).many(small_data);
    let items2 = new Filter(
        key.lt(2016).or_(key.gt(2017))
    ).many(small_data);

    expect(items.length).toStrictEqual(13);
    expect(items2.length).toStrictEqual(items.length);
});
