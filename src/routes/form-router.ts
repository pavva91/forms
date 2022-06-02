import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import formService from '@services/form-service';
import formDefService from '@services/form-definition-service';
import { ParamMissingError } from '@shared/errors';
import { IForm } from '@models/form-model';
import { getRandomInt } from '@shared/functions';




// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    get: '/all',
    add: '/:form_definition_id/entries',
    filter: '/:form_definition_id/entries',
    update: '/update',
    delete: '/delete/:id',
} as const;



/**
 * Get all form entries.
 */
router.get(p.get, async (_: Request, res: Response) => {
    const users = await formService.getAll();
    return res.status(OK).json({users});
});

/**
 * Get all form entries of a form definition where company older than 3 years.
 */
 router.get(p.filter, async (req: Request, res: Response) => {
    let threshold = 3;
    let whichField = 1;
    
     // TODO: Check if a number
    let form_definition_id: number = parseInt(req.params.form_definition_id);

    const forms = await formService.filterAndListForms(form_definition_id, threshold, whichField);
    return res.status(OK).json({forms});
});


/**
 * Add one form entry.
 */
router.post(p.add, async (req: Request, res: Response) => {
    // TODO: Check if a number
    let form_definition_id: number = parseInt(req.params.form_definition_id);
    // Check param
    if (!req.body.values) {
        throw new ParamMissingError();
    }
    let form = {values: req.body.values, id:getRandomInt(), form_definition_id:form_definition_id}
    await formService.addOne(form);
    return res.status(CREATED).end();
});


/**
 * Update one user.
 */
router.put(p.update, async (req: Request, res: Response) => {
    const { user } = req.body;
    // Check param
    if (!user) {
        throw new ParamMissingError();
    }
    // Fetch data
    await formService.updateOne(user);
    return res.status(OK).end();
});


/**
 * Delete one user.
 */
router.delete(p.delete, async (req: Request, res: Response) => {
    const { id } = req.params;
    // Check param
    if (!id) {
        throw new ParamMissingError();
    }
    // Fetch data
    await formService.delete(Number(id));
    return res.status(OK).end();
});


// Export default
export default router;
