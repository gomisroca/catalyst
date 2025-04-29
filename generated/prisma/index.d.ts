
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model Follow
 * 
 */
export type Follow = $Result.DefaultSelection<Prisma.$FollowPayload>
/**
 * Model Post
 * 
 */
export type Post = $Result.DefaultSelection<Prisma.$PostPayload>
/**
 * Model PostMedia
 * 
 */
export type PostMedia = $Result.DefaultSelection<Prisma.$PostMediaPayload>
/**
 * Model PostInteraction
 * 
 */
export type PostInteraction = $Result.DefaultSelection<Prisma.$PostInteractionPayload>
/**
 * Model Branch
 * 
 */
export type Branch = $Result.DefaultSelection<Prisma.$BranchPayload>
/**
 * Model BranchPermissions
 * 
 */
export type BranchPermissions = $Result.DefaultSelection<Prisma.$BranchPermissionsPayload>
/**
 * Model BranchInteraction
 * 
 */
export type BranchInteraction = $Result.DefaultSelection<Prisma.$BranchInteractionPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model ProjectPermissions
 * 
 */
export type ProjectPermissions = $Result.DefaultSelection<Prisma.$ProjectPermissionsPayload>
/**
 * Model ProjectInteraction
 * 
 */
export type ProjectInteraction = $Result.DefaultSelection<Prisma.$ProjectInteractionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const InteractionType: {
  LIKE: 'LIKE',
  SHARE: 'SHARE',
  BOOKMARK: 'BOOKMARK',
  REPORT: 'REPORT',
  HIDE: 'HIDE'
};

export type InteractionType = (typeof InteractionType)[keyof typeof InteractionType]

}

export type InteractionType = $Enums.InteractionType

export const InteractionType: typeof $Enums.InteractionType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.follow`: Exposes CRUD operations for the **Follow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Follows
    * const follows = await prisma.follow.findMany()
    * ```
    */
  get follow(): Prisma.FollowDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.postMedia`: Exposes CRUD operations for the **PostMedia** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostMedias
    * const postMedias = await prisma.postMedia.findMany()
    * ```
    */
  get postMedia(): Prisma.PostMediaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.postInteraction`: Exposes CRUD operations for the **PostInteraction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostInteractions
    * const postInteractions = await prisma.postInteraction.findMany()
    * ```
    */
  get postInteraction(): Prisma.PostInteractionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.branch`: Exposes CRUD operations for the **Branch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Branches
    * const branches = await prisma.branch.findMany()
    * ```
    */
  get branch(): Prisma.BranchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.branchPermissions`: Exposes CRUD operations for the **BranchPermissions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BranchPermissions
    * const branchPermissions = await prisma.branchPermissions.findMany()
    * ```
    */
  get branchPermissions(): Prisma.BranchPermissionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.branchInteraction`: Exposes CRUD operations for the **BranchInteraction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BranchInteractions
    * const branchInteractions = await prisma.branchInteraction.findMany()
    * ```
    */
  get branchInteraction(): Prisma.BranchInteractionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectPermissions`: Exposes CRUD operations for the **ProjectPermissions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectPermissions
    * const projectPermissions = await prisma.projectPermissions.findMany()
    * ```
    */
  get projectPermissions(): Prisma.ProjectPermissionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.projectInteraction`: Exposes CRUD operations for the **ProjectInteraction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProjectInteractions
    * const projectInteractions = await prisma.projectInteraction.findMany()
    * ```
    */
  get projectInteraction(): Prisma.ProjectInteractionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Account: 'Account',
    Session: 'Session',
    VerificationToken: 'VerificationToken',
    Follow: 'Follow',
    Post: 'Post',
    PostMedia: 'PostMedia',
    PostInteraction: 'PostInteraction',
    Branch: 'Branch',
    BranchPermissions: 'BranchPermissions',
    BranchInteraction: 'BranchInteraction',
    Project: 'Project',
    ProjectPermissions: 'ProjectPermissions',
    ProjectInteraction: 'ProjectInteraction'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "account" | "session" | "verificationToken" | "follow" | "post" | "postMedia" | "postInteraction" | "branch" | "branchPermissions" | "branchInteraction" | "project" | "projectPermissions" | "projectInteraction"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      Follow: {
        payload: Prisma.$FollowPayload<ExtArgs>
        fields: Prisma.FollowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FollowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FollowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          findFirst: {
            args: Prisma.FollowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FollowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          findMany: {
            args: Prisma.FollowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>[]
          }
          create: {
            args: Prisma.FollowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          createMany: {
            args: Prisma.FollowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FollowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>[]
          }
          delete: {
            args: Prisma.FollowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          update: {
            args: Prisma.FollowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          deleteMany: {
            args: Prisma.FollowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FollowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FollowUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>[]
          }
          upsert: {
            args: Prisma.FollowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          aggregate: {
            args: Prisma.FollowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFollow>
          }
          groupBy: {
            args: Prisma.FollowGroupByArgs<ExtArgs>
            result: $Utils.Optional<FollowGroupByOutputType>[]
          }
          count: {
            args: Prisma.FollowCountArgs<ExtArgs>
            result: $Utils.Optional<FollowCountAggregateOutputType> | number
          }
        }
      }
      Post: {
        payload: Prisma.$PostPayload<ExtArgs>
        fields: Prisma.PostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findFirst: {
            args: Prisma.PostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findMany: {
            args: Prisma.PostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          create: {
            args: Prisma.PostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          createMany: {
            args: Prisma.PostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          delete: {
            args: Prisma.PostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          update: {
            args: Prisma.PostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          deleteMany: {
            args: Prisma.PostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          upsert: {
            args: Prisma.PostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.PostGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      PostMedia: {
        payload: Prisma.$PostMediaPayload<ExtArgs>
        fields: Prisma.PostMediaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostMediaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostMediaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostMediaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostMediaPayload>
          }
          findFirst: {
            args: Prisma.PostMediaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostMediaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostMediaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostMediaPayload>
          }
          findMany: {
            args: Prisma.PostMediaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostMediaPayload>[]
          }
          create: {
            args: Prisma.PostMediaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostMediaPayload>
          }
          createMany: {
            args: Prisma.PostMediaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostMediaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostMediaPayload>[]
          }
          delete: {
            args: Prisma.PostMediaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostMediaPayload>
          }
          update: {
            args: Prisma.PostMediaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostMediaPayload>
          }
          deleteMany: {
            args: Prisma.PostMediaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostMediaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostMediaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostMediaPayload>[]
          }
          upsert: {
            args: Prisma.PostMediaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostMediaPayload>
          }
          aggregate: {
            args: Prisma.PostMediaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostMedia>
          }
          groupBy: {
            args: Prisma.PostMediaGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostMediaGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostMediaCountArgs<ExtArgs>
            result: $Utils.Optional<PostMediaCountAggregateOutputType> | number
          }
        }
      }
      PostInteraction: {
        payload: Prisma.$PostInteractionPayload<ExtArgs>
        fields: Prisma.PostInteractionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostInteractionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostInteractionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostInteractionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostInteractionPayload>
          }
          findFirst: {
            args: Prisma.PostInteractionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostInteractionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostInteractionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostInteractionPayload>
          }
          findMany: {
            args: Prisma.PostInteractionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostInteractionPayload>[]
          }
          create: {
            args: Prisma.PostInteractionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostInteractionPayload>
          }
          createMany: {
            args: Prisma.PostInteractionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostInteractionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostInteractionPayload>[]
          }
          delete: {
            args: Prisma.PostInteractionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostInteractionPayload>
          }
          update: {
            args: Prisma.PostInteractionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostInteractionPayload>
          }
          deleteMany: {
            args: Prisma.PostInteractionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostInteractionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostInteractionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostInteractionPayload>[]
          }
          upsert: {
            args: Prisma.PostInteractionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostInteractionPayload>
          }
          aggregate: {
            args: Prisma.PostInteractionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostInteraction>
          }
          groupBy: {
            args: Prisma.PostInteractionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostInteractionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostInteractionCountArgs<ExtArgs>
            result: $Utils.Optional<PostInteractionCountAggregateOutputType> | number
          }
        }
      }
      Branch: {
        payload: Prisma.$BranchPayload<ExtArgs>
        fields: Prisma.BranchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BranchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BranchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          findFirst: {
            args: Prisma.BranchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BranchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          findMany: {
            args: Prisma.BranchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>[]
          }
          create: {
            args: Prisma.BranchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          createMany: {
            args: Prisma.BranchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BranchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>[]
          }
          delete: {
            args: Prisma.BranchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          update: {
            args: Prisma.BranchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          deleteMany: {
            args: Prisma.BranchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BranchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BranchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>[]
          }
          upsert: {
            args: Prisma.BranchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPayload>
          }
          aggregate: {
            args: Prisma.BranchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBranch>
          }
          groupBy: {
            args: Prisma.BranchGroupByArgs<ExtArgs>
            result: $Utils.Optional<BranchGroupByOutputType>[]
          }
          count: {
            args: Prisma.BranchCountArgs<ExtArgs>
            result: $Utils.Optional<BranchCountAggregateOutputType> | number
          }
        }
      }
      BranchPermissions: {
        payload: Prisma.$BranchPermissionsPayload<ExtArgs>
        fields: Prisma.BranchPermissionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BranchPermissionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPermissionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BranchPermissionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPermissionsPayload>
          }
          findFirst: {
            args: Prisma.BranchPermissionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPermissionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BranchPermissionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPermissionsPayload>
          }
          findMany: {
            args: Prisma.BranchPermissionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPermissionsPayload>[]
          }
          create: {
            args: Prisma.BranchPermissionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPermissionsPayload>
          }
          createMany: {
            args: Prisma.BranchPermissionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BranchPermissionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPermissionsPayload>[]
          }
          delete: {
            args: Prisma.BranchPermissionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPermissionsPayload>
          }
          update: {
            args: Prisma.BranchPermissionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPermissionsPayload>
          }
          deleteMany: {
            args: Prisma.BranchPermissionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BranchPermissionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BranchPermissionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPermissionsPayload>[]
          }
          upsert: {
            args: Prisma.BranchPermissionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchPermissionsPayload>
          }
          aggregate: {
            args: Prisma.BranchPermissionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBranchPermissions>
          }
          groupBy: {
            args: Prisma.BranchPermissionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<BranchPermissionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.BranchPermissionsCountArgs<ExtArgs>
            result: $Utils.Optional<BranchPermissionsCountAggregateOutputType> | number
          }
        }
      }
      BranchInteraction: {
        payload: Prisma.$BranchInteractionPayload<ExtArgs>
        fields: Prisma.BranchInteractionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BranchInteractionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchInteractionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BranchInteractionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchInteractionPayload>
          }
          findFirst: {
            args: Prisma.BranchInteractionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchInteractionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BranchInteractionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchInteractionPayload>
          }
          findMany: {
            args: Prisma.BranchInteractionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchInteractionPayload>[]
          }
          create: {
            args: Prisma.BranchInteractionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchInteractionPayload>
          }
          createMany: {
            args: Prisma.BranchInteractionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BranchInteractionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchInteractionPayload>[]
          }
          delete: {
            args: Prisma.BranchInteractionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchInteractionPayload>
          }
          update: {
            args: Prisma.BranchInteractionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchInteractionPayload>
          }
          deleteMany: {
            args: Prisma.BranchInteractionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BranchInteractionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BranchInteractionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchInteractionPayload>[]
          }
          upsert: {
            args: Prisma.BranchInteractionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BranchInteractionPayload>
          }
          aggregate: {
            args: Prisma.BranchInteractionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBranchInteraction>
          }
          groupBy: {
            args: Prisma.BranchInteractionGroupByArgs<ExtArgs>
            result: $Utils.Optional<BranchInteractionGroupByOutputType>[]
          }
          count: {
            args: Prisma.BranchInteractionCountArgs<ExtArgs>
            result: $Utils.Optional<BranchInteractionCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      ProjectPermissions: {
        payload: Prisma.$ProjectPermissionsPayload<ExtArgs>
        fields: Prisma.ProjectPermissionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectPermissionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPermissionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectPermissionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPermissionsPayload>
          }
          findFirst: {
            args: Prisma.ProjectPermissionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPermissionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectPermissionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPermissionsPayload>
          }
          findMany: {
            args: Prisma.ProjectPermissionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPermissionsPayload>[]
          }
          create: {
            args: Prisma.ProjectPermissionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPermissionsPayload>
          }
          createMany: {
            args: Prisma.ProjectPermissionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectPermissionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPermissionsPayload>[]
          }
          delete: {
            args: Prisma.ProjectPermissionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPermissionsPayload>
          }
          update: {
            args: Prisma.ProjectPermissionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPermissionsPayload>
          }
          deleteMany: {
            args: Prisma.ProjectPermissionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectPermissionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectPermissionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPermissionsPayload>[]
          }
          upsert: {
            args: Prisma.ProjectPermissionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPermissionsPayload>
          }
          aggregate: {
            args: Prisma.ProjectPermissionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectPermissions>
          }
          groupBy: {
            args: Prisma.ProjectPermissionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectPermissionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectPermissionsCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectPermissionsCountAggregateOutputType> | number
          }
        }
      }
      ProjectInteraction: {
        payload: Prisma.$ProjectInteractionPayload<ExtArgs>
        fields: Prisma.ProjectInteractionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectInteractionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInteractionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectInteractionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInteractionPayload>
          }
          findFirst: {
            args: Prisma.ProjectInteractionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInteractionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectInteractionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInteractionPayload>
          }
          findMany: {
            args: Prisma.ProjectInteractionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInteractionPayload>[]
          }
          create: {
            args: Prisma.ProjectInteractionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInteractionPayload>
          }
          createMany: {
            args: Prisma.ProjectInteractionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectInteractionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInteractionPayload>[]
          }
          delete: {
            args: Prisma.ProjectInteractionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInteractionPayload>
          }
          update: {
            args: Prisma.ProjectInteractionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInteractionPayload>
          }
          deleteMany: {
            args: Prisma.ProjectInteractionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectInteractionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectInteractionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInteractionPayload>[]
          }
          upsert: {
            args: Prisma.ProjectInteractionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectInteractionPayload>
          }
          aggregate: {
            args: Prisma.ProjectInteractionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProjectInteraction>
          }
          groupBy: {
            args: Prisma.ProjectInteractionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectInteractionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectInteractionCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectInteractionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    account?: AccountOmit
    session?: SessionOmit
    verificationToken?: VerificationTokenOmit
    follow?: FollowOmit
    post?: PostOmit
    postMedia?: PostMediaOmit
    postInteraction?: PostInteractionOmit
    branch?: BranchOmit
    branchPermissions?: BranchPermissionsOmit
    branchInteraction?: BranchInteractionOmit
    project?: ProjectOmit
    projectPermissions?: ProjectPermissionsOmit
    projectInteraction?: ProjectInteractionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    sessions: number
    follows: number
    following: number
    posts: number
    branches: number
    projects: number
    postInteractions: number
    branchInteractions: number
    projectInteractions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    follows?: boolean | UserCountOutputTypeCountFollowsArgs
    following?: boolean | UserCountOutputTypeCountFollowingArgs
    posts?: boolean | UserCountOutputTypeCountPostsArgs
    branches?: boolean | UserCountOutputTypeCountBranchesArgs
    projects?: boolean | UserCountOutputTypeCountProjectsArgs
    postInteractions?: boolean | UserCountOutputTypeCountPostInteractionsArgs
    branchInteractions?: boolean | UserCountOutputTypeCountBranchInteractionsArgs
    projectInteractions?: boolean | UserCountOutputTypeCountProjectInteractionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFollowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFollowingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBranchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BranchWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPostInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostInteractionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBranchInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BranchInteractionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectInteractionWhereInput
  }


  /**
   * Count Type PostCountOutputType
   */

  export type PostCountOutputType = {
    media: number
    interactions: number
  }

  export type PostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    media?: boolean | PostCountOutputTypeCountMediaArgs
    interactions?: boolean | PostCountOutputTypeCountInteractionsArgs
  }

  // Custom InputTypes
  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCountOutputType
     */
    select?: PostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountMediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostMediaWhereInput
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostInteractionWhereInput
  }


  /**
   * Count Type BranchCountOutputType
   */

  export type BranchCountOutputType = {
    interactions: number
    posts: number
  }

  export type BranchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    interactions?: boolean | BranchCountOutputTypeCountInteractionsArgs
    posts?: boolean | BranchCountOutputTypeCountPostsArgs
  }

  // Custom InputTypes
  /**
   * BranchCountOutputType without action
   */
  export type BranchCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchCountOutputType
     */
    select?: BranchCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BranchCountOutputType without action
   */
  export type BranchCountOutputTypeCountInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BranchInteractionWhereInput
  }

  /**
   * BranchCountOutputType without action
   */
  export type BranchCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    interactions: number
    branches: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    interactions?: boolean | ProjectCountOutputTypeCountInteractionsArgs
    branches?: boolean | ProjectCountOutputTypeCountBranchesArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectInteractionWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountBranchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BranchWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string
    emailVerified: Date | null
    image: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    follows?: boolean | User$followsArgs<ExtArgs>
    following?: boolean | User$followingArgs<ExtArgs>
    posts?: boolean | User$postsArgs<ExtArgs>
    branches?: boolean | User$branchesArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    postInteractions?: boolean | User$postInteractionsArgs<ExtArgs>
    branchInteractions?: boolean | User$branchInteractionsArgs<ExtArgs>
    projectInteractions?: boolean | User$projectInteractionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    follows?: boolean | User$followsArgs<ExtArgs>
    following?: boolean | User$followingArgs<ExtArgs>
    posts?: boolean | User$postsArgs<ExtArgs>
    branches?: boolean | User$branchesArgs<ExtArgs>
    projects?: boolean | User$projectsArgs<ExtArgs>
    postInteractions?: boolean | User$postInteractionsArgs<ExtArgs>
    branchInteractions?: boolean | User$branchInteractionsArgs<ExtArgs>
    projectInteractions?: boolean | User$projectInteractionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      follows: Prisma.$FollowPayload<ExtArgs>[]
      following: Prisma.$FollowPayload<ExtArgs>[]
      posts: Prisma.$PostPayload<ExtArgs>[]
      branches: Prisma.$BranchPayload<ExtArgs>[]
      projects: Prisma.$ProjectPayload<ExtArgs>[]
      postInteractions: Prisma.$PostInteractionPayload<ExtArgs>[]
      branchInteractions: Prisma.$BranchInteractionPayload<ExtArgs>[]
      projectInteractions: Prisma.$ProjectInteractionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string
      emailVerified: Date | null
      image: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    follows<T extends User$followsArgs<ExtArgs> = {}>(args?: Subset<T, User$followsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    following<T extends User$followingArgs<ExtArgs> = {}>(args?: Subset<T, User$followingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    posts<T extends User$postsArgs<ExtArgs> = {}>(args?: Subset<T, User$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    branches<T extends User$branchesArgs<ExtArgs> = {}>(args?: Subset<T, User$branchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projects<T extends User$projectsArgs<ExtArgs> = {}>(args?: Subset<T, User$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    postInteractions<T extends User$postInteractionsArgs<ExtArgs> = {}>(args?: Subset<T, User$postInteractionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostInteractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    branchInteractions<T extends User$branchInteractionsArgs<ExtArgs> = {}>(args?: Subset<T, User$branchInteractionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchInteractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    projectInteractions<T extends User$projectInteractionsArgs<ExtArgs> = {}>(args?: Subset<T, User$projectInteractionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectInteractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.follows
   */
  export type User$followsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    where?: FollowWhereInput
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    cursor?: FollowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * User.following
   */
  export type User$followingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    where?: FollowWhereInput
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    cursor?: FollowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * User.posts
   */
  export type User$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * User.branches
   */
  export type User$branchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    where?: BranchWhereInput
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    cursor?: BranchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * User.projects
   */
  export type User$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.postInteractions
   */
  export type User$postInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostInteraction
     */
    select?: PostInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostInteraction
     */
    omit?: PostInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInteractionInclude<ExtArgs> | null
    where?: PostInteractionWhereInput
    orderBy?: PostInteractionOrderByWithRelationInput | PostInteractionOrderByWithRelationInput[]
    cursor?: PostInteractionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostInteractionScalarFieldEnum | PostInteractionScalarFieldEnum[]
  }

  /**
   * User.branchInteractions
   */
  export type User$branchInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchInteraction
     */
    select?: BranchInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchInteraction
     */
    omit?: BranchInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInteractionInclude<ExtArgs> | null
    where?: BranchInteractionWhereInput
    orderBy?: BranchInteractionOrderByWithRelationInput | BranchInteractionOrderByWithRelationInput[]
    cursor?: BranchInteractionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BranchInteractionScalarFieldEnum | BranchInteractionScalarFieldEnum[]
  }

  /**
   * User.projectInteractions
   */
  export type User$projectInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInteraction
     */
    select?: ProjectInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInteraction
     */
    omit?: ProjectInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInteractionInclude<ExtArgs> | null
    where?: ProjectInteractionWhereInput
    orderBy?: ProjectInteractionOrderByWithRelationInput | ProjectInteractionOrderByWithRelationInput[]
    cursor?: ProjectInteractionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectInteractionScalarFieldEnum | ProjectInteractionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expiresAt: number | null
  }

  export type AccountSumAggregateOutputType = {
    expiresAt: number | null
  }

  export type AccountMinAggregateOutputType = {
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refreshToken: string | null
    accessToken: string | null
    expiresAt: number | null
    tokenType: string | null
    scope: string | null
    idToken: string | null
    sessionState: string | null
  }

  export type AccountMaxAggregateOutputType = {
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refreshToken: string | null
    accessToken: string | null
    expiresAt: number | null
    tokenType: string | null
    scope: string | null
    idToken: string | null
    sessionState: string | null
  }

  export type AccountCountAggregateOutputType = {
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refreshToken: number
    accessToken: number
    expiresAt: number
    tokenType: number
    scope: number
    idToken: number
    sessionState: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expiresAt?: true
  }

  export type AccountSumAggregateInputType = {
    expiresAt?: true
  }

  export type AccountMinAggregateInputType = {
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refreshToken?: true
    accessToken?: true
    expiresAt?: true
    tokenType?: true
    scope?: true
    idToken?: true
    sessionState?: true
  }

  export type AccountMaxAggregateInputType = {
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refreshToken?: true
    accessToken?: true
    expiresAt?: true
    tokenType?: true
    scope?: true
    idToken?: true
    sessionState?: true
  }

  export type AccountCountAggregateInputType = {
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refreshToken?: true
    accessToken?: true
    expiresAt?: true
    tokenType?: true
    scope?: true
    idToken?: true
    sessionState?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refreshToken: string | null
    accessToken: string | null
    expiresAt: number | null
    tokenType: string | null
    scope: string | null
    idToken: string | null
    sessionState: string | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refreshToken?: boolean
    accessToken?: boolean
    expiresAt?: boolean
    tokenType?: boolean
    scope?: boolean
    idToken?: boolean
    sessionState?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refreshToken?: boolean
    accessToken?: boolean
    expiresAt?: boolean
    tokenType?: boolean
    scope?: boolean
    idToken?: boolean
    sessionState?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refreshToken?: boolean
    accessToken?: boolean
    expiresAt?: boolean
    tokenType?: boolean
    scope?: boolean
    idToken?: boolean
    sessionState?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refreshToken?: boolean
    accessToken?: boolean
    expiresAt?: boolean
    tokenType?: boolean
    scope?: boolean
    idToken?: boolean
    sessionState?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "type" | "provider" | "providerAccountId" | "refreshToken" | "accessToken" | "expiresAt" | "tokenType" | "scope" | "idToken" | "sessionState", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refreshToken: string | null
      accessToken: string | null
      expiresAt: number | null
      tokenType: string | null
      scope: string | null
      idToken: string | null
      sessionState: string | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const accountWithUserIdOnly = await prisma.account.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `userId`
     * const accountWithUserIdOnly = await prisma.account.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `userId`
     * const accountWithUserIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly expiresAt: FieldRef<"Account", 'Int'>
    readonly tokenType: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly idToken: FieldRef<"Account", 'String'>
    readonly sessionState: FieldRef<"Account", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"sessionToken" | "userId" | "expires", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      sessionToken: string
      userId: string
      expires: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `sessionToken`
     * const sessionWithSessionTokenOnly = await prisma.session.findMany({ select: { sessionToken: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `sessionToken`
     * const sessionWithSessionTokenOnly = await prisma.session.createManyAndReturn({
     *   select: { sessionToken: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `sessionToken`
     * const sessionWithSessionTokenOnly = await prisma.session.updateManyAndReturn({
     *   select: { sessionToken: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Model Follow
   */

  export type AggregateFollow = {
    _count: FollowCountAggregateOutputType | null
    _min: FollowMinAggregateOutputType | null
    _max: FollowMaxAggregateOutputType | null
  }

  export type FollowMinAggregateOutputType = {
    id: string | null
    followerId: string | null
    followedId: string | null
    createdAt: Date | null
  }

  export type FollowMaxAggregateOutputType = {
    id: string | null
    followerId: string | null
    followedId: string | null
    createdAt: Date | null
  }

  export type FollowCountAggregateOutputType = {
    id: number
    followerId: number
    followedId: number
    createdAt: number
    _all: number
  }


  export type FollowMinAggregateInputType = {
    id?: true
    followerId?: true
    followedId?: true
    createdAt?: true
  }

  export type FollowMaxAggregateInputType = {
    id?: true
    followerId?: true
    followedId?: true
    createdAt?: true
  }

  export type FollowCountAggregateInputType = {
    id?: true
    followerId?: true
    followedId?: true
    createdAt?: true
    _all?: true
  }

  export type FollowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Follow to aggregate.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Follows
    **/
    _count?: true | FollowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FollowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FollowMaxAggregateInputType
  }

  export type GetFollowAggregateType<T extends FollowAggregateArgs> = {
        [P in keyof T & keyof AggregateFollow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFollow[P]>
      : GetScalarType<T[P], AggregateFollow[P]>
  }




  export type FollowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowWhereInput
    orderBy?: FollowOrderByWithAggregationInput | FollowOrderByWithAggregationInput[]
    by: FollowScalarFieldEnum[] | FollowScalarFieldEnum
    having?: FollowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FollowCountAggregateInputType | true
    _min?: FollowMinAggregateInputType
    _max?: FollowMaxAggregateInputType
  }

  export type FollowGroupByOutputType = {
    id: string
    followerId: string
    followedId: string
    createdAt: Date
    _count: FollowCountAggregateOutputType | null
    _min: FollowMinAggregateOutputType | null
    _max: FollowMaxAggregateOutputType | null
  }

  type GetFollowGroupByPayload<T extends FollowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FollowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FollowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FollowGroupByOutputType[P]>
            : GetScalarType<T[P], FollowGroupByOutputType[P]>
        }
      >
    >


  export type FollowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    followerId?: boolean
    followedId?: boolean
    createdAt?: boolean
    follower?: boolean | UserDefaultArgs<ExtArgs>
    followed?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["follow"]>

  export type FollowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    followerId?: boolean
    followedId?: boolean
    createdAt?: boolean
    follower?: boolean | UserDefaultArgs<ExtArgs>
    followed?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["follow"]>

  export type FollowSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    followerId?: boolean
    followedId?: boolean
    createdAt?: boolean
    follower?: boolean | UserDefaultArgs<ExtArgs>
    followed?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["follow"]>

  export type FollowSelectScalar = {
    id?: boolean
    followerId?: boolean
    followedId?: boolean
    createdAt?: boolean
  }

  export type FollowOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "followerId" | "followedId" | "createdAt", ExtArgs["result"]["follow"]>
  export type FollowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    follower?: boolean | UserDefaultArgs<ExtArgs>
    followed?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FollowIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    follower?: boolean | UserDefaultArgs<ExtArgs>
    followed?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FollowIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    follower?: boolean | UserDefaultArgs<ExtArgs>
    followed?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FollowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Follow"
    objects: {
      follower: Prisma.$UserPayload<ExtArgs>
      followed: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      followerId: string
      followedId: string
      createdAt: Date
    }, ExtArgs["result"]["follow"]>
    composites: {}
  }

  type FollowGetPayload<S extends boolean | null | undefined | FollowDefaultArgs> = $Result.GetResult<Prisma.$FollowPayload, S>

  type FollowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FollowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FollowCountAggregateInputType | true
    }

  export interface FollowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Follow'], meta: { name: 'Follow' } }
    /**
     * Find zero or one Follow that matches the filter.
     * @param {FollowFindUniqueArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FollowFindUniqueArgs>(args: SelectSubset<T, FollowFindUniqueArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Follow that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FollowFindUniqueOrThrowArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FollowFindUniqueOrThrowArgs>(args: SelectSubset<T, FollowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Follow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowFindFirstArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FollowFindFirstArgs>(args?: SelectSubset<T, FollowFindFirstArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Follow that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowFindFirstOrThrowArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FollowFindFirstOrThrowArgs>(args?: SelectSubset<T, FollowFindFirstOrThrowArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Follows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Follows
     * const follows = await prisma.follow.findMany()
     * 
     * // Get first 10 Follows
     * const follows = await prisma.follow.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const followWithIdOnly = await prisma.follow.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FollowFindManyArgs>(args?: SelectSubset<T, FollowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Follow.
     * @param {FollowCreateArgs} args - Arguments to create a Follow.
     * @example
     * // Create one Follow
     * const Follow = await prisma.follow.create({
     *   data: {
     *     // ... data to create a Follow
     *   }
     * })
     * 
     */
    create<T extends FollowCreateArgs>(args: SelectSubset<T, FollowCreateArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Follows.
     * @param {FollowCreateManyArgs} args - Arguments to create many Follows.
     * @example
     * // Create many Follows
     * const follow = await prisma.follow.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FollowCreateManyArgs>(args?: SelectSubset<T, FollowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Follows and returns the data saved in the database.
     * @param {FollowCreateManyAndReturnArgs} args - Arguments to create many Follows.
     * @example
     * // Create many Follows
     * const follow = await prisma.follow.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Follows and only return the `id`
     * const followWithIdOnly = await prisma.follow.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FollowCreateManyAndReturnArgs>(args?: SelectSubset<T, FollowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Follow.
     * @param {FollowDeleteArgs} args - Arguments to delete one Follow.
     * @example
     * // Delete one Follow
     * const Follow = await prisma.follow.delete({
     *   where: {
     *     // ... filter to delete one Follow
     *   }
     * })
     * 
     */
    delete<T extends FollowDeleteArgs>(args: SelectSubset<T, FollowDeleteArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Follow.
     * @param {FollowUpdateArgs} args - Arguments to update one Follow.
     * @example
     * // Update one Follow
     * const follow = await prisma.follow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FollowUpdateArgs>(args: SelectSubset<T, FollowUpdateArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Follows.
     * @param {FollowDeleteManyArgs} args - Arguments to filter Follows to delete.
     * @example
     * // Delete a few Follows
     * const { count } = await prisma.follow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FollowDeleteManyArgs>(args?: SelectSubset<T, FollowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Follows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Follows
     * const follow = await prisma.follow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FollowUpdateManyArgs>(args: SelectSubset<T, FollowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Follows and returns the data updated in the database.
     * @param {FollowUpdateManyAndReturnArgs} args - Arguments to update many Follows.
     * @example
     * // Update many Follows
     * const follow = await prisma.follow.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Follows and only return the `id`
     * const followWithIdOnly = await prisma.follow.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FollowUpdateManyAndReturnArgs>(args: SelectSubset<T, FollowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Follow.
     * @param {FollowUpsertArgs} args - Arguments to update or create a Follow.
     * @example
     * // Update or create a Follow
     * const follow = await prisma.follow.upsert({
     *   create: {
     *     // ... data to create a Follow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Follow we want to update
     *   }
     * })
     */
    upsert<T extends FollowUpsertArgs>(args: SelectSubset<T, FollowUpsertArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Follows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowCountArgs} args - Arguments to filter Follows to count.
     * @example
     * // Count the number of Follows
     * const count = await prisma.follow.count({
     *   where: {
     *     // ... the filter for the Follows we want to count
     *   }
     * })
    **/
    count<T extends FollowCountArgs>(
      args?: Subset<T, FollowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FollowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Follow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FollowAggregateArgs>(args: Subset<T, FollowAggregateArgs>): Prisma.PrismaPromise<GetFollowAggregateType<T>>

    /**
     * Group by Follow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FollowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FollowGroupByArgs['orderBy'] }
        : { orderBy?: FollowGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FollowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFollowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Follow model
   */
  readonly fields: FollowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Follow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FollowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    follower<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    followed<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Follow model
   */
  interface FollowFieldRefs {
    readonly id: FieldRef<"Follow", 'String'>
    readonly followerId: FieldRef<"Follow", 'String'>
    readonly followedId: FieldRef<"Follow", 'String'>
    readonly createdAt: FieldRef<"Follow", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Follow findUnique
   */
  export type FollowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow findUniqueOrThrow
   */
  export type FollowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow findFirst
   */
  export type FollowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Follows.
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Follows.
     */
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * Follow findFirstOrThrow
   */
  export type FollowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Follows.
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Follows.
     */
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * Follow findMany
   */
  export type FollowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follows to fetch.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Follows.
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * Follow create
   */
  export type FollowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * The data needed to create a Follow.
     */
    data: XOR<FollowCreateInput, FollowUncheckedCreateInput>
  }

  /**
   * Follow createMany
   */
  export type FollowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Follows.
     */
    data: FollowCreateManyInput | FollowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Follow createManyAndReturn
   */
  export type FollowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * The data used to create many Follows.
     */
    data: FollowCreateManyInput | FollowCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Follow update
   */
  export type FollowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * The data needed to update a Follow.
     */
    data: XOR<FollowUpdateInput, FollowUncheckedUpdateInput>
    /**
     * Choose, which Follow to update.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow updateMany
   */
  export type FollowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Follows.
     */
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyInput>
    /**
     * Filter which Follows to update
     */
    where?: FollowWhereInput
    /**
     * Limit how many Follows to update.
     */
    limit?: number
  }

  /**
   * Follow updateManyAndReturn
   */
  export type FollowUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * The data used to update Follows.
     */
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyInput>
    /**
     * Filter which Follows to update
     */
    where?: FollowWhereInput
    /**
     * Limit how many Follows to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Follow upsert
   */
  export type FollowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * The filter to search for the Follow to update in case it exists.
     */
    where: FollowWhereUniqueInput
    /**
     * In case the Follow found by the `where` argument doesn't exist, create a new Follow with this data.
     */
    create: XOR<FollowCreateInput, FollowUncheckedCreateInput>
    /**
     * In case the Follow was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FollowUpdateInput, FollowUncheckedUpdateInput>
  }

  /**
   * Follow delete
   */
  export type FollowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter which Follow to delete.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow deleteMany
   */
  export type FollowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Follows to delete
     */
    where?: FollowWhereInput
    /**
     * Limit how many Follows to delete.
     */
    limit?: number
  }

  /**
   * Follow without action
   */
  export type FollowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
  }


  /**
   * Model Post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    branchId: string | null
    authorId: string | null
  }

  export type PostMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
    branchId: string | null
    authorId: string | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    title: number
    content: number
    createdAt: number
    updatedAt: number
    branchId: number
    authorId: number
    _all: number
  }


  export type PostMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    branchId?: true
    authorId?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    branchId?: true
    authorId?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    branchId?: true
    authorId?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Post to aggregate.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithAggregationInput | PostOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: string
    title: string
    content: string | null
    createdAt: Date
    updatedAt: Date | null
    branchId: string
    authorId: string
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    branchId?: boolean
    authorId?: boolean
    branch?: boolean | BranchDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    media?: boolean | Post$mediaArgs<ExtArgs>
    interactions?: boolean | Post$interactionsArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    branchId?: boolean
    authorId?: boolean
    branch?: boolean | BranchDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    branchId?: boolean
    authorId?: boolean
    branch?: boolean | BranchDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    branchId?: boolean
    authorId?: boolean
  }

  export type PostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "createdAt" | "updatedAt" | "branchId" | "authorId", ExtArgs["result"]["post"]>
  export type PostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | BranchDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    media?: boolean | Post$mediaArgs<ExtArgs>
    interactions?: boolean | Post$interactionsArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | BranchDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | BranchDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Post"
    objects: {
      branch: Prisma.$BranchPayload<ExtArgs>
      author: Prisma.$UserPayload<ExtArgs>
      media: Prisma.$PostMediaPayload<ExtArgs>[]
      interactions: Prisma.$PostInteractionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string | null
      createdAt: Date
      updatedAt: Date | null
      branchId: string
      authorId: string
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = $Result.GetResult<Prisma.$PostPayload, S>

  type PostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface PostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Post'], meta: { name: 'Post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostFindUniqueArgs>(args: SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostFindFirstArgs>(args?: SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostFindManyArgs>(args?: SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends PostCreateArgs>(args: SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {PostCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostCreateManyArgs>(args?: SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Posts and returns the data saved in the database.
     * @param {PostCreateManyAndReturnArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostCreateManyAndReturnArgs>(args?: SelectSubset<T, PostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends PostDeleteArgs>(args: SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostUpdateArgs>(args: SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostDeleteManyArgs>(args?: SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostUpdateManyArgs>(args: SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts and returns the data updated in the database.
     * @param {PostUpdateManyAndReturnArgs} args - Arguments to update many Posts.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostUpdateManyAndReturnArgs>(args: SelectSubset<T, PostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends PostUpsertArgs>(args: SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Post model
   */
  readonly fields: PostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    branch<T extends BranchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BranchDefaultArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    media<T extends Post$mediaArgs<ExtArgs> = {}>(args?: Subset<T, Post$mediaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostMediaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    interactions<T extends Post$interactionsArgs<ExtArgs> = {}>(args?: Subset<T, Post$interactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostInteractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Post model
   */
  interface PostFieldRefs {
    readonly id: FieldRef<"Post", 'String'>
    readonly title: FieldRef<"Post", 'String'>
    readonly content: FieldRef<"Post", 'String'>
    readonly createdAt: FieldRef<"Post", 'DateTime'>
    readonly updatedAt: FieldRef<"Post", 'DateTime'>
    readonly branchId: FieldRef<"Post", 'String'>
    readonly authorId: FieldRef<"Post", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findFirst
   */
  export type PostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findMany
   */
  export type PostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post create
   */
  export type PostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to create a Post.
     */
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }

  /**
   * Post createMany
   */
  export type PostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post createManyAndReturn
   */
  export type PostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Post update
   */
  export type PostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to update a Post.
     */
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post updateManyAndReturn
   */
  export type PostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Post upsert
   */
  export type PostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The filter to search for the Post to update in case it exists.
     */
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     */
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }

  /**
   * Post delete
   */
  export type PostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter which Post to delete.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to delete
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to delete.
     */
    limit?: number
  }

  /**
   * Post.media
   */
  export type Post$mediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostMedia
     */
    select?: PostMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostMedia
     */
    omit?: PostMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostMediaInclude<ExtArgs> | null
    where?: PostMediaWhereInput
    orderBy?: PostMediaOrderByWithRelationInput | PostMediaOrderByWithRelationInput[]
    cursor?: PostMediaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostMediaScalarFieldEnum | PostMediaScalarFieldEnum[]
  }

  /**
   * Post.interactions
   */
  export type Post$interactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostInteraction
     */
    select?: PostInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostInteraction
     */
    omit?: PostInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInteractionInclude<ExtArgs> | null
    where?: PostInteractionWhereInput
    orderBy?: PostInteractionOrderByWithRelationInput | PostInteractionOrderByWithRelationInput[]
    cursor?: PostInteractionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostInteractionScalarFieldEnum | PostInteractionScalarFieldEnum[]
  }

  /**
   * Post without action
   */
  export type PostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
  }


  /**
   * Model PostMedia
   */

  export type AggregatePostMedia = {
    _count: PostMediaCountAggregateOutputType | null
    _min: PostMediaMinAggregateOutputType | null
    _max: PostMediaMaxAggregateOutputType | null
  }

  export type PostMediaMinAggregateOutputType = {
    id: string | null
    name: string | null
    url: string | null
    postId: string | null
  }

  export type PostMediaMaxAggregateOutputType = {
    id: string | null
    name: string | null
    url: string | null
    postId: string | null
  }

  export type PostMediaCountAggregateOutputType = {
    id: number
    name: number
    url: number
    postId: number
    _all: number
  }


  export type PostMediaMinAggregateInputType = {
    id?: true
    name?: true
    url?: true
    postId?: true
  }

  export type PostMediaMaxAggregateInputType = {
    id?: true
    name?: true
    url?: true
    postId?: true
  }

  export type PostMediaCountAggregateInputType = {
    id?: true
    name?: true
    url?: true
    postId?: true
    _all?: true
  }

  export type PostMediaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostMedia to aggregate.
     */
    where?: PostMediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostMedias to fetch.
     */
    orderBy?: PostMediaOrderByWithRelationInput | PostMediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostMediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostMedias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostMedias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostMedias
    **/
    _count?: true | PostMediaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMediaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMediaMaxAggregateInputType
  }

  export type GetPostMediaAggregateType<T extends PostMediaAggregateArgs> = {
        [P in keyof T & keyof AggregatePostMedia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostMedia[P]>
      : GetScalarType<T[P], AggregatePostMedia[P]>
  }




  export type PostMediaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostMediaWhereInput
    orderBy?: PostMediaOrderByWithAggregationInput | PostMediaOrderByWithAggregationInput[]
    by: PostMediaScalarFieldEnum[] | PostMediaScalarFieldEnum
    having?: PostMediaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostMediaCountAggregateInputType | true
    _min?: PostMediaMinAggregateInputType
    _max?: PostMediaMaxAggregateInputType
  }

  export type PostMediaGroupByOutputType = {
    id: string
    name: string
    url: string
    postId: string
    _count: PostMediaCountAggregateOutputType | null
    _min: PostMediaMinAggregateOutputType | null
    _max: PostMediaMaxAggregateOutputType | null
  }

  type GetPostMediaGroupByPayload<T extends PostMediaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostMediaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostMediaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostMediaGroupByOutputType[P]>
            : GetScalarType<T[P], PostMediaGroupByOutputType[P]>
        }
      >
    >


  export type PostMediaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    postId?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postMedia"]>

  export type PostMediaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    postId?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postMedia"]>

  export type PostMediaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    postId?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postMedia"]>

  export type PostMediaSelectScalar = {
    id?: boolean
    name?: boolean
    url?: boolean
    postId?: boolean
  }

  export type PostMediaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "url" | "postId", ExtArgs["result"]["postMedia"]>
  export type PostMediaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
  }
  export type PostMediaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
  }
  export type PostMediaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
  }

  export type $PostMediaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostMedia"
    objects: {
      post: Prisma.$PostPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      url: string
      postId: string
    }, ExtArgs["result"]["postMedia"]>
    composites: {}
  }

  type PostMediaGetPayload<S extends boolean | null | undefined | PostMediaDefaultArgs> = $Result.GetResult<Prisma.$PostMediaPayload, S>

  type PostMediaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostMediaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostMediaCountAggregateInputType | true
    }

  export interface PostMediaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostMedia'], meta: { name: 'PostMedia' } }
    /**
     * Find zero or one PostMedia that matches the filter.
     * @param {PostMediaFindUniqueArgs} args - Arguments to find a PostMedia
     * @example
     * // Get one PostMedia
     * const postMedia = await prisma.postMedia.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostMediaFindUniqueArgs>(args: SelectSubset<T, PostMediaFindUniqueArgs<ExtArgs>>): Prisma__PostMediaClient<$Result.GetResult<Prisma.$PostMediaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostMedia that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostMediaFindUniqueOrThrowArgs} args - Arguments to find a PostMedia
     * @example
     * // Get one PostMedia
     * const postMedia = await prisma.postMedia.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostMediaFindUniqueOrThrowArgs>(args: SelectSubset<T, PostMediaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostMediaClient<$Result.GetResult<Prisma.$PostMediaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostMedia that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostMediaFindFirstArgs} args - Arguments to find a PostMedia
     * @example
     * // Get one PostMedia
     * const postMedia = await prisma.postMedia.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostMediaFindFirstArgs>(args?: SelectSubset<T, PostMediaFindFirstArgs<ExtArgs>>): Prisma__PostMediaClient<$Result.GetResult<Prisma.$PostMediaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostMedia that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostMediaFindFirstOrThrowArgs} args - Arguments to find a PostMedia
     * @example
     * // Get one PostMedia
     * const postMedia = await prisma.postMedia.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostMediaFindFirstOrThrowArgs>(args?: SelectSubset<T, PostMediaFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostMediaClient<$Result.GetResult<Prisma.$PostMediaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostMedias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostMediaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostMedias
     * const postMedias = await prisma.postMedia.findMany()
     * 
     * // Get first 10 PostMedias
     * const postMedias = await prisma.postMedia.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postMediaWithIdOnly = await prisma.postMedia.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostMediaFindManyArgs>(args?: SelectSubset<T, PostMediaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostMediaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostMedia.
     * @param {PostMediaCreateArgs} args - Arguments to create a PostMedia.
     * @example
     * // Create one PostMedia
     * const PostMedia = await prisma.postMedia.create({
     *   data: {
     *     // ... data to create a PostMedia
     *   }
     * })
     * 
     */
    create<T extends PostMediaCreateArgs>(args: SelectSubset<T, PostMediaCreateArgs<ExtArgs>>): Prisma__PostMediaClient<$Result.GetResult<Prisma.$PostMediaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostMedias.
     * @param {PostMediaCreateManyArgs} args - Arguments to create many PostMedias.
     * @example
     * // Create many PostMedias
     * const postMedia = await prisma.postMedia.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostMediaCreateManyArgs>(args?: SelectSubset<T, PostMediaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PostMedias and returns the data saved in the database.
     * @param {PostMediaCreateManyAndReturnArgs} args - Arguments to create many PostMedias.
     * @example
     * // Create many PostMedias
     * const postMedia = await prisma.postMedia.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PostMedias and only return the `id`
     * const postMediaWithIdOnly = await prisma.postMedia.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostMediaCreateManyAndReturnArgs>(args?: SelectSubset<T, PostMediaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostMediaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PostMedia.
     * @param {PostMediaDeleteArgs} args - Arguments to delete one PostMedia.
     * @example
     * // Delete one PostMedia
     * const PostMedia = await prisma.postMedia.delete({
     *   where: {
     *     // ... filter to delete one PostMedia
     *   }
     * })
     * 
     */
    delete<T extends PostMediaDeleteArgs>(args: SelectSubset<T, PostMediaDeleteArgs<ExtArgs>>): Prisma__PostMediaClient<$Result.GetResult<Prisma.$PostMediaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostMedia.
     * @param {PostMediaUpdateArgs} args - Arguments to update one PostMedia.
     * @example
     * // Update one PostMedia
     * const postMedia = await prisma.postMedia.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostMediaUpdateArgs>(args: SelectSubset<T, PostMediaUpdateArgs<ExtArgs>>): Prisma__PostMediaClient<$Result.GetResult<Prisma.$PostMediaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostMedias.
     * @param {PostMediaDeleteManyArgs} args - Arguments to filter PostMedias to delete.
     * @example
     * // Delete a few PostMedias
     * const { count } = await prisma.postMedia.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostMediaDeleteManyArgs>(args?: SelectSubset<T, PostMediaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostMedias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostMediaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostMedias
     * const postMedia = await prisma.postMedia.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostMediaUpdateManyArgs>(args: SelectSubset<T, PostMediaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostMedias and returns the data updated in the database.
     * @param {PostMediaUpdateManyAndReturnArgs} args - Arguments to update many PostMedias.
     * @example
     * // Update many PostMedias
     * const postMedia = await prisma.postMedia.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PostMedias and only return the `id`
     * const postMediaWithIdOnly = await prisma.postMedia.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostMediaUpdateManyAndReturnArgs>(args: SelectSubset<T, PostMediaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostMediaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PostMedia.
     * @param {PostMediaUpsertArgs} args - Arguments to update or create a PostMedia.
     * @example
     * // Update or create a PostMedia
     * const postMedia = await prisma.postMedia.upsert({
     *   create: {
     *     // ... data to create a PostMedia
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostMedia we want to update
     *   }
     * })
     */
    upsert<T extends PostMediaUpsertArgs>(args: SelectSubset<T, PostMediaUpsertArgs<ExtArgs>>): Prisma__PostMediaClient<$Result.GetResult<Prisma.$PostMediaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostMedias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostMediaCountArgs} args - Arguments to filter PostMedias to count.
     * @example
     * // Count the number of PostMedias
     * const count = await prisma.postMedia.count({
     *   where: {
     *     // ... the filter for the PostMedias we want to count
     *   }
     * })
    **/
    count<T extends PostMediaCountArgs>(
      args?: Subset<T, PostMediaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostMediaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostMedia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostMediaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostMediaAggregateArgs>(args: Subset<T, PostMediaAggregateArgs>): Prisma.PrismaPromise<GetPostMediaAggregateType<T>>

    /**
     * Group by PostMedia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostMediaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostMediaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostMediaGroupByArgs['orderBy'] }
        : { orderBy?: PostMediaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostMediaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostMediaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostMedia model
   */
  readonly fields: PostMediaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostMedia.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostMediaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostMedia model
   */
  interface PostMediaFieldRefs {
    readonly id: FieldRef<"PostMedia", 'String'>
    readonly name: FieldRef<"PostMedia", 'String'>
    readonly url: FieldRef<"PostMedia", 'String'>
    readonly postId: FieldRef<"PostMedia", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PostMedia findUnique
   */
  export type PostMediaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostMedia
     */
    select?: PostMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostMedia
     */
    omit?: PostMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostMediaInclude<ExtArgs> | null
    /**
     * Filter, which PostMedia to fetch.
     */
    where: PostMediaWhereUniqueInput
  }

  /**
   * PostMedia findUniqueOrThrow
   */
  export type PostMediaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostMedia
     */
    select?: PostMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostMedia
     */
    omit?: PostMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostMediaInclude<ExtArgs> | null
    /**
     * Filter, which PostMedia to fetch.
     */
    where: PostMediaWhereUniqueInput
  }

  /**
   * PostMedia findFirst
   */
  export type PostMediaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostMedia
     */
    select?: PostMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostMedia
     */
    omit?: PostMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostMediaInclude<ExtArgs> | null
    /**
     * Filter, which PostMedia to fetch.
     */
    where?: PostMediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostMedias to fetch.
     */
    orderBy?: PostMediaOrderByWithRelationInput | PostMediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostMedias.
     */
    cursor?: PostMediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostMedias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostMedias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostMedias.
     */
    distinct?: PostMediaScalarFieldEnum | PostMediaScalarFieldEnum[]
  }

  /**
   * PostMedia findFirstOrThrow
   */
  export type PostMediaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostMedia
     */
    select?: PostMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostMedia
     */
    omit?: PostMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostMediaInclude<ExtArgs> | null
    /**
     * Filter, which PostMedia to fetch.
     */
    where?: PostMediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostMedias to fetch.
     */
    orderBy?: PostMediaOrderByWithRelationInput | PostMediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostMedias.
     */
    cursor?: PostMediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostMedias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostMedias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostMedias.
     */
    distinct?: PostMediaScalarFieldEnum | PostMediaScalarFieldEnum[]
  }

  /**
   * PostMedia findMany
   */
  export type PostMediaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostMedia
     */
    select?: PostMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostMedia
     */
    omit?: PostMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostMediaInclude<ExtArgs> | null
    /**
     * Filter, which PostMedias to fetch.
     */
    where?: PostMediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostMedias to fetch.
     */
    orderBy?: PostMediaOrderByWithRelationInput | PostMediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostMedias.
     */
    cursor?: PostMediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostMedias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostMedias.
     */
    skip?: number
    distinct?: PostMediaScalarFieldEnum | PostMediaScalarFieldEnum[]
  }

  /**
   * PostMedia create
   */
  export type PostMediaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostMedia
     */
    select?: PostMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostMedia
     */
    omit?: PostMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostMediaInclude<ExtArgs> | null
    /**
     * The data needed to create a PostMedia.
     */
    data: XOR<PostMediaCreateInput, PostMediaUncheckedCreateInput>
  }

  /**
   * PostMedia createMany
   */
  export type PostMediaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostMedias.
     */
    data: PostMediaCreateManyInput | PostMediaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostMedia createManyAndReturn
   */
  export type PostMediaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostMedia
     */
    select?: PostMediaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostMedia
     */
    omit?: PostMediaOmit<ExtArgs> | null
    /**
     * The data used to create many PostMedias.
     */
    data: PostMediaCreateManyInput | PostMediaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostMediaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostMedia update
   */
  export type PostMediaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostMedia
     */
    select?: PostMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostMedia
     */
    omit?: PostMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostMediaInclude<ExtArgs> | null
    /**
     * The data needed to update a PostMedia.
     */
    data: XOR<PostMediaUpdateInput, PostMediaUncheckedUpdateInput>
    /**
     * Choose, which PostMedia to update.
     */
    where: PostMediaWhereUniqueInput
  }

  /**
   * PostMedia updateMany
   */
  export type PostMediaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostMedias.
     */
    data: XOR<PostMediaUpdateManyMutationInput, PostMediaUncheckedUpdateManyInput>
    /**
     * Filter which PostMedias to update
     */
    where?: PostMediaWhereInput
    /**
     * Limit how many PostMedias to update.
     */
    limit?: number
  }

  /**
   * PostMedia updateManyAndReturn
   */
  export type PostMediaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostMedia
     */
    select?: PostMediaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostMedia
     */
    omit?: PostMediaOmit<ExtArgs> | null
    /**
     * The data used to update PostMedias.
     */
    data: XOR<PostMediaUpdateManyMutationInput, PostMediaUncheckedUpdateManyInput>
    /**
     * Filter which PostMedias to update
     */
    where?: PostMediaWhereInput
    /**
     * Limit how many PostMedias to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostMediaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostMedia upsert
   */
  export type PostMediaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostMedia
     */
    select?: PostMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostMedia
     */
    omit?: PostMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostMediaInclude<ExtArgs> | null
    /**
     * The filter to search for the PostMedia to update in case it exists.
     */
    where: PostMediaWhereUniqueInput
    /**
     * In case the PostMedia found by the `where` argument doesn't exist, create a new PostMedia with this data.
     */
    create: XOR<PostMediaCreateInput, PostMediaUncheckedCreateInput>
    /**
     * In case the PostMedia was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostMediaUpdateInput, PostMediaUncheckedUpdateInput>
  }

  /**
   * PostMedia delete
   */
  export type PostMediaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostMedia
     */
    select?: PostMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostMedia
     */
    omit?: PostMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostMediaInclude<ExtArgs> | null
    /**
     * Filter which PostMedia to delete.
     */
    where: PostMediaWhereUniqueInput
  }

  /**
   * PostMedia deleteMany
   */
  export type PostMediaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostMedias to delete
     */
    where?: PostMediaWhereInput
    /**
     * Limit how many PostMedias to delete.
     */
    limit?: number
  }

  /**
   * PostMedia without action
   */
  export type PostMediaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostMedia
     */
    select?: PostMediaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostMedia
     */
    omit?: PostMediaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostMediaInclude<ExtArgs> | null
  }


  /**
   * Model PostInteraction
   */

  export type AggregatePostInteraction = {
    _count: PostInteractionCountAggregateOutputType | null
    _min: PostInteractionMinAggregateOutputType | null
    _max: PostInteractionMaxAggregateOutputType | null
  }

  export type PostInteractionMinAggregateOutputType = {
    id: string | null
    type: $Enums.InteractionType | null
    createdAt: Date | null
    postId: string | null
    userId: string | null
  }

  export type PostInteractionMaxAggregateOutputType = {
    id: string | null
    type: $Enums.InteractionType | null
    createdAt: Date | null
    postId: string | null
    userId: string | null
  }

  export type PostInteractionCountAggregateOutputType = {
    id: number
    type: number
    createdAt: number
    postId: number
    userId: number
    _all: number
  }


  export type PostInteractionMinAggregateInputType = {
    id?: true
    type?: true
    createdAt?: true
    postId?: true
    userId?: true
  }

  export type PostInteractionMaxAggregateInputType = {
    id?: true
    type?: true
    createdAt?: true
    postId?: true
    userId?: true
  }

  export type PostInteractionCountAggregateInputType = {
    id?: true
    type?: true
    createdAt?: true
    postId?: true
    userId?: true
    _all?: true
  }

  export type PostInteractionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostInteraction to aggregate.
     */
    where?: PostInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostInteractions to fetch.
     */
    orderBy?: PostInteractionOrderByWithRelationInput | PostInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostInteractions
    **/
    _count?: true | PostInteractionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostInteractionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostInteractionMaxAggregateInputType
  }

  export type GetPostInteractionAggregateType<T extends PostInteractionAggregateArgs> = {
        [P in keyof T & keyof AggregatePostInteraction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostInteraction[P]>
      : GetScalarType<T[P], AggregatePostInteraction[P]>
  }




  export type PostInteractionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostInteractionWhereInput
    orderBy?: PostInteractionOrderByWithAggregationInput | PostInteractionOrderByWithAggregationInput[]
    by: PostInteractionScalarFieldEnum[] | PostInteractionScalarFieldEnum
    having?: PostInteractionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostInteractionCountAggregateInputType | true
    _min?: PostInteractionMinAggregateInputType
    _max?: PostInteractionMaxAggregateInputType
  }

  export type PostInteractionGroupByOutputType = {
    id: string
    type: $Enums.InteractionType
    createdAt: Date
    postId: string
    userId: string
    _count: PostInteractionCountAggregateOutputType | null
    _min: PostInteractionMinAggregateOutputType | null
    _max: PostInteractionMaxAggregateOutputType | null
  }

  type GetPostInteractionGroupByPayload<T extends PostInteractionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostInteractionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostInteractionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostInteractionGroupByOutputType[P]>
            : GetScalarType<T[P], PostInteractionGroupByOutputType[P]>
        }
      >
    >


  export type PostInteractionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    createdAt?: boolean
    postId?: boolean
    userId?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postInteraction"]>

  export type PostInteractionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    createdAt?: boolean
    postId?: boolean
    userId?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postInteraction"]>

  export type PostInteractionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    createdAt?: boolean
    postId?: boolean
    userId?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postInteraction"]>

  export type PostInteractionSelectScalar = {
    id?: boolean
    type?: boolean
    createdAt?: boolean
    postId?: boolean
    userId?: boolean
  }

  export type PostInteractionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "createdAt" | "postId" | "userId", ExtArgs["result"]["postInteraction"]>
  export type PostInteractionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PostInteractionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PostInteractionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PostInteractionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostInteraction"
    objects: {
      post: Prisma.$PostPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.InteractionType
      createdAt: Date
      postId: string
      userId: string
    }, ExtArgs["result"]["postInteraction"]>
    composites: {}
  }

  type PostInteractionGetPayload<S extends boolean | null | undefined | PostInteractionDefaultArgs> = $Result.GetResult<Prisma.$PostInteractionPayload, S>

  type PostInteractionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostInteractionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostInteractionCountAggregateInputType | true
    }

  export interface PostInteractionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostInteraction'], meta: { name: 'PostInteraction' } }
    /**
     * Find zero or one PostInteraction that matches the filter.
     * @param {PostInteractionFindUniqueArgs} args - Arguments to find a PostInteraction
     * @example
     * // Get one PostInteraction
     * const postInteraction = await prisma.postInteraction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostInteractionFindUniqueArgs>(args: SelectSubset<T, PostInteractionFindUniqueArgs<ExtArgs>>): Prisma__PostInteractionClient<$Result.GetResult<Prisma.$PostInteractionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostInteraction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostInteractionFindUniqueOrThrowArgs} args - Arguments to find a PostInteraction
     * @example
     * // Get one PostInteraction
     * const postInteraction = await prisma.postInteraction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostInteractionFindUniqueOrThrowArgs>(args: SelectSubset<T, PostInteractionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostInteractionClient<$Result.GetResult<Prisma.$PostInteractionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostInteraction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostInteractionFindFirstArgs} args - Arguments to find a PostInteraction
     * @example
     * // Get one PostInteraction
     * const postInteraction = await prisma.postInteraction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostInteractionFindFirstArgs>(args?: SelectSubset<T, PostInteractionFindFirstArgs<ExtArgs>>): Prisma__PostInteractionClient<$Result.GetResult<Prisma.$PostInteractionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostInteraction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostInteractionFindFirstOrThrowArgs} args - Arguments to find a PostInteraction
     * @example
     * // Get one PostInteraction
     * const postInteraction = await prisma.postInteraction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostInteractionFindFirstOrThrowArgs>(args?: SelectSubset<T, PostInteractionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostInteractionClient<$Result.GetResult<Prisma.$PostInteractionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostInteractions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostInteractionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostInteractions
     * const postInteractions = await prisma.postInteraction.findMany()
     * 
     * // Get first 10 PostInteractions
     * const postInteractions = await prisma.postInteraction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postInteractionWithIdOnly = await prisma.postInteraction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostInteractionFindManyArgs>(args?: SelectSubset<T, PostInteractionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostInteractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostInteraction.
     * @param {PostInteractionCreateArgs} args - Arguments to create a PostInteraction.
     * @example
     * // Create one PostInteraction
     * const PostInteraction = await prisma.postInteraction.create({
     *   data: {
     *     // ... data to create a PostInteraction
     *   }
     * })
     * 
     */
    create<T extends PostInteractionCreateArgs>(args: SelectSubset<T, PostInteractionCreateArgs<ExtArgs>>): Prisma__PostInteractionClient<$Result.GetResult<Prisma.$PostInteractionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostInteractions.
     * @param {PostInteractionCreateManyArgs} args - Arguments to create many PostInteractions.
     * @example
     * // Create many PostInteractions
     * const postInteraction = await prisma.postInteraction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostInteractionCreateManyArgs>(args?: SelectSubset<T, PostInteractionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PostInteractions and returns the data saved in the database.
     * @param {PostInteractionCreateManyAndReturnArgs} args - Arguments to create many PostInteractions.
     * @example
     * // Create many PostInteractions
     * const postInteraction = await prisma.postInteraction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PostInteractions and only return the `id`
     * const postInteractionWithIdOnly = await prisma.postInteraction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostInteractionCreateManyAndReturnArgs>(args?: SelectSubset<T, PostInteractionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostInteractionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PostInteraction.
     * @param {PostInteractionDeleteArgs} args - Arguments to delete one PostInteraction.
     * @example
     * // Delete one PostInteraction
     * const PostInteraction = await prisma.postInteraction.delete({
     *   where: {
     *     // ... filter to delete one PostInteraction
     *   }
     * })
     * 
     */
    delete<T extends PostInteractionDeleteArgs>(args: SelectSubset<T, PostInteractionDeleteArgs<ExtArgs>>): Prisma__PostInteractionClient<$Result.GetResult<Prisma.$PostInteractionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostInteraction.
     * @param {PostInteractionUpdateArgs} args - Arguments to update one PostInteraction.
     * @example
     * // Update one PostInteraction
     * const postInteraction = await prisma.postInteraction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostInteractionUpdateArgs>(args: SelectSubset<T, PostInteractionUpdateArgs<ExtArgs>>): Prisma__PostInteractionClient<$Result.GetResult<Prisma.$PostInteractionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostInteractions.
     * @param {PostInteractionDeleteManyArgs} args - Arguments to filter PostInteractions to delete.
     * @example
     * // Delete a few PostInteractions
     * const { count } = await prisma.postInteraction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostInteractionDeleteManyArgs>(args?: SelectSubset<T, PostInteractionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostInteractionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostInteractions
     * const postInteraction = await prisma.postInteraction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostInteractionUpdateManyArgs>(args: SelectSubset<T, PostInteractionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostInteractions and returns the data updated in the database.
     * @param {PostInteractionUpdateManyAndReturnArgs} args - Arguments to update many PostInteractions.
     * @example
     * // Update many PostInteractions
     * const postInteraction = await prisma.postInteraction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PostInteractions and only return the `id`
     * const postInteractionWithIdOnly = await prisma.postInteraction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostInteractionUpdateManyAndReturnArgs>(args: SelectSubset<T, PostInteractionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostInteractionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PostInteraction.
     * @param {PostInteractionUpsertArgs} args - Arguments to update or create a PostInteraction.
     * @example
     * // Update or create a PostInteraction
     * const postInteraction = await prisma.postInteraction.upsert({
     *   create: {
     *     // ... data to create a PostInteraction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostInteraction we want to update
     *   }
     * })
     */
    upsert<T extends PostInteractionUpsertArgs>(args: SelectSubset<T, PostInteractionUpsertArgs<ExtArgs>>): Prisma__PostInteractionClient<$Result.GetResult<Prisma.$PostInteractionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostInteractionCountArgs} args - Arguments to filter PostInteractions to count.
     * @example
     * // Count the number of PostInteractions
     * const count = await prisma.postInteraction.count({
     *   where: {
     *     // ... the filter for the PostInteractions we want to count
     *   }
     * })
    **/
    count<T extends PostInteractionCountArgs>(
      args?: Subset<T, PostInteractionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostInteractionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostInteraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostInteractionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostInteractionAggregateArgs>(args: Subset<T, PostInteractionAggregateArgs>): Prisma.PrismaPromise<GetPostInteractionAggregateType<T>>

    /**
     * Group by PostInteraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostInteractionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostInteractionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostInteractionGroupByArgs['orderBy'] }
        : { orderBy?: PostInteractionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostInteractionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostInteractionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostInteraction model
   */
  readonly fields: PostInteractionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostInteraction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostInteractionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostInteraction model
   */
  interface PostInteractionFieldRefs {
    readonly id: FieldRef<"PostInteraction", 'String'>
    readonly type: FieldRef<"PostInteraction", 'InteractionType'>
    readonly createdAt: FieldRef<"PostInteraction", 'DateTime'>
    readonly postId: FieldRef<"PostInteraction", 'String'>
    readonly userId: FieldRef<"PostInteraction", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PostInteraction findUnique
   */
  export type PostInteractionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostInteraction
     */
    select?: PostInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostInteraction
     */
    omit?: PostInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInteractionInclude<ExtArgs> | null
    /**
     * Filter, which PostInteraction to fetch.
     */
    where: PostInteractionWhereUniqueInput
  }

  /**
   * PostInteraction findUniqueOrThrow
   */
  export type PostInteractionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostInteraction
     */
    select?: PostInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostInteraction
     */
    omit?: PostInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInteractionInclude<ExtArgs> | null
    /**
     * Filter, which PostInteraction to fetch.
     */
    where: PostInteractionWhereUniqueInput
  }

  /**
   * PostInteraction findFirst
   */
  export type PostInteractionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostInteraction
     */
    select?: PostInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostInteraction
     */
    omit?: PostInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInteractionInclude<ExtArgs> | null
    /**
     * Filter, which PostInteraction to fetch.
     */
    where?: PostInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostInteractions to fetch.
     */
    orderBy?: PostInteractionOrderByWithRelationInput | PostInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostInteractions.
     */
    cursor?: PostInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostInteractions.
     */
    distinct?: PostInteractionScalarFieldEnum | PostInteractionScalarFieldEnum[]
  }

  /**
   * PostInteraction findFirstOrThrow
   */
  export type PostInteractionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostInteraction
     */
    select?: PostInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostInteraction
     */
    omit?: PostInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInteractionInclude<ExtArgs> | null
    /**
     * Filter, which PostInteraction to fetch.
     */
    where?: PostInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostInteractions to fetch.
     */
    orderBy?: PostInteractionOrderByWithRelationInput | PostInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostInteractions.
     */
    cursor?: PostInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostInteractions.
     */
    distinct?: PostInteractionScalarFieldEnum | PostInteractionScalarFieldEnum[]
  }

  /**
   * PostInteraction findMany
   */
  export type PostInteractionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostInteraction
     */
    select?: PostInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostInteraction
     */
    omit?: PostInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInteractionInclude<ExtArgs> | null
    /**
     * Filter, which PostInteractions to fetch.
     */
    where?: PostInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostInteractions to fetch.
     */
    orderBy?: PostInteractionOrderByWithRelationInput | PostInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostInteractions.
     */
    cursor?: PostInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostInteractions.
     */
    skip?: number
    distinct?: PostInteractionScalarFieldEnum | PostInteractionScalarFieldEnum[]
  }

  /**
   * PostInteraction create
   */
  export type PostInteractionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostInteraction
     */
    select?: PostInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostInteraction
     */
    omit?: PostInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInteractionInclude<ExtArgs> | null
    /**
     * The data needed to create a PostInteraction.
     */
    data: XOR<PostInteractionCreateInput, PostInteractionUncheckedCreateInput>
  }

  /**
   * PostInteraction createMany
   */
  export type PostInteractionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostInteractions.
     */
    data: PostInteractionCreateManyInput | PostInteractionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostInteraction createManyAndReturn
   */
  export type PostInteractionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostInteraction
     */
    select?: PostInteractionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostInteraction
     */
    omit?: PostInteractionOmit<ExtArgs> | null
    /**
     * The data used to create many PostInteractions.
     */
    data: PostInteractionCreateManyInput | PostInteractionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInteractionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostInteraction update
   */
  export type PostInteractionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostInteraction
     */
    select?: PostInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostInteraction
     */
    omit?: PostInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInteractionInclude<ExtArgs> | null
    /**
     * The data needed to update a PostInteraction.
     */
    data: XOR<PostInteractionUpdateInput, PostInteractionUncheckedUpdateInput>
    /**
     * Choose, which PostInteraction to update.
     */
    where: PostInteractionWhereUniqueInput
  }

  /**
   * PostInteraction updateMany
   */
  export type PostInteractionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostInteractions.
     */
    data: XOR<PostInteractionUpdateManyMutationInput, PostInteractionUncheckedUpdateManyInput>
    /**
     * Filter which PostInteractions to update
     */
    where?: PostInteractionWhereInput
    /**
     * Limit how many PostInteractions to update.
     */
    limit?: number
  }

  /**
   * PostInteraction updateManyAndReturn
   */
  export type PostInteractionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostInteraction
     */
    select?: PostInteractionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostInteraction
     */
    omit?: PostInteractionOmit<ExtArgs> | null
    /**
     * The data used to update PostInteractions.
     */
    data: XOR<PostInteractionUpdateManyMutationInput, PostInteractionUncheckedUpdateManyInput>
    /**
     * Filter which PostInteractions to update
     */
    where?: PostInteractionWhereInput
    /**
     * Limit how many PostInteractions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInteractionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostInteraction upsert
   */
  export type PostInteractionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostInteraction
     */
    select?: PostInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostInteraction
     */
    omit?: PostInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInteractionInclude<ExtArgs> | null
    /**
     * The filter to search for the PostInteraction to update in case it exists.
     */
    where: PostInteractionWhereUniqueInput
    /**
     * In case the PostInteraction found by the `where` argument doesn't exist, create a new PostInteraction with this data.
     */
    create: XOR<PostInteractionCreateInput, PostInteractionUncheckedCreateInput>
    /**
     * In case the PostInteraction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostInteractionUpdateInput, PostInteractionUncheckedUpdateInput>
  }

  /**
   * PostInteraction delete
   */
  export type PostInteractionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostInteraction
     */
    select?: PostInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostInteraction
     */
    omit?: PostInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInteractionInclude<ExtArgs> | null
    /**
     * Filter which PostInteraction to delete.
     */
    where: PostInteractionWhereUniqueInput
  }

  /**
   * PostInteraction deleteMany
   */
  export type PostInteractionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostInteractions to delete
     */
    where?: PostInteractionWhereInput
    /**
     * Limit how many PostInteractions to delete.
     */
    limit?: number
  }

  /**
   * PostInteraction without action
   */
  export type PostInteractionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostInteraction
     */
    select?: PostInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostInteraction
     */
    omit?: PostInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInteractionInclude<ExtArgs> | null
  }


  /**
   * Model Branch
   */

  export type AggregateBranch = {
    _count: BranchCountAggregateOutputType | null
    _min: BranchMinAggregateOutputType | null
    _max: BranchMaxAggregateOutputType | null
  }

  export type BranchMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    default: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    projectId: string | null
    authorId: string | null
  }

  export type BranchMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    default: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    projectId: string | null
    authorId: string | null
  }

  export type BranchCountAggregateOutputType = {
    id: number
    name: number
    description: number
    default: number
    createdAt: number
    updatedAt: number
    projectId: number
    authorId: number
    _all: number
  }


  export type BranchMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    default?: true
    createdAt?: true
    updatedAt?: true
    projectId?: true
    authorId?: true
  }

  export type BranchMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    default?: true
    createdAt?: true
    updatedAt?: true
    projectId?: true
    authorId?: true
  }

  export type BranchCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    default?: true
    createdAt?: true
    updatedAt?: true
    projectId?: true
    authorId?: true
    _all?: true
  }

  export type BranchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Branch to aggregate.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Branches
    **/
    _count?: true | BranchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BranchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BranchMaxAggregateInputType
  }

  export type GetBranchAggregateType<T extends BranchAggregateArgs> = {
        [P in keyof T & keyof AggregateBranch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBranch[P]>
      : GetScalarType<T[P], AggregateBranch[P]>
  }




  export type BranchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BranchWhereInput
    orderBy?: BranchOrderByWithAggregationInput | BranchOrderByWithAggregationInput[]
    by: BranchScalarFieldEnum[] | BranchScalarFieldEnum
    having?: BranchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BranchCountAggregateInputType | true
    _min?: BranchMinAggregateInputType
    _max?: BranchMaxAggregateInputType
  }

  export type BranchGroupByOutputType = {
    id: string
    name: string
    description: string | null
    default: boolean
    createdAt: Date
    updatedAt: Date | null
    projectId: string
    authorId: string
    _count: BranchCountAggregateOutputType | null
    _min: BranchMinAggregateOutputType | null
    _max: BranchMaxAggregateOutputType | null
  }

  type GetBranchGroupByPayload<T extends BranchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BranchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BranchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BranchGroupByOutputType[P]>
            : GetScalarType<T[P], BranchGroupByOutputType[P]>
        }
      >
    >


  export type BranchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    default?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projectId?: boolean
    authorId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    permissions?: boolean | Branch$permissionsArgs<ExtArgs>
    interactions?: boolean | Branch$interactionsArgs<ExtArgs>
    posts?: boolean | Branch$postsArgs<ExtArgs>
    _count?: boolean | BranchCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["branch"]>

  export type BranchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    default?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projectId?: boolean
    authorId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["branch"]>

  export type BranchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    default?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projectId?: boolean
    authorId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["branch"]>

  export type BranchSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    default?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projectId?: boolean
    authorId?: boolean
  }

  export type BranchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "default" | "createdAt" | "updatedAt" | "projectId" | "authorId", ExtArgs["result"]["branch"]>
  export type BranchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    permissions?: boolean | Branch$permissionsArgs<ExtArgs>
    interactions?: boolean | Branch$interactionsArgs<ExtArgs>
    posts?: boolean | Branch$postsArgs<ExtArgs>
    _count?: boolean | BranchCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BranchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type BranchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $BranchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Branch"
    objects: {
      author: Prisma.$UserPayload<ExtArgs>
      project: Prisma.$ProjectPayload<ExtArgs>
      permissions: Prisma.$BranchPermissionsPayload<ExtArgs> | null
      interactions: Prisma.$BranchInteractionPayload<ExtArgs>[]
      posts: Prisma.$PostPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      default: boolean
      createdAt: Date
      updatedAt: Date | null
      projectId: string
      authorId: string
    }, ExtArgs["result"]["branch"]>
    composites: {}
  }

  type BranchGetPayload<S extends boolean | null | undefined | BranchDefaultArgs> = $Result.GetResult<Prisma.$BranchPayload, S>

  type BranchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BranchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BranchCountAggregateInputType | true
    }

  export interface BranchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Branch'], meta: { name: 'Branch' } }
    /**
     * Find zero or one Branch that matches the filter.
     * @param {BranchFindUniqueArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BranchFindUniqueArgs>(args: SelectSubset<T, BranchFindUniqueArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Branch that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BranchFindUniqueOrThrowArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BranchFindUniqueOrThrowArgs>(args: SelectSubset<T, BranchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Branch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchFindFirstArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BranchFindFirstArgs>(args?: SelectSubset<T, BranchFindFirstArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Branch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchFindFirstOrThrowArgs} args - Arguments to find a Branch
     * @example
     * // Get one Branch
     * const branch = await prisma.branch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BranchFindFirstOrThrowArgs>(args?: SelectSubset<T, BranchFindFirstOrThrowArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Branches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Branches
     * const branches = await prisma.branch.findMany()
     * 
     * // Get first 10 Branches
     * const branches = await prisma.branch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const branchWithIdOnly = await prisma.branch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BranchFindManyArgs>(args?: SelectSubset<T, BranchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Branch.
     * @param {BranchCreateArgs} args - Arguments to create a Branch.
     * @example
     * // Create one Branch
     * const Branch = await prisma.branch.create({
     *   data: {
     *     // ... data to create a Branch
     *   }
     * })
     * 
     */
    create<T extends BranchCreateArgs>(args: SelectSubset<T, BranchCreateArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Branches.
     * @param {BranchCreateManyArgs} args - Arguments to create many Branches.
     * @example
     * // Create many Branches
     * const branch = await prisma.branch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BranchCreateManyArgs>(args?: SelectSubset<T, BranchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Branches and returns the data saved in the database.
     * @param {BranchCreateManyAndReturnArgs} args - Arguments to create many Branches.
     * @example
     * // Create many Branches
     * const branch = await prisma.branch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Branches and only return the `id`
     * const branchWithIdOnly = await prisma.branch.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BranchCreateManyAndReturnArgs>(args?: SelectSubset<T, BranchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Branch.
     * @param {BranchDeleteArgs} args - Arguments to delete one Branch.
     * @example
     * // Delete one Branch
     * const Branch = await prisma.branch.delete({
     *   where: {
     *     // ... filter to delete one Branch
     *   }
     * })
     * 
     */
    delete<T extends BranchDeleteArgs>(args: SelectSubset<T, BranchDeleteArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Branch.
     * @param {BranchUpdateArgs} args - Arguments to update one Branch.
     * @example
     * // Update one Branch
     * const branch = await prisma.branch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BranchUpdateArgs>(args: SelectSubset<T, BranchUpdateArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Branches.
     * @param {BranchDeleteManyArgs} args - Arguments to filter Branches to delete.
     * @example
     * // Delete a few Branches
     * const { count } = await prisma.branch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BranchDeleteManyArgs>(args?: SelectSubset<T, BranchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Branches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Branches
     * const branch = await prisma.branch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BranchUpdateManyArgs>(args: SelectSubset<T, BranchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Branches and returns the data updated in the database.
     * @param {BranchUpdateManyAndReturnArgs} args - Arguments to update many Branches.
     * @example
     * // Update many Branches
     * const branch = await prisma.branch.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Branches and only return the `id`
     * const branchWithIdOnly = await prisma.branch.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BranchUpdateManyAndReturnArgs>(args: SelectSubset<T, BranchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Branch.
     * @param {BranchUpsertArgs} args - Arguments to update or create a Branch.
     * @example
     * // Update or create a Branch
     * const branch = await prisma.branch.upsert({
     *   create: {
     *     // ... data to create a Branch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Branch we want to update
     *   }
     * })
     */
    upsert<T extends BranchUpsertArgs>(args: SelectSubset<T, BranchUpsertArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Branches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchCountArgs} args - Arguments to filter Branches to count.
     * @example
     * // Count the number of Branches
     * const count = await prisma.branch.count({
     *   where: {
     *     // ... the filter for the Branches we want to count
     *   }
     * })
    **/
    count<T extends BranchCountArgs>(
      args?: Subset<T, BranchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BranchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Branch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BranchAggregateArgs>(args: Subset<T, BranchAggregateArgs>): Prisma.PrismaPromise<GetBranchAggregateType<T>>

    /**
     * Group by Branch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BranchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BranchGroupByArgs['orderBy'] }
        : { orderBy?: BranchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BranchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBranchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Branch model
   */
  readonly fields: BranchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Branch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BranchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    permissions<T extends Branch$permissionsArgs<ExtArgs> = {}>(args?: Subset<T, Branch$permissionsArgs<ExtArgs>>): Prisma__BranchPermissionsClient<$Result.GetResult<Prisma.$BranchPermissionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    interactions<T extends Branch$interactionsArgs<ExtArgs> = {}>(args?: Subset<T, Branch$interactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchInteractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    posts<T extends Branch$postsArgs<ExtArgs> = {}>(args?: Subset<T, Branch$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Branch model
   */
  interface BranchFieldRefs {
    readonly id: FieldRef<"Branch", 'String'>
    readonly name: FieldRef<"Branch", 'String'>
    readonly description: FieldRef<"Branch", 'String'>
    readonly default: FieldRef<"Branch", 'Boolean'>
    readonly createdAt: FieldRef<"Branch", 'DateTime'>
    readonly updatedAt: FieldRef<"Branch", 'DateTime'>
    readonly projectId: FieldRef<"Branch", 'String'>
    readonly authorId: FieldRef<"Branch", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Branch findUnique
   */
  export type BranchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch findUniqueOrThrow
   */
  export type BranchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch findFirst
   */
  export type BranchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Branches.
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Branches.
     */
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * Branch findFirstOrThrow
   */
  export type BranchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branch to fetch.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Branches.
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Branches.
     */
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * Branch findMany
   */
  export type BranchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter, which Branches to fetch.
     */
    where?: BranchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Branches to fetch.
     */
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Branches.
     */
    cursor?: BranchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Branches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Branches.
     */
    skip?: number
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * Branch create
   */
  export type BranchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * The data needed to create a Branch.
     */
    data: XOR<BranchCreateInput, BranchUncheckedCreateInput>
  }

  /**
   * Branch createMany
   */
  export type BranchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Branches.
     */
    data: BranchCreateManyInput | BranchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Branch createManyAndReturn
   */
  export type BranchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * The data used to create many Branches.
     */
    data: BranchCreateManyInput | BranchCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Branch update
   */
  export type BranchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * The data needed to update a Branch.
     */
    data: XOR<BranchUpdateInput, BranchUncheckedUpdateInput>
    /**
     * Choose, which Branch to update.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch updateMany
   */
  export type BranchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Branches.
     */
    data: XOR<BranchUpdateManyMutationInput, BranchUncheckedUpdateManyInput>
    /**
     * Filter which Branches to update
     */
    where?: BranchWhereInput
    /**
     * Limit how many Branches to update.
     */
    limit?: number
  }

  /**
   * Branch updateManyAndReturn
   */
  export type BranchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * The data used to update Branches.
     */
    data: XOR<BranchUpdateManyMutationInput, BranchUncheckedUpdateManyInput>
    /**
     * Filter which Branches to update
     */
    where?: BranchWhereInput
    /**
     * Limit how many Branches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Branch upsert
   */
  export type BranchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * The filter to search for the Branch to update in case it exists.
     */
    where: BranchWhereUniqueInput
    /**
     * In case the Branch found by the `where` argument doesn't exist, create a new Branch with this data.
     */
    create: XOR<BranchCreateInput, BranchUncheckedCreateInput>
    /**
     * In case the Branch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BranchUpdateInput, BranchUncheckedUpdateInput>
  }

  /**
   * Branch delete
   */
  export type BranchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    /**
     * Filter which Branch to delete.
     */
    where: BranchWhereUniqueInput
  }

  /**
   * Branch deleteMany
   */
  export type BranchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Branches to delete
     */
    where?: BranchWhereInput
    /**
     * Limit how many Branches to delete.
     */
    limit?: number
  }

  /**
   * Branch.permissions
   */
  export type Branch$permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchPermissions
     */
    select?: BranchPermissionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchPermissions
     */
    omit?: BranchPermissionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchPermissionsInclude<ExtArgs> | null
    where?: BranchPermissionsWhereInput
  }

  /**
   * Branch.interactions
   */
  export type Branch$interactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchInteraction
     */
    select?: BranchInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchInteraction
     */
    omit?: BranchInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInteractionInclude<ExtArgs> | null
    where?: BranchInteractionWhereInput
    orderBy?: BranchInteractionOrderByWithRelationInput | BranchInteractionOrderByWithRelationInput[]
    cursor?: BranchInteractionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BranchInteractionScalarFieldEnum | BranchInteractionScalarFieldEnum[]
  }

  /**
   * Branch.posts
   */
  export type Branch$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Branch without action
   */
  export type BranchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
  }


  /**
   * Model BranchPermissions
   */

  export type AggregateBranchPermissions = {
    _count: BranchPermissionsCountAggregateOutputType | null
    _min: BranchPermissionsMinAggregateOutputType | null
    _max: BranchPermissionsMaxAggregateOutputType | null
  }

  export type BranchPermissionsMinAggregateOutputType = {
    id: string | null
    private: boolean | null
    allowCollaborate: boolean | null
    allowBranch: boolean | null
    allowShare: boolean | null
    branchId: string | null
  }

  export type BranchPermissionsMaxAggregateOutputType = {
    id: string | null
    private: boolean | null
    allowCollaborate: boolean | null
    allowBranch: boolean | null
    allowShare: boolean | null
    branchId: string | null
  }

  export type BranchPermissionsCountAggregateOutputType = {
    id: number
    private: number
    allowedUsers: number
    allowCollaborate: number
    allowBranch: number
    allowShare: number
    branchId: number
    _all: number
  }


  export type BranchPermissionsMinAggregateInputType = {
    id?: true
    private?: true
    allowCollaborate?: true
    allowBranch?: true
    allowShare?: true
    branchId?: true
  }

  export type BranchPermissionsMaxAggregateInputType = {
    id?: true
    private?: true
    allowCollaborate?: true
    allowBranch?: true
    allowShare?: true
    branchId?: true
  }

  export type BranchPermissionsCountAggregateInputType = {
    id?: true
    private?: true
    allowedUsers?: true
    allowCollaborate?: true
    allowBranch?: true
    allowShare?: true
    branchId?: true
    _all?: true
  }

  export type BranchPermissionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BranchPermissions to aggregate.
     */
    where?: BranchPermissionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BranchPermissions to fetch.
     */
    orderBy?: BranchPermissionsOrderByWithRelationInput | BranchPermissionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BranchPermissionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BranchPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BranchPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BranchPermissions
    **/
    _count?: true | BranchPermissionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BranchPermissionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BranchPermissionsMaxAggregateInputType
  }

  export type GetBranchPermissionsAggregateType<T extends BranchPermissionsAggregateArgs> = {
        [P in keyof T & keyof AggregateBranchPermissions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBranchPermissions[P]>
      : GetScalarType<T[P], AggregateBranchPermissions[P]>
  }




  export type BranchPermissionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BranchPermissionsWhereInput
    orderBy?: BranchPermissionsOrderByWithAggregationInput | BranchPermissionsOrderByWithAggregationInput[]
    by: BranchPermissionsScalarFieldEnum[] | BranchPermissionsScalarFieldEnum
    having?: BranchPermissionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BranchPermissionsCountAggregateInputType | true
    _min?: BranchPermissionsMinAggregateInputType
    _max?: BranchPermissionsMaxAggregateInputType
  }

  export type BranchPermissionsGroupByOutputType = {
    id: string
    private: boolean
    allowedUsers: JsonValue
    allowCollaborate: boolean
    allowBranch: boolean
    allowShare: boolean
    branchId: string
    _count: BranchPermissionsCountAggregateOutputType | null
    _min: BranchPermissionsMinAggregateOutputType | null
    _max: BranchPermissionsMaxAggregateOutputType | null
  }

  type GetBranchPermissionsGroupByPayload<T extends BranchPermissionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BranchPermissionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BranchPermissionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BranchPermissionsGroupByOutputType[P]>
            : GetScalarType<T[P], BranchPermissionsGroupByOutputType[P]>
        }
      >
    >


  export type BranchPermissionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    private?: boolean
    allowedUsers?: boolean
    allowCollaborate?: boolean
    allowBranch?: boolean
    allowShare?: boolean
    branchId?: boolean
    branch?: boolean | BranchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["branchPermissions"]>

  export type BranchPermissionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    private?: boolean
    allowedUsers?: boolean
    allowCollaborate?: boolean
    allowBranch?: boolean
    allowShare?: boolean
    branchId?: boolean
    branch?: boolean | BranchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["branchPermissions"]>

  export type BranchPermissionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    private?: boolean
    allowedUsers?: boolean
    allowCollaborate?: boolean
    allowBranch?: boolean
    allowShare?: boolean
    branchId?: boolean
    branch?: boolean | BranchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["branchPermissions"]>

  export type BranchPermissionsSelectScalar = {
    id?: boolean
    private?: boolean
    allowedUsers?: boolean
    allowCollaborate?: boolean
    allowBranch?: boolean
    allowShare?: boolean
    branchId?: boolean
  }

  export type BranchPermissionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "private" | "allowedUsers" | "allowCollaborate" | "allowBranch" | "allowShare" | "branchId", ExtArgs["result"]["branchPermissions"]>
  export type BranchPermissionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | BranchDefaultArgs<ExtArgs>
  }
  export type BranchPermissionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | BranchDefaultArgs<ExtArgs>
  }
  export type BranchPermissionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | BranchDefaultArgs<ExtArgs>
  }

  export type $BranchPermissionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BranchPermissions"
    objects: {
      branch: Prisma.$BranchPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      private: boolean
      allowedUsers: Prisma.JsonValue
      allowCollaborate: boolean
      allowBranch: boolean
      allowShare: boolean
      branchId: string
    }, ExtArgs["result"]["branchPermissions"]>
    composites: {}
  }

  type BranchPermissionsGetPayload<S extends boolean | null | undefined | BranchPermissionsDefaultArgs> = $Result.GetResult<Prisma.$BranchPermissionsPayload, S>

  type BranchPermissionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BranchPermissionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BranchPermissionsCountAggregateInputType | true
    }

  export interface BranchPermissionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BranchPermissions'], meta: { name: 'BranchPermissions' } }
    /**
     * Find zero or one BranchPermissions that matches the filter.
     * @param {BranchPermissionsFindUniqueArgs} args - Arguments to find a BranchPermissions
     * @example
     * // Get one BranchPermissions
     * const branchPermissions = await prisma.branchPermissions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BranchPermissionsFindUniqueArgs>(args: SelectSubset<T, BranchPermissionsFindUniqueArgs<ExtArgs>>): Prisma__BranchPermissionsClient<$Result.GetResult<Prisma.$BranchPermissionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BranchPermissions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BranchPermissionsFindUniqueOrThrowArgs} args - Arguments to find a BranchPermissions
     * @example
     * // Get one BranchPermissions
     * const branchPermissions = await prisma.branchPermissions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BranchPermissionsFindUniqueOrThrowArgs>(args: SelectSubset<T, BranchPermissionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BranchPermissionsClient<$Result.GetResult<Prisma.$BranchPermissionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BranchPermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchPermissionsFindFirstArgs} args - Arguments to find a BranchPermissions
     * @example
     * // Get one BranchPermissions
     * const branchPermissions = await prisma.branchPermissions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BranchPermissionsFindFirstArgs>(args?: SelectSubset<T, BranchPermissionsFindFirstArgs<ExtArgs>>): Prisma__BranchPermissionsClient<$Result.GetResult<Prisma.$BranchPermissionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BranchPermissions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchPermissionsFindFirstOrThrowArgs} args - Arguments to find a BranchPermissions
     * @example
     * // Get one BranchPermissions
     * const branchPermissions = await prisma.branchPermissions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BranchPermissionsFindFirstOrThrowArgs>(args?: SelectSubset<T, BranchPermissionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__BranchPermissionsClient<$Result.GetResult<Prisma.$BranchPermissionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BranchPermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchPermissionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BranchPermissions
     * const branchPermissions = await prisma.branchPermissions.findMany()
     * 
     * // Get first 10 BranchPermissions
     * const branchPermissions = await prisma.branchPermissions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const branchPermissionsWithIdOnly = await prisma.branchPermissions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BranchPermissionsFindManyArgs>(args?: SelectSubset<T, BranchPermissionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPermissionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BranchPermissions.
     * @param {BranchPermissionsCreateArgs} args - Arguments to create a BranchPermissions.
     * @example
     * // Create one BranchPermissions
     * const BranchPermissions = await prisma.branchPermissions.create({
     *   data: {
     *     // ... data to create a BranchPermissions
     *   }
     * })
     * 
     */
    create<T extends BranchPermissionsCreateArgs>(args: SelectSubset<T, BranchPermissionsCreateArgs<ExtArgs>>): Prisma__BranchPermissionsClient<$Result.GetResult<Prisma.$BranchPermissionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BranchPermissions.
     * @param {BranchPermissionsCreateManyArgs} args - Arguments to create many BranchPermissions.
     * @example
     * // Create many BranchPermissions
     * const branchPermissions = await prisma.branchPermissions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BranchPermissionsCreateManyArgs>(args?: SelectSubset<T, BranchPermissionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BranchPermissions and returns the data saved in the database.
     * @param {BranchPermissionsCreateManyAndReturnArgs} args - Arguments to create many BranchPermissions.
     * @example
     * // Create many BranchPermissions
     * const branchPermissions = await prisma.branchPermissions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BranchPermissions and only return the `id`
     * const branchPermissionsWithIdOnly = await prisma.branchPermissions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BranchPermissionsCreateManyAndReturnArgs>(args?: SelectSubset<T, BranchPermissionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPermissionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BranchPermissions.
     * @param {BranchPermissionsDeleteArgs} args - Arguments to delete one BranchPermissions.
     * @example
     * // Delete one BranchPermissions
     * const BranchPermissions = await prisma.branchPermissions.delete({
     *   where: {
     *     // ... filter to delete one BranchPermissions
     *   }
     * })
     * 
     */
    delete<T extends BranchPermissionsDeleteArgs>(args: SelectSubset<T, BranchPermissionsDeleteArgs<ExtArgs>>): Prisma__BranchPermissionsClient<$Result.GetResult<Prisma.$BranchPermissionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BranchPermissions.
     * @param {BranchPermissionsUpdateArgs} args - Arguments to update one BranchPermissions.
     * @example
     * // Update one BranchPermissions
     * const branchPermissions = await prisma.branchPermissions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BranchPermissionsUpdateArgs>(args: SelectSubset<T, BranchPermissionsUpdateArgs<ExtArgs>>): Prisma__BranchPermissionsClient<$Result.GetResult<Prisma.$BranchPermissionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BranchPermissions.
     * @param {BranchPermissionsDeleteManyArgs} args - Arguments to filter BranchPermissions to delete.
     * @example
     * // Delete a few BranchPermissions
     * const { count } = await prisma.branchPermissions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BranchPermissionsDeleteManyArgs>(args?: SelectSubset<T, BranchPermissionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BranchPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchPermissionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BranchPermissions
     * const branchPermissions = await prisma.branchPermissions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BranchPermissionsUpdateManyArgs>(args: SelectSubset<T, BranchPermissionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BranchPermissions and returns the data updated in the database.
     * @param {BranchPermissionsUpdateManyAndReturnArgs} args - Arguments to update many BranchPermissions.
     * @example
     * // Update many BranchPermissions
     * const branchPermissions = await prisma.branchPermissions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BranchPermissions and only return the `id`
     * const branchPermissionsWithIdOnly = await prisma.branchPermissions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BranchPermissionsUpdateManyAndReturnArgs>(args: SelectSubset<T, BranchPermissionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPermissionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BranchPermissions.
     * @param {BranchPermissionsUpsertArgs} args - Arguments to update or create a BranchPermissions.
     * @example
     * // Update or create a BranchPermissions
     * const branchPermissions = await prisma.branchPermissions.upsert({
     *   create: {
     *     // ... data to create a BranchPermissions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BranchPermissions we want to update
     *   }
     * })
     */
    upsert<T extends BranchPermissionsUpsertArgs>(args: SelectSubset<T, BranchPermissionsUpsertArgs<ExtArgs>>): Prisma__BranchPermissionsClient<$Result.GetResult<Prisma.$BranchPermissionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BranchPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchPermissionsCountArgs} args - Arguments to filter BranchPermissions to count.
     * @example
     * // Count the number of BranchPermissions
     * const count = await prisma.branchPermissions.count({
     *   where: {
     *     // ... the filter for the BranchPermissions we want to count
     *   }
     * })
    **/
    count<T extends BranchPermissionsCountArgs>(
      args?: Subset<T, BranchPermissionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BranchPermissionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BranchPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchPermissionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BranchPermissionsAggregateArgs>(args: Subset<T, BranchPermissionsAggregateArgs>): Prisma.PrismaPromise<GetBranchPermissionsAggregateType<T>>

    /**
     * Group by BranchPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchPermissionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BranchPermissionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BranchPermissionsGroupByArgs['orderBy'] }
        : { orderBy?: BranchPermissionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BranchPermissionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBranchPermissionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BranchPermissions model
   */
  readonly fields: BranchPermissionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BranchPermissions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BranchPermissionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    branch<T extends BranchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BranchDefaultArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BranchPermissions model
   */
  interface BranchPermissionsFieldRefs {
    readonly id: FieldRef<"BranchPermissions", 'String'>
    readonly private: FieldRef<"BranchPermissions", 'Boolean'>
    readonly allowedUsers: FieldRef<"BranchPermissions", 'Json'>
    readonly allowCollaborate: FieldRef<"BranchPermissions", 'Boolean'>
    readonly allowBranch: FieldRef<"BranchPermissions", 'Boolean'>
    readonly allowShare: FieldRef<"BranchPermissions", 'Boolean'>
    readonly branchId: FieldRef<"BranchPermissions", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BranchPermissions findUnique
   */
  export type BranchPermissionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchPermissions
     */
    select?: BranchPermissionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchPermissions
     */
    omit?: BranchPermissionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchPermissionsInclude<ExtArgs> | null
    /**
     * Filter, which BranchPermissions to fetch.
     */
    where: BranchPermissionsWhereUniqueInput
  }

  /**
   * BranchPermissions findUniqueOrThrow
   */
  export type BranchPermissionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchPermissions
     */
    select?: BranchPermissionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchPermissions
     */
    omit?: BranchPermissionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchPermissionsInclude<ExtArgs> | null
    /**
     * Filter, which BranchPermissions to fetch.
     */
    where: BranchPermissionsWhereUniqueInput
  }

  /**
   * BranchPermissions findFirst
   */
  export type BranchPermissionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchPermissions
     */
    select?: BranchPermissionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchPermissions
     */
    omit?: BranchPermissionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchPermissionsInclude<ExtArgs> | null
    /**
     * Filter, which BranchPermissions to fetch.
     */
    where?: BranchPermissionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BranchPermissions to fetch.
     */
    orderBy?: BranchPermissionsOrderByWithRelationInput | BranchPermissionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BranchPermissions.
     */
    cursor?: BranchPermissionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BranchPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BranchPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BranchPermissions.
     */
    distinct?: BranchPermissionsScalarFieldEnum | BranchPermissionsScalarFieldEnum[]
  }

  /**
   * BranchPermissions findFirstOrThrow
   */
  export type BranchPermissionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchPermissions
     */
    select?: BranchPermissionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchPermissions
     */
    omit?: BranchPermissionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchPermissionsInclude<ExtArgs> | null
    /**
     * Filter, which BranchPermissions to fetch.
     */
    where?: BranchPermissionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BranchPermissions to fetch.
     */
    orderBy?: BranchPermissionsOrderByWithRelationInput | BranchPermissionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BranchPermissions.
     */
    cursor?: BranchPermissionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BranchPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BranchPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BranchPermissions.
     */
    distinct?: BranchPermissionsScalarFieldEnum | BranchPermissionsScalarFieldEnum[]
  }

  /**
   * BranchPermissions findMany
   */
  export type BranchPermissionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchPermissions
     */
    select?: BranchPermissionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchPermissions
     */
    omit?: BranchPermissionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchPermissionsInclude<ExtArgs> | null
    /**
     * Filter, which BranchPermissions to fetch.
     */
    where?: BranchPermissionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BranchPermissions to fetch.
     */
    orderBy?: BranchPermissionsOrderByWithRelationInput | BranchPermissionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BranchPermissions.
     */
    cursor?: BranchPermissionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BranchPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BranchPermissions.
     */
    skip?: number
    distinct?: BranchPermissionsScalarFieldEnum | BranchPermissionsScalarFieldEnum[]
  }

  /**
   * BranchPermissions create
   */
  export type BranchPermissionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchPermissions
     */
    select?: BranchPermissionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchPermissions
     */
    omit?: BranchPermissionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchPermissionsInclude<ExtArgs> | null
    /**
     * The data needed to create a BranchPermissions.
     */
    data: XOR<BranchPermissionsCreateInput, BranchPermissionsUncheckedCreateInput>
  }

  /**
   * BranchPermissions createMany
   */
  export type BranchPermissionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BranchPermissions.
     */
    data: BranchPermissionsCreateManyInput | BranchPermissionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BranchPermissions createManyAndReturn
   */
  export type BranchPermissionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchPermissions
     */
    select?: BranchPermissionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BranchPermissions
     */
    omit?: BranchPermissionsOmit<ExtArgs> | null
    /**
     * The data used to create many BranchPermissions.
     */
    data: BranchPermissionsCreateManyInput | BranchPermissionsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchPermissionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BranchPermissions update
   */
  export type BranchPermissionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchPermissions
     */
    select?: BranchPermissionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchPermissions
     */
    omit?: BranchPermissionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchPermissionsInclude<ExtArgs> | null
    /**
     * The data needed to update a BranchPermissions.
     */
    data: XOR<BranchPermissionsUpdateInput, BranchPermissionsUncheckedUpdateInput>
    /**
     * Choose, which BranchPermissions to update.
     */
    where: BranchPermissionsWhereUniqueInput
  }

  /**
   * BranchPermissions updateMany
   */
  export type BranchPermissionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BranchPermissions.
     */
    data: XOR<BranchPermissionsUpdateManyMutationInput, BranchPermissionsUncheckedUpdateManyInput>
    /**
     * Filter which BranchPermissions to update
     */
    where?: BranchPermissionsWhereInput
    /**
     * Limit how many BranchPermissions to update.
     */
    limit?: number
  }

  /**
   * BranchPermissions updateManyAndReturn
   */
  export type BranchPermissionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchPermissions
     */
    select?: BranchPermissionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BranchPermissions
     */
    omit?: BranchPermissionsOmit<ExtArgs> | null
    /**
     * The data used to update BranchPermissions.
     */
    data: XOR<BranchPermissionsUpdateManyMutationInput, BranchPermissionsUncheckedUpdateManyInput>
    /**
     * Filter which BranchPermissions to update
     */
    where?: BranchPermissionsWhereInput
    /**
     * Limit how many BranchPermissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchPermissionsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BranchPermissions upsert
   */
  export type BranchPermissionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchPermissions
     */
    select?: BranchPermissionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchPermissions
     */
    omit?: BranchPermissionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchPermissionsInclude<ExtArgs> | null
    /**
     * The filter to search for the BranchPermissions to update in case it exists.
     */
    where: BranchPermissionsWhereUniqueInput
    /**
     * In case the BranchPermissions found by the `where` argument doesn't exist, create a new BranchPermissions with this data.
     */
    create: XOR<BranchPermissionsCreateInput, BranchPermissionsUncheckedCreateInput>
    /**
     * In case the BranchPermissions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BranchPermissionsUpdateInput, BranchPermissionsUncheckedUpdateInput>
  }

  /**
   * BranchPermissions delete
   */
  export type BranchPermissionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchPermissions
     */
    select?: BranchPermissionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchPermissions
     */
    omit?: BranchPermissionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchPermissionsInclude<ExtArgs> | null
    /**
     * Filter which BranchPermissions to delete.
     */
    where: BranchPermissionsWhereUniqueInput
  }

  /**
   * BranchPermissions deleteMany
   */
  export type BranchPermissionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BranchPermissions to delete
     */
    where?: BranchPermissionsWhereInput
    /**
     * Limit how many BranchPermissions to delete.
     */
    limit?: number
  }

  /**
   * BranchPermissions without action
   */
  export type BranchPermissionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchPermissions
     */
    select?: BranchPermissionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchPermissions
     */
    omit?: BranchPermissionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchPermissionsInclude<ExtArgs> | null
  }


  /**
   * Model BranchInteraction
   */

  export type AggregateBranchInteraction = {
    _count: BranchInteractionCountAggregateOutputType | null
    _min: BranchInteractionMinAggregateOutputType | null
    _max: BranchInteractionMaxAggregateOutputType | null
  }

  export type BranchInteractionMinAggregateOutputType = {
    id: string | null
    type: $Enums.InteractionType | null
    createdAt: Date | null
    branchId: string | null
    userId: string | null
  }

  export type BranchInteractionMaxAggregateOutputType = {
    id: string | null
    type: $Enums.InteractionType | null
    createdAt: Date | null
    branchId: string | null
    userId: string | null
  }

  export type BranchInteractionCountAggregateOutputType = {
    id: number
    type: number
    createdAt: number
    branchId: number
    userId: number
    _all: number
  }


  export type BranchInteractionMinAggregateInputType = {
    id?: true
    type?: true
    createdAt?: true
    branchId?: true
    userId?: true
  }

  export type BranchInteractionMaxAggregateInputType = {
    id?: true
    type?: true
    createdAt?: true
    branchId?: true
    userId?: true
  }

  export type BranchInteractionCountAggregateInputType = {
    id?: true
    type?: true
    createdAt?: true
    branchId?: true
    userId?: true
    _all?: true
  }

  export type BranchInteractionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BranchInteraction to aggregate.
     */
    where?: BranchInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BranchInteractions to fetch.
     */
    orderBy?: BranchInteractionOrderByWithRelationInput | BranchInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BranchInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BranchInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BranchInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BranchInteractions
    **/
    _count?: true | BranchInteractionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BranchInteractionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BranchInteractionMaxAggregateInputType
  }

  export type GetBranchInteractionAggregateType<T extends BranchInteractionAggregateArgs> = {
        [P in keyof T & keyof AggregateBranchInteraction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBranchInteraction[P]>
      : GetScalarType<T[P], AggregateBranchInteraction[P]>
  }




  export type BranchInteractionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BranchInteractionWhereInput
    orderBy?: BranchInteractionOrderByWithAggregationInput | BranchInteractionOrderByWithAggregationInput[]
    by: BranchInteractionScalarFieldEnum[] | BranchInteractionScalarFieldEnum
    having?: BranchInteractionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BranchInteractionCountAggregateInputType | true
    _min?: BranchInteractionMinAggregateInputType
    _max?: BranchInteractionMaxAggregateInputType
  }

  export type BranchInteractionGroupByOutputType = {
    id: string
    type: $Enums.InteractionType
    createdAt: Date
    branchId: string
    userId: string
    _count: BranchInteractionCountAggregateOutputType | null
    _min: BranchInteractionMinAggregateOutputType | null
    _max: BranchInteractionMaxAggregateOutputType | null
  }

  type GetBranchInteractionGroupByPayload<T extends BranchInteractionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BranchInteractionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BranchInteractionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BranchInteractionGroupByOutputType[P]>
            : GetScalarType<T[P], BranchInteractionGroupByOutputType[P]>
        }
      >
    >


  export type BranchInteractionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    createdAt?: boolean
    branchId?: boolean
    userId?: boolean
    branch?: boolean | BranchDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["branchInteraction"]>

  export type BranchInteractionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    createdAt?: boolean
    branchId?: boolean
    userId?: boolean
    branch?: boolean | BranchDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["branchInteraction"]>

  export type BranchInteractionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    createdAt?: boolean
    branchId?: boolean
    userId?: boolean
    branch?: boolean | BranchDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["branchInteraction"]>

  export type BranchInteractionSelectScalar = {
    id?: boolean
    type?: boolean
    createdAt?: boolean
    branchId?: boolean
    userId?: boolean
  }

  export type BranchInteractionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "createdAt" | "branchId" | "userId", ExtArgs["result"]["branchInteraction"]>
  export type BranchInteractionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | BranchDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BranchInteractionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | BranchDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BranchInteractionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    branch?: boolean | BranchDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BranchInteractionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BranchInteraction"
    objects: {
      branch: Prisma.$BranchPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.InteractionType
      createdAt: Date
      branchId: string
      userId: string
    }, ExtArgs["result"]["branchInteraction"]>
    composites: {}
  }

  type BranchInteractionGetPayload<S extends boolean | null | undefined | BranchInteractionDefaultArgs> = $Result.GetResult<Prisma.$BranchInteractionPayload, S>

  type BranchInteractionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BranchInteractionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BranchInteractionCountAggregateInputType | true
    }

  export interface BranchInteractionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BranchInteraction'], meta: { name: 'BranchInteraction' } }
    /**
     * Find zero or one BranchInteraction that matches the filter.
     * @param {BranchInteractionFindUniqueArgs} args - Arguments to find a BranchInteraction
     * @example
     * // Get one BranchInteraction
     * const branchInteraction = await prisma.branchInteraction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BranchInteractionFindUniqueArgs>(args: SelectSubset<T, BranchInteractionFindUniqueArgs<ExtArgs>>): Prisma__BranchInteractionClient<$Result.GetResult<Prisma.$BranchInteractionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BranchInteraction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BranchInteractionFindUniqueOrThrowArgs} args - Arguments to find a BranchInteraction
     * @example
     * // Get one BranchInteraction
     * const branchInteraction = await prisma.branchInteraction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BranchInteractionFindUniqueOrThrowArgs>(args: SelectSubset<T, BranchInteractionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BranchInteractionClient<$Result.GetResult<Prisma.$BranchInteractionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BranchInteraction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchInteractionFindFirstArgs} args - Arguments to find a BranchInteraction
     * @example
     * // Get one BranchInteraction
     * const branchInteraction = await prisma.branchInteraction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BranchInteractionFindFirstArgs>(args?: SelectSubset<T, BranchInteractionFindFirstArgs<ExtArgs>>): Prisma__BranchInteractionClient<$Result.GetResult<Prisma.$BranchInteractionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BranchInteraction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchInteractionFindFirstOrThrowArgs} args - Arguments to find a BranchInteraction
     * @example
     * // Get one BranchInteraction
     * const branchInteraction = await prisma.branchInteraction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BranchInteractionFindFirstOrThrowArgs>(args?: SelectSubset<T, BranchInteractionFindFirstOrThrowArgs<ExtArgs>>): Prisma__BranchInteractionClient<$Result.GetResult<Prisma.$BranchInteractionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BranchInteractions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchInteractionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BranchInteractions
     * const branchInteractions = await prisma.branchInteraction.findMany()
     * 
     * // Get first 10 BranchInteractions
     * const branchInteractions = await prisma.branchInteraction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const branchInteractionWithIdOnly = await prisma.branchInteraction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BranchInteractionFindManyArgs>(args?: SelectSubset<T, BranchInteractionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchInteractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BranchInteraction.
     * @param {BranchInteractionCreateArgs} args - Arguments to create a BranchInteraction.
     * @example
     * // Create one BranchInteraction
     * const BranchInteraction = await prisma.branchInteraction.create({
     *   data: {
     *     // ... data to create a BranchInteraction
     *   }
     * })
     * 
     */
    create<T extends BranchInteractionCreateArgs>(args: SelectSubset<T, BranchInteractionCreateArgs<ExtArgs>>): Prisma__BranchInteractionClient<$Result.GetResult<Prisma.$BranchInteractionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BranchInteractions.
     * @param {BranchInteractionCreateManyArgs} args - Arguments to create many BranchInteractions.
     * @example
     * // Create many BranchInteractions
     * const branchInteraction = await prisma.branchInteraction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BranchInteractionCreateManyArgs>(args?: SelectSubset<T, BranchInteractionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BranchInteractions and returns the data saved in the database.
     * @param {BranchInteractionCreateManyAndReturnArgs} args - Arguments to create many BranchInteractions.
     * @example
     * // Create many BranchInteractions
     * const branchInteraction = await prisma.branchInteraction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BranchInteractions and only return the `id`
     * const branchInteractionWithIdOnly = await prisma.branchInteraction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BranchInteractionCreateManyAndReturnArgs>(args?: SelectSubset<T, BranchInteractionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchInteractionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BranchInteraction.
     * @param {BranchInteractionDeleteArgs} args - Arguments to delete one BranchInteraction.
     * @example
     * // Delete one BranchInteraction
     * const BranchInteraction = await prisma.branchInteraction.delete({
     *   where: {
     *     // ... filter to delete one BranchInteraction
     *   }
     * })
     * 
     */
    delete<T extends BranchInteractionDeleteArgs>(args: SelectSubset<T, BranchInteractionDeleteArgs<ExtArgs>>): Prisma__BranchInteractionClient<$Result.GetResult<Prisma.$BranchInteractionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BranchInteraction.
     * @param {BranchInteractionUpdateArgs} args - Arguments to update one BranchInteraction.
     * @example
     * // Update one BranchInteraction
     * const branchInteraction = await prisma.branchInteraction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BranchInteractionUpdateArgs>(args: SelectSubset<T, BranchInteractionUpdateArgs<ExtArgs>>): Prisma__BranchInteractionClient<$Result.GetResult<Prisma.$BranchInteractionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BranchInteractions.
     * @param {BranchInteractionDeleteManyArgs} args - Arguments to filter BranchInteractions to delete.
     * @example
     * // Delete a few BranchInteractions
     * const { count } = await prisma.branchInteraction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BranchInteractionDeleteManyArgs>(args?: SelectSubset<T, BranchInteractionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BranchInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchInteractionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BranchInteractions
     * const branchInteraction = await prisma.branchInteraction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BranchInteractionUpdateManyArgs>(args: SelectSubset<T, BranchInteractionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BranchInteractions and returns the data updated in the database.
     * @param {BranchInteractionUpdateManyAndReturnArgs} args - Arguments to update many BranchInteractions.
     * @example
     * // Update many BranchInteractions
     * const branchInteraction = await prisma.branchInteraction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BranchInteractions and only return the `id`
     * const branchInteractionWithIdOnly = await prisma.branchInteraction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BranchInteractionUpdateManyAndReturnArgs>(args: SelectSubset<T, BranchInteractionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchInteractionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BranchInteraction.
     * @param {BranchInteractionUpsertArgs} args - Arguments to update or create a BranchInteraction.
     * @example
     * // Update or create a BranchInteraction
     * const branchInteraction = await prisma.branchInteraction.upsert({
     *   create: {
     *     // ... data to create a BranchInteraction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BranchInteraction we want to update
     *   }
     * })
     */
    upsert<T extends BranchInteractionUpsertArgs>(args: SelectSubset<T, BranchInteractionUpsertArgs<ExtArgs>>): Prisma__BranchInteractionClient<$Result.GetResult<Prisma.$BranchInteractionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BranchInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchInteractionCountArgs} args - Arguments to filter BranchInteractions to count.
     * @example
     * // Count the number of BranchInteractions
     * const count = await prisma.branchInteraction.count({
     *   where: {
     *     // ... the filter for the BranchInteractions we want to count
     *   }
     * })
    **/
    count<T extends BranchInteractionCountArgs>(
      args?: Subset<T, BranchInteractionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BranchInteractionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BranchInteraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchInteractionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BranchInteractionAggregateArgs>(args: Subset<T, BranchInteractionAggregateArgs>): Prisma.PrismaPromise<GetBranchInteractionAggregateType<T>>

    /**
     * Group by BranchInteraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BranchInteractionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BranchInteractionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BranchInteractionGroupByArgs['orderBy'] }
        : { orderBy?: BranchInteractionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BranchInteractionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBranchInteractionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BranchInteraction model
   */
  readonly fields: BranchInteractionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BranchInteraction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BranchInteractionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    branch<T extends BranchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BranchDefaultArgs<ExtArgs>>): Prisma__BranchClient<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BranchInteraction model
   */
  interface BranchInteractionFieldRefs {
    readonly id: FieldRef<"BranchInteraction", 'String'>
    readonly type: FieldRef<"BranchInteraction", 'InteractionType'>
    readonly createdAt: FieldRef<"BranchInteraction", 'DateTime'>
    readonly branchId: FieldRef<"BranchInteraction", 'String'>
    readonly userId: FieldRef<"BranchInteraction", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BranchInteraction findUnique
   */
  export type BranchInteractionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchInteraction
     */
    select?: BranchInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchInteraction
     */
    omit?: BranchInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInteractionInclude<ExtArgs> | null
    /**
     * Filter, which BranchInteraction to fetch.
     */
    where: BranchInteractionWhereUniqueInput
  }

  /**
   * BranchInteraction findUniqueOrThrow
   */
  export type BranchInteractionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchInteraction
     */
    select?: BranchInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchInteraction
     */
    omit?: BranchInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInteractionInclude<ExtArgs> | null
    /**
     * Filter, which BranchInteraction to fetch.
     */
    where: BranchInteractionWhereUniqueInput
  }

  /**
   * BranchInteraction findFirst
   */
  export type BranchInteractionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchInteraction
     */
    select?: BranchInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchInteraction
     */
    omit?: BranchInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInteractionInclude<ExtArgs> | null
    /**
     * Filter, which BranchInteraction to fetch.
     */
    where?: BranchInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BranchInteractions to fetch.
     */
    orderBy?: BranchInteractionOrderByWithRelationInput | BranchInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BranchInteractions.
     */
    cursor?: BranchInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BranchInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BranchInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BranchInteractions.
     */
    distinct?: BranchInteractionScalarFieldEnum | BranchInteractionScalarFieldEnum[]
  }

  /**
   * BranchInteraction findFirstOrThrow
   */
  export type BranchInteractionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchInteraction
     */
    select?: BranchInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchInteraction
     */
    omit?: BranchInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInteractionInclude<ExtArgs> | null
    /**
     * Filter, which BranchInteraction to fetch.
     */
    where?: BranchInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BranchInteractions to fetch.
     */
    orderBy?: BranchInteractionOrderByWithRelationInput | BranchInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BranchInteractions.
     */
    cursor?: BranchInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BranchInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BranchInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BranchInteractions.
     */
    distinct?: BranchInteractionScalarFieldEnum | BranchInteractionScalarFieldEnum[]
  }

  /**
   * BranchInteraction findMany
   */
  export type BranchInteractionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchInteraction
     */
    select?: BranchInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchInteraction
     */
    omit?: BranchInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInteractionInclude<ExtArgs> | null
    /**
     * Filter, which BranchInteractions to fetch.
     */
    where?: BranchInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BranchInteractions to fetch.
     */
    orderBy?: BranchInteractionOrderByWithRelationInput | BranchInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BranchInteractions.
     */
    cursor?: BranchInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BranchInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BranchInteractions.
     */
    skip?: number
    distinct?: BranchInteractionScalarFieldEnum | BranchInteractionScalarFieldEnum[]
  }

  /**
   * BranchInteraction create
   */
  export type BranchInteractionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchInteraction
     */
    select?: BranchInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchInteraction
     */
    omit?: BranchInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInteractionInclude<ExtArgs> | null
    /**
     * The data needed to create a BranchInteraction.
     */
    data: XOR<BranchInteractionCreateInput, BranchInteractionUncheckedCreateInput>
  }

  /**
   * BranchInteraction createMany
   */
  export type BranchInteractionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BranchInteractions.
     */
    data: BranchInteractionCreateManyInput | BranchInteractionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BranchInteraction createManyAndReturn
   */
  export type BranchInteractionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchInteraction
     */
    select?: BranchInteractionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BranchInteraction
     */
    omit?: BranchInteractionOmit<ExtArgs> | null
    /**
     * The data used to create many BranchInteractions.
     */
    data: BranchInteractionCreateManyInput | BranchInteractionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInteractionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BranchInteraction update
   */
  export type BranchInteractionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchInteraction
     */
    select?: BranchInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchInteraction
     */
    omit?: BranchInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInteractionInclude<ExtArgs> | null
    /**
     * The data needed to update a BranchInteraction.
     */
    data: XOR<BranchInteractionUpdateInput, BranchInteractionUncheckedUpdateInput>
    /**
     * Choose, which BranchInteraction to update.
     */
    where: BranchInteractionWhereUniqueInput
  }

  /**
   * BranchInteraction updateMany
   */
  export type BranchInteractionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BranchInteractions.
     */
    data: XOR<BranchInteractionUpdateManyMutationInput, BranchInteractionUncheckedUpdateManyInput>
    /**
     * Filter which BranchInteractions to update
     */
    where?: BranchInteractionWhereInput
    /**
     * Limit how many BranchInteractions to update.
     */
    limit?: number
  }

  /**
   * BranchInteraction updateManyAndReturn
   */
  export type BranchInteractionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchInteraction
     */
    select?: BranchInteractionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BranchInteraction
     */
    omit?: BranchInteractionOmit<ExtArgs> | null
    /**
     * The data used to update BranchInteractions.
     */
    data: XOR<BranchInteractionUpdateManyMutationInput, BranchInteractionUncheckedUpdateManyInput>
    /**
     * Filter which BranchInteractions to update
     */
    where?: BranchInteractionWhereInput
    /**
     * Limit how many BranchInteractions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInteractionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BranchInteraction upsert
   */
  export type BranchInteractionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchInteraction
     */
    select?: BranchInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchInteraction
     */
    omit?: BranchInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInteractionInclude<ExtArgs> | null
    /**
     * The filter to search for the BranchInteraction to update in case it exists.
     */
    where: BranchInteractionWhereUniqueInput
    /**
     * In case the BranchInteraction found by the `where` argument doesn't exist, create a new BranchInteraction with this data.
     */
    create: XOR<BranchInteractionCreateInput, BranchInteractionUncheckedCreateInput>
    /**
     * In case the BranchInteraction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BranchInteractionUpdateInput, BranchInteractionUncheckedUpdateInput>
  }

  /**
   * BranchInteraction delete
   */
  export type BranchInteractionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchInteraction
     */
    select?: BranchInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchInteraction
     */
    omit?: BranchInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInteractionInclude<ExtArgs> | null
    /**
     * Filter which BranchInteraction to delete.
     */
    where: BranchInteractionWhereUniqueInput
  }

  /**
   * BranchInteraction deleteMany
   */
  export type BranchInteractionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BranchInteractions to delete
     */
    where?: BranchInteractionWhereInput
    /**
     * Limit how many BranchInteractions to delete.
     */
    limit?: number
  }

  /**
   * BranchInteraction without action
   */
  export type BranchInteractionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BranchInteraction
     */
    select?: BranchInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BranchInteraction
     */
    omit?: BranchInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInteractionInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    picture: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    authorId: string | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    picture: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
    authorId: string | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    picture: number
    name: number
    description: number
    createdAt: number
    updatedAt: number
    authorId: number
    _all: number
  }


  export type ProjectMinAggregateInputType = {
    id?: true
    picture?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    authorId?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    picture?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    authorId?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    picture?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    authorId?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    picture: string | null
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date | null
    authorId: string
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    picture?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authorId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    permissions?: boolean | Project$permissionsArgs<ExtArgs>
    interactions?: boolean | Project$interactionsArgs<ExtArgs>
    branches?: boolean | Project$branchesArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    picture?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authorId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    picture?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authorId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    picture?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authorId?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "picture" | "name" | "description" | "createdAt" | "updatedAt" | "authorId", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    permissions?: boolean | Project$permissionsArgs<ExtArgs>
    interactions?: boolean | Project$interactionsArgs<ExtArgs>
    branches?: boolean | Project$branchesArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      author: Prisma.$UserPayload<ExtArgs>
      permissions: Prisma.$ProjectPermissionsPayload<ExtArgs> | null
      interactions: Prisma.$ProjectInteractionPayload<ExtArgs>[]
      branches: Prisma.$BranchPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      picture: string | null
      name: string
      description: string | null
      createdAt: Date
      updatedAt: Date | null
      authorId: string
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    permissions<T extends Project$permissionsArgs<ExtArgs> = {}>(args?: Subset<T, Project$permissionsArgs<ExtArgs>>): Prisma__ProjectPermissionsClient<$Result.GetResult<Prisma.$ProjectPermissionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    interactions<T extends Project$interactionsArgs<ExtArgs> = {}>(args?: Subset<T, Project$interactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectInteractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    branches<T extends Project$branchesArgs<ExtArgs> = {}>(args?: Subset<T, Project$branchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BranchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly picture: FieldRef<"Project", 'String'>
    readonly name: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
    readonly authorId: FieldRef<"Project", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.permissions
   */
  export type Project$permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectPermissions
     */
    select?: ProjectPermissionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectPermissions
     */
    omit?: ProjectPermissionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectPermissionsInclude<ExtArgs> | null
    where?: ProjectPermissionsWhereInput
  }

  /**
   * Project.interactions
   */
  export type Project$interactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInteraction
     */
    select?: ProjectInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInteraction
     */
    omit?: ProjectInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInteractionInclude<ExtArgs> | null
    where?: ProjectInteractionWhereInput
    orderBy?: ProjectInteractionOrderByWithRelationInput | ProjectInteractionOrderByWithRelationInput[]
    cursor?: ProjectInteractionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectInteractionScalarFieldEnum | ProjectInteractionScalarFieldEnum[]
  }

  /**
   * Project.branches
   */
  export type Project$branchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Branch
     */
    select?: BranchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Branch
     */
    omit?: BranchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BranchInclude<ExtArgs> | null
    where?: BranchWhereInput
    orderBy?: BranchOrderByWithRelationInput | BranchOrderByWithRelationInput[]
    cursor?: BranchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BranchScalarFieldEnum | BranchScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model ProjectPermissions
   */

  export type AggregateProjectPermissions = {
    _count: ProjectPermissionsCountAggregateOutputType | null
    _min: ProjectPermissionsMinAggregateOutputType | null
    _max: ProjectPermissionsMaxAggregateOutputType | null
  }

  export type ProjectPermissionsMinAggregateOutputType = {
    id: string | null
    private: boolean | null
    allowCollaborate: boolean | null
    allowBranch: boolean | null
    allowShare: boolean | null
    projectId: string | null
  }

  export type ProjectPermissionsMaxAggregateOutputType = {
    id: string | null
    private: boolean | null
    allowCollaborate: boolean | null
    allowBranch: boolean | null
    allowShare: boolean | null
    projectId: string | null
  }

  export type ProjectPermissionsCountAggregateOutputType = {
    id: number
    private: number
    allowedUsers: number
    allowCollaborate: number
    allowBranch: number
    allowShare: number
    projectId: number
    _all: number
  }


  export type ProjectPermissionsMinAggregateInputType = {
    id?: true
    private?: true
    allowCollaborate?: true
    allowBranch?: true
    allowShare?: true
    projectId?: true
  }

  export type ProjectPermissionsMaxAggregateInputType = {
    id?: true
    private?: true
    allowCollaborate?: true
    allowBranch?: true
    allowShare?: true
    projectId?: true
  }

  export type ProjectPermissionsCountAggregateInputType = {
    id?: true
    private?: true
    allowedUsers?: true
    allowCollaborate?: true
    allowBranch?: true
    allowShare?: true
    projectId?: true
    _all?: true
  }

  export type ProjectPermissionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectPermissions to aggregate.
     */
    where?: ProjectPermissionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectPermissions to fetch.
     */
    orderBy?: ProjectPermissionsOrderByWithRelationInput | ProjectPermissionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectPermissionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectPermissions
    **/
    _count?: true | ProjectPermissionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectPermissionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectPermissionsMaxAggregateInputType
  }

  export type GetProjectPermissionsAggregateType<T extends ProjectPermissionsAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectPermissions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectPermissions[P]>
      : GetScalarType<T[P], AggregateProjectPermissions[P]>
  }




  export type ProjectPermissionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectPermissionsWhereInput
    orderBy?: ProjectPermissionsOrderByWithAggregationInput | ProjectPermissionsOrderByWithAggregationInput[]
    by: ProjectPermissionsScalarFieldEnum[] | ProjectPermissionsScalarFieldEnum
    having?: ProjectPermissionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectPermissionsCountAggregateInputType | true
    _min?: ProjectPermissionsMinAggregateInputType
    _max?: ProjectPermissionsMaxAggregateInputType
  }

  export type ProjectPermissionsGroupByOutputType = {
    id: string
    private: boolean
    allowedUsers: JsonValue
    allowCollaborate: boolean
    allowBranch: boolean
    allowShare: boolean
    projectId: string
    _count: ProjectPermissionsCountAggregateOutputType | null
    _min: ProjectPermissionsMinAggregateOutputType | null
    _max: ProjectPermissionsMaxAggregateOutputType | null
  }

  type GetProjectPermissionsGroupByPayload<T extends ProjectPermissionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectPermissionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectPermissionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectPermissionsGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectPermissionsGroupByOutputType[P]>
        }
      >
    >


  export type ProjectPermissionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    private?: boolean
    allowedUsers?: boolean
    allowCollaborate?: boolean
    allowBranch?: boolean
    allowShare?: boolean
    projectId?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectPermissions"]>

  export type ProjectPermissionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    private?: boolean
    allowedUsers?: boolean
    allowCollaborate?: boolean
    allowBranch?: boolean
    allowShare?: boolean
    projectId?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectPermissions"]>

  export type ProjectPermissionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    private?: boolean
    allowedUsers?: boolean
    allowCollaborate?: boolean
    allowBranch?: boolean
    allowShare?: boolean
    projectId?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectPermissions"]>

  export type ProjectPermissionsSelectScalar = {
    id?: boolean
    private?: boolean
    allowedUsers?: boolean
    allowCollaborate?: boolean
    allowBranch?: boolean
    allowShare?: boolean
    projectId?: boolean
  }

  export type ProjectPermissionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "private" | "allowedUsers" | "allowCollaborate" | "allowBranch" | "allowShare" | "projectId", ExtArgs["result"]["projectPermissions"]>
  export type ProjectPermissionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectPermissionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ProjectPermissionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ProjectPermissionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectPermissions"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      private: boolean
      allowedUsers: Prisma.JsonValue
      allowCollaborate: boolean
      allowBranch: boolean
      allowShare: boolean
      projectId: string
    }, ExtArgs["result"]["projectPermissions"]>
    composites: {}
  }

  type ProjectPermissionsGetPayload<S extends boolean | null | undefined | ProjectPermissionsDefaultArgs> = $Result.GetResult<Prisma.$ProjectPermissionsPayload, S>

  type ProjectPermissionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectPermissionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectPermissionsCountAggregateInputType | true
    }

  export interface ProjectPermissionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectPermissions'], meta: { name: 'ProjectPermissions' } }
    /**
     * Find zero or one ProjectPermissions that matches the filter.
     * @param {ProjectPermissionsFindUniqueArgs} args - Arguments to find a ProjectPermissions
     * @example
     * // Get one ProjectPermissions
     * const projectPermissions = await prisma.projectPermissions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectPermissionsFindUniqueArgs>(args: SelectSubset<T, ProjectPermissionsFindUniqueArgs<ExtArgs>>): Prisma__ProjectPermissionsClient<$Result.GetResult<Prisma.$ProjectPermissionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectPermissions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectPermissionsFindUniqueOrThrowArgs} args - Arguments to find a ProjectPermissions
     * @example
     * // Get one ProjectPermissions
     * const projectPermissions = await prisma.projectPermissions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectPermissionsFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectPermissionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectPermissionsClient<$Result.GetResult<Prisma.$ProjectPermissionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectPermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectPermissionsFindFirstArgs} args - Arguments to find a ProjectPermissions
     * @example
     * // Get one ProjectPermissions
     * const projectPermissions = await prisma.projectPermissions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectPermissionsFindFirstArgs>(args?: SelectSubset<T, ProjectPermissionsFindFirstArgs<ExtArgs>>): Prisma__ProjectPermissionsClient<$Result.GetResult<Prisma.$ProjectPermissionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectPermissions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectPermissionsFindFirstOrThrowArgs} args - Arguments to find a ProjectPermissions
     * @example
     * // Get one ProjectPermissions
     * const projectPermissions = await prisma.projectPermissions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectPermissionsFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectPermissionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectPermissionsClient<$Result.GetResult<Prisma.$ProjectPermissionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectPermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectPermissionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectPermissions
     * const projectPermissions = await prisma.projectPermissions.findMany()
     * 
     * // Get first 10 ProjectPermissions
     * const projectPermissions = await prisma.projectPermissions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectPermissionsWithIdOnly = await prisma.projectPermissions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectPermissionsFindManyArgs>(args?: SelectSubset<T, ProjectPermissionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPermissionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectPermissions.
     * @param {ProjectPermissionsCreateArgs} args - Arguments to create a ProjectPermissions.
     * @example
     * // Create one ProjectPermissions
     * const ProjectPermissions = await prisma.projectPermissions.create({
     *   data: {
     *     // ... data to create a ProjectPermissions
     *   }
     * })
     * 
     */
    create<T extends ProjectPermissionsCreateArgs>(args: SelectSubset<T, ProjectPermissionsCreateArgs<ExtArgs>>): Prisma__ProjectPermissionsClient<$Result.GetResult<Prisma.$ProjectPermissionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectPermissions.
     * @param {ProjectPermissionsCreateManyArgs} args - Arguments to create many ProjectPermissions.
     * @example
     * // Create many ProjectPermissions
     * const projectPermissions = await prisma.projectPermissions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectPermissionsCreateManyArgs>(args?: SelectSubset<T, ProjectPermissionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectPermissions and returns the data saved in the database.
     * @param {ProjectPermissionsCreateManyAndReturnArgs} args - Arguments to create many ProjectPermissions.
     * @example
     * // Create many ProjectPermissions
     * const projectPermissions = await prisma.projectPermissions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectPermissions and only return the `id`
     * const projectPermissionsWithIdOnly = await prisma.projectPermissions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectPermissionsCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectPermissionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPermissionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectPermissions.
     * @param {ProjectPermissionsDeleteArgs} args - Arguments to delete one ProjectPermissions.
     * @example
     * // Delete one ProjectPermissions
     * const ProjectPermissions = await prisma.projectPermissions.delete({
     *   where: {
     *     // ... filter to delete one ProjectPermissions
     *   }
     * })
     * 
     */
    delete<T extends ProjectPermissionsDeleteArgs>(args: SelectSubset<T, ProjectPermissionsDeleteArgs<ExtArgs>>): Prisma__ProjectPermissionsClient<$Result.GetResult<Prisma.$ProjectPermissionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectPermissions.
     * @param {ProjectPermissionsUpdateArgs} args - Arguments to update one ProjectPermissions.
     * @example
     * // Update one ProjectPermissions
     * const projectPermissions = await prisma.projectPermissions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectPermissionsUpdateArgs>(args: SelectSubset<T, ProjectPermissionsUpdateArgs<ExtArgs>>): Prisma__ProjectPermissionsClient<$Result.GetResult<Prisma.$ProjectPermissionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectPermissions.
     * @param {ProjectPermissionsDeleteManyArgs} args - Arguments to filter ProjectPermissions to delete.
     * @example
     * // Delete a few ProjectPermissions
     * const { count } = await prisma.projectPermissions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectPermissionsDeleteManyArgs>(args?: SelectSubset<T, ProjectPermissionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectPermissionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectPermissions
     * const projectPermissions = await prisma.projectPermissions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectPermissionsUpdateManyArgs>(args: SelectSubset<T, ProjectPermissionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectPermissions and returns the data updated in the database.
     * @param {ProjectPermissionsUpdateManyAndReturnArgs} args - Arguments to update many ProjectPermissions.
     * @example
     * // Update many ProjectPermissions
     * const projectPermissions = await prisma.projectPermissions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectPermissions and only return the `id`
     * const projectPermissionsWithIdOnly = await prisma.projectPermissions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectPermissionsUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectPermissionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPermissionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectPermissions.
     * @param {ProjectPermissionsUpsertArgs} args - Arguments to update or create a ProjectPermissions.
     * @example
     * // Update or create a ProjectPermissions
     * const projectPermissions = await prisma.projectPermissions.upsert({
     *   create: {
     *     // ... data to create a ProjectPermissions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectPermissions we want to update
     *   }
     * })
     */
    upsert<T extends ProjectPermissionsUpsertArgs>(args: SelectSubset<T, ProjectPermissionsUpsertArgs<ExtArgs>>): Prisma__ProjectPermissionsClient<$Result.GetResult<Prisma.$ProjectPermissionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectPermissionsCountArgs} args - Arguments to filter ProjectPermissions to count.
     * @example
     * // Count the number of ProjectPermissions
     * const count = await prisma.projectPermissions.count({
     *   where: {
     *     // ... the filter for the ProjectPermissions we want to count
     *   }
     * })
    **/
    count<T extends ProjectPermissionsCountArgs>(
      args?: Subset<T, ProjectPermissionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectPermissionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectPermissionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectPermissionsAggregateArgs>(args: Subset<T, ProjectPermissionsAggregateArgs>): Prisma.PrismaPromise<GetProjectPermissionsAggregateType<T>>

    /**
     * Group by ProjectPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectPermissionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectPermissionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectPermissionsGroupByArgs['orderBy'] }
        : { orderBy?: ProjectPermissionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectPermissionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectPermissionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectPermissions model
   */
  readonly fields: ProjectPermissionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectPermissions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectPermissionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectPermissions model
   */
  interface ProjectPermissionsFieldRefs {
    readonly id: FieldRef<"ProjectPermissions", 'String'>
    readonly private: FieldRef<"ProjectPermissions", 'Boolean'>
    readonly allowedUsers: FieldRef<"ProjectPermissions", 'Json'>
    readonly allowCollaborate: FieldRef<"ProjectPermissions", 'Boolean'>
    readonly allowBranch: FieldRef<"ProjectPermissions", 'Boolean'>
    readonly allowShare: FieldRef<"ProjectPermissions", 'Boolean'>
    readonly projectId: FieldRef<"ProjectPermissions", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProjectPermissions findUnique
   */
  export type ProjectPermissionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectPermissions
     */
    select?: ProjectPermissionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectPermissions
     */
    omit?: ProjectPermissionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectPermissionsInclude<ExtArgs> | null
    /**
     * Filter, which ProjectPermissions to fetch.
     */
    where: ProjectPermissionsWhereUniqueInput
  }

  /**
   * ProjectPermissions findUniqueOrThrow
   */
  export type ProjectPermissionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectPermissions
     */
    select?: ProjectPermissionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectPermissions
     */
    omit?: ProjectPermissionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectPermissionsInclude<ExtArgs> | null
    /**
     * Filter, which ProjectPermissions to fetch.
     */
    where: ProjectPermissionsWhereUniqueInput
  }

  /**
   * ProjectPermissions findFirst
   */
  export type ProjectPermissionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectPermissions
     */
    select?: ProjectPermissionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectPermissions
     */
    omit?: ProjectPermissionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectPermissionsInclude<ExtArgs> | null
    /**
     * Filter, which ProjectPermissions to fetch.
     */
    where?: ProjectPermissionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectPermissions to fetch.
     */
    orderBy?: ProjectPermissionsOrderByWithRelationInput | ProjectPermissionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectPermissions.
     */
    cursor?: ProjectPermissionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectPermissions.
     */
    distinct?: ProjectPermissionsScalarFieldEnum | ProjectPermissionsScalarFieldEnum[]
  }

  /**
   * ProjectPermissions findFirstOrThrow
   */
  export type ProjectPermissionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectPermissions
     */
    select?: ProjectPermissionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectPermissions
     */
    omit?: ProjectPermissionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectPermissionsInclude<ExtArgs> | null
    /**
     * Filter, which ProjectPermissions to fetch.
     */
    where?: ProjectPermissionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectPermissions to fetch.
     */
    orderBy?: ProjectPermissionsOrderByWithRelationInput | ProjectPermissionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectPermissions.
     */
    cursor?: ProjectPermissionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectPermissions.
     */
    distinct?: ProjectPermissionsScalarFieldEnum | ProjectPermissionsScalarFieldEnum[]
  }

  /**
   * ProjectPermissions findMany
   */
  export type ProjectPermissionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectPermissions
     */
    select?: ProjectPermissionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectPermissions
     */
    omit?: ProjectPermissionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectPermissionsInclude<ExtArgs> | null
    /**
     * Filter, which ProjectPermissions to fetch.
     */
    where?: ProjectPermissionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectPermissions to fetch.
     */
    orderBy?: ProjectPermissionsOrderByWithRelationInput | ProjectPermissionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectPermissions.
     */
    cursor?: ProjectPermissionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectPermissions.
     */
    skip?: number
    distinct?: ProjectPermissionsScalarFieldEnum | ProjectPermissionsScalarFieldEnum[]
  }

  /**
   * ProjectPermissions create
   */
  export type ProjectPermissionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectPermissions
     */
    select?: ProjectPermissionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectPermissions
     */
    omit?: ProjectPermissionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectPermissionsInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectPermissions.
     */
    data: XOR<ProjectPermissionsCreateInput, ProjectPermissionsUncheckedCreateInput>
  }

  /**
   * ProjectPermissions createMany
   */
  export type ProjectPermissionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectPermissions.
     */
    data: ProjectPermissionsCreateManyInput | ProjectPermissionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectPermissions createManyAndReturn
   */
  export type ProjectPermissionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectPermissions
     */
    select?: ProjectPermissionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectPermissions
     */
    omit?: ProjectPermissionsOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectPermissions.
     */
    data: ProjectPermissionsCreateManyInput | ProjectPermissionsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectPermissionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectPermissions update
   */
  export type ProjectPermissionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectPermissions
     */
    select?: ProjectPermissionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectPermissions
     */
    omit?: ProjectPermissionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectPermissionsInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectPermissions.
     */
    data: XOR<ProjectPermissionsUpdateInput, ProjectPermissionsUncheckedUpdateInput>
    /**
     * Choose, which ProjectPermissions to update.
     */
    where: ProjectPermissionsWhereUniqueInput
  }

  /**
   * ProjectPermissions updateMany
   */
  export type ProjectPermissionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectPermissions.
     */
    data: XOR<ProjectPermissionsUpdateManyMutationInput, ProjectPermissionsUncheckedUpdateManyInput>
    /**
     * Filter which ProjectPermissions to update
     */
    where?: ProjectPermissionsWhereInput
    /**
     * Limit how many ProjectPermissions to update.
     */
    limit?: number
  }

  /**
   * ProjectPermissions updateManyAndReturn
   */
  export type ProjectPermissionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectPermissions
     */
    select?: ProjectPermissionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectPermissions
     */
    omit?: ProjectPermissionsOmit<ExtArgs> | null
    /**
     * The data used to update ProjectPermissions.
     */
    data: XOR<ProjectPermissionsUpdateManyMutationInput, ProjectPermissionsUncheckedUpdateManyInput>
    /**
     * Filter which ProjectPermissions to update
     */
    where?: ProjectPermissionsWhereInput
    /**
     * Limit how many ProjectPermissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectPermissionsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectPermissions upsert
   */
  export type ProjectPermissionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectPermissions
     */
    select?: ProjectPermissionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectPermissions
     */
    omit?: ProjectPermissionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectPermissionsInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectPermissions to update in case it exists.
     */
    where: ProjectPermissionsWhereUniqueInput
    /**
     * In case the ProjectPermissions found by the `where` argument doesn't exist, create a new ProjectPermissions with this data.
     */
    create: XOR<ProjectPermissionsCreateInput, ProjectPermissionsUncheckedCreateInput>
    /**
     * In case the ProjectPermissions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectPermissionsUpdateInput, ProjectPermissionsUncheckedUpdateInput>
  }

  /**
   * ProjectPermissions delete
   */
  export type ProjectPermissionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectPermissions
     */
    select?: ProjectPermissionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectPermissions
     */
    omit?: ProjectPermissionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectPermissionsInclude<ExtArgs> | null
    /**
     * Filter which ProjectPermissions to delete.
     */
    where: ProjectPermissionsWhereUniqueInput
  }

  /**
   * ProjectPermissions deleteMany
   */
  export type ProjectPermissionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectPermissions to delete
     */
    where?: ProjectPermissionsWhereInput
    /**
     * Limit how many ProjectPermissions to delete.
     */
    limit?: number
  }

  /**
   * ProjectPermissions without action
   */
  export type ProjectPermissionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectPermissions
     */
    select?: ProjectPermissionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectPermissions
     */
    omit?: ProjectPermissionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectPermissionsInclude<ExtArgs> | null
  }


  /**
   * Model ProjectInteraction
   */

  export type AggregateProjectInteraction = {
    _count: ProjectInteractionCountAggregateOutputType | null
    _min: ProjectInteractionMinAggregateOutputType | null
    _max: ProjectInteractionMaxAggregateOutputType | null
  }

  export type ProjectInteractionMinAggregateOutputType = {
    id: string | null
    type: $Enums.InteractionType | null
    createdAt: Date | null
    projectId: string | null
    userId: string | null
  }

  export type ProjectInteractionMaxAggregateOutputType = {
    id: string | null
    type: $Enums.InteractionType | null
    createdAt: Date | null
    projectId: string | null
    userId: string | null
  }

  export type ProjectInteractionCountAggregateOutputType = {
    id: number
    type: number
    createdAt: number
    projectId: number
    userId: number
    _all: number
  }


  export type ProjectInteractionMinAggregateInputType = {
    id?: true
    type?: true
    createdAt?: true
    projectId?: true
    userId?: true
  }

  export type ProjectInteractionMaxAggregateInputType = {
    id?: true
    type?: true
    createdAt?: true
    projectId?: true
    userId?: true
  }

  export type ProjectInteractionCountAggregateInputType = {
    id?: true
    type?: true
    createdAt?: true
    projectId?: true
    userId?: true
    _all?: true
  }

  export type ProjectInteractionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectInteraction to aggregate.
     */
    where?: ProjectInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectInteractions to fetch.
     */
    orderBy?: ProjectInteractionOrderByWithRelationInput | ProjectInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProjectInteractions
    **/
    _count?: true | ProjectInteractionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectInteractionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectInteractionMaxAggregateInputType
  }

  export type GetProjectInteractionAggregateType<T extends ProjectInteractionAggregateArgs> = {
        [P in keyof T & keyof AggregateProjectInteraction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProjectInteraction[P]>
      : GetScalarType<T[P], AggregateProjectInteraction[P]>
  }




  export type ProjectInteractionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectInteractionWhereInput
    orderBy?: ProjectInteractionOrderByWithAggregationInput | ProjectInteractionOrderByWithAggregationInput[]
    by: ProjectInteractionScalarFieldEnum[] | ProjectInteractionScalarFieldEnum
    having?: ProjectInteractionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectInteractionCountAggregateInputType | true
    _min?: ProjectInteractionMinAggregateInputType
    _max?: ProjectInteractionMaxAggregateInputType
  }

  export type ProjectInteractionGroupByOutputType = {
    id: string
    type: $Enums.InteractionType
    createdAt: Date
    projectId: string
    userId: string
    _count: ProjectInteractionCountAggregateOutputType | null
    _min: ProjectInteractionMinAggregateOutputType | null
    _max: ProjectInteractionMaxAggregateOutputType | null
  }

  type GetProjectInteractionGroupByPayload<T extends ProjectInteractionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectInteractionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectInteractionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectInteractionGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectInteractionGroupByOutputType[P]>
        }
      >
    >


  export type ProjectInteractionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    createdAt?: boolean
    projectId?: boolean
    userId?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectInteraction"]>

  export type ProjectInteractionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    createdAt?: boolean
    projectId?: boolean
    userId?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectInteraction"]>

  export type ProjectInteractionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    createdAt?: boolean
    projectId?: boolean
    userId?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["projectInteraction"]>

  export type ProjectInteractionSelectScalar = {
    id?: boolean
    type?: boolean
    createdAt?: boolean
    projectId?: boolean
    userId?: boolean
  }

  export type ProjectInteractionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "createdAt" | "projectId" | "userId", ExtArgs["result"]["projectInteraction"]>
  export type ProjectInteractionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectInteractionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectInteractionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectInteractionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProjectInteraction"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.InteractionType
      createdAt: Date
      projectId: string
      userId: string
    }, ExtArgs["result"]["projectInteraction"]>
    composites: {}
  }

  type ProjectInteractionGetPayload<S extends boolean | null | undefined | ProjectInteractionDefaultArgs> = $Result.GetResult<Prisma.$ProjectInteractionPayload, S>

  type ProjectInteractionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectInteractionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectInteractionCountAggregateInputType | true
    }

  export interface ProjectInteractionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProjectInteraction'], meta: { name: 'ProjectInteraction' } }
    /**
     * Find zero or one ProjectInteraction that matches the filter.
     * @param {ProjectInteractionFindUniqueArgs} args - Arguments to find a ProjectInteraction
     * @example
     * // Get one ProjectInteraction
     * const projectInteraction = await prisma.projectInteraction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectInteractionFindUniqueArgs>(args: SelectSubset<T, ProjectInteractionFindUniqueArgs<ExtArgs>>): Prisma__ProjectInteractionClient<$Result.GetResult<Prisma.$ProjectInteractionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProjectInteraction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectInteractionFindUniqueOrThrowArgs} args - Arguments to find a ProjectInteraction
     * @example
     * // Get one ProjectInteraction
     * const projectInteraction = await prisma.projectInteraction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectInteractionFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectInteractionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectInteractionClient<$Result.GetResult<Prisma.$ProjectInteractionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectInteraction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectInteractionFindFirstArgs} args - Arguments to find a ProjectInteraction
     * @example
     * // Get one ProjectInteraction
     * const projectInteraction = await prisma.projectInteraction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectInteractionFindFirstArgs>(args?: SelectSubset<T, ProjectInteractionFindFirstArgs<ExtArgs>>): Prisma__ProjectInteractionClient<$Result.GetResult<Prisma.$ProjectInteractionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProjectInteraction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectInteractionFindFirstOrThrowArgs} args - Arguments to find a ProjectInteraction
     * @example
     * // Get one ProjectInteraction
     * const projectInteraction = await prisma.projectInteraction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectInteractionFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectInteractionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectInteractionClient<$Result.GetResult<Prisma.$ProjectInteractionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProjectInteractions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectInteractionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProjectInteractions
     * const projectInteractions = await prisma.projectInteraction.findMany()
     * 
     * // Get first 10 ProjectInteractions
     * const projectInteractions = await prisma.projectInteraction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectInteractionWithIdOnly = await prisma.projectInteraction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectInteractionFindManyArgs>(args?: SelectSubset<T, ProjectInteractionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectInteractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProjectInteraction.
     * @param {ProjectInteractionCreateArgs} args - Arguments to create a ProjectInteraction.
     * @example
     * // Create one ProjectInteraction
     * const ProjectInteraction = await prisma.projectInteraction.create({
     *   data: {
     *     // ... data to create a ProjectInteraction
     *   }
     * })
     * 
     */
    create<T extends ProjectInteractionCreateArgs>(args: SelectSubset<T, ProjectInteractionCreateArgs<ExtArgs>>): Prisma__ProjectInteractionClient<$Result.GetResult<Prisma.$ProjectInteractionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProjectInteractions.
     * @param {ProjectInteractionCreateManyArgs} args - Arguments to create many ProjectInteractions.
     * @example
     * // Create many ProjectInteractions
     * const projectInteraction = await prisma.projectInteraction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectInteractionCreateManyArgs>(args?: SelectSubset<T, ProjectInteractionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProjectInteractions and returns the data saved in the database.
     * @param {ProjectInteractionCreateManyAndReturnArgs} args - Arguments to create many ProjectInteractions.
     * @example
     * // Create many ProjectInteractions
     * const projectInteraction = await prisma.projectInteraction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProjectInteractions and only return the `id`
     * const projectInteractionWithIdOnly = await prisma.projectInteraction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectInteractionCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectInteractionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectInteractionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProjectInteraction.
     * @param {ProjectInteractionDeleteArgs} args - Arguments to delete one ProjectInteraction.
     * @example
     * // Delete one ProjectInteraction
     * const ProjectInteraction = await prisma.projectInteraction.delete({
     *   where: {
     *     // ... filter to delete one ProjectInteraction
     *   }
     * })
     * 
     */
    delete<T extends ProjectInteractionDeleteArgs>(args: SelectSubset<T, ProjectInteractionDeleteArgs<ExtArgs>>): Prisma__ProjectInteractionClient<$Result.GetResult<Prisma.$ProjectInteractionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProjectInteraction.
     * @param {ProjectInteractionUpdateArgs} args - Arguments to update one ProjectInteraction.
     * @example
     * // Update one ProjectInteraction
     * const projectInteraction = await prisma.projectInteraction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectInteractionUpdateArgs>(args: SelectSubset<T, ProjectInteractionUpdateArgs<ExtArgs>>): Prisma__ProjectInteractionClient<$Result.GetResult<Prisma.$ProjectInteractionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProjectInteractions.
     * @param {ProjectInteractionDeleteManyArgs} args - Arguments to filter ProjectInteractions to delete.
     * @example
     * // Delete a few ProjectInteractions
     * const { count } = await prisma.projectInteraction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectInteractionDeleteManyArgs>(args?: SelectSubset<T, ProjectInteractionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectInteractionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProjectInteractions
     * const projectInteraction = await prisma.projectInteraction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectInteractionUpdateManyArgs>(args: SelectSubset<T, ProjectInteractionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProjectInteractions and returns the data updated in the database.
     * @param {ProjectInteractionUpdateManyAndReturnArgs} args - Arguments to update many ProjectInteractions.
     * @example
     * // Update many ProjectInteractions
     * const projectInteraction = await prisma.projectInteraction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProjectInteractions and only return the `id`
     * const projectInteractionWithIdOnly = await prisma.projectInteraction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectInteractionUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectInteractionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectInteractionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProjectInteraction.
     * @param {ProjectInteractionUpsertArgs} args - Arguments to update or create a ProjectInteraction.
     * @example
     * // Update or create a ProjectInteraction
     * const projectInteraction = await prisma.projectInteraction.upsert({
     *   create: {
     *     // ... data to create a ProjectInteraction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProjectInteraction we want to update
     *   }
     * })
     */
    upsert<T extends ProjectInteractionUpsertArgs>(args: SelectSubset<T, ProjectInteractionUpsertArgs<ExtArgs>>): Prisma__ProjectInteractionClient<$Result.GetResult<Prisma.$ProjectInteractionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProjectInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectInteractionCountArgs} args - Arguments to filter ProjectInteractions to count.
     * @example
     * // Count the number of ProjectInteractions
     * const count = await prisma.projectInteraction.count({
     *   where: {
     *     // ... the filter for the ProjectInteractions we want to count
     *   }
     * })
    **/
    count<T extends ProjectInteractionCountArgs>(
      args?: Subset<T, ProjectInteractionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectInteractionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProjectInteraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectInteractionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectInteractionAggregateArgs>(args: Subset<T, ProjectInteractionAggregateArgs>): Prisma.PrismaPromise<GetProjectInteractionAggregateType<T>>

    /**
     * Group by ProjectInteraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectInteractionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectInteractionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectInteractionGroupByArgs['orderBy'] }
        : { orderBy?: ProjectInteractionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectInteractionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectInteractionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProjectInteraction model
   */
  readonly fields: ProjectInteractionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProjectInteraction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectInteractionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProjectInteraction model
   */
  interface ProjectInteractionFieldRefs {
    readonly id: FieldRef<"ProjectInteraction", 'String'>
    readonly type: FieldRef<"ProjectInteraction", 'InteractionType'>
    readonly createdAt: FieldRef<"ProjectInteraction", 'DateTime'>
    readonly projectId: FieldRef<"ProjectInteraction", 'String'>
    readonly userId: FieldRef<"ProjectInteraction", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProjectInteraction findUnique
   */
  export type ProjectInteractionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInteraction
     */
    select?: ProjectInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInteraction
     */
    omit?: ProjectInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInteractionInclude<ExtArgs> | null
    /**
     * Filter, which ProjectInteraction to fetch.
     */
    where: ProjectInteractionWhereUniqueInput
  }

  /**
   * ProjectInteraction findUniqueOrThrow
   */
  export type ProjectInteractionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInteraction
     */
    select?: ProjectInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInteraction
     */
    omit?: ProjectInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInteractionInclude<ExtArgs> | null
    /**
     * Filter, which ProjectInteraction to fetch.
     */
    where: ProjectInteractionWhereUniqueInput
  }

  /**
   * ProjectInteraction findFirst
   */
  export type ProjectInteractionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInteraction
     */
    select?: ProjectInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInteraction
     */
    omit?: ProjectInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInteractionInclude<ExtArgs> | null
    /**
     * Filter, which ProjectInteraction to fetch.
     */
    where?: ProjectInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectInteractions to fetch.
     */
    orderBy?: ProjectInteractionOrderByWithRelationInput | ProjectInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectInteractions.
     */
    cursor?: ProjectInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectInteractions.
     */
    distinct?: ProjectInteractionScalarFieldEnum | ProjectInteractionScalarFieldEnum[]
  }

  /**
   * ProjectInteraction findFirstOrThrow
   */
  export type ProjectInteractionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInteraction
     */
    select?: ProjectInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInteraction
     */
    omit?: ProjectInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInteractionInclude<ExtArgs> | null
    /**
     * Filter, which ProjectInteraction to fetch.
     */
    where?: ProjectInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectInteractions to fetch.
     */
    orderBy?: ProjectInteractionOrderByWithRelationInput | ProjectInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProjectInteractions.
     */
    cursor?: ProjectInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProjectInteractions.
     */
    distinct?: ProjectInteractionScalarFieldEnum | ProjectInteractionScalarFieldEnum[]
  }

  /**
   * ProjectInteraction findMany
   */
  export type ProjectInteractionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInteraction
     */
    select?: ProjectInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInteraction
     */
    omit?: ProjectInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInteractionInclude<ExtArgs> | null
    /**
     * Filter, which ProjectInteractions to fetch.
     */
    where?: ProjectInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProjectInteractions to fetch.
     */
    orderBy?: ProjectInteractionOrderByWithRelationInput | ProjectInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProjectInteractions.
     */
    cursor?: ProjectInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProjectInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProjectInteractions.
     */
    skip?: number
    distinct?: ProjectInteractionScalarFieldEnum | ProjectInteractionScalarFieldEnum[]
  }

  /**
   * ProjectInteraction create
   */
  export type ProjectInteractionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInteraction
     */
    select?: ProjectInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInteraction
     */
    omit?: ProjectInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInteractionInclude<ExtArgs> | null
    /**
     * The data needed to create a ProjectInteraction.
     */
    data: XOR<ProjectInteractionCreateInput, ProjectInteractionUncheckedCreateInput>
  }

  /**
   * ProjectInteraction createMany
   */
  export type ProjectInteractionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProjectInteractions.
     */
    data: ProjectInteractionCreateManyInput | ProjectInteractionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProjectInteraction createManyAndReturn
   */
  export type ProjectInteractionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInteraction
     */
    select?: ProjectInteractionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInteraction
     */
    omit?: ProjectInteractionOmit<ExtArgs> | null
    /**
     * The data used to create many ProjectInteractions.
     */
    data: ProjectInteractionCreateManyInput | ProjectInteractionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInteractionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectInteraction update
   */
  export type ProjectInteractionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInteraction
     */
    select?: ProjectInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInteraction
     */
    omit?: ProjectInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInteractionInclude<ExtArgs> | null
    /**
     * The data needed to update a ProjectInteraction.
     */
    data: XOR<ProjectInteractionUpdateInput, ProjectInteractionUncheckedUpdateInput>
    /**
     * Choose, which ProjectInteraction to update.
     */
    where: ProjectInteractionWhereUniqueInput
  }

  /**
   * ProjectInteraction updateMany
   */
  export type ProjectInteractionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProjectInteractions.
     */
    data: XOR<ProjectInteractionUpdateManyMutationInput, ProjectInteractionUncheckedUpdateManyInput>
    /**
     * Filter which ProjectInteractions to update
     */
    where?: ProjectInteractionWhereInput
    /**
     * Limit how many ProjectInteractions to update.
     */
    limit?: number
  }

  /**
   * ProjectInteraction updateManyAndReturn
   */
  export type ProjectInteractionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInteraction
     */
    select?: ProjectInteractionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInteraction
     */
    omit?: ProjectInteractionOmit<ExtArgs> | null
    /**
     * The data used to update ProjectInteractions.
     */
    data: XOR<ProjectInteractionUpdateManyMutationInput, ProjectInteractionUncheckedUpdateManyInput>
    /**
     * Filter which ProjectInteractions to update
     */
    where?: ProjectInteractionWhereInput
    /**
     * Limit how many ProjectInteractions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInteractionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProjectInteraction upsert
   */
  export type ProjectInteractionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInteraction
     */
    select?: ProjectInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInteraction
     */
    omit?: ProjectInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInteractionInclude<ExtArgs> | null
    /**
     * The filter to search for the ProjectInteraction to update in case it exists.
     */
    where: ProjectInteractionWhereUniqueInput
    /**
     * In case the ProjectInteraction found by the `where` argument doesn't exist, create a new ProjectInteraction with this data.
     */
    create: XOR<ProjectInteractionCreateInput, ProjectInteractionUncheckedCreateInput>
    /**
     * In case the ProjectInteraction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectInteractionUpdateInput, ProjectInteractionUncheckedUpdateInput>
  }

  /**
   * ProjectInteraction delete
   */
  export type ProjectInteractionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInteraction
     */
    select?: ProjectInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInteraction
     */
    omit?: ProjectInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInteractionInclude<ExtArgs> | null
    /**
     * Filter which ProjectInteraction to delete.
     */
    where: ProjectInteractionWhereUniqueInput
  }

  /**
   * ProjectInteraction deleteMany
   */
  export type ProjectInteractionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProjectInteractions to delete
     */
    where?: ProjectInteractionWhereInput
    /**
     * Limit how many ProjectInteractions to delete.
     */
    limit?: number
  }

  /**
   * ProjectInteraction without action
   */
  export type ProjectInteractionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectInteraction
     */
    select?: ProjectInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProjectInteraction
     */
    omit?: ProjectInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInteractionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refreshToken: 'refreshToken',
    accessToken: 'accessToken',
    expiresAt: 'expiresAt',
    tokenType: 'tokenType',
    scope: 'scope',
    idToken: 'idToken',
    sessionState: 'sessionState'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const FollowScalarFieldEnum: {
    id: 'id',
    followerId: 'followerId',
    followedId: 'followedId',
    createdAt: 'createdAt'
  };

  export type FollowScalarFieldEnum = (typeof FollowScalarFieldEnum)[keyof typeof FollowScalarFieldEnum]


  export const PostScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    branchId: 'branchId',
    authorId: 'authorId'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const PostMediaScalarFieldEnum: {
    id: 'id',
    name: 'name',
    url: 'url',
    postId: 'postId'
  };

  export type PostMediaScalarFieldEnum = (typeof PostMediaScalarFieldEnum)[keyof typeof PostMediaScalarFieldEnum]


  export const PostInteractionScalarFieldEnum: {
    id: 'id',
    type: 'type',
    createdAt: 'createdAt',
    postId: 'postId',
    userId: 'userId'
  };

  export type PostInteractionScalarFieldEnum = (typeof PostInteractionScalarFieldEnum)[keyof typeof PostInteractionScalarFieldEnum]


  export const BranchScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    default: 'default',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    projectId: 'projectId',
    authorId: 'authorId'
  };

  export type BranchScalarFieldEnum = (typeof BranchScalarFieldEnum)[keyof typeof BranchScalarFieldEnum]


  export const BranchPermissionsScalarFieldEnum: {
    id: 'id',
    private: 'private',
    allowedUsers: 'allowedUsers',
    allowCollaborate: 'allowCollaborate',
    allowBranch: 'allowBranch',
    allowShare: 'allowShare',
    branchId: 'branchId'
  };

  export type BranchPermissionsScalarFieldEnum = (typeof BranchPermissionsScalarFieldEnum)[keyof typeof BranchPermissionsScalarFieldEnum]


  export const BranchInteractionScalarFieldEnum: {
    id: 'id',
    type: 'type',
    createdAt: 'createdAt',
    branchId: 'branchId',
    userId: 'userId'
  };

  export type BranchInteractionScalarFieldEnum = (typeof BranchInteractionScalarFieldEnum)[keyof typeof BranchInteractionScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    picture: 'picture',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    authorId: 'authorId'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const ProjectPermissionsScalarFieldEnum: {
    id: 'id',
    private: 'private',
    allowedUsers: 'allowedUsers',
    allowCollaborate: 'allowCollaborate',
    allowBranch: 'allowBranch',
    allowShare: 'allowShare',
    projectId: 'projectId'
  };

  export type ProjectPermissionsScalarFieldEnum = (typeof ProjectPermissionsScalarFieldEnum)[keyof typeof ProjectPermissionsScalarFieldEnum]


  export const ProjectInteractionScalarFieldEnum: {
    id: 'id',
    type: 'type',
    createdAt: 'createdAt',
    projectId: 'projectId',
    userId: 'userId'
  };

  export type ProjectInteractionScalarFieldEnum = (typeof ProjectInteractionScalarFieldEnum)[keyof typeof ProjectInteractionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'InteractionType'
   */
  export type EnumInteractionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InteractionType'>
    


  /**
   * Reference to a field of type 'InteractionType[]'
   */
  export type ListEnumInteractionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InteractionType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    follows?: FollowListRelationFilter
    following?: FollowListRelationFilter
    posts?: PostListRelationFilter
    branches?: BranchListRelationFilter
    projects?: ProjectListRelationFilter
    postInteractions?: PostInteractionListRelationFilter
    branchInteractions?: BranchInteractionListRelationFilter
    projectInteractions?: ProjectInteractionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    follows?: FollowOrderByRelationAggregateInput
    following?: FollowOrderByRelationAggregateInput
    posts?: PostOrderByRelationAggregateInput
    branches?: BranchOrderByRelationAggregateInput
    projects?: ProjectOrderByRelationAggregateInput
    postInteractions?: PostInteractionOrderByRelationAggregateInput
    branchInteractions?: BranchInteractionOrderByRelationAggregateInput
    projectInteractions?: ProjectInteractionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
    follows?: FollowListRelationFilter
    following?: FollowListRelationFilter
    posts?: PostListRelationFilter
    branches?: BranchListRelationFilter
    projects?: ProjectListRelationFilter
    postInteractions?: PostInteractionListRelationFilter
    branchInteractions?: BranchInteractionListRelationFilter
    projectInteractions?: ProjectInteractionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refreshToken?: StringNullableFilter<"Account"> | string | null
    accessToken?: StringNullableFilter<"Account"> | string | null
    expiresAt?: IntNullableFilter<"Account"> | number | null
    tokenType?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    sessionState?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    accessToken?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    tokenType?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    sessionState?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refreshToken?: StringNullableFilter<"Account"> | string | null
    accessToken?: StringNullableFilter<"Account"> | string | null
    expiresAt?: IntNullableFilter<"Account"> | number | null
    tokenType?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    sessionState?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    accessToken?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    tokenType?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    sessionState?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expiresAt?: IntNullableWithAggregatesFilter<"Account"> | number | null
    tokenType?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    sessionState?: StringNullableWithAggregatesFilter<"Account"> | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type FollowWhereInput = {
    AND?: FollowWhereInput | FollowWhereInput[]
    OR?: FollowWhereInput[]
    NOT?: FollowWhereInput | FollowWhereInput[]
    id?: StringFilter<"Follow"> | string
    followerId?: StringFilter<"Follow"> | string
    followedId?: StringFilter<"Follow"> | string
    createdAt?: DateTimeFilter<"Follow"> | Date | string
    follower?: XOR<UserScalarRelationFilter, UserWhereInput>
    followed?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FollowOrderByWithRelationInput = {
    id?: SortOrder
    followerId?: SortOrder
    followedId?: SortOrder
    createdAt?: SortOrder
    follower?: UserOrderByWithRelationInput
    followed?: UserOrderByWithRelationInput
  }

  export type FollowWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FollowWhereInput | FollowWhereInput[]
    OR?: FollowWhereInput[]
    NOT?: FollowWhereInput | FollowWhereInput[]
    followerId?: StringFilter<"Follow"> | string
    followedId?: StringFilter<"Follow"> | string
    createdAt?: DateTimeFilter<"Follow"> | Date | string
    follower?: XOR<UserScalarRelationFilter, UserWhereInput>
    followed?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type FollowOrderByWithAggregationInput = {
    id?: SortOrder
    followerId?: SortOrder
    followedId?: SortOrder
    createdAt?: SortOrder
    _count?: FollowCountOrderByAggregateInput
    _max?: FollowMaxOrderByAggregateInput
    _min?: FollowMinOrderByAggregateInput
  }

  export type FollowScalarWhereWithAggregatesInput = {
    AND?: FollowScalarWhereWithAggregatesInput | FollowScalarWhereWithAggregatesInput[]
    OR?: FollowScalarWhereWithAggregatesInput[]
    NOT?: FollowScalarWhereWithAggregatesInput | FollowScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Follow"> | string
    followerId?: StringWithAggregatesFilter<"Follow"> | string
    followedId?: StringWithAggregatesFilter<"Follow"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Follow"> | Date | string
  }

  export type PostWhereInput = {
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    id?: StringFilter<"Post"> | string
    title?: StringFilter<"Post"> | string
    content?: StringNullableFilter<"Post"> | string | null
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Post"> | Date | string | null
    branchId?: StringFilter<"Post"> | string
    authorId?: StringFilter<"Post"> | string
    branch?: XOR<BranchScalarRelationFilter, BranchWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    media?: PostMediaListRelationFilter
    interactions?: PostInteractionListRelationFilter
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    branchId?: SortOrder
    authorId?: SortOrder
    branch?: BranchOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
    media?: PostMediaOrderByRelationAggregateInput
    interactions?: PostInteractionOrderByRelationAggregateInput
  }

  export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    title?: StringFilter<"Post"> | string
    content?: StringNullableFilter<"Post"> | string | null
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Post"> | Date | string | null
    branchId?: StringFilter<"Post"> | string
    authorId?: StringFilter<"Post"> | string
    branch?: XOR<BranchScalarRelationFilter, BranchWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    media?: PostMediaListRelationFilter
    interactions?: PostInteractionListRelationFilter
  }, "id">

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    branchId?: SortOrder
    authorId?: SortOrder
    _count?: PostCountOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    OR?: PostScalarWhereWithAggregatesInput[]
    NOT?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Post"> | string
    title?: StringWithAggregatesFilter<"Post"> | string
    content?: StringNullableWithAggregatesFilter<"Post"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Post"> | Date | string | null
    branchId?: StringWithAggregatesFilter<"Post"> | string
    authorId?: StringWithAggregatesFilter<"Post"> | string
  }

  export type PostMediaWhereInput = {
    AND?: PostMediaWhereInput | PostMediaWhereInput[]
    OR?: PostMediaWhereInput[]
    NOT?: PostMediaWhereInput | PostMediaWhereInput[]
    id?: StringFilter<"PostMedia"> | string
    name?: StringFilter<"PostMedia"> | string
    url?: StringFilter<"PostMedia"> | string
    postId?: StringFilter<"PostMedia"> | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
  }

  export type PostMediaOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    postId?: SortOrder
    post?: PostOrderByWithRelationInput
  }

  export type PostMediaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PostMediaWhereInput | PostMediaWhereInput[]
    OR?: PostMediaWhereInput[]
    NOT?: PostMediaWhereInput | PostMediaWhereInput[]
    name?: StringFilter<"PostMedia"> | string
    url?: StringFilter<"PostMedia"> | string
    postId?: StringFilter<"PostMedia"> | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
  }, "id">

  export type PostMediaOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    postId?: SortOrder
    _count?: PostMediaCountOrderByAggregateInput
    _max?: PostMediaMaxOrderByAggregateInput
    _min?: PostMediaMinOrderByAggregateInput
  }

  export type PostMediaScalarWhereWithAggregatesInput = {
    AND?: PostMediaScalarWhereWithAggregatesInput | PostMediaScalarWhereWithAggregatesInput[]
    OR?: PostMediaScalarWhereWithAggregatesInput[]
    NOT?: PostMediaScalarWhereWithAggregatesInput | PostMediaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PostMedia"> | string
    name?: StringWithAggregatesFilter<"PostMedia"> | string
    url?: StringWithAggregatesFilter<"PostMedia"> | string
    postId?: StringWithAggregatesFilter<"PostMedia"> | string
  }

  export type PostInteractionWhereInput = {
    AND?: PostInteractionWhereInput | PostInteractionWhereInput[]
    OR?: PostInteractionWhereInput[]
    NOT?: PostInteractionWhereInput | PostInteractionWhereInput[]
    id?: StringFilter<"PostInteraction"> | string
    type?: EnumInteractionTypeFilter<"PostInteraction"> | $Enums.InteractionType
    createdAt?: DateTimeFilter<"PostInteraction"> | Date | string
    postId?: StringFilter<"PostInteraction"> | string
    userId?: StringFilter<"PostInteraction"> | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PostInteractionOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    postId?: SortOrder
    userId?: SortOrder
    post?: PostOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type PostInteractionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PostInteractionWhereInput | PostInteractionWhereInput[]
    OR?: PostInteractionWhereInput[]
    NOT?: PostInteractionWhereInput | PostInteractionWhereInput[]
    type?: EnumInteractionTypeFilter<"PostInteraction"> | $Enums.InteractionType
    createdAt?: DateTimeFilter<"PostInteraction"> | Date | string
    postId?: StringFilter<"PostInteraction"> | string
    userId?: StringFilter<"PostInteraction"> | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type PostInteractionOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    postId?: SortOrder
    userId?: SortOrder
    _count?: PostInteractionCountOrderByAggregateInput
    _max?: PostInteractionMaxOrderByAggregateInput
    _min?: PostInteractionMinOrderByAggregateInput
  }

  export type PostInteractionScalarWhereWithAggregatesInput = {
    AND?: PostInteractionScalarWhereWithAggregatesInput | PostInteractionScalarWhereWithAggregatesInput[]
    OR?: PostInteractionScalarWhereWithAggregatesInput[]
    NOT?: PostInteractionScalarWhereWithAggregatesInput | PostInteractionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PostInteraction"> | string
    type?: EnumInteractionTypeWithAggregatesFilter<"PostInteraction"> | $Enums.InteractionType
    createdAt?: DateTimeWithAggregatesFilter<"PostInteraction"> | Date | string
    postId?: StringWithAggregatesFilter<"PostInteraction"> | string
    userId?: StringWithAggregatesFilter<"PostInteraction"> | string
  }

  export type BranchWhereInput = {
    AND?: BranchWhereInput | BranchWhereInput[]
    OR?: BranchWhereInput[]
    NOT?: BranchWhereInput | BranchWhereInput[]
    id?: StringFilter<"Branch"> | string
    name?: StringFilter<"Branch"> | string
    description?: StringNullableFilter<"Branch"> | string | null
    default?: BoolFilter<"Branch"> | boolean
    createdAt?: DateTimeFilter<"Branch"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Branch"> | Date | string | null
    projectId?: StringFilter<"Branch"> | string
    authorId?: StringFilter<"Branch"> | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    permissions?: XOR<BranchPermissionsNullableScalarRelationFilter, BranchPermissionsWhereInput> | null
    interactions?: BranchInteractionListRelationFilter
    posts?: PostListRelationFilter
  }

  export type BranchOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    default?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    projectId?: SortOrder
    authorId?: SortOrder
    author?: UserOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
    permissions?: BranchPermissionsOrderByWithRelationInput
    interactions?: BranchInteractionOrderByRelationAggregateInput
    posts?: PostOrderByRelationAggregateInput
  }

  export type BranchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BranchWhereInput | BranchWhereInput[]
    OR?: BranchWhereInput[]
    NOT?: BranchWhereInput | BranchWhereInput[]
    name?: StringFilter<"Branch"> | string
    description?: StringNullableFilter<"Branch"> | string | null
    default?: BoolFilter<"Branch"> | boolean
    createdAt?: DateTimeFilter<"Branch"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Branch"> | Date | string | null
    projectId?: StringFilter<"Branch"> | string
    authorId?: StringFilter<"Branch"> | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    permissions?: XOR<BranchPermissionsNullableScalarRelationFilter, BranchPermissionsWhereInput> | null
    interactions?: BranchInteractionListRelationFilter
    posts?: PostListRelationFilter
  }, "id">

  export type BranchOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    default?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    projectId?: SortOrder
    authorId?: SortOrder
    _count?: BranchCountOrderByAggregateInput
    _max?: BranchMaxOrderByAggregateInput
    _min?: BranchMinOrderByAggregateInput
  }

  export type BranchScalarWhereWithAggregatesInput = {
    AND?: BranchScalarWhereWithAggregatesInput | BranchScalarWhereWithAggregatesInput[]
    OR?: BranchScalarWhereWithAggregatesInput[]
    NOT?: BranchScalarWhereWithAggregatesInput | BranchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Branch"> | string
    name?: StringWithAggregatesFilter<"Branch"> | string
    description?: StringNullableWithAggregatesFilter<"Branch"> | string | null
    default?: BoolWithAggregatesFilter<"Branch"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Branch"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Branch"> | Date | string | null
    projectId?: StringWithAggregatesFilter<"Branch"> | string
    authorId?: StringWithAggregatesFilter<"Branch"> | string
  }

  export type BranchPermissionsWhereInput = {
    AND?: BranchPermissionsWhereInput | BranchPermissionsWhereInput[]
    OR?: BranchPermissionsWhereInput[]
    NOT?: BranchPermissionsWhereInput | BranchPermissionsWhereInput[]
    id?: StringFilter<"BranchPermissions"> | string
    private?: BoolFilter<"BranchPermissions"> | boolean
    allowedUsers?: JsonFilter<"BranchPermissions">
    allowCollaborate?: BoolFilter<"BranchPermissions"> | boolean
    allowBranch?: BoolFilter<"BranchPermissions"> | boolean
    allowShare?: BoolFilter<"BranchPermissions"> | boolean
    branchId?: StringFilter<"BranchPermissions"> | string
    branch?: XOR<BranchScalarRelationFilter, BranchWhereInput>
  }

  export type BranchPermissionsOrderByWithRelationInput = {
    id?: SortOrder
    private?: SortOrder
    allowedUsers?: SortOrder
    allowCollaborate?: SortOrder
    allowBranch?: SortOrder
    allowShare?: SortOrder
    branchId?: SortOrder
    branch?: BranchOrderByWithRelationInput
  }

  export type BranchPermissionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    branchId?: string
    AND?: BranchPermissionsWhereInput | BranchPermissionsWhereInput[]
    OR?: BranchPermissionsWhereInput[]
    NOT?: BranchPermissionsWhereInput | BranchPermissionsWhereInput[]
    private?: BoolFilter<"BranchPermissions"> | boolean
    allowedUsers?: JsonFilter<"BranchPermissions">
    allowCollaborate?: BoolFilter<"BranchPermissions"> | boolean
    allowBranch?: BoolFilter<"BranchPermissions"> | boolean
    allowShare?: BoolFilter<"BranchPermissions"> | boolean
    branch?: XOR<BranchScalarRelationFilter, BranchWhereInput>
  }, "id" | "branchId">

  export type BranchPermissionsOrderByWithAggregationInput = {
    id?: SortOrder
    private?: SortOrder
    allowedUsers?: SortOrder
    allowCollaborate?: SortOrder
    allowBranch?: SortOrder
    allowShare?: SortOrder
    branchId?: SortOrder
    _count?: BranchPermissionsCountOrderByAggregateInput
    _max?: BranchPermissionsMaxOrderByAggregateInput
    _min?: BranchPermissionsMinOrderByAggregateInput
  }

  export type BranchPermissionsScalarWhereWithAggregatesInput = {
    AND?: BranchPermissionsScalarWhereWithAggregatesInput | BranchPermissionsScalarWhereWithAggregatesInput[]
    OR?: BranchPermissionsScalarWhereWithAggregatesInput[]
    NOT?: BranchPermissionsScalarWhereWithAggregatesInput | BranchPermissionsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BranchPermissions"> | string
    private?: BoolWithAggregatesFilter<"BranchPermissions"> | boolean
    allowedUsers?: JsonWithAggregatesFilter<"BranchPermissions">
    allowCollaborate?: BoolWithAggregatesFilter<"BranchPermissions"> | boolean
    allowBranch?: BoolWithAggregatesFilter<"BranchPermissions"> | boolean
    allowShare?: BoolWithAggregatesFilter<"BranchPermissions"> | boolean
    branchId?: StringWithAggregatesFilter<"BranchPermissions"> | string
  }

  export type BranchInteractionWhereInput = {
    AND?: BranchInteractionWhereInput | BranchInteractionWhereInput[]
    OR?: BranchInteractionWhereInput[]
    NOT?: BranchInteractionWhereInput | BranchInteractionWhereInput[]
    id?: StringFilter<"BranchInteraction"> | string
    type?: EnumInteractionTypeFilter<"BranchInteraction"> | $Enums.InteractionType
    createdAt?: DateTimeFilter<"BranchInteraction"> | Date | string
    branchId?: StringFilter<"BranchInteraction"> | string
    userId?: StringFilter<"BranchInteraction"> | string
    branch?: XOR<BranchScalarRelationFilter, BranchWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type BranchInteractionOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    branchId?: SortOrder
    userId?: SortOrder
    branch?: BranchOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type BranchInteractionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BranchInteractionWhereInput | BranchInteractionWhereInput[]
    OR?: BranchInteractionWhereInput[]
    NOT?: BranchInteractionWhereInput | BranchInteractionWhereInput[]
    type?: EnumInteractionTypeFilter<"BranchInteraction"> | $Enums.InteractionType
    createdAt?: DateTimeFilter<"BranchInteraction"> | Date | string
    branchId?: StringFilter<"BranchInteraction"> | string
    userId?: StringFilter<"BranchInteraction"> | string
    branch?: XOR<BranchScalarRelationFilter, BranchWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type BranchInteractionOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    branchId?: SortOrder
    userId?: SortOrder
    _count?: BranchInteractionCountOrderByAggregateInput
    _max?: BranchInteractionMaxOrderByAggregateInput
    _min?: BranchInteractionMinOrderByAggregateInput
  }

  export type BranchInteractionScalarWhereWithAggregatesInput = {
    AND?: BranchInteractionScalarWhereWithAggregatesInput | BranchInteractionScalarWhereWithAggregatesInput[]
    OR?: BranchInteractionScalarWhereWithAggregatesInput[]
    NOT?: BranchInteractionScalarWhereWithAggregatesInput | BranchInteractionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BranchInteraction"> | string
    type?: EnumInteractionTypeWithAggregatesFilter<"BranchInteraction"> | $Enums.InteractionType
    createdAt?: DateTimeWithAggregatesFilter<"BranchInteraction"> | Date | string
    branchId?: StringWithAggregatesFilter<"BranchInteraction"> | string
    userId?: StringWithAggregatesFilter<"BranchInteraction"> | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    picture?: StringNullableFilter<"Project"> | string | null
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Project"> | Date | string | null
    authorId?: StringFilter<"Project"> | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    permissions?: XOR<ProjectPermissionsNullableScalarRelationFilter, ProjectPermissionsWhereInput> | null
    interactions?: ProjectInteractionListRelationFilter
    branches?: BranchListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    picture?: SortOrderInput | SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    authorId?: SortOrder
    author?: UserOrderByWithRelationInput
    permissions?: ProjectPermissionsOrderByWithRelationInput
    interactions?: ProjectInteractionOrderByRelationAggregateInput
    branches?: BranchOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    picture?: StringNullableFilter<"Project"> | string | null
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Project"> | Date | string | null
    authorId?: StringFilter<"Project"> | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    permissions?: XOR<ProjectPermissionsNullableScalarRelationFilter, ProjectPermissionsWhereInput> | null
    interactions?: ProjectInteractionListRelationFilter
    branches?: BranchListRelationFilter
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    picture?: SortOrderInput | SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    authorId?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    picture?: StringNullableWithAggregatesFilter<"Project"> | string | null
    name?: StringWithAggregatesFilter<"Project"> | string
    description?: StringNullableWithAggregatesFilter<"Project"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
    authorId?: StringWithAggregatesFilter<"Project"> | string
  }

  export type ProjectPermissionsWhereInput = {
    AND?: ProjectPermissionsWhereInput | ProjectPermissionsWhereInput[]
    OR?: ProjectPermissionsWhereInput[]
    NOT?: ProjectPermissionsWhereInput | ProjectPermissionsWhereInput[]
    id?: StringFilter<"ProjectPermissions"> | string
    private?: BoolFilter<"ProjectPermissions"> | boolean
    allowedUsers?: JsonFilter<"ProjectPermissions">
    allowCollaborate?: BoolFilter<"ProjectPermissions"> | boolean
    allowBranch?: BoolFilter<"ProjectPermissions"> | boolean
    allowShare?: BoolFilter<"ProjectPermissions"> | boolean
    projectId?: StringFilter<"ProjectPermissions"> | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ProjectPermissionsOrderByWithRelationInput = {
    id?: SortOrder
    private?: SortOrder
    allowedUsers?: SortOrder
    allowCollaborate?: SortOrder
    allowBranch?: SortOrder
    allowShare?: SortOrder
    projectId?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type ProjectPermissionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    projectId?: string
    AND?: ProjectPermissionsWhereInput | ProjectPermissionsWhereInput[]
    OR?: ProjectPermissionsWhereInput[]
    NOT?: ProjectPermissionsWhereInput | ProjectPermissionsWhereInput[]
    private?: BoolFilter<"ProjectPermissions"> | boolean
    allowedUsers?: JsonFilter<"ProjectPermissions">
    allowCollaborate?: BoolFilter<"ProjectPermissions"> | boolean
    allowBranch?: BoolFilter<"ProjectPermissions"> | boolean
    allowShare?: BoolFilter<"ProjectPermissions"> | boolean
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "id" | "projectId">

  export type ProjectPermissionsOrderByWithAggregationInput = {
    id?: SortOrder
    private?: SortOrder
    allowedUsers?: SortOrder
    allowCollaborate?: SortOrder
    allowBranch?: SortOrder
    allowShare?: SortOrder
    projectId?: SortOrder
    _count?: ProjectPermissionsCountOrderByAggregateInput
    _max?: ProjectPermissionsMaxOrderByAggregateInput
    _min?: ProjectPermissionsMinOrderByAggregateInput
  }

  export type ProjectPermissionsScalarWhereWithAggregatesInput = {
    AND?: ProjectPermissionsScalarWhereWithAggregatesInput | ProjectPermissionsScalarWhereWithAggregatesInput[]
    OR?: ProjectPermissionsScalarWhereWithAggregatesInput[]
    NOT?: ProjectPermissionsScalarWhereWithAggregatesInput | ProjectPermissionsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectPermissions"> | string
    private?: BoolWithAggregatesFilter<"ProjectPermissions"> | boolean
    allowedUsers?: JsonWithAggregatesFilter<"ProjectPermissions">
    allowCollaborate?: BoolWithAggregatesFilter<"ProjectPermissions"> | boolean
    allowBranch?: BoolWithAggregatesFilter<"ProjectPermissions"> | boolean
    allowShare?: BoolWithAggregatesFilter<"ProjectPermissions"> | boolean
    projectId?: StringWithAggregatesFilter<"ProjectPermissions"> | string
  }

  export type ProjectInteractionWhereInput = {
    AND?: ProjectInteractionWhereInput | ProjectInteractionWhereInput[]
    OR?: ProjectInteractionWhereInput[]
    NOT?: ProjectInteractionWhereInput | ProjectInteractionWhereInput[]
    id?: StringFilter<"ProjectInteraction"> | string
    type?: EnumInteractionTypeFilter<"ProjectInteraction"> | $Enums.InteractionType
    createdAt?: DateTimeFilter<"ProjectInteraction"> | Date | string
    projectId?: StringFilter<"ProjectInteraction"> | string
    userId?: StringFilter<"ProjectInteraction"> | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProjectInteractionOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
    project?: ProjectOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ProjectInteractionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectInteractionWhereInput | ProjectInteractionWhereInput[]
    OR?: ProjectInteractionWhereInput[]
    NOT?: ProjectInteractionWhereInput | ProjectInteractionWhereInput[]
    type?: EnumInteractionTypeFilter<"ProjectInteraction"> | $Enums.InteractionType
    createdAt?: DateTimeFilter<"ProjectInteraction"> | Date | string
    projectId?: StringFilter<"ProjectInteraction"> | string
    userId?: StringFilter<"ProjectInteraction"> | string
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ProjectInteractionOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
    _count?: ProjectInteractionCountOrderByAggregateInput
    _max?: ProjectInteractionMaxOrderByAggregateInput
    _min?: ProjectInteractionMinOrderByAggregateInput
  }

  export type ProjectInteractionScalarWhereWithAggregatesInput = {
    AND?: ProjectInteractionScalarWhereWithAggregatesInput | ProjectInteractionScalarWhereWithAggregatesInput[]
    OR?: ProjectInteractionScalarWhereWithAggregatesInput[]
    NOT?: ProjectInteractionScalarWhereWithAggregatesInput | ProjectInteractionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProjectInteraction"> | string
    type?: EnumInteractionTypeWithAggregatesFilter<"ProjectInteraction"> | $Enums.InteractionType
    createdAt?: DateTimeWithAggregatesFilter<"ProjectInteraction"> | Date | string
    projectId?: StringWithAggregatesFilter<"ProjectInteraction"> | string
    userId?: StringWithAggregatesFilter<"ProjectInteraction"> | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    follows?: FollowCreateNestedManyWithoutFollowedInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    branches?: BranchCreateNestedManyWithoutAuthorInput
    projects?: ProjectCreateNestedManyWithoutAuthorInput
    postInteractions?: PostInteractionCreateNestedManyWithoutUserInput
    branchInteractions?: BranchInteractionCreateNestedManyWithoutUserInput
    projectInteractions?: ProjectInteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    follows?: FollowUncheckedCreateNestedManyWithoutFollowedInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    branches?: BranchUncheckedCreateNestedManyWithoutAuthorInput
    projects?: ProjectUncheckedCreateNestedManyWithoutAuthorInput
    postInteractions?: PostInteractionUncheckedCreateNestedManyWithoutUserInput
    branchInteractions?: BranchInteractionUncheckedCreateNestedManyWithoutUserInput
    projectInteractions?: ProjectInteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    follows?: FollowUpdateManyWithoutFollowedNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    posts?: PostUpdateManyWithoutAuthorNestedInput
    branches?: BranchUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUpdateManyWithoutAuthorNestedInput
    postInteractions?: PostInteractionUpdateManyWithoutUserNestedInput
    branchInteractions?: BranchInteractionUpdateManyWithoutUserNestedInput
    projectInteractions?: ProjectInteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    follows?: FollowUncheckedUpdateManyWithoutFollowedNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    branches?: BranchUncheckedUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutAuthorNestedInput
    postInteractions?: PostInteractionUncheckedUpdateManyWithoutUserNestedInput
    branchInteractions?: BranchInteractionUncheckedUpdateManyWithoutUserNestedInput
    projectInteractions?: ProjectInteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateInput = {
    type: string
    provider: string
    providerAccountId: string
    refreshToken?: string | null
    accessToken?: string | null
    expiresAt?: number | null
    tokenType?: string | null
    scope?: string | null
    idToken?: string | null
    sessionState?: string | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refreshToken?: string | null
    accessToken?: string | null
    expiresAt?: number | null
    tokenType?: string | null
    scope?: string | null
    idToken?: string | null
    sessionState?: string | null
  }

  export type AccountUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableIntFieldUpdateOperationsInput | number | null
    tokenType?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    sessionState?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableIntFieldUpdateOperationsInput | number | null
    tokenType?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    sessionState?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateManyInput = {
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refreshToken?: string | null
    accessToken?: string | null
    expiresAt?: number | null
    tokenType?: string | null
    scope?: string | null
    idToken?: string | null
    sessionState?: string | null
  }

  export type AccountUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableIntFieldUpdateOperationsInput | number | null
    tokenType?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    sessionState?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableIntFieldUpdateOperationsInput | number | null
    tokenType?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    sessionState?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowCreateInput = {
    id?: string
    createdAt?: Date | string
    follower: UserCreateNestedOneWithoutFollowingInput
    followed: UserCreateNestedOneWithoutFollowsInput
  }

  export type FollowUncheckedCreateInput = {
    id?: string
    followerId: string
    followedId: string
    createdAt?: Date | string
  }

  export type FollowUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    follower?: UserUpdateOneRequiredWithoutFollowingNestedInput
    followed?: UserUpdateOneRequiredWithoutFollowsNestedInput
  }

  export type FollowUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    followerId?: StringFieldUpdateOperationsInput | string
    followedId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowCreateManyInput = {
    id?: string
    followerId: string
    followedId: string
    createdAt?: Date | string
  }

  export type FollowUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    followerId?: StringFieldUpdateOperationsInput | string
    followedId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCreateInput = {
    id?: string
    title: string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    branch: BranchCreateNestedOneWithoutPostsInput
    author: UserCreateNestedOneWithoutPostsInput
    media?: PostMediaCreateNestedManyWithoutPostInput
    interactions?: PostInteractionCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateInput = {
    id?: string
    title: string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    branchId: string
    authorId: string
    media?: PostMediaUncheckedCreateNestedManyWithoutPostInput
    interactions?: PostInteractionUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    branch?: BranchUpdateOneRequiredWithoutPostsNestedInput
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
    media?: PostMediaUpdateManyWithoutPostNestedInput
    interactions?: PostInteractionUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    branchId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    media?: PostMediaUncheckedUpdateManyWithoutPostNestedInput
    interactions?: PostInteractionUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostCreateManyInput = {
    id?: string
    title: string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    branchId: string
    authorId: string
  }

  export type PostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    branchId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type PostMediaCreateInput = {
    id?: string
    name: string
    url: string
    post: PostCreateNestedOneWithoutMediaInput
  }

  export type PostMediaUncheckedCreateInput = {
    id?: string
    name: string
    url: string
    postId: string
  }

  export type PostMediaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    post?: PostUpdateOneRequiredWithoutMediaNestedInput
  }

  export type PostMediaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
  }

  export type PostMediaCreateManyInput = {
    id?: string
    name: string
    url: string
    postId: string
  }

  export type PostMediaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type PostMediaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
  }

  export type PostInteractionCreateInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    post: PostCreateNestedOneWithoutInteractionsInput
    user: UserCreateNestedOneWithoutPostInteractionsInput
  }

  export type PostInteractionUncheckedCreateInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    postId: string
    userId: string
  }

  export type PostInteractionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutInteractionsNestedInput
    user?: UserUpdateOneRequiredWithoutPostInteractionsNestedInput
  }

  export type PostInteractionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PostInteractionCreateManyInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    postId: string
    userId: string
  }

  export type PostInteractionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostInteractionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type BranchCreateInput = {
    id?: string
    name: string
    description?: string | null
    default?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    author: UserCreateNestedOneWithoutBranchesInput
    project: ProjectCreateNestedOneWithoutBranchesInput
    permissions?: BranchPermissionsCreateNestedOneWithoutBranchInput
    interactions?: BranchInteractionCreateNestedManyWithoutBranchInput
    posts?: PostCreateNestedManyWithoutBranchInput
  }

  export type BranchUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    default?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    projectId: string
    authorId: string
    permissions?: BranchPermissionsUncheckedCreateNestedOneWithoutBranchInput
    interactions?: BranchInteractionUncheckedCreateNestedManyWithoutBranchInput
    posts?: PostUncheckedCreateNestedManyWithoutBranchInput
  }

  export type BranchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    default?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    author?: UserUpdateOneRequiredWithoutBranchesNestedInput
    project?: ProjectUpdateOneRequiredWithoutBranchesNestedInput
    permissions?: BranchPermissionsUpdateOneWithoutBranchNestedInput
    interactions?: BranchInteractionUpdateManyWithoutBranchNestedInput
    posts?: PostUpdateManyWithoutBranchNestedInput
  }

  export type BranchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    default?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    permissions?: BranchPermissionsUncheckedUpdateOneWithoutBranchNestedInput
    interactions?: BranchInteractionUncheckedUpdateManyWithoutBranchNestedInput
    posts?: PostUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type BranchCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    default?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    projectId: string
    authorId: string
  }

  export type BranchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    default?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BranchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    default?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type BranchPermissionsCreateInput = {
    id?: string
    private?: boolean
    allowedUsers?: JsonNullValueInput | InputJsonValue
    allowCollaborate?: boolean
    allowBranch?: boolean
    allowShare?: boolean
    branch: BranchCreateNestedOneWithoutPermissionsInput
  }

  export type BranchPermissionsUncheckedCreateInput = {
    id?: string
    private?: boolean
    allowedUsers?: JsonNullValueInput | InputJsonValue
    allowCollaborate?: boolean
    allowBranch?: boolean
    allowShare?: boolean
    branchId: string
  }

  export type BranchPermissionsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    private?: BoolFieldUpdateOperationsInput | boolean
    allowedUsers?: JsonNullValueInput | InputJsonValue
    allowCollaborate?: BoolFieldUpdateOperationsInput | boolean
    allowBranch?: BoolFieldUpdateOperationsInput | boolean
    allowShare?: BoolFieldUpdateOperationsInput | boolean
    branch?: BranchUpdateOneRequiredWithoutPermissionsNestedInput
  }

  export type BranchPermissionsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    private?: BoolFieldUpdateOperationsInput | boolean
    allowedUsers?: JsonNullValueInput | InputJsonValue
    allowCollaborate?: BoolFieldUpdateOperationsInput | boolean
    allowBranch?: BoolFieldUpdateOperationsInput | boolean
    allowShare?: BoolFieldUpdateOperationsInput | boolean
    branchId?: StringFieldUpdateOperationsInput | string
  }

  export type BranchPermissionsCreateManyInput = {
    id?: string
    private?: boolean
    allowedUsers?: JsonNullValueInput | InputJsonValue
    allowCollaborate?: boolean
    allowBranch?: boolean
    allowShare?: boolean
    branchId: string
  }

  export type BranchPermissionsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    private?: BoolFieldUpdateOperationsInput | boolean
    allowedUsers?: JsonNullValueInput | InputJsonValue
    allowCollaborate?: BoolFieldUpdateOperationsInput | boolean
    allowBranch?: BoolFieldUpdateOperationsInput | boolean
    allowShare?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BranchPermissionsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    private?: BoolFieldUpdateOperationsInput | boolean
    allowedUsers?: JsonNullValueInput | InputJsonValue
    allowCollaborate?: BoolFieldUpdateOperationsInput | boolean
    allowBranch?: BoolFieldUpdateOperationsInput | boolean
    allowShare?: BoolFieldUpdateOperationsInput | boolean
    branchId?: StringFieldUpdateOperationsInput | string
  }

  export type BranchInteractionCreateInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    branch: BranchCreateNestedOneWithoutInteractionsInput
    user: UserCreateNestedOneWithoutBranchInteractionsInput
  }

  export type BranchInteractionUncheckedCreateInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    branchId: string
    userId: string
  }

  export type BranchInteractionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    branch?: BranchUpdateOneRequiredWithoutInteractionsNestedInput
    user?: UserUpdateOneRequiredWithoutBranchInteractionsNestedInput
  }

  export type BranchInteractionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    branchId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type BranchInteractionCreateManyInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    branchId: string
    userId: string
  }

  export type BranchInteractionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BranchInteractionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    branchId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectCreateInput = {
    id?: string
    picture?: string | null
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    author: UserCreateNestedOneWithoutProjectsInput
    permissions?: ProjectPermissionsCreateNestedOneWithoutProjectInput
    interactions?: ProjectInteractionCreateNestedManyWithoutProjectInput
    branches?: BranchCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    picture?: string | null
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    authorId: string
    permissions?: ProjectPermissionsUncheckedCreateNestedOneWithoutProjectInput
    interactions?: ProjectInteractionUncheckedCreateNestedManyWithoutProjectInput
    branches?: BranchUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    author?: UserUpdateOneRequiredWithoutProjectsNestedInput
    permissions?: ProjectPermissionsUpdateOneWithoutProjectNestedInput
    interactions?: ProjectInteractionUpdateManyWithoutProjectNestedInput
    branches?: BranchUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authorId?: StringFieldUpdateOperationsInput | string
    permissions?: ProjectPermissionsUncheckedUpdateOneWithoutProjectNestedInput
    interactions?: ProjectInteractionUncheckedUpdateManyWithoutProjectNestedInput
    branches?: BranchUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    picture?: string | null
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    authorId: string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectPermissionsCreateInput = {
    id?: string
    private?: boolean
    allowedUsers?: JsonNullValueInput | InputJsonValue
    allowCollaborate?: boolean
    allowBranch?: boolean
    allowShare?: boolean
    project: ProjectCreateNestedOneWithoutPermissionsInput
  }

  export type ProjectPermissionsUncheckedCreateInput = {
    id?: string
    private?: boolean
    allowedUsers?: JsonNullValueInput | InputJsonValue
    allowCollaborate?: boolean
    allowBranch?: boolean
    allowShare?: boolean
    projectId: string
  }

  export type ProjectPermissionsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    private?: BoolFieldUpdateOperationsInput | boolean
    allowedUsers?: JsonNullValueInput | InputJsonValue
    allowCollaborate?: BoolFieldUpdateOperationsInput | boolean
    allowBranch?: BoolFieldUpdateOperationsInput | boolean
    allowShare?: BoolFieldUpdateOperationsInput | boolean
    project?: ProjectUpdateOneRequiredWithoutPermissionsNestedInput
  }

  export type ProjectPermissionsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    private?: BoolFieldUpdateOperationsInput | boolean
    allowedUsers?: JsonNullValueInput | InputJsonValue
    allowCollaborate?: BoolFieldUpdateOperationsInput | boolean
    allowBranch?: BoolFieldUpdateOperationsInput | boolean
    allowShare?: BoolFieldUpdateOperationsInput | boolean
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectPermissionsCreateManyInput = {
    id?: string
    private?: boolean
    allowedUsers?: JsonNullValueInput | InputJsonValue
    allowCollaborate?: boolean
    allowBranch?: boolean
    allowShare?: boolean
    projectId: string
  }

  export type ProjectPermissionsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    private?: BoolFieldUpdateOperationsInput | boolean
    allowedUsers?: JsonNullValueInput | InputJsonValue
    allowCollaborate?: BoolFieldUpdateOperationsInput | boolean
    allowBranch?: BoolFieldUpdateOperationsInput | boolean
    allowShare?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProjectPermissionsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    private?: BoolFieldUpdateOperationsInput | boolean
    allowedUsers?: JsonNullValueInput | InputJsonValue
    allowCollaborate?: BoolFieldUpdateOperationsInput | boolean
    allowBranch?: BoolFieldUpdateOperationsInput | boolean
    allowShare?: BoolFieldUpdateOperationsInput | boolean
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectInteractionCreateInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutInteractionsInput
    user: UserCreateNestedOneWithoutProjectInteractionsInput
  }

  export type ProjectInteractionUncheckedCreateInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    projectId: string
    userId: string
  }

  export type ProjectInteractionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutInteractionsNestedInput
    user?: UserUpdateOneRequiredWithoutProjectInteractionsNestedInput
  }

  export type ProjectInteractionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectInteractionCreateManyInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    projectId: string
    userId: string
  }

  export type ProjectInteractionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectInteractionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type FollowListRelationFilter = {
    every?: FollowWhereInput
    some?: FollowWhereInput
    none?: FollowWhereInput
  }

  export type PostListRelationFilter = {
    every?: PostWhereInput
    some?: PostWhereInput
    none?: PostWhereInput
  }

  export type BranchListRelationFilter = {
    every?: BranchWhereInput
    some?: BranchWhereInput
    none?: BranchWhereInput
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type PostInteractionListRelationFilter = {
    every?: PostInteractionWhereInput
    some?: PostInteractionWhereInput
    none?: PostInteractionWhereInput
  }

  export type BranchInteractionListRelationFilter = {
    every?: BranchInteractionWhereInput
    some?: BranchInteractionWhereInput
    none?: BranchInteractionWhereInput
  }

  export type ProjectInteractionListRelationFilter = {
    every?: ProjectInteractionWhereInput
    some?: ProjectInteractionWhereInput
    none?: ProjectInteractionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FollowOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BranchOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostInteractionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BranchInteractionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectInteractionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refreshToken?: SortOrder
    accessToken?: SortOrder
    expiresAt?: SortOrder
    tokenType?: SortOrder
    scope?: SortOrder
    idToken?: SortOrder
    sessionState?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expiresAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refreshToken?: SortOrder
    accessToken?: SortOrder
    expiresAt?: SortOrder
    tokenType?: SortOrder
    scope?: SortOrder
    idToken?: SortOrder
    sessionState?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refreshToken?: SortOrder
    accessToken?: SortOrder
    expiresAt?: SortOrder
    tokenType?: SortOrder
    scope?: SortOrder
    idToken?: SortOrder
    sessionState?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expiresAt?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SessionCountOrderByAggregateInput = {
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type FollowCountOrderByAggregateInput = {
    id?: SortOrder
    followerId?: SortOrder
    followedId?: SortOrder
    createdAt?: SortOrder
  }

  export type FollowMaxOrderByAggregateInput = {
    id?: SortOrder
    followerId?: SortOrder
    followedId?: SortOrder
    createdAt?: SortOrder
  }

  export type FollowMinOrderByAggregateInput = {
    id?: SortOrder
    followerId?: SortOrder
    followedId?: SortOrder
    createdAt?: SortOrder
  }

  export type BranchScalarRelationFilter = {
    is?: BranchWhereInput
    isNot?: BranchWhereInput
  }

  export type PostMediaListRelationFilter = {
    every?: PostMediaWhereInput
    some?: PostMediaWhereInput
    none?: PostMediaWhereInput
  }

  export type PostMediaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    branchId?: SortOrder
    authorId?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    branchId?: SortOrder
    authorId?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    branchId?: SortOrder
    authorId?: SortOrder
  }

  export type PostScalarRelationFilter = {
    is?: PostWhereInput
    isNot?: PostWhereInput
  }

  export type PostMediaCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    postId?: SortOrder
  }

  export type PostMediaMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    postId?: SortOrder
  }

  export type PostMediaMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    postId?: SortOrder
  }

  export type EnumInteractionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.InteractionType | EnumInteractionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InteractionType[] | ListEnumInteractionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InteractionType[] | ListEnumInteractionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInteractionTypeFilter<$PrismaModel> | $Enums.InteractionType
  }

  export type PostInteractionCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    postId?: SortOrder
    userId?: SortOrder
  }

  export type PostInteractionMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    postId?: SortOrder
    userId?: SortOrder
  }

  export type PostInteractionMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    postId?: SortOrder
    userId?: SortOrder
  }

  export type EnumInteractionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InteractionType | EnumInteractionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InteractionType[] | ListEnumInteractionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InteractionType[] | ListEnumInteractionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInteractionTypeWithAggregatesFilter<$PrismaModel> | $Enums.InteractionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInteractionTypeFilter<$PrismaModel>
    _max?: NestedEnumInteractionTypeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type BranchPermissionsNullableScalarRelationFilter = {
    is?: BranchPermissionsWhereInput | null
    isNot?: BranchPermissionsWhereInput | null
  }

  export type BranchCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    default?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
    authorId?: SortOrder
  }

  export type BranchMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    default?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
    authorId?: SortOrder
  }

  export type BranchMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    default?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
    authorId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BranchPermissionsCountOrderByAggregateInput = {
    id?: SortOrder
    private?: SortOrder
    allowedUsers?: SortOrder
    allowCollaborate?: SortOrder
    allowBranch?: SortOrder
    allowShare?: SortOrder
    branchId?: SortOrder
  }

  export type BranchPermissionsMaxOrderByAggregateInput = {
    id?: SortOrder
    private?: SortOrder
    allowCollaborate?: SortOrder
    allowBranch?: SortOrder
    allowShare?: SortOrder
    branchId?: SortOrder
  }

  export type BranchPermissionsMinOrderByAggregateInput = {
    id?: SortOrder
    private?: SortOrder
    allowCollaborate?: SortOrder
    allowBranch?: SortOrder
    allowShare?: SortOrder
    branchId?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BranchInteractionCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    branchId?: SortOrder
    userId?: SortOrder
  }

  export type BranchInteractionMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    branchId?: SortOrder
    userId?: SortOrder
  }

  export type BranchInteractionMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    branchId?: SortOrder
    userId?: SortOrder
  }

  export type ProjectPermissionsNullableScalarRelationFilter = {
    is?: ProjectPermissionsWhereInput | null
    isNot?: ProjectPermissionsWhereInput | null
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    picture?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    picture?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    picture?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
  }

  export type ProjectPermissionsCountOrderByAggregateInput = {
    id?: SortOrder
    private?: SortOrder
    allowedUsers?: SortOrder
    allowCollaborate?: SortOrder
    allowBranch?: SortOrder
    allowShare?: SortOrder
    projectId?: SortOrder
  }

  export type ProjectPermissionsMaxOrderByAggregateInput = {
    id?: SortOrder
    private?: SortOrder
    allowCollaborate?: SortOrder
    allowBranch?: SortOrder
    allowShare?: SortOrder
    projectId?: SortOrder
  }

  export type ProjectPermissionsMinOrderByAggregateInput = {
    id?: SortOrder
    private?: SortOrder
    allowCollaborate?: SortOrder
    allowBranch?: SortOrder
    allowShare?: SortOrder
    projectId?: SortOrder
  }

  export type ProjectInteractionCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
  }

  export type ProjectInteractionMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
  }

  export type ProjectInteractionMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    projectId?: SortOrder
    userId?: SortOrder
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type FollowCreateNestedManyWithoutFollowedInput = {
    create?: XOR<FollowCreateWithoutFollowedInput, FollowUncheckedCreateWithoutFollowedInput> | FollowCreateWithoutFollowedInput[] | FollowUncheckedCreateWithoutFollowedInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowedInput | FollowCreateOrConnectWithoutFollowedInput[]
    createMany?: FollowCreateManyFollowedInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type FollowCreateNestedManyWithoutFollowerInput = {
    create?: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput> | FollowCreateWithoutFollowerInput[] | FollowUncheckedCreateWithoutFollowerInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowerInput | FollowCreateOrConnectWithoutFollowerInput[]
    createMany?: FollowCreateManyFollowerInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type PostCreateNestedManyWithoutAuthorInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type BranchCreateNestedManyWithoutAuthorInput = {
    create?: XOR<BranchCreateWithoutAuthorInput, BranchUncheckedCreateWithoutAuthorInput> | BranchCreateWithoutAuthorInput[] | BranchUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: BranchCreateOrConnectWithoutAuthorInput | BranchCreateOrConnectWithoutAuthorInput[]
    createMany?: BranchCreateManyAuthorInputEnvelope
    connect?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
  }

  export type ProjectCreateNestedManyWithoutAuthorInput = {
    create?: XOR<ProjectCreateWithoutAuthorInput, ProjectUncheckedCreateWithoutAuthorInput> | ProjectCreateWithoutAuthorInput[] | ProjectUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutAuthorInput | ProjectCreateOrConnectWithoutAuthorInput[]
    createMany?: ProjectCreateManyAuthorInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type PostInteractionCreateNestedManyWithoutUserInput = {
    create?: XOR<PostInteractionCreateWithoutUserInput, PostInteractionUncheckedCreateWithoutUserInput> | PostInteractionCreateWithoutUserInput[] | PostInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostInteractionCreateOrConnectWithoutUserInput | PostInteractionCreateOrConnectWithoutUserInput[]
    createMany?: PostInteractionCreateManyUserInputEnvelope
    connect?: PostInteractionWhereUniqueInput | PostInteractionWhereUniqueInput[]
  }

  export type BranchInteractionCreateNestedManyWithoutUserInput = {
    create?: XOR<BranchInteractionCreateWithoutUserInput, BranchInteractionUncheckedCreateWithoutUserInput> | BranchInteractionCreateWithoutUserInput[] | BranchInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BranchInteractionCreateOrConnectWithoutUserInput | BranchInteractionCreateOrConnectWithoutUserInput[]
    createMany?: BranchInteractionCreateManyUserInputEnvelope
    connect?: BranchInteractionWhereUniqueInput | BranchInteractionWhereUniqueInput[]
  }

  export type ProjectInteractionCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectInteractionCreateWithoutUserInput, ProjectInteractionUncheckedCreateWithoutUserInput> | ProjectInteractionCreateWithoutUserInput[] | ProjectInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectInteractionCreateOrConnectWithoutUserInput | ProjectInteractionCreateOrConnectWithoutUserInput[]
    createMany?: ProjectInteractionCreateManyUserInputEnvelope
    connect?: ProjectInteractionWhereUniqueInput | ProjectInteractionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type FollowUncheckedCreateNestedManyWithoutFollowedInput = {
    create?: XOR<FollowCreateWithoutFollowedInput, FollowUncheckedCreateWithoutFollowedInput> | FollowCreateWithoutFollowedInput[] | FollowUncheckedCreateWithoutFollowedInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowedInput | FollowCreateOrConnectWithoutFollowedInput[]
    createMany?: FollowCreateManyFollowedInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type FollowUncheckedCreateNestedManyWithoutFollowerInput = {
    create?: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput> | FollowCreateWithoutFollowerInput[] | FollowUncheckedCreateWithoutFollowerInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowerInput | FollowCreateOrConnectWithoutFollowerInput[]
    createMany?: FollowCreateManyFollowerInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type PostUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type BranchUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<BranchCreateWithoutAuthorInput, BranchUncheckedCreateWithoutAuthorInput> | BranchCreateWithoutAuthorInput[] | BranchUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: BranchCreateOrConnectWithoutAuthorInput | BranchCreateOrConnectWithoutAuthorInput[]
    createMany?: BranchCreateManyAuthorInputEnvelope
    connect?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<ProjectCreateWithoutAuthorInput, ProjectUncheckedCreateWithoutAuthorInput> | ProjectCreateWithoutAuthorInput[] | ProjectUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutAuthorInput | ProjectCreateOrConnectWithoutAuthorInput[]
    createMany?: ProjectCreateManyAuthorInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type PostInteractionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PostInteractionCreateWithoutUserInput, PostInteractionUncheckedCreateWithoutUserInput> | PostInteractionCreateWithoutUserInput[] | PostInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostInteractionCreateOrConnectWithoutUserInput | PostInteractionCreateOrConnectWithoutUserInput[]
    createMany?: PostInteractionCreateManyUserInputEnvelope
    connect?: PostInteractionWhereUniqueInput | PostInteractionWhereUniqueInput[]
  }

  export type BranchInteractionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BranchInteractionCreateWithoutUserInput, BranchInteractionUncheckedCreateWithoutUserInput> | BranchInteractionCreateWithoutUserInput[] | BranchInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BranchInteractionCreateOrConnectWithoutUserInput | BranchInteractionCreateOrConnectWithoutUserInput[]
    createMany?: BranchInteractionCreateManyUserInputEnvelope
    connect?: BranchInteractionWhereUniqueInput | BranchInteractionWhereUniqueInput[]
  }

  export type ProjectInteractionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectInteractionCreateWithoutUserInput, ProjectInteractionUncheckedCreateWithoutUserInput> | ProjectInteractionCreateWithoutUserInput[] | ProjectInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectInteractionCreateOrConnectWithoutUserInput | ProjectInteractionCreateOrConnectWithoutUserInput[]
    createMany?: ProjectInteractionCreateManyUserInputEnvelope
    connect?: ProjectInteractionWhereUniqueInput | ProjectInteractionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type FollowUpdateManyWithoutFollowedNestedInput = {
    create?: XOR<FollowCreateWithoutFollowedInput, FollowUncheckedCreateWithoutFollowedInput> | FollowCreateWithoutFollowedInput[] | FollowUncheckedCreateWithoutFollowedInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowedInput | FollowCreateOrConnectWithoutFollowedInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowedInput | FollowUpsertWithWhereUniqueWithoutFollowedInput[]
    createMany?: FollowCreateManyFollowedInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutFollowedInput | FollowUpdateWithWhereUniqueWithoutFollowedInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutFollowedInput | FollowUpdateManyWithWhereWithoutFollowedInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type FollowUpdateManyWithoutFollowerNestedInput = {
    create?: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput> | FollowCreateWithoutFollowerInput[] | FollowUncheckedCreateWithoutFollowerInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowerInput | FollowCreateOrConnectWithoutFollowerInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowerInput | FollowUpsertWithWhereUniqueWithoutFollowerInput[]
    createMany?: FollowCreateManyFollowerInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutFollowerInput | FollowUpdateWithWhereUniqueWithoutFollowerInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutFollowerInput | FollowUpdateManyWithWhereWithoutFollowerInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type PostUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutAuthorInput | PostUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutAuthorInput | PostUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: PostUpdateManyWithWhereWithoutAuthorInput | PostUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type BranchUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<BranchCreateWithoutAuthorInput, BranchUncheckedCreateWithoutAuthorInput> | BranchCreateWithoutAuthorInput[] | BranchUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: BranchCreateOrConnectWithoutAuthorInput | BranchCreateOrConnectWithoutAuthorInput[]
    upsert?: BranchUpsertWithWhereUniqueWithoutAuthorInput | BranchUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: BranchCreateManyAuthorInputEnvelope
    set?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    disconnect?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    delete?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    connect?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    update?: BranchUpdateWithWhereUniqueWithoutAuthorInput | BranchUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: BranchUpdateManyWithWhereWithoutAuthorInput | BranchUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: BranchScalarWhereInput | BranchScalarWhereInput[]
  }

  export type ProjectUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<ProjectCreateWithoutAuthorInput, ProjectUncheckedCreateWithoutAuthorInput> | ProjectCreateWithoutAuthorInput[] | ProjectUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutAuthorInput | ProjectCreateOrConnectWithoutAuthorInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutAuthorInput | ProjectUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: ProjectCreateManyAuthorInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutAuthorInput | ProjectUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutAuthorInput | ProjectUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type PostInteractionUpdateManyWithoutUserNestedInput = {
    create?: XOR<PostInteractionCreateWithoutUserInput, PostInteractionUncheckedCreateWithoutUserInput> | PostInteractionCreateWithoutUserInput[] | PostInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostInteractionCreateOrConnectWithoutUserInput | PostInteractionCreateOrConnectWithoutUserInput[]
    upsert?: PostInteractionUpsertWithWhereUniqueWithoutUserInput | PostInteractionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PostInteractionCreateManyUserInputEnvelope
    set?: PostInteractionWhereUniqueInput | PostInteractionWhereUniqueInput[]
    disconnect?: PostInteractionWhereUniqueInput | PostInteractionWhereUniqueInput[]
    delete?: PostInteractionWhereUniqueInput | PostInteractionWhereUniqueInput[]
    connect?: PostInteractionWhereUniqueInput | PostInteractionWhereUniqueInput[]
    update?: PostInteractionUpdateWithWhereUniqueWithoutUserInput | PostInteractionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PostInteractionUpdateManyWithWhereWithoutUserInput | PostInteractionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PostInteractionScalarWhereInput | PostInteractionScalarWhereInput[]
  }

  export type BranchInteractionUpdateManyWithoutUserNestedInput = {
    create?: XOR<BranchInteractionCreateWithoutUserInput, BranchInteractionUncheckedCreateWithoutUserInput> | BranchInteractionCreateWithoutUserInput[] | BranchInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BranchInteractionCreateOrConnectWithoutUserInput | BranchInteractionCreateOrConnectWithoutUserInput[]
    upsert?: BranchInteractionUpsertWithWhereUniqueWithoutUserInput | BranchInteractionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BranchInteractionCreateManyUserInputEnvelope
    set?: BranchInteractionWhereUniqueInput | BranchInteractionWhereUniqueInput[]
    disconnect?: BranchInteractionWhereUniqueInput | BranchInteractionWhereUniqueInput[]
    delete?: BranchInteractionWhereUniqueInput | BranchInteractionWhereUniqueInput[]
    connect?: BranchInteractionWhereUniqueInput | BranchInteractionWhereUniqueInput[]
    update?: BranchInteractionUpdateWithWhereUniqueWithoutUserInput | BranchInteractionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BranchInteractionUpdateManyWithWhereWithoutUserInput | BranchInteractionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BranchInteractionScalarWhereInput | BranchInteractionScalarWhereInput[]
  }

  export type ProjectInteractionUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectInteractionCreateWithoutUserInput, ProjectInteractionUncheckedCreateWithoutUserInput> | ProjectInteractionCreateWithoutUserInput[] | ProjectInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectInteractionCreateOrConnectWithoutUserInput | ProjectInteractionCreateOrConnectWithoutUserInput[]
    upsert?: ProjectInteractionUpsertWithWhereUniqueWithoutUserInput | ProjectInteractionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectInteractionCreateManyUserInputEnvelope
    set?: ProjectInteractionWhereUniqueInput | ProjectInteractionWhereUniqueInput[]
    disconnect?: ProjectInteractionWhereUniqueInput | ProjectInteractionWhereUniqueInput[]
    delete?: ProjectInteractionWhereUniqueInput | ProjectInteractionWhereUniqueInput[]
    connect?: ProjectInteractionWhereUniqueInput | ProjectInteractionWhereUniqueInput[]
    update?: ProjectInteractionUpdateWithWhereUniqueWithoutUserInput | ProjectInteractionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectInteractionUpdateManyWithWhereWithoutUserInput | ProjectInteractionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectInteractionScalarWhereInput | ProjectInteractionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type FollowUncheckedUpdateManyWithoutFollowedNestedInput = {
    create?: XOR<FollowCreateWithoutFollowedInput, FollowUncheckedCreateWithoutFollowedInput> | FollowCreateWithoutFollowedInput[] | FollowUncheckedCreateWithoutFollowedInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowedInput | FollowCreateOrConnectWithoutFollowedInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowedInput | FollowUpsertWithWhereUniqueWithoutFollowedInput[]
    createMany?: FollowCreateManyFollowedInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutFollowedInput | FollowUpdateWithWhereUniqueWithoutFollowedInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutFollowedInput | FollowUpdateManyWithWhereWithoutFollowedInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type FollowUncheckedUpdateManyWithoutFollowerNestedInput = {
    create?: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput> | FollowCreateWithoutFollowerInput[] | FollowUncheckedCreateWithoutFollowerInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowerInput | FollowCreateOrConnectWithoutFollowerInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowerInput | FollowUpsertWithWhereUniqueWithoutFollowerInput[]
    createMany?: FollowCreateManyFollowerInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutFollowerInput | FollowUpdateWithWhereUniqueWithoutFollowerInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutFollowerInput | FollowUpdateManyWithWhereWithoutFollowerInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type PostUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutAuthorInput | PostUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutAuthorInput | PostUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: PostUpdateManyWithWhereWithoutAuthorInput | PostUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type BranchUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<BranchCreateWithoutAuthorInput, BranchUncheckedCreateWithoutAuthorInput> | BranchCreateWithoutAuthorInput[] | BranchUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: BranchCreateOrConnectWithoutAuthorInput | BranchCreateOrConnectWithoutAuthorInput[]
    upsert?: BranchUpsertWithWhereUniqueWithoutAuthorInput | BranchUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: BranchCreateManyAuthorInputEnvelope
    set?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    disconnect?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    delete?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    connect?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    update?: BranchUpdateWithWhereUniqueWithoutAuthorInput | BranchUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: BranchUpdateManyWithWhereWithoutAuthorInput | BranchUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: BranchScalarWhereInput | BranchScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<ProjectCreateWithoutAuthorInput, ProjectUncheckedCreateWithoutAuthorInput> | ProjectCreateWithoutAuthorInput[] | ProjectUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutAuthorInput | ProjectCreateOrConnectWithoutAuthorInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutAuthorInput | ProjectUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: ProjectCreateManyAuthorInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutAuthorInput | ProjectUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutAuthorInput | ProjectUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type PostInteractionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PostInteractionCreateWithoutUserInput, PostInteractionUncheckedCreateWithoutUserInput> | PostInteractionCreateWithoutUserInput[] | PostInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostInteractionCreateOrConnectWithoutUserInput | PostInteractionCreateOrConnectWithoutUserInput[]
    upsert?: PostInteractionUpsertWithWhereUniqueWithoutUserInput | PostInteractionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PostInteractionCreateManyUserInputEnvelope
    set?: PostInteractionWhereUniqueInput | PostInteractionWhereUniqueInput[]
    disconnect?: PostInteractionWhereUniqueInput | PostInteractionWhereUniqueInput[]
    delete?: PostInteractionWhereUniqueInput | PostInteractionWhereUniqueInput[]
    connect?: PostInteractionWhereUniqueInput | PostInteractionWhereUniqueInput[]
    update?: PostInteractionUpdateWithWhereUniqueWithoutUserInput | PostInteractionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PostInteractionUpdateManyWithWhereWithoutUserInput | PostInteractionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PostInteractionScalarWhereInput | PostInteractionScalarWhereInput[]
  }

  export type BranchInteractionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BranchInteractionCreateWithoutUserInput, BranchInteractionUncheckedCreateWithoutUserInput> | BranchInteractionCreateWithoutUserInput[] | BranchInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BranchInteractionCreateOrConnectWithoutUserInput | BranchInteractionCreateOrConnectWithoutUserInput[]
    upsert?: BranchInteractionUpsertWithWhereUniqueWithoutUserInput | BranchInteractionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BranchInteractionCreateManyUserInputEnvelope
    set?: BranchInteractionWhereUniqueInput | BranchInteractionWhereUniqueInput[]
    disconnect?: BranchInteractionWhereUniqueInput | BranchInteractionWhereUniqueInput[]
    delete?: BranchInteractionWhereUniqueInput | BranchInteractionWhereUniqueInput[]
    connect?: BranchInteractionWhereUniqueInput | BranchInteractionWhereUniqueInput[]
    update?: BranchInteractionUpdateWithWhereUniqueWithoutUserInput | BranchInteractionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BranchInteractionUpdateManyWithWhereWithoutUserInput | BranchInteractionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BranchInteractionScalarWhereInput | BranchInteractionScalarWhereInput[]
  }

  export type ProjectInteractionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectInteractionCreateWithoutUserInput, ProjectInteractionUncheckedCreateWithoutUserInput> | ProjectInteractionCreateWithoutUserInput[] | ProjectInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectInteractionCreateOrConnectWithoutUserInput | ProjectInteractionCreateOrConnectWithoutUserInput[]
    upsert?: ProjectInteractionUpsertWithWhereUniqueWithoutUserInput | ProjectInteractionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectInteractionCreateManyUserInputEnvelope
    set?: ProjectInteractionWhereUniqueInput | ProjectInteractionWhereUniqueInput[]
    disconnect?: ProjectInteractionWhereUniqueInput | ProjectInteractionWhereUniqueInput[]
    delete?: ProjectInteractionWhereUniqueInput | ProjectInteractionWhereUniqueInput[]
    connect?: ProjectInteractionWhereUniqueInput | ProjectInteractionWhereUniqueInput[]
    update?: ProjectInteractionUpdateWithWhereUniqueWithoutUserInput | ProjectInteractionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectInteractionUpdateManyWithWhereWithoutUserInput | ProjectInteractionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectInteractionScalarWhereInput | ProjectInteractionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutFollowingInput = {
    create?: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowingInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFollowsInput = {
    create?: XOR<UserCreateWithoutFollowsInput, UserUncheckedCreateWithoutFollowsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFollowingNestedInput = {
    create?: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowingInput
    upsert?: UserUpsertWithoutFollowingInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFollowingInput, UserUpdateWithoutFollowingInput>, UserUncheckedUpdateWithoutFollowingInput>
  }

  export type UserUpdateOneRequiredWithoutFollowsNestedInput = {
    create?: XOR<UserCreateWithoutFollowsInput, UserUncheckedCreateWithoutFollowsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowsInput
    upsert?: UserUpsertWithoutFollowsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFollowsInput, UserUpdateWithoutFollowsInput>, UserUncheckedUpdateWithoutFollowsInput>
  }

  export type BranchCreateNestedOneWithoutPostsInput = {
    create?: XOR<BranchCreateWithoutPostsInput, BranchUncheckedCreateWithoutPostsInput>
    connectOrCreate?: BranchCreateOrConnectWithoutPostsInput
    connect?: BranchWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPostsInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    connect?: UserWhereUniqueInput
  }

  export type PostMediaCreateNestedManyWithoutPostInput = {
    create?: XOR<PostMediaCreateWithoutPostInput, PostMediaUncheckedCreateWithoutPostInput> | PostMediaCreateWithoutPostInput[] | PostMediaUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostMediaCreateOrConnectWithoutPostInput | PostMediaCreateOrConnectWithoutPostInput[]
    createMany?: PostMediaCreateManyPostInputEnvelope
    connect?: PostMediaWhereUniqueInput | PostMediaWhereUniqueInput[]
  }

  export type PostInteractionCreateNestedManyWithoutPostInput = {
    create?: XOR<PostInteractionCreateWithoutPostInput, PostInteractionUncheckedCreateWithoutPostInput> | PostInteractionCreateWithoutPostInput[] | PostInteractionUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostInteractionCreateOrConnectWithoutPostInput | PostInteractionCreateOrConnectWithoutPostInput[]
    createMany?: PostInteractionCreateManyPostInputEnvelope
    connect?: PostInteractionWhereUniqueInput | PostInteractionWhereUniqueInput[]
  }

  export type PostMediaUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<PostMediaCreateWithoutPostInput, PostMediaUncheckedCreateWithoutPostInput> | PostMediaCreateWithoutPostInput[] | PostMediaUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostMediaCreateOrConnectWithoutPostInput | PostMediaCreateOrConnectWithoutPostInput[]
    createMany?: PostMediaCreateManyPostInputEnvelope
    connect?: PostMediaWhereUniqueInput | PostMediaWhereUniqueInput[]
  }

  export type PostInteractionUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<PostInteractionCreateWithoutPostInput, PostInteractionUncheckedCreateWithoutPostInput> | PostInteractionCreateWithoutPostInput[] | PostInteractionUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostInteractionCreateOrConnectWithoutPostInput | PostInteractionCreateOrConnectWithoutPostInput[]
    createMany?: PostInteractionCreateManyPostInputEnvelope
    connect?: PostInteractionWhereUniqueInput | PostInteractionWhereUniqueInput[]
  }

  export type BranchUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<BranchCreateWithoutPostsInput, BranchUncheckedCreateWithoutPostsInput>
    connectOrCreate?: BranchCreateOrConnectWithoutPostsInput
    upsert?: BranchUpsertWithoutPostsInput
    connect?: BranchWhereUniqueInput
    update?: XOR<XOR<BranchUpdateToOneWithWhereWithoutPostsInput, BranchUpdateWithoutPostsInput>, BranchUncheckedUpdateWithoutPostsInput>
  }

  export type UserUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    upsert?: UserUpsertWithoutPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPostsInput, UserUpdateWithoutPostsInput>, UserUncheckedUpdateWithoutPostsInput>
  }

  export type PostMediaUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostMediaCreateWithoutPostInput, PostMediaUncheckedCreateWithoutPostInput> | PostMediaCreateWithoutPostInput[] | PostMediaUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostMediaCreateOrConnectWithoutPostInput | PostMediaCreateOrConnectWithoutPostInput[]
    upsert?: PostMediaUpsertWithWhereUniqueWithoutPostInput | PostMediaUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostMediaCreateManyPostInputEnvelope
    set?: PostMediaWhereUniqueInput | PostMediaWhereUniqueInput[]
    disconnect?: PostMediaWhereUniqueInput | PostMediaWhereUniqueInput[]
    delete?: PostMediaWhereUniqueInput | PostMediaWhereUniqueInput[]
    connect?: PostMediaWhereUniqueInput | PostMediaWhereUniqueInput[]
    update?: PostMediaUpdateWithWhereUniqueWithoutPostInput | PostMediaUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostMediaUpdateManyWithWhereWithoutPostInput | PostMediaUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostMediaScalarWhereInput | PostMediaScalarWhereInput[]
  }

  export type PostInteractionUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostInteractionCreateWithoutPostInput, PostInteractionUncheckedCreateWithoutPostInput> | PostInteractionCreateWithoutPostInput[] | PostInteractionUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostInteractionCreateOrConnectWithoutPostInput | PostInteractionCreateOrConnectWithoutPostInput[]
    upsert?: PostInteractionUpsertWithWhereUniqueWithoutPostInput | PostInteractionUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostInteractionCreateManyPostInputEnvelope
    set?: PostInteractionWhereUniqueInput | PostInteractionWhereUniqueInput[]
    disconnect?: PostInteractionWhereUniqueInput | PostInteractionWhereUniqueInput[]
    delete?: PostInteractionWhereUniqueInput | PostInteractionWhereUniqueInput[]
    connect?: PostInteractionWhereUniqueInput | PostInteractionWhereUniqueInput[]
    update?: PostInteractionUpdateWithWhereUniqueWithoutPostInput | PostInteractionUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostInteractionUpdateManyWithWhereWithoutPostInput | PostInteractionUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostInteractionScalarWhereInput | PostInteractionScalarWhereInput[]
  }

  export type PostMediaUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostMediaCreateWithoutPostInput, PostMediaUncheckedCreateWithoutPostInput> | PostMediaCreateWithoutPostInput[] | PostMediaUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostMediaCreateOrConnectWithoutPostInput | PostMediaCreateOrConnectWithoutPostInput[]
    upsert?: PostMediaUpsertWithWhereUniqueWithoutPostInput | PostMediaUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostMediaCreateManyPostInputEnvelope
    set?: PostMediaWhereUniqueInput | PostMediaWhereUniqueInput[]
    disconnect?: PostMediaWhereUniqueInput | PostMediaWhereUniqueInput[]
    delete?: PostMediaWhereUniqueInput | PostMediaWhereUniqueInput[]
    connect?: PostMediaWhereUniqueInput | PostMediaWhereUniqueInput[]
    update?: PostMediaUpdateWithWhereUniqueWithoutPostInput | PostMediaUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostMediaUpdateManyWithWhereWithoutPostInput | PostMediaUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostMediaScalarWhereInput | PostMediaScalarWhereInput[]
  }

  export type PostInteractionUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostInteractionCreateWithoutPostInput, PostInteractionUncheckedCreateWithoutPostInput> | PostInteractionCreateWithoutPostInput[] | PostInteractionUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostInteractionCreateOrConnectWithoutPostInput | PostInteractionCreateOrConnectWithoutPostInput[]
    upsert?: PostInteractionUpsertWithWhereUniqueWithoutPostInput | PostInteractionUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostInteractionCreateManyPostInputEnvelope
    set?: PostInteractionWhereUniqueInput | PostInteractionWhereUniqueInput[]
    disconnect?: PostInteractionWhereUniqueInput | PostInteractionWhereUniqueInput[]
    delete?: PostInteractionWhereUniqueInput | PostInteractionWhereUniqueInput[]
    connect?: PostInteractionWhereUniqueInput | PostInteractionWhereUniqueInput[]
    update?: PostInteractionUpdateWithWhereUniqueWithoutPostInput | PostInteractionUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostInteractionUpdateManyWithWhereWithoutPostInput | PostInteractionUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostInteractionScalarWhereInput | PostInteractionScalarWhereInput[]
  }

  export type PostCreateNestedOneWithoutMediaInput = {
    create?: XOR<PostCreateWithoutMediaInput, PostUncheckedCreateWithoutMediaInput>
    connectOrCreate?: PostCreateOrConnectWithoutMediaInput
    connect?: PostWhereUniqueInput
  }

  export type PostUpdateOneRequiredWithoutMediaNestedInput = {
    create?: XOR<PostCreateWithoutMediaInput, PostUncheckedCreateWithoutMediaInput>
    connectOrCreate?: PostCreateOrConnectWithoutMediaInput
    upsert?: PostUpsertWithoutMediaInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutMediaInput, PostUpdateWithoutMediaInput>, PostUncheckedUpdateWithoutMediaInput>
  }

  export type PostCreateNestedOneWithoutInteractionsInput = {
    create?: XOR<PostCreateWithoutInteractionsInput, PostUncheckedCreateWithoutInteractionsInput>
    connectOrCreate?: PostCreateOrConnectWithoutInteractionsInput
    connect?: PostWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPostInteractionsInput = {
    create?: XOR<UserCreateWithoutPostInteractionsInput, UserUncheckedCreateWithoutPostInteractionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostInteractionsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumInteractionTypeFieldUpdateOperationsInput = {
    set?: $Enums.InteractionType
  }

  export type PostUpdateOneRequiredWithoutInteractionsNestedInput = {
    create?: XOR<PostCreateWithoutInteractionsInput, PostUncheckedCreateWithoutInteractionsInput>
    connectOrCreate?: PostCreateOrConnectWithoutInteractionsInput
    upsert?: PostUpsertWithoutInteractionsInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutInteractionsInput, PostUpdateWithoutInteractionsInput>, PostUncheckedUpdateWithoutInteractionsInput>
  }

  export type UserUpdateOneRequiredWithoutPostInteractionsNestedInput = {
    create?: XOR<UserCreateWithoutPostInteractionsInput, UserUncheckedCreateWithoutPostInteractionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostInteractionsInput
    upsert?: UserUpsertWithoutPostInteractionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPostInteractionsInput, UserUpdateWithoutPostInteractionsInput>, UserUncheckedUpdateWithoutPostInteractionsInput>
  }

  export type UserCreateNestedOneWithoutBranchesInput = {
    create?: XOR<UserCreateWithoutBranchesInput, UserUncheckedCreateWithoutBranchesInput>
    connectOrCreate?: UserCreateOrConnectWithoutBranchesInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutBranchesInput = {
    create?: XOR<ProjectCreateWithoutBranchesInput, ProjectUncheckedCreateWithoutBranchesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutBranchesInput
    connect?: ProjectWhereUniqueInput
  }

  export type BranchPermissionsCreateNestedOneWithoutBranchInput = {
    create?: XOR<BranchPermissionsCreateWithoutBranchInput, BranchPermissionsUncheckedCreateWithoutBranchInput>
    connectOrCreate?: BranchPermissionsCreateOrConnectWithoutBranchInput
    connect?: BranchPermissionsWhereUniqueInput
  }

  export type BranchInteractionCreateNestedManyWithoutBranchInput = {
    create?: XOR<BranchInteractionCreateWithoutBranchInput, BranchInteractionUncheckedCreateWithoutBranchInput> | BranchInteractionCreateWithoutBranchInput[] | BranchInteractionUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: BranchInteractionCreateOrConnectWithoutBranchInput | BranchInteractionCreateOrConnectWithoutBranchInput[]
    createMany?: BranchInteractionCreateManyBranchInputEnvelope
    connect?: BranchInteractionWhereUniqueInput | BranchInteractionWhereUniqueInput[]
  }

  export type PostCreateNestedManyWithoutBranchInput = {
    create?: XOR<PostCreateWithoutBranchInput, PostUncheckedCreateWithoutBranchInput> | PostCreateWithoutBranchInput[] | PostUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: PostCreateOrConnectWithoutBranchInput | PostCreateOrConnectWithoutBranchInput[]
    createMany?: PostCreateManyBranchInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type BranchPermissionsUncheckedCreateNestedOneWithoutBranchInput = {
    create?: XOR<BranchPermissionsCreateWithoutBranchInput, BranchPermissionsUncheckedCreateWithoutBranchInput>
    connectOrCreate?: BranchPermissionsCreateOrConnectWithoutBranchInput
    connect?: BranchPermissionsWhereUniqueInput
  }

  export type BranchInteractionUncheckedCreateNestedManyWithoutBranchInput = {
    create?: XOR<BranchInteractionCreateWithoutBranchInput, BranchInteractionUncheckedCreateWithoutBranchInput> | BranchInteractionCreateWithoutBranchInput[] | BranchInteractionUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: BranchInteractionCreateOrConnectWithoutBranchInput | BranchInteractionCreateOrConnectWithoutBranchInput[]
    createMany?: BranchInteractionCreateManyBranchInputEnvelope
    connect?: BranchInteractionWhereUniqueInput | BranchInteractionWhereUniqueInput[]
  }

  export type PostUncheckedCreateNestedManyWithoutBranchInput = {
    create?: XOR<PostCreateWithoutBranchInput, PostUncheckedCreateWithoutBranchInput> | PostCreateWithoutBranchInput[] | PostUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: PostCreateOrConnectWithoutBranchInput | PostCreateOrConnectWithoutBranchInput[]
    createMany?: PostCreateManyBranchInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutBranchesNestedInput = {
    create?: XOR<UserCreateWithoutBranchesInput, UserUncheckedCreateWithoutBranchesInput>
    connectOrCreate?: UserCreateOrConnectWithoutBranchesInput
    upsert?: UserUpsertWithoutBranchesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBranchesInput, UserUpdateWithoutBranchesInput>, UserUncheckedUpdateWithoutBranchesInput>
  }

  export type ProjectUpdateOneRequiredWithoutBranchesNestedInput = {
    create?: XOR<ProjectCreateWithoutBranchesInput, ProjectUncheckedCreateWithoutBranchesInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutBranchesInput
    upsert?: ProjectUpsertWithoutBranchesInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutBranchesInput, ProjectUpdateWithoutBranchesInput>, ProjectUncheckedUpdateWithoutBranchesInput>
  }

  export type BranchPermissionsUpdateOneWithoutBranchNestedInput = {
    create?: XOR<BranchPermissionsCreateWithoutBranchInput, BranchPermissionsUncheckedCreateWithoutBranchInput>
    connectOrCreate?: BranchPermissionsCreateOrConnectWithoutBranchInput
    upsert?: BranchPermissionsUpsertWithoutBranchInput
    disconnect?: BranchPermissionsWhereInput | boolean
    delete?: BranchPermissionsWhereInput | boolean
    connect?: BranchPermissionsWhereUniqueInput
    update?: XOR<XOR<BranchPermissionsUpdateToOneWithWhereWithoutBranchInput, BranchPermissionsUpdateWithoutBranchInput>, BranchPermissionsUncheckedUpdateWithoutBranchInput>
  }

  export type BranchInteractionUpdateManyWithoutBranchNestedInput = {
    create?: XOR<BranchInteractionCreateWithoutBranchInput, BranchInteractionUncheckedCreateWithoutBranchInput> | BranchInteractionCreateWithoutBranchInput[] | BranchInteractionUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: BranchInteractionCreateOrConnectWithoutBranchInput | BranchInteractionCreateOrConnectWithoutBranchInput[]
    upsert?: BranchInteractionUpsertWithWhereUniqueWithoutBranchInput | BranchInteractionUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: BranchInteractionCreateManyBranchInputEnvelope
    set?: BranchInteractionWhereUniqueInput | BranchInteractionWhereUniqueInput[]
    disconnect?: BranchInteractionWhereUniqueInput | BranchInteractionWhereUniqueInput[]
    delete?: BranchInteractionWhereUniqueInput | BranchInteractionWhereUniqueInput[]
    connect?: BranchInteractionWhereUniqueInput | BranchInteractionWhereUniqueInput[]
    update?: BranchInteractionUpdateWithWhereUniqueWithoutBranchInput | BranchInteractionUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: BranchInteractionUpdateManyWithWhereWithoutBranchInput | BranchInteractionUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: BranchInteractionScalarWhereInput | BranchInteractionScalarWhereInput[]
  }

  export type PostUpdateManyWithoutBranchNestedInput = {
    create?: XOR<PostCreateWithoutBranchInput, PostUncheckedCreateWithoutBranchInput> | PostCreateWithoutBranchInput[] | PostUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: PostCreateOrConnectWithoutBranchInput | PostCreateOrConnectWithoutBranchInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutBranchInput | PostUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: PostCreateManyBranchInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutBranchInput | PostUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: PostUpdateManyWithWhereWithoutBranchInput | PostUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type BranchPermissionsUncheckedUpdateOneWithoutBranchNestedInput = {
    create?: XOR<BranchPermissionsCreateWithoutBranchInput, BranchPermissionsUncheckedCreateWithoutBranchInput>
    connectOrCreate?: BranchPermissionsCreateOrConnectWithoutBranchInput
    upsert?: BranchPermissionsUpsertWithoutBranchInput
    disconnect?: BranchPermissionsWhereInput | boolean
    delete?: BranchPermissionsWhereInput | boolean
    connect?: BranchPermissionsWhereUniqueInput
    update?: XOR<XOR<BranchPermissionsUpdateToOneWithWhereWithoutBranchInput, BranchPermissionsUpdateWithoutBranchInput>, BranchPermissionsUncheckedUpdateWithoutBranchInput>
  }

  export type BranchInteractionUncheckedUpdateManyWithoutBranchNestedInput = {
    create?: XOR<BranchInteractionCreateWithoutBranchInput, BranchInteractionUncheckedCreateWithoutBranchInput> | BranchInteractionCreateWithoutBranchInput[] | BranchInteractionUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: BranchInteractionCreateOrConnectWithoutBranchInput | BranchInteractionCreateOrConnectWithoutBranchInput[]
    upsert?: BranchInteractionUpsertWithWhereUniqueWithoutBranchInput | BranchInteractionUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: BranchInteractionCreateManyBranchInputEnvelope
    set?: BranchInteractionWhereUniqueInput | BranchInteractionWhereUniqueInput[]
    disconnect?: BranchInteractionWhereUniqueInput | BranchInteractionWhereUniqueInput[]
    delete?: BranchInteractionWhereUniqueInput | BranchInteractionWhereUniqueInput[]
    connect?: BranchInteractionWhereUniqueInput | BranchInteractionWhereUniqueInput[]
    update?: BranchInteractionUpdateWithWhereUniqueWithoutBranchInput | BranchInteractionUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: BranchInteractionUpdateManyWithWhereWithoutBranchInput | BranchInteractionUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: BranchInteractionScalarWhereInput | BranchInteractionScalarWhereInput[]
  }

  export type PostUncheckedUpdateManyWithoutBranchNestedInput = {
    create?: XOR<PostCreateWithoutBranchInput, PostUncheckedCreateWithoutBranchInput> | PostCreateWithoutBranchInput[] | PostUncheckedCreateWithoutBranchInput[]
    connectOrCreate?: PostCreateOrConnectWithoutBranchInput | PostCreateOrConnectWithoutBranchInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutBranchInput | PostUpsertWithWhereUniqueWithoutBranchInput[]
    createMany?: PostCreateManyBranchInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutBranchInput | PostUpdateWithWhereUniqueWithoutBranchInput[]
    updateMany?: PostUpdateManyWithWhereWithoutBranchInput | PostUpdateManyWithWhereWithoutBranchInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type BranchCreateNestedOneWithoutPermissionsInput = {
    create?: XOR<BranchCreateWithoutPermissionsInput, BranchUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: BranchCreateOrConnectWithoutPermissionsInput
    connect?: BranchWhereUniqueInput
  }

  export type BranchUpdateOneRequiredWithoutPermissionsNestedInput = {
    create?: XOR<BranchCreateWithoutPermissionsInput, BranchUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: BranchCreateOrConnectWithoutPermissionsInput
    upsert?: BranchUpsertWithoutPermissionsInput
    connect?: BranchWhereUniqueInput
    update?: XOR<XOR<BranchUpdateToOneWithWhereWithoutPermissionsInput, BranchUpdateWithoutPermissionsInput>, BranchUncheckedUpdateWithoutPermissionsInput>
  }

  export type BranchCreateNestedOneWithoutInteractionsInput = {
    create?: XOR<BranchCreateWithoutInteractionsInput, BranchUncheckedCreateWithoutInteractionsInput>
    connectOrCreate?: BranchCreateOrConnectWithoutInteractionsInput
    connect?: BranchWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutBranchInteractionsInput = {
    create?: XOR<UserCreateWithoutBranchInteractionsInput, UserUncheckedCreateWithoutBranchInteractionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBranchInteractionsInput
    connect?: UserWhereUniqueInput
  }

  export type BranchUpdateOneRequiredWithoutInteractionsNestedInput = {
    create?: XOR<BranchCreateWithoutInteractionsInput, BranchUncheckedCreateWithoutInteractionsInput>
    connectOrCreate?: BranchCreateOrConnectWithoutInteractionsInput
    upsert?: BranchUpsertWithoutInteractionsInput
    connect?: BranchWhereUniqueInput
    update?: XOR<XOR<BranchUpdateToOneWithWhereWithoutInteractionsInput, BranchUpdateWithoutInteractionsInput>, BranchUncheckedUpdateWithoutInteractionsInput>
  }

  export type UserUpdateOneRequiredWithoutBranchInteractionsNestedInput = {
    create?: XOR<UserCreateWithoutBranchInteractionsInput, UserUncheckedCreateWithoutBranchInteractionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBranchInteractionsInput
    upsert?: UserUpsertWithoutBranchInteractionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBranchInteractionsInput, UserUpdateWithoutBranchInteractionsInput>, UserUncheckedUpdateWithoutBranchInteractionsInput>
  }

  export type UserCreateNestedOneWithoutProjectsInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectPermissionsCreateNestedOneWithoutProjectInput = {
    create?: XOR<ProjectPermissionsCreateWithoutProjectInput, ProjectPermissionsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: ProjectPermissionsCreateOrConnectWithoutProjectInput
    connect?: ProjectPermissionsWhereUniqueInput
  }

  export type ProjectInteractionCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectInteractionCreateWithoutProjectInput, ProjectInteractionUncheckedCreateWithoutProjectInput> | ProjectInteractionCreateWithoutProjectInput[] | ProjectInteractionUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectInteractionCreateOrConnectWithoutProjectInput | ProjectInteractionCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectInteractionCreateManyProjectInputEnvelope
    connect?: ProjectInteractionWhereUniqueInput | ProjectInteractionWhereUniqueInput[]
  }

  export type BranchCreateNestedManyWithoutProjectInput = {
    create?: XOR<BranchCreateWithoutProjectInput, BranchUncheckedCreateWithoutProjectInput> | BranchCreateWithoutProjectInput[] | BranchUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: BranchCreateOrConnectWithoutProjectInput | BranchCreateOrConnectWithoutProjectInput[]
    createMany?: BranchCreateManyProjectInputEnvelope
    connect?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
  }

  export type ProjectPermissionsUncheckedCreateNestedOneWithoutProjectInput = {
    create?: XOR<ProjectPermissionsCreateWithoutProjectInput, ProjectPermissionsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: ProjectPermissionsCreateOrConnectWithoutProjectInput
    connect?: ProjectPermissionsWhereUniqueInput
  }

  export type ProjectInteractionUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ProjectInteractionCreateWithoutProjectInput, ProjectInteractionUncheckedCreateWithoutProjectInput> | ProjectInteractionCreateWithoutProjectInput[] | ProjectInteractionUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectInteractionCreateOrConnectWithoutProjectInput | ProjectInteractionCreateOrConnectWithoutProjectInput[]
    createMany?: ProjectInteractionCreateManyProjectInputEnvelope
    connect?: ProjectInteractionWhereUniqueInput | ProjectInteractionWhereUniqueInput[]
  }

  export type BranchUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<BranchCreateWithoutProjectInput, BranchUncheckedCreateWithoutProjectInput> | BranchCreateWithoutProjectInput[] | BranchUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: BranchCreateOrConnectWithoutProjectInput | BranchCreateOrConnectWithoutProjectInput[]
    createMany?: BranchCreateManyProjectInputEnvelope
    connect?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    upsert?: UserUpsertWithoutProjectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectsInput, UserUpdateWithoutProjectsInput>, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type ProjectPermissionsUpdateOneWithoutProjectNestedInput = {
    create?: XOR<ProjectPermissionsCreateWithoutProjectInput, ProjectPermissionsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: ProjectPermissionsCreateOrConnectWithoutProjectInput
    upsert?: ProjectPermissionsUpsertWithoutProjectInput
    disconnect?: ProjectPermissionsWhereInput | boolean
    delete?: ProjectPermissionsWhereInput | boolean
    connect?: ProjectPermissionsWhereUniqueInput
    update?: XOR<XOR<ProjectPermissionsUpdateToOneWithWhereWithoutProjectInput, ProjectPermissionsUpdateWithoutProjectInput>, ProjectPermissionsUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectInteractionUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectInteractionCreateWithoutProjectInput, ProjectInteractionUncheckedCreateWithoutProjectInput> | ProjectInteractionCreateWithoutProjectInput[] | ProjectInteractionUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectInteractionCreateOrConnectWithoutProjectInput | ProjectInteractionCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectInteractionUpsertWithWhereUniqueWithoutProjectInput | ProjectInteractionUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectInteractionCreateManyProjectInputEnvelope
    set?: ProjectInteractionWhereUniqueInput | ProjectInteractionWhereUniqueInput[]
    disconnect?: ProjectInteractionWhereUniqueInput | ProjectInteractionWhereUniqueInput[]
    delete?: ProjectInteractionWhereUniqueInput | ProjectInteractionWhereUniqueInput[]
    connect?: ProjectInteractionWhereUniqueInput | ProjectInteractionWhereUniqueInput[]
    update?: ProjectInteractionUpdateWithWhereUniqueWithoutProjectInput | ProjectInteractionUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectInteractionUpdateManyWithWhereWithoutProjectInput | ProjectInteractionUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectInteractionScalarWhereInput | ProjectInteractionScalarWhereInput[]
  }

  export type BranchUpdateManyWithoutProjectNestedInput = {
    create?: XOR<BranchCreateWithoutProjectInput, BranchUncheckedCreateWithoutProjectInput> | BranchCreateWithoutProjectInput[] | BranchUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: BranchCreateOrConnectWithoutProjectInput | BranchCreateOrConnectWithoutProjectInput[]
    upsert?: BranchUpsertWithWhereUniqueWithoutProjectInput | BranchUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: BranchCreateManyProjectInputEnvelope
    set?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    disconnect?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    delete?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    connect?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    update?: BranchUpdateWithWhereUniqueWithoutProjectInput | BranchUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: BranchUpdateManyWithWhereWithoutProjectInput | BranchUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: BranchScalarWhereInput | BranchScalarWhereInput[]
  }

  export type ProjectPermissionsUncheckedUpdateOneWithoutProjectNestedInput = {
    create?: XOR<ProjectPermissionsCreateWithoutProjectInput, ProjectPermissionsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: ProjectPermissionsCreateOrConnectWithoutProjectInput
    upsert?: ProjectPermissionsUpsertWithoutProjectInput
    disconnect?: ProjectPermissionsWhereInput | boolean
    delete?: ProjectPermissionsWhereInput | boolean
    connect?: ProjectPermissionsWhereUniqueInput
    update?: XOR<XOR<ProjectPermissionsUpdateToOneWithWhereWithoutProjectInput, ProjectPermissionsUpdateWithoutProjectInput>, ProjectPermissionsUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectInteractionUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ProjectInteractionCreateWithoutProjectInput, ProjectInteractionUncheckedCreateWithoutProjectInput> | ProjectInteractionCreateWithoutProjectInput[] | ProjectInteractionUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ProjectInteractionCreateOrConnectWithoutProjectInput | ProjectInteractionCreateOrConnectWithoutProjectInput[]
    upsert?: ProjectInteractionUpsertWithWhereUniqueWithoutProjectInput | ProjectInteractionUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ProjectInteractionCreateManyProjectInputEnvelope
    set?: ProjectInteractionWhereUniqueInput | ProjectInteractionWhereUniqueInput[]
    disconnect?: ProjectInteractionWhereUniqueInput | ProjectInteractionWhereUniqueInput[]
    delete?: ProjectInteractionWhereUniqueInput | ProjectInteractionWhereUniqueInput[]
    connect?: ProjectInteractionWhereUniqueInput | ProjectInteractionWhereUniqueInput[]
    update?: ProjectInteractionUpdateWithWhereUniqueWithoutProjectInput | ProjectInteractionUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ProjectInteractionUpdateManyWithWhereWithoutProjectInput | ProjectInteractionUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ProjectInteractionScalarWhereInput | ProjectInteractionScalarWhereInput[]
  }

  export type BranchUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<BranchCreateWithoutProjectInput, BranchUncheckedCreateWithoutProjectInput> | BranchCreateWithoutProjectInput[] | BranchUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: BranchCreateOrConnectWithoutProjectInput | BranchCreateOrConnectWithoutProjectInput[]
    upsert?: BranchUpsertWithWhereUniqueWithoutProjectInput | BranchUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: BranchCreateManyProjectInputEnvelope
    set?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    disconnect?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    delete?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    connect?: BranchWhereUniqueInput | BranchWhereUniqueInput[]
    update?: BranchUpdateWithWhereUniqueWithoutProjectInput | BranchUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: BranchUpdateManyWithWhereWithoutProjectInput | BranchUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: BranchScalarWhereInput | BranchScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutPermissionsInput = {
    create?: XOR<ProjectCreateWithoutPermissionsInput, ProjectUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutPermissionsInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutPermissionsNestedInput = {
    create?: XOR<ProjectCreateWithoutPermissionsInput, ProjectUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutPermissionsInput
    upsert?: ProjectUpsertWithoutPermissionsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutPermissionsInput, ProjectUpdateWithoutPermissionsInput>, ProjectUncheckedUpdateWithoutPermissionsInput>
  }

  export type ProjectCreateNestedOneWithoutInteractionsInput = {
    create?: XOR<ProjectCreateWithoutInteractionsInput, ProjectUncheckedCreateWithoutInteractionsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutInteractionsInput
    connect?: ProjectWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutProjectInteractionsInput = {
    create?: XOR<UserCreateWithoutProjectInteractionsInput, UserUncheckedCreateWithoutProjectInteractionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectInteractionsInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutInteractionsNestedInput = {
    create?: XOR<ProjectCreateWithoutInteractionsInput, ProjectUncheckedCreateWithoutInteractionsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutInteractionsInput
    upsert?: ProjectUpsertWithoutInteractionsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutInteractionsInput, ProjectUpdateWithoutInteractionsInput>, ProjectUncheckedUpdateWithoutInteractionsInput>
  }

  export type UserUpdateOneRequiredWithoutProjectInteractionsNestedInput = {
    create?: XOR<UserCreateWithoutProjectInteractionsInput, UserUncheckedCreateWithoutProjectInteractionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectInteractionsInput
    upsert?: UserUpsertWithoutProjectInteractionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectInteractionsInput, UserUpdateWithoutProjectInteractionsInput>, UserUncheckedUpdateWithoutProjectInteractionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumInteractionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.InteractionType | EnumInteractionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InteractionType[] | ListEnumInteractionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InteractionType[] | ListEnumInteractionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInteractionTypeFilter<$PrismaModel> | $Enums.InteractionType
  }

  export type NestedEnumInteractionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InteractionType | EnumInteractionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.InteractionType[] | ListEnumInteractionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.InteractionType[] | ListEnumInteractionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumInteractionTypeWithAggregatesFilter<$PrismaModel> | $Enums.InteractionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInteractionTypeFilter<$PrismaModel>
    _max?: NestedEnumInteractionTypeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AccountCreateWithoutUserInput = {
    type: string
    provider: string
    providerAccountId: string
    refreshToken?: string | null
    accessToken?: string | null
    expiresAt?: number | null
    tokenType?: string | null
    scope?: string | null
    idToken?: string | null
    sessionState?: string | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    type: string
    provider: string
    providerAccountId: string
    refreshToken?: string | null
    accessToken?: string | null
    expiresAt?: number | null
    tokenType?: string | null
    scope?: string | null
    idToken?: string | null
    sessionState?: string | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FollowCreateWithoutFollowedInput = {
    id?: string
    createdAt?: Date | string
    follower: UserCreateNestedOneWithoutFollowingInput
  }

  export type FollowUncheckedCreateWithoutFollowedInput = {
    id?: string
    followerId: string
    createdAt?: Date | string
  }

  export type FollowCreateOrConnectWithoutFollowedInput = {
    where: FollowWhereUniqueInput
    create: XOR<FollowCreateWithoutFollowedInput, FollowUncheckedCreateWithoutFollowedInput>
  }

  export type FollowCreateManyFollowedInputEnvelope = {
    data: FollowCreateManyFollowedInput | FollowCreateManyFollowedInput[]
    skipDuplicates?: boolean
  }

  export type FollowCreateWithoutFollowerInput = {
    id?: string
    createdAt?: Date | string
    followed: UserCreateNestedOneWithoutFollowsInput
  }

  export type FollowUncheckedCreateWithoutFollowerInput = {
    id?: string
    followedId: string
    createdAt?: Date | string
  }

  export type FollowCreateOrConnectWithoutFollowerInput = {
    where: FollowWhereUniqueInput
    create: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput>
  }

  export type FollowCreateManyFollowerInputEnvelope = {
    data: FollowCreateManyFollowerInput | FollowCreateManyFollowerInput[]
    skipDuplicates?: boolean
  }

  export type PostCreateWithoutAuthorInput = {
    id?: string
    title: string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    branch: BranchCreateNestedOneWithoutPostsInput
    media?: PostMediaCreateNestedManyWithoutPostInput
    interactions?: PostInteractionCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutAuthorInput = {
    id?: string
    title: string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    branchId: string
    media?: PostMediaUncheckedCreateNestedManyWithoutPostInput
    interactions?: PostInteractionUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutAuthorInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput>
  }

  export type PostCreateManyAuthorInputEnvelope = {
    data: PostCreateManyAuthorInput | PostCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type BranchCreateWithoutAuthorInput = {
    id?: string
    name: string
    description?: string | null
    default?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    project: ProjectCreateNestedOneWithoutBranchesInput
    permissions?: BranchPermissionsCreateNestedOneWithoutBranchInput
    interactions?: BranchInteractionCreateNestedManyWithoutBranchInput
    posts?: PostCreateNestedManyWithoutBranchInput
  }

  export type BranchUncheckedCreateWithoutAuthorInput = {
    id?: string
    name: string
    description?: string | null
    default?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    projectId: string
    permissions?: BranchPermissionsUncheckedCreateNestedOneWithoutBranchInput
    interactions?: BranchInteractionUncheckedCreateNestedManyWithoutBranchInput
    posts?: PostUncheckedCreateNestedManyWithoutBranchInput
  }

  export type BranchCreateOrConnectWithoutAuthorInput = {
    where: BranchWhereUniqueInput
    create: XOR<BranchCreateWithoutAuthorInput, BranchUncheckedCreateWithoutAuthorInput>
  }

  export type BranchCreateManyAuthorInputEnvelope = {
    data: BranchCreateManyAuthorInput | BranchCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type ProjectCreateWithoutAuthorInput = {
    id?: string
    picture?: string | null
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    permissions?: ProjectPermissionsCreateNestedOneWithoutProjectInput
    interactions?: ProjectInteractionCreateNestedManyWithoutProjectInput
    branches?: BranchCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutAuthorInput = {
    id?: string
    picture?: string | null
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    permissions?: ProjectPermissionsUncheckedCreateNestedOneWithoutProjectInput
    interactions?: ProjectInteractionUncheckedCreateNestedManyWithoutProjectInput
    branches?: BranchUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutAuthorInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutAuthorInput, ProjectUncheckedCreateWithoutAuthorInput>
  }

  export type ProjectCreateManyAuthorInputEnvelope = {
    data: ProjectCreateManyAuthorInput | ProjectCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type PostInteractionCreateWithoutUserInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    post: PostCreateNestedOneWithoutInteractionsInput
  }

  export type PostInteractionUncheckedCreateWithoutUserInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    postId: string
  }

  export type PostInteractionCreateOrConnectWithoutUserInput = {
    where: PostInteractionWhereUniqueInput
    create: XOR<PostInteractionCreateWithoutUserInput, PostInteractionUncheckedCreateWithoutUserInput>
  }

  export type PostInteractionCreateManyUserInputEnvelope = {
    data: PostInteractionCreateManyUserInput | PostInteractionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BranchInteractionCreateWithoutUserInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    branch: BranchCreateNestedOneWithoutInteractionsInput
  }

  export type BranchInteractionUncheckedCreateWithoutUserInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    branchId: string
  }

  export type BranchInteractionCreateOrConnectWithoutUserInput = {
    where: BranchInteractionWhereUniqueInput
    create: XOR<BranchInteractionCreateWithoutUserInput, BranchInteractionUncheckedCreateWithoutUserInput>
  }

  export type BranchInteractionCreateManyUserInputEnvelope = {
    data: BranchInteractionCreateManyUserInput | BranchInteractionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProjectInteractionCreateWithoutUserInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    project: ProjectCreateNestedOneWithoutInteractionsInput
  }

  export type ProjectInteractionUncheckedCreateWithoutUserInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    projectId: string
  }

  export type ProjectInteractionCreateOrConnectWithoutUserInput = {
    where: ProjectInteractionWhereUniqueInput
    create: XOR<ProjectInteractionCreateWithoutUserInput, ProjectInteractionUncheckedCreateWithoutUserInput>
  }

  export type ProjectInteractionCreateManyUserInputEnvelope = {
    data: ProjectInteractionCreateManyUserInput | ProjectInteractionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refreshToken?: StringNullableFilter<"Account"> | string | null
    accessToken?: StringNullableFilter<"Account"> | string | null
    expiresAt?: IntNullableFilter<"Account"> | number | null
    tokenType?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    sessionState?: StringNullableFilter<"Account"> | string | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
  }

  export type FollowUpsertWithWhereUniqueWithoutFollowedInput = {
    where: FollowWhereUniqueInput
    update: XOR<FollowUpdateWithoutFollowedInput, FollowUncheckedUpdateWithoutFollowedInput>
    create: XOR<FollowCreateWithoutFollowedInput, FollowUncheckedCreateWithoutFollowedInput>
  }

  export type FollowUpdateWithWhereUniqueWithoutFollowedInput = {
    where: FollowWhereUniqueInput
    data: XOR<FollowUpdateWithoutFollowedInput, FollowUncheckedUpdateWithoutFollowedInput>
  }

  export type FollowUpdateManyWithWhereWithoutFollowedInput = {
    where: FollowScalarWhereInput
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyWithoutFollowedInput>
  }

  export type FollowScalarWhereInput = {
    AND?: FollowScalarWhereInput | FollowScalarWhereInput[]
    OR?: FollowScalarWhereInput[]
    NOT?: FollowScalarWhereInput | FollowScalarWhereInput[]
    id?: StringFilter<"Follow"> | string
    followerId?: StringFilter<"Follow"> | string
    followedId?: StringFilter<"Follow"> | string
    createdAt?: DateTimeFilter<"Follow"> | Date | string
  }

  export type FollowUpsertWithWhereUniqueWithoutFollowerInput = {
    where: FollowWhereUniqueInput
    update: XOR<FollowUpdateWithoutFollowerInput, FollowUncheckedUpdateWithoutFollowerInput>
    create: XOR<FollowCreateWithoutFollowerInput, FollowUncheckedCreateWithoutFollowerInput>
  }

  export type FollowUpdateWithWhereUniqueWithoutFollowerInput = {
    where: FollowWhereUniqueInput
    data: XOR<FollowUpdateWithoutFollowerInput, FollowUncheckedUpdateWithoutFollowerInput>
  }

  export type FollowUpdateManyWithWhereWithoutFollowerInput = {
    where: FollowScalarWhereInput
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyWithoutFollowerInput>
  }

  export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutAuthorInput, PostUncheckedUpdateWithoutAuthorInput>
    create: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput>
  }

  export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutAuthorInput, PostUncheckedUpdateWithoutAuthorInput>
  }

  export type PostUpdateManyWithWhereWithoutAuthorInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutAuthorInput>
  }

  export type PostScalarWhereInput = {
    AND?: PostScalarWhereInput | PostScalarWhereInput[]
    OR?: PostScalarWhereInput[]
    NOT?: PostScalarWhereInput | PostScalarWhereInput[]
    id?: StringFilter<"Post"> | string
    title?: StringFilter<"Post"> | string
    content?: StringNullableFilter<"Post"> | string | null
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Post"> | Date | string | null
    branchId?: StringFilter<"Post"> | string
    authorId?: StringFilter<"Post"> | string
  }

  export type BranchUpsertWithWhereUniqueWithoutAuthorInput = {
    where: BranchWhereUniqueInput
    update: XOR<BranchUpdateWithoutAuthorInput, BranchUncheckedUpdateWithoutAuthorInput>
    create: XOR<BranchCreateWithoutAuthorInput, BranchUncheckedCreateWithoutAuthorInput>
  }

  export type BranchUpdateWithWhereUniqueWithoutAuthorInput = {
    where: BranchWhereUniqueInput
    data: XOR<BranchUpdateWithoutAuthorInput, BranchUncheckedUpdateWithoutAuthorInput>
  }

  export type BranchUpdateManyWithWhereWithoutAuthorInput = {
    where: BranchScalarWhereInput
    data: XOR<BranchUpdateManyMutationInput, BranchUncheckedUpdateManyWithoutAuthorInput>
  }

  export type BranchScalarWhereInput = {
    AND?: BranchScalarWhereInput | BranchScalarWhereInput[]
    OR?: BranchScalarWhereInput[]
    NOT?: BranchScalarWhereInput | BranchScalarWhereInput[]
    id?: StringFilter<"Branch"> | string
    name?: StringFilter<"Branch"> | string
    description?: StringNullableFilter<"Branch"> | string | null
    default?: BoolFilter<"Branch"> | boolean
    createdAt?: DateTimeFilter<"Branch"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Branch"> | Date | string | null
    projectId?: StringFilter<"Branch"> | string
    authorId?: StringFilter<"Branch"> | string
  }

  export type ProjectUpsertWithWhereUniqueWithoutAuthorInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutAuthorInput, ProjectUncheckedUpdateWithoutAuthorInput>
    create: XOR<ProjectCreateWithoutAuthorInput, ProjectUncheckedCreateWithoutAuthorInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutAuthorInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutAuthorInput, ProjectUncheckedUpdateWithoutAuthorInput>
  }

  export type ProjectUpdateManyWithWhereWithoutAuthorInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutAuthorInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: StringFilter<"Project"> | string
    picture?: StringNullableFilter<"Project"> | string | null
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Project"> | Date | string | null
    authorId?: StringFilter<"Project"> | string
  }

  export type PostInteractionUpsertWithWhereUniqueWithoutUserInput = {
    where: PostInteractionWhereUniqueInput
    update: XOR<PostInteractionUpdateWithoutUserInput, PostInteractionUncheckedUpdateWithoutUserInput>
    create: XOR<PostInteractionCreateWithoutUserInput, PostInteractionUncheckedCreateWithoutUserInput>
  }

  export type PostInteractionUpdateWithWhereUniqueWithoutUserInput = {
    where: PostInteractionWhereUniqueInput
    data: XOR<PostInteractionUpdateWithoutUserInput, PostInteractionUncheckedUpdateWithoutUserInput>
  }

  export type PostInteractionUpdateManyWithWhereWithoutUserInput = {
    where: PostInteractionScalarWhereInput
    data: XOR<PostInteractionUpdateManyMutationInput, PostInteractionUncheckedUpdateManyWithoutUserInput>
  }

  export type PostInteractionScalarWhereInput = {
    AND?: PostInteractionScalarWhereInput | PostInteractionScalarWhereInput[]
    OR?: PostInteractionScalarWhereInput[]
    NOT?: PostInteractionScalarWhereInput | PostInteractionScalarWhereInput[]
    id?: StringFilter<"PostInteraction"> | string
    type?: EnumInteractionTypeFilter<"PostInteraction"> | $Enums.InteractionType
    createdAt?: DateTimeFilter<"PostInteraction"> | Date | string
    postId?: StringFilter<"PostInteraction"> | string
    userId?: StringFilter<"PostInteraction"> | string
  }

  export type BranchInteractionUpsertWithWhereUniqueWithoutUserInput = {
    where: BranchInteractionWhereUniqueInput
    update: XOR<BranchInteractionUpdateWithoutUserInput, BranchInteractionUncheckedUpdateWithoutUserInput>
    create: XOR<BranchInteractionCreateWithoutUserInput, BranchInteractionUncheckedCreateWithoutUserInput>
  }

  export type BranchInteractionUpdateWithWhereUniqueWithoutUserInput = {
    where: BranchInteractionWhereUniqueInput
    data: XOR<BranchInteractionUpdateWithoutUserInput, BranchInteractionUncheckedUpdateWithoutUserInput>
  }

  export type BranchInteractionUpdateManyWithWhereWithoutUserInput = {
    where: BranchInteractionScalarWhereInput
    data: XOR<BranchInteractionUpdateManyMutationInput, BranchInteractionUncheckedUpdateManyWithoutUserInput>
  }

  export type BranchInteractionScalarWhereInput = {
    AND?: BranchInteractionScalarWhereInput | BranchInteractionScalarWhereInput[]
    OR?: BranchInteractionScalarWhereInput[]
    NOT?: BranchInteractionScalarWhereInput | BranchInteractionScalarWhereInput[]
    id?: StringFilter<"BranchInteraction"> | string
    type?: EnumInteractionTypeFilter<"BranchInteraction"> | $Enums.InteractionType
    createdAt?: DateTimeFilter<"BranchInteraction"> | Date | string
    branchId?: StringFilter<"BranchInteraction"> | string
    userId?: StringFilter<"BranchInteraction"> | string
  }

  export type ProjectInteractionUpsertWithWhereUniqueWithoutUserInput = {
    where: ProjectInteractionWhereUniqueInput
    update: XOR<ProjectInteractionUpdateWithoutUserInput, ProjectInteractionUncheckedUpdateWithoutUserInput>
    create: XOR<ProjectInteractionCreateWithoutUserInput, ProjectInteractionUncheckedCreateWithoutUserInput>
  }

  export type ProjectInteractionUpdateWithWhereUniqueWithoutUserInput = {
    where: ProjectInteractionWhereUniqueInput
    data: XOR<ProjectInteractionUpdateWithoutUserInput, ProjectInteractionUncheckedUpdateWithoutUserInput>
  }

  export type ProjectInteractionUpdateManyWithWhereWithoutUserInput = {
    where: ProjectInteractionScalarWhereInput
    data: XOR<ProjectInteractionUpdateManyMutationInput, ProjectInteractionUncheckedUpdateManyWithoutUserInput>
  }

  export type ProjectInteractionScalarWhereInput = {
    AND?: ProjectInteractionScalarWhereInput | ProjectInteractionScalarWhereInput[]
    OR?: ProjectInteractionScalarWhereInput[]
    NOT?: ProjectInteractionScalarWhereInput | ProjectInteractionScalarWhereInput[]
    id?: StringFilter<"ProjectInteraction"> | string
    type?: EnumInteractionTypeFilter<"ProjectInteraction"> | $Enums.InteractionType
    createdAt?: DateTimeFilter<"ProjectInteraction"> | Date | string
    projectId?: StringFilter<"ProjectInteraction"> | string
    userId?: StringFilter<"ProjectInteraction"> | string
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    follows?: FollowCreateNestedManyWithoutFollowedInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    branches?: BranchCreateNestedManyWithoutAuthorInput
    projects?: ProjectCreateNestedManyWithoutAuthorInput
    postInteractions?: PostInteractionCreateNestedManyWithoutUserInput
    branchInteractions?: BranchInteractionCreateNestedManyWithoutUserInput
    projectInteractions?: ProjectInteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    follows?: FollowUncheckedCreateNestedManyWithoutFollowedInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    branches?: BranchUncheckedCreateNestedManyWithoutAuthorInput
    projects?: ProjectUncheckedCreateNestedManyWithoutAuthorInput
    postInteractions?: PostInteractionUncheckedCreateNestedManyWithoutUserInput
    branchInteractions?: BranchInteractionUncheckedCreateNestedManyWithoutUserInput
    projectInteractions?: ProjectInteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    follows?: FollowUpdateManyWithoutFollowedNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    posts?: PostUpdateManyWithoutAuthorNestedInput
    branches?: BranchUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUpdateManyWithoutAuthorNestedInput
    postInteractions?: PostInteractionUpdateManyWithoutUserNestedInput
    branchInteractions?: BranchInteractionUpdateManyWithoutUserNestedInput
    projectInteractions?: ProjectInteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    follows?: FollowUncheckedUpdateManyWithoutFollowedNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    branches?: BranchUncheckedUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutAuthorNestedInput
    postInteractions?: PostInteractionUncheckedUpdateManyWithoutUserNestedInput
    branchInteractions?: BranchInteractionUncheckedUpdateManyWithoutUserNestedInput
    projectInteractions?: ProjectInteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    follows?: FollowCreateNestedManyWithoutFollowedInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    branches?: BranchCreateNestedManyWithoutAuthorInput
    projects?: ProjectCreateNestedManyWithoutAuthorInput
    postInteractions?: PostInteractionCreateNestedManyWithoutUserInput
    branchInteractions?: BranchInteractionCreateNestedManyWithoutUserInput
    projectInteractions?: ProjectInteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    follows?: FollowUncheckedCreateNestedManyWithoutFollowedInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    branches?: BranchUncheckedCreateNestedManyWithoutAuthorInput
    projects?: ProjectUncheckedCreateNestedManyWithoutAuthorInput
    postInteractions?: PostInteractionUncheckedCreateNestedManyWithoutUserInput
    branchInteractions?: BranchInteractionUncheckedCreateNestedManyWithoutUserInput
    projectInteractions?: ProjectInteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    follows?: FollowUpdateManyWithoutFollowedNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    posts?: PostUpdateManyWithoutAuthorNestedInput
    branches?: BranchUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUpdateManyWithoutAuthorNestedInput
    postInteractions?: PostInteractionUpdateManyWithoutUserNestedInput
    branchInteractions?: BranchInteractionUpdateManyWithoutUserNestedInput
    projectInteractions?: ProjectInteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    follows?: FollowUncheckedUpdateManyWithoutFollowedNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    branches?: BranchUncheckedUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutAuthorNestedInput
    postInteractions?: PostInteractionUncheckedUpdateManyWithoutUserNestedInput
    branchInteractions?: BranchInteractionUncheckedUpdateManyWithoutUserNestedInput
    projectInteractions?: ProjectInteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutFollowingInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    follows?: FollowCreateNestedManyWithoutFollowedInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    branches?: BranchCreateNestedManyWithoutAuthorInput
    projects?: ProjectCreateNestedManyWithoutAuthorInput
    postInteractions?: PostInteractionCreateNestedManyWithoutUserInput
    branchInteractions?: BranchInteractionCreateNestedManyWithoutUserInput
    projectInteractions?: ProjectInteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFollowingInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    follows?: FollowUncheckedCreateNestedManyWithoutFollowedInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    branches?: BranchUncheckedCreateNestedManyWithoutAuthorInput
    projects?: ProjectUncheckedCreateNestedManyWithoutAuthorInput
    postInteractions?: PostInteractionUncheckedCreateNestedManyWithoutUserInput
    branchInteractions?: BranchInteractionUncheckedCreateNestedManyWithoutUserInput
    projectInteractions?: ProjectInteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFollowingInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
  }

  export type UserCreateWithoutFollowsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    branches?: BranchCreateNestedManyWithoutAuthorInput
    projects?: ProjectCreateNestedManyWithoutAuthorInput
    postInteractions?: PostInteractionCreateNestedManyWithoutUserInput
    branchInteractions?: BranchInteractionCreateNestedManyWithoutUserInput
    projectInteractions?: ProjectInteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFollowsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    branches?: BranchUncheckedCreateNestedManyWithoutAuthorInput
    projects?: ProjectUncheckedCreateNestedManyWithoutAuthorInput
    postInteractions?: PostInteractionUncheckedCreateNestedManyWithoutUserInput
    branchInteractions?: BranchInteractionUncheckedCreateNestedManyWithoutUserInput
    projectInteractions?: ProjectInteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFollowsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFollowsInput, UserUncheckedCreateWithoutFollowsInput>
  }

  export type UserUpsertWithoutFollowingInput = {
    update: XOR<UserUpdateWithoutFollowingInput, UserUncheckedUpdateWithoutFollowingInput>
    create: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFollowingInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFollowingInput, UserUncheckedUpdateWithoutFollowingInput>
  }

  export type UserUpdateWithoutFollowingInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    follows?: FollowUpdateManyWithoutFollowedNestedInput
    posts?: PostUpdateManyWithoutAuthorNestedInput
    branches?: BranchUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUpdateManyWithoutAuthorNestedInput
    postInteractions?: PostInteractionUpdateManyWithoutUserNestedInput
    branchInteractions?: BranchInteractionUpdateManyWithoutUserNestedInput
    projectInteractions?: ProjectInteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFollowingInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    follows?: FollowUncheckedUpdateManyWithoutFollowedNestedInput
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    branches?: BranchUncheckedUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutAuthorNestedInput
    postInteractions?: PostInteractionUncheckedUpdateManyWithoutUserNestedInput
    branchInteractions?: BranchInteractionUncheckedUpdateManyWithoutUserNestedInput
    projectInteractions?: ProjectInteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutFollowsInput = {
    update: XOR<UserUpdateWithoutFollowsInput, UserUncheckedUpdateWithoutFollowsInput>
    create: XOR<UserCreateWithoutFollowsInput, UserUncheckedCreateWithoutFollowsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFollowsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFollowsInput, UserUncheckedUpdateWithoutFollowsInput>
  }

  export type UserUpdateWithoutFollowsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    posts?: PostUpdateManyWithoutAuthorNestedInput
    branches?: BranchUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUpdateManyWithoutAuthorNestedInput
    postInteractions?: PostInteractionUpdateManyWithoutUserNestedInput
    branchInteractions?: BranchInteractionUpdateManyWithoutUserNestedInput
    projectInteractions?: ProjectInteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFollowsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    branches?: BranchUncheckedUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutAuthorNestedInput
    postInteractions?: PostInteractionUncheckedUpdateManyWithoutUserNestedInput
    branchInteractions?: BranchInteractionUncheckedUpdateManyWithoutUserNestedInput
    projectInteractions?: ProjectInteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BranchCreateWithoutPostsInput = {
    id?: string
    name: string
    description?: string | null
    default?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    author: UserCreateNestedOneWithoutBranchesInput
    project: ProjectCreateNestedOneWithoutBranchesInput
    permissions?: BranchPermissionsCreateNestedOneWithoutBranchInput
    interactions?: BranchInteractionCreateNestedManyWithoutBranchInput
  }

  export type BranchUncheckedCreateWithoutPostsInput = {
    id?: string
    name: string
    description?: string | null
    default?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    projectId: string
    authorId: string
    permissions?: BranchPermissionsUncheckedCreateNestedOneWithoutBranchInput
    interactions?: BranchInteractionUncheckedCreateNestedManyWithoutBranchInput
  }

  export type BranchCreateOrConnectWithoutPostsInput = {
    where: BranchWhereUniqueInput
    create: XOR<BranchCreateWithoutPostsInput, BranchUncheckedCreateWithoutPostsInput>
  }

  export type UserCreateWithoutPostsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    follows?: FollowCreateNestedManyWithoutFollowedInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    branches?: BranchCreateNestedManyWithoutAuthorInput
    projects?: ProjectCreateNestedManyWithoutAuthorInput
    postInteractions?: PostInteractionCreateNestedManyWithoutUserInput
    branchInteractions?: BranchInteractionCreateNestedManyWithoutUserInput
    projectInteractions?: ProjectInteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPostsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    follows?: FollowUncheckedCreateNestedManyWithoutFollowedInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    branches?: BranchUncheckedCreateNestedManyWithoutAuthorInput
    projects?: ProjectUncheckedCreateNestedManyWithoutAuthorInput
    postInteractions?: PostInteractionUncheckedCreateNestedManyWithoutUserInput
    branchInteractions?: BranchInteractionUncheckedCreateNestedManyWithoutUserInput
    projectInteractions?: ProjectInteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
  }

  export type PostMediaCreateWithoutPostInput = {
    id?: string
    name: string
    url: string
  }

  export type PostMediaUncheckedCreateWithoutPostInput = {
    id?: string
    name: string
    url: string
  }

  export type PostMediaCreateOrConnectWithoutPostInput = {
    where: PostMediaWhereUniqueInput
    create: XOR<PostMediaCreateWithoutPostInput, PostMediaUncheckedCreateWithoutPostInput>
  }

  export type PostMediaCreateManyPostInputEnvelope = {
    data: PostMediaCreateManyPostInput | PostMediaCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type PostInteractionCreateWithoutPostInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutPostInteractionsInput
  }

  export type PostInteractionUncheckedCreateWithoutPostInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    userId: string
  }

  export type PostInteractionCreateOrConnectWithoutPostInput = {
    where: PostInteractionWhereUniqueInput
    create: XOR<PostInteractionCreateWithoutPostInput, PostInteractionUncheckedCreateWithoutPostInput>
  }

  export type PostInteractionCreateManyPostInputEnvelope = {
    data: PostInteractionCreateManyPostInput | PostInteractionCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type BranchUpsertWithoutPostsInput = {
    update: XOR<BranchUpdateWithoutPostsInput, BranchUncheckedUpdateWithoutPostsInput>
    create: XOR<BranchCreateWithoutPostsInput, BranchUncheckedCreateWithoutPostsInput>
    where?: BranchWhereInput
  }

  export type BranchUpdateToOneWithWhereWithoutPostsInput = {
    where?: BranchWhereInput
    data: XOR<BranchUpdateWithoutPostsInput, BranchUncheckedUpdateWithoutPostsInput>
  }

  export type BranchUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    default?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    author?: UserUpdateOneRequiredWithoutBranchesNestedInput
    project?: ProjectUpdateOneRequiredWithoutBranchesNestedInput
    permissions?: BranchPermissionsUpdateOneWithoutBranchNestedInput
    interactions?: BranchInteractionUpdateManyWithoutBranchNestedInput
  }

  export type BranchUncheckedUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    default?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    permissions?: BranchPermissionsUncheckedUpdateOneWithoutBranchNestedInput
    interactions?: BranchInteractionUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type UserUpsertWithoutPostsInput = {
    update: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPostsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
  }

  export type UserUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    follows?: FollowUpdateManyWithoutFollowedNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    branches?: BranchUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUpdateManyWithoutAuthorNestedInput
    postInteractions?: PostInteractionUpdateManyWithoutUserNestedInput
    branchInteractions?: BranchInteractionUpdateManyWithoutUserNestedInput
    projectInteractions?: ProjectInteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    follows?: FollowUncheckedUpdateManyWithoutFollowedNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    branches?: BranchUncheckedUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutAuthorNestedInput
    postInteractions?: PostInteractionUncheckedUpdateManyWithoutUserNestedInput
    branchInteractions?: BranchInteractionUncheckedUpdateManyWithoutUserNestedInput
    projectInteractions?: ProjectInteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PostMediaUpsertWithWhereUniqueWithoutPostInput = {
    where: PostMediaWhereUniqueInput
    update: XOR<PostMediaUpdateWithoutPostInput, PostMediaUncheckedUpdateWithoutPostInput>
    create: XOR<PostMediaCreateWithoutPostInput, PostMediaUncheckedCreateWithoutPostInput>
  }

  export type PostMediaUpdateWithWhereUniqueWithoutPostInput = {
    where: PostMediaWhereUniqueInput
    data: XOR<PostMediaUpdateWithoutPostInput, PostMediaUncheckedUpdateWithoutPostInput>
  }

  export type PostMediaUpdateManyWithWhereWithoutPostInput = {
    where: PostMediaScalarWhereInput
    data: XOR<PostMediaUpdateManyMutationInput, PostMediaUncheckedUpdateManyWithoutPostInput>
  }

  export type PostMediaScalarWhereInput = {
    AND?: PostMediaScalarWhereInput | PostMediaScalarWhereInput[]
    OR?: PostMediaScalarWhereInput[]
    NOT?: PostMediaScalarWhereInput | PostMediaScalarWhereInput[]
    id?: StringFilter<"PostMedia"> | string
    name?: StringFilter<"PostMedia"> | string
    url?: StringFilter<"PostMedia"> | string
    postId?: StringFilter<"PostMedia"> | string
  }

  export type PostInteractionUpsertWithWhereUniqueWithoutPostInput = {
    where: PostInteractionWhereUniqueInput
    update: XOR<PostInteractionUpdateWithoutPostInput, PostInteractionUncheckedUpdateWithoutPostInput>
    create: XOR<PostInteractionCreateWithoutPostInput, PostInteractionUncheckedCreateWithoutPostInput>
  }

  export type PostInteractionUpdateWithWhereUniqueWithoutPostInput = {
    where: PostInteractionWhereUniqueInput
    data: XOR<PostInteractionUpdateWithoutPostInput, PostInteractionUncheckedUpdateWithoutPostInput>
  }

  export type PostInteractionUpdateManyWithWhereWithoutPostInput = {
    where: PostInteractionScalarWhereInput
    data: XOR<PostInteractionUpdateManyMutationInput, PostInteractionUncheckedUpdateManyWithoutPostInput>
  }

  export type PostCreateWithoutMediaInput = {
    id?: string
    title: string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    branch: BranchCreateNestedOneWithoutPostsInput
    author: UserCreateNestedOneWithoutPostsInput
    interactions?: PostInteractionCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutMediaInput = {
    id?: string
    title: string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    branchId: string
    authorId: string
    interactions?: PostInteractionUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutMediaInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutMediaInput, PostUncheckedCreateWithoutMediaInput>
  }

  export type PostUpsertWithoutMediaInput = {
    update: XOR<PostUpdateWithoutMediaInput, PostUncheckedUpdateWithoutMediaInput>
    create: XOR<PostCreateWithoutMediaInput, PostUncheckedCreateWithoutMediaInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutMediaInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutMediaInput, PostUncheckedUpdateWithoutMediaInput>
  }

  export type PostUpdateWithoutMediaInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    branch?: BranchUpdateOneRequiredWithoutPostsNestedInput
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
    interactions?: PostInteractionUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutMediaInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    branchId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    interactions?: PostInteractionUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostCreateWithoutInteractionsInput = {
    id?: string
    title: string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    branch: BranchCreateNestedOneWithoutPostsInput
    author: UserCreateNestedOneWithoutPostsInput
    media?: PostMediaCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutInteractionsInput = {
    id?: string
    title: string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    branchId: string
    authorId: string
    media?: PostMediaUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutInteractionsInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutInteractionsInput, PostUncheckedCreateWithoutInteractionsInput>
  }

  export type UserCreateWithoutPostInteractionsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    follows?: FollowCreateNestedManyWithoutFollowedInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    branches?: BranchCreateNestedManyWithoutAuthorInput
    projects?: ProjectCreateNestedManyWithoutAuthorInput
    branchInteractions?: BranchInteractionCreateNestedManyWithoutUserInput
    projectInteractions?: ProjectInteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPostInteractionsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    follows?: FollowUncheckedCreateNestedManyWithoutFollowedInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    branches?: BranchUncheckedCreateNestedManyWithoutAuthorInput
    projects?: ProjectUncheckedCreateNestedManyWithoutAuthorInput
    branchInteractions?: BranchInteractionUncheckedCreateNestedManyWithoutUserInput
    projectInteractions?: ProjectInteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPostInteractionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostInteractionsInput, UserUncheckedCreateWithoutPostInteractionsInput>
  }

  export type PostUpsertWithoutInteractionsInput = {
    update: XOR<PostUpdateWithoutInteractionsInput, PostUncheckedUpdateWithoutInteractionsInput>
    create: XOR<PostCreateWithoutInteractionsInput, PostUncheckedCreateWithoutInteractionsInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutInteractionsInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutInteractionsInput, PostUncheckedUpdateWithoutInteractionsInput>
  }

  export type PostUpdateWithoutInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    branch?: BranchUpdateOneRequiredWithoutPostsNestedInput
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
    media?: PostMediaUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    branchId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    media?: PostMediaUncheckedUpdateManyWithoutPostNestedInput
  }

  export type UserUpsertWithoutPostInteractionsInput = {
    update: XOR<UserUpdateWithoutPostInteractionsInput, UserUncheckedUpdateWithoutPostInteractionsInput>
    create: XOR<UserCreateWithoutPostInteractionsInput, UserUncheckedCreateWithoutPostInteractionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPostInteractionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPostInteractionsInput, UserUncheckedUpdateWithoutPostInteractionsInput>
  }

  export type UserUpdateWithoutPostInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    follows?: FollowUpdateManyWithoutFollowedNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    posts?: PostUpdateManyWithoutAuthorNestedInput
    branches?: BranchUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUpdateManyWithoutAuthorNestedInput
    branchInteractions?: BranchInteractionUpdateManyWithoutUserNestedInput
    projectInteractions?: ProjectInteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPostInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    follows?: FollowUncheckedUpdateManyWithoutFollowedNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    branches?: BranchUncheckedUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutAuthorNestedInput
    branchInteractions?: BranchInteractionUncheckedUpdateManyWithoutUserNestedInput
    projectInteractions?: ProjectInteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutBranchesInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    follows?: FollowCreateNestedManyWithoutFollowedInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    projects?: ProjectCreateNestedManyWithoutAuthorInput
    postInteractions?: PostInteractionCreateNestedManyWithoutUserInput
    branchInteractions?: BranchInteractionCreateNestedManyWithoutUserInput
    projectInteractions?: ProjectInteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBranchesInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    follows?: FollowUncheckedCreateNestedManyWithoutFollowedInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    projects?: ProjectUncheckedCreateNestedManyWithoutAuthorInput
    postInteractions?: PostInteractionUncheckedCreateNestedManyWithoutUserInput
    branchInteractions?: BranchInteractionUncheckedCreateNestedManyWithoutUserInput
    projectInteractions?: ProjectInteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBranchesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBranchesInput, UserUncheckedCreateWithoutBranchesInput>
  }

  export type ProjectCreateWithoutBranchesInput = {
    id?: string
    picture?: string | null
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    author: UserCreateNestedOneWithoutProjectsInput
    permissions?: ProjectPermissionsCreateNestedOneWithoutProjectInput
    interactions?: ProjectInteractionCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutBranchesInput = {
    id?: string
    picture?: string | null
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    authorId: string
    permissions?: ProjectPermissionsUncheckedCreateNestedOneWithoutProjectInput
    interactions?: ProjectInteractionUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutBranchesInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutBranchesInput, ProjectUncheckedCreateWithoutBranchesInput>
  }

  export type BranchPermissionsCreateWithoutBranchInput = {
    id?: string
    private?: boolean
    allowedUsers?: JsonNullValueInput | InputJsonValue
    allowCollaborate?: boolean
    allowBranch?: boolean
    allowShare?: boolean
  }

  export type BranchPermissionsUncheckedCreateWithoutBranchInput = {
    id?: string
    private?: boolean
    allowedUsers?: JsonNullValueInput | InputJsonValue
    allowCollaborate?: boolean
    allowBranch?: boolean
    allowShare?: boolean
  }

  export type BranchPermissionsCreateOrConnectWithoutBranchInput = {
    where: BranchPermissionsWhereUniqueInput
    create: XOR<BranchPermissionsCreateWithoutBranchInput, BranchPermissionsUncheckedCreateWithoutBranchInput>
  }

  export type BranchInteractionCreateWithoutBranchInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutBranchInteractionsInput
  }

  export type BranchInteractionUncheckedCreateWithoutBranchInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    userId: string
  }

  export type BranchInteractionCreateOrConnectWithoutBranchInput = {
    where: BranchInteractionWhereUniqueInput
    create: XOR<BranchInteractionCreateWithoutBranchInput, BranchInteractionUncheckedCreateWithoutBranchInput>
  }

  export type BranchInteractionCreateManyBranchInputEnvelope = {
    data: BranchInteractionCreateManyBranchInput | BranchInteractionCreateManyBranchInput[]
    skipDuplicates?: boolean
  }

  export type PostCreateWithoutBranchInput = {
    id?: string
    title: string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    author: UserCreateNestedOneWithoutPostsInput
    media?: PostMediaCreateNestedManyWithoutPostInput
    interactions?: PostInteractionCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutBranchInput = {
    id?: string
    title: string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    authorId: string
    media?: PostMediaUncheckedCreateNestedManyWithoutPostInput
    interactions?: PostInteractionUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutBranchInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutBranchInput, PostUncheckedCreateWithoutBranchInput>
  }

  export type PostCreateManyBranchInputEnvelope = {
    data: PostCreateManyBranchInput | PostCreateManyBranchInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutBranchesInput = {
    update: XOR<UserUpdateWithoutBranchesInput, UserUncheckedUpdateWithoutBranchesInput>
    create: XOR<UserCreateWithoutBranchesInput, UserUncheckedCreateWithoutBranchesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBranchesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBranchesInput, UserUncheckedUpdateWithoutBranchesInput>
  }

  export type UserUpdateWithoutBranchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    follows?: FollowUpdateManyWithoutFollowedNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    posts?: PostUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUpdateManyWithoutAuthorNestedInput
    postInteractions?: PostInteractionUpdateManyWithoutUserNestedInput
    branchInteractions?: BranchInteractionUpdateManyWithoutUserNestedInput
    projectInteractions?: ProjectInteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBranchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    follows?: FollowUncheckedUpdateManyWithoutFollowedNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutAuthorNestedInput
    postInteractions?: PostInteractionUncheckedUpdateManyWithoutUserNestedInput
    branchInteractions?: BranchInteractionUncheckedUpdateManyWithoutUserNestedInput
    projectInteractions?: ProjectInteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectUpsertWithoutBranchesInput = {
    update: XOR<ProjectUpdateWithoutBranchesInput, ProjectUncheckedUpdateWithoutBranchesInput>
    create: XOR<ProjectCreateWithoutBranchesInput, ProjectUncheckedCreateWithoutBranchesInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutBranchesInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutBranchesInput, ProjectUncheckedUpdateWithoutBranchesInput>
  }

  export type ProjectUpdateWithoutBranchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    author?: UserUpdateOneRequiredWithoutProjectsNestedInput
    permissions?: ProjectPermissionsUpdateOneWithoutProjectNestedInput
    interactions?: ProjectInteractionUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutBranchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authorId?: StringFieldUpdateOperationsInput | string
    permissions?: ProjectPermissionsUncheckedUpdateOneWithoutProjectNestedInput
    interactions?: ProjectInteractionUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type BranchPermissionsUpsertWithoutBranchInput = {
    update: XOR<BranchPermissionsUpdateWithoutBranchInput, BranchPermissionsUncheckedUpdateWithoutBranchInput>
    create: XOR<BranchPermissionsCreateWithoutBranchInput, BranchPermissionsUncheckedCreateWithoutBranchInput>
    where?: BranchPermissionsWhereInput
  }

  export type BranchPermissionsUpdateToOneWithWhereWithoutBranchInput = {
    where?: BranchPermissionsWhereInput
    data: XOR<BranchPermissionsUpdateWithoutBranchInput, BranchPermissionsUncheckedUpdateWithoutBranchInput>
  }

  export type BranchPermissionsUpdateWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    private?: BoolFieldUpdateOperationsInput | boolean
    allowedUsers?: JsonNullValueInput | InputJsonValue
    allowCollaborate?: BoolFieldUpdateOperationsInput | boolean
    allowBranch?: BoolFieldUpdateOperationsInput | boolean
    allowShare?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BranchPermissionsUncheckedUpdateWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    private?: BoolFieldUpdateOperationsInput | boolean
    allowedUsers?: JsonNullValueInput | InputJsonValue
    allowCollaborate?: BoolFieldUpdateOperationsInput | boolean
    allowBranch?: BoolFieldUpdateOperationsInput | boolean
    allowShare?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BranchInteractionUpsertWithWhereUniqueWithoutBranchInput = {
    where: BranchInteractionWhereUniqueInput
    update: XOR<BranchInteractionUpdateWithoutBranchInput, BranchInteractionUncheckedUpdateWithoutBranchInput>
    create: XOR<BranchInteractionCreateWithoutBranchInput, BranchInteractionUncheckedCreateWithoutBranchInput>
  }

  export type BranchInteractionUpdateWithWhereUniqueWithoutBranchInput = {
    where: BranchInteractionWhereUniqueInput
    data: XOR<BranchInteractionUpdateWithoutBranchInput, BranchInteractionUncheckedUpdateWithoutBranchInput>
  }

  export type BranchInteractionUpdateManyWithWhereWithoutBranchInput = {
    where: BranchInteractionScalarWhereInput
    data: XOR<BranchInteractionUpdateManyMutationInput, BranchInteractionUncheckedUpdateManyWithoutBranchInput>
  }

  export type PostUpsertWithWhereUniqueWithoutBranchInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutBranchInput, PostUncheckedUpdateWithoutBranchInput>
    create: XOR<PostCreateWithoutBranchInput, PostUncheckedCreateWithoutBranchInput>
  }

  export type PostUpdateWithWhereUniqueWithoutBranchInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutBranchInput, PostUncheckedUpdateWithoutBranchInput>
  }

  export type PostUpdateManyWithWhereWithoutBranchInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutBranchInput>
  }

  export type BranchCreateWithoutPermissionsInput = {
    id?: string
    name: string
    description?: string | null
    default?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    author: UserCreateNestedOneWithoutBranchesInput
    project: ProjectCreateNestedOneWithoutBranchesInput
    interactions?: BranchInteractionCreateNestedManyWithoutBranchInput
    posts?: PostCreateNestedManyWithoutBranchInput
  }

  export type BranchUncheckedCreateWithoutPermissionsInput = {
    id?: string
    name: string
    description?: string | null
    default?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    projectId: string
    authorId: string
    interactions?: BranchInteractionUncheckedCreateNestedManyWithoutBranchInput
    posts?: PostUncheckedCreateNestedManyWithoutBranchInput
  }

  export type BranchCreateOrConnectWithoutPermissionsInput = {
    where: BranchWhereUniqueInput
    create: XOR<BranchCreateWithoutPermissionsInput, BranchUncheckedCreateWithoutPermissionsInput>
  }

  export type BranchUpsertWithoutPermissionsInput = {
    update: XOR<BranchUpdateWithoutPermissionsInput, BranchUncheckedUpdateWithoutPermissionsInput>
    create: XOR<BranchCreateWithoutPermissionsInput, BranchUncheckedCreateWithoutPermissionsInput>
    where?: BranchWhereInput
  }

  export type BranchUpdateToOneWithWhereWithoutPermissionsInput = {
    where?: BranchWhereInput
    data: XOR<BranchUpdateWithoutPermissionsInput, BranchUncheckedUpdateWithoutPermissionsInput>
  }

  export type BranchUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    default?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    author?: UserUpdateOneRequiredWithoutBranchesNestedInput
    project?: ProjectUpdateOneRequiredWithoutBranchesNestedInput
    interactions?: BranchInteractionUpdateManyWithoutBranchNestedInput
    posts?: PostUpdateManyWithoutBranchNestedInput
  }

  export type BranchUncheckedUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    default?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    interactions?: BranchInteractionUncheckedUpdateManyWithoutBranchNestedInput
    posts?: PostUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type BranchCreateWithoutInteractionsInput = {
    id?: string
    name: string
    description?: string | null
    default?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    author: UserCreateNestedOneWithoutBranchesInput
    project: ProjectCreateNestedOneWithoutBranchesInput
    permissions?: BranchPermissionsCreateNestedOneWithoutBranchInput
    posts?: PostCreateNestedManyWithoutBranchInput
  }

  export type BranchUncheckedCreateWithoutInteractionsInput = {
    id?: string
    name: string
    description?: string | null
    default?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    projectId: string
    authorId: string
    permissions?: BranchPermissionsUncheckedCreateNestedOneWithoutBranchInput
    posts?: PostUncheckedCreateNestedManyWithoutBranchInput
  }

  export type BranchCreateOrConnectWithoutInteractionsInput = {
    where: BranchWhereUniqueInput
    create: XOR<BranchCreateWithoutInteractionsInput, BranchUncheckedCreateWithoutInteractionsInput>
  }

  export type UserCreateWithoutBranchInteractionsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    follows?: FollowCreateNestedManyWithoutFollowedInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    branches?: BranchCreateNestedManyWithoutAuthorInput
    projects?: ProjectCreateNestedManyWithoutAuthorInput
    postInteractions?: PostInteractionCreateNestedManyWithoutUserInput
    projectInteractions?: ProjectInteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBranchInteractionsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    follows?: FollowUncheckedCreateNestedManyWithoutFollowedInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    branches?: BranchUncheckedCreateNestedManyWithoutAuthorInput
    projects?: ProjectUncheckedCreateNestedManyWithoutAuthorInput
    postInteractions?: PostInteractionUncheckedCreateNestedManyWithoutUserInput
    projectInteractions?: ProjectInteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBranchInteractionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBranchInteractionsInput, UserUncheckedCreateWithoutBranchInteractionsInput>
  }

  export type BranchUpsertWithoutInteractionsInput = {
    update: XOR<BranchUpdateWithoutInteractionsInput, BranchUncheckedUpdateWithoutInteractionsInput>
    create: XOR<BranchCreateWithoutInteractionsInput, BranchUncheckedCreateWithoutInteractionsInput>
    where?: BranchWhereInput
  }

  export type BranchUpdateToOneWithWhereWithoutInteractionsInput = {
    where?: BranchWhereInput
    data: XOR<BranchUpdateWithoutInteractionsInput, BranchUncheckedUpdateWithoutInteractionsInput>
  }

  export type BranchUpdateWithoutInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    default?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    author?: UserUpdateOneRequiredWithoutBranchesNestedInput
    project?: ProjectUpdateOneRequiredWithoutBranchesNestedInput
    permissions?: BranchPermissionsUpdateOneWithoutBranchNestedInput
    posts?: PostUpdateManyWithoutBranchNestedInput
  }

  export type BranchUncheckedUpdateWithoutInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    default?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    permissions?: BranchPermissionsUncheckedUpdateOneWithoutBranchNestedInput
    posts?: PostUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type UserUpsertWithoutBranchInteractionsInput = {
    update: XOR<UserUpdateWithoutBranchInteractionsInput, UserUncheckedUpdateWithoutBranchInteractionsInput>
    create: XOR<UserCreateWithoutBranchInteractionsInput, UserUncheckedCreateWithoutBranchInteractionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBranchInteractionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBranchInteractionsInput, UserUncheckedUpdateWithoutBranchInteractionsInput>
  }

  export type UserUpdateWithoutBranchInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    follows?: FollowUpdateManyWithoutFollowedNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    posts?: PostUpdateManyWithoutAuthorNestedInput
    branches?: BranchUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUpdateManyWithoutAuthorNestedInput
    postInteractions?: PostInteractionUpdateManyWithoutUserNestedInput
    projectInteractions?: ProjectInteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBranchInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    follows?: FollowUncheckedUpdateManyWithoutFollowedNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    branches?: BranchUncheckedUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutAuthorNestedInput
    postInteractions?: PostInteractionUncheckedUpdateManyWithoutUserNestedInput
    projectInteractions?: ProjectInteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutProjectsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    follows?: FollowCreateNestedManyWithoutFollowedInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    branches?: BranchCreateNestedManyWithoutAuthorInput
    postInteractions?: PostInteractionCreateNestedManyWithoutUserInput
    branchInteractions?: BranchInteractionCreateNestedManyWithoutUserInput
    projectInteractions?: ProjectInteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProjectsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    follows?: FollowUncheckedCreateNestedManyWithoutFollowedInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    branches?: BranchUncheckedCreateNestedManyWithoutAuthorInput
    postInteractions?: PostInteractionUncheckedCreateNestedManyWithoutUserInput
    branchInteractions?: BranchInteractionUncheckedCreateNestedManyWithoutUserInput
    projectInteractions?: ProjectInteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type ProjectPermissionsCreateWithoutProjectInput = {
    id?: string
    private?: boolean
    allowedUsers?: JsonNullValueInput | InputJsonValue
    allowCollaborate?: boolean
    allowBranch?: boolean
    allowShare?: boolean
  }

  export type ProjectPermissionsUncheckedCreateWithoutProjectInput = {
    id?: string
    private?: boolean
    allowedUsers?: JsonNullValueInput | InputJsonValue
    allowCollaborate?: boolean
    allowBranch?: boolean
    allowShare?: boolean
  }

  export type ProjectPermissionsCreateOrConnectWithoutProjectInput = {
    where: ProjectPermissionsWhereUniqueInput
    create: XOR<ProjectPermissionsCreateWithoutProjectInput, ProjectPermissionsUncheckedCreateWithoutProjectInput>
  }

  export type ProjectInteractionCreateWithoutProjectInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutProjectInteractionsInput
  }

  export type ProjectInteractionUncheckedCreateWithoutProjectInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    userId: string
  }

  export type ProjectInteractionCreateOrConnectWithoutProjectInput = {
    where: ProjectInteractionWhereUniqueInput
    create: XOR<ProjectInteractionCreateWithoutProjectInput, ProjectInteractionUncheckedCreateWithoutProjectInput>
  }

  export type ProjectInteractionCreateManyProjectInputEnvelope = {
    data: ProjectInteractionCreateManyProjectInput | ProjectInteractionCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type BranchCreateWithoutProjectInput = {
    id?: string
    name: string
    description?: string | null
    default?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    author: UserCreateNestedOneWithoutBranchesInput
    permissions?: BranchPermissionsCreateNestedOneWithoutBranchInput
    interactions?: BranchInteractionCreateNestedManyWithoutBranchInput
    posts?: PostCreateNestedManyWithoutBranchInput
  }

  export type BranchUncheckedCreateWithoutProjectInput = {
    id?: string
    name: string
    description?: string | null
    default?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    authorId: string
    permissions?: BranchPermissionsUncheckedCreateNestedOneWithoutBranchInput
    interactions?: BranchInteractionUncheckedCreateNestedManyWithoutBranchInput
    posts?: PostUncheckedCreateNestedManyWithoutBranchInput
  }

  export type BranchCreateOrConnectWithoutProjectInput = {
    where: BranchWhereUniqueInput
    create: XOR<BranchCreateWithoutProjectInput, BranchUncheckedCreateWithoutProjectInput>
  }

  export type BranchCreateManyProjectInputEnvelope = {
    data: BranchCreateManyProjectInput | BranchCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutProjectsInput = {
    update: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type UserUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    follows?: FollowUpdateManyWithoutFollowedNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    posts?: PostUpdateManyWithoutAuthorNestedInput
    branches?: BranchUpdateManyWithoutAuthorNestedInput
    postInteractions?: PostInteractionUpdateManyWithoutUserNestedInput
    branchInteractions?: BranchInteractionUpdateManyWithoutUserNestedInput
    projectInteractions?: ProjectInteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    follows?: FollowUncheckedUpdateManyWithoutFollowedNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    branches?: BranchUncheckedUpdateManyWithoutAuthorNestedInput
    postInteractions?: PostInteractionUncheckedUpdateManyWithoutUserNestedInput
    branchInteractions?: BranchInteractionUncheckedUpdateManyWithoutUserNestedInput
    projectInteractions?: ProjectInteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectPermissionsUpsertWithoutProjectInput = {
    update: XOR<ProjectPermissionsUpdateWithoutProjectInput, ProjectPermissionsUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectPermissionsCreateWithoutProjectInput, ProjectPermissionsUncheckedCreateWithoutProjectInput>
    where?: ProjectPermissionsWhereInput
  }

  export type ProjectPermissionsUpdateToOneWithWhereWithoutProjectInput = {
    where?: ProjectPermissionsWhereInput
    data: XOR<ProjectPermissionsUpdateWithoutProjectInput, ProjectPermissionsUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectPermissionsUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    private?: BoolFieldUpdateOperationsInput | boolean
    allowedUsers?: JsonNullValueInput | InputJsonValue
    allowCollaborate?: BoolFieldUpdateOperationsInput | boolean
    allowBranch?: BoolFieldUpdateOperationsInput | boolean
    allowShare?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProjectPermissionsUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    private?: BoolFieldUpdateOperationsInput | boolean
    allowedUsers?: JsonNullValueInput | InputJsonValue
    allowCollaborate?: BoolFieldUpdateOperationsInput | boolean
    allowBranch?: BoolFieldUpdateOperationsInput | boolean
    allowShare?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProjectInteractionUpsertWithWhereUniqueWithoutProjectInput = {
    where: ProjectInteractionWhereUniqueInput
    update: XOR<ProjectInteractionUpdateWithoutProjectInput, ProjectInteractionUncheckedUpdateWithoutProjectInput>
    create: XOR<ProjectInteractionCreateWithoutProjectInput, ProjectInteractionUncheckedCreateWithoutProjectInput>
  }

  export type ProjectInteractionUpdateWithWhereUniqueWithoutProjectInput = {
    where: ProjectInteractionWhereUniqueInput
    data: XOR<ProjectInteractionUpdateWithoutProjectInput, ProjectInteractionUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectInteractionUpdateManyWithWhereWithoutProjectInput = {
    where: ProjectInteractionScalarWhereInput
    data: XOR<ProjectInteractionUpdateManyMutationInput, ProjectInteractionUncheckedUpdateManyWithoutProjectInput>
  }

  export type BranchUpsertWithWhereUniqueWithoutProjectInput = {
    where: BranchWhereUniqueInput
    update: XOR<BranchUpdateWithoutProjectInput, BranchUncheckedUpdateWithoutProjectInput>
    create: XOR<BranchCreateWithoutProjectInput, BranchUncheckedCreateWithoutProjectInput>
  }

  export type BranchUpdateWithWhereUniqueWithoutProjectInput = {
    where: BranchWhereUniqueInput
    data: XOR<BranchUpdateWithoutProjectInput, BranchUncheckedUpdateWithoutProjectInput>
  }

  export type BranchUpdateManyWithWhereWithoutProjectInput = {
    where: BranchScalarWhereInput
    data: XOR<BranchUpdateManyMutationInput, BranchUncheckedUpdateManyWithoutProjectInput>
  }

  export type ProjectCreateWithoutPermissionsInput = {
    id?: string
    picture?: string | null
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    author: UserCreateNestedOneWithoutProjectsInput
    interactions?: ProjectInteractionCreateNestedManyWithoutProjectInput
    branches?: BranchCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutPermissionsInput = {
    id?: string
    picture?: string | null
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    authorId: string
    interactions?: ProjectInteractionUncheckedCreateNestedManyWithoutProjectInput
    branches?: BranchUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutPermissionsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutPermissionsInput, ProjectUncheckedCreateWithoutPermissionsInput>
  }

  export type ProjectUpsertWithoutPermissionsInput = {
    update: XOR<ProjectUpdateWithoutPermissionsInput, ProjectUncheckedUpdateWithoutPermissionsInput>
    create: XOR<ProjectCreateWithoutPermissionsInput, ProjectUncheckedCreateWithoutPermissionsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutPermissionsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutPermissionsInput, ProjectUncheckedUpdateWithoutPermissionsInput>
  }

  export type ProjectUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    author?: UserUpdateOneRequiredWithoutProjectsNestedInput
    interactions?: ProjectInteractionUpdateManyWithoutProjectNestedInput
    branches?: BranchUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authorId?: StringFieldUpdateOperationsInput | string
    interactions?: ProjectInteractionUncheckedUpdateManyWithoutProjectNestedInput
    branches?: BranchUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutInteractionsInput = {
    id?: string
    picture?: string | null
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    author: UserCreateNestedOneWithoutProjectsInput
    permissions?: ProjectPermissionsCreateNestedOneWithoutProjectInput
    branches?: BranchCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutInteractionsInput = {
    id?: string
    picture?: string | null
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    authorId: string
    permissions?: ProjectPermissionsUncheckedCreateNestedOneWithoutProjectInput
    branches?: BranchUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutInteractionsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutInteractionsInput, ProjectUncheckedCreateWithoutInteractionsInput>
  }

  export type UserCreateWithoutProjectInteractionsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    follows?: FollowCreateNestedManyWithoutFollowedInput
    following?: FollowCreateNestedManyWithoutFollowerInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    branches?: BranchCreateNestedManyWithoutAuthorInput
    projects?: ProjectCreateNestedManyWithoutAuthorInput
    postInteractions?: PostInteractionCreateNestedManyWithoutUserInput
    branchInteractions?: BranchInteractionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProjectInteractionsInput = {
    id?: string
    name?: string | null
    email: string
    emailVerified?: Date | string | null
    image?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    follows?: FollowUncheckedCreateNestedManyWithoutFollowedInput
    following?: FollowUncheckedCreateNestedManyWithoutFollowerInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    branches?: BranchUncheckedCreateNestedManyWithoutAuthorInput
    projects?: ProjectUncheckedCreateNestedManyWithoutAuthorInput
    postInteractions?: PostInteractionUncheckedCreateNestedManyWithoutUserInput
    branchInteractions?: BranchInteractionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProjectInteractionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectInteractionsInput, UserUncheckedCreateWithoutProjectInteractionsInput>
  }

  export type ProjectUpsertWithoutInteractionsInput = {
    update: XOR<ProjectUpdateWithoutInteractionsInput, ProjectUncheckedUpdateWithoutInteractionsInput>
    create: XOR<ProjectCreateWithoutInteractionsInput, ProjectUncheckedCreateWithoutInteractionsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutInteractionsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutInteractionsInput, ProjectUncheckedUpdateWithoutInteractionsInput>
  }

  export type ProjectUpdateWithoutInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    author?: UserUpdateOneRequiredWithoutProjectsNestedInput
    permissions?: ProjectPermissionsUpdateOneWithoutProjectNestedInput
    branches?: BranchUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authorId?: StringFieldUpdateOperationsInput | string
    permissions?: ProjectPermissionsUncheckedUpdateOneWithoutProjectNestedInput
    branches?: BranchUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserUpsertWithoutProjectInteractionsInput = {
    update: XOR<UserUpdateWithoutProjectInteractionsInput, UserUncheckedUpdateWithoutProjectInteractionsInput>
    create: XOR<UserCreateWithoutProjectInteractionsInput, UserUncheckedCreateWithoutProjectInteractionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectInteractionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectInteractionsInput, UserUncheckedUpdateWithoutProjectInteractionsInput>
  }

  export type UserUpdateWithoutProjectInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    follows?: FollowUpdateManyWithoutFollowedNestedInput
    following?: FollowUpdateManyWithoutFollowerNestedInput
    posts?: PostUpdateManyWithoutAuthorNestedInput
    branches?: BranchUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUpdateManyWithoutAuthorNestedInput
    postInteractions?: PostInteractionUpdateManyWithoutUserNestedInput
    branchInteractions?: BranchInteractionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    follows?: FollowUncheckedUpdateManyWithoutFollowedNestedInput
    following?: FollowUncheckedUpdateManyWithoutFollowerNestedInput
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    branches?: BranchUncheckedUpdateManyWithoutAuthorNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutAuthorNestedInput
    postInteractions?: PostInteractionUncheckedUpdateManyWithoutUserNestedInput
    branchInteractions?: BranchInteractionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountCreateManyUserInput = {
    type: string
    provider: string
    providerAccountId: string
    refreshToken?: string | null
    accessToken?: string | null
    expiresAt?: number | null
    tokenType?: string | null
    scope?: string | null
    idToken?: string | null
    sessionState?: string | null
  }

  export type SessionCreateManyUserInput = {
    sessionToken: string
    expires: Date | string
  }

  export type FollowCreateManyFollowedInput = {
    id?: string
    followerId: string
    createdAt?: Date | string
  }

  export type FollowCreateManyFollowerInput = {
    id?: string
    followedId: string
    createdAt?: Date | string
  }

  export type PostCreateManyAuthorInput = {
    id?: string
    title: string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    branchId: string
  }

  export type BranchCreateManyAuthorInput = {
    id?: string
    name: string
    description?: string | null
    default?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    projectId: string
  }

  export type ProjectCreateManyAuthorInput = {
    id?: string
    picture?: string | null
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
  }

  export type PostInteractionCreateManyUserInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    postId: string
  }

  export type BranchInteractionCreateManyUserInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    branchId: string
  }

  export type ProjectInteractionCreateManyUserInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    projectId: string
  }

  export type AccountUpdateWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableIntFieldUpdateOperationsInput | number | null
    tokenType?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    sessionState?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableIntFieldUpdateOperationsInput | number | null
    tokenType?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    sessionState?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableIntFieldUpdateOperationsInput | number | null
    tokenType?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    sessionState?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUpdateWithoutUserInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUpdateWithoutFollowedInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    follower?: UserUpdateOneRequiredWithoutFollowingNestedInput
  }

  export type FollowUncheckedUpdateWithoutFollowedInput = {
    id?: StringFieldUpdateOperationsInput | string
    followerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUncheckedUpdateManyWithoutFollowedInput = {
    id?: StringFieldUpdateOperationsInput | string
    followerId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUpdateWithoutFollowerInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    followed?: UserUpdateOneRequiredWithoutFollowsNestedInput
  }

  export type FollowUncheckedUpdateWithoutFollowerInput = {
    id?: StringFieldUpdateOperationsInput | string
    followedId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUncheckedUpdateManyWithoutFollowerInput = {
    id?: StringFieldUpdateOperationsInput | string
    followedId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    branch?: BranchUpdateOneRequiredWithoutPostsNestedInput
    media?: PostMediaUpdateManyWithoutPostNestedInput
    interactions?: PostInteractionUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    branchId?: StringFieldUpdateOperationsInput | string
    media?: PostMediaUncheckedUpdateManyWithoutPostNestedInput
    interactions?: PostInteractionUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    branchId?: StringFieldUpdateOperationsInput | string
  }

  export type BranchUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    default?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project?: ProjectUpdateOneRequiredWithoutBranchesNestedInput
    permissions?: BranchPermissionsUpdateOneWithoutBranchNestedInput
    interactions?: BranchInteractionUpdateManyWithoutBranchNestedInput
    posts?: PostUpdateManyWithoutBranchNestedInput
  }

  export type BranchUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    default?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    permissions?: BranchPermissionsUncheckedUpdateOneWithoutBranchNestedInput
    interactions?: BranchInteractionUncheckedUpdateManyWithoutBranchNestedInput
    posts?: PostUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type BranchUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    default?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permissions?: ProjectPermissionsUpdateOneWithoutProjectNestedInput
    interactions?: ProjectInteractionUpdateManyWithoutProjectNestedInput
    branches?: BranchUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permissions?: ProjectPermissionsUncheckedUpdateOneWithoutProjectNestedInput
    interactions?: ProjectInteractionUncheckedUpdateManyWithoutProjectNestedInput
    branches?: BranchUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PostInteractionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutInteractionsNestedInput
  }

  export type PostInteractionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postId?: StringFieldUpdateOperationsInput | string
  }

  export type PostInteractionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postId?: StringFieldUpdateOperationsInput | string
  }

  export type BranchInteractionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    branch?: BranchUpdateOneRequiredWithoutInteractionsNestedInput
  }

  export type BranchInteractionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    branchId?: StringFieldUpdateOperationsInput | string
  }

  export type BranchInteractionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    branchId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectInteractionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutInteractionsNestedInput
  }

  export type ProjectInteractionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectInteractionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type PostMediaCreateManyPostInput = {
    id?: string
    name: string
    url: string
  }

  export type PostInteractionCreateManyPostInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    userId: string
  }

  export type PostMediaUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type PostMediaUncheckedUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type PostMediaUncheckedUpdateManyWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
  }

  export type PostInteractionUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPostInteractionsNestedInput
  }

  export type PostInteractionUncheckedUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PostInteractionUncheckedUpdateManyWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type BranchInteractionCreateManyBranchInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    userId: string
  }

  export type PostCreateManyBranchInput = {
    id?: string
    title: string
    content?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string | null
    authorId: string
  }

  export type BranchInteractionUpdateWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBranchInteractionsNestedInput
  }

  export type BranchInteractionUncheckedUpdateWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type BranchInteractionUncheckedUpdateManyWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PostUpdateWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
    media?: PostMediaUpdateManyWithoutPostNestedInput
    interactions?: PostInteractionUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authorId?: StringFieldUpdateOperationsInput | string
    media?: PostMediaUncheckedUpdateManyWithoutPostNestedInput
    interactions?: PostInteractionUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateManyWithoutBranchInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authorId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectInteractionCreateManyProjectInput = {
    id?: string
    type: $Enums.InteractionType
    createdAt?: Date | string
    userId: string
  }

  export type BranchCreateManyProjectInput = {
    id?: string
    name: string
    description?: string | null
    default?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    authorId: string
  }

  export type ProjectInteractionUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectInteractionsNestedInput
  }

  export type ProjectInteractionUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectInteractionUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type BranchUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    default?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    author?: UserUpdateOneRequiredWithoutBranchesNestedInput
    permissions?: BranchPermissionsUpdateOneWithoutBranchNestedInput
    interactions?: BranchInteractionUpdateManyWithoutBranchNestedInput
    posts?: PostUpdateManyWithoutBranchNestedInput
  }

  export type BranchUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    default?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authorId?: StringFieldUpdateOperationsInput | string
    permissions?: BranchPermissionsUncheckedUpdateOneWithoutBranchNestedInput
    interactions?: BranchInteractionUncheckedUpdateManyWithoutBranchNestedInput
    posts?: PostUncheckedUpdateManyWithoutBranchNestedInput
  }

  export type BranchUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    default?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authorId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}