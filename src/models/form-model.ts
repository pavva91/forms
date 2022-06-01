import { IFormDef } from "./form-definition-model";

// Form Definition schema
export interface IForm {
    id: number;
    formDef: IFormDef
}


/**
 * Get a new Form object.
 * 
 * @returns 
 */
function getNew(name: string, formDef: IFormDef): IForm {
    return {
        id: -1,
        formDef
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
        formDef: form.formDef
    }
}


// Export default
export default {
    new: getNew,
    copy,
}
