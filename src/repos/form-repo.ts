import { IForm } from '@models/form-model';
import { getRandomInt } from '@shared/functions';
import orm from './mock-orm';



/**
 * Get one form.
 * 
 * @param name 
 * @returns 
 */
async function getOne(name: string): Promise<IForm | null> {
    const db = await orm.openDb();
    for (const form of db.forms) {
        if (form.name === name) {
            return form;
        }
    }
    return null;
}

/**
 * See if a form with the given id exists.
 * 
 * @param id 
 */
 async function get(id: number): Promise<IForm | null> {
    const db = await orm.openDb();
        for (const form of db.forms) {
            if (form.id === id) {
                return form;
            }
        }
    return null;
}

/**
 * See if a form with the given id exists.
 * 
 * @param id 
 */
async function persists(id: number): Promise<boolean> {
    const db = await orm.openDb();
    for (const form of db.forms) {
        if (form.id === id) {
            return true;
        }
    }
    return false;
}


/**
 * Get all form definitions.
 * 
 * @returns 
 */
async function getAll(): Promise<IForm[]> {
    const db = await orm.openDb();
    return db.forms;
}


/**
 * Add one form defintiion.
 * 
 * @param form 
 * @returns 
 */
async function add(form: IForm): Promise<void> {
    const db = await orm.openDb();
    // form.id = getRandomInt();
    db.forms.push(form);
    return orm.saveDb(db);
}


/**
 * Update a form.
 * 
 * @param form 
 * @returns 
 */
async function update(form: IForm): Promise<void> {
    const db = await orm.openDb();
    for (let i = 0; i < db.forms.length; i++) {
        if (db.forms[i].id === form.id) {
            db.forms[i] = form;
            return orm.saveDb(db);
        }
    }
}


/**
 * Delete one form.
 * 
 * @param id 
 * @returns 
 */
async function deleteOne(id: number): Promise<void> {
    const db = await orm.openDb();
    for (let i = 0; i < db.forms.length; i++) {
        if (db.forms[i].id === id) {
            db.forms.splice(i, 1);
            return orm.saveDb(db);
        }
    }
}


// Export default
export default {
    get,
    getOne,
    persists,
    getAll,
    add,
    update,
    delete: deleteOne,
} as const;
