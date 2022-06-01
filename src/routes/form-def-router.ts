import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import formDefService from '@services/form-definition-service';
import { ParamMissingError } from '@shared/errors';

import { IFormDef } from '@models/form-definition-model';

import { getRandomInt } from '@shared/functions';




// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    get: '/all',
    add: '',
    update: '/update',
    delete: '/delete/:id',
} as const;



/**
 * Get all formdefinitions.
 */
router.get(p.get, async (_: Request, res: Response) => {
    const formdefinitions = await formDefService.getAll();
    return res.status(OK).json({formdefinitions});
});


/**
 * Add one form definition.
 */
router.post(p.add, async (req: Request, res: Response) => {
    console.log(req.body)
    console.log(req.body.name)
    console.log(!req.body.types)

    console.log(req.body.questions)
    console.log(req.body.types)

    console.log("Form Definition: " + req.body);
    //const { formdefinition } = req.body;
    // var formdefinition:IFormDef = { 
    //     name:req.body.name,
    //     questions:req.body.questions,
    //     types:req.body.types,
    //     id:getRandomInt()
    //  } 
    var formdefinition:IFormDef=req.body;
    console.log("Form Definition: " + formdefinition)
    // Check param
    if (!req.body.name || !req.body.questions || !req.body.types) {
        throw new ParamMissingError();
    }
    //if (!formdefinition) {
    if (!formdefinition) {

        throw new ParamMissingError();
    }
    // Fetch data
    //await formDefService.addOne(formdefinition);
    await formDefService.addOne(formdefinition);
    return res.status(CREATED).end();
});


/**
 * Update one formdefinition.
 */
router.put(p.update, async (req: Request, res: Response) => {
    const { formdefinition } = req.body;
    // Check param
    if (!formdefinition) {
        throw new ParamMissingError();
    }
    // Fetch data
    await formDefService.updateOne(formdefinition);
    return res.status(OK).end();
});


/**
 * Delete one formdefinition.
 */
router.delete(p.delete, async (req: Request, res: Response) => {
    const { id } = req.params;
    // Check param
    if (!id) {
        throw new ParamMissingError();
    }
    // Fetch data
    await formDefService.delete(Number(id));
    return res.status(OK).end();
});


// Export default
export default router;
