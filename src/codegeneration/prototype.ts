const json = {
  model: {
    sum: '+',
    multiply: '*',
    subtract: '-',
    divide: '/'
  },

  steps: [
    [3, 4234, 'sum'],
    [10, 4236, 'multiply'],
    [43, 4643, 'subtract'],
    [5233, 5233, 'divide'],
    [5433, 134, 'subtract']
  ]
}

// reflection       executable -> model                           code -> data
// reification      model -> code (strings) -> executable         data -> code


const calculator = Object.create(null) 

Object.getOwnPropertyNames(json.model).forEach((name) => {
  const op = json.model[name]
  calculator[name] = new Function('a', 'b', `return (a${op}b)`)
})

calculator.sum(2, 3) //?
calculator.multiply(2, 3) //?

calculator.sum //?

json.steps.map(([a, b, op]) => calculator[op](a, b)) 
