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
 * Return the list of form entries that have the numeric field "whichField" greater than "thresholdValue"
 * @param form_definition_id 
 * @param thresholdValue The number that is filtering
 * @param whichField Which numeric field in the entry
 * @returns 
 */
async function filterAndListForms(form_definition_id: number, thresholdValue: number, whichField: number): Promise<IForm[]> {
    await checkFormDefinitionExist(form_definition_id);

    const formDefinition = await formDefRepo.get(form_definition_id);

    var index: number = -1

    if(formDefinition !== null){
        var count:number = countIntegerFields(formDefinition);
        if(count <= 0) {
            throw Error("No number fields in form definition with id: " + form_definition_id)
        }
        if(whichField > count) {
            throw Error("No such a number of numeric fields present in form definition. Are present " + count + " numeric fields and you requested the field " + whichField)
        }

        index = getIndexOfWantedField(count, formDefinition, whichField);

    }

    var resultForms: IForm[] = [];

    (await formRepo.getAll()).forEach(form => {
        if(form.values[index] as number > thresholdValue) {
            resultForms.push(form)
        }
    });

    return resultForms;
}

function getIndexOfWantedField(count: number, formDefinition: IFormDef, whichField: number) :number{
    var index: number = -1;
    var count: number = 0;
    for (var i: number = 0; i < formDefinition.types.length && index < 0; i++) {
        if (formDefinition.types[i] === NUMBER) {
            count++;
        }
        if (count === whichField) {
            index = i;
        }
    }
    if(index<0) {
        throw Error("Not Found")
    }
    return index;
}


function countIntegerFields(formDefinition: IFormDef): number{
    var count: number = 0;
    for (var i: number = 0; i < formDefinition.types.length; i++) {
        if (formDefinition.types[i] === NUMBER) {
            count++;
        }
    }
    return count;
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
            let actualValue = form.values[i];
            switch (formdefinition.types[i]) {
                case STRING:
                    console.log(i + ' - Check String: ' + actualValue);
                    let castString:string = (actualValue as string)
                    console.log(castString)
                    console.log((actualValue as string).length);
                    form.values[i] = castString;
                    break;
                case NUMBER:
                    // NOTE: Just checking number cast, not integer
                    console.log(i + ' - Check integer: ' + actualValue);
                    let castNumber:number = (actualValue as number)
                    checkValidNumber(castNumber);
                    form.values[i] = castNumber;
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
                    let dateStr = actualValue as string;

                    let firstSlash = dateStr.slice(2,3);
                    let secondSlash = dateStr.slice(5,6);

                    checkValidDateFormat(firstSlash, secondSlash);

                    let day: number = dateStr.slice(0, 2) as unknown as number;
                    checkValidNumber(day);

                    let month: number = dateStr.slice(3, 5) as unknown as number;
                    checkValidNumber(month);

                    let year: number = dateStr.slice(6,10) as unknown as number;
                    checkValidNumber(year);

                    let date: Date = new Date(year, month - 1, day, 1, 0, 0, 0);
                    form.values[i] = date
                    break;
                case TUPLE:
                    // TODO: regex to extract lat and lon
                    // TODO: save lat and lon as [lat, lon]
                    console.log(i + ' - Check tuple: ' + actualValue);
                    break;
                default:
                    throw Error('Invalid case');
            }
         }
    }
    
    return formRepo.add(form);
    
}

const isBooleanParsable = (val: string ): boolean => {
    const s = val && val.toString().toLowerCase().trim();
    if (s == 'true' || s == 'false' || s == 'f' || s == 't'){
        return true;
    }
    return false; 
}

const parseBoolean = (val: string ): boolean => {
    const s = val && val.toString().toLowerCase().trim();
    if (s == 'true' || s == 't'){
        return true;
    } else if (s == 'false' || s == 'f') {
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
    filterAndListForms,
    getAll,
    addOne,
    updateOne,
    delete: deleteOne,
} as const;
