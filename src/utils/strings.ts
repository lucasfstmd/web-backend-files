export class Strings {
    public static readonly OBJETO_ARQUIVO_INVALIDO = 'Objeto de arquivo inválido'
    public static readonly NAO_FOI_POSSIVEL_GRAVAR = 'Não foi possível gravar o arquivo no banco de dados'
    public static readonly ID_INVALIDO = 'ID inválido'
    public static readonly NENHUM_ARQUIVO_ENCONTRADO = 'Nenhum arquivo encontrado com este id'

    public static readonly APP: any = {
        TITLE: 'DATA CROSS API',
        APP_DESCRIPTION: 'Service responsible for performing the data management.'
    }

    public static stringsException(param: string) {
        return {
            ALREADY_REGISTERED: `A ${param.toLowerCase()} already registered!`,
            NOT_FOUND: `${param} not found!`,
            NOT_FOUND_DESCRIPTION: `${param} not found or already removed. A new operation for the same resource is required!`
        }
    }

    public static readonly ERROR_MESSAGE: any = {
        UNEXPECTED: 'An unexpected error has occurred. Please try again later...',
        UUID_NOT_VALID_FORMAT: 'Some ID provided does not have a valid format!',
        UUID_NOT_VALID_FORMAT_DESC: 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea is expected.',
        PARAMETER_COULD_NOT_BE_UPDATED: 'This parameter could not be updated.',
        OPERATION_CANT_BE_COMPLETED: 'The operation could not be performed successfully.',
        OPERATION_CANT_BE_COMPLETED_DESC: 'Probably one or more of the request parameters are incorrect.',
        INTERNAL_SERVER_ERROR: 'An internal server error has occurred.',
        INTERNAL_SERVER_ERROR_DESC: 'Check all parameters of the operation being requested.',
        INVALID_FIELDS: 'One or more request fields are invalid...',
        INTEGER_GREATER_ZERO: '{0} must be an integer greater than zero.',
        NUMBER_GREATER_ZERO: '{0} must be a number greater than zero.',
        INVALID_DATE_FORMAT: 'Date: {0}, is not in valid ISO 8601 format.',
        INVALID_DATE_FORMAT_DESC: 'Date must be in the format: yyyy-MM-dd',
        INVALID_DATETIME_FORMAT: 'Datetime: {0}, is not in valid ISO 8601 format.',
        INVALID_DATETIME_FORMAT_DESC: 'Datetime must be in the format: yyyy-MM-ddTHH:mm:ssZ',
        VALIDATE: {
            REQUIRED_FIELDS: 'Required fields were not provided...',
            REQUIRED_FIELDS_DESC: '{0} are required!',
            UUID_NOT_VALID_FORMAT: 'Some ID provided does not have a valid format!',
            UUID_NOT_VALID_FORMAT_DESC: 'A 24-byte hex ID similar to this: 507f191e810c19729de860ea is expected.',
            INVALID_FIELDS: 'One or more request fields are invalid...',
            INVALID_STRING: '{0} must be a string!',
            INVALID_NUMBER: '{0} must be a number!',
            EMPTY_STRING: '{0} must have at least one character!',
            INTEGER_GREATER_ZERO: '{0} must be an integer greater than zero.',
            NUMBER_GREATER_ZERO: '{0} must be a number greater than zero.',
            INVALID_DATA_TYPES_DESC: 'The data_types array must contain at least one element.',
            IMAGE_FORMAT_DESC: 'The image format must be jpg, jpeg or png.',
            IMAGE_SIZE_TOO_LARGE: 'The image size must be equal to or less than 500kb.'
        },
        IDENTIFIER: {
            INVALID_FORMAT: {
                MESSAGE: 'Identifier: {0}, is not in valid format.',
                DESCRIPTION: 'The identifier must follow the format ddd, where d is a digit between [0-9].'
            }
        }
    }
}
