import formDefRepo from '@repos/form-definition-repo';
import { IFormDef } from '@models/form-definition-model';
import { UserNotFoundError, QuestionsAndTypesAreNotEqualNumberError, InvalidTypeError } from '@shared/errors';
import { BOOLEAN, NUMBER, STRING, TUPLE, DATE } from '@shared/constants';


/**
 * Get all formdefinitions.
 * 
 * @returns 
 */
function getAll(): Promise<IFormDef[]> {
    return formDefRepo.getAll();
}

/**
 * Get a formdefinition by their id.
 * 
 * @param id 
 * @returns 
 */
 async function get(id: number): Promise<IFormDef | null> {
    const persists = await formDefRepo.persists(id);
    if (!persists) {
        throw new UserNotFoundError();
    }
    return formDefRepo.get(id);
}


/**
 * Add one formdefinition.
 * 
 * @param formdefinition 
 * @returns 
 */
function addOne(formdefinition: IFormDef): Promise<void> {

    checkQuestionsAndTypesEquality(formdefinition);
    checkValidTypes(formdefinition);

    return formDefRepo.add(formdefinition);
}


function checkValidTypes(formdefinition: IFormDef) {
    for (var i: number = 0; i < formdefinition.types.length; i++) {
        if (formdefinition.types[i] !== STRING && formdefinition.types[i] !== NUMBER && formdefinition.types[i] !== BOOLEAN && formdefinition.types[i] !== DATE && formdefinition.types[i] !== TUPLE) {
            throw new InvalidTypeError();
        }
    }
}

function checkQuestionsAndTypesEquality(formdefinition: IFormDef) {
    if (formdefinition.questions.length !== formdefinition.types.length) {
        throw new QuestionsAndTypesAreNotEqualNumberError();
    }
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
    get,
    getAll,
    addOne,
    updateOne,
    delete: deleteOne,
} as const;
