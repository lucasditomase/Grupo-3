import { validateInput } from '../validationUtil';

describe('validateInput email', () => {
  it('returns true for a valid email', () => {
    expect(validateInput('test@example.com', '123456')).toBe(true);
  });

  it('returns false for an invalid email', () => {
    expect(validateInput('invalid-email', '123456')).toBe(false);
  });
});

describe('validateInput birth date', () => {
  it('returns false for an impossible date', () => {
    expect(
      validateInput(
        'test@example.com',
        '123456',
        'user',
        '30',
        '02',
        '2000'
      )
    ).toBe(false);
  });

  it('returns true for a valid date within allowed range', () => {
    const year = (new Date().getFullYear() - 20).toString();
    expect(
      validateInput('test@example.com', '123456', 'user', '10', '05', year)
    ).toBe(true);
  });
});
