import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import Profissional from '../models/Profissional';

class ProfissionalController {
  async store(req: Request, res: Response) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      telefone: Yup.string().required(),
      email: Yup.string().email().required(),
      tipoDeProfissional: Yup.string().required(),
    });
    try {
      await schema.validate(req.body);
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }
    const profissionalRepo = getRepository(Profissional);
    try {
      const profissional = profissionalRepo.create(req.body);

      await profissionalRepo.save(profissional);
      return res.json({ response: 'Profissional criado com sucesso' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async index(req: Request, res: Response) {
    const profissionalRepo = getRepository(Profissional);
    try {
      const profissionais = await profissionalRepo.find({
        relations: ['tipoDeProfissional'],
      });

      return res.json(profissionais);
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async destroy(req: Request, res: Response) {
    const profissionalRepo = getRepository(Profissional);

    const profissional = await profissionalRepo.findOne(req.params.id);

    if (!profissional) {
      return res.status(404).json({ error: 'Profissional não encontrado' });
    }

    await profissionalRepo.remove(profissional);

    return res.json({ response: 'Profissional apagado com sucesso' });
  }
}

export default new ProfissionalController();
