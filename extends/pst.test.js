const rewire = require("rewire")
const pst = rewire("./pst")
const checkT = pst.__get__("checkT")
// @ponicode
describe("checkT", () => {
    test("0", () => {
        let callFunction = () => {
            checkT(0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            checkT(0.0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            checkT(1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            checkT(-10)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            checkT("Anas")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            checkT(-Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
