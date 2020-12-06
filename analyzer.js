class Analyzer {
  constructor(seed) {
    if (typeof seed !== 'string' || seed.length !== 7 * 6 || seed.match(/[^012]/)) throw new Error('invalid seed');
    this.board = seed.match(/.{7}/g).map(row => row.split('').map(Number));
  }

  get winner() {
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 7; x++) {
        const build = (yi, xi) => new Vector((_, i) => this.board[y + yi * i]?.[x + xi * i]).winner;
        const winner = build(0, 1) || build(1, 0) || build(1, -1) || build(1, 1);
        if (winner) return winner;
      }
    }
  }
}

class Vector {
  constructor(builder) {
    this.vector = [...Array(4)].map(builder);
  }

  get winner() {
    return [1, 2].find(player => this.vector.every(cell => cell === player));
  }
}

module.exports = Analyzer;
