import * as P from 'parsimmon'

function range(start: number, end: number): number[] {
  const result: number[] = []
  let i = start
  while (i <= end) {
    result.push(i)
    i += 1
  }
  return result
}

const inputA = "A3"
const inputB = "=SUM(A27:A3)";

/=SUM\([a-zA-Z][0-9]+:[a-zA-Z][0-9]\)/.test(inputA) //?

class Expr {
  execute() { }
}

class Cell extends Expr { 
  constructor(public row: string, public column: number) { super() }
}

class Sum extends Expr {
  as: Array<Cell>
  constructor(...as: Array<Cell>) { super(); this.as = as }
}

new Sum(new Cell('A', 27), new Cell('A', 3))

type Grammar = {
  expr: Sum | Cell,
  sumExpr: Sum,
  rangeCellExpr: Array<Cell>,
  cellExpr: Cell,
  numberLiteral: number,
  stringLiteral: string
}

const lang = P.createLanguage<Grammar>({
  expr: l => P.alt(l.sumExpr, l.cellExpr),
  sumExpr: l => P.seq(P.string('sum('), l.rangeCellExpr, P.string(')'))
                 .map(([_, rangeArray, __]) => new Sum(...rangeArray)),
  rangeCellExpr: l => P.seq(l.cellExpr, P.string(':'), l.cellExpr)
                       .map(([a, _, b]) => 
                         range(a.column, b.column).map(i => new Cell(a.row, i))
                       ),
  cellExpr: l => P.seq(l.stringLiteral, l.numberLiteral)
                  .map(([r, c]) => new Cell(r, c)),
  numberLiteral: _ => P.digits.map(r => parseInt(r, 10)),
  stringLiteral: _ => P.letters
})

const result = lang.expr.tryParse("A3").execute() //?

new Sum(new Cell('A', 3), new Cell('A', 4), new Cell('A', 5))


