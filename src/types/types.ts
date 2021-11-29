// Types and Programming Languages (Benjamim C. Pierce)

/* 

A type system is a tractable syntatic method for proving the absence of certain program behaviors by classifying phrases according to the kinds of values they compute.

Tl;dr; **A tool to reason about programs**

*/

// Mitos

// * Tipos são classes (ou outras estruturas)
// * Tipos são propriedades existentes em runtime (Type Erasure)
// * Tipos são declarados (inferência de tipos)

// Diamond Problem

class Factory {
  withSugar(): Factory & { getSugar(): number } { return null }
  withWhey(): Factory & { getWhey(): boolean } { return null }
  withProtein(): Factory { return null }
}

class SugarFactory extends Factory {
  getSugar(): number { return 0 }
}

class WheyFactory extends Factory {
  getWhey(): boolean { return false }
}

class ProteinFactory extends Factory {
  getProtein(): 'A' | 'B' { return 'A' }
}

new Factory().withSugar().withWhey().getWhey().getSugar()


// Union Type

function oneOrTwo(a: 'one' | 'two') {
  if (typeof a === typeof 'one') {
    return 1
  } else return 2
}

function h1(a: number) { return a * 2 }
function h2(a: 1 | 2) { return a * 2 }

type Odd = number
function h3(a: Odd) { return a * 2 }

h1(oneOrTwo('one'))
h2(oneOrTwo('one'))
h2(3)

type ab = 'a' | 'b'
type AB = Uppercase<ab>

const x = { type: 'c' } 

type StrictBernardo = /* { kind: 'admin' | 'user' } & 
                      ({ username: string, id: number } | 
                       { username: string, group: string, id: number }) */

                       Record<'kind', 'admin' | 'user'> &
                       Record<'username', string> &
                       Record<'id', number> &
                       Record<'group', string>;

type Magia = Omit<StrictBernardo, 'id' | 'group'>

function privacy(x: StrictBernardo): Magia {
  return { kind: x.kind, username: x.username, id: x.id, group: x.group }
}

/* interface StrictBernardo {
  kind: 'admin' | 'user'
  username: string
  id: number
  group?: string 
} */
                       
const user1: StrictBernardo = {
  kind: 'admin',
  username: 'bernardo',
  id: 37
}

const user2: StrictBernardo = {
  kind: 'user',
  username: 'bernardo',
  group: 'm.eic',
  id: 37
}

const wronguser: StrictBernardo = {
  kind: 'xpto',
  username: 'bernardo',
  id: 37
} 

function cenas(_in: StrictBernardo): StrictBernardo {
  return _in
}

cenas(user1)
cenas(user2)
// cenas(wronguser)

// Estruturas de dados nativas:

// Arrays   [10, 23, 45, 23, 45, 76, 43, 65, 87, 34, 67]
// String == Arrays?
// Float    (size)
// Double   (size)
// Int
// Boolean  (false == 0) (true != 0)
// Char     (8bits -> symbol) (ASCII) (Unicode)

// Types
// * Nominal typing
// * Structural typing

