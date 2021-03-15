import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import * as Yup from 'yup';
import TipoProfissional from '../models/TipoProfissional';

class TipoProfissionalController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      descricao: Yup.string().required(),
    });

    try {
      await schema.validate(req.body);
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

    const tipoRepo = getRepository(TipoProfissional);

    try {
      const tipo = tipoRepo.create(req.body);

      await tipoRepo.save(tipo);
      return res.json({ response: 'Tipo de profissional criado com sucesso' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async destroy(req: Request, res: Response) {
    const tipoRepo = getRepository(TipoProfissional);

    const tipo = await tipoRepo.findOne(req.params.id);

    if (!tipo) {
      return res.status(404).json({ error: 'Tipo não encontrado' });
    }

    await tipoRepo.remove(tipo);

    return res.json({ response: 'Tipo apagado com sucesso' });
  }

  async index(req: Request, res: Response) {
    const tipoRepo = getRepository(TipoProfissional);

    try {
      const tipos = await tipoRepo.find();
      return res.json(tipos);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default new TipoProfissionalController();
