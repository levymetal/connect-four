class Analyzer {
  constructor(seed) {
    if (typeof seed !== 'string' || seed.length !== 7 * 6 || seed.match(/[^012]/)) throw new Error('invalid seed');
    this.board = seed.match(/.{7}/g).map(row => row.split('').map(Number));
  }

  get winner() {
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 7; x++) {
        const winner =
          new Vector((_, i) => this.board[y + 0]?.[x + i]).winner || // horizontal
          new Vector((_, i) => this.board[y + i]?.[x + 0]).winner || // vertical
          new Vector((_, i) => this.board[y + i]?.[x - i]).winner || // positive diagonal
          new Vector((_, i) => this.board[y + i]?.[x + i]).winner; // negative diagonal
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
