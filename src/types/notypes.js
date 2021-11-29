// Tipos (Metaprogramação)

// Exemplos de tipos:

// String   [10, 23, 45, 23, 45, 76, 43, 65, 87, 34, 67]
// Float    (size)
// Double   (size)
// Int
// Boolean  (false == 0) (true != 0)
// Char     (8bits -> symbol) (ASCII) (Unicode)

function writeHTML(content, color) {  }

function iterate(as) {
  const result = Array()
  for (let i = 0; i < as.length; i++) {
    result.push(`*${i.toString()}`)
  }
  return result
}

iterate(Array('a', 2, 3, 4)) //?

const cenas = Array('a', 'b', 'c')
cenas //?

const a = 'left'

// Pros Types
// + Less Errors 
// + Errors appear in compile time (not runtime)
//   + Runtime -> Execute -> Execute the potential error in order to *know* there is an error
// + Easier Debug
// + Easier to read (it becomes easier to interpret the code)
// + Easier to refactor

// Cons
// - More complex to write code
// - Increases development time
// -> Harder to read (it becomes necessary to interpret the types) <-

// Hábitos
// - Any/Void/Object
