import { IFormDef } from '@models/form-definition-model';
import { getRandomInt } from '@shared/functions';
import orm from './mock-orm';



/**
 * Get one formdefinition.
 * 
 * @param name 
 * @returns 
 */
async function getOne(name: string): Promise<IFormDef | null> {
    const db = await orm.openDb();
    for (const formdefinition of db.formdefinitions) {
        if (formdefinition.name === name) {
            return formdefinition;
        }
    }
    return null;
}

/**
 * See if a formdefinition with the given id exists.
 * 
 * @param id 
 */
 async function get(id: number): Promise<IFormDef | null> {
    const db = await orm.openDb();
        for (const formdefinition of db.formdefinitions) {
            if (formdefinition.id === id) {
                return formdefinition;
            }
        }
    return null;
}

/**
 * See if a formdefinition with the given id exists.
 * 
 * @param id 
 */
async function persists(id: number): Promise<boolean> {
    const db = await orm.openDb();
    for (const formdefinition of db.formdefinitions) {
        if (formdefinition.id === id) {
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
async function getAll(): Promise<IFormDef[]> {
    const db = await orm.openDb();
    return db.formdefinitions;
}


/**
 * Add one form defintiion.
 * 
 * @param formdefinition 
 * @returns 
 */
async function add(formdefinition: IFormDef): Promise<void> {
    const db = await orm.openDb();
    // formdefinition.id = getRandomInt();
    db.formdefinitions.push(formdefinition);
    return orm.saveDb(db);
}


/**
 * Update a formdefinition.
 * 
 * @param formdefinition 
 * @returns 
 */
async function update(formdefinition: IFormDef): Promise<void> {
    const db = await orm.openDb();
    for (let i = 0; i < db.formdefinitions.length; i++) {
        if (db.formdefinitions[i].id === formdefinition.id) {
            db.formdefinitions[i] = formdefinition;
            return orm.saveDb(db);
        }
    }
}


/**
 * Delete one formdefinition.
 * 
 * @param id 
 * @returns 
 */
async function deleteOne(id: number): Promise<void> {
    const db = await orm.openDb();
    for (let i = 0; i < db.formdefinitions.length; i++) {
        if (db.formdefinitions[i].id === id) {
            db.formdefinitions.splice(i, 1);
            return orm.saveDb(db);
        }
    }
}


// Export default
export default {
    getOne,
    persists,
    getAll,
    add,
    update,
    delete: deleteOne,
} as const;
