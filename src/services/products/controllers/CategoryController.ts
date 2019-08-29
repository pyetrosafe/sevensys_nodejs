import {Request, Response} from 'express';
import {Category} from '../models/Category';

export class CategoryController {

  public async index(req: Request, res: Response) {
    try {
      const list = await Category.findAndCountAll();

      return res.json(list);

    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }

  public async show(req: Request, res: Response) {
      try {
        const category = await Category.findByPk(req.params.id);
        if (category == null) {
          // throw new Error('Category não encontrado');
          return res.status(404).json({message: 'Category não encontrado'});
        }
        return res.status(200).json(category);
    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }

  public async save(req: Request, res: Response) {
      try {
        const category = await Category.create(req.body);
        return res.status(201).json(category);
    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }

  public async edit(req: Request, res: Response) {
      try {
        const category = await Category.findByPk(req.params.id);
        if (category == null) {
          // throw new Error('Category não encontrado');
          return res.status(404).json({message: 'Category não encontrado'});
        }
        const result = await category.update(req.body);
        return res.status(200).json(result);
    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }

  public async delete(req: Request, res: Response) {
      try {
        const category = await Category.findByPk(req.params.id);
        if (category == null) {
          return res.status(404).json({message: 'Category não encontrado'});
        }
        const result = await Category.destroy({
          where: { id : req.params.id }
        });
        return res.status(200).json({message: result == 1 ? 'Registro "'+req.params.id+'" removido com sucesso!' : 'Ocorreu um erro ao remover o registro!'});
    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }
}