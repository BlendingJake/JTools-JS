import { Filter, Key, Condition } from "../dist";
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

test('filter by index', () => {
    expect(new Filter(Condition.ander(Key("INDEX").gte(5), Key("INDEX").lt(7))).many(small_data)).toStrictEqual(
        small_data.slice(5, 7)
    );

    expect(new Filter(Key("INDEX").interval(1, 5)).many(small_data)).toStrictEqual(
        small_data.slice(1, 6)
    );
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
    let items3 = new Filter(Key('registered.$strptime("YYYY-MM-DD[T]HH:mm:ss ZZ").$call("year")').gte(2016)).many(small_data);

    expect(items.length).toStrictEqual(9);
    expect(items2.length).toStrictEqual(6);
    expect(items3.length).toStrictEqual(13);
});

test("test interval", () => {
    let key = Key('registered.$strptime("YYYY-MM-DD[T]HH:mm:ss ZZ").$call("year")');
    let items = new Filter(key.interval([2016, 2017])).many(small_data);
    let items2 = new Filter(
        key.gte(2016).and_(key.lte(2017))
    ).many(small_data);

    expect(items.length).toStrictEqual(7);
    expect(items2.length).toStrictEqual(items.length);
});

test("test not interval", () => {
    let key = Key('registered.$strptime("YYYY-MM-DD[T]HH:mm:ss ZZ").$call("year")');
    let items = new Filter(key.not_interval([2016, 2017])).many(small_data);
    let items2 = new Filter(
        key.lt(2016).or_(key.gt(2017))
    ).many(small_data);

    expect(items.length).toStrictEqual(13);
    expect(items2.length).toStrictEqual(items.length);
});

test("test set with membership operators", () => {
    let data = {
        container: new Set([1, 2, 3]),
        value: 3
    };

    // contains T/F
    expect(
        new Filter(Key("container").contains(2)).single(data)
    ).toStrictEqual(true);
    expect(
        new Filter(Key("container").contains(4)).single(data)
    ).toStrictEqual(false);

    // !contains T/F
    expect(
        new Filter(Key("container").not_contains(2)).single(data)
    ).toStrictEqual(false);
    expect(
        new Filter(Key("container").not_contains(4)).single(data)
    ).toStrictEqual(true);

    // in T/F
    expect(
        new Filter(Key("value").in_(new Set([1, 2, 3]))).single(data)
    ).toStrictEqual(true);
    expect(
        new Filter(Key("value").in_(new Set([1, 2]))).single(data)
    ).toStrictEqual(false);

    // !in T/F
    expect(
        new Filter(Key("value").nin(new Set([1, 2, 3]))).single(data)
    ).toStrictEqual(false);
    expect(
        new Filter(Key("value").nin(new Set([1, 2]))).single(data)
    ).toStrictEqual(true);
});

test("test array with membership operators", () => {
    let data = {
        container: [1, 2, 3],
        value: 3
    };

    // contains T/F
    expect(
        new Filter(Key("container").contains(2)).single(data)
    ).toStrictEqual(true);
    expect(
        new Filter(Key("container").contains(4)).single(data)
    ).toStrictEqual(false);

    // !contains T/F
    expect(
        new Filter(Key("container").not_contains(2)).single(data)
    ).toStrictEqual(false);
    expect(
        new Filter(Key("container").not_contains(4)).single(data)
    ).toStrictEqual(true);

    // in T/F
    expect(
        new Filter(Key("value").in_([1, 2, 3])).single(data)
    ).toStrictEqual(true);
    expect(
        new Filter(Key("value").in_([1, 2])).single(data)
    ).toStrictEqual(false);

    // !in T/F
    expect(
        new Filter(Key("value").nin([1, 2, 3])).single(data)
    ).toStrictEqual(false);
    expect(
        new Filter(Key("value").nin([1, 2])).single(data)
    ).toStrictEqual(true);
});

test("test string with membership operators", () => {
    let data = {
        container: "123",
        value: 3
    };

    // contains T/F
    expect(
        new Filter(Key("container").contains(2)).single(data)
    ).toStrictEqual(true);
    expect(
        new Filter(Key("container").contains(4)).single(data)
    ).toStrictEqual(false);

    // !contains T/F
    expect(
        new Filter(Key("container").not_contains(2)).single(data)
    ).toStrictEqual(false);
    expect(
        new Filter(Key("container").not_contains(4)).single(data)
    ).toStrictEqual(true);

    // in T/F
    expect(
        new Filter(Key("value").in_("123")).single(data)
    ).toStrictEqual(true);
    expect(
        new Filter(Key("value").in_("12")).single(data)
    ).toStrictEqual(false);

    // !in T/F
    expect(
        new Filter(Key("value").nin("123")).single(data)
    ).toStrictEqual(false);
    expect(
        new Filter(Key("value").nin("12")).single(data)
    ).toStrictEqual(true);
});

