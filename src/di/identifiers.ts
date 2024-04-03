/**
 * Constants used in dependence injection.
 *
 * @abstract
 */
export abstract class Identifier {
    public static readonly APP: any = Symbol.for('App')

    // Controllers
    public static readonly FILE_CONTROLLER: any = Symbol.for('FileController')

    // Services
    public static readonly FILE_SERVICE: any = Symbol.for('FileService')

    // Repositories
    public static readonly FILE_REPOSITORY: any = Symbol.for('FileRepository')

    // Models

    // Mappers

    // Background Services
    public static readonly MONGODB_CONNECTION_FACTORY: any = Symbol.for('ConnectionFactoryMongodb')
    public static readonly MONGODB_CONNECTION: any = Symbol.for('ConnectionMongodb')
    public static readonly BACKGROUND_SERVICE: any = Symbol.for('BackgroundService')

    // Tasks
    public static readonly REGISTER_SETTINGS_TASK: any = Symbol.for('RegisterSettingsTask')

    // Log
    public static readonly LOGGER: any = Symbol.for('CustomLogger')
}
