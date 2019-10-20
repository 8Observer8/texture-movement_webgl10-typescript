import { Class2 } from "../../src/client/Class2";

describe("Class2Tests", () =>
{
    it("PropertyName_DefaultValue_ReturnsClass2", () =>
    {
        let instance2 = new Class2();
        
        expect(instance2.Name).toEqual("Class2");
    });
});