test("test associative array with membership operators", () => {
    let data = {
        container: {1: 1, 2: 2, 3: 3},
        value: 3
    };

    // contains T/F
    expect(
        new Filter(Key("container").contains(2)).single(data)
    ).toStrictEqual(true);
    expect(
        new Filter(Key("container").contains(4)).single(data)
    ).toStrictEqual(false);

    // !contains T/F
    expect(
        new Filter(Key("container").not_contains(2)).single(data)
    ).toStrictEqual(false);
    expect(
        new Filter(Key("container").not_contains(4)).single(data)
    ).toStrictEqual(true);

    // in T/F
    expect(
        new Filter(Key("value").in_({1: 1, 2: 2, 3: 3})).single(data)
    ).toStrictEqual(true);
    expect(
        new Filter(Key("value").in_({1: 1, 2: 2})).single(data)
    ).toStrictEqual(false);

    // !in T/F
    expect(
        new Filter(Key("value").nin({1: 1, 2: 2, 3: 3})).single(data)
    ).toStrictEqual(false);
    expect(
        new Filter(Key("value").nin({1: 1, 2: 2})).single(data)
    ).toStrictEqual(true);
});

test("test strict vs not strict equality checking", () => {
    let data = {
        num_value: 1,
        str_value: "1"
    };

    expect(
        new Filter(Key("num_value").eq("1")).single(data)
    ).toStrictEqual(true);
    expect(
        new Filter(Key("num_value").seq("1")).single(data)
    ).toStrictEqual(false);

    expect(
        new Filter(Key("str_value").ne(1)).single(data)
    ).toStrictEqual(false);
    expect(
        new Filter(Key("str_value").sne(1)).single(data)
    ).toStrictEqual(true);
});

test("subset", () => {
    const data = { a: [1, 'test', true, null, 3.45] };
    expect(new Filter(Key('a').subset(new Set([1, true, null, 3.45, 'test', 'missing']))).single(data))
        .toStrictEqual(true);
    expect(new Filter(Key('a').subset([1, true, null, 3.45, 'test'])).single(data))
        .toStrictEqual(true);
    expect(new Filter(Key('a').subset(new Set([1, true, null, 3.45]))).single(data))
        .toStrictEqual(false);
});

test("!subset", () => {
    const data = { a: [1, 'test', true, null, 3.45] };
    expect(new Filter(Key('a').not_subset(new Set([1, true, null, 3.45]))).single(data))
        .toStrictEqual(true);
    expect(new Filter(Key('a').not_subset([])).single(data))
        .toStrictEqual(true);
    expect(new Filter(Key('a').not_subset(new Set([1, true, null, 3.45, 'test', 'missing']))).single(data))
        .toStrictEqual(false);
});

test("superset", () => {
    const data = { a: [1, 'test', true, null, 3.45] };
    expect(new Filter(Key('a').superset(new Set([1, null]))).single(data))
        .toStrictEqual(true);
    expect(new Filter(Key('a').superset([])).single(data))
        .toStrictEqual(true);

    expect(new Filter(Key('a').superset(new Set([1, 3.45, false]))).single(data))
        .toStrictEqual(false);
    expect(new Filter(Key('a').superset(new Set(['missing']))).single(data))
        .toStrictEqual(false);
});

test("superset", () => {
    const data = { a: [1, 'test', true, null, 3.45] };
    expect(new Filter(
        [{ field: 'a', operator: '!superset', value: [1, true]}]
    ).single(data))
        .toStrictEqual(false);
    expect(new Filter(Key('a').not_superset([1, true, 'bill'])).single(data))
        .toStrictEqual(true);

    expect(new Filter(
        [{ field: 'a', operator: '!superset', value: []}]
    ).single(data)).toStrictEqual(false);
});

test("test startswith + endswith", () => {
    let items = new Filter(Key("address").startswith("6")).many(small_data);
    expect(items.length).toStrictEqual(2);

    let items2 = new Filter(Key("registered").endswith("+04:00")).many(small_data);
    expect(items2.length).toStrictEqual(15);
});

test("test present + !present", () => {
    let data = {
        present: 5,
        nested_present: {
            present: 5
        }
    };

    expect(
        new Filter(Key("present").present()).single(data)
    ).toStrictEqual(true);
    expect(
        new Filter(Key("not_present").present()).single(data)
    ).toStrictEqual(false);

    expect(
        new Filter(Key("present").not_present()).single(data)
    ).toStrictEqual(false);
    expect(
        new Filter(Key("not_present").not_present()).single(data)
    ).toStrictEqual(true);

    expect(
        new Filter(Key("nested_present.present").present()).single(data)
    ).toStrictEqual(true);
    expect(
        new Filter(Key("nested_present.not_present").present()).single(data)
    ).toStrictEqual(false);

    expect(
        new Filter(Key("nested_present.present").not_present()).single(data)
    ).toStrictEqual(false);
    expect(
        new Filter(Key("nested_present.not_present").not_present()).single(data)
    ).toStrictEqual(true);
});

test("operator", () => {
    let items = new Filter(Key("address").operator("startswith").value("6")).many(small_data);
    expect(items.length).toStrictEqual(2);

    let items2 = new Filter(Key("registered").operator("endswith").value("+04:00")).many(small_data);
    expect(items2.length).toStrictEqual(15);
});

