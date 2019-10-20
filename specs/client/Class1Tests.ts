import { Class1 } from "../../src/client/Class1";

describe("Class1Tests", () =>
{
    it("PropertyName_DefaultValue_ReturnsClass1", () =>
    {
        let instance1 = new Class1();
        
        expect(instance1.Name).toEqual("Class1");
    });
});
