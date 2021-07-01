const Analyzer = require('./analyzer');
const Renderer = require('./renderer');

describe('Analyzer', () => {
  let analyzer;

  afterEach(() => {
    if (analyzer?.board) Renderer.render(analyzer.board);
    analyzer = undefined;
  });

  it('throws on invalid seed', () => {
    expect(() => new Analyzer('steve')).toThrow('invalid seed');
    expect(() => new Analyzer('12')).toThrow('invalid seed');
    expect(() => new Analyzer('300000010200102120210122121111121211121212')).toThrow('invalid seed');
  });

  it('initialises the board correctly', () => {
    analyzer = new Analyzer('000000010200102120210122121111121211121212');
    expect(analyzer.board).toEqual([
      [0, 0, 0, 0, 0, 0, 0],
      [1, 0, 2, 0, 0, 1, 0],
      [2, 1, 2, 0, 2, 1, 0],
      [1, 2, 2, 1, 2, 1, 1],
      [1, 1, 1, 2, 1, 2, 1],
      [1, 1, 2, 1, 2, 1, 2],
    ]);
  });

  describe('without a winning vector', () => {
    it('does not detect a win', () => {
      analyzer = new Analyzer('000000010200102120210122121111121211121212');
      expect(analyzer.winner).toBeUndefined();
    });
  });

  describe('with a winning vector', () => {
    test('detects win on horizontal', () => {
      analyzer = new Analyzer('000000010200102120210122121111111211121212');
      expect(analyzer.winner).toBe(1);
    });

    test('detects win on vertical', () => {
      analyzer = new Analyzer('000000010100102120210122121111221211121212');
      expect(analyzer.winner).toBe(2);
    });

    test('detects win on positive diagonal', () => {
      analyzer = new Analyzer('000000010200102120220122121111121211121212');
      expect(analyzer.winner).toBe(2);
    });

    test('detects win on negative diagonal', () => {
      analyzer = new Analyzer('000000010200102110210122121111121211121212');
      expect(analyzer.winner).toBe(1);
    });
  });
});
