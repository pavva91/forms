import formRepo from '@repos/form-repo';
import formDefRepo from '@repos/form-definition-repo';
import { IForm } from '@models/form-model';
import { IFormDef } from '@models/form-definition-model';
import { FormDefNotFoundError, UserNotFoundError, InvalidNumberFieldsError, InvalidTypeError } from '@shared/errors';
import { BOOLEAN, DATE, NUMBER, STRING, TUPLE } from '@shared/constants';
import { equal } from 'assert';



/**
 * Get all forms.
 * 
 * @returns 
 */
function getAll(): Promise<IForm[]> {
    return formRepo.getAll();
}


/**
 * Add one form entry.
 * 
 * @param form 
 * @returns 
 */
async function addOne(form: IForm): Promise<void> {
    await checkFormDefinitionExist(form.form_definition_id);

    const formdefinition = await formDefRepo.get(form.form_definition_id);

    if(formdefinition !== null){

        if(form.values.length !== formdefinition.types.length){
            throw new InvalidNumberFieldsError();
        }
        // TODO: Check arrays types and values
        // define our tuple
        let ourTuple: [number, boolean, string];
        var i:number; 
        for(i = 0;i<form.values.length;i++) {
            let actualValue = form.values[i]
            switch (formdefinition.types[i]) {
                case STRING:
                    console.log(i + ' - Check String: ' + actualValue);
                    let castString:string = (actualValue as string)
                    console.log(castString)
                    console.log((actualValue as string).length);
                    break;
                case NUMBER:
                    console.log(i + ' - Check integer: ' + actualValue);
                    let castNumber:number = (actualValue as number)
                    checkValidNumber(castNumber);
                    break;
                case BOOLEAN:
                    console.log(i + ' - Check boolean: ' + actualValue);
                    console.log(isBooleanParsable(actualValue as string))
                    if(!isBooleanParsable(actualValue as string)) {
                        throw Error("Is not a valid boolean value: " + actualValue)
                    }
                    let castBoolean = parseBoolean(actualValue as string);
                    console.log(castBoolean);
                    form.values[i] = castBoolean; 
                    break;
                case DATE:
                    // Only work with format: dd/mm/YYYY
                    // TODO: Regex
                    console.log(i + ' - Check Date: ' + actualValue);
                    console.log(Date.parse(actualValue as string))
                    let dateStr = actualValue as string

                    let firstSlash = dateStr.slice(2,3)
                    let secondSlash = dateStr.slice(5,6)

                    // console.log(firstSlash)
                    // console.log(secondSlash)

                    checkValidDateFormat(firstSlash, secondSlash);

                    let day: number = dateStr.slice(0, 2) as unknown as number
                    checkValidNumber(day)

                    let month: number = dateStr.slice(3, 5) as unknown as number
                    checkValidNumber(month)

                    let year: number = dateStr.slice(6,10) as unknown as number
                    checkValidNumber(year)

                    // console.log(day)
                    // console.log(month)
                    // console.log(year)

                    let date: Date = new Date(year, month - 1, day, 1, 0, 0, 0)

                    console.log(date)
                    form.values[i] = date
                    break;
                case TUPLE:
                    console.log(i + ' - Check tuple: ' + actualValue);
                    break;
                default:
                    throw Error('Invalid case');
            }


            
         }
        formdefinition.types.forEach(function(item){  
            
        });  

    }

    

    return formRepo.add(form);
    
}

const isBooleanParsable = (val: string ): boolean => {
    const s = val && val.toString().toLowerCase().trim();
    if (s == 'true' || s == 'false'){
        return true;
    }
    return false; 
}

const parseBoolean = (val: string ): boolean => {
    const s = val && val.toString().toLowerCase().trim();
    if (s == 'true'){
        return true;
    } else if (s == 'false') {
        return false; 
    }else {
        throw Error("Invalid Input")
    }
    
}

function checkValidDateFormat(firstSlash: string, secondSlash: string) {
    if (firstSlash !== '/' || secondSlash !== '/') {
        throw Error("Invalid Date Format");
    }
}

function checkValidNumber(castNumber: number) {
    if (Number.isNaN(castNumber * 2)) {
        throw Error("Invalid number: " + castNumber);
    }
}

async function checkFormDefinitionExist(id: number) {
    const persists = await formDefRepo.persists(id);
    if (!persists) {
        throw new FormDefNotFoundError();
    }
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
