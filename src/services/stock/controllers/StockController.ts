import {Request, Response} from 'express';
import {StockSchema} from '../schemas/StockSchemas';
import * as mongoose from "mongoose";
import * as _ from 'lodash';

const Stock = mongoose.model('Stock', StockSchema)

export class StockController {

  public async index(req: Request, res: Response) {
    try {
      const list = await Stock.findAndCountAll();

      return res.json(list);

    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }

  public async show(req: Request, res: Response) {
      try {
        const test = await Stock.findByPk(req.params.id);
        if (test == null) {
          // throw new Error('Test não encontrado');
          return res.status(404).json({message: 'Test não encontrado'});
        }
        return res.status(200).json(test);
    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }

  public async save(req: Request, res: Response) {
      try {
        const test = await Stock.create(req.body);
        return res.status(201).json(test);
    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }

  public async edit(req: Request, res: Response) {
      try {
        const test = await Stock.findByPk(req.params.id);
        if (test == null) {
          // throw new Error('Test não encontrado');
          return res.status(404).json({message: 'Test não encontrado'});
        }
        const result = await test.update(req.body);
        return res.status(200).json(result);
    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }

  public async delete(req: Request, res: Response) {
      try {
        const test = await Stock.findByPk(req.params.id);
        if (test == null) {
          return res.status(404).json({message: 'Test não encontrado'});
        }
        const result = await Stock.destroy({
          where: { id : req.params.id }
        });
        return res.status(200).json({message: result == 1 ? 'Registro "'+req.params.id+'" removido com sucesso!' : 'Ocorreu um erro ao remover o registro!'});
    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }

  public async proccessJob() {
    try {
      //
      Stock.find({status: 'PENDING'})
           .sort({create_date: 1})
           .limit(10)
           .exec(async(err, stocks) => {
            if (err)
              throw new Error(err)
            
            if (stocks.length > 0) {
              // Update para processed
              const resUpdate = await Stock.updateMany({_id: {$id : _.map(stocks, '_id')}
              }, {
                $set: {status: 'PROCESSED'}
              });

              return resUpdate;
            }
           });
    } catch(e){

    }
  }
}