class Renderer {
  static render(board) {
    const key = { 0: '⚫️', 1: '🟡', 2: '🔴' };

    console.log(
      board
        .map(cols => cols.join(''))
        .join('\n')
        .replace(/[012]/g, char => key[char])
    );
  }
}

module.exports = Renderer;
