const flowAPI = require("./flowAPI")
// @ponicode
describe("flowAPI.default.fetchProcessFlow", () => {
    test("0", () => {
        let callFunction = () => {
            flowAPI.default.fetchProcessFlow()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("flowAPI.default.fetchDetailByFlowCode", () => {
    test("0", () => {
        let callFunction = () => {
            flowAPI.default.fetchDetailByFlowCode("function readToken_lt_gt(code) {\n\t      // '<>'\n\t      var next = this.input.charCodeAt(this.state.pos + 1);\n\t      var size = 1;\n\t\n\t      if (next === code) {\n\t        size = code === 62 && this.input.charCodeAt(this.state.pos + 2) === 62 ? 3 : 2;\n\t        if (this.input.charCodeAt(this.state.pos + size) === 61) return this.finishOp(_types.types.assign, size + 1);\n\t        return this.finishOp(_types.types.bitShift, size);\n\t      }\n\t\n\t      if (next === 33 && code === 60 && this.input.charCodeAt(this.state.pos + 2) === 45 && this.input.charCodeAt(this.state.pos + 3) === 45) {\n\t        if (this.inModule) this.unexpected();\n\t        // `<!--`, an XML-style comment that should be interpreted as a line comment\n\t        this.skipLineComment(4);\n\t        this.skipSpace();\n\t        return this.nextToken();\n\t      }\n\t\n\t      if (next === 61) {\n\t        // <= | >=\n\t        size = 2;\n\t      }\n\t\n\t      return this.finishOp(_types.types.relational, size);\n\t    }")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            flowAPI.default.fetchDetailByFlowCode("function unescape(code) {\n        return code.replace(/\\\\('|\\\\)/g, \"$1\").replace(/[\\r\\t\\n]/g, \" \");\n    }")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            flowAPI.default.fetchDetailByFlowCode("function substr(start, length) {\n        return string_substr.call(\n            this,\n            start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start,\n            length\n        );\n    }")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            flowAPI.default.fetchDetailByFlowCode("function(code) {\n\t\t\t\treturn I.mode === 'client' || !Basic.arrayDiff(code, [200, 404]);\n\t\t\t}")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            flowAPI.default.fetchDetailByFlowCode("function log(code) {\n        var args = [];\n        for (var _i = 1; _i < arguments.length; _i++) {\n            args[_i - 1] = arguments[_i];\n        }\n        console.log(utils.tr.apply(null, arguments));\n    }\n")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            flowAPI.default.fetchDetailByFlowCode(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("flowAPI.default.updatePositions", () => {
    test("0", () => {
        let callFunction = () => {
            flowAPI.default.updatePositions("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            flowAPI.default.updatePositions(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("flowAPI.default.toggleProcessResult", () => {
    test("0", () => {
        let callFunction = () => {
            flowAPI.default.toggleProcessResult("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            flowAPI.default.toggleProcessResult(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("flowAPI.default.fetchWorkGroup", () => {
    test("0", () => {
        let callFunction = () => {
            flowAPI.default.fetchWorkGroup()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("flowAPI.default.fetchProcessList", () => {
    test("0", () => {
        let callFunction = () => {
            flowAPI.default.fetchProcessList()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("flowAPI.default.fetchProcessGroup", () => {
    test("0", () => {
        let callFunction = () => {
            flowAPI.default.fetchProcessGroup()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("flowAPI.default.addFlowDetails", () => {
    test("0", () => {
        let callFunction = () => {
            flowAPI.default.addFlowDetails(["user_name", 123, 123])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            flowAPI.default.addFlowDetails(["user name", "user_name", "user123"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            flowAPI.default.addFlowDetails(["user123", 123, "user-name"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            flowAPI.default.addFlowDetails(["user-name", "user_name", "user-name"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            flowAPI.default.addFlowDetails(["user name", 123, "user_name"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            flowAPI.default.addFlowDetails(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("flowAPI.default.updateFlowDetails", () => {
    test("0", () => {
        let callFunction = () => {
            flowAPI.default.updateFlowDetails(["user123", "user123", "user_name"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            flowAPI.default.updateFlowDetails(["user123", "user123", "user-name"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            flowAPI.default.updateFlowDetails(["username", "username", "user123"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            flowAPI.default.updateFlowDetails(["username", "user-name", 123])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            flowAPI.default.updateFlowDetails(["user name", 123, "username"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            flowAPI.default.updateFlowDetails(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("flowAPI.default.deleteFlowDetails", () => {
    test("0", () => {
        let param1 = [["Data Scientist", "Chief Product Officer", "Data Scientist"], ["Chief Product Officer", "Sales", "Data Scientist"], ["Sales", "Chief Product Officer", "Software Engineer"]]
        let callFunction = () => {
            flowAPI.default.deleteFlowDetails(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let param1 = [["Data Scientist", "Marketing", "Software Engineer"], ["Data Scientist", "Marketing", "Software Engineer"], ["Sales", "Chief Product Officer", "Chief Product Officer"]]
        let callFunction = () => {
            flowAPI.default.deleteFlowDetails(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param1 = [["Chief Product Officer", "Sales", "Data Scientist"], ["Sales", "Chief Product Officer", "Software Engineer"], ["Marketing", "Chief Product Officer", "Data Scientist"]]
        let callFunction = () => {
            flowAPI.default.deleteFlowDetails(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let param1 = [["Data Scientist", "Software Engineer", "Sales"], ["Software Engineer", "Data Scientist", "Chief Product Officer"], ["Chief Product Officer", "Data Scientist", "Sales"]]
        let callFunction = () => {
            flowAPI.default.deleteFlowDetails(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param1 = [["Marketing", "Chief Product Officer", "Chief Product Officer"], ["Sales", "Data Scientist", "Sales"], ["Marketing", "Chief Product Officer", "Sales"]]
        let callFunction = () => {
            flowAPI.default.deleteFlowDetails(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            flowAPI.default.deleteFlowDetails(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
