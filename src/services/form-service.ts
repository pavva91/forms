import formRepo from '@repos/form-repo';
import formDefRepo from '@repos/form-definition-repo';
import { IForm } from '@models/form-model';
import { IFormDef } from '@models/form-definition-model';
import { UserNotFoundError } from '@shared/errors';



/**
 * Get all forms.
 * 
 * @returns 
 */
function getAll(): Promise<IForm[]> {
    return formRepo.getAll();
}


/**
 * Add one form.
 * 
 * @param form 
 * @returns 
 */
async function addOne(form: IForm, id:number): Promise<void> {
    const persists = await formDefRepo.persists(id);
    if (!persists) {
        throw new UserNotFoundError();
    }

    const formdefinition = await formDefRepo.get(id);

    // TODO: Check arrays types and values
    return formRepo.add(form);
    
}

/**
 * Add one form.
 * 
 * @param form 
 * @returns 
 */
 function add(form: IForm): Promise<void> {
    return formRepo.add(form);
}


/**
 * Update one form.
 * 
 * @param form 
 * @returns 
 */
async function updateOne(form: IForm): Promise<void> {
    const persists = await formRepo.persists(form.id);
    if (!persists) {
        throw new UserNotFoundError();
    }
    return formRepo.update(form);
}


/**
 * Delete a form by their id.
 * 
 * @param id 
 * @returns 
 */
async function deleteOne(id: number): Promise<void> {
    const persists = await formRepo.persists(id);
    if (!persists) {
        throw new UserNotFoundError();
    }
    return formRepo.delete(id);
}


// Export default
export default {
    getAll,
    addOne,
    updateOne,
    delete: deleteOne,
} as const;
