import * as jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['x-access-token'];
  
  if (!token) {
    return res.status(401).json({ auth: false, message: 'Token não informado!'});
  }

  jwt.verify(token, process.env.SECRET || 'umsecretqualquer', function(err, decoded) {
    if (err) {
      return res.status(500).json({auth: false, message: 'Token inválido'});
    }

    // Se tudo tiver certo, vamos salvar na req o id do usuário
    //@ts-ignore
    req.userId = decoded.id;
    next();
   });
}

export {
  verifyJWT,
};