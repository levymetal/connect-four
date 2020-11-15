const Detector = require('./detector');
const Renderer = require('./renderer');

describe('Detector', () => {
  let detector;

  afterEach(() => {
    if (detector?.board) Renderer.render(detector.board);
    detector = undefined;
  });

  it('throws on invalid seed', () => {
    expect(() => new Detector('steve')).toThrow('invalid seed');
    expect(() => new Detector('12')).toThrow('invalid seed');
    expect(() => new Detector('300000010200102120210122121111121211121212')).toThrow('invalid seed');
  });

  it('initialises the board correctly', () => {
    detector = new Detector('000000010200102120210122121111121211121212');
    expect(detector.board).toEqual([
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
      detector = new Detector('000000010200102120210122121111121211121212');
      expect(detector.winner).toBeUndefined();
    });
  });

  describe('with a winning vector', () => {
    test('detects win on horizontal', () => {
      detector = new Detector('000000010200102120210122121111111211121212');
      expect(detector.winner).toBe(1);
    });

    test('detects win on vertical', () => {
      detector = new Detector('000000010100102120210122121111221211121212');
      expect(detector.winner).toBe(2);
    });

    test('detects win on positive diagonal', () => {
      detector = new Detector('000000010200102120220122121111121211121212');
      expect(detector.winner).toBe(2);
    });

    test('detects win on negative diagonal', () => {
      detector = new Detector('000000010200102110210122121111121211121212');
      expect(detector.winner).toBe(1);
    });
  });
});
