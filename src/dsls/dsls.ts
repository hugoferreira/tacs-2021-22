// "=SUM(A3:A5)"

// Feature: Perform simple binary calculations

// Scenario: A sum of two numbers should be correct
//     Given the number 2
//     And the number 3
//     When I press sum
//     Then the result should be 5

class Calculator {
  stack = Array<number>()
  pressNumber(a: number) { this.stack.push(a) }
  pressOperator(op: string) {
    if (op === 'sum') {
      const a1 = this.stack.pop()
      const a2 = this.stack.pop()
      this.stack.push(a1 + a2)
    }
  }
  display() { return this.stack[this.stack.length - 1] } 
}

const c = new Calculator()
c.pressNumber(2)
c.pressNumber(3)
c.pressOperator('sum')
c.display(); //?

const number = /I press the number (\d+)/.test("I press the number 3") //?
number //?

// ------------------------------

class CalculatorContext {
  constructor(public currentCalculator?: Calculator, private success: boolean = true) { }

  given(action: String): CalculatorContext {
    if (action === "a calculator") {
      this.currentCalculator = new Calculator()
    } 

    return this
  }

  when(action: string): WhenContext {
    const pressNumber = /I press the number (\d+)/
    const pressKey = /I press (sum|multiply)/

    if (pressNumber.test(action)) {
      const number = parseInt(pressNumber.exec(action)[1])
      this.currentCalculator.pressNumber(number)
    } else if (pressKey.test(action)) {
      const actionName = pressKey.exec(action)[1] //?
      this.currentCalculator.pressOperator(actionName)
    } 

    return new WhenContext(this.currentCalculator, this.success)
  }

  then(action: string): ThenContext {
    const testNumber = /the result should be (\d+)/
    const testGT = /the result should be greater than (\d+)/
    const testLT = /the result should be less than (\d+)/

    if (testNumber.test(action)) {
      const number = parseInt(testNumber.exec(action)[1])
      this.success = (this.currentCalculator.display() === number)
    } else if (testGT.test(action)) {
      const number = parseInt(testGT.exec(action)[1]) 
      this.success = (this.currentCalculator.display() > number) 
    } else if (testLT.test(action)) {
      const number = parseInt(testLT.exec(action)[1])
      this.success = (this.currentCalculator.display() < number)
    }

    return new ThenContext(this.currentCalculator, this.success)
  }

  check(): boolean { return this.success }
}

class WhenContext extends CalculatorContext {
  constructor(currentCalculator?: Calculator, success: boolean = false) { super(currentCalculator, success) }
  and(action: string): WhenContext { return this.when(action) }
}

class ThenContext extends CalculatorContext {
  constructor(currentCalculator?: Calculator, success: boolean = false) { super(currentCalculator, success) }
  
  and(action: string): ThenContext { 
    const newCtx = this.then(action)
    return new ThenContext(newCtx.currentCalculator, this.check() && newCtx.check())
  }

  or(action: string): ThenContext {
    const newCtx = this.then(action)
    return new ThenContext(newCtx.currentCalculator, this.check() || newCtx.check())
  }
}

function scenario(title: String, steps: (ctx: CalculatorContext) => CalculatorContext): boolean { 
  return steps(new CalculatorContext()).check()
}

/* @match(/the result should be (\d+)/)
function testNumberShouldBe<T>(test: T, expected: T) { return test === expected }

const steps = [[/the result should be (\d+)/, testNumberShouldBe]]
*/

scenario("A sum of two numbers should be correct", _ => 
  _.given("a calculator") 
   .when("I press the number 2")
   .and("I press the number 4")
   .and("I press sum")
   .then("the result should be 10")
   .or("the result should be greater than 10")
   .or("the result should be less than 10")
) //?

/*
  function test1() {
    const c = new Calculator()
    c.pressNumber(2)
    c.pressNumber(3)
    c.pressOperator('sum')
    assert((c.display() === 10) || (c.display() > 10) || (c.display() < 10))
  }
*/

scenario("A sum of two numbers should be correct", _ => 
  _.given("a calculator") 
   .when("I press the number 2")
   .and("I press the number 4")
   .and("I press sum")
   .then("the result should be 6")
   .and("the result should be less than 4")
) //?

