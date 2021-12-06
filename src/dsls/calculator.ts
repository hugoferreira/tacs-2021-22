class Calculator {
  stack = Array<number>()
  pressNumber(a: number) { this.stack.push(a) }
  pressOperator(op: string) {
    if (op === 'sum') {
      const a1 = this.stack.pop()!
      const a2 = this.stack.pop()!
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