test("missing", () => {
    expect(
        new Filter(Key("invalid").eq("7")).many(small_data).length
    ).toStrictEqual(0);

    expect(
        new Filter(Key("invalid").eq("7"), false, true).many(small_data).length
    ).toStrictEqual(20);
});

test("filter traversal", () => {
    const filters = [
        { field: "blah", operator: "===", value: "blah"},
        { field: "blah2", operator: "===", value: "blah2"},
        { field: "blah3", operator: "===", value: "blah3"},
        { field: "blah4", operator: "===", value: "blah4"},
        { field: "blah5", operator: "===", value: "blah5"},
    ];

    const condition = Condition.fromArray([
        { or: [ filters[0], filters[1] ] },
        { not: [ filters[2] ] },
        { not: [ { or: [ filters[3], filters[4] ] } ] }
    ]);

    let ct = 0;
    condition.traverse((filter) => {
        expect(filter).toStrictEqual(filters[ct]);
        ct += 1;
    });
});

test('first', () => {
    let firstFemale = null;
    small_data.forEach(item => {
        if (item.gender === 'female' && firstFemale === null) {
            firstFemale = item;
        }
    });

    expect(
        new Filter(Key('gender').seq('female')).first(small_data)
    ).toStrictEqual(firstFemale);
    expect(new Filter(Key('gender').seq('missing')).first(small_data)).toStrictEqual(null);
});

test('last', () => {
    let lastFemale = null;
    for (let i=small_data.length-1; i>=0; i--) {
        if (small_data[i].gender === 'female' && lastFemale === null) {
            lastFemale = small_data[i];
        }
    }
        
    expect(
        new Filter(Key('gender').seq('female')).last(small_data)
    ).toStrictEqual(lastFemale);
    expect(new Filter(Key('gender').seq('missing')).last(small_data)).toStrictEqual(null);
});

test('large filter', () => {
    const cond = Condition.orer(
        Condition.ander(Key('age').seq(34), Key('name').seq('Chang Pollard'), Key('isActive').is_true()),
        Condition.ander(Key('isActive').is_false(), Key('email').startswith('woodard')),
        Condition.ander(Key('friends.$length').seq(7), Key('friends.0.name').seq('Katrina Crane')),
        Condition.ander(Key('name').seq('Castro Wood'), Key('age').seq(-10))
    );

    expect(new Filter(cond).many(small_data)).toStrictEqual([
        small_data[1], small_data[3], small_data[8]
    ]);
});

test('is null', () => {
    const items = [
        {"a": null},
        {"a": false},
        {"a": null},
        {"a": 4}
    ];

    expect(new Filter(Key('a').is_null()).many(items)).toStrictEqual([items[0], items[2]]);
});

test('deep clone', () => {
    const cond = Condition.orer(
        Condition.ander(Key('age').seq(34), Key('name').seq('Chang Pollard'), Key('isActive').is_true()),
        Condition.ander(Key('isActive').is_false(), Key('email').startswith('woodard')),
        Condition.ander(Key('friends.$length').seq(7), Key('friends.0.name').seq('Katrina Crane')),
        Condition.ander(Key('name').seq('Castro Wood'), Key('age').seq(-10)).not_()
    );

    const cond2 = cond.clone(true);
    expect(cond).toStrictEqual(cond2);
    cond2.output[0]['or'][0][0]['value'] = 'test';
    expect(cond).not.toStrictEqual(cond2);
});

test('compare two fields', () => {
    const items = small_data.filter((a) => {
        return a.latitude < a.longitude;
    });

    expect(new Filter(Key('latitude').lt(Key('longitude'))).many(small_data)).toStrictEqual(items);
});

test('compare two fields more complex', () => {
    const items = small_data.filter((a) => {
        return a.favoriteFruit.strawberry*5 >= a.favoriteFruit.cherry/2;
    });

    expect(new Filter(
        Key('favoriteFruit.strawberry.$multiply(5)').gte(Key('favoriteFruit.cherry.$divide(2)'))
    ).many(small_data)).toStrictEqual(items);
});

test('filter query advanced', () => {
    const items = small_data.filter((a) => {
        return a.friends.length === parseInt(a.greeting.split(' unread')[0].split('have ')[1]);
    });

    expect(
        new Filter(Key('friends.$length').seq(Key('greeting.$split(" unread").0.$split("have ").1.$int'))).many(small_data)
    ).toStrictEqual(items);

    expect(
        new Filter(Key('friends.$length').operator('===').value(Key('greeting.$split(" unread").0.$split("have ").1.$int'))).many(small_data)
    ).toStrictEqual(items);
});

test('register filter', () => {
    expect(Filter.register_filter('isMultiple', (field, value) => field % value === 0)).toStrictEqual(true);
    expect(new Filter(Key('').operator('isMultiple').value(3)).single(27)).toStrictEqual(true);
    expect(new Filter(Key('').operator('isMultiple').value(3)).single(28)).toStrictEqual(false);
    expect(Filter.register_filter('isMultiple', (field, value) => field % value === 0)).toStrictEqual(false);
});
