import jsonwebtoken from "jsonwebtoken";

export const auth = (req: any, res: any, next: any) => {
  const [, token] = req.headers.authorization?.split(' ') || [' ', ' '];

  if(!token) return res.status(401).json({message: 'Invalid token'});

  try {
    const payload = jsonwebtoken.verify(token, process.env.JWT_KEY!!);
    const userId = typeof payload !== 'string' && payload.sub;

    req.headers['user'] = payload.sub;

    return next();
  } catch (e) {
    return res.status(401).json({message: 'Invalid token'});
  }
}