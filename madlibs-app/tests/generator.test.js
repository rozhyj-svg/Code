const generator = require('../lib/generator');

test('replaces placeholders with provided inputs', () => {
  const template = 'The {adj} fox {verbPast} over the {noun}.';
  const inputs = { adj: 'quick', verbPast: 'jumped', noun: 'fence' };
  expect(generator.generate(template, inputs)).toBe('The quick fox jumped over the fence.');
});

test('throws error when input missing', () => {
  const template = 'Hello {name}';
  expect(() => generator.generate(template, {})).toThrow(/missing input/);
});
