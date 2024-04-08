import { expect } from "chai";
import Calculator from "../calculator";
describe("Test Calculator class", () => {
  it("should return sum", () => {
    console.log("object");
    //Arrange
    const calc = new Calculator();

    //Act

    const result = calc.add(2, 3);

    //Assertion
    expect(result).to.equal(2);
  });
});
