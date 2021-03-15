import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import ProfissionalController from './app/controllers/ProfissionalController';
import TipoProfissionalController from './app/controllers/TipoProfissionalController';
import swaggerDocument from './swagger';

const router = Router();

router.get('/', (req, res) => {
  return res.send('Tudo ok :D');
});

router.post('/tipo', TipoProfissionalController.store);
router.get('/tipo', TipoProfissionalController.index);
router.delete('/tipo/:id', TipoProfissionalController.destroy);

router.post('/profissional', ProfissionalController.store);
router.get('/profissional', ProfissionalController.index);
router.delete('/profissional/:id', ProfissionalController.destroy);

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

export default router;
