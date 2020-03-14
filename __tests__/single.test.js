import { Query } from "../dist";

test("test", () => {
    let query = new Query("data.field.$special('something', 5, 2.4, [1, 2], @test)");
    console.log(query.parts[0]);
    console.log(query.parts[0].parts[2].arguments);
});