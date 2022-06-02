import { IFormDef } from "./form-definition-model";

// Form Definition schema
export interface IForm {
    id: number;
    values: unknown[];
    form_definition_id: number;
}


/**
 * Get a new Form object.
 * 
 * @returns 
 */
function getNew(id: number, values: unknown[], form_definition_id: number): IForm {
    return {
        id: -1,
        values,
        form_definition_id
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
        values: form.values,
        form_definition_id: form.form_definition_id
    }
}


// Export default
export default {
    new: getNew,
    copy,
}
