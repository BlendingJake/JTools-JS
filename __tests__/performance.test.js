import { Query, Filter, Key, Formatter } from "../dist";
let large_data = require("./data/10000.json");

test("query reuse", () => {
    let times = 10;
    let start;
    let sum = 0;

    for (let i=0; i<times; i++) {
        start = Date.now();

        large_data.forEach(item => {
            new Query('email.$split("@").1.$split(".").0').single(item);
        });
        let recreate_time = Date.now() - start;

        start = Date.now();
        let getter = new Query('email.$split("@").1.$split(".").0');
        large_data.forEach(item => {
            getter.single(item);
        });
        let reuse_time = Date.now() - start;

        sum += recreate_time / reuse_time;
    }

    console.log(sum / times, "x faster to reuse Query then recreate");
    expect(sum / times).toBeGreaterThan(5);
});

test("filter reuse", () => {
    let times = 10;
    let start;
    let sum = 0;

    for (let i=0; i<times; i++) {
        start = Date.now();

        large_data.forEach(item => {
            new Filter(Key("gender").eq("male").and_(
                Key("friends.$length").gte(3)
            )).single(item);
        });
        let recreate_time = Date.now() - start;

        start = Date.now();
        let filter = new Filter(Key("gender").eq("male").and_(
            Key("friends.$length").gte(3)
        ));
        large_data.forEach(item => {
            filter.single(item);
        });
        let reuse_time = Date.now() - start;

        sum += recreate_time / reuse_time;
    }

    console.log(sum / times, "x faster to reuse Filter then recreate");
    expect(sum / times).toBeGreaterThan(5);
});

test("formatter reuse", () => {
    let times = 10;
    let start;
    let sum = 0;

    for (let i=0; i<times; i++) {
        start = Date.now();

        large_data.forEach(item => {
            new Formatter('@email.$split("@").1.$split(".").0 @gender @male').single(item);
        });
        let recreate_time = Date.now() - start;

        start = Date.now();
        let formatter = new Formatter('@email.$split("@").1.$split(".").0 @gender @male');
        large_data.forEach(item => {
            formatter.single(item);
        });
        let reuse_time = Date.now() - start;

        sum += recreate_time / reuse_time;
    }

    console.log(sum / times, "x faster to reuse Formatter then recreate");
    expect(sum / times).toBeGreaterThan(5);
});