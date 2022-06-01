
// Form Definition schema
export interface IFormDef {
    id: number;
    name: string;
    questions: string[];
    types: string[];
}




/**
 * Get a new Form object.
 * 
 * @returns 
 */
function getNew(name: string, questions: string[], types: string[]): IFormDef {
    return {
        id: -1,
        name,
        questions,
        types,
    };
}


/**
 * Copy a user object.
 * 
 * @param user 
 * @returns 
 */
function copy(form: IFormDef): IFormDef {
    return {
        id: form.id,
        name: form.name,
        questions: form.questions,
        types: form.types
    }
}


// Export default
export default {
    new: getNew,
    copy,
}
