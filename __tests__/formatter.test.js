import { Formatter } from "../dist";
let small_data = require("./data/20.json");

test("nested capital prefix", () => {
    let data = {env: {VERSION: "1.0.0"}};
    let prefix = "build/";
    expect(
        new Formatter(prefix + "@env.VERSION").single(data)
    ).toStrictEqual(`${prefix}${data.env.VERSION}`);
});

test("nested capital", () => {
    let data = {env: {VERSION: "1.0.0"}};
    expect(
        new Formatter("@env.VERSION").single(data)
    ).toStrictEqual(data.env.VERSION);
});

test("format missing", () => {
    expect(
        new Formatter("{{missing}}").single({})
    ).toStrictEqual(null);
});

test("format missing nested", () => {
    expect(
        new Formatter("{{found.missing}}", "N/A").single({found: {}})
    ).toStrictEqual("N/A");
});

test("format missing nested recursive", () => {
    expect(
        new Formatter("{{a.$index({{index}})}}", "N/A").single({a: [1, 2]})
    ).toStrictEqual("N/A");
});

test("field as argument into special", () => {
    expect(
        new Formatter("Balance: ${{balance.$subtract( {{pending_charges}} )}}").single(
            {balance: 1000, pending_charges: 250})
    ).toStrictEqual("Balance: $750");
});

test("sequential replacements", () => {
    expect(
        new Formatter("{{name}} {{gender}}").single(small_data[0])
    ).toStrictEqual(`${small_data[0].name} ${small_data[0].gender}`);
});

test("complex field as argument", () => {
    expect(
        new Formatter("{{a.$distance({{b}})}}").single({a: [1, 1], b: [4, 5]})
    ).toStrictEqual("5");
});

test("format multiple", () => {
    expect(
        new Formatter("{{name}} {{gender}}").many([small_data[0], small_data[1]])
    ).toStrictEqual([
        `${small_data[0].name} ${small_data[0].gender}`,
        `${small_data[1].name} ${small_data[1].gender}`
    ]);
});