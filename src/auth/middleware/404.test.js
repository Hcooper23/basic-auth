const handle404 = require('../middleware/404');

describe('404 Middleware', () => {
  it('should return 404 error for non-existent routes', () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    handle404(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Route not found' });
    expect(next).toHaveBeenCalled();
  });
});