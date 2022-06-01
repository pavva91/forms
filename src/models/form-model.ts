import { IFormDef } from "./form-definition-model";

// Form Definition schema
export interface IForm {
    id: number;
    values: string[];
}


/**
 * Get a new Form object.
 * 
 * @returns 
 */
function getNew(id: number, values: string[]): IForm {
    return {
        id: -1,
        values
    };
}


/**
 * Copy a user object.
 * 
 * @param user 
 * @returns 
 */
function copy(form: IForm): IForm {
    return {
        id: form.id,
        values: form.values
    }
}


// Export default
export default {
    new: getNew,
    copy,
}
