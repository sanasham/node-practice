"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const calculator_ts_1 = __importDefault(require("../calculator.ts"));
describe("Test Calculator class", () => {
    it("should return sum", () => {
        //Arrange
        const calc = new calculator_ts_1.default();
        //Act
        const result = calc.add(2, 3);
        //Assertion
        (0, chai_1.expect)(result).to.equal(2);
    });
});
