import { Router } from 'express';
import { getSitesInfo } from './info.js';
import { getSiteTypes } from './types.js';
export const sitesRouter = Router();

sitesRouter.get('/types', getSiteTypes);
sitesRouter.get('/:siteId', getSitesInfo);