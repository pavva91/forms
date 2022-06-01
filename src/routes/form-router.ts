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
    add: '/:id/entries',
    update: '/update',
    delete: '/delete/:id',
} as const;



/**
 * Get all users.
 */
router.get(p.get, async (_: Request, res: Response) => {
    const users = await formService.getAll();
    return res.status(OK).json({users});
});


/**
 * Add one form entry.
 */
router.post(p.add, async (req: Request, res: Response) => {
    let id: number = parseInt(req.params.id)
    

   
    // Check param
    // if (!req.body.) {
    //     throw new ParamMissingError();
    // }
    // Fetch data
    // var form:IForm=req.body;
    let form = {values: req.body.values, id:getRandomInt()}
    await formService.addOne(form, id);
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
