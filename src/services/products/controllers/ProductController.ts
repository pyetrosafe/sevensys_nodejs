// src/services/products/controllers/ProductController.ts
import {Request, Response} from 'express';
import {Product} from '../models/Product';

export class ProductController {

  public async index(req: Request, res: Response) {
    try {
      const list = await Product.findAndCountAll();

      return res.json(list);

    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }

  public async show(req: Request, res: Response) {
      try {
        const product = await Product.findByPk(req.params.id);
        if (product == null) {
          // throw new Error('Product não encontrado');
          return res.status(404).json({message: 'Product não encontrado'});
        }
        const category = await product.getCategory();
        return res.status(200).json({ product, category });
    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }

  public async save(req: Request, res: Response) {
      try {
        const product = await Product.create(req.body);
        return res.status(201).json(product);
    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }

  public async edit(req: Request, res: Response) {
      try {
        const product = await Product.findByPk(req.params.id);
        if (product == null) {
          // throw new Error('Product não encontrado');
          return res.status(404).json({message: 'Product não encontrado'});
        }
        const result = await product.update(req.body);
        return res.status(200).json(result);
    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }

  public async delete(req: Request, res: Response) {
      try {
        const product = await Product.findByPk(req.params.id);
        if (product == null) {
          return res.status(404).json({message: 'Product não encontrado'});
        }
        const result = await Product.destroy({
          where: { id : req.params.id }
        });
        return res.status(200).json({message: result == 1 ? 'Registro "'+req.params.id+'" removido com sucesso!' : 'Ocorreu um erro ao remover o registro!'});
    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }
}