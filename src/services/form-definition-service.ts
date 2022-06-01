import formDefRepo from '@repos/form-definition-repo';
import { IFormDef } from '@models/form-definition-model';
import { UserNotFoundError } from '@shared/errors';



/**
 * Get all formdefinitions.
 * 
 * @returns 
 */
function getAll(): Promise<IFormDef[]> {
    return formDefRepo.getAll();
}


/**
 * Add one formdefinition.
 * 
 * @param formdefinition 
 * @returns 
 */
function addOne(formdefinition: IFormDef): Promise<void> {
    return formDefRepo.add(formdefinition);
}


/**
 * Update one formdefinition.
 * 
 * @param formdefinition 
 * @returns 
 */
async function updateOne(formdefinition: IFormDef): Promise<void> {
    const persists = await formDefRepo.persists(formdefinition.id);
    if (!persists) {
        throw new UserNotFoundError();
    }
    return formDefRepo.update(formdefinition);
}


/**
 * Delete a formdefinition by their id.
 * 
 * @param id 
 * @returns 
 */
async function deleteOne(id: number): Promise<void> {
    const persists = await formDefRepo.persists(id);
    if (!persists) {
        throw new UserNotFoundError();
    }
    return formDefRepo.delete(id);
}


// Export default
export default {
    getAll,
    addOne,
    updateOne,
    delete: deleteOne,
} as const;
