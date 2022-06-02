import HttpStatusCodes from 'http-status-codes';


export abstract class CustomError extends Error {

    public readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

    constructor(msg: string, httpStatus: number) {
        super(msg);
        this.HttpStatus = httpStatus;
    }
}


export class ParamMissingError extends CustomError {

    public static readonly Msg = 'One or more of the required parameters was missing.';
    public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

    constructor() {
        super(ParamMissingError.Msg, ParamMissingError.HttpStatus);
    }
}

export class InvalidNumberFieldsError extends CustomError {

    public static readonly Msg = 'The number of fields in the form should be the same of the form definition that define the form';
    public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

    constructor() {
        super(InvalidNumberFieldsError.Msg, InvalidNumberFieldsError.HttpStatus);
    }
}

export class QuestionsAndTypesAreNotEqualNumberError extends CustomError {

    public static readonly Msg = 'The number of questions in the form definition should be the same of the types and viceversa';
    public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

    constructor() {
        super(QuestionsAndTypesAreNotEqualNumberError.Msg, QuestionsAndTypesAreNotEqualNumberError.HttpStatus);
    }
}

export class InvalidTypeError extends CustomError {

    public static readonly Msg = 'The type should be one of the valid ones';
    public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

    constructor() {
        super(InvalidTypeError.Msg, InvalidTypeError.HttpStatus);
    }
}


export class UserNotFoundError extends CustomError {

    public static readonly Msg = 'A user with the given id does not exists in the database.';
    public static readonly HttpStatus = HttpStatusCodes.NOT_FOUND;

    constructor() {
        super(UserNotFoundError.Msg, UserNotFoundError.HttpStatus);
    }
}

export class FormDefNotFoundError extends CustomError {

    public static readonly Msg = 'A form definition with the given id does not exists in the database.';
    public static readonly HttpStatus = HttpStatusCodes.NOT_FOUND;

    constructor() {
        super(FormDefNotFoundError.Msg, FormDefNotFoundError.HttpStatus);
    }
}

export class FormNotFoundError extends CustomError {

    public static readonly Msg = 'A form with the given id does not exists in the database.';
    public static readonly HttpStatus = HttpStatusCodes.NOT_FOUND;

    constructor() {
        super(FormNotFoundError.Msg, FormNotFoundError.HttpStatus);
    }
}
