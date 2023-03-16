
/**
 * Client
**/
declare const prisma: unique symbol
type PrismaPromise<A> = Promise<A> & { [prisma]: true }
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model User
 * 
 */
type User = {
  id: string
  email: string
  password: string
  Business: BusinessType | null
}

/**
 * Model UserAccount
 * 
 */
type UserAccount = {
  id: string
  name: string
  cellPhone: string
  image: string | null
  address: string | null
  userId: string
}

/**
 * Model BusinessAccount
 * 
 */
type BusinessAccount = {
  id: string
  name: string
  cuit: string | null
  location: string
  address: string | null
  image: string | null
  firmEmail: string | null
  cellphone: string | null
  businessType: BusinessType
}

/**
 * Model Budget
 * 
 */
type Budget = {
  id: string
  ExpenseCategoryId: string
  startingDate: Date
  endingDate: Date
  total: number
  userId: string
}

/**
 * Model Product
 * 
 */
type Product = {
  id: string
  name: string
  retailPrice: number
  cost: number | null
  unit: string | null
  quantity: number | null
  image: string | null
  stock: number
  description: string | null
  createdAt: Date
  categoryId: string | null
  ownerId: string
  deletedAt: Date | null
}

/**
 * Model Service
 * 
 */
type Service = {
  id: string
  name: string
  image: string | null
  description: string | null
  retailPrice: number
  createdAt: Date
  categoryId: string | null
  ownerId: string
  saleIDs: string[]
}

/**
 * Model ProductCategory
 * 
 */
type ProductCategory = {
  id: string
  name: string
  userId: string
}

/**
 * Model Contact
 * 
 */
type Contact = {
  id: string
  name: string
  phone: string
  typeOfContact: TypeOfContact
  email: string
  comments: string
  deletedAt: Date | null
  ownerId: string
}

/**
 * Model ExpenseCategory
 * 
 */
type ExpenseCategory = {
  id: string
  name: string
  imageUrl: string
}

/**
 * Model IncomeCategory
 * 
 */
type IncomeCategory = {
  id: string
  name: string
  imageUrl: string
}

/**
 * Model Expense
 * 
 */
type Expense = {
  id: string
  createdAt: Date
  value: number
  name: string
  date: string
  isPaid: boolean
  deletedAt: Date | null
  categoryId: string
  providerId: string | null
  paymentMethod: PaymentMethod | null
  ownerId: string
  expenseDebtIds: string[]
}

/**
 * Model Income
 * 
 */
type Income = {
  id: string
  value: number
  name: string | null
  date: string
  createdAt: Date
  deletedAt: Date | null
  serviceIDs: string[]
  clientId: string | null
  categoryId: string
  isPaid: boolean
  paymentMethod: PaymentMethod | null
  ownerId: string
  incomeDebtIds: string[]
}

/**
 * Model IncomeDebt
 * 
 */
// type IncomeDebt = {
//   id: string
//   initialDate: Date
//   ownerId: string
//   incomeIDs: string[]
// }

/**
 * Model ExpenseDebt
 * 
 */
// type ExpenseDebt = {
//   id: string
//   initialDate: Date
//   ownerId: string
//   expenseIDs: string[]
// }

/**
 * Model IncomeProducts
 * 
 */
type IncomeProducts = {
  id: string
  quantity: number
  price: number
  incomeId: string
  productId: string
}

/**
 * Model DebtPayment
 * 
 */
type DebtPayment = {
  id: string
  createdAt: Date
  amount: number
  debtId: string | null
  description: string | null
  paymentMethod: PaymentMethod
  paidAt: Date
  incomeDebtId: string | null
  expenseDebtId: string | null
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

const BusinessType: {
  FARMACIA: 'FARMACIA',
  RESTAURANTE: 'RESTAURANTE',
  TALLER: 'TALLER',
  AUTOMOTRIZ: 'AUTOMOTRIZ',
  PANADERIA: 'PANADERIA',
  SUPERMERCADO: 'SUPERMERCADO',
  INDUMENTARIA: 'INDUMENTARIA',
  OTRO: 'OTRO'
};

type BusinessType = (typeof BusinessType)[keyof typeof BusinessType]


const PaymentMethod: {
  CASH: 'CASH',
  CARD: 'CARD',
  BANK_TRANSFER: 'BANK_TRANSFER',
  OTHER: 'OTHER'
};

type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod]


const TypeOfContact: {
  CLIENT: 'CLIENT',
  PROVIDER: 'PROVIDER'
};

type TypeOfContact = (typeof TypeOfContact)[keyof typeof TypeOfContact]


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
class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
  ? T['rejectOnNotFound']
  : false
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;

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

  constructor(optionsArg?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

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
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;


  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): PrismaPromise<Prisma.JsonObject>;

  /**
* `prisma.user`: Exposes CRUD operations for the **User** model.
* Example usage:
* ```ts
* // Fetch zero or more Users
* const users = await prisma.user.findMany()
* ```
*/
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.userAccount`: Exposes CRUD operations for the **UserAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserAccounts
    * const userAccounts = await prisma.userAccount.findMany()
    * ```
    */
  get userAccount(): Prisma.UserAccountDelegate<GlobalReject>;

  /**
   * `prisma.businessAccount`: Exposes CRUD operations for the **BusinessAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BusinessAccounts
    * const businessAccounts = await prisma.businessAccount.findMany()
    * ```
    */
  get businessAccount(): Prisma.BusinessAccountDelegate<GlobalReject>;

  /**
   * `prisma.budget`: Exposes CRUD operations for the **Budget** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Budgets
    * const budgets = await prisma.budget.findMany()
    * ```
    */
  get budget(): Prisma.BudgetDelegate<GlobalReject>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<GlobalReject>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<GlobalReject>;

  /**
   * `prisma.productCategory`: Exposes CRUD operations for the **ProductCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductCategories
    * const productCategories = await prisma.productCategory.findMany()
    * ```
    */
  get productCategory(): Prisma.ProductCategoryDelegate<GlobalReject>;

  /**
   * `prisma.contact`: Exposes CRUD operations for the **Contact** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contacts
    * const contacts = await prisma.contact.findMany()
    * ```
    */
  get contact(): Prisma.ContactDelegate<GlobalReject>;

  /**
   * `prisma.expenseCategory`: Exposes CRUD operations for the **ExpenseCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExpenseCategories
    * const expenseCategories = await prisma.expenseCategory.findMany()
    * ```
    */
  get expenseCategory(): Prisma.ExpenseCategoryDelegate<GlobalReject>;

  /**
   * `prisma.incomeCategory`: Exposes CRUD operations for the **IncomeCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IncomeCategories
    * const incomeCategories = await prisma.incomeCategory.findMany()
    * ```
    */
  get incomeCategory(): Prisma.IncomeCategoryDelegate<GlobalReject>;

  /**
   * `prisma.expense`: Exposes CRUD operations for the **Expense** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Expenses
    * const expenses = await prisma.expense.findMany()
    * ```
    */
  get expense(): Prisma.ExpenseDelegate<GlobalReject>;

  /**
   * `prisma.income`: Exposes CRUD operations for the **Income** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Incomes
    * const incomes = await prisma.income.findMany()
    * ```
    */
  get income(): Prisma.IncomeDelegate<GlobalReject>;

  /**
   * `prisma.incomeDebt`: Exposes CRUD operations for the **IncomeDebt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IncomeDebts
    * const incomeDebts = await prisma.incomeDebt.findMany()
    * ```
    */
  get incomeDebt(): Prisma.IncomeDebtDelegate<GlobalReject>;

  /**
   * `prisma.expenseDebt`: Exposes CRUD operations for the **ExpenseDebt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExpenseDebts
    * const expenseDebts = await prisma.expenseDebt.findMany()
    * ```
    */
  get expenseDebt(): Prisma.ExpenseDebtDelegate<GlobalReject>;

  /**
   * `prisma.incomeProducts`: Exposes CRUD operations for the **IncomeProducts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IncomeProducts
    * const incomeProducts = await prisma.incomeProducts.findMany()
    * ```
    */
  get incomeProducts(): Prisma.IncomeProductsDelegate<GlobalReject>;

  /**
   * `prisma.debtPayment`: Exposes CRUD operations for the **DebtPayment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DebtPayments
    * const debtPayments = await prisma.debtPayment.findMany()
    * ```
    */
  get debtPayment(): Prisma.DebtPaymentDelegate<GlobalReject>;
}

namespace Prisma {
  import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  import PrismaClientValidationError = runtime.PrismaClientValidationError
  import NotFoundError = runtime.NotFoundError

  /**
   * Re-of sql-template-tag
   */
  import sql = runtime.sqltag
  import empty = runtime.empty
  import join = runtime.join
  import raw = runtime.raw
  import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  import Decimal = runtime.Decimal

  type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  import Metrics = runtime.Metrics
  import Metric = runtime.Metric
  import MetricHistogram = runtime.MetricHistogram
  import MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
   * Extensions
   */
  type Extension = runtime.Extension

  /**
   * Prisma Client JS version: 4.5.0
   * Query Engine version: 0362da9eebca54d94c8ef5edd3b2e90af99ba452
   */
  type PrismaVersion = {
    client: string
  }

  const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  type JsonObject = { [Key in string]?: JsonValue }

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  interface JsonArray extends Array<JsonValue> { }

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  type InputJsonObject = { readonly [Key in string]?: InputJsonValue | null }

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> { }

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

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
  const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };


  type Enumerable<T> = T | Array<T>;

  type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  type SubsetIntersection<T, U, K> = {
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
  type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

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

  type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  type OptionalFlat<O> = {
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
    | { [P in keyof O as P extends K ? K : never]-?: O[P] } & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  type Boolean = True | False

  // /**
  // 1
  // */
  type True = 1

  /**
  0
  */
  type False = 0

  type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> =
    W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
      { [K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never },
      { [K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K] }>
    : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  const type: unique symbol;

  function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  type GetScalarType<T, O> = O extends object ? {
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
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  import FieldRef = runtime.FieldRef

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  const ModelName: {
    User: 'User',
    UserAccount: 'UserAccount',
    BusinessAccount: 'BusinessAccount',
    Budget: 'Budget',
    Product: 'Product',
    Service: 'Service',
    ProductCategory: 'ProductCategory',
    Contact: 'Contact',
    ExpenseCategory: 'ExpenseCategory',
    IncomeCategory: 'IncomeCategory',
    Expense: 'Expense',
    Income: 'Income',
    IncomeDebt: 'IncomeDebt',
    ExpenseDebt: 'ExpenseDebt',
    IncomeProducts: 'IncomeProducts',
    DebtPayment: 'DebtPayment'
  };

  type ModelName = (typeof ModelName)[keyof typeof ModelName]


  type Datasources = {
    db?: Datasource
  }

  type RejectOnNotFound = boolean | ((error: Error) => Error)
  type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  type RejectPerOperation = { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound }
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
    ? GlobalRejectSettings[Action] extends RejectOnNotFound
    ? IsReject<GlobalRejectSettings[Action]>
    : GlobalRejectSettings[Action] extends RejectPerModel
    ? Model extends keyof GlobalRejectSettings[Action]
    ? IsReject<GlobalRejectSettings[Action][Model]>
    : False
    : False
    : False
    : IsReject<GlobalRejectSettings>
  type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

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
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  type LogLevel = 'info' | 'query' | 'warn' | 'error'
  type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  type UserCountOutputType = {
    Budgets: number
    Products: number
    Categories: number
    Contacts: number
    Incomes: number
    Expenses: number
    Services: number
    ExpenseDebt: number
    IncomeDebt: number
  }

  type UserCountOutputTypeSelect = {
    Budgets?: boolean
    Products?: boolean
    Categories?: boolean
    Contacts?: boolean
    Incomes?: boolean
    Expenses?: boolean
    Services?: boolean
    ExpenseDebt?: boolean
    IncomeDebt?: boolean
  }

  type UserCountOutputTypeGetPayload<
    S extends boolean | null | undefined | UserCountOutputTypeArgs,
    U = keyof S
  > = S extends true
    ? UserCountOutputType
    : S extends undefined
    ? never
    : S extends UserCountOutputTypeArgs
    ? 'include' extends U
    ? UserCountOutputType
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
    }
    : UserCountOutputType
    : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Count Type ProductCountOutputType
   */


  type ProductCountOutputType = {
    IncomeProducts: number
  }

  type ProductCountOutputTypeSelect = {
    IncomeProducts?: boolean
  }

  type ProductCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ProductCountOutputTypeArgs,
    U = keyof S
  > = S extends true
    ? ProductCountOutputType
    : S extends undefined
    ? never
    : S extends ProductCountOutputTypeArgs
    ? 'include' extends U
    ? ProductCountOutputType
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends keyof ProductCountOutputType ? ProductCountOutputType[P] : never
    }
    : ProductCountOutputType
    : ProductCountOutputType




  // Custom InputTypes

  /**
   * ProductCountOutputType without action
   */
  type ProductCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     * 
    **/
    select?: ProductCountOutputTypeSelect | null
  }



  /**
   * Count Type ServiceCountOutputType
   */


  type ServiceCountOutputType = {
    sales: number
  }

  type ServiceCountOutputTypeSelect = {
    sales?: boolean
  }

  type ServiceCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ServiceCountOutputTypeArgs,
    U = keyof S
  > = S extends true
    ? ServiceCountOutputType
    : S extends undefined
    ? never
    : S extends ServiceCountOutputTypeArgs
    ? 'include' extends U
    ? ServiceCountOutputType
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends keyof ServiceCountOutputType ? ServiceCountOutputType[P] : never
    }
    : ServiceCountOutputType
    : ServiceCountOutputType




  // Custom InputTypes

  /**
   * ServiceCountOutputType without action
   */
  type ServiceCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     * 
    **/
    select?: ServiceCountOutputTypeSelect | null
  }



  /**
   * Count Type ProductCategoryCountOutputType
   */


  type ProductCategoryCountOutputType = {
    Product: number
    Service: number
  }

  type ProductCategoryCountOutputTypeSelect = {
    Product?: boolean
    Service?: boolean
  }

  type ProductCategoryCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ProductCategoryCountOutputTypeArgs,
    U = keyof S
  > = S extends true
    ? ProductCategoryCountOutputType
    : S extends undefined
    ? never
    : S extends ProductCategoryCountOutputTypeArgs
    ? 'include' extends U
    ? ProductCategoryCountOutputType
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends keyof ProductCategoryCountOutputType ? ProductCategoryCountOutputType[P] : never
    }
    : ProductCategoryCountOutputType
    : ProductCategoryCountOutputType




  // Custom InputTypes

  /**
   * ProductCategoryCountOutputType without action
   */
  type ProductCategoryCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ProductCategoryCountOutputType
     * 
    **/
    select?: ProductCategoryCountOutputTypeSelect | null
  }



  /**
   * Count Type ContactCountOutputType
   */


  type ContactCountOutputType = {
    Sale: number
    Expense: number
  }

  type ContactCountOutputTypeSelect = {
    Sale?: boolean
    Expense?: boolean
  }

  type ContactCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ContactCountOutputTypeArgs,
    U = keyof S
  > = S extends true
    ? ContactCountOutputType
    : S extends undefined
    ? never
    : S extends ContactCountOutputTypeArgs
    ? 'include' extends U
    ? ContactCountOutputType
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends keyof ContactCountOutputType ? ContactCountOutputType[P] : never
    }
    : ContactCountOutputType
    : ContactCountOutputType




  // Custom InputTypes

  /**
   * ContactCountOutputType without action
   */
  type ContactCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ContactCountOutputType
     * 
    **/
    select?: ContactCountOutputTypeSelect | null
  }



  /**
   * Count Type ExpenseCategoryCountOutputType
   */


  type ExpenseCategoryCountOutputType = {
    Budget: number
    Expense: number
  }

  type ExpenseCategoryCountOutputTypeSelect = {
    Budget?: boolean
    Expense?: boolean
  }

  type ExpenseCategoryCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ExpenseCategoryCountOutputTypeArgs,
    U = keyof S
  > = S extends true
    ? ExpenseCategoryCountOutputType
    : S extends undefined
    ? never
    : S extends ExpenseCategoryCountOutputTypeArgs
    ? 'include' extends U
    ? ExpenseCategoryCountOutputType
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends keyof ExpenseCategoryCountOutputType ? ExpenseCategoryCountOutputType[P] : never
    }
    : ExpenseCategoryCountOutputType
    : ExpenseCategoryCountOutputType




  // Custom InputTypes

  /**
   * ExpenseCategoryCountOutputType without action
   */
  type ExpenseCategoryCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ExpenseCategoryCountOutputType
     * 
    **/
    select?: ExpenseCategoryCountOutputTypeSelect | null
  }



  /**
   * Count Type IncomeCategoryCountOutputType
   */


  type IncomeCategoryCountOutputType = {
    Income: number
  }

  type IncomeCategoryCountOutputTypeSelect = {
    Income?: boolean
  }

  type IncomeCategoryCountOutputTypeGetPayload<
    S extends boolean | null | undefined | IncomeCategoryCountOutputTypeArgs,
    U = keyof S
  > = S extends true
    ? IncomeCategoryCountOutputType
    : S extends undefined
    ? never
    : S extends IncomeCategoryCountOutputTypeArgs
    ? 'include' extends U
    ? IncomeCategoryCountOutputType
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends keyof IncomeCategoryCountOutputType ? IncomeCategoryCountOutputType[P] : never
    }
    : IncomeCategoryCountOutputType
    : IncomeCategoryCountOutputType




  // Custom InputTypes

  /**
   * IncomeCategoryCountOutputType without action
   */
  type IncomeCategoryCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the IncomeCategoryCountOutputType
     * 
    **/
    select?: IncomeCategoryCountOutputTypeSelect | null
  }



  /**
   * Count Type ExpenseCountOutputType
   */


  type ExpenseCountOutputType = {
    ExpenseDebts: number
  }

  type ExpenseCountOutputTypeSelect = {
    ExpenseDebts?: boolean
  }

  type ExpenseCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ExpenseCountOutputTypeArgs,
    U = keyof S
  > = S extends true
    ? ExpenseCountOutputType
    : S extends undefined
    ? never
    : S extends ExpenseCountOutputTypeArgs
    ? 'include' extends U
    ? ExpenseCountOutputType
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends keyof ExpenseCountOutputType ? ExpenseCountOutputType[P] : never
    }
    : ExpenseCountOutputType
    : ExpenseCountOutputType




  // Custom InputTypes

  /**
   * ExpenseCountOutputType without action
   */
  type ExpenseCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ExpenseCountOutputType
     * 
    **/
    select?: ExpenseCountOutputTypeSelect | null
  }



  /**
   * Count Type IncomeCountOutputType
   */


  type IncomeCountOutputType = {
    IncomeProducts: number
    services: number
    IncomeDebts: number
  }

  type IncomeCountOutputTypeSelect = {
    IncomeProducts?: boolean
    services?: boolean
    IncomeDebts?: boolean
  }

  type IncomeCountOutputTypeGetPayload<
    S extends boolean | null | undefined | IncomeCountOutputTypeArgs,
    U = keyof S
  > = S extends true
    ? IncomeCountOutputType
    : S extends undefined
    ? never
    : S extends IncomeCountOutputTypeArgs
    ? 'include' extends U
    ? IncomeCountOutputType
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends keyof IncomeCountOutputType ? IncomeCountOutputType[P] : never
    }
    : IncomeCountOutputType
    : IncomeCountOutputType




  // Custom InputTypes

  /**
   * IncomeCountOutputType without action
   */
  type IncomeCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the IncomeCountOutputType
     * 
    **/
    select?: IncomeCountOutputTypeSelect | null
  }



  /**
   * Count Type IncomeDebtCountOutputType
   */


  type IncomeDebtCountOutputType = {
    incomes: number
    payments: number
  }

  type IncomeDebtCountOutputTypeSelect = {
    incomes?: boolean
    payments?: boolean
  }

  type IncomeDebtCountOutputTypeGetPayload<
    S extends boolean | null | undefined | IncomeDebtCountOutputTypeArgs,
    U = keyof S
  > = S extends true
    ? IncomeDebtCountOutputType
    : S extends undefined
    ? never
    : S extends IncomeDebtCountOutputTypeArgs
    ? 'include' extends U
    ? IncomeDebtCountOutputType
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends keyof IncomeDebtCountOutputType ? IncomeDebtCountOutputType[P] : never
    }
    : IncomeDebtCountOutputType
    : IncomeDebtCountOutputType




  // Custom InputTypes

  /**
   * IncomeDebtCountOutputType without action
   */
  type IncomeDebtCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the IncomeDebtCountOutputType
     * 
    **/
    select?: IncomeDebtCountOutputTypeSelect | null
  }



  /**
   * Count Type ExpenseDebtCountOutputType
   */


  type ExpenseDebtCountOutputType = {
    expenses: number
    payments: number
  }

  type ExpenseDebtCountOutputTypeSelect = {
    expenses?: boolean
    payments?: boolean
  }

  type ExpenseDebtCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ExpenseDebtCountOutputTypeArgs,
    U = keyof S
  > = S extends true
    ? ExpenseDebtCountOutputType
    : S extends undefined
    ? never
    : S extends ExpenseDebtCountOutputTypeArgs
    ? 'include' extends U
    ? ExpenseDebtCountOutputType
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends keyof ExpenseDebtCountOutputType ? ExpenseDebtCountOutputType[P] : never
    }
    : ExpenseDebtCountOutputType
    : ExpenseDebtCountOutputType




  // Custom InputTypes

  /**
   * ExpenseDebtCountOutputType without action
   */
  type ExpenseDebtCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ExpenseDebtCountOutputType
     * 
    **/
    select?: ExpenseDebtCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model User
   */


  type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    Business: BusinessType | null
  }

  type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    Business: BusinessType | null
  }

  type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    Business: number
    _all: number
  }


  type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    Business?: true
  }

  type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    Business?: true
  }

  type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    Business?: true
    _all?: true
  }

  type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
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

  type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
    ? T[P] extends true
    ? number
    : GetScalarType<T[P], AggregateUser[P]>
    : GetScalarType<T[P], AggregateUser[P]>
  }




  type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: Array<UserScalarFieldEnum>
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    Business: BusinessType | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
        ? T[P] extends boolean
        ? number
        : GetScalarType<T[P], UserGroupByOutputType[P]>
        : GetScalarType<T[P], UserGroupByOutputType[P]>
      }
    >
  >


  type UserSelect = {
    id?: boolean
    email?: boolean
    password?: boolean
    Account?: boolean | UserAccountArgs
    Business?: boolean
    Budgets?: boolean | BudgetFindManyArgs
    Products?: boolean | ProductFindManyArgs
    Categories?: boolean | ProductCategoryFindManyArgs
    Contacts?: boolean | ContactFindManyArgs
    Incomes?: boolean | IncomeFindManyArgs
    Expenses?: boolean | ExpenseFindManyArgs
    Services?: boolean | ServiceFindManyArgs
    ExpenseDebt?: boolean | ExpenseDebtFindManyArgs
    IncomeDebt?: boolean | IncomeDebtFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  type UserInclude = {
    Account?: boolean | UserAccountArgs
    Budgets?: boolean | BudgetFindManyArgs
    Products?: boolean | ProductFindManyArgs
    Categories?: boolean | ProductCategoryFindManyArgs
    Contacts?: boolean | ContactFindManyArgs
    Incomes?: boolean | IncomeFindManyArgs
    Expenses?: boolean | ExpenseFindManyArgs
    Services?: boolean | ServiceFindManyArgs
    ExpenseDebt?: boolean | ExpenseDebtFindManyArgs
    IncomeDebt?: boolean | IncomeDebtFindManyArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  type UserGetPayload<
    S extends boolean | null | undefined | UserArgs,
    U = keyof S
  > = S extends true
    ? User
    : S extends undefined
    ? never
    : S extends UserArgs | UserFindManyArgs
    ? 'include' extends U
    ? User & {
      [P in TrueKeys<S['include']>]:
      P extends 'Account' ? UserAccountGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
      P extends 'Budgets' ? Array<BudgetGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends 'Products' ? Array<ProductGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends 'Categories' ? Array<ProductCategoryGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends 'Contacts' ? Array<ContactGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends 'Incomes' ? Array<IncomeGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends 'Expenses' ? Array<ExpenseGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends 'Services' ? Array<ServiceGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends 'ExpenseDebt' ? Array<ExpenseDebtGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends 'IncomeDebt' ? Array<IncomeDebtGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends '_count' ? UserCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> : never
    }
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends 'Account' ? UserAccountGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
      P extends 'Budgets' ? Array<BudgetGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends 'Products' ? Array<ProductGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends 'Categories' ? Array<ProductCategoryGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends 'Contacts' ? Array<ContactGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends 'Incomes' ? Array<IncomeGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends 'Expenses' ? Array<ExpenseGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends 'Services' ? Array<ServiceGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends 'ExpenseDebt' ? Array<ExpenseDebtGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends 'IncomeDebt' ? Array<IncomeDebtGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends '_count' ? UserCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> : P extends keyof User ? User[P] : never
    }
    : User
    : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
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
    **/
    findUnique<T extends UserFindUniqueArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null, null>, Prisma__UserClient<UserGetPayload<T> | null, null>>

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
    **/
    findFirst<T extends UserFindFirstArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null, null>, Prisma__UserClient<UserGetPayload<T> | null, null>>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
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
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<User>>, PrismaPromise<Array<UserGetPayload<T>>>>

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
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): PrismaPromise<BatchPayload>

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
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

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
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

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
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

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
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

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
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find zero or more Users that matches the filter.
     * @param {UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: UserFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: UserAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Find one User that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
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
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

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
    ): PrismaPromise<
      T extends _Record<'select', any>
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

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
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  class Prisma__UserClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Account<T extends UserAccountArgs = {}>(args?: Subset<T, UserAccountArgs>): CheckSelect<T, Prisma__UserAccountClient<UserAccount | Null>, Prisma__UserAccountClient<UserAccountGetPayload<T> | Null>>;

    Budgets<T extends BudgetFindManyArgs = {}>(args?: Subset<T, BudgetFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Budget> | Null>, PrismaPromise<Array<BudgetGetPayload<T>> | Null>>;

    Products<T extends ProductFindManyArgs = {}>(args?: Subset<T, ProductFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Product> | Null>, PrismaPromise<Array<ProductGetPayload<T>> | Null>>;

    Categories<T extends ProductCategoryFindManyArgs = {}>(args?: Subset<T, ProductCategoryFindManyArgs>): CheckSelect<T, PrismaPromise<Array<ProductCategory> | Null>, PrismaPromise<Array<ProductCategoryGetPayload<T>> | Null>>;

    Contacts<T extends ContactFindManyArgs = {}>(args?: Subset<T, ContactFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Contact> | Null>, PrismaPromise<Array<ContactGetPayload<T>> | Null>>;

    Incomes<T extends IncomeFindManyArgs = {}>(args?: Subset<T, IncomeFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Income> | Null>, PrismaPromise<Array<IncomeGetPayload<T>> | Null>>;

    Expenses<T extends ExpenseFindManyArgs = {}>(args?: Subset<T, ExpenseFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Expense> | Null>, PrismaPromise<Array<ExpenseGetPayload<T>> | Null>>;

    Services<T extends ServiceFindManyArgs = {}>(args?: Subset<T, ServiceFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Service> | Null>, PrismaPromise<Array<ServiceGetPayload<T>> | Null>>;

    ExpenseDebt<T extends ExpenseDebtFindManyArgs = {}>(args?: Subset<T, ExpenseDebtFindManyArgs>): CheckSelect<T, PrismaPromise<Array<ExpenseDebt> | Null>, PrismaPromise<Array<ExpenseDebtGetPayload<T>> | Null>>;

    IncomeDebt<T extends IncomeDebtFindManyArgs = {}>(args?: Subset<T, IncomeDebtFindManyArgs>): CheckSelect<T, PrismaPromise<Array<IncomeDebt> | Null>, PrismaPromise<Array<IncomeDebtGetPayload<T>> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }

  /**
   * User: findUnique
   */
  interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * User base type for findFirst actions
   */
  type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User: findFirst
   */
  interface UserFindFirstArgs extends UserFindFirstArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * User findMany
   */
  type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     * 
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     * 
    **/
    data: Enumerable<UserCreateManyInput>
  }


  /**
   * User update
   */
  type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     * 
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     * 
    **/
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     * 
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     * 
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User findRaw
   */
  type UserFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * User aggregateRaw
   */
  type UserAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * User: findUniqueOrThrow
   */
  type UserFindUniqueOrThrowArgs = UserFindUniqueArgsBase


  /**
   * User: findFirstOrThrow
   */
  type UserFindFirstOrThrowArgs = UserFindFirstArgsBase


  /**
   * User without action
   */
  type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
  }



  /**
   * Model UserAccount
   */


  type AggregateUserAccount = {
    _count: UserAccountCountAggregateOutputType | null
    _min: UserAccountMinAggregateOutputType | null
    _max: UserAccountMaxAggregateOutputType | null
  }

  type UserAccountMinAggregateOutputType = {
    id: string | null
    name: string | null
    cellPhone: string | null
    image: string | null
    address: string | null
    userId: string | null
  }

  type UserAccountMaxAggregateOutputType = {
    id: string | null
    name: string | null
    cellPhone: string | null
    image: string | null
    address: string | null
    userId: string | null
  }

  type UserAccountCountAggregateOutputType = {
    id: number
    name: number
    cellPhone: number
    image: number
    address: number
    userId: number
    _all: number
  }


  type UserAccountMinAggregateInputType = {
    id?: true
    name?: true
    cellPhone?: true
    image?: true
    address?: true
    userId?: true
  }

  type UserAccountMaxAggregateInputType = {
    id?: true
    name?: true
    cellPhone?: true
    image?: true
    address?: true
    userId?: true
  }

  type UserAccountCountAggregateInputType = {
    id?: true
    name?: true
    cellPhone?: true
    image?: true
    address?: true
    userId?: true
    _all?: true
  }

  type UserAccountAggregateArgs = {
    /**
     * Filter which UserAccount to aggregate.
     * 
    **/
    where?: UserAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAccounts to fetch.
     * 
    **/
    orderBy?: Enumerable<UserAccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAccounts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAccounts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserAccounts
    **/
    _count?: true | UserAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserAccountMaxAggregateInputType
  }

  type GetUserAccountAggregateType<T extends UserAccountAggregateArgs> = {
    [P in keyof T & keyof AggregateUserAccount]: P extends '_count' | 'count'
    ? T[P] extends true
    ? number
    : GetScalarType<T[P], AggregateUserAccount[P]>
    : GetScalarType<T[P], AggregateUserAccount[P]>
  }




  type UserAccountGroupByArgs = {
    where?: UserAccountWhereInput
    orderBy?: Enumerable<UserAccountOrderByWithAggregationInput>
    by: Array<UserAccountScalarFieldEnum>
    having?: UserAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserAccountCountAggregateInputType | true
    _min?: UserAccountMinAggregateInputType
    _max?: UserAccountMaxAggregateInputType
  }


  type UserAccountGroupByOutputType = {
    id: string
    name: string
    cellPhone: string
    image: string | null
    address: string | null
    userId: string
    _count: UserAccountCountAggregateOutputType | null
    _min: UserAccountMinAggregateOutputType | null
    _max: UserAccountMaxAggregateOutputType | null
  }

  type GetUserAccountGroupByPayload<T extends UserAccountGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserAccountGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof UserAccountGroupByOutputType))]: P extends '_count'
        ? T[P] extends boolean
        ? number
        : GetScalarType<T[P], UserAccountGroupByOutputType[P]>
        : GetScalarType<T[P], UserAccountGroupByOutputType[P]>
      }
    >
  >


  type UserAccountSelect = {
    id?: boolean
    name?: boolean
    cellPhone?: boolean
    image?: boolean
    address?: boolean
    userId?: boolean
    user?: boolean | UserArgs
  }

  type UserAccountInclude = {
    user?: boolean | UserArgs
  }

  type UserAccountGetPayload<
    S extends boolean | null | undefined | UserAccountArgs,
    U = keyof S
  > = S extends true
    ? UserAccount
    : S extends undefined
    ? never
    : S extends UserAccountArgs | UserAccountFindManyArgs
    ? 'include' extends U
    ? UserAccount & {
      [P in TrueKeys<S['include']>]:
      P extends 'user' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> : never
    }
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends 'user' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> : P extends keyof UserAccount ? UserAccount[P] : never
    }
    : UserAccount
    : UserAccount


  type UserAccountCountArgs = Merge<
    Omit<UserAccountFindManyArgs, 'select' | 'include'> & {
      select?: UserAccountCountAggregateInputType | true
    }
  >

  interface UserAccountDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one UserAccount that matches the filter.
     * @param {UserAccountFindUniqueArgs} args - Arguments to find a UserAccount
     * @example
     * // Get one UserAccount
     * const userAccount = await prisma.userAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserAccountFindUniqueArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserAccountFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'UserAccount'> extends True ? CheckSelect<T, Prisma__UserAccountClient<UserAccount>, Prisma__UserAccountClient<UserAccountGetPayload<T>>> : CheckSelect<T, Prisma__UserAccountClient<UserAccount | null, null>, Prisma__UserAccountClient<UserAccountGetPayload<T> | null, null>>

    /**
     * Find the first UserAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountFindFirstArgs} args - Arguments to find a UserAccount
     * @example
     * // Get one UserAccount
     * const userAccount = await prisma.userAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserAccountFindFirstArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserAccountFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'UserAccount'> extends True ? CheckSelect<T, Prisma__UserAccountClient<UserAccount>, Prisma__UserAccountClient<UserAccountGetPayload<T>>> : CheckSelect<T, Prisma__UserAccountClient<UserAccount | null, null>, Prisma__UserAccountClient<UserAccountGetPayload<T> | null, null>>

    /**
     * Find zero or more UserAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserAccounts
     * const userAccounts = await prisma.userAccount.findMany()
     * 
     * // Get first 10 UserAccounts
     * const userAccounts = await prisma.userAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userAccountWithIdOnly = await prisma.userAccount.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserAccountFindManyArgs>(
      args?: SelectSubset<T, UserAccountFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<UserAccount>>, PrismaPromise<Array<UserAccountGetPayload<T>>>>

    /**
     * Create a UserAccount.
     * @param {UserAccountCreateArgs} args - Arguments to create a UserAccount.
     * @example
     * // Create one UserAccount
     * const UserAccount = await prisma.userAccount.create({
     *   data: {
     *     // ... data to create a UserAccount
     *   }
     * })
     * 
    **/
    create<T extends UserAccountCreateArgs>(
      args: SelectSubset<T, UserAccountCreateArgs>
    ): CheckSelect<T, Prisma__UserAccountClient<UserAccount>, Prisma__UserAccountClient<UserAccountGetPayload<T>>>

    /**
     * Create many UserAccounts.
     *     @param {UserAccountCreateManyArgs} args - Arguments to create many UserAccounts.
     *     @example
     *     // Create many UserAccounts
     *     const userAccount = await prisma.userAccount.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserAccountCreateManyArgs>(
      args?: SelectSubset<T, UserAccountCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a UserAccount.
     * @param {UserAccountDeleteArgs} args - Arguments to delete one UserAccount.
     * @example
     * // Delete one UserAccount
     * const UserAccount = await prisma.userAccount.delete({
     *   where: {
     *     // ... filter to delete one UserAccount
     *   }
     * })
     * 
    **/
    delete<T extends UserAccountDeleteArgs>(
      args: SelectSubset<T, UserAccountDeleteArgs>
    ): CheckSelect<T, Prisma__UserAccountClient<UserAccount>, Prisma__UserAccountClient<UserAccountGetPayload<T>>>

    /**
     * Update one UserAccount.
     * @param {UserAccountUpdateArgs} args - Arguments to update one UserAccount.
     * @example
     * // Update one UserAccount
     * const userAccount = await prisma.userAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserAccountUpdateArgs>(
      args: SelectSubset<T, UserAccountUpdateArgs>
    ): CheckSelect<T, Prisma__UserAccountClient<UserAccount>, Prisma__UserAccountClient<UserAccountGetPayload<T>>>

    /**
     * Delete zero or more UserAccounts.
     * @param {UserAccountDeleteManyArgs} args - Arguments to filter UserAccounts to delete.
     * @example
     * // Delete a few UserAccounts
     * const { count } = await prisma.userAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserAccountDeleteManyArgs>(
      args?: SelectSubset<T, UserAccountDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserAccounts
     * const userAccount = await prisma.userAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserAccountUpdateManyArgs>(
      args: SelectSubset<T, UserAccountUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one UserAccount.
     * @param {UserAccountUpsertArgs} args - Arguments to update or create a UserAccount.
     * @example
     * // Update or create a UserAccount
     * const userAccount = await prisma.userAccount.upsert({
     *   create: {
     *     // ... data to create a UserAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserAccount we want to update
     *   }
     * })
    **/
    upsert<T extends UserAccountUpsertArgs>(
      args: SelectSubset<T, UserAccountUpsertArgs>
    ): CheckSelect<T, Prisma__UserAccountClient<UserAccount>, Prisma__UserAccountClient<UserAccountGetPayload<T>>>

    /**
     * Find zero or more UserAccounts that matches the filter.
     * @param {UserAccountFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const userAccount = await prisma.userAccount.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: UserAccountFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a UserAccount.
     * @param {UserAccountAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const userAccount = await prisma.userAccount.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: UserAccountAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Find one UserAccount that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {UserAccountFindUniqueOrThrowArgs} args - Arguments to find a UserAccount
     * @example
     * // Get one UserAccount
     * const userAccount = await prisma.userAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserAccountFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserAccountFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__UserAccountClient<UserAccount>, Prisma__UserAccountClient<UserAccountGetPayload<T>>>

    /**
     * Find the first UserAccount that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountFindFirstOrThrowArgs} args - Arguments to find a UserAccount
     * @example
     * // Get one UserAccount
     * const userAccount = await prisma.userAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserAccountFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserAccountFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__UserAccountClient<UserAccount>, Prisma__UserAccountClient<UserAccountGetPayload<T>>>

    /**
     * Count the number of UserAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountCountArgs} args - Arguments to filter UserAccounts to count.
     * @example
     * // Count the number of UserAccounts
     * const count = await prisma.userAccount.count({
     *   where: {
     *     // ... the filter for the UserAccounts we want to count
     *   }
     * })
    **/
    count<T extends UserAccountCountArgs>(
      args?: Subset<T, UserAccountCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
      ? T['select'] extends true
      ? number
      : GetScalarType<T['select'], UserAccountCountAggregateOutputType>
      : number
    >

    /**
     * Allows you to perform aggregations operations on a UserAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAccountAggregateArgs>(args: Subset<T, UserAccountAggregateArgs>): PrismaPromise<GetUserAccountAggregateType<T>>

    /**
     * Group by UserAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAccountGroupByArgs} args - Group by arguments.
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
      T extends UserAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
      ? { orderBy: UserAccountGroupByArgs['orderBy'] }
      : { orderBy?: UserAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, UserAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserAccountGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for UserAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  class Prisma__UserAccountClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * UserAccount base type for findUnique actions
   */
  type UserAccountFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the UserAccount
     * 
    **/
    select?: UserAccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserAccountInclude | null
    /**
     * Filter, which UserAccount to fetch.
     * 
    **/
    where: UserAccountWhereUniqueInput
  }

  /**
   * UserAccount: findUnique
   */
  interface UserAccountFindUniqueArgs extends UserAccountFindUniqueArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * UserAccount base type for findFirst actions
   */
  type UserAccountFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the UserAccount
     * 
    **/
    select?: UserAccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserAccountInclude | null
    /**
     * Filter, which UserAccount to fetch.
     * 
    **/
    where?: UserAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAccounts to fetch.
     * 
    **/
    orderBy?: Enumerable<UserAccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAccounts.
     * 
    **/
    cursor?: UserAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAccounts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAccounts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAccounts.
     * 
    **/
    distinct?: Enumerable<UserAccountScalarFieldEnum>
  }

  /**
   * UserAccount: findFirst
   */
  interface UserAccountFindFirstArgs extends UserAccountFindFirstArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * UserAccount findMany
   */
  type UserAccountFindManyArgs = {
    /**
     * Select specific fields to fetch from the UserAccount
     * 
    **/
    select?: UserAccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserAccountInclude | null
    /**
     * Filter, which UserAccounts to fetch.
     * 
    **/
    where?: UserAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAccounts to fetch.
     * 
    **/
    orderBy?: Enumerable<UserAccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserAccounts.
     * 
    **/
    cursor?: UserAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAccounts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAccounts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserAccountScalarFieldEnum>
  }


  /**
   * UserAccount create
   */
  type UserAccountCreateArgs = {
    /**
     * Select specific fields to fetch from the UserAccount
     * 
    **/
    select?: UserAccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserAccountInclude | null
    /**
     * The data needed to create a UserAccount.
     * 
    **/
    data: XOR<UserAccountCreateInput, UserAccountUncheckedCreateInput>
  }


  /**
   * UserAccount createMany
   */
  type UserAccountCreateManyArgs = {
    /**
     * The data used to create many UserAccounts.
     * 
    **/
    data: Enumerable<UserAccountCreateManyInput>
  }


  /**
   * UserAccount update
   */
  type UserAccountUpdateArgs = {
    /**
     * Select specific fields to fetch from the UserAccount
     * 
    **/
    select?: UserAccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserAccountInclude | null
    /**
     * The data needed to update a UserAccount.
     * 
    **/
    data: XOR<UserAccountUpdateInput, UserAccountUncheckedUpdateInput>
    /**
     * Choose, which UserAccount to update.
     * 
    **/
    where: UserAccountWhereUniqueInput
  }


  /**
   * UserAccount updateMany
   */
  type UserAccountUpdateManyArgs = {
    /**
     * The data used to update UserAccounts.
     * 
    **/
    data: XOR<UserAccountUpdateManyMutationInput, UserAccountUncheckedUpdateManyInput>
    /**
     * Filter which UserAccounts to update
     * 
    **/
    where?: UserAccountWhereInput
  }


  /**
   * UserAccount upsert
   */
  type UserAccountUpsertArgs = {
    /**
     * Select specific fields to fetch from the UserAccount
     * 
    **/
    select?: UserAccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserAccountInclude | null
    /**
     * The filter to search for the UserAccount to update in case it exists.
     * 
    **/
    where: UserAccountWhereUniqueInput
    /**
     * In case the UserAccount found by the `where` argument doesn't exist, create a new UserAccount with this data.
     * 
    **/
    create: XOR<UserAccountCreateInput, UserAccountUncheckedCreateInput>
    /**
     * In case the UserAccount was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserAccountUpdateInput, UserAccountUncheckedUpdateInput>
  }


  /**
   * UserAccount delete
   */
  type UserAccountDeleteArgs = {
    /**
     * Select specific fields to fetch from the UserAccount
     * 
    **/
    select?: UserAccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserAccountInclude | null
    /**
     * Filter which UserAccount to delete.
     * 
    **/
    where: UserAccountWhereUniqueInput
  }


  /**
   * UserAccount deleteMany
   */
  type UserAccountDeleteManyArgs = {
    /**
     * Filter which UserAccounts to delete
     * 
    **/
    where?: UserAccountWhereInput
  }


  /**
   * UserAccount findRaw
   */
  type UserAccountFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * UserAccount aggregateRaw
   */
  type UserAccountAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * UserAccount: findUniqueOrThrow
   */
  type UserAccountFindUniqueOrThrowArgs = UserAccountFindUniqueArgsBase


  /**
   * UserAccount: findFirstOrThrow
   */
  type UserAccountFindFirstOrThrowArgs = UserAccountFindFirstArgsBase


  /**
   * UserAccount without action
   */
  type UserAccountArgs = {
    /**
     * Select specific fields to fetch from the UserAccount
     * 
    **/
    select?: UserAccountSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserAccountInclude | null
  }



  /**
   * Model BusinessAccount
   */


  type AggregateBusinessAccount = {
    _count: BusinessAccountCountAggregateOutputType | null
    _min: BusinessAccountMinAggregateOutputType | null
    _max: BusinessAccountMaxAggregateOutputType | null
  }

  type BusinessAccountMinAggregateOutputType = {
    id: string | null
    name: string | null
    cuit: string | null
    location: string | null
    address: string | null
    image: string | null
    firmEmail: string | null
    cellphone: string | null
    businessType: BusinessType | null
  }

  type BusinessAccountMaxAggregateOutputType = {
    id: string | null
    name: string | null
    cuit: string | null
    location: string | null
    address: string | null
    image: string | null
    firmEmail: string | null
    cellphone: string | null
    businessType: BusinessType | null
  }

  type BusinessAccountCountAggregateOutputType = {
    id: number
    name: number
    cuit: number
    location: number
    address: number
    image: number
    firmEmail: number
    cellphone: number
    businessType: number
    _all: number
  }


  type BusinessAccountMinAggregateInputType = {
    id?: true
    name?: true
    cuit?: true
    location?: true
    address?: true
    image?: true
    firmEmail?: true
    cellphone?: true
    businessType?: true
  }

  type BusinessAccountMaxAggregateInputType = {
    id?: true
    name?: true
    cuit?: true
    location?: true
    address?: true
    image?: true
    firmEmail?: true
    cellphone?: true
    businessType?: true
  }

  type BusinessAccountCountAggregateInputType = {
    id?: true
    name?: true
    cuit?: true
    location?: true
    address?: true
    image?: true
    firmEmail?: true
    cellphone?: true
    businessType?: true
    _all?: true
  }

  type BusinessAccountAggregateArgs = {
    /**
     * Filter which BusinessAccount to aggregate.
     * 
    **/
    where?: BusinessAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessAccounts to fetch.
     * 
    **/
    orderBy?: Enumerable<BusinessAccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: BusinessAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessAccounts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessAccounts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BusinessAccounts
    **/
    _count?: true | BusinessAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BusinessAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BusinessAccountMaxAggregateInputType
  }

  type GetBusinessAccountAggregateType<T extends BusinessAccountAggregateArgs> = {
    [P in keyof T & keyof AggregateBusinessAccount]: P extends '_count' | 'count'
    ? T[P] extends true
    ? number
    : GetScalarType<T[P], AggregateBusinessAccount[P]>
    : GetScalarType<T[P], AggregateBusinessAccount[P]>
  }




  type BusinessAccountGroupByArgs = {
    where?: BusinessAccountWhereInput
    orderBy?: Enumerable<BusinessAccountOrderByWithAggregationInput>
    by: Array<BusinessAccountScalarFieldEnum>
    having?: BusinessAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BusinessAccountCountAggregateInputType | true
    _min?: BusinessAccountMinAggregateInputType
    _max?: BusinessAccountMaxAggregateInputType
  }


  type BusinessAccountGroupByOutputType = {
    id: string
    name: string
    cuit: string | null
    location: string
    address: string | null
    image: string | null
    firmEmail: string | null
    cellphone: string | null
    businessType: BusinessType
    _count: BusinessAccountCountAggregateOutputType | null
    _min: BusinessAccountMinAggregateOutputType | null
    _max: BusinessAccountMaxAggregateOutputType | null
  }

  type GetBusinessAccountGroupByPayload<T extends BusinessAccountGroupByArgs> = PrismaPromise<
    Array<
      PickArray<BusinessAccountGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof BusinessAccountGroupByOutputType))]: P extends '_count'
        ? T[P] extends boolean
        ? number
        : GetScalarType<T[P], BusinessAccountGroupByOutputType[P]>
        : GetScalarType<T[P], BusinessAccountGroupByOutputType[P]>
      }
    >
  >


  type BusinessAccountSelect = {
    id?: boolean
    name?: boolean
    cuit?: boolean
    location?: boolean
    address?: boolean
    image?: boolean
    firmEmail?: boolean
    cellphone?: boolean
    businessType?: boolean
  }

  type BusinessAccountGetPayload<
    S extends boolean | null | undefined | BusinessAccountArgs,
    U = keyof S
  > = S extends true
    ? BusinessAccount
    : S extends undefined
    ? never
    : S extends BusinessAccountArgs | BusinessAccountFindManyArgs
    ? 'include' extends U
    ? BusinessAccount
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends keyof BusinessAccount ? BusinessAccount[P] : never
    }
    : BusinessAccount
    : BusinessAccount


  type BusinessAccountCountArgs = Merge<
    Omit<BusinessAccountFindManyArgs, 'select' | 'include'> & {
      select?: BusinessAccountCountAggregateInputType | true
    }
  >

  interface BusinessAccountDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one BusinessAccount that matches the filter.
     * @param {BusinessAccountFindUniqueArgs} args - Arguments to find a BusinessAccount
     * @example
     * // Get one BusinessAccount
     * const businessAccount = await prisma.businessAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends BusinessAccountFindUniqueArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, BusinessAccountFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'BusinessAccount'> extends True ? CheckSelect<T, Prisma__BusinessAccountClient<BusinessAccount>, Prisma__BusinessAccountClient<BusinessAccountGetPayload<T>>> : CheckSelect<T, Prisma__BusinessAccountClient<BusinessAccount | null, null>, Prisma__BusinessAccountClient<BusinessAccountGetPayload<T> | null, null>>

    /**
     * Find the first BusinessAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessAccountFindFirstArgs} args - Arguments to find a BusinessAccount
     * @example
     * // Get one BusinessAccount
     * const businessAccount = await prisma.businessAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends BusinessAccountFindFirstArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, BusinessAccountFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'BusinessAccount'> extends True ? CheckSelect<T, Prisma__BusinessAccountClient<BusinessAccount>, Prisma__BusinessAccountClient<BusinessAccountGetPayload<T>>> : CheckSelect<T, Prisma__BusinessAccountClient<BusinessAccount | null, null>, Prisma__BusinessAccountClient<BusinessAccountGetPayload<T> | null, null>>

    /**
     * Find zero or more BusinessAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessAccountFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BusinessAccounts
     * const businessAccounts = await prisma.businessAccount.findMany()
     * 
     * // Get first 10 BusinessAccounts
     * const businessAccounts = await prisma.businessAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const businessAccountWithIdOnly = await prisma.businessAccount.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends BusinessAccountFindManyArgs>(
      args?: SelectSubset<T, BusinessAccountFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<BusinessAccount>>, PrismaPromise<Array<BusinessAccountGetPayload<T>>>>

    /**
     * Create a BusinessAccount.
     * @param {BusinessAccountCreateArgs} args - Arguments to create a BusinessAccount.
     * @example
     * // Create one BusinessAccount
     * const BusinessAccount = await prisma.businessAccount.create({
     *   data: {
     *     // ... data to create a BusinessAccount
     *   }
     * })
     * 
    **/
    create<T extends BusinessAccountCreateArgs>(
      args: SelectSubset<T, BusinessAccountCreateArgs>
    ): CheckSelect<T, Prisma__BusinessAccountClient<BusinessAccount>, Prisma__BusinessAccountClient<BusinessAccountGetPayload<T>>>

    /**
     * Create many BusinessAccounts.
     *     @param {BusinessAccountCreateManyArgs} args - Arguments to create many BusinessAccounts.
     *     @example
     *     // Create many BusinessAccounts
     *     const businessAccount = await prisma.businessAccount.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends BusinessAccountCreateManyArgs>(
      args?: SelectSubset<T, BusinessAccountCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a BusinessAccount.
     * @param {BusinessAccountDeleteArgs} args - Arguments to delete one BusinessAccount.
     * @example
     * // Delete one BusinessAccount
     * const BusinessAccount = await prisma.businessAccount.delete({
     *   where: {
     *     // ... filter to delete one BusinessAccount
     *   }
     * })
     * 
    **/
    delete<T extends BusinessAccountDeleteArgs>(
      args: SelectSubset<T, BusinessAccountDeleteArgs>
    ): CheckSelect<T, Prisma__BusinessAccountClient<BusinessAccount>, Prisma__BusinessAccountClient<BusinessAccountGetPayload<T>>>

    /**
     * Update one BusinessAccount.
     * @param {BusinessAccountUpdateArgs} args - Arguments to update one BusinessAccount.
     * @example
     * // Update one BusinessAccount
     * const businessAccount = await prisma.businessAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends BusinessAccountUpdateArgs>(
      args: SelectSubset<T, BusinessAccountUpdateArgs>
    ): CheckSelect<T, Prisma__BusinessAccountClient<BusinessAccount>, Prisma__BusinessAccountClient<BusinessAccountGetPayload<T>>>

    /**
     * Delete zero or more BusinessAccounts.
     * @param {BusinessAccountDeleteManyArgs} args - Arguments to filter BusinessAccounts to delete.
     * @example
     * // Delete a few BusinessAccounts
     * const { count } = await prisma.businessAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends BusinessAccountDeleteManyArgs>(
      args?: SelectSubset<T, BusinessAccountDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more BusinessAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BusinessAccounts
     * const businessAccount = await prisma.businessAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends BusinessAccountUpdateManyArgs>(
      args: SelectSubset<T, BusinessAccountUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one BusinessAccount.
     * @param {BusinessAccountUpsertArgs} args - Arguments to update or create a BusinessAccount.
     * @example
     * // Update or create a BusinessAccount
     * const businessAccount = await prisma.businessAccount.upsert({
     *   create: {
     *     // ... data to create a BusinessAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BusinessAccount we want to update
     *   }
     * })
    **/
    upsert<T extends BusinessAccountUpsertArgs>(
      args: SelectSubset<T, BusinessAccountUpsertArgs>
    ): CheckSelect<T, Prisma__BusinessAccountClient<BusinessAccount>, Prisma__BusinessAccountClient<BusinessAccountGetPayload<T>>>

    /**
     * Find zero or more BusinessAccounts that matches the filter.
     * @param {BusinessAccountFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const businessAccount = await prisma.businessAccount.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: BusinessAccountFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a BusinessAccount.
     * @param {BusinessAccountAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const businessAccount = await prisma.businessAccount.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: BusinessAccountAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Find one BusinessAccount that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {BusinessAccountFindUniqueOrThrowArgs} args - Arguments to find a BusinessAccount
     * @example
     * // Get one BusinessAccount
     * const businessAccount = await prisma.businessAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends BusinessAccountFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, BusinessAccountFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__BusinessAccountClient<BusinessAccount>, Prisma__BusinessAccountClient<BusinessAccountGetPayload<T>>>

    /**
     * Find the first BusinessAccount that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessAccountFindFirstOrThrowArgs} args - Arguments to find a BusinessAccount
     * @example
     * // Get one BusinessAccount
     * const businessAccount = await prisma.businessAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends BusinessAccountFindFirstOrThrowArgs>(
      args?: SelectSubset<T, BusinessAccountFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__BusinessAccountClient<BusinessAccount>, Prisma__BusinessAccountClient<BusinessAccountGetPayload<T>>>

    /**
     * Count the number of BusinessAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessAccountCountArgs} args - Arguments to filter BusinessAccounts to count.
     * @example
     * // Count the number of BusinessAccounts
     * const count = await prisma.businessAccount.count({
     *   where: {
     *     // ... the filter for the BusinessAccounts we want to count
     *   }
     * })
    **/
    count<T extends BusinessAccountCountArgs>(
      args?: Subset<T, BusinessAccountCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
      ? T['select'] extends true
      ? number
      : GetScalarType<T['select'], BusinessAccountCountAggregateOutputType>
      : number
    >

    /**
     * Allows you to perform aggregations operations on a BusinessAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BusinessAccountAggregateArgs>(args: Subset<T, BusinessAccountAggregateArgs>): PrismaPromise<GetBusinessAccountAggregateType<T>>

    /**
     * Group by BusinessAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BusinessAccountGroupByArgs} args - Group by arguments.
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
      T extends BusinessAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
      ? { orderBy: BusinessAccountGroupByArgs['orderBy'] }
      : { orderBy?: BusinessAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, BusinessAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBusinessAccountGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for BusinessAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  class Prisma__BusinessAccountClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * BusinessAccount base type for findUnique actions
   */
  type BusinessAccountFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the BusinessAccount
     * 
    **/
    select?: BusinessAccountSelect | null
    /**
     * Filter, which BusinessAccount to fetch.
     * 
    **/
    where: BusinessAccountWhereUniqueInput
  }

  /**
   * BusinessAccount: findUnique
   */
  interface BusinessAccountFindUniqueArgs extends BusinessAccountFindUniqueArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * BusinessAccount base type for findFirst actions
   */
  type BusinessAccountFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the BusinessAccount
     * 
    **/
    select?: BusinessAccountSelect | null
    /**
     * Filter, which BusinessAccount to fetch.
     * 
    **/
    where?: BusinessAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessAccounts to fetch.
     * 
    **/
    orderBy?: Enumerable<BusinessAccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BusinessAccounts.
     * 
    **/
    cursor?: BusinessAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessAccounts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessAccounts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BusinessAccounts.
     * 
    **/
    distinct?: Enumerable<BusinessAccountScalarFieldEnum>
  }

  /**
   * BusinessAccount: findFirst
   */
  interface BusinessAccountFindFirstArgs extends BusinessAccountFindFirstArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * BusinessAccount findMany
   */
  type BusinessAccountFindManyArgs = {
    /**
     * Select specific fields to fetch from the BusinessAccount
     * 
    **/
    select?: BusinessAccountSelect | null
    /**
     * Filter, which BusinessAccounts to fetch.
     * 
    **/
    where?: BusinessAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BusinessAccounts to fetch.
     * 
    **/
    orderBy?: Enumerable<BusinessAccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BusinessAccounts.
     * 
    **/
    cursor?: BusinessAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BusinessAccounts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BusinessAccounts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<BusinessAccountScalarFieldEnum>
  }


  /**
   * BusinessAccount create
   */
  type BusinessAccountCreateArgs = {
    /**
     * Select specific fields to fetch from the BusinessAccount
     * 
    **/
    select?: BusinessAccountSelect | null
    /**
     * The data needed to create a BusinessAccount.
     * 
    **/
    data: XOR<BusinessAccountCreateInput, BusinessAccountUncheckedCreateInput>
  }


  /**
   * BusinessAccount createMany
   */
  type BusinessAccountCreateManyArgs = {
    /**
     * The data used to create many BusinessAccounts.
     * 
    **/
    data: Enumerable<BusinessAccountCreateManyInput>
  }


  /**
   * BusinessAccount update
   */
  type BusinessAccountUpdateArgs = {
    /**
     * Select specific fields to fetch from the BusinessAccount
     * 
    **/
    select?: BusinessAccountSelect | null
    /**
     * The data needed to update a BusinessAccount.
     * 
    **/
    data: XOR<BusinessAccountUpdateInput, BusinessAccountUncheckedUpdateInput>
    /**
     * Choose, which BusinessAccount to update.
     * 
    **/
    where: BusinessAccountWhereUniqueInput
  }


  /**
   * BusinessAccount updateMany
   */
  type BusinessAccountUpdateManyArgs = {
    /**
     * The data used to update BusinessAccounts.
     * 
    **/
    data: XOR<BusinessAccountUpdateManyMutationInput, BusinessAccountUncheckedUpdateManyInput>
    /**
     * Filter which BusinessAccounts to update
     * 
    **/
    where?: BusinessAccountWhereInput
  }


  /**
   * BusinessAccount upsert
   */
  type BusinessAccountUpsertArgs = {
    /**
     * Select specific fields to fetch from the BusinessAccount
     * 
    **/
    select?: BusinessAccountSelect | null
    /**
     * The filter to search for the BusinessAccount to update in case it exists.
     * 
    **/
    where: BusinessAccountWhereUniqueInput
    /**
     * In case the BusinessAccount found by the `where` argument doesn't exist, create a new BusinessAccount with this data.
     * 
    **/
    create: XOR<BusinessAccountCreateInput, BusinessAccountUncheckedCreateInput>
    /**
     * In case the BusinessAccount was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<BusinessAccountUpdateInput, BusinessAccountUncheckedUpdateInput>
  }


  /**
   * BusinessAccount delete
   */
  type BusinessAccountDeleteArgs = {
    /**
     * Select specific fields to fetch from the BusinessAccount
     * 
    **/
    select?: BusinessAccountSelect | null
    /**
     * Filter which BusinessAccount to delete.
     * 
    **/
    where: BusinessAccountWhereUniqueInput
  }


  /**
   * BusinessAccount deleteMany
   */
  type BusinessAccountDeleteManyArgs = {
    /**
     * Filter which BusinessAccounts to delete
     * 
    **/
    where?: BusinessAccountWhereInput
  }


  /**
   * BusinessAccount findRaw
   */
  type BusinessAccountFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * BusinessAccount aggregateRaw
   */
  type BusinessAccountAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * BusinessAccount: findUniqueOrThrow
   */
  type BusinessAccountFindUniqueOrThrowArgs = BusinessAccountFindUniqueArgsBase


  /**
   * BusinessAccount: findFirstOrThrow
   */
  type BusinessAccountFindFirstOrThrowArgs = BusinessAccountFindFirstArgsBase


  /**
   * BusinessAccount without action
   */
  type BusinessAccountArgs = {
    /**
     * Select specific fields to fetch from the BusinessAccount
     * 
    **/
    select?: BusinessAccountSelect | null
  }



  /**
   * Model Budget
   */


  type AggregateBudget = {
    _count: BudgetCountAggregateOutputType | null
    _avg: BudgetAvgAggregateOutputType | null
    _sum: BudgetSumAggregateOutputType | null
    _min: BudgetMinAggregateOutputType | null
    _max: BudgetMaxAggregateOutputType | null
  }

  type BudgetAvgAggregateOutputType = {
    total: number | null
  }

  type BudgetSumAggregateOutputType = {
    total: number | null
  }

  type BudgetMinAggregateOutputType = {
    id: string | null
    ExpenseCategoryId: string | null
    startingDate: Date | null
    endingDate: Date | null
    total: number | null
    userId: string | null
  }

  type BudgetMaxAggregateOutputType = {
    id: string | null
    ExpenseCategoryId: string | null
    startingDate: Date | null
    endingDate: Date | null
    total: number | null
    userId: string | null
  }

  type BudgetCountAggregateOutputType = {
    id: number
    ExpenseCategoryId: number
    startingDate: number
    endingDate: number
    total: number
    userId: number
    _all: number
  }


  type BudgetAvgAggregateInputType = {
    total?: true
  }

  type BudgetSumAggregateInputType = {
    total?: true
  }

  type BudgetMinAggregateInputType = {
    id?: true
    ExpenseCategoryId?: true
    startingDate?: true
    endingDate?: true
    total?: true
    userId?: true
  }

  type BudgetMaxAggregateInputType = {
    id?: true
    ExpenseCategoryId?: true
    startingDate?: true
    endingDate?: true
    total?: true
    userId?: true
  }

  type BudgetCountAggregateInputType = {
    id?: true
    ExpenseCategoryId?: true
    startingDate?: true
    endingDate?: true
    total?: true
    userId?: true
    _all?: true
  }

  type BudgetAggregateArgs = {
    /**
     * Filter which Budget to aggregate.
     * 
    **/
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     * 
    **/
    orderBy?: Enumerable<BudgetOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Budgets
    **/
    _count?: true | BudgetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BudgetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BudgetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BudgetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BudgetMaxAggregateInputType
  }

  type GetBudgetAggregateType<T extends BudgetAggregateArgs> = {
    [P in keyof T & keyof AggregateBudget]: P extends '_count' | 'count'
    ? T[P] extends true
    ? number
    : GetScalarType<T[P], AggregateBudget[P]>
    : GetScalarType<T[P], AggregateBudget[P]>
  }




  type BudgetGroupByArgs = {
    where?: BudgetWhereInput
    orderBy?: Enumerable<BudgetOrderByWithAggregationInput>
    by: Array<BudgetScalarFieldEnum>
    having?: BudgetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BudgetCountAggregateInputType | true
    _avg?: BudgetAvgAggregateInputType
    _sum?: BudgetSumAggregateInputType
    _min?: BudgetMinAggregateInputType
    _max?: BudgetMaxAggregateInputType
  }


  type BudgetGroupByOutputType = {
    id: string
    ExpenseCategoryId: string
    startingDate: Date
    endingDate: Date
    total: number
    userId: string
    _count: BudgetCountAggregateOutputType | null
    _avg: BudgetAvgAggregateOutputType | null
    _sum: BudgetSumAggregateOutputType | null
    _min: BudgetMinAggregateOutputType | null
    _max: BudgetMaxAggregateOutputType | null
  }

  type GetBudgetGroupByPayload<T extends BudgetGroupByArgs> = PrismaPromise<
    Array<
      PickArray<BudgetGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof BudgetGroupByOutputType))]: P extends '_count'
        ? T[P] extends boolean
        ? number
        : GetScalarType<T[P], BudgetGroupByOutputType[P]>
        : GetScalarType<T[P], BudgetGroupByOutputType[P]>
      }
    >
  >


  type BudgetSelect = {
    id?: boolean
    ExpenseCategory?: boolean | ExpenseCategoryArgs
    ExpenseCategoryId?: boolean
    startingDate?: boolean
    endingDate?: boolean
    total?: boolean
    User?: boolean | UserArgs
    userId?: boolean
  }

  type BudgetInclude = {
    ExpenseCategory?: boolean | ExpenseCategoryArgs
    User?: boolean | UserArgs
  }

  type BudgetGetPayload<
    S extends boolean | null | undefined | BudgetArgs,
    U = keyof S
  > = S extends true
    ? Budget
    : S extends undefined
    ? never
    : S extends BudgetArgs | BudgetFindManyArgs
    ? 'include' extends U
    ? Budget & {
      [P in TrueKeys<S['include']>]:
      P extends 'ExpenseCategory' ? ExpenseCategoryGetPayload<Exclude<S['include'], undefined | null>[P]> :
      P extends 'User' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> : never
    }
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends 'ExpenseCategory' ? ExpenseCategoryGetPayload<Exclude<S['select'], undefined | null>[P]> :
      P extends 'User' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> : P extends keyof Budget ? Budget[P] : never
    }
    : Budget
    : Budget


  type BudgetCountArgs = Merge<
    Omit<BudgetFindManyArgs, 'select' | 'include'> & {
      select?: BudgetCountAggregateInputType | true
    }
  >

  interface BudgetDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Budget that matches the filter.
     * @param {BudgetFindUniqueArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends BudgetFindUniqueArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, BudgetFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Budget'> extends True ? CheckSelect<T, Prisma__BudgetClient<Budget>, Prisma__BudgetClient<BudgetGetPayload<T>>> : CheckSelect<T, Prisma__BudgetClient<Budget | null, null>, Prisma__BudgetClient<BudgetGetPayload<T> | null, null>>

    /**
     * Find the first Budget that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindFirstArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends BudgetFindFirstArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, BudgetFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Budget'> extends True ? CheckSelect<T, Prisma__BudgetClient<Budget>, Prisma__BudgetClient<BudgetGetPayload<T>>> : CheckSelect<T, Prisma__BudgetClient<Budget | null, null>, Prisma__BudgetClient<BudgetGetPayload<T> | null, null>>

    /**
     * Find zero or more Budgets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Budgets
     * const budgets = await prisma.budget.findMany()
     * 
     * // Get first 10 Budgets
     * const budgets = await prisma.budget.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const budgetWithIdOnly = await prisma.budget.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends BudgetFindManyArgs>(
      args?: SelectSubset<T, BudgetFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Budget>>, PrismaPromise<Array<BudgetGetPayload<T>>>>

    /**
     * Create a Budget.
     * @param {BudgetCreateArgs} args - Arguments to create a Budget.
     * @example
     * // Create one Budget
     * const Budget = await prisma.budget.create({
     *   data: {
     *     // ... data to create a Budget
     *   }
     * })
     * 
    **/
    create<T extends BudgetCreateArgs>(
      args: SelectSubset<T, BudgetCreateArgs>
    ): CheckSelect<T, Prisma__BudgetClient<Budget>, Prisma__BudgetClient<BudgetGetPayload<T>>>

    /**
     * Create many Budgets.
     *     @param {BudgetCreateManyArgs} args - Arguments to create many Budgets.
     *     @example
     *     // Create many Budgets
     *     const budget = await prisma.budget.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends BudgetCreateManyArgs>(
      args?: SelectSubset<T, BudgetCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Budget.
     * @param {BudgetDeleteArgs} args - Arguments to delete one Budget.
     * @example
     * // Delete one Budget
     * const Budget = await prisma.budget.delete({
     *   where: {
     *     // ... filter to delete one Budget
     *   }
     * })
     * 
    **/
    delete<T extends BudgetDeleteArgs>(
      args: SelectSubset<T, BudgetDeleteArgs>
    ): CheckSelect<T, Prisma__BudgetClient<Budget>, Prisma__BudgetClient<BudgetGetPayload<T>>>

    /**
     * Update one Budget.
     * @param {BudgetUpdateArgs} args - Arguments to update one Budget.
     * @example
     * // Update one Budget
     * const budget = await prisma.budget.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends BudgetUpdateArgs>(
      args: SelectSubset<T, BudgetUpdateArgs>
    ): CheckSelect<T, Prisma__BudgetClient<Budget>, Prisma__BudgetClient<BudgetGetPayload<T>>>

    /**
     * Delete zero or more Budgets.
     * @param {BudgetDeleteManyArgs} args - Arguments to filter Budgets to delete.
     * @example
     * // Delete a few Budgets
     * const { count } = await prisma.budget.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends BudgetDeleteManyArgs>(
      args?: SelectSubset<T, BudgetDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Budgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Budgets
     * const budget = await prisma.budget.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends BudgetUpdateManyArgs>(
      args: SelectSubset<T, BudgetUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Budget.
     * @param {BudgetUpsertArgs} args - Arguments to update or create a Budget.
     * @example
     * // Update or create a Budget
     * const budget = await prisma.budget.upsert({
     *   create: {
     *     // ... data to create a Budget
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Budget we want to update
     *   }
     * })
    **/
    upsert<T extends BudgetUpsertArgs>(
      args: SelectSubset<T, BudgetUpsertArgs>
    ): CheckSelect<T, Prisma__BudgetClient<Budget>, Prisma__BudgetClient<BudgetGetPayload<T>>>

    /**
     * Find zero or more Budgets that matches the filter.
     * @param {BudgetFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const budget = await prisma.budget.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: BudgetFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Budget.
     * @param {BudgetAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const budget = await prisma.budget.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: BudgetAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Find one Budget that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {BudgetFindUniqueOrThrowArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends BudgetFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, BudgetFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__BudgetClient<Budget>, Prisma__BudgetClient<BudgetGetPayload<T>>>

    /**
     * Find the first Budget that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetFindFirstOrThrowArgs} args - Arguments to find a Budget
     * @example
     * // Get one Budget
     * const budget = await prisma.budget.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends BudgetFindFirstOrThrowArgs>(
      args?: SelectSubset<T, BudgetFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__BudgetClient<Budget>, Prisma__BudgetClient<BudgetGetPayload<T>>>

    /**
     * Count the number of Budgets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetCountArgs} args - Arguments to filter Budgets to count.
     * @example
     * // Count the number of Budgets
     * const count = await prisma.budget.count({
     *   where: {
     *     // ... the filter for the Budgets we want to count
     *   }
     * })
    **/
    count<T extends BudgetCountArgs>(
      args?: Subset<T, BudgetCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
      ? T['select'] extends true
      ? number
      : GetScalarType<T['select'], BudgetCountAggregateOutputType>
      : number
    >

    /**
     * Allows you to perform aggregations operations on a Budget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BudgetAggregateArgs>(args: Subset<T, BudgetAggregateArgs>): PrismaPromise<GetBudgetAggregateType<T>>

    /**
     * Group by Budget.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BudgetGroupByArgs} args - Group by arguments.
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
      T extends BudgetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
      ? { orderBy: BudgetGroupByArgs['orderBy'] }
      : { orderBy?: BudgetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, BudgetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBudgetGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Budget.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  class Prisma__BudgetClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    ExpenseCategory<T extends ExpenseCategoryArgs = {}>(args?: Subset<T, ExpenseCategoryArgs>): CheckSelect<T, Prisma__ExpenseCategoryClient<ExpenseCategory | Null>, Prisma__ExpenseCategoryClient<ExpenseCategoryGetPayload<T> | Null>>;

    User<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Budget base type for findUnique actions
   */
  type BudgetFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Budget
     * 
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetInclude | null
    /**
     * Filter, which Budget to fetch.
     * 
    **/
    where: BudgetWhereUniqueInput
  }

  /**
   * Budget: findUnique
   */
  interface BudgetFindUniqueArgs extends BudgetFindUniqueArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * Budget base type for findFirst actions
   */
  type BudgetFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Budget
     * 
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetInclude | null
    /**
     * Filter, which Budget to fetch.
     * 
    **/
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     * 
    **/
    orderBy?: Enumerable<BudgetOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Budgets.
     * 
    **/
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Budgets.
     * 
    **/
    distinct?: Enumerable<BudgetScalarFieldEnum>
  }

  /**
   * Budget: findFirst
   */
  interface BudgetFindFirstArgs extends BudgetFindFirstArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * Budget findMany
   */
  type BudgetFindManyArgs = {
    /**
     * Select specific fields to fetch from the Budget
     * 
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetInclude | null
    /**
     * Filter, which Budgets to fetch.
     * 
    **/
    where?: BudgetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Budgets to fetch.
     * 
    **/
    orderBy?: Enumerable<BudgetOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Budgets.
     * 
    **/
    cursor?: BudgetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Budgets from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Budgets.
     * 
    **/
    skip?: number
    distinct?: Enumerable<BudgetScalarFieldEnum>
  }


  /**
   * Budget create
   */
  type BudgetCreateArgs = {
    /**
     * Select specific fields to fetch from the Budget
     * 
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetInclude | null
    /**
     * The data needed to create a Budget.
     * 
    **/
    data: XOR<BudgetCreateInput, BudgetUncheckedCreateInput>
  }


  /**
   * Budget createMany
   */
  type BudgetCreateManyArgs = {
    /**
     * The data used to create many Budgets.
     * 
    **/
    data: Enumerable<BudgetCreateManyInput>
  }


  /**
   * Budget update
   */
  type BudgetUpdateArgs = {
    /**
     * Select specific fields to fetch from the Budget
     * 
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetInclude | null
    /**
     * The data needed to update a Budget.
     * 
    **/
    data: XOR<BudgetUpdateInput, BudgetUncheckedUpdateInput>
    /**
     * Choose, which Budget to update.
     * 
    **/
    where: BudgetWhereUniqueInput
  }


  /**
   * Budget updateMany
   */
  type BudgetUpdateManyArgs = {
    /**
     * The data used to update Budgets.
     * 
    **/
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyInput>
    /**
     * Filter which Budgets to update
     * 
    **/
    where?: BudgetWhereInput
  }


  /**
   * Budget upsert
   */
  type BudgetUpsertArgs = {
    /**
     * Select specific fields to fetch from the Budget
     * 
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetInclude | null
    /**
     * The filter to search for the Budget to update in case it exists.
     * 
    **/
    where: BudgetWhereUniqueInput
    /**
     * In case the Budget found by the `where` argument doesn't exist, create a new Budget with this data.
     * 
    **/
    create: XOR<BudgetCreateInput, BudgetUncheckedCreateInput>
    /**
     * In case the Budget was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<BudgetUpdateInput, BudgetUncheckedUpdateInput>
  }


  /**
   * Budget delete
   */
  type BudgetDeleteArgs = {
    /**
     * Select specific fields to fetch from the Budget
     * 
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetInclude | null
    /**
     * Filter which Budget to delete.
     * 
    **/
    where: BudgetWhereUniqueInput
  }


  /**
   * Budget deleteMany
   */
  type BudgetDeleteManyArgs = {
    /**
     * Filter which Budgets to delete
     * 
    **/
    where?: BudgetWhereInput
  }


  /**
   * Budget findRaw
   */
  type BudgetFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * Budget aggregateRaw
   */
  type BudgetAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * Budget: findUniqueOrThrow
   */
  type BudgetFindUniqueOrThrowArgs = BudgetFindUniqueArgsBase


  /**
   * Budget: findFirstOrThrow
   */
  type BudgetFindFirstOrThrowArgs = BudgetFindFirstArgsBase


  /**
   * Budget without action
   */
  type BudgetArgs = {
    /**
     * Select specific fields to fetch from the Budget
     * 
    **/
    select?: BudgetSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: BudgetInclude | null
  }



  /**
   * Model Product
   */


  type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type ProductAvgAggregateOutputType = {
    retailPrice: number | null
    cost: number | null
    quantity: number | null
    stock: number | null
  }

  type ProductSumAggregateOutputType = {
    retailPrice: number | null
    cost: number | null
    quantity: number | null
    stock: number | null
  }

  type ProductMinAggregateOutputType = {
    id: string | null
    name: string | null
    retailPrice: number | null
    cost: number | null
    unit: string | null
    quantity: number | null
    image: string | null
    stock: number | null
    description: string | null
    createdAt: Date | null
    categoryId: string | null
    ownerId: string | null
    deletedAt: Date | null
  }

  type ProductMaxAggregateOutputType = {
    id: string | null
    name: string | null
    retailPrice: number | null
    cost: number | null
    unit: string | null
    quantity: number | null
    image: string | null
    stock: number | null
    description: string | null
    createdAt: Date | null
    categoryId: string | null
    ownerId: string | null
    deletedAt: Date | null
  }

  type ProductCountAggregateOutputType = {
    id: number
    name: number
    retailPrice: number
    cost: number
    unit: number
    quantity: number
    image: number
    stock: number
    description: number
    createdAt: number
    categoryId: number
    ownerId: number
    deletedAt: number
    _all: number
  }


  type ProductAvgAggregateInputType = {
    retailPrice?: true
    cost?: true
    quantity?: true
    stock?: true
  }

  type ProductSumAggregateInputType = {
    retailPrice?: true
    cost?: true
    quantity?: true
    stock?: true
  }

  type ProductMinAggregateInputType = {
    id?: true
    name?: true
    retailPrice?: true
    cost?: true
    unit?: true
    quantity?: true
    image?: true
    stock?: true
    description?: true
    createdAt?: true
    categoryId?: true
    ownerId?: true
    deletedAt?: true
  }

  type ProductMaxAggregateInputType = {
    id?: true
    name?: true
    retailPrice?: true
    cost?: true
    unit?: true
    quantity?: true
    image?: true
    stock?: true
    description?: true
    createdAt?: true
    categoryId?: true
    ownerId?: true
    deletedAt?: true
  }

  type ProductCountAggregateInputType = {
    id?: true
    name?: true
    retailPrice?: true
    cost?: true
    unit?: true
    quantity?: true
    image?: true
    stock?: true
    description?: true
    createdAt?: true
    categoryId?: true
    ownerId?: true
    deletedAt?: true
    _all?: true
  }

  type ProductAggregateArgs = {
    /**
     * Filter which Product to aggregate.
     * 
    **/
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     * 
    **/
    orderBy?: Enumerable<ProductOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  type GetProductAggregateType<T extends ProductAggregateArgs> = {
    [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
    ? T[P] extends true
    ? number
    : GetScalarType<T[P], AggregateProduct[P]>
    : GetScalarType<T[P], AggregateProduct[P]>
  }




  type ProductGroupByArgs = {
    where?: ProductWhereInput
    orderBy?: Enumerable<ProductOrderByWithAggregationInput>
    by: Array<ProductScalarFieldEnum>
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }


  type ProductGroupByOutputType = {
    id: string
    name: string
    retailPrice: number
    cost: number | null
    unit: string | null
    quantity: number | null
    image: string | null
    stock: number
    description: string | null
    createdAt: Date
    categoryId: string | null
    ownerId: string
    deletedAt: Date | null
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ProductGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
        ? T[P] extends boolean
        ? number
        : GetScalarType<T[P], ProductGroupByOutputType[P]>
        : GetScalarType<T[P], ProductGroupByOutputType[P]>
      }
    >
  >


  type ProductSelect = {
    id?: boolean
    name?: boolean
    retailPrice?: boolean
    cost?: boolean
    unit?: boolean
    quantity?: boolean
    image?: boolean
    stock?: boolean
    description?: boolean
    createdAt?: boolean
    category?: boolean | ProductCategoryArgs
    categoryId?: boolean
    owner?: boolean | UserArgs
    ownerId?: boolean
    deletedAt?: boolean
    IncomeProducts?: boolean | IncomeProductsFindManyArgs
    _count?: boolean | ProductCountOutputTypeArgs
  }

  type ProductInclude = {
    category?: boolean | ProductCategoryArgs
    owner?: boolean | UserArgs
    IncomeProducts?: boolean | IncomeProductsFindManyArgs
    _count?: boolean | ProductCountOutputTypeArgs
  }

  type ProductGetPayload<
    S extends boolean | null | undefined | ProductArgs,
    U = keyof S
  > = S extends true
    ? Product
    : S extends undefined
    ? never
    : S extends ProductArgs | ProductFindManyArgs
    ? 'include' extends U
    ? Product & {
      [P in TrueKeys<S['include']>]:
      P extends 'category' ? ProductCategoryGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
      P extends 'owner' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :
      P extends 'IncomeProducts' ? Array<IncomeProductsGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends '_count' ? ProductCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> : never
    }
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends 'category' ? ProductCategoryGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
      P extends 'owner' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :
      P extends 'IncomeProducts' ? Array<IncomeProductsGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends '_count' ? ProductCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> : P extends keyof Product ? Product[P] : never
    }
    : Product
    : Product


  type ProductCountArgs = Merge<
    Omit<ProductFindManyArgs, 'select' | 'include'> & {
      select?: ProductCountAggregateInputType | true
    }
  >

  interface ProductDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProductFindUniqueArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ProductFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Product'> extends True ? CheckSelect<T, Prisma__ProductClient<Product>, Prisma__ProductClient<ProductGetPayload<T>>> : CheckSelect<T, Prisma__ProductClient<Product | null, null>, Prisma__ProductClient<ProductGetPayload<T> | null, null>>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProductFindFirstArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ProductFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Product'> extends True ? CheckSelect<T, Prisma__ProductClient<Product>, Prisma__ProductClient<ProductGetPayload<T>>> : CheckSelect<T, Prisma__ProductClient<Product | null, null>, Prisma__ProductClient<ProductGetPayload<T> | null, null>>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ProductFindManyArgs>(
      args?: SelectSubset<T, ProductFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Product>>, PrismaPromise<Array<ProductGetPayload<T>>>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
    **/
    create<T extends ProductCreateArgs>(
      args: SelectSubset<T, ProductCreateArgs>
    ): CheckSelect<T, Prisma__ProductClient<Product>, Prisma__ProductClient<ProductGetPayload<T>>>

    /**
     * Create many Products.
     *     @param {ProductCreateManyArgs} args - Arguments to create many Products.
     *     @example
     *     // Create many Products
     *     const product = await prisma.product.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ProductCreateManyArgs>(
      args?: SelectSubset<T, ProductCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
    **/
    delete<T extends ProductDeleteArgs>(
      args: SelectSubset<T, ProductDeleteArgs>
    ): CheckSelect<T, Prisma__ProductClient<Product>, Prisma__ProductClient<ProductGetPayload<T>>>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProductUpdateArgs>(
      args: SelectSubset<T, ProductUpdateArgs>
    ): CheckSelect<T, Prisma__ProductClient<Product>, Prisma__ProductClient<ProductGetPayload<T>>>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProductDeleteManyArgs>(
      args?: SelectSubset<T, ProductDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProductUpdateManyArgs>(
      args: SelectSubset<T, ProductUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
    **/
    upsert<T extends ProductUpsertArgs>(
      args: SelectSubset<T, ProductUpsertArgs>
    ): CheckSelect<T, Prisma__ProductClient<Product>, Prisma__ProductClient<ProductGetPayload<T>>>

    /**
     * Find zero or more Products that matches the filter.
     * @param {ProductFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const product = await prisma.product.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: ProductFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Product.
     * @param {ProductAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const product = await prisma.product.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: ProductAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Find one Product that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ProductFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ProductClient<Product>, Prisma__ProductClient<ProductGetPayload<T>>>

    /**
     * Find the first Product that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProductFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ProductClient<Product>, Prisma__ProductClient<ProductGetPayload<T>>>

    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
      ? T['select'] extends true
      ? number
      : GetScalarType<T['select'], ProductCountAggregateOutputType>
      : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
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
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
      ? { orderBy: ProductGroupByArgs['orderBy'] }
      : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  class Prisma__ProductClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    category<T extends ProductCategoryArgs = {}>(args?: Subset<T, ProductCategoryArgs>): CheckSelect<T, Prisma__ProductCategoryClient<ProductCategory | Null>, Prisma__ProductCategoryClient<ProductCategoryGetPayload<T> | Null>>;

    owner<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    IncomeProducts<T extends IncomeProductsFindManyArgs = {}>(args?: Subset<T, IncomeProductsFindManyArgs>): CheckSelect<T, PrismaPromise<Array<IncomeProducts> | Null>, PrismaPromise<Array<IncomeProductsGetPayload<T>> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Product base type for findUnique actions
   */
  type ProductFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Product
     * 
    **/
    select?: ProductSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductInclude | null
    /**
     * Filter, which Product to fetch.
     * 
    **/
    where: ProductWhereUniqueInput
  }

  /**
   * Product: findUnique
   */
  interface ProductFindUniqueArgs extends ProductFindUniqueArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * Product base type for findFirst actions
   */
  type ProductFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Product
     * 
    **/
    select?: ProductSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductInclude | null
    /**
     * Filter, which Product to fetch.
     * 
    **/
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     * 
    **/
    orderBy?: Enumerable<ProductOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     * 
    **/
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     * 
    **/
    distinct?: Enumerable<ProductScalarFieldEnum>
  }

  /**
   * Product: findFirst
   */
  interface ProductFindFirstArgs extends ProductFindFirstArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * Product findMany
   */
  type ProductFindManyArgs = {
    /**
     * Select specific fields to fetch from the Product
     * 
    **/
    select?: ProductSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductInclude | null
    /**
     * Filter, which Products to fetch.
     * 
    **/
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     * 
    **/
    orderBy?: Enumerable<ProductOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     * 
    **/
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ProductScalarFieldEnum>
  }


  /**
   * Product create
   */
  type ProductCreateArgs = {
    /**
     * Select specific fields to fetch from the Product
     * 
    **/
    select?: ProductSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductInclude | null
    /**
     * The data needed to create a Product.
     * 
    **/
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }


  /**
   * Product createMany
   */
  type ProductCreateManyArgs = {
    /**
     * The data used to create many Products.
     * 
    **/
    data: Enumerable<ProductCreateManyInput>
  }


  /**
   * Product update
   */
  type ProductUpdateArgs = {
    /**
     * Select specific fields to fetch from the Product
     * 
    **/
    select?: ProductSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductInclude | null
    /**
     * The data needed to update a Product.
     * 
    **/
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     * 
    **/
    where: ProductWhereUniqueInput
  }


  /**
   * Product updateMany
   */
  type ProductUpdateManyArgs = {
    /**
     * The data used to update Products.
     * 
    **/
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     * 
    **/
    where?: ProductWhereInput
  }


  /**
   * Product upsert
   */
  type ProductUpsertArgs = {
    /**
     * Select specific fields to fetch from the Product
     * 
    **/
    select?: ProductSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductInclude | null
    /**
     * The filter to search for the Product to update in case it exists.
     * 
    **/
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     * 
    **/
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }


  /**
   * Product delete
   */
  type ProductDeleteArgs = {
    /**
     * Select specific fields to fetch from the Product
     * 
    **/
    select?: ProductSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductInclude | null
    /**
     * Filter which Product to delete.
     * 
    **/
    where: ProductWhereUniqueInput
  }


  /**
   * Product deleteMany
   */
  type ProductDeleteManyArgs = {
    /**
     * Filter which Products to delete
     * 
    **/
    where?: ProductWhereInput
  }


  /**
   * Product findRaw
   */
  type ProductFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * Product aggregateRaw
   */
  type ProductAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * Product: findUniqueOrThrow
   */
  type ProductFindUniqueOrThrowArgs = ProductFindUniqueArgsBase


  /**
   * Product: findFirstOrThrow
   */
  type ProductFindFirstOrThrowArgs = ProductFindFirstArgsBase


  /**
   * Product without action
   */
  type ProductArgs = {
    /**
     * Select specific fields to fetch from the Product
     * 
    **/
    select?: ProductSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductInclude | null
  }



  /**
   * Model Service
   */


  type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type ServiceAvgAggregateOutputType = {
    retailPrice: number | null
  }

  type ServiceSumAggregateOutputType = {
    retailPrice: number | null
  }

  type ServiceMinAggregateOutputType = {
    id: string | null
    name: string | null
    image: string | null
    description: string | null
    retailPrice: number | null
    createdAt: Date | null
    categoryId: string | null
    ownerId: string | null
  }

  type ServiceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    image: string | null
    description: string | null
    retailPrice: number | null
    createdAt: Date | null
    categoryId: string | null
    ownerId: string | null
  }

  type ServiceCountAggregateOutputType = {
    id: number
    name: number
    image: number
    description: number
    retailPrice: number
    createdAt: number
    categoryId: number
    ownerId: number
    saleIDs: number
    _all: number
  }


  type ServiceAvgAggregateInputType = {
    retailPrice?: true
  }

  type ServiceSumAggregateInputType = {
    retailPrice?: true
  }

  type ServiceMinAggregateInputType = {
    id?: true
    name?: true
    image?: true
    description?: true
    retailPrice?: true
    createdAt?: true
    categoryId?: true
    ownerId?: true
  }

  type ServiceMaxAggregateInputType = {
    id?: true
    name?: true
    image?: true
    description?: true
    retailPrice?: true
    createdAt?: true
    categoryId?: true
    ownerId?: true
  }

  type ServiceCountAggregateInputType = {
    id?: true
    name?: true
    image?: true
    description?: true
    retailPrice?: true
    createdAt?: true
    categoryId?: true
    ownerId?: true
    saleIDs?: true
    _all?: true
  }

  type ServiceAggregateArgs = {
    /**
     * Filter which Service to aggregate.
     * 
    **/
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     * 
    **/
    orderBy?: Enumerable<ServiceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
    [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
    ? T[P] extends true
    ? number
    : GetScalarType<T[P], AggregateService[P]>
    : GetScalarType<T[P], AggregateService[P]>
  }




  type ServiceGroupByArgs = {
    where?: ServiceWhereInput
    orderBy?: Enumerable<ServiceOrderByWithAggregationInput>
    by: Array<ServiceScalarFieldEnum>
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }


  type ServiceGroupByOutputType = {
    id: string
    name: string
    image: string | null
    description: string | null
    retailPrice: number
    createdAt: Date
    categoryId: string | null
    ownerId: string
    saleIDs: string[]
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ServiceGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
        ? T[P] extends boolean
        ? number
        : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        : GetScalarType<T[P], ServiceGroupByOutputType[P]>
      }
    >
  >


  type ServiceSelect = {
    id?: boolean
    name?: boolean
    image?: boolean
    description?: boolean
    retailPrice?: boolean
    createdAt?: boolean
    category?: boolean | ProductCategoryArgs
    categoryId?: boolean
    owner?: boolean | UserArgs
    ownerId?: boolean
    saleIDs?: boolean
    sales?: boolean | IncomeFindManyArgs
    _count?: boolean | ServiceCountOutputTypeArgs
  }

  type ServiceInclude = {
    category?: boolean | ProductCategoryArgs
    owner?: boolean | UserArgs
    sales?: boolean | IncomeFindManyArgs
    _count?: boolean | ServiceCountOutputTypeArgs
  }

  type ServiceGetPayload<
    S extends boolean | null | undefined | ServiceArgs,
    U = keyof S
  > = S extends true
    ? Service
    : S extends undefined
    ? never
    : S extends ServiceArgs | ServiceFindManyArgs
    ? 'include' extends U
    ? Service & {
      [P in TrueKeys<S['include']>]:
      P extends 'category' ? ProductCategoryGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
      P extends 'owner' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :
      P extends 'sales' ? Array<IncomeGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends '_count' ? ServiceCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> : never
    }
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends 'category' ? ProductCategoryGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
      P extends 'owner' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :
      P extends 'sales' ? Array<IncomeGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends '_count' ? ServiceCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> : P extends keyof Service ? Service[P] : never
    }
    : Service
    : Service


  type ServiceCountArgs = Merge<
    Omit<ServiceFindManyArgs, 'select' | 'include'> & {
      select?: ServiceCountAggregateInputType | true
    }
  >

  interface ServiceDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ServiceFindUniqueArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ServiceFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Service'> extends True ? CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>> : CheckSelect<T, Prisma__ServiceClient<Service | null, null>, Prisma__ServiceClient<ServiceGetPayload<T> | null, null>>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ServiceFindFirstArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ServiceFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Service'> extends True ? CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>> : CheckSelect<T, Prisma__ServiceClient<Service | null, null>, Prisma__ServiceClient<ServiceGetPayload<T> | null, null>>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ServiceFindManyArgs>(
      args?: SelectSubset<T, ServiceFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Service>>, PrismaPromise<Array<ServiceGetPayload<T>>>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
    **/
    create<T extends ServiceCreateArgs>(
      args: SelectSubset<T, ServiceCreateArgs>
    ): CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>>

    /**
     * Create many Services.
     *     @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     *     @example
     *     // Create many Services
     *     const service = await prisma.service.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ServiceCreateManyArgs>(
      args?: SelectSubset<T, ServiceCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
    **/
    delete<T extends ServiceDeleteArgs>(
      args: SelectSubset<T, ServiceDeleteArgs>
    ): CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ServiceUpdateArgs>(
      args: SelectSubset<T, ServiceUpdateArgs>
    ): CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ServiceDeleteManyArgs>(
      args?: SelectSubset<T, ServiceDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ServiceUpdateManyArgs>(
      args: SelectSubset<T, ServiceUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
    **/
    upsert<T extends ServiceUpsertArgs>(
      args: SelectSubset<T, ServiceUpsertArgs>
    ): CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>>

    /**
     * Find zero or more Services that matches the filter.
     * @param {ServiceFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const service = await prisma.service.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: ServiceFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Service.
     * @param {ServiceAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const service = await prisma.service.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: ServiceAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Find one Service that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ServiceFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>>

    /**
     * Find the first Service that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ServiceFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ServiceClient<Service>, Prisma__ServiceClient<ServiceGetPayload<T>>>

    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
      ? T['select'] extends true
      ? number
      : GetScalarType<T['select'], ServiceCountAggregateOutputType>
      : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
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
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
      ? { orderBy: ServiceGroupByArgs['orderBy'] }
      : { orderBy?: ServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  class Prisma__ServiceClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    category<T extends ProductCategoryArgs = {}>(args?: Subset<T, ProductCategoryArgs>): CheckSelect<T, Prisma__ProductCategoryClient<ProductCategory | Null>, Prisma__ProductCategoryClient<ProductCategoryGetPayload<T> | Null>>;

    owner<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    sales<T extends IncomeFindManyArgs = {}>(args?: Subset<T, IncomeFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Income> | Null>, PrismaPromise<Array<IncomeGetPayload<T>> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Service base type for findUnique actions
   */
  type ServiceFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * Filter, which Service to fetch.
     * 
    **/
    where: ServiceWhereUniqueInput
  }

  /**
   * Service: findUnique
   */
  interface ServiceFindUniqueArgs extends ServiceFindUniqueArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * Service base type for findFirst actions
   */
  type ServiceFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * Filter, which Service to fetch.
     * 
    **/
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     * 
    **/
    orderBy?: Enumerable<ServiceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     * 
    **/
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     * 
    **/
    distinct?: Enumerable<ServiceScalarFieldEnum>
  }

  /**
   * Service: findFirst
   */
  interface ServiceFindFirstArgs extends ServiceFindFirstArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * Service findMany
   */
  type ServiceFindManyArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * Filter, which Services to fetch.
     * 
    **/
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     * 
    **/
    orderBy?: Enumerable<ServiceOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     * 
    **/
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ServiceScalarFieldEnum>
  }


  /**
   * Service create
   */
  type ServiceCreateArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * The data needed to create a Service.
     * 
    **/
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }


  /**
   * Service createMany
   */
  type ServiceCreateManyArgs = {
    /**
     * The data used to create many Services.
     * 
    **/
    data: Enumerable<ServiceCreateManyInput>
  }


  /**
   * Service update
   */
  type ServiceUpdateArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * The data needed to update a Service.
     * 
    **/
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     * 
    **/
    where: ServiceWhereUniqueInput
  }


  /**
   * Service updateMany
   */
  type ServiceUpdateManyArgs = {
    /**
     * The data used to update Services.
     * 
    **/
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     * 
    **/
    where?: ServiceWhereInput
  }


  /**
   * Service upsert
   */
  type ServiceUpsertArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * The filter to search for the Service to update in case it exists.
     * 
    **/
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     * 
    **/
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }


  /**
   * Service delete
   */
  type ServiceDeleteArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
    /**
     * Filter which Service to delete.
     * 
    **/
    where: ServiceWhereUniqueInput
  }


  /**
   * Service deleteMany
   */
  type ServiceDeleteManyArgs = {
    /**
     * Filter which Services to delete
     * 
    **/
    where?: ServiceWhereInput
  }


  /**
   * Service findRaw
   */
  type ServiceFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * Service aggregateRaw
   */
  type ServiceAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * Service: findUniqueOrThrow
   */
  type ServiceFindUniqueOrThrowArgs = ServiceFindUniqueArgsBase


  /**
   * Service: findFirstOrThrow
   */
  type ServiceFindFirstOrThrowArgs = ServiceFindFirstArgsBase


  /**
   * Service without action
   */
  type ServiceArgs = {
    /**
     * Select specific fields to fetch from the Service
     * 
    **/
    select?: ServiceSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServiceInclude | null
  }



  /**
   * Model ProductCategory
   */


  type AggregateProductCategory = {
    _count: ProductCategoryCountAggregateOutputType | null
    _min: ProductCategoryMinAggregateOutputType | null
    _max: ProductCategoryMaxAggregateOutputType | null
  }

  type ProductCategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    userId: string | null
  }

  type ProductCategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    userId: string | null
  }

  type ProductCategoryCountAggregateOutputType = {
    id: number
    name: number
    userId: number
    _all: number
  }


  type ProductCategoryMinAggregateInputType = {
    id?: true
    name?: true
    userId?: true
  }

  type ProductCategoryMaxAggregateInputType = {
    id?: true
    name?: true
    userId?: true
  }

  type ProductCategoryCountAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    _all?: true
  }

  type ProductCategoryAggregateArgs = {
    /**
     * Filter which ProductCategory to aggregate.
     * 
    **/
    where?: ProductCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductCategories to fetch.
     * 
    **/
    orderBy?: Enumerable<ProductCategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ProductCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductCategories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductCategories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductCategories
    **/
    _count?: true | ProductCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductCategoryMaxAggregateInputType
  }

  type GetProductCategoryAggregateType<T extends ProductCategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateProductCategory]: P extends '_count' | 'count'
    ? T[P] extends true
    ? number
    : GetScalarType<T[P], AggregateProductCategory[P]>
    : GetScalarType<T[P], AggregateProductCategory[P]>
  }




  type ProductCategoryGroupByArgs = {
    where?: ProductCategoryWhereInput
    orderBy?: Enumerable<ProductCategoryOrderByWithAggregationInput>
    by: Array<ProductCategoryScalarFieldEnum>
    having?: ProductCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCategoryCountAggregateInputType | true
    _min?: ProductCategoryMinAggregateInputType
    _max?: ProductCategoryMaxAggregateInputType
  }


  type ProductCategoryGroupByOutputType = {
    id: string
    name: string
    userId: string
    _count: ProductCategoryCountAggregateOutputType | null
    _min: ProductCategoryMinAggregateOutputType | null
    _max: ProductCategoryMaxAggregateOutputType | null
  }

  type GetProductCategoryGroupByPayload<T extends ProductCategoryGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ProductCategoryGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof ProductCategoryGroupByOutputType))]: P extends '_count'
        ? T[P] extends boolean
        ? number
        : GetScalarType<T[P], ProductCategoryGroupByOutputType[P]>
        : GetScalarType<T[P], ProductCategoryGroupByOutputType[P]>
      }
    >
  >


  type ProductCategorySelect = {
    id?: boolean
    name?: boolean
    user?: boolean | UserArgs
    userId?: boolean
    Product?: boolean | ProductFindManyArgs
    Service?: boolean | ServiceFindManyArgs
    _count?: boolean | ProductCategoryCountOutputTypeArgs
  }

  type ProductCategoryInclude = {
    user?: boolean | UserArgs
    Product?: boolean | ProductFindManyArgs
    Service?: boolean | ServiceFindManyArgs
    _count?: boolean | ProductCategoryCountOutputTypeArgs
  }

  type ProductCategoryGetPayload<
    S extends boolean | null | undefined | ProductCategoryArgs,
    U = keyof S
  > = S extends true
    ? ProductCategory
    : S extends undefined
    ? never
    : S extends ProductCategoryArgs | ProductCategoryFindManyArgs
    ? 'include' extends U
    ? ProductCategory & {
      [P in TrueKeys<S['include']>]:
      P extends 'user' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :
      P extends 'Product' ? Array<ProductGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends 'Service' ? Array<ServiceGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends '_count' ? ProductCategoryCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> : never
    }
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends 'user' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :
      P extends 'Product' ? Array<ProductGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends 'Service' ? Array<ServiceGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends '_count' ? ProductCategoryCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> : P extends keyof ProductCategory ? ProductCategory[P] : never
    }
    : ProductCategory
    : ProductCategory


  type ProductCategoryCountArgs = Merge<
    Omit<ProductCategoryFindManyArgs, 'select' | 'include'> & {
      select?: ProductCategoryCountAggregateInputType | true
    }
  >

  interface ProductCategoryDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one ProductCategory that matches the filter.
     * @param {ProductCategoryFindUniqueArgs} args - Arguments to find a ProductCategory
     * @example
     * // Get one ProductCategory
     * const productCategory = await prisma.productCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProductCategoryFindUniqueArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ProductCategoryFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ProductCategory'> extends True ? CheckSelect<T, Prisma__ProductCategoryClient<ProductCategory>, Prisma__ProductCategoryClient<ProductCategoryGetPayload<T>>> : CheckSelect<T, Prisma__ProductCategoryClient<ProductCategory | null, null>, Prisma__ProductCategoryClient<ProductCategoryGetPayload<T> | null, null>>

    /**
     * Find the first ProductCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryFindFirstArgs} args - Arguments to find a ProductCategory
     * @example
     * // Get one ProductCategory
     * const productCategory = await prisma.productCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProductCategoryFindFirstArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ProductCategoryFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ProductCategory'> extends True ? CheckSelect<T, Prisma__ProductCategoryClient<ProductCategory>, Prisma__ProductCategoryClient<ProductCategoryGetPayload<T>>> : CheckSelect<T, Prisma__ProductCategoryClient<ProductCategory | null, null>, Prisma__ProductCategoryClient<ProductCategoryGetPayload<T> | null, null>>

    /**
     * Find zero or more ProductCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductCategories
     * const productCategories = await prisma.productCategory.findMany()
     * 
     * // Get first 10 ProductCategories
     * const productCategories = await prisma.productCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productCategoryWithIdOnly = await prisma.productCategory.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ProductCategoryFindManyArgs>(
      args?: SelectSubset<T, ProductCategoryFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ProductCategory>>, PrismaPromise<Array<ProductCategoryGetPayload<T>>>>

    /**
     * Create a ProductCategory.
     * @param {ProductCategoryCreateArgs} args - Arguments to create a ProductCategory.
     * @example
     * // Create one ProductCategory
     * const ProductCategory = await prisma.productCategory.create({
     *   data: {
     *     // ... data to create a ProductCategory
     *   }
     * })
     * 
    **/
    create<T extends ProductCategoryCreateArgs>(
      args: SelectSubset<T, ProductCategoryCreateArgs>
    ): CheckSelect<T, Prisma__ProductCategoryClient<ProductCategory>, Prisma__ProductCategoryClient<ProductCategoryGetPayload<T>>>

    /**
     * Create many ProductCategories.
     *     @param {ProductCategoryCreateManyArgs} args - Arguments to create many ProductCategories.
     *     @example
     *     // Create many ProductCategories
     *     const productCategory = await prisma.productCategory.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ProductCategoryCreateManyArgs>(
      args?: SelectSubset<T, ProductCategoryCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ProductCategory.
     * @param {ProductCategoryDeleteArgs} args - Arguments to delete one ProductCategory.
     * @example
     * // Delete one ProductCategory
     * const ProductCategory = await prisma.productCategory.delete({
     *   where: {
     *     // ... filter to delete one ProductCategory
     *   }
     * })
     * 
    **/
    delete<T extends ProductCategoryDeleteArgs>(
      args: SelectSubset<T, ProductCategoryDeleteArgs>
    ): CheckSelect<T, Prisma__ProductCategoryClient<ProductCategory>, Prisma__ProductCategoryClient<ProductCategoryGetPayload<T>>>

    /**
     * Update one ProductCategory.
     * @param {ProductCategoryUpdateArgs} args - Arguments to update one ProductCategory.
     * @example
     * // Update one ProductCategory
     * const productCategory = await prisma.productCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProductCategoryUpdateArgs>(
      args: SelectSubset<T, ProductCategoryUpdateArgs>
    ): CheckSelect<T, Prisma__ProductCategoryClient<ProductCategory>, Prisma__ProductCategoryClient<ProductCategoryGetPayload<T>>>

    /**
     * Delete zero or more ProductCategories.
     * @param {ProductCategoryDeleteManyArgs} args - Arguments to filter ProductCategories to delete.
     * @example
     * // Delete a few ProductCategories
     * const { count } = await prisma.productCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProductCategoryDeleteManyArgs>(
      args?: SelectSubset<T, ProductCategoryDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductCategories
     * const productCategory = await prisma.productCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProductCategoryUpdateManyArgs>(
      args: SelectSubset<T, ProductCategoryUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductCategory.
     * @param {ProductCategoryUpsertArgs} args - Arguments to update or create a ProductCategory.
     * @example
     * // Update or create a ProductCategory
     * const productCategory = await prisma.productCategory.upsert({
     *   create: {
     *     // ... data to create a ProductCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductCategory we want to update
     *   }
     * })
    **/
    upsert<T extends ProductCategoryUpsertArgs>(
      args: SelectSubset<T, ProductCategoryUpsertArgs>
    ): CheckSelect<T, Prisma__ProductCategoryClient<ProductCategory>, Prisma__ProductCategoryClient<ProductCategoryGetPayload<T>>>

    /**
     * Find zero or more ProductCategories that matches the filter.
     * @param {ProductCategoryFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const productCategory = await prisma.productCategory.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: ProductCategoryFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a ProductCategory.
     * @param {ProductCategoryAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const productCategory = await prisma.productCategory.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: ProductCategoryAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Find one ProductCategory that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ProductCategoryFindUniqueOrThrowArgs} args - Arguments to find a ProductCategory
     * @example
     * // Get one ProductCategory
     * const productCategory = await prisma.productCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ProductCategoryFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ProductCategoryFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ProductCategoryClient<ProductCategory>, Prisma__ProductCategoryClient<ProductCategoryGetPayload<T>>>

    /**
     * Find the first ProductCategory that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryFindFirstOrThrowArgs} args - Arguments to find a ProductCategory
     * @example
     * // Get one ProductCategory
     * const productCategory = await prisma.productCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ProductCategoryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProductCategoryFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ProductCategoryClient<ProductCategory>, Prisma__ProductCategoryClient<ProductCategoryGetPayload<T>>>

    /**
     * Count the number of ProductCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryCountArgs} args - Arguments to filter ProductCategories to count.
     * @example
     * // Count the number of ProductCategories
     * const count = await prisma.productCategory.count({
     *   where: {
     *     // ... the filter for the ProductCategories we want to count
     *   }
     * })
    **/
    count<T extends ProductCategoryCountArgs>(
      args?: Subset<T, ProductCategoryCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
      ? T['select'] extends true
      ? number
      : GetScalarType<T['select'], ProductCategoryCountAggregateOutputType>
      : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductCategoryAggregateArgs>(args: Subset<T, ProductCategoryAggregateArgs>): PrismaPromise<GetProductCategoryAggregateType<T>>

    /**
     * Group by ProductCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCategoryGroupByArgs} args - Group by arguments.
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
      T extends ProductCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
      ? { orderBy: ProductCategoryGroupByArgs['orderBy'] }
      : { orderBy?: ProductCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ProductCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductCategoryGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  class Prisma__ProductCategoryClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    Product<T extends ProductFindManyArgs = {}>(args?: Subset<T, ProductFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Product> | Null>, PrismaPromise<Array<ProductGetPayload<T>> | Null>>;

    Service<T extends ServiceFindManyArgs = {}>(args?: Subset<T, ServiceFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Service> | Null>, PrismaPromise<Array<ServiceGetPayload<T>> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * ProductCategory base type for findUnique actions
   */
  type ProductCategoryFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the ProductCategory
     * 
    **/
    select?: ProductCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductCategoryInclude | null
    /**
     * Filter, which ProductCategory to fetch.
     * 
    **/
    where: ProductCategoryWhereUniqueInput
  }

  /**
   * ProductCategory: findUnique
   */
  interface ProductCategoryFindUniqueArgs extends ProductCategoryFindUniqueArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * ProductCategory base type for findFirst actions
   */
  type ProductCategoryFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the ProductCategory
     * 
    **/
    select?: ProductCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductCategoryInclude | null
    /**
     * Filter, which ProductCategory to fetch.
     * 
    **/
    where?: ProductCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductCategories to fetch.
     * 
    **/
    orderBy?: Enumerable<ProductCategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductCategories.
     * 
    **/
    cursor?: ProductCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductCategories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductCategories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductCategories.
     * 
    **/
    distinct?: Enumerable<ProductCategoryScalarFieldEnum>
  }

  /**
   * ProductCategory: findFirst
   */
  interface ProductCategoryFindFirstArgs extends ProductCategoryFindFirstArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * ProductCategory findMany
   */
  type ProductCategoryFindManyArgs = {
    /**
     * Select specific fields to fetch from the ProductCategory
     * 
    **/
    select?: ProductCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductCategoryInclude | null
    /**
     * Filter, which ProductCategories to fetch.
     * 
    **/
    where?: ProductCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductCategories to fetch.
     * 
    **/
    orderBy?: Enumerable<ProductCategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductCategories.
     * 
    **/
    cursor?: ProductCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductCategories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductCategories.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ProductCategoryScalarFieldEnum>
  }


  /**
   * ProductCategory create
   */
  type ProductCategoryCreateArgs = {
    /**
     * Select specific fields to fetch from the ProductCategory
     * 
    **/
    select?: ProductCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductCategoryInclude | null
    /**
     * The data needed to create a ProductCategory.
     * 
    **/
    data: XOR<ProductCategoryCreateInput, ProductCategoryUncheckedCreateInput>
  }


  /**
   * ProductCategory createMany
   */
  type ProductCategoryCreateManyArgs = {
    /**
     * The data used to create many ProductCategories.
     * 
    **/
    data: Enumerable<ProductCategoryCreateManyInput>
  }


  /**
   * ProductCategory update
   */
  type ProductCategoryUpdateArgs = {
    /**
     * Select specific fields to fetch from the ProductCategory
     * 
    **/
    select?: ProductCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductCategoryInclude | null
    /**
     * The data needed to update a ProductCategory.
     * 
    **/
    data: XOR<ProductCategoryUpdateInput, ProductCategoryUncheckedUpdateInput>
    /**
     * Choose, which ProductCategory to update.
     * 
    **/
    where: ProductCategoryWhereUniqueInput
  }


  /**
   * ProductCategory updateMany
   */
  type ProductCategoryUpdateManyArgs = {
    /**
     * The data used to update ProductCategories.
     * 
    **/
    data: XOR<ProductCategoryUpdateManyMutationInput, ProductCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ProductCategories to update
     * 
    **/
    where?: ProductCategoryWhereInput
  }


  /**
   * ProductCategory upsert
   */
  type ProductCategoryUpsertArgs = {
    /**
     * Select specific fields to fetch from the ProductCategory
     * 
    **/
    select?: ProductCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductCategoryInclude | null
    /**
     * The filter to search for the ProductCategory to update in case it exists.
     * 
    **/
    where: ProductCategoryWhereUniqueInput
    /**
     * In case the ProductCategory found by the `where` argument doesn't exist, create a new ProductCategory with this data.
     * 
    **/
    create: XOR<ProductCategoryCreateInput, ProductCategoryUncheckedCreateInput>
    /**
     * In case the ProductCategory was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ProductCategoryUpdateInput, ProductCategoryUncheckedUpdateInput>
  }


  /**
   * ProductCategory delete
   */
  type ProductCategoryDeleteArgs = {
    /**
     * Select specific fields to fetch from the ProductCategory
     * 
    **/
    select?: ProductCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductCategoryInclude | null
    /**
     * Filter which ProductCategory to delete.
     * 
    **/
    where: ProductCategoryWhereUniqueInput
  }


  /**
   * ProductCategory deleteMany
   */
  type ProductCategoryDeleteManyArgs = {
    /**
     * Filter which ProductCategories to delete
     * 
    **/
    where?: ProductCategoryWhereInput
  }


  /**
   * ProductCategory findRaw
   */
  type ProductCategoryFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * ProductCategory aggregateRaw
   */
  type ProductCategoryAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * ProductCategory: findUniqueOrThrow
   */
  type ProductCategoryFindUniqueOrThrowArgs = ProductCategoryFindUniqueArgsBase


  /**
   * ProductCategory: findFirstOrThrow
   */
  type ProductCategoryFindFirstOrThrowArgs = ProductCategoryFindFirstArgsBase


  /**
   * ProductCategory without action
   */
  type ProductCategoryArgs = {
    /**
     * Select specific fields to fetch from the ProductCategory
     * 
    **/
    select?: ProductCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProductCategoryInclude | null
  }



  /**
   * Model Contact
   */


  type AggregateContact = {
    _count: ContactCountAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  type ContactMinAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    typeOfContact: TypeOfContact | null
    email: string | null
    comments: string | null
    deletedAt: Date | null
    ownerId: string | null
  }

  type ContactMaxAggregateOutputType = {
    id: string | null
    name: string | null
    phone: string | null
    typeOfContact: TypeOfContact | null
    email: string | null
    comments: string | null
    deletedAt: Date | null
    ownerId: string | null
  }

  type ContactCountAggregateOutputType = {
    id: number
    name: number
    phone: number
    typeOfContact: number
    email: number
    comments: number
    deletedAt: number
    ownerId: number
    _all: number
  }


  type ContactMinAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    typeOfContact?: true
    email?: true
    comments?: true
    deletedAt?: true
    ownerId?: true
  }

  type ContactMaxAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    typeOfContact?: true
    email?: true
    comments?: true
    deletedAt?: true
    ownerId?: true
  }

  type ContactCountAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    typeOfContact?: true
    email?: true
    comments?: true
    deletedAt?: true
    ownerId?: true
    _all?: true
  }

  type ContactAggregateArgs = {
    /**
     * Filter which Contact to aggregate.
     * 
    **/
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     * 
    **/
    orderBy?: Enumerable<ContactOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contacts
    **/
    _count?: true | ContactCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactMaxAggregateInputType
  }

  type GetContactAggregateType<T extends ContactAggregateArgs> = {
    [P in keyof T & keyof AggregateContact]: P extends '_count' | 'count'
    ? T[P] extends true
    ? number
    : GetScalarType<T[P], AggregateContact[P]>
    : GetScalarType<T[P], AggregateContact[P]>
  }




  type ContactGroupByArgs = {
    where?: ContactWhereInput
    orderBy?: Enumerable<ContactOrderByWithAggregationInput>
    by: Array<ContactScalarFieldEnum>
    having?: ContactScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactCountAggregateInputType | true
    _min?: ContactMinAggregateInputType
    _max?: ContactMaxAggregateInputType
  }


  type ContactGroupByOutputType = {
    id: string
    name: string
    phone: string
    typeOfContact: TypeOfContact
    email: string
    comments: string
    deletedAt: Date | null
    ownerId: string
    _count: ContactCountAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  type GetContactGroupByPayload<T extends ContactGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ContactGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof ContactGroupByOutputType))]: P extends '_count'
        ? T[P] extends boolean
        ? number
        : GetScalarType<T[P], ContactGroupByOutputType[P]>
        : GetScalarType<T[P], ContactGroupByOutputType[P]>
      }
    >
  >


  type ContactSelect = {
    id?: boolean
    name?: boolean
    phone?: boolean
    typeOfContact?: boolean
    email?: boolean
    comments?: boolean
    deletedAt?: boolean
    owner?: boolean | UserArgs
    ownerId?: boolean
    Sale?: boolean | IncomeFindManyArgs
    Expense?: boolean | ExpenseFindManyArgs
    _count?: boolean | ContactCountOutputTypeArgs
  }

  type ContactInclude = {
    owner?: boolean | UserArgs
    Sale?: boolean | IncomeFindManyArgs
    Expense?: boolean | ExpenseFindManyArgs
    _count?: boolean | ContactCountOutputTypeArgs
  }

  type ContactGetPayload<
    S extends boolean | null | undefined | ContactArgs,
    U = keyof S
  > = S extends true
    ? Contact
    : S extends undefined
    ? never
    : S extends ContactArgs | ContactFindManyArgs
    ? 'include' extends U
    ? Contact & {
      [P in TrueKeys<S['include']>]:
      P extends 'owner' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :
      P extends 'Sale' ? Array<IncomeGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends 'Expense' ? Array<ExpenseGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends '_count' ? ContactCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> : never
    }
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends 'owner' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :
      P extends 'Sale' ? Array<IncomeGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends 'Expense' ? Array<ExpenseGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends '_count' ? ContactCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> : P extends keyof Contact ? Contact[P] : never
    }
    : Contact
    : Contact


  type ContactCountArgs = Merge<
    Omit<ContactFindManyArgs, 'select' | 'include'> & {
      select?: ContactCountAggregateInputType | true
    }
  >

  interface ContactDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Contact that matches the filter.
     * @param {ContactFindUniqueArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ContactFindUniqueArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ContactFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Contact'> extends True ? CheckSelect<T, Prisma__ContactClient<Contact>, Prisma__ContactClient<ContactGetPayload<T>>> : CheckSelect<T, Prisma__ContactClient<Contact | null, null>, Prisma__ContactClient<ContactGetPayload<T> | null, null>>

    /**
     * Find the first Contact that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ContactFindFirstArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ContactFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Contact'> extends True ? CheckSelect<T, Prisma__ContactClient<Contact>, Prisma__ContactClient<ContactGetPayload<T>>> : CheckSelect<T, Prisma__ContactClient<Contact | null, null>, Prisma__ContactClient<ContactGetPayload<T> | null, null>>

    /**
     * Find zero or more Contacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contacts
     * const contacts = await prisma.contact.findMany()
     * 
     * // Get first 10 Contacts
     * const contacts = await prisma.contact.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactWithIdOnly = await prisma.contact.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ContactFindManyArgs>(
      args?: SelectSubset<T, ContactFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Contact>>, PrismaPromise<Array<ContactGetPayload<T>>>>

    /**
     * Create a Contact.
     * @param {ContactCreateArgs} args - Arguments to create a Contact.
     * @example
     * // Create one Contact
     * const Contact = await prisma.contact.create({
     *   data: {
     *     // ... data to create a Contact
     *   }
     * })
     * 
    **/
    create<T extends ContactCreateArgs>(
      args: SelectSubset<T, ContactCreateArgs>
    ): CheckSelect<T, Prisma__ContactClient<Contact>, Prisma__ContactClient<ContactGetPayload<T>>>

    /**
     * Create many Contacts.
     *     @param {ContactCreateManyArgs} args - Arguments to create many Contacts.
     *     @example
     *     // Create many Contacts
     *     const contact = await prisma.contact.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ContactCreateManyArgs>(
      args?: SelectSubset<T, ContactCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Contact.
     * @param {ContactDeleteArgs} args - Arguments to delete one Contact.
     * @example
     * // Delete one Contact
     * const Contact = await prisma.contact.delete({
     *   where: {
     *     // ... filter to delete one Contact
     *   }
     * })
     * 
    **/
    delete<T extends ContactDeleteArgs>(
      args: SelectSubset<T, ContactDeleteArgs>
    ): CheckSelect<T, Prisma__ContactClient<Contact>, Prisma__ContactClient<ContactGetPayload<T>>>

    /**
     * Update one Contact.
     * @param {ContactUpdateArgs} args - Arguments to update one Contact.
     * @example
     * // Update one Contact
     * const contact = await prisma.contact.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ContactUpdateArgs>(
      args: SelectSubset<T, ContactUpdateArgs>
    ): CheckSelect<T, Prisma__ContactClient<Contact>, Prisma__ContactClient<ContactGetPayload<T>>>

    /**
     * Delete zero or more Contacts.
     * @param {ContactDeleteManyArgs} args - Arguments to filter Contacts to delete.
     * @example
     * // Delete a few Contacts
     * const { count } = await prisma.contact.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ContactDeleteManyArgs>(
      args?: SelectSubset<T, ContactDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contacts
     * const contact = await prisma.contact.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ContactUpdateManyArgs>(
      args: SelectSubset<T, ContactUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Contact.
     * @param {ContactUpsertArgs} args - Arguments to update or create a Contact.
     * @example
     * // Update or create a Contact
     * const contact = await prisma.contact.upsert({
     *   create: {
     *     // ... data to create a Contact
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contact we want to update
     *   }
     * })
    **/
    upsert<T extends ContactUpsertArgs>(
      args: SelectSubset<T, ContactUpsertArgs>
    ): CheckSelect<T, Prisma__ContactClient<Contact>, Prisma__ContactClient<ContactGetPayload<T>>>

    /**
     * Find zero or more Contacts that matches the filter.
     * @param {ContactFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const contact = await prisma.contact.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: ContactFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Contact.
     * @param {ContactAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const contact = await prisma.contact.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: ContactAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Find one Contact that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ContactFindUniqueOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ContactFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ContactFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ContactClient<Contact>, Prisma__ContactClient<ContactGetPayload<T>>>

    /**
     * Find the first Contact that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ContactFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ContactFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ContactClient<Contact>, Prisma__ContactClient<ContactGetPayload<T>>>

    /**
     * Count the number of Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactCountArgs} args - Arguments to filter Contacts to count.
     * @example
     * // Count the number of Contacts
     * const count = await prisma.contact.count({
     *   where: {
     *     // ... the filter for the Contacts we want to count
     *   }
     * })
    **/
    count<T extends ContactCountArgs>(
      args?: Subset<T, ContactCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
      ? T['select'] extends true
      ? number
      : GetScalarType<T['select'], ContactCountAggregateOutputType>
      : number
    >

    /**
     * Allows you to perform aggregations operations on a Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ContactAggregateArgs>(args: Subset<T, ContactAggregateArgs>): PrismaPromise<GetContactAggregateType<T>>

    /**
     * Group by Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactGroupByArgs} args - Group by arguments.
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
      T extends ContactGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
      ? { orderBy: ContactGroupByArgs['orderBy'] }
      : { orderBy?: ContactGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ContactGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Contact.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  class Prisma__ContactClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    owner<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    Sale<T extends IncomeFindManyArgs = {}>(args?: Subset<T, IncomeFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Income> | Null>, PrismaPromise<Array<IncomeGetPayload<T>> | Null>>;

    Expense<T extends ExpenseFindManyArgs = {}>(args?: Subset<T, ExpenseFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Expense> | Null>, PrismaPromise<Array<ExpenseGetPayload<T>> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Contact base type for findUnique actions
   */
  type ContactFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Contact
     * 
    **/
    select?: ContactSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactInclude | null
    /**
     * Filter, which Contact to fetch.
     * 
    **/
    where: ContactWhereUniqueInput
  }

  /**
   * Contact: findUnique
   */
  interface ContactFindUniqueArgs extends ContactFindUniqueArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * Contact base type for findFirst actions
   */
  type ContactFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Contact
     * 
    **/
    select?: ContactSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactInclude | null
    /**
     * Filter, which Contact to fetch.
     * 
    **/
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     * 
    **/
    orderBy?: Enumerable<ContactOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     * 
    **/
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     * 
    **/
    distinct?: Enumerable<ContactScalarFieldEnum>
  }

  /**
   * Contact: findFirst
   */
  interface ContactFindFirstArgs extends ContactFindFirstArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * Contact findMany
   */
  type ContactFindManyArgs = {
    /**
     * Select specific fields to fetch from the Contact
     * 
    **/
    select?: ContactSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactInclude | null
    /**
     * Filter, which Contacts to fetch.
     * 
    **/
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     * 
    **/
    orderBy?: Enumerable<ContactOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contacts.
     * 
    **/
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ContactScalarFieldEnum>
  }


  /**
   * Contact create
   */
  type ContactCreateArgs = {
    /**
     * Select specific fields to fetch from the Contact
     * 
    **/
    select?: ContactSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactInclude | null
    /**
     * The data needed to create a Contact.
     * 
    **/
    data: XOR<ContactCreateInput, ContactUncheckedCreateInput>
  }


  /**
   * Contact createMany
   */
  type ContactCreateManyArgs = {
    /**
     * The data used to create many Contacts.
     * 
    **/
    data: Enumerable<ContactCreateManyInput>
  }


  /**
   * Contact update
   */
  type ContactUpdateArgs = {
    /**
     * Select specific fields to fetch from the Contact
     * 
    **/
    select?: ContactSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactInclude | null
    /**
     * The data needed to update a Contact.
     * 
    **/
    data: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
    /**
     * Choose, which Contact to update.
     * 
    **/
    where: ContactWhereUniqueInput
  }


  /**
   * Contact updateMany
   */
  type ContactUpdateManyArgs = {
    /**
     * The data used to update Contacts.
     * 
    **/
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyInput>
    /**
     * Filter which Contacts to update
     * 
    **/
    where?: ContactWhereInput
  }


  /**
   * Contact upsert
   */
  type ContactUpsertArgs = {
    /**
     * Select specific fields to fetch from the Contact
     * 
    **/
    select?: ContactSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactInclude | null
    /**
     * The filter to search for the Contact to update in case it exists.
     * 
    **/
    where: ContactWhereUniqueInput
    /**
     * In case the Contact found by the `where` argument doesn't exist, create a new Contact with this data.
     * 
    **/
    create: XOR<ContactCreateInput, ContactUncheckedCreateInput>
    /**
     * In case the Contact was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
  }


  /**
   * Contact delete
   */
  type ContactDeleteArgs = {
    /**
     * Select specific fields to fetch from the Contact
     * 
    **/
    select?: ContactSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactInclude | null
    /**
     * Filter which Contact to delete.
     * 
    **/
    where: ContactWhereUniqueInput
  }


  /**
   * Contact deleteMany
   */
  type ContactDeleteManyArgs = {
    /**
     * Filter which Contacts to delete
     * 
    **/
    where?: ContactWhereInput
  }


  /**
   * Contact findRaw
   */
  type ContactFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * Contact aggregateRaw
   */
  type ContactAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * Contact: findUniqueOrThrow
   */
  type ContactFindUniqueOrThrowArgs = ContactFindUniqueArgsBase


  /**
   * Contact: findFirstOrThrow
   */
  type ContactFindFirstOrThrowArgs = ContactFindFirstArgsBase


  /**
   * Contact without action
   */
  type ContactArgs = {
    /**
     * Select specific fields to fetch from the Contact
     * 
    **/
    select?: ContactSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContactInclude | null
  }



  /**
   * Model ExpenseCategory
   */


  type AggregateExpenseCategory = {
    _count: ExpenseCategoryCountAggregateOutputType | null
    _min: ExpenseCategoryMinAggregateOutputType | null
    _max: ExpenseCategoryMaxAggregateOutputType | null
  }

  type ExpenseCategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    imageUrl: string | null
  }

  type ExpenseCategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    imageUrl: string | null
  }

  type ExpenseCategoryCountAggregateOutputType = {
    id: number
    name: number
    imageUrl: number
    _all: number
  }


  type ExpenseCategoryMinAggregateInputType = {
    id?: true
    name?: true
    imageUrl?: true
  }

  type ExpenseCategoryMaxAggregateInputType = {
    id?: true
    name?: true
    imageUrl?: true
  }

  type ExpenseCategoryCountAggregateInputType = {
    id?: true
    name?: true
    imageUrl?: true
    _all?: true
  }

  type ExpenseCategoryAggregateArgs = {
    /**
     * Filter which ExpenseCategory to aggregate.
     * 
    **/
    where?: ExpenseCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseCategories to fetch.
     * 
    **/
    orderBy?: Enumerable<ExpenseCategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ExpenseCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseCategories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseCategories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExpenseCategories
    **/
    _count?: true | ExpenseCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpenseCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpenseCategoryMaxAggregateInputType
  }

  type GetExpenseCategoryAggregateType<T extends ExpenseCategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateExpenseCategory]: P extends '_count' | 'count'
    ? T[P] extends true
    ? number
    : GetScalarType<T[P], AggregateExpenseCategory[P]>
    : GetScalarType<T[P], AggregateExpenseCategory[P]>
  }




  type ExpenseCategoryGroupByArgs = {
    where?: ExpenseCategoryWhereInput
    orderBy?: Enumerable<ExpenseCategoryOrderByWithAggregationInput>
    by: Array<ExpenseCategoryScalarFieldEnum>
    having?: ExpenseCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpenseCategoryCountAggregateInputType | true
    _min?: ExpenseCategoryMinAggregateInputType
    _max?: ExpenseCategoryMaxAggregateInputType
  }


  type ExpenseCategoryGroupByOutputType = {
    id: string
    name: string
    imageUrl: string
    _count: ExpenseCategoryCountAggregateOutputType | null
    _min: ExpenseCategoryMinAggregateOutputType | null
    _max: ExpenseCategoryMaxAggregateOutputType | null
  }

  type GetExpenseCategoryGroupByPayload<T extends ExpenseCategoryGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ExpenseCategoryGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof ExpenseCategoryGroupByOutputType))]: P extends '_count'
        ? T[P] extends boolean
        ? number
        : GetScalarType<T[P], ExpenseCategoryGroupByOutputType[P]>
        : GetScalarType<T[P], ExpenseCategoryGroupByOutputType[P]>
      }
    >
  >


  type ExpenseCategorySelect = {
    id?: boolean
    name?: boolean
    imageUrl?: boolean
    Budget?: boolean | BudgetFindManyArgs
    Expense?: boolean | ExpenseFindManyArgs
    _count?: boolean | ExpenseCategoryCountOutputTypeArgs
  }

  type ExpenseCategoryInclude = {
    Budget?: boolean | BudgetFindManyArgs
    Expense?: boolean | ExpenseFindManyArgs
    _count?: boolean | ExpenseCategoryCountOutputTypeArgs
  }

  type ExpenseCategoryGetPayload<
    S extends boolean | null | undefined | ExpenseCategoryArgs,
    U = keyof S
  > = S extends true
    ? ExpenseCategory
    : S extends undefined
    ? never
    : S extends ExpenseCategoryArgs | ExpenseCategoryFindManyArgs
    ? 'include' extends U
    ? ExpenseCategory & {
      [P in TrueKeys<S['include']>]:
      P extends 'Budget' ? Array<BudgetGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends 'Expense' ? Array<ExpenseGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends '_count' ? ExpenseCategoryCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> : never
    }
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends 'Budget' ? Array<BudgetGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends 'Expense' ? Array<ExpenseGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends '_count' ? ExpenseCategoryCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> : P extends keyof ExpenseCategory ? ExpenseCategory[P] : never
    }
    : ExpenseCategory
    : ExpenseCategory


  type ExpenseCategoryCountArgs = Merge<
    Omit<ExpenseCategoryFindManyArgs, 'select' | 'include'> & {
      select?: ExpenseCategoryCountAggregateInputType | true
    }
  >

  interface ExpenseCategoryDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one ExpenseCategory that matches the filter.
     * @param {ExpenseCategoryFindUniqueArgs} args - Arguments to find a ExpenseCategory
     * @example
     * // Get one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ExpenseCategoryFindUniqueArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ExpenseCategoryFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ExpenseCategory'> extends True ? CheckSelect<T, Prisma__ExpenseCategoryClient<ExpenseCategory>, Prisma__ExpenseCategoryClient<ExpenseCategoryGetPayload<T>>> : CheckSelect<T, Prisma__ExpenseCategoryClient<ExpenseCategory | null, null>, Prisma__ExpenseCategoryClient<ExpenseCategoryGetPayload<T> | null, null>>

    /**
     * Find the first ExpenseCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryFindFirstArgs} args - Arguments to find a ExpenseCategory
     * @example
     * // Get one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ExpenseCategoryFindFirstArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ExpenseCategoryFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ExpenseCategory'> extends True ? CheckSelect<T, Prisma__ExpenseCategoryClient<ExpenseCategory>, Prisma__ExpenseCategoryClient<ExpenseCategoryGetPayload<T>>> : CheckSelect<T, Prisma__ExpenseCategoryClient<ExpenseCategory | null, null>, Prisma__ExpenseCategoryClient<ExpenseCategoryGetPayload<T> | null, null>>

    /**
     * Find zero or more ExpenseCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExpenseCategories
     * const expenseCategories = await prisma.expenseCategory.findMany()
     * 
     * // Get first 10 ExpenseCategories
     * const expenseCategories = await prisma.expenseCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const expenseCategoryWithIdOnly = await prisma.expenseCategory.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ExpenseCategoryFindManyArgs>(
      args?: SelectSubset<T, ExpenseCategoryFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ExpenseCategory>>, PrismaPromise<Array<ExpenseCategoryGetPayload<T>>>>

    /**
     * Create a ExpenseCategory.
     * @param {ExpenseCategoryCreateArgs} args - Arguments to create a ExpenseCategory.
     * @example
     * // Create one ExpenseCategory
     * const ExpenseCategory = await prisma.expenseCategory.create({
     *   data: {
     *     // ... data to create a ExpenseCategory
     *   }
     * })
     * 
    **/
    create<T extends ExpenseCategoryCreateArgs>(
      args: SelectSubset<T, ExpenseCategoryCreateArgs>
    ): CheckSelect<T, Prisma__ExpenseCategoryClient<ExpenseCategory>, Prisma__ExpenseCategoryClient<ExpenseCategoryGetPayload<T>>>

    /**
     * Create many ExpenseCategories.
     *     @param {ExpenseCategoryCreateManyArgs} args - Arguments to create many ExpenseCategories.
     *     @example
     *     // Create many ExpenseCategories
     *     const expenseCategory = await prisma.expenseCategory.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ExpenseCategoryCreateManyArgs>(
      args?: SelectSubset<T, ExpenseCategoryCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ExpenseCategory.
     * @param {ExpenseCategoryDeleteArgs} args - Arguments to delete one ExpenseCategory.
     * @example
     * // Delete one ExpenseCategory
     * const ExpenseCategory = await prisma.expenseCategory.delete({
     *   where: {
     *     // ... filter to delete one ExpenseCategory
     *   }
     * })
     * 
    **/
    delete<T extends ExpenseCategoryDeleteArgs>(
      args: SelectSubset<T, ExpenseCategoryDeleteArgs>
    ): CheckSelect<T, Prisma__ExpenseCategoryClient<ExpenseCategory>, Prisma__ExpenseCategoryClient<ExpenseCategoryGetPayload<T>>>

    /**
     * Update one ExpenseCategory.
     * @param {ExpenseCategoryUpdateArgs} args - Arguments to update one ExpenseCategory.
     * @example
     * // Update one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ExpenseCategoryUpdateArgs>(
      args: SelectSubset<T, ExpenseCategoryUpdateArgs>
    ): CheckSelect<T, Prisma__ExpenseCategoryClient<ExpenseCategory>, Prisma__ExpenseCategoryClient<ExpenseCategoryGetPayload<T>>>

    /**
     * Delete zero or more ExpenseCategories.
     * @param {ExpenseCategoryDeleteManyArgs} args - Arguments to filter ExpenseCategories to delete.
     * @example
     * // Delete a few ExpenseCategories
     * const { count } = await prisma.expenseCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ExpenseCategoryDeleteManyArgs>(
      args?: SelectSubset<T, ExpenseCategoryDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExpenseCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExpenseCategories
     * const expenseCategory = await prisma.expenseCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ExpenseCategoryUpdateManyArgs>(
      args: SelectSubset<T, ExpenseCategoryUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ExpenseCategory.
     * @param {ExpenseCategoryUpsertArgs} args - Arguments to update or create a ExpenseCategory.
     * @example
     * // Update or create a ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.upsert({
     *   create: {
     *     // ... data to create a ExpenseCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExpenseCategory we want to update
     *   }
     * })
    **/
    upsert<T extends ExpenseCategoryUpsertArgs>(
      args: SelectSubset<T, ExpenseCategoryUpsertArgs>
    ): CheckSelect<T, Prisma__ExpenseCategoryClient<ExpenseCategory>, Prisma__ExpenseCategoryClient<ExpenseCategoryGetPayload<T>>>

    /**
     * Find zero or more ExpenseCategories that matches the filter.
     * @param {ExpenseCategoryFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const expenseCategory = await prisma.expenseCategory.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: ExpenseCategoryFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a ExpenseCategory.
     * @param {ExpenseCategoryAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const expenseCategory = await prisma.expenseCategory.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: ExpenseCategoryAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Find one ExpenseCategory that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ExpenseCategoryFindUniqueOrThrowArgs} args - Arguments to find a ExpenseCategory
     * @example
     * // Get one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ExpenseCategoryFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ExpenseCategoryFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ExpenseCategoryClient<ExpenseCategory>, Prisma__ExpenseCategoryClient<ExpenseCategoryGetPayload<T>>>

    /**
     * Find the first ExpenseCategory that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryFindFirstOrThrowArgs} args - Arguments to find a ExpenseCategory
     * @example
     * // Get one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ExpenseCategoryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ExpenseCategoryFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ExpenseCategoryClient<ExpenseCategory>, Prisma__ExpenseCategoryClient<ExpenseCategoryGetPayload<T>>>

    /**
     * Count the number of ExpenseCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryCountArgs} args - Arguments to filter ExpenseCategories to count.
     * @example
     * // Count the number of ExpenseCategories
     * const count = await prisma.expenseCategory.count({
     *   where: {
     *     // ... the filter for the ExpenseCategories we want to count
     *   }
     * })
    **/
    count<T extends ExpenseCategoryCountArgs>(
      args?: Subset<T, ExpenseCategoryCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
      ? T['select'] extends true
      ? number
      : GetScalarType<T['select'], ExpenseCategoryCountAggregateOutputType>
      : number
    >

    /**
     * Allows you to perform aggregations operations on a ExpenseCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ExpenseCategoryAggregateArgs>(args: Subset<T, ExpenseCategoryAggregateArgs>): PrismaPromise<GetExpenseCategoryAggregateType<T>>

    /**
     * Group by ExpenseCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryGroupByArgs} args - Group by arguments.
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
      T extends ExpenseCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
      ? { orderBy: ExpenseCategoryGroupByArgs['orderBy'] }
      : { orderBy?: ExpenseCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ExpenseCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpenseCategoryGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for ExpenseCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  class Prisma__ExpenseCategoryClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Budget<T extends BudgetFindManyArgs = {}>(args?: Subset<T, BudgetFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Budget> | Null>, PrismaPromise<Array<BudgetGetPayload<T>> | Null>>;

    Expense<T extends ExpenseFindManyArgs = {}>(args?: Subset<T, ExpenseFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Expense> | Null>, PrismaPromise<Array<ExpenseGetPayload<T>> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * ExpenseCategory base type for findUnique actions
   */
  type ExpenseCategoryFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     * 
    **/
    select?: ExpenseCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseCategoryInclude | null
    /**
     * Filter, which ExpenseCategory to fetch.
     * 
    **/
    where: ExpenseCategoryWhereUniqueInput
  }

  /**
   * ExpenseCategory: findUnique
   */
  interface ExpenseCategoryFindUniqueArgs extends ExpenseCategoryFindUniqueArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * ExpenseCategory base type for findFirst actions
   */
  type ExpenseCategoryFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     * 
    **/
    select?: ExpenseCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseCategoryInclude | null
    /**
     * Filter, which ExpenseCategory to fetch.
     * 
    **/
    where?: ExpenseCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseCategories to fetch.
     * 
    **/
    orderBy?: Enumerable<ExpenseCategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExpenseCategories.
     * 
    **/
    cursor?: ExpenseCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseCategories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseCategories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExpenseCategories.
     * 
    **/
    distinct?: Enumerable<ExpenseCategoryScalarFieldEnum>
  }

  /**
   * ExpenseCategory: findFirst
   */
  interface ExpenseCategoryFindFirstArgs extends ExpenseCategoryFindFirstArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * ExpenseCategory findMany
   */
  type ExpenseCategoryFindManyArgs = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     * 
    **/
    select?: ExpenseCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseCategoryInclude | null
    /**
     * Filter, which ExpenseCategories to fetch.
     * 
    **/
    where?: ExpenseCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseCategories to fetch.
     * 
    **/
    orderBy?: Enumerable<ExpenseCategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExpenseCategories.
     * 
    **/
    cursor?: ExpenseCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseCategories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseCategories.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ExpenseCategoryScalarFieldEnum>
  }


  /**
   * ExpenseCategory create
   */
  type ExpenseCategoryCreateArgs = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     * 
    **/
    select?: ExpenseCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseCategoryInclude | null
    /**
     * The data needed to create a ExpenseCategory.
     * 
    **/
    data: XOR<ExpenseCategoryCreateInput, ExpenseCategoryUncheckedCreateInput>
  }


  /**
   * ExpenseCategory createMany
   */
  type ExpenseCategoryCreateManyArgs = {
    /**
     * The data used to create many ExpenseCategories.
     * 
    **/
    data: Enumerable<ExpenseCategoryCreateManyInput>
  }


  /**
   * ExpenseCategory update
   */
  type ExpenseCategoryUpdateArgs = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     * 
    **/
    select?: ExpenseCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseCategoryInclude | null
    /**
     * The data needed to update a ExpenseCategory.
     * 
    **/
    data: XOR<ExpenseCategoryUpdateInput, ExpenseCategoryUncheckedUpdateInput>
    /**
     * Choose, which ExpenseCategory to update.
     * 
    **/
    where: ExpenseCategoryWhereUniqueInput
  }


  /**
   * ExpenseCategory updateMany
   */
  type ExpenseCategoryUpdateManyArgs = {
    /**
     * The data used to update ExpenseCategories.
     * 
    **/
    data: XOR<ExpenseCategoryUpdateManyMutationInput, ExpenseCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ExpenseCategories to update
     * 
    **/
    where?: ExpenseCategoryWhereInput
  }


  /**
   * ExpenseCategory upsert
   */
  type ExpenseCategoryUpsertArgs = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     * 
    **/
    select?: ExpenseCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseCategoryInclude | null
    /**
     * The filter to search for the ExpenseCategory to update in case it exists.
     * 
    **/
    where: ExpenseCategoryWhereUniqueInput
    /**
     * In case the ExpenseCategory found by the `where` argument doesn't exist, create a new ExpenseCategory with this data.
     * 
    **/
    create: XOR<ExpenseCategoryCreateInput, ExpenseCategoryUncheckedCreateInput>
    /**
     * In case the ExpenseCategory was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ExpenseCategoryUpdateInput, ExpenseCategoryUncheckedUpdateInput>
  }


  /**
   * ExpenseCategory delete
   */
  type ExpenseCategoryDeleteArgs = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     * 
    **/
    select?: ExpenseCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseCategoryInclude | null
    /**
     * Filter which ExpenseCategory to delete.
     * 
    **/
    where: ExpenseCategoryWhereUniqueInput
  }


  /**
   * ExpenseCategory deleteMany
   */
  type ExpenseCategoryDeleteManyArgs = {
    /**
     * Filter which ExpenseCategories to delete
     * 
    **/
    where?: ExpenseCategoryWhereInput
  }


  /**
   * ExpenseCategory findRaw
   */
  type ExpenseCategoryFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * ExpenseCategory aggregateRaw
   */
  type ExpenseCategoryAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * ExpenseCategory: findUniqueOrThrow
   */
  type ExpenseCategoryFindUniqueOrThrowArgs = ExpenseCategoryFindUniqueArgsBase


  /**
   * ExpenseCategory: findFirstOrThrow
   */
  type ExpenseCategoryFindFirstOrThrowArgs = ExpenseCategoryFindFirstArgsBase


  /**
   * ExpenseCategory without action
   */
  type ExpenseCategoryArgs = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     * 
    **/
    select?: ExpenseCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseCategoryInclude | null
  }



  /**
   * Model IncomeCategory
   */


  type AggregateIncomeCategory = {
    _count: IncomeCategoryCountAggregateOutputType | null
    _min: IncomeCategoryMinAggregateOutputType | null
    _max: IncomeCategoryMaxAggregateOutputType | null
  }

  type IncomeCategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    imageUrl: string | null
  }

  type IncomeCategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    imageUrl: string | null
  }

  type IncomeCategoryCountAggregateOutputType = {
    id: number
    name: number
    imageUrl: number
    _all: number
  }


  type IncomeCategoryMinAggregateInputType = {
    id?: true
    name?: true
    imageUrl?: true
  }

  type IncomeCategoryMaxAggregateInputType = {
    id?: true
    name?: true
    imageUrl?: true
  }

  type IncomeCategoryCountAggregateInputType = {
    id?: true
    name?: true
    imageUrl?: true
    _all?: true
  }

  type IncomeCategoryAggregateArgs = {
    /**
     * Filter which IncomeCategory to aggregate.
     * 
    **/
    where?: IncomeCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IncomeCategories to fetch.
     * 
    **/
    orderBy?: Enumerable<IncomeCategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: IncomeCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IncomeCategories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IncomeCategories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IncomeCategories
    **/
    _count?: true | IncomeCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IncomeCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IncomeCategoryMaxAggregateInputType
  }

  type GetIncomeCategoryAggregateType<T extends IncomeCategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateIncomeCategory]: P extends '_count' | 'count'
    ? T[P] extends true
    ? number
    : GetScalarType<T[P], AggregateIncomeCategory[P]>
    : GetScalarType<T[P], AggregateIncomeCategory[P]>
  }




  type IncomeCategoryGroupByArgs = {
    where?: IncomeCategoryWhereInput
    orderBy?: Enumerable<IncomeCategoryOrderByWithAggregationInput>
    by: Array<IncomeCategoryScalarFieldEnum>
    having?: IncomeCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IncomeCategoryCountAggregateInputType | true
    _min?: IncomeCategoryMinAggregateInputType
    _max?: IncomeCategoryMaxAggregateInputType
  }


  type IncomeCategoryGroupByOutputType = {
    id: string
    name: string
    imageUrl: string
    _count: IncomeCategoryCountAggregateOutputType | null
    _min: IncomeCategoryMinAggregateOutputType | null
    _max: IncomeCategoryMaxAggregateOutputType | null
  }

  type GetIncomeCategoryGroupByPayload<T extends IncomeCategoryGroupByArgs> = PrismaPromise<
    Array<
      PickArray<IncomeCategoryGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof IncomeCategoryGroupByOutputType))]: P extends '_count'
        ? T[P] extends boolean
        ? number
        : GetScalarType<T[P], IncomeCategoryGroupByOutputType[P]>
        : GetScalarType<T[P], IncomeCategoryGroupByOutputType[P]>
      }
    >
  >


  type IncomeCategorySelect = {
    id?: boolean
    name?: boolean
    imageUrl?: boolean
    Income?: boolean | IncomeFindManyArgs
    _count?: boolean | IncomeCategoryCountOutputTypeArgs
  }

  type IncomeCategoryInclude = {
    Income?: boolean | IncomeFindManyArgs
    _count?: boolean | IncomeCategoryCountOutputTypeArgs
  }

  type IncomeCategoryGetPayload<
    S extends boolean | null | undefined | IncomeCategoryArgs,
    U = keyof S
  > = S extends true
    ? IncomeCategory
    : S extends undefined
    ? never
    : S extends IncomeCategoryArgs | IncomeCategoryFindManyArgs
    ? 'include' extends U
    ? IncomeCategory & {
      [P in TrueKeys<S['include']>]:
      P extends 'Income' ? Array<IncomeGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends '_count' ? IncomeCategoryCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> : never
    }
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends 'Income' ? Array<IncomeGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends '_count' ? IncomeCategoryCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> : P extends keyof IncomeCategory ? IncomeCategory[P] : never
    }
    : IncomeCategory
    : IncomeCategory


  type IncomeCategoryCountArgs = Merge<
    Omit<IncomeCategoryFindManyArgs, 'select' | 'include'> & {
      select?: IncomeCategoryCountAggregateInputType | true
    }
  >

  interface IncomeCategoryDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one IncomeCategory that matches the filter.
     * @param {IncomeCategoryFindUniqueArgs} args - Arguments to find a IncomeCategory
     * @example
     * // Get one IncomeCategory
     * const incomeCategory = await prisma.incomeCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends IncomeCategoryFindUniqueArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, IncomeCategoryFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'IncomeCategory'> extends True ? CheckSelect<T, Prisma__IncomeCategoryClient<IncomeCategory>, Prisma__IncomeCategoryClient<IncomeCategoryGetPayload<T>>> : CheckSelect<T, Prisma__IncomeCategoryClient<IncomeCategory | null, null>, Prisma__IncomeCategoryClient<IncomeCategoryGetPayload<T> | null, null>>

    /**
     * Find the first IncomeCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeCategoryFindFirstArgs} args - Arguments to find a IncomeCategory
     * @example
     * // Get one IncomeCategory
     * const incomeCategory = await prisma.incomeCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends IncomeCategoryFindFirstArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, IncomeCategoryFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'IncomeCategory'> extends True ? CheckSelect<T, Prisma__IncomeCategoryClient<IncomeCategory>, Prisma__IncomeCategoryClient<IncomeCategoryGetPayload<T>>> : CheckSelect<T, Prisma__IncomeCategoryClient<IncomeCategory | null, null>, Prisma__IncomeCategoryClient<IncomeCategoryGetPayload<T> | null, null>>

    /**
     * Find zero or more IncomeCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeCategoryFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IncomeCategories
     * const incomeCategories = await prisma.incomeCategory.findMany()
     * 
     * // Get first 10 IncomeCategories
     * const incomeCategories = await prisma.incomeCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const incomeCategoryWithIdOnly = await prisma.incomeCategory.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends IncomeCategoryFindManyArgs>(
      args?: SelectSubset<T, IncomeCategoryFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<IncomeCategory>>, PrismaPromise<Array<IncomeCategoryGetPayload<T>>>>

    /**
     * Create a IncomeCategory.
     * @param {IncomeCategoryCreateArgs} args - Arguments to create a IncomeCategory.
     * @example
     * // Create one IncomeCategory
     * const IncomeCategory = await prisma.incomeCategory.create({
     *   data: {
     *     // ... data to create a IncomeCategory
     *   }
     * })
     * 
    **/
    create<T extends IncomeCategoryCreateArgs>(
      args: SelectSubset<T, IncomeCategoryCreateArgs>
    ): CheckSelect<T, Prisma__IncomeCategoryClient<IncomeCategory>, Prisma__IncomeCategoryClient<IncomeCategoryGetPayload<T>>>

    /**
     * Create many IncomeCategories.
     *     @param {IncomeCategoryCreateManyArgs} args - Arguments to create many IncomeCategories.
     *     @example
     *     // Create many IncomeCategories
     *     const incomeCategory = await prisma.incomeCategory.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends IncomeCategoryCreateManyArgs>(
      args?: SelectSubset<T, IncomeCategoryCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a IncomeCategory.
     * @param {IncomeCategoryDeleteArgs} args - Arguments to delete one IncomeCategory.
     * @example
     * // Delete one IncomeCategory
     * const IncomeCategory = await prisma.incomeCategory.delete({
     *   where: {
     *     // ... filter to delete one IncomeCategory
     *   }
     * })
     * 
    **/
    delete<T extends IncomeCategoryDeleteArgs>(
      args: SelectSubset<T, IncomeCategoryDeleteArgs>
    ): CheckSelect<T, Prisma__IncomeCategoryClient<IncomeCategory>, Prisma__IncomeCategoryClient<IncomeCategoryGetPayload<T>>>

    /**
     * Update one IncomeCategory.
     * @param {IncomeCategoryUpdateArgs} args - Arguments to update one IncomeCategory.
     * @example
     * // Update one IncomeCategory
     * const incomeCategory = await prisma.incomeCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends IncomeCategoryUpdateArgs>(
      args: SelectSubset<T, IncomeCategoryUpdateArgs>
    ): CheckSelect<T, Prisma__IncomeCategoryClient<IncomeCategory>, Prisma__IncomeCategoryClient<IncomeCategoryGetPayload<T>>>

    /**
     * Delete zero or more IncomeCategories.
     * @param {IncomeCategoryDeleteManyArgs} args - Arguments to filter IncomeCategories to delete.
     * @example
     * // Delete a few IncomeCategories
     * const { count } = await prisma.incomeCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends IncomeCategoryDeleteManyArgs>(
      args?: SelectSubset<T, IncomeCategoryDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more IncomeCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IncomeCategories
     * const incomeCategory = await prisma.incomeCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends IncomeCategoryUpdateManyArgs>(
      args: SelectSubset<T, IncomeCategoryUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one IncomeCategory.
     * @param {IncomeCategoryUpsertArgs} args - Arguments to update or create a IncomeCategory.
     * @example
     * // Update or create a IncomeCategory
     * const incomeCategory = await prisma.incomeCategory.upsert({
     *   create: {
     *     // ... data to create a IncomeCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IncomeCategory we want to update
     *   }
     * })
    **/
    upsert<T extends IncomeCategoryUpsertArgs>(
      args: SelectSubset<T, IncomeCategoryUpsertArgs>
    ): CheckSelect<T, Prisma__IncomeCategoryClient<IncomeCategory>, Prisma__IncomeCategoryClient<IncomeCategoryGetPayload<T>>>

    /**
     * Find zero or more IncomeCategories that matches the filter.
     * @param {IncomeCategoryFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const incomeCategory = await prisma.incomeCategory.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: IncomeCategoryFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a IncomeCategory.
     * @param {IncomeCategoryAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const incomeCategory = await prisma.incomeCategory.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: IncomeCategoryAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Find one IncomeCategory that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {IncomeCategoryFindUniqueOrThrowArgs} args - Arguments to find a IncomeCategory
     * @example
     * // Get one IncomeCategory
     * const incomeCategory = await prisma.incomeCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends IncomeCategoryFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, IncomeCategoryFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__IncomeCategoryClient<IncomeCategory>, Prisma__IncomeCategoryClient<IncomeCategoryGetPayload<T>>>

    /**
     * Find the first IncomeCategory that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeCategoryFindFirstOrThrowArgs} args - Arguments to find a IncomeCategory
     * @example
     * // Get one IncomeCategory
     * const incomeCategory = await prisma.incomeCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends IncomeCategoryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, IncomeCategoryFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__IncomeCategoryClient<IncomeCategory>, Prisma__IncomeCategoryClient<IncomeCategoryGetPayload<T>>>

    /**
     * Count the number of IncomeCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeCategoryCountArgs} args - Arguments to filter IncomeCategories to count.
     * @example
     * // Count the number of IncomeCategories
     * const count = await prisma.incomeCategory.count({
     *   where: {
     *     // ... the filter for the IncomeCategories we want to count
     *   }
     * })
    **/
    count<T extends IncomeCategoryCountArgs>(
      args?: Subset<T, IncomeCategoryCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
      ? T['select'] extends true
      ? number
      : GetScalarType<T['select'], IncomeCategoryCountAggregateOutputType>
      : number
    >

    /**
     * Allows you to perform aggregations operations on a IncomeCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends IncomeCategoryAggregateArgs>(args: Subset<T, IncomeCategoryAggregateArgs>): PrismaPromise<GetIncomeCategoryAggregateType<T>>

    /**
     * Group by IncomeCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeCategoryGroupByArgs} args - Group by arguments.
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
      T extends IncomeCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
      ? { orderBy: IncomeCategoryGroupByArgs['orderBy'] }
      : { orderBy?: IncomeCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, IncomeCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIncomeCategoryGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for IncomeCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  class Prisma__IncomeCategoryClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Income<T extends IncomeFindManyArgs = {}>(args?: Subset<T, IncomeFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Income> | Null>, PrismaPromise<Array<IncomeGetPayload<T>> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * IncomeCategory base type for findUnique actions
   */
  type IncomeCategoryFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the IncomeCategory
     * 
    **/
    select?: IncomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeCategoryInclude | null
    /**
     * Filter, which IncomeCategory to fetch.
     * 
    **/
    where: IncomeCategoryWhereUniqueInput
  }

  /**
   * IncomeCategory: findUnique
   */
  interface IncomeCategoryFindUniqueArgs extends IncomeCategoryFindUniqueArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * IncomeCategory base type for findFirst actions
   */
  type IncomeCategoryFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the IncomeCategory
     * 
    **/
    select?: IncomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeCategoryInclude | null
    /**
     * Filter, which IncomeCategory to fetch.
     * 
    **/
    where?: IncomeCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IncomeCategories to fetch.
     * 
    **/
    orderBy?: Enumerable<IncomeCategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IncomeCategories.
     * 
    **/
    cursor?: IncomeCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IncomeCategories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IncomeCategories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IncomeCategories.
     * 
    **/
    distinct?: Enumerable<IncomeCategoryScalarFieldEnum>
  }

  /**
   * IncomeCategory: findFirst
   */
  interface IncomeCategoryFindFirstArgs extends IncomeCategoryFindFirstArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * IncomeCategory findMany
   */
  type IncomeCategoryFindManyArgs = {
    /**
     * Select specific fields to fetch from the IncomeCategory
     * 
    **/
    select?: IncomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeCategoryInclude | null
    /**
     * Filter, which IncomeCategories to fetch.
     * 
    **/
    where?: IncomeCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IncomeCategories to fetch.
     * 
    **/
    orderBy?: Enumerable<IncomeCategoryOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IncomeCategories.
     * 
    **/
    cursor?: IncomeCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IncomeCategories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IncomeCategories.
     * 
    **/
    skip?: number
    distinct?: Enumerable<IncomeCategoryScalarFieldEnum>
  }


  /**
   * IncomeCategory create
   */
  type IncomeCategoryCreateArgs = {
    /**
     * Select specific fields to fetch from the IncomeCategory
     * 
    **/
    select?: IncomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeCategoryInclude | null
    /**
     * The data needed to create a IncomeCategory.
     * 
    **/
    data: XOR<IncomeCategoryCreateInput, IncomeCategoryUncheckedCreateInput>
  }


  /**
   * IncomeCategory createMany
   */
  type IncomeCategoryCreateManyArgs = {
    /**
     * The data used to create many IncomeCategories.
     * 
    **/
    data: Enumerable<IncomeCategoryCreateManyInput>
  }


  /**
   * IncomeCategory update
   */
  type IncomeCategoryUpdateArgs = {
    /**
     * Select specific fields to fetch from the IncomeCategory
     * 
    **/
    select?: IncomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeCategoryInclude | null
    /**
     * The data needed to update a IncomeCategory.
     * 
    **/
    data: XOR<IncomeCategoryUpdateInput, IncomeCategoryUncheckedUpdateInput>
    /**
     * Choose, which IncomeCategory to update.
     * 
    **/
    where: IncomeCategoryWhereUniqueInput
  }


  /**
   * IncomeCategory updateMany
   */
  type IncomeCategoryUpdateManyArgs = {
    /**
     * The data used to update IncomeCategories.
     * 
    **/
    data: XOR<IncomeCategoryUpdateManyMutationInput, IncomeCategoryUncheckedUpdateManyInput>
    /**
     * Filter which IncomeCategories to update
     * 
    **/
    where?: IncomeCategoryWhereInput
  }


  /**
   * IncomeCategory upsert
   */
  type IncomeCategoryUpsertArgs = {
    /**
     * Select specific fields to fetch from the IncomeCategory
     * 
    **/
    select?: IncomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeCategoryInclude | null
    /**
     * The filter to search for the IncomeCategory to update in case it exists.
     * 
    **/
    where: IncomeCategoryWhereUniqueInput
    /**
     * In case the IncomeCategory found by the `where` argument doesn't exist, create a new IncomeCategory with this data.
     * 
    **/
    create: XOR<IncomeCategoryCreateInput, IncomeCategoryUncheckedCreateInput>
    /**
     * In case the IncomeCategory was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<IncomeCategoryUpdateInput, IncomeCategoryUncheckedUpdateInput>
  }


  /**
   * IncomeCategory delete
   */
  type IncomeCategoryDeleteArgs = {
    /**
     * Select specific fields to fetch from the IncomeCategory
     * 
    **/
    select?: IncomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeCategoryInclude | null
    /**
     * Filter which IncomeCategory to delete.
     * 
    **/
    where: IncomeCategoryWhereUniqueInput
  }


  /**
   * IncomeCategory deleteMany
   */
  type IncomeCategoryDeleteManyArgs = {
    /**
     * Filter which IncomeCategories to delete
     * 
    **/
    where?: IncomeCategoryWhereInput
  }


  /**
   * IncomeCategory findRaw
   */
  type IncomeCategoryFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * IncomeCategory aggregateRaw
   */
  type IncomeCategoryAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * IncomeCategory: findUniqueOrThrow
   */
  type IncomeCategoryFindUniqueOrThrowArgs = IncomeCategoryFindUniqueArgsBase


  /**
   * IncomeCategory: findFirstOrThrow
   */
  type IncomeCategoryFindFirstOrThrowArgs = IncomeCategoryFindFirstArgsBase


  /**
   * IncomeCategory without action
   */
  type IncomeCategoryArgs = {
    /**
     * Select specific fields to fetch from the IncomeCategory
     * 
    **/
    select?: IncomeCategorySelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeCategoryInclude | null
  }



  /**
   * Model Expense
   */


  type AggregateExpense = {
    _count: ExpenseCountAggregateOutputType | null
    _avg: ExpenseAvgAggregateOutputType | null
    _sum: ExpenseSumAggregateOutputType | null
    _min: ExpenseMinAggregateOutputType | null
    _max: ExpenseMaxAggregateOutputType | null
  }

  type ExpenseAvgAggregateOutputType = {
    value: number | null
  }

  type ExpenseSumAggregateOutputType = {
    value: number | null
  }

  type ExpenseMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    value: number | null
    name: string | null
    date: string | null
    isPaid: boolean | null
    deletedAt: Date | null
    categoryId: string | null
    providerId: string | null
    paymentMethod: PaymentMethod | null
    ownerId: string | null
  }

  type ExpenseMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    value: number | null
    name: string | null
    date: string | null
    isPaid: boolean | null
    deletedAt: Date | null
    categoryId: string | null
    providerId: string | null
    paymentMethod: PaymentMethod | null
    ownerId: string | null
  }

  type ExpenseCountAggregateOutputType = {
    id: number
    createdAt: number
    value: number
    name: number
    date: number
    isPaid: number
    deletedAt: number
    categoryId: number
    providerId: number
    paymentMethod: number
    ownerId: number
    expenseDebtIds: number
    _all: number
  }


  type ExpenseAvgAggregateInputType = {
    value?: true
  }

  type ExpenseSumAggregateInputType = {
    value?: true
  }

  type ExpenseMinAggregateInputType = {
    id?: true
    createdAt?: true
    value?: true
    name?: true
    date?: true
    isPaid?: true
    deletedAt?: true
    categoryId?: true
    providerId?: true
    paymentMethod?: true
    ownerId?: true
  }

  type ExpenseMaxAggregateInputType = {
    id?: true
    createdAt?: true
    value?: true
    name?: true
    date?: true
    isPaid?: true
    deletedAt?: true
    categoryId?: true
    providerId?: true
    paymentMethod?: true
    ownerId?: true
  }

  type ExpenseCountAggregateInputType = {
    id?: true
    createdAt?: true
    value?: true
    name?: true
    date?: true
    isPaid?: true
    deletedAt?: true
    categoryId?: true
    providerId?: true
    paymentMethod?: true
    ownerId?: true
    expenseDebtIds?: true
    _all?: true
  }

  type ExpenseAggregateArgs = {
    /**
     * Filter which Expense to aggregate.
     * 
    **/
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     * 
    **/
    orderBy?: Enumerable<ExpenseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Expenses
    **/
    _count?: true | ExpenseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExpenseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExpenseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpenseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpenseMaxAggregateInputType
  }

  type GetExpenseAggregateType<T extends ExpenseAggregateArgs> = {
    [P in keyof T & keyof AggregateExpense]: P extends '_count' | 'count'
    ? T[P] extends true
    ? number
    : GetScalarType<T[P], AggregateExpense[P]>
    : GetScalarType<T[P], AggregateExpense[P]>
  }




  type ExpenseGroupByArgs = {
    where?: ExpenseWhereInput
    orderBy?: Enumerable<ExpenseOrderByWithAggregationInput>
    by: Array<ExpenseScalarFieldEnum>
    having?: ExpenseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpenseCountAggregateInputType | true
    _avg?: ExpenseAvgAggregateInputType
    _sum?: ExpenseSumAggregateInputType
    _min?: ExpenseMinAggregateInputType
    _max?: ExpenseMaxAggregateInputType
  }


  type ExpenseGroupByOutputType = {
    id: string
    createdAt: Date
    value: number
    name: string
    date: string
    isPaid: boolean
    deletedAt: Date | null
    categoryId: string
    providerId: string | null
    paymentMethod: PaymentMethod | null
    ownerId: string
    expenseDebtIds: string[]
    _count: ExpenseCountAggregateOutputType | null
    _avg: ExpenseAvgAggregateOutputType | null
    _sum: ExpenseSumAggregateOutputType | null
    _min: ExpenseMinAggregateOutputType | null
    _max: ExpenseMaxAggregateOutputType | null
  }

  type GetExpenseGroupByPayload<T extends ExpenseGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ExpenseGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof ExpenseGroupByOutputType))]: P extends '_count'
        ? T[P] extends boolean
        ? number
        : GetScalarType<T[P], ExpenseGroupByOutputType[P]>
        : GetScalarType<T[P], ExpenseGroupByOutputType[P]>
      }
    >
  >


  type ExpenseSelect = {
    id?: boolean
    createdAt?: boolean
    value?: boolean
    name?: boolean
    date?: boolean
    isPaid?: boolean
    deletedAt?: boolean
    category?: boolean | ExpenseCategoryArgs
    categoryId?: boolean
    provider?: boolean | ContactArgs
    providerId?: boolean
    paymentMethod?: boolean
    Owner?: boolean | UserArgs
    ownerId?: boolean
    ExpenseDebts?: boolean | ExpenseDebtFindManyArgs
    expenseDebtIds?: boolean
    _count?: boolean | ExpenseCountOutputTypeArgs
  }

  type ExpenseInclude = {
    category?: boolean | ExpenseCategoryArgs
    provider?: boolean | ContactArgs
    Owner?: boolean | UserArgs
    ExpenseDebts?: boolean | ExpenseDebtFindManyArgs
    _count?: boolean | ExpenseCountOutputTypeArgs
  }

  type ExpenseGetPayload<
    S extends boolean | null | undefined | ExpenseArgs,
    U = keyof S
  > = S extends true
    ? Expense
    : S extends undefined
    ? never
    : S extends ExpenseArgs | ExpenseFindManyArgs
    ? 'include' extends U
    ? Expense & {
      [P in TrueKeys<S['include']>]:
      P extends 'category' ? ExpenseCategoryGetPayload<Exclude<S['include'], undefined | null>[P]> :
      P extends 'provider' ? ContactGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
      P extends 'Owner' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :
      P extends 'ExpenseDebts' ? Array<ExpenseDebtGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends '_count' ? ExpenseCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> : never
    }
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends 'category' ? ExpenseCategoryGetPayload<Exclude<S['select'], undefined | null>[P]> :
      P extends 'provider' ? ContactGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
      P extends 'Owner' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :
      P extends 'ExpenseDebts' ? Array<ExpenseDebtGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends '_count' ? ExpenseCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> : P extends keyof Expense ? Expense[P] : never
    }
    : Expense
    : Expense


  type ExpenseCountArgs = Merge<
    Omit<ExpenseFindManyArgs, 'select' | 'include'> & {
      select?: ExpenseCountAggregateInputType | true
    }
  >

  interface ExpenseDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Expense that matches the filter.
     * @param {ExpenseFindUniqueArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ExpenseFindUniqueArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ExpenseFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Expense'> extends True ? CheckSelect<T, Prisma__ExpenseClient<Expense>, Prisma__ExpenseClient<ExpenseGetPayload<T>>> : CheckSelect<T, Prisma__ExpenseClient<Expense | null, null>, Prisma__ExpenseClient<ExpenseGetPayload<T> | null, null>>

    /**
     * Find the first Expense that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindFirstArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ExpenseFindFirstArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ExpenseFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Expense'> extends True ? CheckSelect<T, Prisma__ExpenseClient<Expense>, Prisma__ExpenseClient<ExpenseGetPayload<T>>> : CheckSelect<T, Prisma__ExpenseClient<Expense | null, null>, Prisma__ExpenseClient<ExpenseGetPayload<T> | null, null>>

    /**
     * Find zero or more Expenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Expenses
     * const expenses = await prisma.expense.findMany()
     * 
     * // Get first 10 Expenses
     * const expenses = await prisma.expense.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const expenseWithIdOnly = await prisma.expense.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ExpenseFindManyArgs>(
      args?: SelectSubset<T, ExpenseFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Expense>>, PrismaPromise<Array<ExpenseGetPayload<T>>>>

    /**
     * Create a Expense.
     * @param {ExpenseCreateArgs} args - Arguments to create a Expense.
     * @example
     * // Create one Expense
     * const Expense = await prisma.expense.create({
     *   data: {
     *     // ... data to create a Expense
     *   }
     * })
     * 
    **/
    create<T extends ExpenseCreateArgs>(
      args: SelectSubset<T, ExpenseCreateArgs>
    ): CheckSelect<T, Prisma__ExpenseClient<Expense>, Prisma__ExpenseClient<ExpenseGetPayload<T>>>

    /**
     * Create many Expenses.
     *     @param {ExpenseCreateManyArgs} args - Arguments to create many Expenses.
     *     @example
     *     // Create many Expenses
     *     const expense = await prisma.expense.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ExpenseCreateManyArgs>(
      args?: SelectSubset<T, ExpenseCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Expense.
     * @param {ExpenseDeleteArgs} args - Arguments to delete one Expense.
     * @example
     * // Delete one Expense
     * const Expense = await prisma.expense.delete({
     *   where: {
     *     // ... filter to delete one Expense
     *   }
     * })
     * 
    **/
    delete<T extends ExpenseDeleteArgs>(
      args: SelectSubset<T, ExpenseDeleteArgs>
    ): CheckSelect<T, Prisma__ExpenseClient<Expense>, Prisma__ExpenseClient<ExpenseGetPayload<T>>>

    /**
     * Update one Expense.
     * @param {ExpenseUpdateArgs} args - Arguments to update one Expense.
     * @example
     * // Update one Expense
     * const expense = await prisma.expense.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ExpenseUpdateArgs>(
      args: SelectSubset<T, ExpenseUpdateArgs>
    ): CheckSelect<T, Prisma__ExpenseClient<Expense>, Prisma__ExpenseClient<ExpenseGetPayload<T>>>

    /**
     * Delete zero or more Expenses.
     * @param {ExpenseDeleteManyArgs} args - Arguments to filter Expenses to delete.
     * @example
     * // Delete a few Expenses
     * const { count } = await prisma.expense.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ExpenseDeleteManyArgs>(
      args?: SelectSubset<T, ExpenseDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Expenses
     * const expense = await prisma.expense.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ExpenseUpdateManyArgs>(
      args: SelectSubset<T, ExpenseUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Expense.
     * @param {ExpenseUpsertArgs} args - Arguments to update or create a Expense.
     * @example
     * // Update or create a Expense
     * const expense = await prisma.expense.upsert({
     *   create: {
     *     // ... data to create a Expense
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Expense we want to update
     *   }
     * })
    **/
    upsert<T extends ExpenseUpsertArgs>(
      args: SelectSubset<T, ExpenseUpsertArgs>
    ): CheckSelect<T, Prisma__ExpenseClient<Expense>, Prisma__ExpenseClient<ExpenseGetPayload<T>>>

    /**
     * Find zero or more Expenses that matches the filter.
     * @param {ExpenseFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const expense = await prisma.expense.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: ExpenseFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Expense.
     * @param {ExpenseAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const expense = await prisma.expense.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: ExpenseAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Find one Expense that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ExpenseFindUniqueOrThrowArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ExpenseFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ExpenseFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ExpenseClient<Expense>, Prisma__ExpenseClient<ExpenseGetPayload<T>>>

    /**
     * Find the first Expense that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindFirstOrThrowArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ExpenseFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ExpenseFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ExpenseClient<Expense>, Prisma__ExpenseClient<ExpenseGetPayload<T>>>

    /**
     * Count the number of Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCountArgs} args - Arguments to filter Expenses to count.
     * @example
     * // Count the number of Expenses
     * const count = await prisma.expense.count({
     *   where: {
     *     // ... the filter for the Expenses we want to count
     *   }
     * })
    **/
    count<T extends ExpenseCountArgs>(
      args?: Subset<T, ExpenseCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
      ? T['select'] extends true
      ? number
      : GetScalarType<T['select'], ExpenseCountAggregateOutputType>
      : number
    >

    /**
     * Allows you to perform aggregations operations on a Expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ExpenseAggregateArgs>(args: Subset<T, ExpenseAggregateArgs>): PrismaPromise<GetExpenseAggregateType<T>>

    /**
     * Group by Expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseGroupByArgs} args - Group by arguments.
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
      T extends ExpenseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
      ? { orderBy: ExpenseGroupByArgs['orderBy'] }
      : { orderBy?: ExpenseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ExpenseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpenseGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Expense.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  class Prisma__ExpenseClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    category<T extends ExpenseCategoryArgs = {}>(args?: Subset<T, ExpenseCategoryArgs>): CheckSelect<T, Prisma__ExpenseCategoryClient<ExpenseCategory | Null>, Prisma__ExpenseCategoryClient<ExpenseCategoryGetPayload<T> | Null>>;

    provider<T extends ContactArgs = {}>(args?: Subset<T, ContactArgs>): CheckSelect<T, Prisma__ContactClient<Contact | Null>, Prisma__ContactClient<ContactGetPayload<T> | Null>>;

    Owner<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    ExpenseDebts<T extends ExpenseDebtFindManyArgs = {}>(args?: Subset<T, ExpenseDebtFindManyArgs>): CheckSelect<T, PrismaPromise<Array<ExpenseDebt> | Null>, PrismaPromise<Array<ExpenseDebtGetPayload<T>> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Expense base type for findUnique actions
   */
  type ExpenseFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Expense
     * 
    **/
    select?: ExpenseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseInclude | null
    /**
     * Filter, which Expense to fetch.
     * 
    **/
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense: findUnique
   */
  interface ExpenseFindUniqueArgs extends ExpenseFindUniqueArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * Expense base type for findFirst actions
   */
  type ExpenseFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Expense
     * 
    **/
    select?: ExpenseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseInclude | null
    /**
     * Filter, which Expense to fetch.
     * 
    **/
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     * 
    **/
    orderBy?: Enumerable<ExpenseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expenses.
     * 
    **/
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenses.
     * 
    **/
    distinct?: Enumerable<ExpenseScalarFieldEnum>
  }

  /**
   * Expense: findFirst
   */
  interface ExpenseFindFirstArgs extends ExpenseFindFirstArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * Expense findMany
   */
  type ExpenseFindManyArgs = {
    /**
     * Select specific fields to fetch from the Expense
     * 
    **/
    select?: ExpenseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseInclude | null
    /**
     * Filter, which Expenses to fetch.
     * 
    **/
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     * 
    **/
    orderBy?: Enumerable<ExpenseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Expenses.
     * 
    **/
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ExpenseScalarFieldEnum>
  }


  /**
   * Expense create
   */
  type ExpenseCreateArgs = {
    /**
     * Select specific fields to fetch from the Expense
     * 
    **/
    select?: ExpenseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseInclude | null
    /**
     * The data needed to create a Expense.
     * 
    **/
    data: XOR<ExpenseCreateInput, ExpenseUncheckedCreateInput>
  }


  /**
   * Expense createMany
   */
  type ExpenseCreateManyArgs = {
    /**
     * The data used to create many Expenses.
     * 
    **/
    data: Enumerable<ExpenseCreateManyInput>
  }


  /**
   * Expense update
   */
  type ExpenseUpdateArgs = {
    /**
     * Select specific fields to fetch from the Expense
     * 
    **/
    select?: ExpenseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseInclude | null
    /**
     * The data needed to update a Expense.
     * 
    **/
    data: XOR<ExpenseUpdateInput, ExpenseUncheckedUpdateInput>
    /**
     * Choose, which Expense to update.
     * 
    **/
    where: ExpenseWhereUniqueInput
  }


  /**
   * Expense updateMany
   */
  type ExpenseUpdateManyArgs = {
    /**
     * The data used to update Expenses.
     * 
    **/
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyInput>
    /**
     * Filter which Expenses to update
     * 
    **/
    where?: ExpenseWhereInput
  }


  /**
   * Expense upsert
   */
  type ExpenseUpsertArgs = {
    /**
     * Select specific fields to fetch from the Expense
     * 
    **/
    select?: ExpenseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseInclude | null
    /**
     * The filter to search for the Expense to update in case it exists.
     * 
    **/
    where: ExpenseWhereUniqueInput
    /**
     * In case the Expense found by the `where` argument doesn't exist, create a new Expense with this data.
     * 
    **/
    create: XOR<ExpenseCreateInput, ExpenseUncheckedCreateInput>
    /**
     * In case the Expense was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ExpenseUpdateInput, ExpenseUncheckedUpdateInput>
  }


  /**
   * Expense delete
   */
  type ExpenseDeleteArgs = {
    /**
     * Select specific fields to fetch from the Expense
     * 
    **/
    select?: ExpenseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseInclude | null
    /**
     * Filter which Expense to delete.
     * 
    **/
    where: ExpenseWhereUniqueInput
  }


  /**
   * Expense deleteMany
   */
  type ExpenseDeleteManyArgs = {
    /**
     * Filter which Expenses to delete
     * 
    **/
    where?: ExpenseWhereInput
  }


  /**
   * Expense findRaw
   */
  type ExpenseFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * Expense aggregateRaw
   */
  type ExpenseAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * Expense: findUniqueOrThrow
   */
  type ExpenseFindUniqueOrThrowArgs = ExpenseFindUniqueArgsBase


  /**
   * Expense: findFirstOrThrow
   */
  type ExpenseFindFirstOrThrowArgs = ExpenseFindFirstArgsBase


  /**
   * Expense without action
   */
  type ExpenseArgs = {
    /**
     * Select specific fields to fetch from the Expense
     * 
    **/
    select?: ExpenseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseInclude | null
  }



  /**
   * Model Income
   */


  type AggregateIncome = {
    _count: IncomeCountAggregateOutputType | null
    _avg: IncomeAvgAggregateOutputType | null
    _sum: IncomeSumAggregateOutputType | null
    _min: IncomeMinAggregateOutputType | null
    _max: IncomeMaxAggregateOutputType | null
  }

  type IncomeAvgAggregateOutputType = {
    value: number | null
  }

  type IncomeSumAggregateOutputType = {
    value: number | null
  }

  type IncomeMinAggregateOutputType = {
    id: string | null
    value: number | null
    name: string | null
    date: string | null
    createdAt: Date | null
    deletedAt: Date | null
    clientId: string | null
    categoryId: string | null
    isPaid: boolean | null
    paymentMethod: PaymentMethod | null
    ownerId: string | null
  }

  type IncomeMaxAggregateOutputType = {
    id: string | null
    value: number | null
    name: string | null
    date: string | null
    createdAt: Date | null
    deletedAt: Date | null
    clientId: string | null
    categoryId: string | null
    isPaid: boolean | null
    paymentMethod: PaymentMethod | null
    ownerId: string | null
  }

  type IncomeCountAggregateOutputType = {
    id: number
    value: number
    name: number
    date: number
    createdAt: number
    deletedAt: number
    serviceIDs: number
    clientId: number
    categoryId: number
    isPaid: number
    paymentMethod: number
    ownerId: number
    incomeDebtIds: number
    _all: number
  }


  type IncomeAvgAggregateInputType = {
    value?: true
  }

  type IncomeSumAggregateInputType = {
    value?: true
  }

  type IncomeMinAggregateInputType = {
    id?: true
    value?: true
    name?: true
    date?: true
    createdAt?: true
    deletedAt?: true
    clientId?: true
    categoryId?: true
    isPaid?: true
    paymentMethod?: true
    ownerId?: true
  }

  type IncomeMaxAggregateInputType = {
    id?: true
    value?: true
    name?: true
    date?: true
    createdAt?: true
    deletedAt?: true
    clientId?: true
    categoryId?: true
    isPaid?: true
    paymentMethod?: true
    ownerId?: true
  }

  type IncomeCountAggregateInputType = {
    id?: true
    value?: true
    name?: true
    date?: true
    createdAt?: true
    deletedAt?: true
    serviceIDs?: true
    clientId?: true
    categoryId?: true
    isPaid?: true
    paymentMethod?: true
    ownerId?: true
    incomeDebtIds?: true
    _all?: true
  }

  type IncomeAggregateArgs = {
    /**
     * Filter which Income to aggregate.
     * 
    **/
    where?: IncomeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Incomes to fetch.
     * 
    **/
    orderBy?: Enumerable<IncomeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: IncomeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Incomes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Incomes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Incomes
    **/
    _count?: true | IncomeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IncomeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IncomeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IncomeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IncomeMaxAggregateInputType
  }

  type GetIncomeAggregateType<T extends IncomeAggregateArgs> = {
    [P in keyof T & keyof AggregateIncome]: P extends '_count' | 'count'
    ? T[P] extends true
    ? number
    : GetScalarType<T[P], AggregateIncome[P]>
    : GetScalarType<T[P], AggregateIncome[P]>
  }




  type IncomeGroupByArgs = {
    where?: IncomeWhereInput
    orderBy?: Enumerable<IncomeOrderByWithAggregationInput>
    by: Array<IncomeScalarFieldEnum>
    having?: IncomeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IncomeCountAggregateInputType | true
    _avg?: IncomeAvgAggregateInputType
    _sum?: IncomeSumAggregateInputType
    _min?: IncomeMinAggregateInputType
    _max?: IncomeMaxAggregateInputType
  }


  type IncomeGroupByOutputType = {
    id: string
    value: number
    name: string | null
    date: string
    createdAt: Date
    deletedAt: Date | null
    serviceIDs: string[]
    clientId: string | null
    categoryId: string
    isPaid: boolean
    paymentMethod: PaymentMethod | null
    ownerId: string
    incomeDebtIds: string[]
    _count: IncomeCountAggregateOutputType | null
    _avg: IncomeAvgAggregateOutputType | null
    _sum: IncomeSumAggregateOutputType | null
    _min: IncomeMinAggregateOutputType | null
    _max: IncomeMaxAggregateOutputType | null
  }

  type GetIncomeGroupByPayload<T extends IncomeGroupByArgs> = PrismaPromise<
    Array<
      PickArray<IncomeGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof IncomeGroupByOutputType))]: P extends '_count'
        ? T[P] extends boolean
        ? number
        : GetScalarType<T[P], IncomeGroupByOutputType[P]>
        : GetScalarType<T[P], IncomeGroupByOutputType[P]>
      }
    >
  >


  type IncomeSelect = {
    id?: boolean
    value?: boolean
    name?: boolean
    date?: boolean
    createdAt?: boolean
    deletedAt?: boolean
    IncomeProducts?: boolean | IncomeProductsFindManyArgs
    serviceIDs?: boolean
    services?: boolean | ServiceFindManyArgs
    client?: boolean | ContactArgs
    clientId?: boolean
    category?: boolean | IncomeCategoryArgs
    categoryId?: boolean
    isPaid?: boolean
    paymentMethod?: boolean
    Owner?: boolean | UserArgs
    ownerId?: boolean
    IncomeDebts?: boolean | IncomeDebtFindManyArgs
    incomeDebtIds?: boolean
    _count?: boolean | IncomeCountOutputTypeArgs
  }

  type IncomeInclude = {
    IncomeProducts?: boolean | IncomeProductsFindManyArgs
    services?: boolean | ServiceFindManyArgs
    client?: boolean | ContactArgs
    category?: boolean | IncomeCategoryArgs
    Owner?: boolean | UserArgs
    IncomeDebts?: boolean | IncomeDebtFindManyArgs
    _count?: boolean | IncomeCountOutputTypeArgs
  }

  type IncomeGetPayload<
    S extends boolean | null | undefined | IncomeArgs,
    U = keyof S
  > = S extends true
    ? Income
    : S extends undefined
    ? never
    : S extends IncomeArgs | IncomeFindManyArgs
    ? 'include' extends U
    ? Income & {
      [P in TrueKeys<S['include']>]:
      P extends 'IncomeProducts' ? Array<IncomeProductsGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends 'services' ? Array<ServiceGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends 'client' ? ContactGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
      P extends 'category' ? IncomeCategoryGetPayload<Exclude<S['include'], undefined | null>[P]> :
      P extends 'Owner' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :
      P extends 'IncomeDebts' ? Array<IncomeDebtGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends '_count' ? IncomeCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> : never
    }
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends 'IncomeProducts' ? Array<IncomeProductsGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends 'services' ? Array<ServiceGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends 'client' ? ContactGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
      P extends 'category' ? IncomeCategoryGetPayload<Exclude<S['select'], undefined | null>[P]> :
      P extends 'Owner' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :
      P extends 'IncomeDebts' ? Array<IncomeDebtGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends '_count' ? IncomeCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> : P extends keyof Income ? Income[P] : never
    }
    : Income
    : Income


  type IncomeCountArgs = Merge<
    Omit<IncomeFindManyArgs, 'select' | 'include'> & {
      select?: IncomeCountAggregateInputType | true
    }
  >

  interface IncomeDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Income that matches the filter.
     * @param {IncomeFindUniqueArgs} args - Arguments to find a Income
     * @example
     * // Get one Income
     * const income = await prisma.income.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends IncomeFindUniqueArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, IncomeFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Income'> extends True ? CheckSelect<T, Prisma__IncomeClient<Income>, Prisma__IncomeClient<IncomeGetPayload<T>>> : CheckSelect<T, Prisma__IncomeClient<Income | null, null>, Prisma__IncomeClient<IncomeGetPayload<T> | null, null>>

    /**
     * Find the first Income that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeFindFirstArgs} args - Arguments to find a Income
     * @example
     * // Get one Income
     * const income = await prisma.income.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends IncomeFindFirstArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, IncomeFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Income'> extends True ? CheckSelect<T, Prisma__IncomeClient<Income>, Prisma__IncomeClient<IncomeGetPayload<T>>> : CheckSelect<T, Prisma__IncomeClient<Income | null, null>, Prisma__IncomeClient<IncomeGetPayload<T> | null, null>>

    /**
     * Find zero or more Incomes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Incomes
     * const incomes = await prisma.income.findMany()
     * 
     * // Get first 10 Incomes
     * const incomes = await prisma.income.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const incomeWithIdOnly = await prisma.income.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends IncomeFindManyArgs>(
      args?: SelectSubset<T, IncomeFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Income>>, PrismaPromise<Array<IncomeGetPayload<T>>>>

    /**
     * Create a Income.
     * @param {IncomeCreateArgs} args - Arguments to create a Income.
     * @example
     * // Create one Income
     * const Income = await prisma.income.create({
     *   data: {
     *     // ... data to create a Income
     *   }
     * })
     * 
    **/
    create<T extends IncomeCreateArgs>(
      args: SelectSubset<T, IncomeCreateArgs>
    ): CheckSelect<T, Prisma__IncomeClient<Income>, Prisma__IncomeClient<IncomeGetPayload<T>>>

    /**
     * Create many Incomes.
     *     @param {IncomeCreateManyArgs} args - Arguments to create many Incomes.
     *     @example
     *     // Create many Incomes
     *     const income = await prisma.income.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends IncomeCreateManyArgs>(
      args?: SelectSubset<T, IncomeCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Income.
     * @param {IncomeDeleteArgs} args - Arguments to delete one Income.
     * @example
     * // Delete one Income
     * const Income = await prisma.income.delete({
     *   where: {
     *     // ... filter to delete one Income
     *   }
     * })
     * 
    **/
    delete<T extends IncomeDeleteArgs>(
      args: SelectSubset<T, IncomeDeleteArgs>
    ): CheckSelect<T, Prisma__IncomeClient<Income>, Prisma__IncomeClient<IncomeGetPayload<T>>>

    /**
     * Update one Income.
     * @param {IncomeUpdateArgs} args - Arguments to update one Income.
     * @example
     * // Update one Income
     * const income = await prisma.income.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends IncomeUpdateArgs>(
      args: SelectSubset<T, IncomeUpdateArgs>
    ): CheckSelect<T, Prisma__IncomeClient<Income>, Prisma__IncomeClient<IncomeGetPayload<T>>>

    /**
     * Delete zero or more Incomes.
     * @param {IncomeDeleteManyArgs} args - Arguments to filter Incomes to delete.
     * @example
     * // Delete a few Incomes
     * const { count } = await prisma.income.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends IncomeDeleteManyArgs>(
      args?: SelectSubset<T, IncomeDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Incomes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Incomes
     * const income = await prisma.income.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends IncomeUpdateManyArgs>(
      args: SelectSubset<T, IncomeUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Income.
     * @param {IncomeUpsertArgs} args - Arguments to update or create a Income.
     * @example
     * // Update or create a Income
     * const income = await prisma.income.upsert({
     *   create: {
     *     // ... data to create a Income
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Income we want to update
     *   }
     * })
    **/
    upsert<T extends IncomeUpsertArgs>(
      args: SelectSubset<T, IncomeUpsertArgs>
    ): CheckSelect<T, Prisma__IncomeClient<Income>, Prisma__IncomeClient<IncomeGetPayload<T>>>

    /**
     * Find zero or more Incomes that matches the filter.
     * @param {IncomeFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const income = await prisma.income.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: IncomeFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Income.
     * @param {IncomeAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const income = await prisma.income.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: IncomeAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Find one Income that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {IncomeFindUniqueOrThrowArgs} args - Arguments to find a Income
     * @example
     * // Get one Income
     * const income = await prisma.income.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends IncomeFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, IncomeFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__IncomeClient<Income>, Prisma__IncomeClient<IncomeGetPayload<T>>>

    /**
     * Find the first Income that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeFindFirstOrThrowArgs} args - Arguments to find a Income
     * @example
     * // Get one Income
     * const income = await prisma.income.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends IncomeFindFirstOrThrowArgs>(
      args?: SelectSubset<T, IncomeFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__IncomeClient<Income>, Prisma__IncomeClient<IncomeGetPayload<T>>>

    /**
     * Count the number of Incomes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeCountArgs} args - Arguments to filter Incomes to count.
     * @example
     * // Count the number of Incomes
     * const count = await prisma.income.count({
     *   where: {
     *     // ... the filter for the Incomes we want to count
     *   }
     * })
    **/
    count<T extends IncomeCountArgs>(
      args?: Subset<T, IncomeCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
      ? T['select'] extends true
      ? number
      : GetScalarType<T['select'], IncomeCountAggregateOutputType>
      : number
    >

    /**
     * Allows you to perform aggregations operations on a Income.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends IncomeAggregateArgs>(args: Subset<T, IncomeAggregateArgs>): PrismaPromise<GetIncomeAggregateType<T>>

    /**
     * Group by Income.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeGroupByArgs} args - Group by arguments.
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
      T extends IncomeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
      ? { orderBy: IncomeGroupByArgs['orderBy'] }
      : { orderBy?: IncomeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, IncomeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIncomeGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Income.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  class Prisma__IncomeClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    IncomeProducts<T extends IncomeProductsFindManyArgs = {}>(args?: Subset<T, IncomeProductsFindManyArgs>): CheckSelect<T, PrismaPromise<Array<IncomeProducts> | Null>, PrismaPromise<Array<IncomeProductsGetPayload<T>> | Null>>;

    services<T extends ServiceFindManyArgs = {}>(args?: Subset<T, ServiceFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Service> | Null>, PrismaPromise<Array<ServiceGetPayload<T>> | Null>>;

    client<T extends ContactArgs = {}>(args?: Subset<T, ContactArgs>): CheckSelect<T, Prisma__ContactClient<Contact | Null>, Prisma__ContactClient<ContactGetPayload<T> | Null>>;

    category<T extends IncomeCategoryArgs = {}>(args?: Subset<T, IncomeCategoryArgs>): CheckSelect<T, Prisma__IncomeCategoryClient<IncomeCategory | Null>, Prisma__IncomeCategoryClient<IncomeCategoryGetPayload<T> | Null>>;

    Owner<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    IncomeDebts<T extends IncomeDebtFindManyArgs = {}>(args?: Subset<T, IncomeDebtFindManyArgs>): CheckSelect<T, PrismaPromise<Array<IncomeDebt> | Null>, PrismaPromise<Array<IncomeDebtGetPayload<T>> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Income base type for findUnique actions
   */
  type IncomeFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Income
     * 
    **/
    select?: IncomeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeInclude | null
    /**
     * Filter, which Income to fetch.
     * 
    **/
    where: IncomeWhereUniqueInput
  }

  /**
   * Income: findUnique
   */
  interface IncomeFindUniqueArgs extends IncomeFindUniqueArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * Income base type for findFirst actions
   */
  type IncomeFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Income
     * 
    **/
    select?: IncomeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeInclude | null
    /**
     * Filter, which Income to fetch.
     * 
    **/
    where?: IncomeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Incomes to fetch.
     * 
    **/
    orderBy?: Enumerable<IncomeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Incomes.
     * 
    **/
    cursor?: IncomeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Incomes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Incomes.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Incomes.
     * 
    **/
    distinct?: Enumerable<IncomeScalarFieldEnum>
  }

  /**
   * Income: findFirst
   */
  interface IncomeFindFirstArgs extends IncomeFindFirstArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * Income findMany
   */
  type IncomeFindManyArgs = {
    /**
     * Select specific fields to fetch from the Income
     * 
    **/
    select?: IncomeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeInclude | null
    /**
     * Filter, which Incomes to fetch.
     * 
    **/
    where?: IncomeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Incomes to fetch.
     * 
    **/
    orderBy?: Enumerable<IncomeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Incomes.
     * 
    **/
    cursor?: IncomeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Incomes from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Incomes.
     * 
    **/
    skip?: number
    distinct?: Enumerable<IncomeScalarFieldEnum>
  }


  /**
   * Income create
   */
  type IncomeCreateArgs = {
    /**
     * Select specific fields to fetch from the Income
     * 
    **/
    select?: IncomeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeInclude | null
    /**
     * The data needed to create a Income.
     * 
    **/
    data: XOR<IncomeCreateInput, IncomeUncheckedCreateInput>
  }


  /**
   * Income createMany
   */
  type IncomeCreateManyArgs = {
    /**
     * The data used to create many Incomes.
     * 
    **/
    data: Enumerable<IncomeCreateManyInput>
  }


  /**
   * Income update
   */
  type IncomeUpdateArgs = {
    /**
     * Select specific fields to fetch from the Income
     * 
    **/
    select?: IncomeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeInclude | null
    /**
     * The data needed to update a Income.
     * 
    **/
    data: XOR<IncomeUpdateInput, IncomeUncheckedUpdateInput>
    /**
     * Choose, which Income to update.
     * 
    **/
    where: IncomeWhereUniqueInput
  }


  /**
   * Income updateMany
   */
  type IncomeUpdateManyArgs = {
    /**
     * The data used to update Incomes.
     * 
    **/
    data: XOR<IncomeUpdateManyMutationInput, IncomeUncheckedUpdateManyInput>
    /**
     * Filter which Incomes to update
     * 
    **/
    where?: IncomeWhereInput
  }


  /**
   * Income upsert
   */
  type IncomeUpsertArgs = {
    /**
     * Select specific fields to fetch from the Income
     * 
    **/
    select?: IncomeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeInclude | null
    /**
     * The filter to search for the Income to update in case it exists.
     * 
    **/
    where: IncomeWhereUniqueInput
    /**
     * In case the Income found by the `where` argument doesn't exist, create a new Income with this data.
     * 
    **/
    create: XOR<IncomeCreateInput, IncomeUncheckedCreateInput>
    /**
     * In case the Income was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<IncomeUpdateInput, IncomeUncheckedUpdateInput>
  }


  /**
   * Income delete
   */
  type IncomeDeleteArgs = {
    /**
     * Select specific fields to fetch from the Income
     * 
    **/
    select?: IncomeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeInclude | null
    /**
     * Filter which Income to delete.
     * 
    **/
    where: IncomeWhereUniqueInput
  }


  /**
   * Income deleteMany
   */
  type IncomeDeleteManyArgs = {
    /**
     * Filter which Incomes to delete
     * 
    **/
    where?: IncomeWhereInput
  }


  /**
   * Income findRaw
   */
  type IncomeFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * Income aggregateRaw
   */
  type IncomeAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * Income: findUniqueOrThrow
   */
  type IncomeFindUniqueOrThrowArgs = IncomeFindUniqueArgsBase


  /**
   * Income: findFirstOrThrow
   */
  type IncomeFindFirstOrThrowArgs = IncomeFindFirstArgsBase


  /**
   * Income without action
   */
  type IncomeArgs = {
    /**
     * Select specific fields to fetch from the Income
     * 
    **/
    select?: IncomeSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeInclude | null
  }



  /**
   * Model IncomeDebt
   */


  type AggregateIncomeDebt = {
    _count: IncomeDebtCountAggregateOutputType | null
    _min: IncomeDebtMinAggregateOutputType | null
    _max: IncomeDebtMaxAggregateOutputType | null
  }

  type IncomeDebtMinAggregateOutputType = {
    id: string | null
    initialDate: Date | null
    ownerId: string | null
  }

  type IncomeDebtMaxAggregateOutputType = {
    id: string | null
    initialDate: Date | null
    ownerId: string | null
  }

  type IncomeDebtCountAggregateOutputType = {
    id: number
    initialDate: number
    ownerId: number
    incomeIDs: number
    _all: number
  }


  type IncomeDebtMinAggregateInputType = {
    id?: true
    initialDate?: true
    ownerId?: true
  }

  type IncomeDebtMaxAggregateInputType = {
    id?: true
    initialDate?: true
    ownerId?: true
  }

  type IncomeDebtCountAggregateInputType = {
    id?: true
    initialDate?: true
    ownerId?: true
    incomeIDs?: true
    _all?: true
  }

  type IncomeDebtAggregateArgs = {
    /**
     * Filter which IncomeDebt to aggregate.
     * 
    **/
    where?: IncomeDebtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IncomeDebts to fetch.
     * 
    **/
    orderBy?: Enumerable<IncomeDebtOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: IncomeDebtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IncomeDebts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IncomeDebts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IncomeDebts
    **/
    _count?: true | IncomeDebtCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IncomeDebtMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IncomeDebtMaxAggregateInputType
  }

  type GetIncomeDebtAggregateType<T extends IncomeDebtAggregateArgs> = {
    [P in keyof T & keyof AggregateIncomeDebt]: P extends '_count' | 'count'
    ? T[P] extends true
    ? number
    : GetScalarType<T[P], AggregateIncomeDebt[P]>
    : GetScalarType<T[P], AggregateIncomeDebt[P]>
  }




  type IncomeDebtGroupByArgs = {
    where?: IncomeDebtWhereInput
    orderBy?: Enumerable<IncomeDebtOrderByWithAggregationInput>
    by: Array<IncomeDebtScalarFieldEnum>
    having?: IncomeDebtScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IncomeDebtCountAggregateInputType | true
    _min?: IncomeDebtMinAggregateInputType
    _max?: IncomeDebtMaxAggregateInputType
  }


  type IncomeDebtGroupByOutputType = {
    id: string
    initialDate: Date
    ownerId: string
    incomeIDs: string[]
    _count: IncomeDebtCountAggregateOutputType | null
    _min: IncomeDebtMinAggregateOutputType | null
    _max: IncomeDebtMaxAggregateOutputType | null
  }

  type GetIncomeDebtGroupByPayload<T extends IncomeDebtGroupByArgs> = PrismaPromise<
    Array<
      PickArray<IncomeDebtGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof IncomeDebtGroupByOutputType))]: P extends '_count'
        ? T[P] extends boolean
        ? number
        : GetScalarType<T[P], IncomeDebtGroupByOutputType[P]>
        : GetScalarType<T[P], IncomeDebtGroupByOutputType[P]>
      }
    >
  >


  type IncomeDebtSelect = {
    id?: boolean
    initialDate?: boolean
    Owner?: boolean | UserArgs
    ownerId?: boolean
    incomeIDs?: boolean
    incomes?: boolean | IncomeFindManyArgs
    payments?: boolean | DebtPaymentFindManyArgs
    _count?: boolean | IncomeDebtCountOutputTypeArgs
  }

  type IncomeDebtInclude = {
    Owner?: boolean | UserArgs
    incomes?: boolean | IncomeFindManyArgs
    payments?: boolean | DebtPaymentFindManyArgs
    _count?: boolean | IncomeDebtCountOutputTypeArgs
  }

  type IncomeDebtGetPayload<
    S extends boolean | null | undefined | IncomeDebtArgs,
    U = keyof S
  > = S extends true
    ? IncomeDebt
    : S extends undefined
    ? never
    : S extends IncomeDebtArgs | IncomeDebtFindManyArgs
    ? 'include' extends U
    ? IncomeDebt & {
      [P in TrueKeys<S['include']>]:
      P extends 'Owner' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :
      P extends 'incomes' ? Array<IncomeGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends 'payments' ? Array<DebtPaymentGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends '_count' ? IncomeDebtCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> : never
    }
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends 'Owner' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :
      P extends 'incomes' ? Array<IncomeGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends 'payments' ? Array<DebtPaymentGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends '_count' ? IncomeDebtCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> : P extends keyof IncomeDebt ? IncomeDebt[P] : never
    }
    : IncomeDebt
    : IncomeDebt


  type IncomeDebtCountArgs = Merge<
    Omit<IncomeDebtFindManyArgs, 'select' | 'include'> & {
      select?: IncomeDebtCountAggregateInputType | true
    }
  >

  interface IncomeDebtDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one IncomeDebt that matches the filter.
     * @param {IncomeDebtFindUniqueArgs} args - Arguments to find a IncomeDebt
     * @example
     * // Get one IncomeDebt
     * const incomeDebt = await prisma.incomeDebt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends IncomeDebtFindUniqueArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, IncomeDebtFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'IncomeDebt'> extends True ? CheckSelect<T, Prisma__IncomeDebtClient<IncomeDebt>, Prisma__IncomeDebtClient<IncomeDebtGetPayload<T>>> : CheckSelect<T, Prisma__IncomeDebtClient<IncomeDebt | null, null>, Prisma__IncomeDebtClient<IncomeDebtGetPayload<T> | null, null>>

    /**
     * Find the first IncomeDebt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeDebtFindFirstArgs} args - Arguments to find a IncomeDebt
     * @example
     * // Get one IncomeDebt
     * const incomeDebt = await prisma.incomeDebt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends IncomeDebtFindFirstArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, IncomeDebtFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'IncomeDebt'> extends True ? CheckSelect<T, Prisma__IncomeDebtClient<IncomeDebt>, Prisma__IncomeDebtClient<IncomeDebtGetPayload<T>>> : CheckSelect<T, Prisma__IncomeDebtClient<IncomeDebt | null, null>, Prisma__IncomeDebtClient<IncomeDebtGetPayload<T> | null, null>>

    /**
     * Find zero or more IncomeDebts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeDebtFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IncomeDebts
     * const incomeDebts = await prisma.incomeDebt.findMany()
     * 
     * // Get first 10 IncomeDebts
     * const incomeDebts = await prisma.incomeDebt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const incomeDebtWithIdOnly = await prisma.incomeDebt.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends IncomeDebtFindManyArgs>(
      args?: SelectSubset<T, IncomeDebtFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<IncomeDebt>>, PrismaPromise<Array<IncomeDebtGetPayload<T>>>>

    /**
     * Create a IncomeDebt.
     * @param {IncomeDebtCreateArgs} args - Arguments to create a IncomeDebt.
     * @example
     * // Create one IncomeDebt
     * const IncomeDebt = await prisma.incomeDebt.create({
     *   data: {
     *     // ... data to create a IncomeDebt
     *   }
     * })
     * 
    **/
    create<T extends IncomeDebtCreateArgs>(
      args: SelectSubset<T, IncomeDebtCreateArgs>
    ): CheckSelect<T, Prisma__IncomeDebtClient<IncomeDebt>, Prisma__IncomeDebtClient<IncomeDebtGetPayload<T>>>

    /**
     * Create many IncomeDebts.
     *     @param {IncomeDebtCreateManyArgs} args - Arguments to create many IncomeDebts.
     *     @example
     *     // Create many IncomeDebts
     *     const incomeDebt = await prisma.incomeDebt.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends IncomeDebtCreateManyArgs>(
      args?: SelectSubset<T, IncomeDebtCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a IncomeDebt.
     * @param {IncomeDebtDeleteArgs} args - Arguments to delete one IncomeDebt.
     * @example
     * // Delete one IncomeDebt
     * const IncomeDebt = await prisma.incomeDebt.delete({
     *   where: {
     *     // ... filter to delete one IncomeDebt
     *   }
     * })
     * 
    **/
    delete<T extends IncomeDebtDeleteArgs>(
      args: SelectSubset<T, IncomeDebtDeleteArgs>
    ): CheckSelect<T, Prisma__IncomeDebtClient<IncomeDebt>, Prisma__IncomeDebtClient<IncomeDebtGetPayload<T>>>

    /**
     * Update one IncomeDebt.
     * @param {IncomeDebtUpdateArgs} args - Arguments to update one IncomeDebt.
     * @example
     * // Update one IncomeDebt
     * const incomeDebt = await prisma.incomeDebt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends IncomeDebtUpdateArgs>(
      args: SelectSubset<T, IncomeDebtUpdateArgs>
    ): CheckSelect<T, Prisma__IncomeDebtClient<IncomeDebt>, Prisma__IncomeDebtClient<IncomeDebtGetPayload<T>>>

    /**
     * Delete zero or more IncomeDebts.
     * @param {IncomeDebtDeleteManyArgs} args - Arguments to filter IncomeDebts to delete.
     * @example
     * // Delete a few IncomeDebts
     * const { count } = await prisma.incomeDebt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends IncomeDebtDeleteManyArgs>(
      args?: SelectSubset<T, IncomeDebtDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more IncomeDebts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeDebtUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IncomeDebts
     * const incomeDebt = await prisma.incomeDebt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends IncomeDebtUpdateManyArgs>(
      args: SelectSubset<T, IncomeDebtUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one IncomeDebt.
     * @param {IncomeDebtUpsertArgs} args - Arguments to update or create a IncomeDebt.
     * @example
     * // Update or create a IncomeDebt
     * const incomeDebt = await prisma.incomeDebt.upsert({
     *   create: {
     *     // ... data to create a IncomeDebt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IncomeDebt we want to update
     *   }
     * })
    **/
    upsert<T extends IncomeDebtUpsertArgs>(
      args: SelectSubset<T, IncomeDebtUpsertArgs>
    ): CheckSelect<T, Prisma__IncomeDebtClient<IncomeDebt>, Prisma__IncomeDebtClient<IncomeDebtGetPayload<T>>>

    /**
     * Find zero or more IncomeDebts that matches the filter.
     * @param {IncomeDebtFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const incomeDebt = await prisma.incomeDebt.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: IncomeDebtFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a IncomeDebt.
     * @param {IncomeDebtAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const incomeDebt = await prisma.incomeDebt.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: IncomeDebtAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Find one IncomeDebt that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {IncomeDebtFindUniqueOrThrowArgs} args - Arguments to find a IncomeDebt
     * @example
     * // Get one IncomeDebt
     * const incomeDebt = await prisma.incomeDebt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends IncomeDebtFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, IncomeDebtFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__IncomeDebtClient<IncomeDebt>, Prisma__IncomeDebtClient<IncomeDebtGetPayload<T>>>

    /**
     * Find the first IncomeDebt that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeDebtFindFirstOrThrowArgs} args - Arguments to find a IncomeDebt
     * @example
     * // Get one IncomeDebt
     * const incomeDebt = await prisma.incomeDebt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends IncomeDebtFindFirstOrThrowArgs>(
      args?: SelectSubset<T, IncomeDebtFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__IncomeDebtClient<IncomeDebt>, Prisma__IncomeDebtClient<IncomeDebtGetPayload<T>>>

    /**
     * Count the number of IncomeDebts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeDebtCountArgs} args - Arguments to filter IncomeDebts to count.
     * @example
     * // Count the number of IncomeDebts
     * const count = await prisma.incomeDebt.count({
     *   where: {
     *     // ... the filter for the IncomeDebts we want to count
     *   }
     * })
    **/
    count<T extends IncomeDebtCountArgs>(
      args?: Subset<T, IncomeDebtCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
      ? T['select'] extends true
      ? number
      : GetScalarType<T['select'], IncomeDebtCountAggregateOutputType>
      : number
    >

    /**
     * Allows you to perform aggregations operations on a IncomeDebt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeDebtAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends IncomeDebtAggregateArgs>(args: Subset<T, IncomeDebtAggregateArgs>): PrismaPromise<GetIncomeDebtAggregateType<T>>

    /**
     * Group by IncomeDebt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeDebtGroupByArgs} args - Group by arguments.
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
      T extends IncomeDebtGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
      ? { orderBy: IncomeDebtGroupByArgs['orderBy'] }
      : { orderBy?: IncomeDebtGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, IncomeDebtGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIncomeDebtGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for IncomeDebt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  class Prisma__IncomeDebtClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Owner<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    incomes<T extends IncomeFindManyArgs = {}>(args?: Subset<T, IncomeFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Income> | Null>, PrismaPromise<Array<IncomeGetPayload<T>> | Null>>;

    payments<T extends DebtPaymentFindManyArgs = {}>(args?: Subset<T, DebtPaymentFindManyArgs>): CheckSelect<T, PrismaPromise<Array<DebtPayment> | Null>, PrismaPromise<Array<DebtPaymentGetPayload<T>> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * IncomeDebt base type for findUnique actions
   */
  type IncomeDebtFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the IncomeDebt
     * 
    **/
    select?: IncomeDebtSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeDebtInclude | null
    /**
     * Filter, which IncomeDebt to fetch.
     * 
    **/
    where: IncomeDebtWhereUniqueInput
  }

  /**
   * IncomeDebt: findUnique
   */
  interface IncomeDebtFindUniqueArgs extends IncomeDebtFindUniqueArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * IncomeDebt base type for findFirst actions
   */
  type IncomeDebtFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the IncomeDebt
     * 
    **/
    select?: IncomeDebtSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeDebtInclude | null
    /**
     * Filter, which IncomeDebt to fetch.
     * 
    **/
    where?: IncomeDebtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IncomeDebts to fetch.
     * 
    **/
    orderBy?: Enumerable<IncomeDebtOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IncomeDebts.
     * 
    **/
    cursor?: IncomeDebtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IncomeDebts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IncomeDebts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IncomeDebts.
     * 
    **/
    distinct?: Enumerable<IncomeDebtScalarFieldEnum>
  }

  /**
   * IncomeDebt: findFirst
   */
  interface IncomeDebtFindFirstArgs extends IncomeDebtFindFirstArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * IncomeDebt findMany
   */
  type IncomeDebtFindManyArgs = {
    /**
     * Select specific fields to fetch from the IncomeDebt
     * 
    **/
    select?: IncomeDebtSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeDebtInclude | null
    /**
     * Filter, which IncomeDebts to fetch.
     * 
    **/
    where?: IncomeDebtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IncomeDebts to fetch.
     * 
    **/
    orderBy?: Enumerable<IncomeDebtOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IncomeDebts.
     * 
    **/
    cursor?: IncomeDebtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IncomeDebts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IncomeDebts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<IncomeDebtScalarFieldEnum>
  }


  /**
   * IncomeDebt create
   */
  type IncomeDebtCreateArgs = {
    /**
     * Select specific fields to fetch from the IncomeDebt
     * 
    **/
    select?: IncomeDebtSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeDebtInclude | null
    /**
     * The data needed to create a IncomeDebt.
     * 
    **/
    data: XOR<IncomeDebtCreateInput, IncomeDebtUncheckedCreateInput>
  }


  /**
   * IncomeDebt createMany
   */
  type IncomeDebtCreateManyArgs = {
    /**
     * The data used to create many IncomeDebts.
     * 
    **/
    data: Enumerable<IncomeDebtCreateManyInput>
  }


  /**
   * IncomeDebt update
   */
  type IncomeDebtUpdateArgs = {
    /**
     * Select specific fields to fetch from the IncomeDebt
     * 
    **/
    select?: IncomeDebtSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeDebtInclude | null
    /**
     * The data needed to update a IncomeDebt.
     * 
    **/
    data: XOR<IncomeDebtUpdateInput, IncomeDebtUncheckedUpdateInput>
    /**
     * Choose, which IncomeDebt to update.
     * 
    **/
    where: IncomeDebtWhereUniqueInput
  }


  /**
   * IncomeDebt updateMany
   */
  type IncomeDebtUpdateManyArgs = {
    /**
     * The data used to update IncomeDebts.
     * 
    **/
    data: XOR<IncomeDebtUpdateManyMutationInput, IncomeDebtUncheckedUpdateManyInput>
    /**
     * Filter which IncomeDebts to update
     * 
    **/
    where?: IncomeDebtWhereInput
  }


  /**
   * IncomeDebt upsert
   */
  type IncomeDebtUpsertArgs = {
    /**
     * Select specific fields to fetch from the IncomeDebt
     * 
    **/
    select?: IncomeDebtSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeDebtInclude | null
    /**
     * The filter to search for the IncomeDebt to update in case it exists.
     * 
    **/
    where: IncomeDebtWhereUniqueInput
    /**
     * In case the IncomeDebt found by the `where` argument doesn't exist, create a new IncomeDebt with this data.
     * 
    **/
    create: XOR<IncomeDebtCreateInput, IncomeDebtUncheckedCreateInput>
    /**
     * In case the IncomeDebt was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<IncomeDebtUpdateInput, IncomeDebtUncheckedUpdateInput>
  }


  /**
   * IncomeDebt delete
   */
  type IncomeDebtDeleteArgs = {
    /**
     * Select specific fields to fetch from the IncomeDebt
     * 
    **/
    select?: IncomeDebtSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeDebtInclude | null
    /**
     * Filter which IncomeDebt to delete.
     * 
    **/
    where: IncomeDebtWhereUniqueInput
  }


  /**
   * IncomeDebt deleteMany
   */
  type IncomeDebtDeleteManyArgs = {
    /**
     * Filter which IncomeDebts to delete
     * 
    **/
    where?: IncomeDebtWhereInput
  }


  /**
   * IncomeDebt findRaw
   */
  type IncomeDebtFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * IncomeDebt aggregateRaw
   */
  type IncomeDebtAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * IncomeDebt: findUniqueOrThrow
   */
  type IncomeDebtFindUniqueOrThrowArgs = IncomeDebtFindUniqueArgsBase


  /**
   * IncomeDebt: findFirstOrThrow
   */
  type IncomeDebtFindFirstOrThrowArgs = IncomeDebtFindFirstArgsBase


  /**
   * IncomeDebt without action
   */
  type IncomeDebtArgs = {
    /**
     * Select specific fields to fetch from the IncomeDebt
     * 
    **/
    select?: IncomeDebtSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeDebtInclude | null
  }



  /**
   * Model ExpenseDebt
   */


  type AggregateExpenseDebt = {
    _count: ExpenseDebtCountAggregateOutputType | null
    _min: ExpenseDebtMinAggregateOutputType | null
    _max: ExpenseDebtMaxAggregateOutputType | null
  }

  type ExpenseDebtMinAggregateOutputType = {
    id: string | null
    initialDate: Date | null
    ownerId: string | null
  }

  type ExpenseDebtMaxAggregateOutputType = {
    id: string | null
    initialDate: Date | null
    ownerId: string | null
  }

  type ExpenseDebtCountAggregateOutputType = {
    id: number
    initialDate: number
    ownerId: number
    expenseIDs: number
    _all: number
  }


  type ExpenseDebtMinAggregateInputType = {
    id?: true
    initialDate?: true
    ownerId?: true
  }

  type ExpenseDebtMaxAggregateInputType = {
    id?: true
    initialDate?: true
    ownerId?: true
  }

  type ExpenseDebtCountAggregateInputType = {
    id?: true
    initialDate?: true
    ownerId?: true
    expenseIDs?: true
    _all?: true
  }

  type ExpenseDebtAggregateArgs = {
    /**
     * Filter which ExpenseDebt to aggregate.
     * 
    **/
    where?: ExpenseDebtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseDebts to fetch.
     * 
    **/
    orderBy?: Enumerable<ExpenseDebtOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ExpenseDebtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseDebts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseDebts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExpenseDebts
    **/
    _count?: true | ExpenseDebtCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpenseDebtMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpenseDebtMaxAggregateInputType
  }

  type GetExpenseDebtAggregateType<T extends ExpenseDebtAggregateArgs> = {
    [P in keyof T & keyof AggregateExpenseDebt]: P extends '_count' | 'count'
    ? T[P] extends true
    ? number
    : GetScalarType<T[P], AggregateExpenseDebt[P]>
    : GetScalarType<T[P], AggregateExpenseDebt[P]>
  }




  type ExpenseDebtGroupByArgs = {
    where?: ExpenseDebtWhereInput
    orderBy?: Enumerable<ExpenseDebtOrderByWithAggregationInput>
    by: Array<ExpenseDebtScalarFieldEnum>
    having?: ExpenseDebtScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpenseDebtCountAggregateInputType | true
    _min?: ExpenseDebtMinAggregateInputType
    _max?: ExpenseDebtMaxAggregateInputType
  }


  type ExpenseDebtGroupByOutputType = {
    id: string
    initialDate: Date
    ownerId: string
    expenseIDs: string[]
    _count: ExpenseDebtCountAggregateOutputType | null
    _min: ExpenseDebtMinAggregateOutputType | null
    _max: ExpenseDebtMaxAggregateOutputType | null
  }

  type GetExpenseDebtGroupByPayload<T extends ExpenseDebtGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ExpenseDebtGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof ExpenseDebtGroupByOutputType))]: P extends '_count'
        ? T[P] extends boolean
        ? number
        : GetScalarType<T[P], ExpenseDebtGroupByOutputType[P]>
        : GetScalarType<T[P], ExpenseDebtGroupByOutputType[P]>
      }
    >
  >


  type ExpenseDebtSelect = {
    id?: boolean
    initialDate?: boolean
    Owner?: boolean | UserArgs
    ownerId?: boolean
    expenseIDs?: boolean
    expenses?: boolean | ExpenseFindManyArgs
    payments?: boolean | DebtPaymentFindManyArgs
    _count?: boolean | ExpenseDebtCountOutputTypeArgs
  }

  type ExpenseDebtInclude = {
    Owner?: boolean | UserArgs
    expenses?: boolean | ExpenseFindManyArgs
    payments?: boolean | DebtPaymentFindManyArgs
    _count?: boolean | ExpenseDebtCountOutputTypeArgs
  }

  type ExpenseDebtGetPayload<
    S extends boolean | null | undefined | ExpenseDebtArgs,
    U = keyof S
  > = S extends true
    ? ExpenseDebt
    : S extends undefined
    ? never
    : S extends ExpenseDebtArgs | ExpenseDebtFindManyArgs
    ? 'include' extends U
    ? ExpenseDebt & {
      [P in TrueKeys<S['include']>]:
      P extends 'Owner' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :
      P extends 'expenses' ? Array<ExpenseGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends 'payments' ? Array<DebtPaymentGetPayload<Exclude<S['include'], undefined | null>[P]>> :
      P extends '_count' ? ExpenseDebtCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> : never
    }
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends 'Owner' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :
      P extends 'expenses' ? Array<ExpenseGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends 'payments' ? Array<DebtPaymentGetPayload<Exclude<S['select'], undefined | null>[P]>> :
      P extends '_count' ? ExpenseDebtCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> : P extends keyof ExpenseDebt ? ExpenseDebt[P] : never
    }
    : ExpenseDebt
    : ExpenseDebt


  type ExpenseDebtCountArgs = Merge<
    Omit<ExpenseDebtFindManyArgs, 'select' | 'include'> & {
      select?: ExpenseDebtCountAggregateInputType | true
    }
  >

  interface ExpenseDebtDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one ExpenseDebt that matches the filter.
     * @param {ExpenseDebtFindUniqueArgs} args - Arguments to find a ExpenseDebt
     * @example
     * // Get one ExpenseDebt
     * const expenseDebt = await prisma.expenseDebt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ExpenseDebtFindUniqueArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ExpenseDebtFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ExpenseDebt'> extends True ? CheckSelect<T, Prisma__ExpenseDebtClient<ExpenseDebt>, Prisma__ExpenseDebtClient<ExpenseDebtGetPayload<T>>> : CheckSelect<T, Prisma__ExpenseDebtClient<ExpenseDebt | null, null>, Prisma__ExpenseDebtClient<ExpenseDebtGetPayload<T> | null, null>>

    /**
     * Find the first ExpenseDebt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseDebtFindFirstArgs} args - Arguments to find a ExpenseDebt
     * @example
     * // Get one ExpenseDebt
     * const expenseDebt = await prisma.expenseDebt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ExpenseDebtFindFirstArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ExpenseDebtFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ExpenseDebt'> extends True ? CheckSelect<T, Prisma__ExpenseDebtClient<ExpenseDebt>, Prisma__ExpenseDebtClient<ExpenseDebtGetPayload<T>>> : CheckSelect<T, Prisma__ExpenseDebtClient<ExpenseDebt | null, null>, Prisma__ExpenseDebtClient<ExpenseDebtGetPayload<T> | null, null>>

    /**
     * Find zero or more ExpenseDebts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseDebtFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExpenseDebts
     * const expenseDebts = await prisma.expenseDebt.findMany()
     * 
     * // Get first 10 ExpenseDebts
     * const expenseDebts = await prisma.expenseDebt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const expenseDebtWithIdOnly = await prisma.expenseDebt.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ExpenseDebtFindManyArgs>(
      args?: SelectSubset<T, ExpenseDebtFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ExpenseDebt>>, PrismaPromise<Array<ExpenseDebtGetPayload<T>>>>

    /**
     * Create a ExpenseDebt.
     * @param {ExpenseDebtCreateArgs} args - Arguments to create a ExpenseDebt.
     * @example
     * // Create one ExpenseDebt
     * const ExpenseDebt = await prisma.expenseDebt.create({
     *   data: {
     *     // ... data to create a ExpenseDebt
     *   }
     * })
     * 
    **/
    create<T extends ExpenseDebtCreateArgs>(
      args: SelectSubset<T, ExpenseDebtCreateArgs>
    ): CheckSelect<T, Prisma__ExpenseDebtClient<ExpenseDebt>, Prisma__ExpenseDebtClient<ExpenseDebtGetPayload<T>>>

    /**
     * Create many ExpenseDebts.
     *     @param {ExpenseDebtCreateManyArgs} args - Arguments to create many ExpenseDebts.
     *     @example
     *     // Create many ExpenseDebts
     *     const expenseDebt = await prisma.expenseDebt.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ExpenseDebtCreateManyArgs>(
      args?: SelectSubset<T, ExpenseDebtCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ExpenseDebt.
     * @param {ExpenseDebtDeleteArgs} args - Arguments to delete one ExpenseDebt.
     * @example
     * // Delete one ExpenseDebt
     * const ExpenseDebt = await prisma.expenseDebt.delete({
     *   where: {
     *     // ... filter to delete one ExpenseDebt
     *   }
     * })
     * 
    **/
    delete<T extends ExpenseDebtDeleteArgs>(
      args: SelectSubset<T, ExpenseDebtDeleteArgs>
    ): CheckSelect<T, Prisma__ExpenseDebtClient<ExpenseDebt>, Prisma__ExpenseDebtClient<ExpenseDebtGetPayload<T>>>

    /**
     * Update one ExpenseDebt.
     * @param {ExpenseDebtUpdateArgs} args - Arguments to update one ExpenseDebt.
     * @example
     * // Update one ExpenseDebt
     * const expenseDebt = await prisma.expenseDebt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ExpenseDebtUpdateArgs>(
      args: SelectSubset<T, ExpenseDebtUpdateArgs>
    ): CheckSelect<T, Prisma__ExpenseDebtClient<ExpenseDebt>, Prisma__ExpenseDebtClient<ExpenseDebtGetPayload<T>>>

    /**
     * Delete zero or more ExpenseDebts.
     * @param {ExpenseDebtDeleteManyArgs} args - Arguments to filter ExpenseDebts to delete.
     * @example
     * // Delete a few ExpenseDebts
     * const { count } = await prisma.expenseDebt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ExpenseDebtDeleteManyArgs>(
      args?: SelectSubset<T, ExpenseDebtDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExpenseDebts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseDebtUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExpenseDebts
     * const expenseDebt = await prisma.expenseDebt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ExpenseDebtUpdateManyArgs>(
      args: SelectSubset<T, ExpenseDebtUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ExpenseDebt.
     * @param {ExpenseDebtUpsertArgs} args - Arguments to update or create a ExpenseDebt.
     * @example
     * // Update or create a ExpenseDebt
     * const expenseDebt = await prisma.expenseDebt.upsert({
     *   create: {
     *     // ... data to create a ExpenseDebt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExpenseDebt we want to update
     *   }
     * })
    **/
    upsert<T extends ExpenseDebtUpsertArgs>(
      args: SelectSubset<T, ExpenseDebtUpsertArgs>
    ): CheckSelect<T, Prisma__ExpenseDebtClient<ExpenseDebt>, Prisma__ExpenseDebtClient<ExpenseDebtGetPayload<T>>>

    /**
     * Find zero or more ExpenseDebts that matches the filter.
     * @param {ExpenseDebtFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const expenseDebt = await prisma.expenseDebt.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: ExpenseDebtFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a ExpenseDebt.
     * @param {ExpenseDebtAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const expenseDebt = await prisma.expenseDebt.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: ExpenseDebtAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Find one ExpenseDebt that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {ExpenseDebtFindUniqueOrThrowArgs} args - Arguments to find a ExpenseDebt
     * @example
     * // Get one ExpenseDebt
     * const expenseDebt = await prisma.expenseDebt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ExpenseDebtFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ExpenseDebtFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__ExpenseDebtClient<ExpenseDebt>, Prisma__ExpenseDebtClient<ExpenseDebtGetPayload<T>>>

    /**
     * Find the first ExpenseDebt that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseDebtFindFirstOrThrowArgs} args - Arguments to find a ExpenseDebt
     * @example
     * // Get one ExpenseDebt
     * const expenseDebt = await prisma.expenseDebt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ExpenseDebtFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ExpenseDebtFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__ExpenseDebtClient<ExpenseDebt>, Prisma__ExpenseDebtClient<ExpenseDebtGetPayload<T>>>

    /**
     * Count the number of ExpenseDebts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseDebtCountArgs} args - Arguments to filter ExpenseDebts to count.
     * @example
     * // Count the number of ExpenseDebts
     * const count = await prisma.expenseDebt.count({
     *   where: {
     *     // ... the filter for the ExpenseDebts we want to count
     *   }
     * })
    **/
    count<T extends ExpenseDebtCountArgs>(
      args?: Subset<T, ExpenseDebtCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
      ? T['select'] extends true
      ? number
      : GetScalarType<T['select'], ExpenseDebtCountAggregateOutputType>
      : number
    >

    /**
     * Allows you to perform aggregations operations on a ExpenseDebt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseDebtAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ExpenseDebtAggregateArgs>(args: Subset<T, ExpenseDebtAggregateArgs>): PrismaPromise<GetExpenseDebtAggregateType<T>>

    /**
     * Group by ExpenseDebt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseDebtGroupByArgs} args - Group by arguments.
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
      T extends ExpenseDebtGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
      ? { orderBy: ExpenseDebtGroupByArgs['orderBy'] }
      : { orderBy?: ExpenseDebtGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ExpenseDebtGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpenseDebtGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for ExpenseDebt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  class Prisma__ExpenseDebtClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Owner<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    expenses<T extends ExpenseFindManyArgs = {}>(args?: Subset<T, ExpenseFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Expense> | Null>, PrismaPromise<Array<ExpenseGetPayload<T>> | Null>>;

    payments<T extends DebtPaymentFindManyArgs = {}>(args?: Subset<T, DebtPaymentFindManyArgs>): CheckSelect<T, PrismaPromise<Array<DebtPayment> | Null>, PrismaPromise<Array<DebtPaymentGetPayload<T>> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * ExpenseDebt base type for findUnique actions
   */
  type ExpenseDebtFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the ExpenseDebt
     * 
    **/
    select?: ExpenseDebtSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseDebtInclude | null
    /**
     * Filter, which ExpenseDebt to fetch.
     * 
    **/
    where: ExpenseDebtWhereUniqueInput
  }

  /**
   * ExpenseDebt: findUnique
   */
  interface ExpenseDebtFindUniqueArgs extends ExpenseDebtFindUniqueArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * ExpenseDebt base type for findFirst actions
   */
  type ExpenseDebtFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the ExpenseDebt
     * 
    **/
    select?: ExpenseDebtSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseDebtInclude | null
    /**
     * Filter, which ExpenseDebt to fetch.
     * 
    **/
    where?: ExpenseDebtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseDebts to fetch.
     * 
    **/
    orderBy?: Enumerable<ExpenseDebtOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExpenseDebts.
     * 
    **/
    cursor?: ExpenseDebtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseDebts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseDebts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExpenseDebts.
     * 
    **/
    distinct?: Enumerable<ExpenseDebtScalarFieldEnum>
  }

  /**
   * ExpenseDebt: findFirst
   */
  interface ExpenseDebtFindFirstArgs extends ExpenseDebtFindFirstArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * ExpenseDebt findMany
   */
  type ExpenseDebtFindManyArgs = {
    /**
     * Select specific fields to fetch from the ExpenseDebt
     * 
    **/
    select?: ExpenseDebtSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseDebtInclude | null
    /**
     * Filter, which ExpenseDebts to fetch.
     * 
    **/
    where?: ExpenseDebtWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseDebts to fetch.
     * 
    **/
    orderBy?: Enumerable<ExpenseDebtOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExpenseDebts.
     * 
    **/
    cursor?: ExpenseDebtWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseDebts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseDebts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ExpenseDebtScalarFieldEnum>
  }


  /**
   * ExpenseDebt create
   */
  type ExpenseDebtCreateArgs = {
    /**
     * Select specific fields to fetch from the ExpenseDebt
     * 
    **/
    select?: ExpenseDebtSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseDebtInclude | null
    /**
     * The data needed to create a ExpenseDebt.
     * 
    **/
    data: XOR<ExpenseDebtCreateInput, ExpenseDebtUncheckedCreateInput>
  }


  /**
   * ExpenseDebt createMany
   */
  type ExpenseDebtCreateManyArgs = {
    /**
     * The data used to create many ExpenseDebts.
     * 
    **/
    data: Enumerable<ExpenseDebtCreateManyInput>
  }


  /**
   * ExpenseDebt update
   */
  type ExpenseDebtUpdateArgs = {
    /**
     * Select specific fields to fetch from the ExpenseDebt
     * 
    **/
    select?: ExpenseDebtSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseDebtInclude | null
    /**
     * The data needed to update a ExpenseDebt.
     * 
    **/
    data: XOR<ExpenseDebtUpdateInput, ExpenseDebtUncheckedUpdateInput>
    /**
     * Choose, which ExpenseDebt to update.
     * 
    **/
    where: ExpenseDebtWhereUniqueInput
  }


  /**
   * ExpenseDebt updateMany
   */
  type ExpenseDebtUpdateManyArgs = {
    /**
     * The data used to update ExpenseDebts.
     * 
    **/
    data: XOR<ExpenseDebtUpdateManyMutationInput, ExpenseDebtUncheckedUpdateManyInput>
    /**
     * Filter which ExpenseDebts to update
     * 
    **/
    where?: ExpenseDebtWhereInput
  }


  /**
   * ExpenseDebt upsert
   */
  type ExpenseDebtUpsertArgs = {
    /**
     * Select specific fields to fetch from the ExpenseDebt
     * 
    **/
    select?: ExpenseDebtSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseDebtInclude | null
    /**
     * The filter to search for the ExpenseDebt to update in case it exists.
     * 
    **/
    where: ExpenseDebtWhereUniqueInput
    /**
     * In case the ExpenseDebt found by the `where` argument doesn't exist, create a new ExpenseDebt with this data.
     * 
    **/
    create: XOR<ExpenseDebtCreateInput, ExpenseDebtUncheckedCreateInput>
    /**
     * In case the ExpenseDebt was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ExpenseDebtUpdateInput, ExpenseDebtUncheckedUpdateInput>
  }


  /**
   * ExpenseDebt delete
   */
  type ExpenseDebtDeleteArgs = {
    /**
     * Select specific fields to fetch from the ExpenseDebt
     * 
    **/
    select?: ExpenseDebtSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseDebtInclude | null
    /**
     * Filter which ExpenseDebt to delete.
     * 
    **/
    where: ExpenseDebtWhereUniqueInput
  }


  /**
   * ExpenseDebt deleteMany
   */
  type ExpenseDebtDeleteManyArgs = {
    /**
     * Filter which ExpenseDebts to delete
     * 
    **/
    where?: ExpenseDebtWhereInput
  }


  /**
   * ExpenseDebt findRaw
   */
  type ExpenseDebtFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * ExpenseDebt aggregateRaw
   */
  type ExpenseDebtAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * ExpenseDebt: findUniqueOrThrow
   */
  type ExpenseDebtFindUniqueOrThrowArgs = ExpenseDebtFindUniqueArgsBase


  /**
   * ExpenseDebt: findFirstOrThrow
   */
  type ExpenseDebtFindFirstOrThrowArgs = ExpenseDebtFindFirstArgsBase


  /**
   * ExpenseDebt without action
   */
  type ExpenseDebtArgs = {
    /**
     * Select specific fields to fetch from the ExpenseDebt
     * 
    **/
    select?: ExpenseDebtSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ExpenseDebtInclude | null
  }



  /**
   * Model IncomeProducts
   */


  type AggregateIncomeProducts = {
    _count: IncomeProductsCountAggregateOutputType | null
    _avg: IncomeProductsAvgAggregateOutputType | null
    _sum: IncomeProductsSumAggregateOutputType | null
    _min: IncomeProductsMinAggregateOutputType | null
    _max: IncomeProductsMaxAggregateOutputType | null
  }

  type IncomeProductsAvgAggregateOutputType = {
    quantity: number | null
    price: number | null
  }

  type IncomeProductsSumAggregateOutputType = {
    quantity: number | null
    price: number | null
  }

  type IncomeProductsMinAggregateOutputType = {
    id: string | null
    quantity: number | null
    price: number | null
    incomeId: string | null
    productId: string | null
  }

  type IncomeProductsMaxAggregateOutputType = {
    id: string | null
    quantity: number | null
    price: number | null
    incomeId: string | null
    productId: string | null
  }

  type IncomeProductsCountAggregateOutputType = {
    id: number
    quantity: number
    price: number
    incomeId: number
    productId: number
    _all: number
  }


  type IncomeProductsAvgAggregateInputType = {
    quantity?: true
    price?: true
  }

  type IncomeProductsSumAggregateInputType = {
    quantity?: true
    price?: true
  }

  type IncomeProductsMinAggregateInputType = {
    id?: true
    quantity?: true
    price?: true
    incomeId?: true
    productId?: true
  }

  type IncomeProductsMaxAggregateInputType = {
    id?: true
    quantity?: true
    price?: true
    incomeId?: true
    productId?: true
  }

  type IncomeProductsCountAggregateInputType = {
    id?: true
    quantity?: true
    price?: true
    incomeId?: true
    productId?: true
    _all?: true
  }

  type IncomeProductsAggregateArgs = {
    /**
     * Filter which IncomeProducts to aggregate.
     * 
    **/
    where?: IncomeProductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IncomeProducts to fetch.
     * 
    **/
    orderBy?: Enumerable<IncomeProductsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: IncomeProductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IncomeProducts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IncomeProducts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IncomeProducts
    **/
    _count?: true | IncomeProductsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IncomeProductsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IncomeProductsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IncomeProductsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IncomeProductsMaxAggregateInputType
  }

  type GetIncomeProductsAggregateType<T extends IncomeProductsAggregateArgs> = {
    [P in keyof T & keyof AggregateIncomeProducts]: P extends '_count' | 'count'
    ? T[P] extends true
    ? number
    : GetScalarType<T[P], AggregateIncomeProducts[P]>
    : GetScalarType<T[P], AggregateIncomeProducts[P]>
  }




  type IncomeProductsGroupByArgs = {
    where?: IncomeProductsWhereInput
    orderBy?: Enumerable<IncomeProductsOrderByWithAggregationInput>
    by: Array<IncomeProductsScalarFieldEnum>
    having?: IncomeProductsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IncomeProductsCountAggregateInputType | true
    _avg?: IncomeProductsAvgAggregateInputType
    _sum?: IncomeProductsSumAggregateInputType
    _min?: IncomeProductsMinAggregateInputType
    _max?: IncomeProductsMaxAggregateInputType
  }


  type IncomeProductsGroupByOutputType = {
    id: string
    quantity: number
    price: number
    incomeId: string
    productId: string
    _count: IncomeProductsCountAggregateOutputType | null
    _avg: IncomeProductsAvgAggregateOutputType | null
    _sum: IncomeProductsSumAggregateOutputType | null
    _min: IncomeProductsMinAggregateOutputType | null
    _max: IncomeProductsMaxAggregateOutputType | null
  }

  type GetIncomeProductsGroupByPayload<T extends IncomeProductsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<IncomeProductsGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof IncomeProductsGroupByOutputType))]: P extends '_count'
        ? T[P] extends boolean
        ? number
        : GetScalarType<T[P], IncomeProductsGroupByOutputType[P]>
        : GetScalarType<T[P], IncomeProductsGroupByOutputType[P]>
      }
    >
  >


  type IncomeProductsSelect = {
    id?: boolean
    quantity?: boolean
    price?: boolean
    income?: boolean | IncomeArgs
    incomeId?: boolean
    product?: boolean | ProductArgs
    productId?: boolean
  }

  type IncomeProductsInclude = {
    income?: boolean | IncomeArgs
    product?: boolean | ProductArgs
  }

  type IncomeProductsGetPayload<
    S extends boolean | null | undefined | IncomeProductsArgs,
    U = keyof S
  > = S extends true
    ? IncomeProducts
    : S extends undefined
    ? never
    : S extends IncomeProductsArgs | IncomeProductsFindManyArgs
    ? 'include' extends U
    ? IncomeProducts & {
      [P in TrueKeys<S['include']>]:
      P extends 'income' ? IncomeGetPayload<Exclude<S['include'], undefined | null>[P]> :
      P extends 'product' ? ProductGetPayload<Exclude<S['include'], undefined | null>[P]> : never
    }
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends 'income' ? IncomeGetPayload<Exclude<S['select'], undefined | null>[P]> :
      P extends 'product' ? ProductGetPayload<Exclude<S['select'], undefined | null>[P]> : P extends keyof IncomeProducts ? IncomeProducts[P] : never
    }
    : IncomeProducts
    : IncomeProducts


  type IncomeProductsCountArgs = Merge<
    Omit<IncomeProductsFindManyArgs, 'select' | 'include'> & {
      select?: IncomeProductsCountAggregateInputType | true
    }
  >

  interface IncomeProductsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one IncomeProducts that matches the filter.
     * @param {IncomeProductsFindUniqueArgs} args - Arguments to find a IncomeProducts
     * @example
     * // Get one IncomeProducts
     * const incomeProducts = await prisma.incomeProducts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends IncomeProductsFindUniqueArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, IncomeProductsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'IncomeProducts'> extends True ? CheckSelect<T, Prisma__IncomeProductsClient<IncomeProducts>, Prisma__IncomeProductsClient<IncomeProductsGetPayload<T>>> : CheckSelect<T, Prisma__IncomeProductsClient<IncomeProducts | null, null>, Prisma__IncomeProductsClient<IncomeProductsGetPayload<T> | null, null>>

    /**
     * Find the first IncomeProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeProductsFindFirstArgs} args - Arguments to find a IncomeProducts
     * @example
     * // Get one IncomeProducts
     * const incomeProducts = await prisma.incomeProducts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends IncomeProductsFindFirstArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, IncomeProductsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'IncomeProducts'> extends True ? CheckSelect<T, Prisma__IncomeProductsClient<IncomeProducts>, Prisma__IncomeProductsClient<IncomeProductsGetPayload<T>>> : CheckSelect<T, Prisma__IncomeProductsClient<IncomeProducts | null, null>, Prisma__IncomeProductsClient<IncomeProductsGetPayload<T> | null, null>>

    /**
     * Find zero or more IncomeProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeProductsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IncomeProducts
     * const incomeProducts = await prisma.incomeProducts.findMany()
     * 
     * // Get first 10 IncomeProducts
     * const incomeProducts = await prisma.incomeProducts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const incomeProductsWithIdOnly = await prisma.incomeProducts.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends IncomeProductsFindManyArgs>(
      args?: SelectSubset<T, IncomeProductsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<IncomeProducts>>, PrismaPromise<Array<IncomeProductsGetPayload<T>>>>

    /**
     * Create a IncomeProducts.
     * @param {IncomeProductsCreateArgs} args - Arguments to create a IncomeProducts.
     * @example
     * // Create one IncomeProducts
     * const IncomeProducts = await prisma.incomeProducts.create({
     *   data: {
     *     // ... data to create a IncomeProducts
     *   }
     * })
     * 
    **/
    create<T extends IncomeProductsCreateArgs>(
      args: SelectSubset<T, IncomeProductsCreateArgs>
    ): CheckSelect<T, Prisma__IncomeProductsClient<IncomeProducts>, Prisma__IncomeProductsClient<IncomeProductsGetPayload<T>>>

    /**
     * Create many IncomeProducts.
     *     @param {IncomeProductsCreateManyArgs} args - Arguments to create many IncomeProducts.
     *     @example
     *     // Create many IncomeProducts
     *     const incomeProducts = await prisma.incomeProducts.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends IncomeProductsCreateManyArgs>(
      args?: SelectSubset<T, IncomeProductsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a IncomeProducts.
     * @param {IncomeProductsDeleteArgs} args - Arguments to delete one IncomeProducts.
     * @example
     * // Delete one IncomeProducts
     * const IncomeProducts = await prisma.incomeProducts.delete({
     *   where: {
     *     // ... filter to delete one IncomeProducts
     *   }
     * })
     * 
    **/
    delete<T extends IncomeProductsDeleteArgs>(
      args: SelectSubset<T, IncomeProductsDeleteArgs>
    ): CheckSelect<T, Prisma__IncomeProductsClient<IncomeProducts>, Prisma__IncomeProductsClient<IncomeProductsGetPayload<T>>>

    /**
     * Update one IncomeProducts.
     * @param {IncomeProductsUpdateArgs} args - Arguments to update one IncomeProducts.
     * @example
     * // Update one IncomeProducts
     * const incomeProducts = await prisma.incomeProducts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends IncomeProductsUpdateArgs>(
      args: SelectSubset<T, IncomeProductsUpdateArgs>
    ): CheckSelect<T, Prisma__IncomeProductsClient<IncomeProducts>, Prisma__IncomeProductsClient<IncomeProductsGetPayload<T>>>

    /**
     * Delete zero or more IncomeProducts.
     * @param {IncomeProductsDeleteManyArgs} args - Arguments to filter IncomeProducts to delete.
     * @example
     * // Delete a few IncomeProducts
     * const { count } = await prisma.incomeProducts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends IncomeProductsDeleteManyArgs>(
      args?: SelectSubset<T, IncomeProductsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more IncomeProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeProductsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IncomeProducts
     * const incomeProducts = await prisma.incomeProducts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends IncomeProductsUpdateManyArgs>(
      args: SelectSubset<T, IncomeProductsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one IncomeProducts.
     * @param {IncomeProductsUpsertArgs} args - Arguments to update or create a IncomeProducts.
     * @example
     * // Update or create a IncomeProducts
     * const incomeProducts = await prisma.incomeProducts.upsert({
     *   create: {
     *     // ... data to create a IncomeProducts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IncomeProducts we want to update
     *   }
     * })
    **/
    upsert<T extends IncomeProductsUpsertArgs>(
      args: SelectSubset<T, IncomeProductsUpsertArgs>
    ): CheckSelect<T, Prisma__IncomeProductsClient<IncomeProducts>, Prisma__IncomeProductsClient<IncomeProductsGetPayload<T>>>

    /**
     * Find zero or more IncomeProducts that matches the filter.
     * @param {IncomeProductsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const incomeProducts = await prisma.incomeProducts.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: IncomeProductsFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a IncomeProducts.
     * @param {IncomeProductsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const incomeProducts = await prisma.incomeProducts.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: IncomeProductsAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Find one IncomeProducts that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {IncomeProductsFindUniqueOrThrowArgs} args - Arguments to find a IncomeProducts
     * @example
     * // Get one IncomeProducts
     * const incomeProducts = await prisma.incomeProducts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends IncomeProductsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, IncomeProductsFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__IncomeProductsClient<IncomeProducts>, Prisma__IncomeProductsClient<IncomeProductsGetPayload<T>>>

    /**
     * Find the first IncomeProducts that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeProductsFindFirstOrThrowArgs} args - Arguments to find a IncomeProducts
     * @example
     * // Get one IncomeProducts
     * const incomeProducts = await prisma.incomeProducts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends IncomeProductsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, IncomeProductsFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__IncomeProductsClient<IncomeProducts>, Prisma__IncomeProductsClient<IncomeProductsGetPayload<T>>>

    /**
     * Count the number of IncomeProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeProductsCountArgs} args - Arguments to filter IncomeProducts to count.
     * @example
     * // Count the number of IncomeProducts
     * const count = await prisma.incomeProducts.count({
     *   where: {
     *     // ... the filter for the IncomeProducts we want to count
     *   }
     * })
    **/
    count<T extends IncomeProductsCountArgs>(
      args?: Subset<T, IncomeProductsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
      ? T['select'] extends true
      ? number
      : GetScalarType<T['select'], IncomeProductsCountAggregateOutputType>
      : number
    >

    /**
     * Allows you to perform aggregations operations on a IncomeProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeProductsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends IncomeProductsAggregateArgs>(args: Subset<T, IncomeProductsAggregateArgs>): PrismaPromise<GetIncomeProductsAggregateType<T>>

    /**
     * Group by IncomeProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncomeProductsGroupByArgs} args - Group by arguments.
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
      T extends IncomeProductsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
      ? { orderBy: IncomeProductsGroupByArgs['orderBy'] }
      : { orderBy?: IncomeProductsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, IncomeProductsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIncomeProductsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for IncomeProducts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  class Prisma__IncomeProductsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    income<T extends IncomeArgs = {}>(args?: Subset<T, IncomeArgs>): CheckSelect<T, Prisma__IncomeClient<Income | Null>, Prisma__IncomeClient<IncomeGetPayload<T> | Null>>;

    product<T extends ProductArgs = {}>(args?: Subset<T, ProductArgs>): CheckSelect<T, Prisma__ProductClient<Product | Null>, Prisma__ProductClient<ProductGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * IncomeProducts base type for findUnique actions
   */
  type IncomeProductsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the IncomeProducts
     * 
    **/
    select?: IncomeProductsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeProductsInclude | null
    /**
     * Filter, which IncomeProducts to fetch.
     * 
    **/
    where: IncomeProductsWhereUniqueInput
  }

  /**
   * IncomeProducts: findUnique
   */
  interface IncomeProductsFindUniqueArgs extends IncomeProductsFindUniqueArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * IncomeProducts base type for findFirst actions
   */
  type IncomeProductsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the IncomeProducts
     * 
    **/
    select?: IncomeProductsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeProductsInclude | null
    /**
     * Filter, which IncomeProducts to fetch.
     * 
    **/
    where?: IncomeProductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IncomeProducts to fetch.
     * 
    **/
    orderBy?: Enumerable<IncomeProductsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IncomeProducts.
     * 
    **/
    cursor?: IncomeProductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IncomeProducts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IncomeProducts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IncomeProducts.
     * 
    **/
    distinct?: Enumerable<IncomeProductsScalarFieldEnum>
  }

  /**
   * IncomeProducts: findFirst
   */
  interface IncomeProductsFindFirstArgs extends IncomeProductsFindFirstArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * IncomeProducts findMany
   */
  type IncomeProductsFindManyArgs = {
    /**
     * Select specific fields to fetch from the IncomeProducts
     * 
    **/
    select?: IncomeProductsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeProductsInclude | null
    /**
     * Filter, which IncomeProducts to fetch.
     * 
    **/
    where?: IncomeProductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IncomeProducts to fetch.
     * 
    **/
    orderBy?: Enumerable<IncomeProductsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IncomeProducts.
     * 
    **/
    cursor?: IncomeProductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IncomeProducts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IncomeProducts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<IncomeProductsScalarFieldEnum>
  }


  /**
   * IncomeProducts create
   */
  type IncomeProductsCreateArgs = {
    /**
     * Select specific fields to fetch from the IncomeProducts
     * 
    **/
    select?: IncomeProductsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeProductsInclude | null
    /**
     * The data needed to create a IncomeProducts.
     * 
    **/
    data: XOR<IncomeProductsCreateInput, IncomeProductsUncheckedCreateInput>
  }


  /**
   * IncomeProducts createMany
   */
  type IncomeProductsCreateManyArgs = {
    /**
     * The data used to create many IncomeProducts.
     * 
    **/
    data: Enumerable<IncomeProductsCreateManyInput>
  }


  /**
   * IncomeProducts update
   */
  type IncomeProductsUpdateArgs = {
    /**
     * Select specific fields to fetch from the IncomeProducts
     * 
    **/
    select?: IncomeProductsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeProductsInclude | null
    /**
     * The data needed to update a IncomeProducts.
     * 
    **/
    data: XOR<IncomeProductsUpdateInput, IncomeProductsUncheckedUpdateInput>
    /**
     * Choose, which IncomeProducts to update.
     * 
    **/
    where: IncomeProductsWhereUniqueInput
  }


  /**
   * IncomeProducts updateMany
   */
  type IncomeProductsUpdateManyArgs = {
    /**
     * The data used to update IncomeProducts.
     * 
    **/
    data: XOR<IncomeProductsUpdateManyMutationInput, IncomeProductsUncheckedUpdateManyInput>
    /**
     * Filter which IncomeProducts to update
     * 
    **/
    where?: IncomeProductsWhereInput
  }


  /**
   * IncomeProducts upsert
   */
  type IncomeProductsUpsertArgs = {
    /**
     * Select specific fields to fetch from the IncomeProducts
     * 
    **/
    select?: IncomeProductsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeProductsInclude | null
    /**
     * The filter to search for the IncomeProducts to update in case it exists.
     * 
    **/
    where: IncomeProductsWhereUniqueInput
    /**
     * In case the IncomeProducts found by the `where` argument doesn't exist, create a new IncomeProducts with this data.
     * 
    **/
    create: XOR<IncomeProductsCreateInput, IncomeProductsUncheckedCreateInput>
    /**
     * In case the IncomeProducts was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<IncomeProductsUpdateInput, IncomeProductsUncheckedUpdateInput>
  }


  /**
   * IncomeProducts delete
   */
  type IncomeProductsDeleteArgs = {
    /**
     * Select specific fields to fetch from the IncomeProducts
     * 
    **/
    select?: IncomeProductsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeProductsInclude | null
    /**
     * Filter which IncomeProducts to delete.
     * 
    **/
    where: IncomeProductsWhereUniqueInput
  }


  /**
   * IncomeProducts deleteMany
   */
  type IncomeProductsDeleteManyArgs = {
    /**
     * Filter which IncomeProducts to delete
     * 
    **/
    where?: IncomeProductsWhereInput
  }


  /**
   * IncomeProducts findRaw
   */
  type IncomeProductsFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * IncomeProducts aggregateRaw
   */
  type IncomeProductsAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * IncomeProducts: findUniqueOrThrow
   */
  type IncomeProductsFindUniqueOrThrowArgs = IncomeProductsFindUniqueArgsBase


  /**
   * IncomeProducts: findFirstOrThrow
   */
  type IncomeProductsFindFirstOrThrowArgs = IncomeProductsFindFirstArgsBase


  /**
   * IncomeProducts without action
   */
  type IncomeProductsArgs = {
    /**
     * Select specific fields to fetch from the IncomeProducts
     * 
    **/
    select?: IncomeProductsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: IncomeProductsInclude | null
  }



  /**
   * Model DebtPayment
   */


  type AggregateDebtPayment = {
    _count: DebtPaymentCountAggregateOutputType | null
    _avg: DebtPaymentAvgAggregateOutputType | null
    _sum: DebtPaymentSumAggregateOutputType | null
    _min: DebtPaymentMinAggregateOutputType | null
    _max: DebtPaymentMaxAggregateOutputType | null
  }

  type DebtPaymentAvgAggregateOutputType = {
    amount: number | null
  }

  type DebtPaymentSumAggregateOutputType = {
    amount: number | null
  }

  type DebtPaymentMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    amount: number | null
    debtId: string | null
    description: string | null
    paymentMethod: PaymentMethod | null
    paidAt: Date | null
    incomeDebtId: string | null
    expenseDebtId: string | null
  }

  type DebtPaymentMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    amount: number | null
    debtId: string | null
    description: string | null
    paymentMethod: PaymentMethod | null
    paidAt: Date | null
    incomeDebtId: string | null
    expenseDebtId: string | null
  }

  type DebtPaymentCountAggregateOutputType = {
    id: number
    createdAt: number
    amount: number
    debtId: number
    description: number
    paymentMethod: number
    paidAt: number
    incomeDebtId: number
    expenseDebtId: number
    _all: number
  }


  type DebtPaymentAvgAggregateInputType = {
    amount?: true
  }

  type DebtPaymentSumAggregateInputType = {
    amount?: true
  }

  type DebtPaymentMinAggregateInputType = {
    id?: true
    createdAt?: true
    amount?: true
    debtId?: true
    description?: true
    paymentMethod?: true
    paidAt?: true
    incomeDebtId?: true
    expenseDebtId?: true
  }

  type DebtPaymentMaxAggregateInputType = {
    id?: true
    createdAt?: true
    amount?: true
    debtId?: true
    description?: true
    paymentMethod?: true
    paidAt?: true
    incomeDebtId?: true
    expenseDebtId?: true
  }

  type DebtPaymentCountAggregateInputType = {
    id?: true
    createdAt?: true
    amount?: true
    debtId?: true
    description?: true
    paymentMethod?: true
    paidAt?: true
    incomeDebtId?: true
    expenseDebtId?: true
    _all?: true
  }

  type DebtPaymentAggregateArgs = {
    /**
     * Filter which DebtPayment to aggregate.
     * 
    **/
    where?: DebtPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DebtPayments to fetch.
     * 
    **/
    orderBy?: Enumerable<DebtPaymentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: DebtPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DebtPayments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DebtPayments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DebtPayments
    **/
    _count?: true | DebtPaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DebtPaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DebtPaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DebtPaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DebtPaymentMaxAggregateInputType
  }

  type GetDebtPaymentAggregateType<T extends DebtPaymentAggregateArgs> = {
    [P in keyof T & keyof AggregateDebtPayment]: P extends '_count' | 'count'
    ? T[P] extends true
    ? number
    : GetScalarType<T[P], AggregateDebtPayment[P]>
    : GetScalarType<T[P], AggregateDebtPayment[P]>
  }




  type DebtPaymentGroupByArgs = {
    where?: DebtPaymentWhereInput
    orderBy?: Enumerable<DebtPaymentOrderByWithAggregationInput>
    by: Array<DebtPaymentScalarFieldEnum>
    having?: DebtPaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DebtPaymentCountAggregateInputType | true
    _avg?: DebtPaymentAvgAggregateInputType
    _sum?: DebtPaymentSumAggregateInputType
    _min?: DebtPaymentMinAggregateInputType
    _max?: DebtPaymentMaxAggregateInputType
  }


  type DebtPaymentGroupByOutputType = {
    id: string
    createdAt: Date
    amount: number
    debtId: string | null
    description: string | null
    paymentMethod: PaymentMethod
    paidAt: Date
    incomeDebtId: string | null
    expenseDebtId: string | null
    _count: DebtPaymentCountAggregateOutputType | null
    _avg: DebtPaymentAvgAggregateOutputType | null
    _sum: DebtPaymentSumAggregateOutputType | null
    _min: DebtPaymentMinAggregateOutputType | null
    _max: DebtPaymentMaxAggregateOutputType | null
  }

  type GetDebtPaymentGroupByPayload<T extends DebtPaymentGroupByArgs> = PrismaPromise<
    Array<
      PickArray<DebtPaymentGroupByOutputType, T['by']> &
      {
        [P in ((keyof T) & (keyof DebtPaymentGroupByOutputType))]: P extends '_count'
        ? T[P] extends boolean
        ? number
        : GetScalarType<T[P], DebtPaymentGroupByOutputType[P]>
        : GetScalarType<T[P], DebtPaymentGroupByOutputType[P]>
      }
    >
  >


  type DebtPaymentSelect = {
    id?: boolean
    createdAt?: boolean
    amount?: boolean
    debtId?: boolean
    description?: boolean
    paymentMethod?: boolean
    paidAt?: boolean
    IncomeDebt?: boolean | IncomeDebtArgs
    incomeDebtId?: boolean
    ExpenseDebt?: boolean | ExpenseDebtArgs
    expenseDebtId?: boolean
  }

  type DebtPaymentInclude = {
    IncomeDebt?: boolean | IncomeDebtArgs
    ExpenseDebt?: boolean | ExpenseDebtArgs
  }

  type DebtPaymentGetPayload<
    S extends boolean | null | undefined | DebtPaymentArgs,
    U = keyof S
  > = S extends true
    ? DebtPayment
    : S extends undefined
    ? never
    : S extends DebtPaymentArgs | DebtPaymentFindManyArgs
    ? 'include' extends U
    ? DebtPayment & {
      [P in TrueKeys<S['include']>]:
      P extends 'IncomeDebt' ? IncomeDebtGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
      P extends 'ExpenseDebt' ? ExpenseDebtGetPayload<Exclude<S['include'], undefined | null>[P]> | null : never
    }
    : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:
      P extends 'IncomeDebt' ? IncomeDebtGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
      P extends 'ExpenseDebt' ? ExpenseDebtGetPayload<Exclude<S['select'], undefined | null>[P]> | null : P extends keyof DebtPayment ? DebtPayment[P] : never
    }
    : DebtPayment
    : DebtPayment


  type DebtPaymentCountArgs = Merge<
    Omit<DebtPaymentFindManyArgs, 'select' | 'include'> & {
      select?: DebtPaymentCountAggregateInputType | true
    }
  >

  interface DebtPaymentDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one DebtPayment that matches the filter.
     * @param {DebtPaymentFindUniqueArgs} args - Arguments to find a DebtPayment
     * @example
     * // Get one DebtPayment
     * const debtPayment = await prisma.debtPayment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DebtPaymentFindUniqueArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DebtPaymentFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'DebtPayment'> extends True ? CheckSelect<T, Prisma__DebtPaymentClient<DebtPayment>, Prisma__DebtPaymentClient<DebtPaymentGetPayload<T>>> : CheckSelect<T, Prisma__DebtPaymentClient<DebtPayment | null, null>, Prisma__DebtPaymentClient<DebtPaymentGetPayload<T> | null, null>>

    /**
     * Find the first DebtPayment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtPaymentFindFirstArgs} args - Arguments to find a DebtPayment
     * @example
     * // Get one DebtPayment
     * const debtPayment = await prisma.debtPayment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DebtPaymentFindFirstArgs, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DebtPaymentFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'DebtPayment'> extends True ? CheckSelect<T, Prisma__DebtPaymentClient<DebtPayment>, Prisma__DebtPaymentClient<DebtPaymentGetPayload<T>>> : CheckSelect<T, Prisma__DebtPaymentClient<DebtPayment | null, null>, Prisma__DebtPaymentClient<DebtPaymentGetPayload<T> | null, null>>

    /**
     * Find zero or more DebtPayments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtPaymentFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DebtPayments
     * const debtPayments = await prisma.debtPayment.findMany()
     * 
     * // Get first 10 DebtPayments
     * const debtPayments = await prisma.debtPayment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const debtPaymentWithIdOnly = await prisma.debtPayment.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DebtPaymentFindManyArgs>(
      args?: SelectSubset<T, DebtPaymentFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<DebtPayment>>, PrismaPromise<Array<DebtPaymentGetPayload<T>>>>

    /**
     * Create a DebtPayment.
     * @param {DebtPaymentCreateArgs} args - Arguments to create a DebtPayment.
     * @example
     * // Create one DebtPayment
     * const DebtPayment = await prisma.debtPayment.create({
     *   data: {
     *     // ... data to create a DebtPayment
     *   }
     * })
     * 
    **/
    create<T extends DebtPaymentCreateArgs>(
      args: SelectSubset<T, DebtPaymentCreateArgs>
    ): CheckSelect<T, Prisma__DebtPaymentClient<DebtPayment>, Prisma__DebtPaymentClient<DebtPaymentGetPayload<T>>>

    /**
     * Create many DebtPayments.
     *     @param {DebtPaymentCreateManyArgs} args - Arguments to create many DebtPayments.
     *     @example
     *     // Create many DebtPayments
     *     const debtPayment = await prisma.debtPayment.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DebtPaymentCreateManyArgs>(
      args?: SelectSubset<T, DebtPaymentCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a DebtPayment.
     * @param {DebtPaymentDeleteArgs} args - Arguments to delete one DebtPayment.
     * @example
     * // Delete one DebtPayment
     * const DebtPayment = await prisma.debtPayment.delete({
     *   where: {
     *     // ... filter to delete one DebtPayment
     *   }
     * })
     * 
    **/
    delete<T extends DebtPaymentDeleteArgs>(
      args: SelectSubset<T, DebtPaymentDeleteArgs>
    ): CheckSelect<T, Prisma__DebtPaymentClient<DebtPayment>, Prisma__DebtPaymentClient<DebtPaymentGetPayload<T>>>

    /**
     * Update one DebtPayment.
     * @param {DebtPaymentUpdateArgs} args - Arguments to update one DebtPayment.
     * @example
     * // Update one DebtPayment
     * const debtPayment = await prisma.debtPayment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DebtPaymentUpdateArgs>(
      args: SelectSubset<T, DebtPaymentUpdateArgs>
    ): CheckSelect<T, Prisma__DebtPaymentClient<DebtPayment>, Prisma__DebtPaymentClient<DebtPaymentGetPayload<T>>>

    /**
     * Delete zero or more DebtPayments.
     * @param {DebtPaymentDeleteManyArgs} args - Arguments to filter DebtPayments to delete.
     * @example
     * // Delete a few DebtPayments
     * const { count } = await prisma.debtPayment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DebtPaymentDeleteManyArgs>(
      args?: SelectSubset<T, DebtPaymentDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more DebtPayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtPaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DebtPayments
     * const debtPayment = await prisma.debtPayment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DebtPaymentUpdateManyArgs>(
      args: SelectSubset<T, DebtPaymentUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one DebtPayment.
     * @param {DebtPaymentUpsertArgs} args - Arguments to update or create a DebtPayment.
     * @example
     * // Update or create a DebtPayment
     * const debtPayment = await prisma.debtPayment.upsert({
     *   create: {
     *     // ... data to create a DebtPayment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DebtPayment we want to update
     *   }
     * })
    **/
    upsert<T extends DebtPaymentUpsertArgs>(
      args: SelectSubset<T, DebtPaymentUpsertArgs>
    ): CheckSelect<T, Prisma__DebtPaymentClient<DebtPayment>, Prisma__DebtPaymentClient<DebtPaymentGetPayload<T>>>

    /**
     * Find zero or more DebtPayments that matches the filter.
     * @param {DebtPaymentFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const debtPayment = await prisma.debtPayment.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: DebtPaymentFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a DebtPayment.
     * @param {DebtPaymentAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const debtPayment = await prisma.debtPayment.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: DebtPaymentAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Find one DebtPayment that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {DebtPaymentFindUniqueOrThrowArgs} args - Arguments to find a DebtPayment
     * @example
     * // Get one DebtPayment
     * const debtPayment = await prisma.debtPayment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DebtPaymentFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, DebtPaymentFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__DebtPaymentClient<DebtPayment>, Prisma__DebtPaymentClient<DebtPaymentGetPayload<T>>>

    /**
     * Find the first DebtPayment that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtPaymentFindFirstOrThrowArgs} args - Arguments to find a DebtPayment
     * @example
     * // Get one DebtPayment
     * const debtPayment = await prisma.debtPayment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DebtPaymentFindFirstOrThrowArgs>(
      args?: SelectSubset<T, DebtPaymentFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__DebtPaymentClient<DebtPayment>, Prisma__DebtPaymentClient<DebtPaymentGetPayload<T>>>

    /**
     * Count the number of DebtPayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtPaymentCountArgs} args - Arguments to filter DebtPayments to count.
     * @example
     * // Count the number of DebtPayments
     * const count = await prisma.debtPayment.count({
     *   where: {
     *     // ... the filter for the DebtPayments we want to count
     *   }
     * })
    **/
    count<T extends DebtPaymentCountArgs>(
      args?: Subset<T, DebtPaymentCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
      ? T['select'] extends true
      ? number
      : GetScalarType<T['select'], DebtPaymentCountAggregateOutputType>
      : number
    >

    /**
     * Allows you to perform aggregations operations on a DebtPayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtPaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DebtPaymentAggregateArgs>(args: Subset<T, DebtPaymentAggregateArgs>): PrismaPromise<GetDebtPaymentAggregateType<T>>

    /**
     * Group by DebtPayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtPaymentGroupByArgs} args - Group by arguments.
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
      T extends DebtPaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
      ? { orderBy: DebtPaymentGroupByArgs['orderBy'] }
      : { orderBy?: DebtPaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, DebtPaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDebtPaymentGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for DebtPayment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  class Prisma__DebtPaymentClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    IncomeDebt<T extends IncomeDebtArgs = {}>(args?: Subset<T, IncomeDebtArgs>): CheckSelect<T, Prisma__IncomeDebtClient<IncomeDebt | Null>, Prisma__IncomeDebtClient<IncomeDebtGetPayload<T> | Null>>;

    ExpenseDebt<T extends ExpenseDebtArgs = {}>(args?: Subset<T, ExpenseDebtArgs>): CheckSelect<T, Prisma__ExpenseDebtClient<ExpenseDebt | Null>, Prisma__ExpenseDebtClient<ExpenseDebtGetPayload<T> | Null>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * DebtPayment base type for findUnique actions
   */
  type DebtPaymentFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the DebtPayment
     * 
    **/
    select?: DebtPaymentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DebtPaymentInclude | null
    /**
     * Filter, which DebtPayment to fetch.
     * 
    **/
    where: DebtPaymentWhereUniqueInput
  }

  /**
   * DebtPayment: findUnique
   */
  interface DebtPaymentFindUniqueArgs extends DebtPaymentFindUniqueArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * DebtPayment base type for findFirst actions
   */
  type DebtPaymentFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the DebtPayment
     * 
    **/
    select?: DebtPaymentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DebtPaymentInclude | null
    /**
     * Filter, which DebtPayment to fetch.
     * 
    **/
    where?: DebtPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DebtPayments to fetch.
     * 
    **/
    orderBy?: Enumerable<DebtPaymentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DebtPayments.
     * 
    **/
    cursor?: DebtPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DebtPayments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DebtPayments.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DebtPayments.
     * 
    **/
    distinct?: Enumerable<DebtPaymentScalarFieldEnum>
  }

  /**
   * DebtPayment: findFirst
   */
  interface DebtPaymentFindFirstArgs extends DebtPaymentFindFirstArgsBase {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound
  }


  /**
   * DebtPayment findMany
   */
  type DebtPaymentFindManyArgs = {
    /**
     * Select specific fields to fetch from the DebtPayment
     * 
    **/
    select?: DebtPaymentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DebtPaymentInclude | null
    /**
     * Filter, which DebtPayments to fetch.
     * 
    **/
    where?: DebtPaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DebtPayments to fetch.
     * 
    **/
    orderBy?: Enumerable<DebtPaymentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DebtPayments.
     * 
    **/
    cursor?: DebtPaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DebtPayments from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DebtPayments.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DebtPaymentScalarFieldEnum>
  }


  /**
   * DebtPayment create
   */
  type DebtPaymentCreateArgs = {
    /**
     * Select specific fields to fetch from the DebtPayment
     * 
    **/
    select?: DebtPaymentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DebtPaymentInclude | null
    /**
     * The data needed to create a DebtPayment.
     * 
    **/
    data: XOR<DebtPaymentCreateInput, DebtPaymentUncheckedCreateInput>
  }


  /**
   * DebtPayment createMany
   */
  type DebtPaymentCreateManyArgs = {
    /**
     * The data used to create many DebtPayments.
     * 
    **/
    data: Enumerable<DebtPaymentCreateManyInput>
  }


  /**
   * DebtPayment update
   */
  type DebtPaymentUpdateArgs = {
    /**
     * Select specific fields to fetch from the DebtPayment
     * 
    **/
    select?: DebtPaymentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DebtPaymentInclude | null
    /**
     * The data needed to update a DebtPayment.
     * 
    **/
    data: XOR<DebtPaymentUpdateInput, DebtPaymentUncheckedUpdateInput>
    /**
     * Choose, which DebtPayment to update.
     * 
    **/
    where: DebtPaymentWhereUniqueInput
  }


  /**
   * DebtPayment updateMany
   */
  type DebtPaymentUpdateManyArgs = {
    /**
     * The data used to update DebtPayments.
     * 
    **/
    data: XOR<DebtPaymentUpdateManyMutationInput, DebtPaymentUncheckedUpdateManyInput>
    /**
     * Filter which DebtPayments to update
     * 
    **/
    where?: DebtPaymentWhereInput
  }


  /**
   * DebtPayment upsert
   */
  type DebtPaymentUpsertArgs = {
    /**
     * Select specific fields to fetch from the DebtPayment
     * 
    **/
    select?: DebtPaymentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DebtPaymentInclude | null
    /**
     * The filter to search for the DebtPayment to update in case it exists.
     * 
    **/
    where: DebtPaymentWhereUniqueInput
    /**
     * In case the DebtPayment found by the `where` argument doesn't exist, create a new DebtPayment with this data.
     * 
    **/
    create: XOR<DebtPaymentCreateInput, DebtPaymentUncheckedCreateInput>
    /**
     * In case the DebtPayment was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<DebtPaymentUpdateInput, DebtPaymentUncheckedUpdateInput>
  }


  /**
   * DebtPayment delete
   */
  type DebtPaymentDeleteArgs = {
    /**
     * Select specific fields to fetch from the DebtPayment
     * 
    **/
    select?: DebtPaymentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DebtPaymentInclude | null
    /**
     * Filter which DebtPayment to delete.
     * 
    **/
    where: DebtPaymentWhereUniqueInput
  }


  /**
   * DebtPayment deleteMany
   */
  type DebtPaymentDeleteManyArgs = {
    /**
     * Filter which DebtPayments to delete
     * 
    **/
    where?: DebtPaymentWhereInput
  }


  /**
   * DebtPayment findRaw
   */
  type DebtPaymentFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * DebtPayment aggregateRaw
   */
  type DebtPaymentAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * DebtPayment: findUniqueOrThrow
   */
  type DebtPaymentFindUniqueOrThrowArgs = DebtPaymentFindUniqueArgsBase


  /**
   * DebtPayment: findFirstOrThrow
   */
  type DebtPaymentFindFirstOrThrowArgs = DebtPaymentFindFirstArgsBase


  /**
   * DebtPayment without action
   */
  type DebtPaymentArgs = {
    /**
     * Select specific fields to fetch from the DebtPayment
     * 
    **/
    select?: DebtPaymentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: DebtPaymentInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  const BudgetScalarFieldEnum: {
    id: 'id',
    ExpenseCategoryId: 'ExpenseCategoryId',
    startingDate: 'startingDate',
    endingDate: 'endingDate',
    total: 'total',
    userId: 'userId'
  };

  type BudgetScalarFieldEnum = (typeof BudgetScalarFieldEnum)[keyof typeof BudgetScalarFieldEnum]


  const BusinessAccountScalarFieldEnum: {
    id: 'id',
    name: 'name',
    cuit: 'cuit',
    location: 'location',
    address: 'address',
    image: 'image',
    firmEmail: 'firmEmail',
    cellphone: 'cellphone',
    businessType: 'businessType'
  };

  type BusinessAccountScalarFieldEnum = (typeof BusinessAccountScalarFieldEnum)[keyof typeof BusinessAccountScalarFieldEnum]


  const ContactScalarFieldEnum: {
    id: 'id',
    name: 'name',
    phone: 'phone',
    typeOfContact: 'typeOfContact',
    email: 'email',
    comments: 'comments',
    deletedAt: 'deletedAt',
    ownerId: 'ownerId'
  };

  type ContactScalarFieldEnum = (typeof ContactScalarFieldEnum)[keyof typeof ContactScalarFieldEnum]


  const DebtPaymentScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    amount: 'amount',
    debtId: 'debtId',
    description: 'description',
    paymentMethod: 'paymentMethod',
    paidAt: 'paidAt',
    incomeDebtId: 'incomeDebtId',
    expenseDebtId: 'expenseDebtId'
  };

  type DebtPaymentScalarFieldEnum = (typeof DebtPaymentScalarFieldEnum)[keyof typeof DebtPaymentScalarFieldEnum]


  const ExpenseCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    imageUrl: 'imageUrl'
  };

  type ExpenseCategoryScalarFieldEnum = (typeof ExpenseCategoryScalarFieldEnum)[keyof typeof ExpenseCategoryScalarFieldEnum]


  const ExpenseDebtScalarFieldEnum: {
    id: 'id',
    initialDate: 'initialDate',
    ownerId: 'ownerId',
    expenseIDs: 'expenseIDs'
  };

  type ExpenseDebtScalarFieldEnum = (typeof ExpenseDebtScalarFieldEnum)[keyof typeof ExpenseDebtScalarFieldEnum]


  const ExpenseScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    value: 'value',
    name: 'name',
    date: 'date',
    isPaid: 'isPaid',
    deletedAt: 'deletedAt',
    categoryId: 'categoryId',
    providerId: 'providerId',
    paymentMethod: 'paymentMethod',
    ownerId: 'ownerId',
    expenseDebtIds: 'expenseDebtIds'
  };

  type ExpenseScalarFieldEnum = (typeof ExpenseScalarFieldEnum)[keyof typeof ExpenseScalarFieldEnum]


  const IncomeCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    imageUrl: 'imageUrl'
  };

  type IncomeCategoryScalarFieldEnum = (typeof IncomeCategoryScalarFieldEnum)[keyof typeof IncomeCategoryScalarFieldEnum]


  const IncomeDebtScalarFieldEnum: {
    id: 'id',
    initialDate: 'initialDate',
    ownerId: 'ownerId',
    incomeIDs: 'incomeIDs'
  };

  type IncomeDebtScalarFieldEnum = (typeof IncomeDebtScalarFieldEnum)[keyof typeof IncomeDebtScalarFieldEnum]


  const IncomeProductsScalarFieldEnum: {
    id: 'id',
    quantity: 'quantity',
    price: 'price',
    incomeId: 'incomeId',
    productId: 'productId'
  };

  type IncomeProductsScalarFieldEnum = (typeof IncomeProductsScalarFieldEnum)[keyof typeof IncomeProductsScalarFieldEnum]


  const IncomeScalarFieldEnum: {
    id: 'id',
    value: 'value',
    name: 'name',
    date: 'date',
    createdAt: 'createdAt',
    deletedAt: 'deletedAt',
    serviceIDs: 'serviceIDs',
    clientId: 'clientId',
    categoryId: 'categoryId',
    isPaid: 'isPaid',
    paymentMethod: 'paymentMethod',
    ownerId: 'ownerId',
    incomeDebtIds: 'incomeDebtIds'
  };

  type IncomeScalarFieldEnum = (typeof IncomeScalarFieldEnum)[keyof typeof IncomeScalarFieldEnum]


  const ProductCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    userId: 'userId'
  };

  type ProductCategoryScalarFieldEnum = (typeof ProductCategoryScalarFieldEnum)[keyof typeof ProductCategoryScalarFieldEnum]


  const ProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    retailPrice: 'retailPrice',
    cost: 'cost',
    unit: 'unit',
    quantity: 'quantity',
    image: 'image',
    stock: 'stock',
    description: 'description',
    createdAt: 'createdAt',
    categoryId: 'categoryId',
    ownerId: 'ownerId',
    deletedAt: 'deletedAt'
  };

  type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  const ServiceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    image: 'image',
    description: 'description',
    retailPrice: 'retailPrice',
    createdAt: 'createdAt',
    categoryId: 'categoryId',
    ownerId: 'ownerId',
    saleIDs: 'saleIDs'
  };

  type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  const UserAccountScalarFieldEnum: {
    id: 'id',
    name: 'name',
    cellPhone: 'cellPhone',
    image: 'image',
    address: 'address',
    userId: 'userId'
  };

  type UserAccountScalarFieldEnum = (typeof UserAccountScalarFieldEnum)[keyof typeof UserAccountScalarFieldEnum]


  const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    Business: 'Business'
  };

  type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  /**
   * Deep Input Types
   */


  type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: StringFilter | string
    email?: StringFilter | string
    password?: StringFilter | string
    Account?: XOR<UserAccountRelationFilter, UserAccountWhereInput> | null
    Business?: EnumBusinessTypeNullableFilter | BusinessType | null
    Budgets?: BudgetListRelationFilter
    Products?: ProductListRelationFilter
    Categories?: ProductCategoryListRelationFilter
    Contacts?: ContactListRelationFilter
    Incomes?: IncomeListRelationFilter
    Expenses?: ExpenseListRelationFilter
    Services?: ServiceListRelationFilter
    ExpenseDebt?: ExpenseDebtListRelationFilter
    IncomeDebt?: IncomeDebtListRelationFilter
  }

  type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    Account?: UserAccountOrderByWithRelationInput
    Business?: SortOrder
    Budgets?: BudgetOrderByRelationAggregateInput
    Products?: ProductOrderByRelationAggregateInput
    Categories?: ProductCategoryOrderByRelationAggregateInput
    Contacts?: ContactOrderByRelationAggregateInput
    Incomes?: IncomeOrderByRelationAggregateInput
    Expenses?: ExpenseOrderByRelationAggregateInput
    Services?: ServiceOrderByRelationAggregateInput
    ExpenseDebt?: ExpenseDebtOrderByRelationAggregateInput
    IncomeDebt?: IncomeDebtOrderByRelationAggregateInput
  }

  type UserWhereUniqueInput = {
    id?: string
  }

  type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    Business?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    password?: StringWithAggregatesFilter | string
    Business?: EnumBusinessTypeNullableWithAggregatesFilter | BusinessType | null
  }

  type UserAccountWhereInput = {
    AND?: Enumerable<UserAccountWhereInput>
    OR?: Enumerable<UserAccountWhereInput>
    NOT?: Enumerable<UserAccountWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    cellPhone?: StringFilter | string
    image?: StringNullableFilter | string | null
    address?: StringNullableFilter | string | null
    userId?: StringFilter | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  type UserAccountOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    cellPhone?: SortOrder
    image?: SortOrder
    address?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  type UserAccountWhereUniqueInput = {
    id?: string
    userId?: string
  }

  type UserAccountOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    cellPhone?: SortOrder
    image?: SortOrder
    address?: SortOrder
    userId?: SortOrder
    _count?: UserAccountCountOrderByAggregateInput
    _max?: UserAccountMaxOrderByAggregateInput
    _min?: UserAccountMinOrderByAggregateInput
  }

  type UserAccountScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserAccountScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserAccountScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserAccountScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    cellPhone?: StringWithAggregatesFilter | string
    image?: StringNullableWithAggregatesFilter | string | null
    address?: StringNullableWithAggregatesFilter | string | null
    userId?: StringWithAggregatesFilter | string
  }

  type BusinessAccountWhereInput = {
    AND?: Enumerable<BusinessAccountWhereInput>
    OR?: Enumerable<BusinessAccountWhereInput>
    NOT?: Enumerable<BusinessAccountWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    cuit?: StringNullableFilter | string | null
    location?: StringFilter | string
    address?: StringNullableFilter | string | null
    image?: StringNullableFilter | string | null
    firmEmail?: StringNullableFilter | string | null
    cellphone?: StringNullableFilter | string | null
    businessType?: EnumBusinessTypeFilter | BusinessType
  }

  type BusinessAccountOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    cuit?: SortOrder
    location?: SortOrder
    address?: SortOrder
    image?: SortOrder
    firmEmail?: SortOrder
    cellphone?: SortOrder
    businessType?: SortOrder
  }

  type BusinessAccountWhereUniqueInput = {
    id?: string
  }

  type BusinessAccountOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    cuit?: SortOrder
    location?: SortOrder
    address?: SortOrder
    image?: SortOrder
    firmEmail?: SortOrder
    cellphone?: SortOrder
    businessType?: SortOrder
    _count?: BusinessAccountCountOrderByAggregateInput
    _max?: BusinessAccountMaxOrderByAggregateInput
    _min?: BusinessAccountMinOrderByAggregateInput
  }

  type BusinessAccountScalarWhereWithAggregatesInput = {
    AND?: Enumerable<BusinessAccountScalarWhereWithAggregatesInput>
    OR?: Enumerable<BusinessAccountScalarWhereWithAggregatesInput>
    NOT?: Enumerable<BusinessAccountScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    cuit?: StringNullableWithAggregatesFilter | string | null
    location?: StringWithAggregatesFilter | string
    address?: StringNullableWithAggregatesFilter | string | null
    image?: StringNullableWithAggregatesFilter | string | null
    firmEmail?: StringNullableWithAggregatesFilter | string | null
    cellphone?: StringNullableWithAggregatesFilter | string | null
    businessType?: EnumBusinessTypeWithAggregatesFilter | BusinessType
  }

  type BudgetWhereInput = {
    AND?: Enumerable<BudgetWhereInput>
    OR?: Enumerable<BudgetWhereInput>
    NOT?: Enumerable<BudgetWhereInput>
    id?: StringFilter | string
    ExpenseCategory?: XOR<ExpenseCategoryRelationFilter, ExpenseCategoryWhereInput>
    ExpenseCategoryId?: StringFilter | string
    startingDate?: DateTimeFilter | Date | string
    endingDate?: DateTimeFilter | Date | string
    total?: FloatFilter | number
    User?: XOR<UserRelationFilter, UserWhereInput>
    userId?: StringFilter | string
  }

  type BudgetOrderByWithRelationInput = {
    id?: SortOrder
    ExpenseCategory?: ExpenseCategoryOrderByWithRelationInput
    ExpenseCategoryId?: SortOrder
    startingDate?: SortOrder
    endingDate?: SortOrder
    total?: SortOrder
    User?: UserOrderByWithRelationInput
    userId?: SortOrder
  }

  type BudgetWhereUniqueInput = {
    id?: string
  }

  type BudgetOrderByWithAggregationInput = {
    id?: SortOrder
    ExpenseCategoryId?: SortOrder
    startingDate?: SortOrder
    endingDate?: SortOrder
    total?: SortOrder
    userId?: SortOrder
    _count?: BudgetCountOrderByAggregateInput
    _avg?: BudgetAvgOrderByAggregateInput
    _max?: BudgetMaxOrderByAggregateInput
    _min?: BudgetMinOrderByAggregateInput
    _sum?: BudgetSumOrderByAggregateInput
  }

  type BudgetScalarWhereWithAggregatesInput = {
    AND?: Enumerable<BudgetScalarWhereWithAggregatesInput>
    OR?: Enumerable<BudgetScalarWhereWithAggregatesInput>
    NOT?: Enumerable<BudgetScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    ExpenseCategoryId?: StringWithAggregatesFilter | string
    startingDate?: DateTimeWithAggregatesFilter | Date | string
    endingDate?: DateTimeWithAggregatesFilter | Date | string
    total?: FloatWithAggregatesFilter | number
    userId?: StringWithAggregatesFilter | string
  }

  type ProductWhereInput = {
    AND?: Enumerable<ProductWhereInput>
    OR?: Enumerable<ProductWhereInput>
    NOT?: Enumerable<ProductWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    retailPrice?: FloatFilter | number
    cost?: FloatNullableFilter | number | null
    unit?: StringNullableFilter | string | null
    quantity?: FloatNullableFilter | number | null
    image?: StringNullableFilter | string | null
    stock?: IntFilter | number
    description?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    category?: XOR<ProductCategoryRelationFilter, ProductCategoryWhereInput> | null
    categoryId?: StringNullableFilter | string | null
    owner?: XOR<UserRelationFilter, UserWhereInput>
    ownerId?: StringFilter | string
    deletedAt?: DateTimeNullableFilter | Date | string | null
    IncomeProducts?: IncomeProductsListRelationFilter
  }

  type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    retailPrice?: SortOrder
    cost?: SortOrder
    unit?: SortOrder
    quantity?: SortOrder
    image?: SortOrder
    stock?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    category?: ProductCategoryOrderByWithRelationInput
    categoryId?: SortOrder
    owner?: UserOrderByWithRelationInput
    ownerId?: SortOrder
    deletedAt?: SortOrder
    IncomeProducts?: IncomeProductsOrderByRelationAggregateInput
  }

  type ProductWhereUniqueInput = {
    id?: string
  }

  type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    retailPrice?: SortOrder
    cost?: SortOrder
    unit?: SortOrder
    quantity?: SortOrder
    image?: SortOrder
    stock?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    categoryId?: SortOrder
    ownerId?: SortOrder
    deletedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  type ProductScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ProductScalarWhereWithAggregatesInput>
    OR?: Enumerable<ProductScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ProductScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    retailPrice?: FloatWithAggregatesFilter | number
    cost?: FloatNullableWithAggregatesFilter | number | null
    unit?: StringNullableWithAggregatesFilter | string | null
    quantity?: FloatNullableWithAggregatesFilter | number | null
    image?: StringNullableWithAggregatesFilter | string | null
    stock?: IntWithAggregatesFilter | number
    description?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    categoryId?: StringNullableWithAggregatesFilter | string | null
    ownerId?: StringWithAggregatesFilter | string
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  type ServiceWhereInput = {
    AND?: Enumerable<ServiceWhereInput>
    OR?: Enumerable<ServiceWhereInput>
    NOT?: Enumerable<ServiceWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    image?: StringNullableFilter | string | null
    description?: StringNullableFilter | string | null
    retailPrice?: FloatFilter | number
    createdAt?: DateTimeFilter | Date | string
    category?: XOR<ProductCategoryRelationFilter, ProductCategoryWhereInput> | null
    categoryId?: StringNullableFilter | string | null
    owner?: XOR<UserRelationFilter, UserWhereInput>
    ownerId?: StringFilter | string
    saleIDs?: StringNullableListFilter
    sales?: IncomeListRelationFilter
  }

  type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrder
    description?: SortOrder
    retailPrice?: SortOrder
    createdAt?: SortOrder
    category?: ProductCategoryOrderByWithRelationInput
    categoryId?: SortOrder
    owner?: UserOrderByWithRelationInput
    ownerId?: SortOrder
    saleIDs?: SortOrder
    sales?: IncomeOrderByRelationAggregateInput
  }

  type ServiceWhereUniqueInput = {
    id?: string
  }

  type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrder
    description?: SortOrder
    retailPrice?: SortOrder
    createdAt?: SortOrder
    categoryId?: SortOrder
    ownerId?: SortOrder
    saleIDs?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  type ServiceScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ServiceScalarWhereWithAggregatesInput>
    OR?: Enumerable<ServiceScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ServiceScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    image?: StringNullableWithAggregatesFilter | string | null
    description?: StringNullableWithAggregatesFilter | string | null
    retailPrice?: FloatWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    categoryId?: StringNullableWithAggregatesFilter | string | null
    ownerId?: StringWithAggregatesFilter | string
    saleIDs?: StringNullableListFilter
  }

  type ProductCategoryWhereInput = {
    AND?: Enumerable<ProductCategoryWhereInput>
    OR?: Enumerable<ProductCategoryWhereInput>
    NOT?: Enumerable<ProductCategoryWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    userId?: StringFilter | string
    Product?: ProductListRelationFilter
    Service?: ServiceListRelationFilter
  }

  type ProductCategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    user?: UserOrderByWithRelationInput
    userId?: SortOrder
    Product?: ProductOrderByRelationAggregateInput
    Service?: ServiceOrderByRelationAggregateInput
  }

  type ProductCategoryWhereUniqueInput = {
    id?: string
  }

  type ProductCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    _count?: ProductCategoryCountOrderByAggregateInput
    _max?: ProductCategoryMaxOrderByAggregateInput
    _min?: ProductCategoryMinOrderByAggregateInput
  }

  type ProductCategoryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ProductCategoryScalarWhereWithAggregatesInput>
    OR?: Enumerable<ProductCategoryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ProductCategoryScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
  }

  type ContactWhereInput = {
    AND?: Enumerable<ContactWhereInput>
    OR?: Enumerable<ContactWhereInput>
    NOT?: Enumerable<ContactWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    phone?: StringFilter | string
    typeOfContact?: EnumTypeOfContactFilter | TypeOfContact
    email?: StringFilter | string
    comments?: StringFilter | string
    deletedAt?: DateTimeNullableFilter | Date | string | null
    owner?: XOR<UserRelationFilter, UserWhereInput>
    ownerId?: StringFilter | string
    Sale?: IncomeListRelationFilter
    Expense?: ExpenseListRelationFilter
  }

  type ContactOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    typeOfContact?: SortOrder
    email?: SortOrder
    comments?: SortOrder
    deletedAt?: SortOrder
    owner?: UserOrderByWithRelationInput
    ownerId?: SortOrder
    Sale?: IncomeOrderByRelationAggregateInput
    Expense?: ExpenseOrderByRelationAggregateInput
  }

  type ContactWhereUniqueInput = {
    id?: string
  }

  type ContactOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    typeOfContact?: SortOrder
    email?: SortOrder
    comments?: SortOrder
    deletedAt?: SortOrder
    ownerId?: SortOrder
    _count?: ContactCountOrderByAggregateInput
    _max?: ContactMaxOrderByAggregateInput
    _min?: ContactMinOrderByAggregateInput
  }

  type ContactScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ContactScalarWhereWithAggregatesInput>
    OR?: Enumerable<ContactScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ContactScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    phone?: StringWithAggregatesFilter | string
    typeOfContact?: EnumTypeOfContactWithAggregatesFilter | TypeOfContact
    email?: StringWithAggregatesFilter | string
    comments?: StringWithAggregatesFilter | string
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    ownerId?: StringWithAggregatesFilter | string
  }

  type ExpenseCategoryWhereInput = {
    AND?: Enumerable<ExpenseCategoryWhereInput>
    OR?: Enumerable<ExpenseCategoryWhereInput>
    NOT?: Enumerable<ExpenseCategoryWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    imageUrl?: StringFilter | string
    Budget?: BudgetListRelationFilter
    Expense?: ExpenseListRelationFilter
  }

  type ExpenseCategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    Budget?: BudgetOrderByRelationAggregateInput
    Expense?: ExpenseOrderByRelationAggregateInput
  }

  type ExpenseCategoryWhereUniqueInput = {
    id?: string
  }

  type ExpenseCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    _count?: ExpenseCategoryCountOrderByAggregateInput
    _max?: ExpenseCategoryMaxOrderByAggregateInput
    _min?: ExpenseCategoryMinOrderByAggregateInput
  }

  type ExpenseCategoryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ExpenseCategoryScalarWhereWithAggregatesInput>
    OR?: Enumerable<ExpenseCategoryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ExpenseCategoryScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    imageUrl?: StringWithAggregatesFilter | string
  }

  type IncomeCategoryWhereInput = {
    AND?: Enumerable<IncomeCategoryWhereInput>
    OR?: Enumerable<IncomeCategoryWhereInput>
    NOT?: Enumerable<IncomeCategoryWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    imageUrl?: StringFilter | string
    Income?: IncomeListRelationFilter
  }

  type IncomeCategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    Income?: IncomeOrderByRelationAggregateInput
  }

  type IncomeCategoryWhereUniqueInput = {
    id?: string
  }

  type IncomeCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
    _count?: IncomeCategoryCountOrderByAggregateInput
    _max?: IncomeCategoryMaxOrderByAggregateInput
    _min?: IncomeCategoryMinOrderByAggregateInput
  }

  type IncomeCategoryScalarWhereWithAggregatesInput = {
    AND?: Enumerable<IncomeCategoryScalarWhereWithAggregatesInput>
    OR?: Enumerable<IncomeCategoryScalarWhereWithAggregatesInput>
    NOT?: Enumerable<IncomeCategoryScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    imageUrl?: StringWithAggregatesFilter | string
  }

  type ExpenseWhereInput = {
    AND?: Enumerable<ExpenseWhereInput>
    OR?: Enumerable<ExpenseWhereInput>
    NOT?: Enumerable<ExpenseWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    value?: FloatFilter | number
    name?: StringFilter | string
    date?: StringFilter | string
    isPaid?: BoolFilter | boolean
    deletedAt?: DateTimeNullableFilter | Date | string | null
    category?: XOR<ExpenseCategoryRelationFilter, ExpenseCategoryWhereInput>
    categoryId?: StringFilter | string
    provider?: XOR<ContactRelationFilter, ContactWhereInput> | null
    providerId?: StringNullableFilter | string | null
    paymentMethod?: EnumPaymentMethodNullableFilter | PaymentMethod | null
    Owner?: XOR<UserRelationFilter, UserWhereInput>
    ownerId?: StringFilter | string
    ExpenseDebts?: ExpenseDebtListRelationFilter
    expenseDebtIds?: StringNullableListFilter
  }

  type ExpenseOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    value?: SortOrder
    name?: SortOrder
    date?: SortOrder
    isPaid?: SortOrder
    deletedAt?: SortOrder
    category?: ExpenseCategoryOrderByWithRelationInput
    categoryId?: SortOrder
    provider?: ContactOrderByWithRelationInput
    providerId?: SortOrder
    paymentMethod?: SortOrder
    Owner?: UserOrderByWithRelationInput
    ownerId?: SortOrder
    ExpenseDebts?: ExpenseDebtOrderByRelationAggregateInput
    expenseDebtIds?: SortOrder
  }

  type ExpenseWhereUniqueInput = {
    id?: string
    categoryId?: string
  }

  type ExpenseOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    value?: SortOrder
    name?: SortOrder
    date?: SortOrder
    isPaid?: SortOrder
    deletedAt?: SortOrder
    categoryId?: SortOrder
    providerId?: SortOrder
    paymentMethod?: SortOrder
    ownerId?: SortOrder
    expenseDebtIds?: SortOrder
    _count?: ExpenseCountOrderByAggregateInput
    _avg?: ExpenseAvgOrderByAggregateInput
    _max?: ExpenseMaxOrderByAggregateInput
    _min?: ExpenseMinOrderByAggregateInput
    _sum?: ExpenseSumOrderByAggregateInput
  }

  type ExpenseScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ExpenseScalarWhereWithAggregatesInput>
    OR?: Enumerable<ExpenseScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ExpenseScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    value?: FloatWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    date?: StringWithAggregatesFilter | string
    isPaid?: BoolWithAggregatesFilter | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    categoryId?: StringWithAggregatesFilter | string
    providerId?: StringNullableWithAggregatesFilter | string | null
    paymentMethod?: EnumPaymentMethodNullableWithAggregatesFilter | PaymentMethod | null
    ownerId?: StringWithAggregatesFilter | string
    expenseDebtIds?: StringNullableListFilter
  }

  type IncomeWhereInput = {
    AND?: Enumerable<IncomeWhereInput>
    OR?: Enumerable<IncomeWhereInput>
    NOT?: Enumerable<IncomeWhereInput>
    id?: StringFilter | string
    value?: FloatFilter | number
    name?: StringNullableFilter | string | null
    date?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    deletedAt?: DateTimeNullableFilter | Date | string | null
    IncomeProducts?: IncomeProductsListRelationFilter
    serviceIDs?: StringNullableListFilter
    services?: ServiceListRelationFilter
    client?: XOR<ContactRelationFilter, ContactWhereInput> | null
    clientId?: StringNullableFilter | string | null
    category?: XOR<IncomeCategoryRelationFilter, IncomeCategoryWhereInput>
    categoryId?: StringFilter | string
    isPaid?: BoolFilter | boolean
    paymentMethod?: EnumPaymentMethodNullableFilter | PaymentMethod | null
    Owner?: XOR<UserRelationFilter, UserWhereInput>
    ownerId?: StringFilter | string
    IncomeDebts?: IncomeDebtListRelationFilter
    incomeDebtIds?: StringNullableListFilter
  }

  type IncomeOrderByWithRelationInput = {
    id?: SortOrder
    value?: SortOrder
    name?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    IncomeProducts?: IncomeProductsOrderByRelationAggregateInput
    serviceIDs?: SortOrder
    services?: ServiceOrderByRelationAggregateInput
    client?: ContactOrderByWithRelationInput
    clientId?: SortOrder
    category?: IncomeCategoryOrderByWithRelationInput
    categoryId?: SortOrder
    isPaid?: SortOrder
    paymentMethod?: SortOrder
    Owner?: UserOrderByWithRelationInput
    ownerId?: SortOrder
    IncomeDebts?: IncomeDebtOrderByRelationAggregateInput
    incomeDebtIds?: SortOrder
  }

  type IncomeWhereUniqueInput = {
    id?: string
    categoryId?: string
  }

  type IncomeOrderByWithAggregationInput = {
    id?: SortOrder
    value?: SortOrder
    name?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    serviceIDs?: SortOrder
    clientId?: SortOrder
    categoryId?: SortOrder
    isPaid?: SortOrder
    paymentMethod?: SortOrder
    ownerId?: SortOrder
    incomeDebtIds?: SortOrder
    _count?: IncomeCountOrderByAggregateInput
    _avg?: IncomeAvgOrderByAggregateInput
    _max?: IncomeMaxOrderByAggregateInput
    _min?: IncomeMinOrderByAggregateInput
    _sum?: IncomeSumOrderByAggregateInput
  }

  type IncomeScalarWhereWithAggregatesInput = {
    AND?: Enumerable<IncomeScalarWhereWithAggregatesInput>
    OR?: Enumerable<IncomeScalarWhereWithAggregatesInput>
    NOT?: Enumerable<IncomeScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    value?: FloatWithAggregatesFilter | number
    name?: StringNullableWithAggregatesFilter | string | null
    date?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    deletedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    serviceIDs?: StringNullableListFilter
    clientId?: StringNullableWithAggregatesFilter | string | null
    categoryId?: StringWithAggregatesFilter | string
    isPaid?: BoolWithAggregatesFilter | boolean
    paymentMethod?: EnumPaymentMethodNullableWithAggregatesFilter | PaymentMethod | null
    ownerId?: StringWithAggregatesFilter | string
    incomeDebtIds?: StringNullableListFilter
  }

  type IncomeDebtWhereInput = {
    AND?: Enumerable<IncomeDebtWhereInput>
    OR?: Enumerable<IncomeDebtWhereInput>
    NOT?: Enumerable<IncomeDebtWhereInput>
    id?: StringFilter | string
    initialDate?: DateTimeFilter | Date | string
    Owner?: XOR<UserRelationFilter, UserWhereInput>
    ownerId?: StringFilter | string
    incomeIDs?: StringNullableListFilter
    incomes?: IncomeListRelationFilter
    payments?: DebtPaymentListRelationFilter
  }

  type IncomeDebtOrderByWithRelationInput = {
    id?: SortOrder
    initialDate?: SortOrder
    Owner?: UserOrderByWithRelationInput
    ownerId?: SortOrder
    incomeIDs?: SortOrder
    incomes?: IncomeOrderByRelationAggregateInput
    payments?: DebtPaymentOrderByRelationAggregateInput
  }

  type IncomeDebtWhereUniqueInput = {
    id?: string
  }

  type IncomeDebtOrderByWithAggregationInput = {
    id?: SortOrder
    initialDate?: SortOrder
    ownerId?: SortOrder
    incomeIDs?: SortOrder
    _count?: IncomeDebtCountOrderByAggregateInput
    _max?: IncomeDebtMaxOrderByAggregateInput
    _min?: IncomeDebtMinOrderByAggregateInput
  }

  type IncomeDebtScalarWhereWithAggregatesInput = {
    AND?: Enumerable<IncomeDebtScalarWhereWithAggregatesInput>
    OR?: Enumerable<IncomeDebtScalarWhereWithAggregatesInput>
    NOT?: Enumerable<IncomeDebtScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    initialDate?: DateTimeWithAggregatesFilter | Date | string
    ownerId?: StringWithAggregatesFilter | string
    incomeIDs?: StringNullableListFilter
  }

  type ExpenseDebtWhereInput = {
    AND?: Enumerable<ExpenseDebtWhereInput>
    OR?: Enumerable<ExpenseDebtWhereInput>
    NOT?: Enumerable<ExpenseDebtWhereInput>
    id?: StringFilter | string
    initialDate?: DateTimeFilter | Date | string
    Owner?: XOR<UserRelationFilter, UserWhereInput>
    ownerId?: StringFilter | string
    expenseIDs?: StringNullableListFilter
    expenses?: ExpenseListRelationFilter
    payments?: DebtPaymentListRelationFilter
  }

  type ExpenseDebtOrderByWithRelationInput = {
    id?: SortOrder
    initialDate?: SortOrder
    Owner?: UserOrderByWithRelationInput
    ownerId?: SortOrder
    expenseIDs?: SortOrder
    expenses?: ExpenseOrderByRelationAggregateInput
    payments?: DebtPaymentOrderByRelationAggregateInput
  }

  type ExpenseDebtWhereUniqueInput = {
    id?: string
  }

  type ExpenseDebtOrderByWithAggregationInput = {
    id?: SortOrder
    initialDate?: SortOrder
    ownerId?: SortOrder
    expenseIDs?: SortOrder
    _count?: ExpenseDebtCountOrderByAggregateInput
    _max?: ExpenseDebtMaxOrderByAggregateInput
    _min?: ExpenseDebtMinOrderByAggregateInput
  }

  type ExpenseDebtScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ExpenseDebtScalarWhereWithAggregatesInput>
    OR?: Enumerable<ExpenseDebtScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ExpenseDebtScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    initialDate?: DateTimeWithAggregatesFilter | Date | string
    ownerId?: StringWithAggregatesFilter | string
    expenseIDs?: StringNullableListFilter
  }

  type IncomeProductsWhereInput = {
    AND?: Enumerable<IncomeProductsWhereInput>
    OR?: Enumerable<IncomeProductsWhereInput>
    NOT?: Enumerable<IncomeProductsWhereInput>
    id?: StringFilter | string
    quantity?: FloatFilter | number
    price?: FloatFilter | number
    income?: XOR<IncomeRelationFilter, IncomeWhereInput>
    incomeId?: StringFilter | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    productId?: StringFilter | string
  }

  type IncomeProductsOrderByWithRelationInput = {
    id?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    income?: IncomeOrderByWithRelationInput
    incomeId?: SortOrder
    product?: ProductOrderByWithRelationInput
    productId?: SortOrder
  }

  type IncomeProductsWhereUniqueInput = {
    id?: string
  }

  type IncomeProductsOrderByWithAggregationInput = {
    id?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    incomeId?: SortOrder
    productId?: SortOrder
    _count?: IncomeProductsCountOrderByAggregateInput
    _avg?: IncomeProductsAvgOrderByAggregateInput
    _max?: IncomeProductsMaxOrderByAggregateInput
    _min?: IncomeProductsMinOrderByAggregateInput
    _sum?: IncomeProductsSumOrderByAggregateInput
  }

  type IncomeProductsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<IncomeProductsScalarWhereWithAggregatesInput>
    OR?: Enumerable<IncomeProductsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<IncomeProductsScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    quantity?: FloatWithAggregatesFilter | number
    price?: FloatWithAggregatesFilter | number
    incomeId?: StringWithAggregatesFilter | string
    productId?: StringWithAggregatesFilter | string
  }

  type DebtPaymentWhereInput = {
    AND?: Enumerable<DebtPaymentWhereInput>
    OR?: Enumerable<DebtPaymentWhereInput>
    NOT?: Enumerable<DebtPaymentWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    amount?: FloatFilter | number
    debtId?: StringNullableFilter | string | null
    description?: StringNullableFilter | string | null
    paymentMethod?: EnumPaymentMethodFilter | PaymentMethod
    paidAt?: DateTimeFilter | Date | string
    IncomeDebt?: XOR<IncomeDebtRelationFilter, IncomeDebtWhereInput> | null
    incomeDebtId?: StringNullableFilter | string | null
    ExpenseDebt?: XOR<ExpenseDebtRelationFilter, ExpenseDebtWhereInput> | null
    expenseDebtId?: StringNullableFilter | string | null
  }

  type DebtPaymentOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    amount?: SortOrder
    debtId?: SortOrder
    description?: SortOrder
    paymentMethod?: SortOrder
    paidAt?: SortOrder
    IncomeDebt?: IncomeDebtOrderByWithRelationInput
    incomeDebtId?: SortOrder
    ExpenseDebt?: ExpenseDebtOrderByWithRelationInput
    expenseDebtId?: SortOrder
  }

  type DebtPaymentWhereUniqueInput = {
    id?: string
  }

  type DebtPaymentOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    amount?: SortOrder
    debtId?: SortOrder
    description?: SortOrder
    paymentMethod?: SortOrder
    paidAt?: SortOrder
    incomeDebtId?: SortOrder
    expenseDebtId?: SortOrder
    _count?: DebtPaymentCountOrderByAggregateInput
    _avg?: DebtPaymentAvgOrderByAggregateInput
    _max?: DebtPaymentMaxOrderByAggregateInput
    _min?: DebtPaymentMinOrderByAggregateInput
    _sum?: DebtPaymentSumOrderByAggregateInput
  }

  type DebtPaymentScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DebtPaymentScalarWhereWithAggregatesInput>
    OR?: Enumerable<DebtPaymentScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DebtPaymentScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    amount?: FloatWithAggregatesFilter | number
    debtId?: StringNullableWithAggregatesFilter | string | null
    description?: StringNullableWithAggregatesFilter | string | null
    paymentMethod?: EnumPaymentMethodWithAggregatesFilter | PaymentMethod
    paidAt?: DateTimeWithAggregatesFilter | Date | string
    incomeDebtId?: StringNullableWithAggregatesFilter | string | null
    expenseDebtId?: StringNullableWithAggregatesFilter | string | null
  }

  type UserCreateInput = {
    id?: string
    email: string
    password: string
    Account?: UserAccountCreateNestedOneWithoutUserInput
    Business?: BusinessType | null
    Budgets?: BudgetCreateNestedManyWithoutUserInput
    Products?: ProductCreateNestedManyWithoutOwnerInput
    Categories?: ProductCategoryCreateNestedManyWithoutUserInput
    Contacts?: ContactCreateNestedManyWithoutOwnerInput
    Incomes?: IncomeCreateNestedManyWithoutOwnerInput
    Expenses?: ExpenseCreateNestedManyWithoutOwnerInput
    Services?: ServiceCreateNestedManyWithoutOwnerInput
    ExpenseDebt?: ExpenseDebtCreateNestedManyWithoutOwnerInput
    IncomeDebt?: IncomeDebtCreateNestedManyWithoutOwnerInput
  }

  type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    Account?: UserAccountUncheckedCreateNestedOneWithoutUserInput
    Business?: BusinessType | null
    Budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    Products?: ProductUncheckedCreateNestedManyWithoutOwnerInput
    Categories?: ProductCategoryUncheckedCreateNestedManyWithoutUserInput
    Contacts?: ContactUncheckedCreateNestedManyWithoutOwnerInput
    Incomes?: IncomeUncheckedCreateNestedManyWithoutOwnerInput
    Expenses?: ExpenseUncheckedCreateNestedManyWithoutOwnerInput
    Services?: ServiceUncheckedCreateNestedManyWithoutOwnerInput
    ExpenseDebt?: ExpenseDebtUncheckedCreateNestedManyWithoutOwnerInput
    IncomeDebt?: IncomeDebtUncheckedCreateNestedManyWithoutOwnerInput
  }

  type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Account?: UserAccountUpdateOneWithoutUserNestedInput
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
    Budgets?: BudgetUpdateManyWithoutUserNestedInput
    Products?: ProductUpdateManyWithoutOwnerNestedInput
    Categories?: ProductCategoryUpdateManyWithoutUserNestedInput
    Contacts?: ContactUpdateManyWithoutOwnerNestedInput
    Incomes?: IncomeUpdateManyWithoutOwnerNestedInput
    Expenses?: ExpenseUpdateManyWithoutOwnerNestedInput
    Services?: ServiceUpdateManyWithoutOwnerNestedInput
    ExpenseDebt?: ExpenseDebtUpdateManyWithoutOwnerNestedInput
    IncomeDebt?: IncomeDebtUpdateManyWithoutOwnerNestedInput
  }

  type UserUncheckedUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Account?: UserAccountUncheckedUpdateOneWithoutUserNestedInput
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
    Budgets?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    Products?: ProductUncheckedUpdateManyWithoutOwnerNestedInput
    Categories?: ProductCategoryUncheckedUpdateManyWithoutUserNestedInput
    Contacts?: ContactUncheckedUpdateManyWithoutOwnerNestedInput
    Incomes?: IncomeUncheckedUpdateManyWithoutOwnerNestedInput
    Expenses?: ExpenseUncheckedUpdateManyWithoutOwnerNestedInput
    Services?: ServiceUncheckedUpdateManyWithoutOwnerNestedInput
    ExpenseDebt?: ExpenseDebtUncheckedUpdateManyWithoutOwnerNestedInput
    IncomeDebt?: IncomeDebtUncheckedUpdateManyWithoutOwnerNestedInput
  }

  type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    Business?: BusinessType | null
  }

  type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
  }

  type UserUncheckedUpdateManyInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
  }

  type UserAccountCreateInput = {
    id?: string
    name: string
    cellPhone: string
    image?: string | null
    address?: string | null
    user: UserCreateNestedOneWithoutAccountInput
  }

  type UserAccountUncheckedCreateInput = {
    id?: string
    name: string
    cellPhone: string
    image?: string | null
    address?: string | null
    userId: string
  }

  type UserAccountUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    cellPhone?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountNestedInput
  }

  type UserAccountUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    cellPhone?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  type UserAccountCreateManyInput = {
    id?: string
    name: string
    cellPhone: string
    image?: string | null
    address?: string | null
    userId: string
  }

  type UserAccountUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    cellPhone?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
  }

  type UserAccountUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    cellPhone?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  type BusinessAccountCreateInput = {
    id?: string
    name: string
    cuit?: string | null
    location: string
    address?: string | null
    image?: string | null
    firmEmail?: string | null
    cellphone?: string | null
    businessType: BusinessType
  }

  type BusinessAccountUncheckedCreateInput = {
    id?: string
    name: string
    cuit?: string | null
    location: string
    address?: string | null
    image?: string | null
    firmEmail?: string | null
    cellphone?: string | null
    businessType: BusinessType
  }

  type BusinessAccountUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    cuit?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    firmEmail?: NullableStringFieldUpdateOperationsInput | string | null
    cellphone?: NullableStringFieldUpdateOperationsInput | string | null
    businessType?: EnumBusinessTypeFieldUpdateOperationsInput | BusinessType
  }

  type BusinessAccountUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    cuit?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    firmEmail?: NullableStringFieldUpdateOperationsInput | string | null
    cellphone?: NullableStringFieldUpdateOperationsInput | string | null
    businessType?: EnumBusinessTypeFieldUpdateOperationsInput | BusinessType
  }

  type BusinessAccountCreateManyInput = {
    id?: string
    name: string
    cuit?: string | null
    location: string
    address?: string | null
    image?: string | null
    firmEmail?: string | null
    cellphone?: string | null
    businessType: BusinessType
  }

  type BusinessAccountUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    cuit?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    firmEmail?: NullableStringFieldUpdateOperationsInput | string | null
    cellphone?: NullableStringFieldUpdateOperationsInput | string | null
    businessType?: EnumBusinessTypeFieldUpdateOperationsInput | BusinessType
  }

  type BusinessAccountUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    cuit?: NullableStringFieldUpdateOperationsInput | string | null
    location?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    firmEmail?: NullableStringFieldUpdateOperationsInput | string | null
    cellphone?: NullableStringFieldUpdateOperationsInput | string | null
    businessType?: EnumBusinessTypeFieldUpdateOperationsInput | BusinessType
  }

  type BudgetCreateInput = {
    id?: string
    ExpenseCategory: ExpenseCategoryCreateNestedOneWithoutBudgetInput
    startingDate: Date | string
    endingDate: Date | string
    total: number
    User: UserCreateNestedOneWithoutBudgetsInput
  }

  type BudgetUncheckedCreateInput = {
    id?: string
    ExpenseCategoryId: string
    startingDate: Date | string
    endingDate: Date | string
    total: number
    userId: string
  }

  type BudgetUpdateInput = {
    ExpenseCategory?: ExpenseCategoryUpdateOneRequiredWithoutBudgetNestedInput
    startingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: FloatFieldUpdateOperationsInput | number
    User?: UserUpdateOneRequiredWithoutBudgetsNestedInput
  }

  type BudgetUncheckedUpdateInput = {
    ExpenseCategoryId?: StringFieldUpdateOperationsInput | string
    startingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: FloatFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
  }

  type BudgetCreateManyInput = {
    id?: string
    ExpenseCategoryId: string
    startingDate: Date | string
    endingDate: Date | string
    total: number
    userId: string
  }

  type BudgetUpdateManyMutationInput = {
    startingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: FloatFieldUpdateOperationsInput | number
  }

  type BudgetUncheckedUpdateManyInput = {
    ExpenseCategoryId?: StringFieldUpdateOperationsInput | string
    startingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: FloatFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
  }

  type ProductCreateInput = {
    id?: string
    name: string
    retailPrice: number
    cost?: number | null
    unit?: string | null
    quantity?: number | null
    image?: string | null
    stock: number
    description?: string | null
    createdAt?: Date | string
    category?: ProductCategoryCreateNestedOneWithoutProductInput
    owner: UserCreateNestedOneWithoutProductsInput
    deletedAt?: Date | string | null
    IncomeProducts?: IncomeProductsCreateNestedManyWithoutProductInput
  }

  type ProductUncheckedCreateInput = {
    id?: string
    name: string
    retailPrice: number
    cost?: number | null
    unit?: string | null
    quantity?: number | null
    image?: string | null
    stock: number
    description?: string | null
    createdAt?: Date | string
    categoryId?: string | null
    ownerId: string
    deletedAt?: Date | string | null
    IncomeProducts?: IncomeProductsUncheckedCreateNestedManyWithoutProductInput
  }

  type ProductUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    retailPrice?: FloatFieldUpdateOperationsInput | number
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: ProductCategoryUpdateOneWithoutProductNestedInput
    owner?: UserUpdateOneRequiredWithoutProductsNestedInput
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    IncomeProducts?: IncomeProductsUpdateManyWithoutProductNestedInput
  }

  type ProductUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    retailPrice?: FloatFieldUpdateOperationsInput | number
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    IncomeProducts?: IncomeProductsUncheckedUpdateManyWithoutProductNestedInput
  }

  type ProductCreateManyInput = {
    id?: string
    name: string
    retailPrice: number
    cost?: number | null
    unit?: string | null
    quantity?: number | null
    image?: string | null
    stock: number
    description?: string | null
    createdAt?: Date | string
    categoryId?: string | null
    ownerId: string
    deletedAt?: Date | string | null
  }

  type ProductUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    retailPrice?: FloatFieldUpdateOperationsInput | number
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  type ProductUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    retailPrice?: FloatFieldUpdateOperationsInput | number
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  type ServiceCreateInput = {
    id?: string
    name: string
    image?: string | null
    description?: string | null
    retailPrice: number
    createdAt?: Date | string
    category?: ProductCategoryCreateNestedOneWithoutServiceInput
    owner: UserCreateNestedOneWithoutServicesInput
    saleIDs?: ServiceCreatesaleIDsInput | Enumerable<string>
    sales?: IncomeCreateNestedManyWithoutServicesInput
  }

  type ServiceUncheckedCreateInput = {
    id?: string
    name: string
    image?: string | null
    description?: string | null
    retailPrice: number
    createdAt?: Date | string
    categoryId?: string | null
    ownerId: string
    saleIDs?: ServiceCreatesaleIDsInput | Enumerable<string>
    sales?: IncomeUncheckedCreateNestedManyWithoutServicesInput
  }

  type ServiceUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    retailPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: ProductCategoryUpdateOneWithoutServiceNestedInput
    owner?: UserUpdateOneRequiredWithoutServicesNestedInput
    saleIDs?: ServiceUpdatesaleIDsInput | Enumerable<string>
    sales?: IncomeUpdateManyWithoutServicesNestedInput
  }

  type ServiceUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    retailPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    saleIDs?: ServiceUpdatesaleIDsInput | Enumerable<string>
    sales?: IncomeUncheckedUpdateManyWithoutServicesNestedInput
  }

  type ServiceCreateManyInput = {
    id?: string
    name: string
    image?: string | null
    description?: string | null
    retailPrice: number
    createdAt?: Date | string
    categoryId?: string | null
    ownerId: string
    saleIDs?: ServiceCreatesaleIDsInput | Enumerable<string>
  }

  type ServiceUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    retailPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    saleIDs?: ServiceUpdatesaleIDsInput | Enumerable<string>
  }

  type ServiceUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    retailPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    saleIDs?: ServiceUpdatesaleIDsInput | Enumerable<string>
  }

  type ProductCategoryCreateInput = {
    id?: string
    name: string
    user: UserCreateNestedOneWithoutCategoriesInput
    Product?: ProductCreateNestedManyWithoutCategoryInput
    Service?: ServiceCreateNestedManyWithoutCategoryInput
  }

  type ProductCategoryUncheckedCreateInput = {
    id?: string
    name: string
    userId: string
    Product?: ProductUncheckedCreateNestedManyWithoutCategoryInput
    Service?: ServiceUncheckedCreateNestedManyWithoutCategoryInput
  }

  type ProductCategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutCategoriesNestedInput
    Product?: ProductUpdateManyWithoutCategoryNestedInput
    Service?: ServiceUpdateManyWithoutCategoryNestedInput
  }

  type ProductCategoryUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    Product?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
    Service?: ServiceUncheckedUpdateManyWithoutCategoryNestedInput
  }

  type ProductCategoryCreateManyInput = {
    id?: string
    name: string
    userId: string
  }

  type ProductCategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  type ProductCategoryUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  type ContactCreateInput = {
    id?: string
    name: string
    phone: string
    typeOfContact: TypeOfContact
    email: string
    comments: string
    deletedAt?: Date | string | null
    owner: UserCreateNestedOneWithoutContactsInput
    Sale?: IncomeCreateNestedManyWithoutClientInput
    Expense?: ExpenseCreateNestedManyWithoutProviderInput
  }

  type ContactUncheckedCreateInput = {
    id?: string
    name: string
    phone: string
    typeOfContact: TypeOfContact
    email: string
    comments: string
    deletedAt?: Date | string | null
    ownerId: string
    Sale?: IncomeUncheckedCreateNestedManyWithoutClientInput
    Expense?: ExpenseUncheckedCreateNestedManyWithoutProviderInput
  }

  type ContactUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    typeOfContact?: EnumTypeOfContactFieldUpdateOperationsInput | TypeOfContact
    email?: StringFieldUpdateOperationsInput | string
    comments?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutContactsNestedInput
    Sale?: IncomeUpdateManyWithoutClientNestedInput
    Expense?: ExpenseUpdateManyWithoutProviderNestedInput
  }

  type ContactUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    typeOfContact?: EnumTypeOfContactFieldUpdateOperationsInput | TypeOfContact
    email?: StringFieldUpdateOperationsInput | string
    comments?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    Sale?: IncomeUncheckedUpdateManyWithoutClientNestedInput
    Expense?: ExpenseUncheckedUpdateManyWithoutProviderNestedInput
  }

  type ContactCreateManyInput = {
    id?: string
    name: string
    phone: string
    typeOfContact: TypeOfContact
    email: string
    comments: string
    deletedAt?: Date | string | null
    ownerId: string
  }

  type ContactUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    typeOfContact?: EnumTypeOfContactFieldUpdateOperationsInput | TypeOfContact
    email?: StringFieldUpdateOperationsInput | string
    comments?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  type ContactUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    typeOfContact?: EnumTypeOfContactFieldUpdateOperationsInput | TypeOfContact
    email?: StringFieldUpdateOperationsInput | string
    comments?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
  }

  type ExpenseCategoryCreateInput = {
    id?: string
    name: string
    imageUrl: string
    Budget?: BudgetCreateNestedManyWithoutExpenseCategoryInput
    Expense?: ExpenseCreateNestedManyWithoutCategoryInput
  }

  type ExpenseCategoryUncheckedCreateInput = {
    id?: string
    name: string
    imageUrl: string
    Budget?: BudgetUncheckedCreateNestedManyWithoutExpenseCategoryInput
    Expense?: ExpenseUncheckedCreateNestedManyWithoutCategoryInput
  }

  type ExpenseCategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    Budget?: BudgetUpdateManyWithoutExpenseCategoryNestedInput
    Expense?: ExpenseUpdateManyWithoutCategoryNestedInput
  }

  type ExpenseCategoryUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    Budget?: BudgetUncheckedUpdateManyWithoutExpenseCategoryNestedInput
    Expense?: ExpenseUncheckedUpdateManyWithoutCategoryNestedInput
  }

  type ExpenseCategoryCreateManyInput = {
    id?: string
    name: string
    imageUrl: string
  }

  type ExpenseCategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
  }

  type ExpenseCategoryUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
  }

  type IncomeCategoryCreateInput = {
    id?: string
    name: string
    imageUrl: string
    Income?: IncomeCreateNestedManyWithoutCategoryInput
  }

  type IncomeCategoryUncheckedCreateInput = {
    id?: string
    name: string
    imageUrl: string
    Income?: IncomeUncheckedCreateNestedManyWithoutCategoryInput
  }

  type IncomeCategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    Income?: IncomeUpdateManyWithoutCategoryNestedInput
  }

  type IncomeCategoryUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    Income?: IncomeUncheckedUpdateManyWithoutCategoryNestedInput
  }

  type IncomeCategoryCreateManyInput = {
    id?: string
    name: string
    imageUrl: string
  }

  type IncomeCategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
  }

  type IncomeCategoryUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
  }

  type ExpenseCreateInput = {
    id?: string
    createdAt?: Date | string
    value: number
    name: string
    date: string
    isPaid: boolean
    deletedAt?: Date | string | null
    category: ExpenseCategoryCreateNestedOneWithoutExpenseInput
    provider?: ContactCreateNestedOneWithoutExpenseInput
    paymentMethod?: PaymentMethod | null
    Owner: UserCreateNestedOneWithoutExpensesInput
    ExpenseDebts?: ExpenseDebtCreateNestedManyWithoutExpensesInput
    expenseDebtIds?: ExpenseCreateexpenseDebtIdsInput | Enumerable<string>
  }

  type ExpenseUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    value: number
    name: string
    date: string
    isPaid: boolean
    deletedAt?: Date | string | null
    categoryId: string
    providerId?: string | null
    paymentMethod?: PaymentMethod | null
    ownerId: string
    ExpenseDebts?: ExpenseDebtUncheckedCreateNestedManyWithoutExpensesInput
    expenseDebtIds?: ExpenseCreateexpenseDebtIdsInput | Enumerable<string>
  }

  type ExpenseUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: ExpenseCategoryUpdateOneRequiredWithoutExpenseNestedInput
    provider?: ContactUpdateOneWithoutExpenseNestedInput
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    Owner?: UserUpdateOneRequiredWithoutExpensesNestedInput
    ExpenseDebts?: ExpenseDebtUpdateManyWithoutExpensesNestedInput
    expenseDebtIds?: ExpenseUpdateexpenseDebtIdsInput | Enumerable<string>
  }

  type ExpenseUncheckedUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    ownerId?: StringFieldUpdateOperationsInput | string
    ExpenseDebts?: ExpenseDebtUncheckedUpdateManyWithoutExpensesNestedInput
    expenseDebtIds?: ExpenseUpdateexpenseDebtIdsInput | Enumerable<string>
  }

  type ExpenseCreateManyInput = {
    id?: string
    createdAt?: Date | string
    value: number
    name: string
    date: string
    isPaid: boolean
    deletedAt?: Date | string | null
    categoryId: string
    providerId?: string | null
    paymentMethod?: PaymentMethod | null
    ownerId: string
    expenseDebtIds?: ExpenseCreateexpenseDebtIdsInput | Enumerable<string>
  }

  type ExpenseUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    expenseDebtIds?: ExpenseUpdateexpenseDebtIdsInput | Enumerable<string>
  }

  type ExpenseUncheckedUpdateManyInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    ownerId?: StringFieldUpdateOperationsInput | string
    expenseDebtIds?: ExpenseUpdateexpenseDebtIdsInput | Enumerable<string>
  }

  type IncomeCreateInput = {
    id?: string
    value: number
    name?: string | null
    date: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    IncomeProducts?: IncomeProductsCreateNestedManyWithoutIncomeInput
    serviceIDs?: IncomeCreateserviceIDsInput | Enumerable<string>
    services?: ServiceCreateNestedManyWithoutSalesInput
    client?: ContactCreateNestedOneWithoutSaleInput
    category: IncomeCategoryCreateNestedOneWithoutIncomeInput
    isPaid: boolean
    paymentMethod?: PaymentMethod | null
    Owner: UserCreateNestedOneWithoutIncomesInput
    IncomeDebts?: IncomeDebtCreateNestedManyWithoutIncomesInput
    incomeDebtIds?: IncomeCreateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeUncheckedCreateInput = {
    id?: string
    value: number
    name?: string | null
    date: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    IncomeProducts?: IncomeProductsUncheckedCreateNestedManyWithoutIncomeInput
    serviceIDs?: IncomeCreateserviceIDsInput | Enumerable<string>
    services?: ServiceUncheckedCreateNestedManyWithoutSalesInput
    clientId?: string | null
    categoryId: string
    isPaid: boolean
    paymentMethod?: PaymentMethod | null
    ownerId: string
    IncomeDebts?: IncomeDebtUncheckedCreateNestedManyWithoutIncomesInput
    incomeDebtIds?: IncomeCreateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeUpdateInput = {
    value?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    IncomeProducts?: IncomeProductsUpdateManyWithoutIncomeNestedInput
    serviceIDs?: IncomeUpdateserviceIDsInput | Enumerable<string>
    services?: ServiceUpdateManyWithoutSalesNestedInput
    client?: ContactUpdateOneWithoutSaleNestedInput
    category?: IncomeCategoryUpdateOneRequiredWithoutIncomeNestedInput
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    Owner?: UserUpdateOneRequiredWithoutIncomesNestedInput
    IncomeDebts?: IncomeDebtUpdateManyWithoutIncomesNestedInput
    incomeDebtIds?: IncomeUpdateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeUncheckedUpdateInput = {
    value?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    IncomeProducts?: IncomeProductsUncheckedUpdateManyWithoutIncomeNestedInput
    serviceIDs?: IncomeUpdateserviceIDsInput | Enumerable<string>
    services?: ServiceUncheckedUpdateManyWithoutSalesNestedInput
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    ownerId?: StringFieldUpdateOperationsInput | string
    IncomeDebts?: IncomeDebtUncheckedUpdateManyWithoutIncomesNestedInput
    incomeDebtIds?: IncomeUpdateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeCreateManyInput = {
    id?: string
    value: number
    name?: string | null
    date: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    serviceIDs?: IncomeCreateserviceIDsInput | Enumerable<string>
    clientId?: string | null
    categoryId: string
    isPaid: boolean
    paymentMethod?: PaymentMethod | null
    ownerId: string
    incomeDebtIds?: IncomeCreateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeUpdateManyMutationInput = {
    value?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    serviceIDs?: IncomeUpdateserviceIDsInput | Enumerable<string>
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    incomeDebtIds?: IncomeUpdateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeUncheckedUpdateManyInput = {
    value?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    serviceIDs?: IncomeUpdateserviceIDsInput | Enumerable<string>
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    ownerId?: StringFieldUpdateOperationsInput | string
    incomeDebtIds?: IncomeUpdateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeDebtCreateInput = {
    id?: string
    initialDate?: Date | string
    Owner: UserCreateNestedOneWithoutIncomeDebtInput
    incomeIDs?: IncomeDebtCreateincomeIDsInput | Enumerable<string>
    incomes?: IncomeCreateNestedManyWithoutIncomeDebtsInput
    payments?: DebtPaymentCreateNestedManyWithoutIncomeDebtInput
  }

  type IncomeDebtUncheckedCreateInput = {
    id?: string
    initialDate?: Date | string
    ownerId: string
    incomeIDs?: IncomeDebtCreateincomeIDsInput | Enumerable<string>
    incomes?: IncomeUncheckedCreateNestedManyWithoutIncomeDebtsInput
    payments?: DebtPaymentUncheckedCreateNestedManyWithoutIncomeDebtInput
  }

  type IncomeDebtUpdateInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    Owner?: UserUpdateOneRequiredWithoutIncomeDebtNestedInput
    incomeIDs?: IncomeDebtUpdateincomeIDsInput | Enumerable<string>
    incomes?: IncomeUpdateManyWithoutIncomeDebtsNestedInput
    payments?: DebtPaymentUpdateManyWithoutIncomeDebtNestedInput
  }

  type IncomeDebtUncheckedUpdateInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    incomeIDs?: IncomeDebtUpdateincomeIDsInput | Enumerable<string>
    incomes?: IncomeUncheckedUpdateManyWithoutIncomeDebtsNestedInput
    payments?: DebtPaymentUncheckedUpdateManyWithoutIncomeDebtNestedInput
  }

  type IncomeDebtCreateManyInput = {
    id?: string
    initialDate?: Date | string
    ownerId: string
    incomeIDs?: IncomeDebtCreateincomeIDsInput | Enumerable<string>
  }

  type IncomeDebtUpdateManyMutationInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    incomeIDs?: IncomeDebtUpdateincomeIDsInput | Enumerable<string>
  }

  type IncomeDebtUncheckedUpdateManyInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    incomeIDs?: IncomeDebtUpdateincomeIDsInput | Enumerable<string>
  }

  type ExpenseDebtCreateInput = {
    id?: string
    initialDate?: Date | string
    Owner: UserCreateNestedOneWithoutExpenseDebtInput
    expenseIDs?: ExpenseDebtCreateexpenseIDsInput | Enumerable<string>
    expenses?: ExpenseCreateNestedManyWithoutExpenseDebtsInput
    payments?: DebtPaymentCreateNestedManyWithoutExpenseDebtInput
  }

  type ExpenseDebtUncheckedCreateInput = {
    id?: string
    initialDate?: Date | string
    ownerId: string
    expenseIDs?: ExpenseDebtCreateexpenseIDsInput | Enumerable<string>
    expenses?: ExpenseUncheckedCreateNestedManyWithoutExpenseDebtsInput
    payments?: DebtPaymentUncheckedCreateNestedManyWithoutExpenseDebtInput
  }

  type ExpenseDebtUpdateInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    Owner?: UserUpdateOneRequiredWithoutExpenseDebtNestedInput
    expenseIDs?: ExpenseDebtUpdateexpenseIDsInput | Enumerable<string>
    expenses?: ExpenseUpdateManyWithoutExpenseDebtsNestedInput
    payments?: DebtPaymentUpdateManyWithoutExpenseDebtNestedInput
  }

  type ExpenseDebtUncheckedUpdateInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    expenseIDs?: ExpenseDebtUpdateexpenseIDsInput | Enumerable<string>
    expenses?: ExpenseUncheckedUpdateManyWithoutExpenseDebtsNestedInput
    payments?: DebtPaymentUncheckedUpdateManyWithoutExpenseDebtNestedInput
  }

  type ExpenseDebtCreateManyInput = {
    id?: string
    initialDate?: Date | string
    ownerId: string
    expenseIDs?: ExpenseDebtCreateexpenseIDsInput | Enumerable<string>
  }

  type ExpenseDebtUpdateManyMutationInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expenseIDs?: ExpenseDebtUpdateexpenseIDsInput | Enumerable<string>
  }

  type ExpenseDebtUncheckedUpdateManyInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    expenseIDs?: ExpenseDebtUpdateexpenseIDsInput | Enumerable<string>
  }

  type IncomeProductsCreateInput = {
    id?: string
    quantity: number
    price: number
    income: IncomeCreateNestedOneWithoutIncomeProductsInput
    product: ProductCreateNestedOneWithoutIncomeProductsInput
  }

  type IncomeProductsUncheckedCreateInput = {
    id?: string
    quantity: number
    price: number
    incomeId: string
    productId: string
  }

  type IncomeProductsUpdateInput = {
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    income?: IncomeUpdateOneRequiredWithoutIncomeProductsNestedInput
    product?: ProductUpdateOneRequiredWithoutIncomeProductsNestedInput
  }

  type IncomeProductsUncheckedUpdateInput = {
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    incomeId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
  }

  type IncomeProductsCreateManyInput = {
    id?: string
    quantity: number
    price: number
    incomeId: string
    productId: string
  }

  type IncomeProductsUpdateManyMutationInput = {
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
  }

  type IncomeProductsUncheckedUpdateManyInput = {
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    incomeId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
  }

  type DebtPaymentCreateInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    debtId?: string | null
    description?: string | null
    paymentMethod: PaymentMethod
    paidAt: Date | string
    IncomeDebt?: IncomeDebtCreateNestedOneWithoutPaymentsInput
    ExpenseDebt?: ExpenseDebtCreateNestedOneWithoutPaymentsInput
  }

  type DebtPaymentUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    debtId?: string | null
    description?: string | null
    paymentMethod: PaymentMethod
    paidAt: Date | string
    incomeDebtId?: string | null
    expenseDebtId?: string | null
  }

  type DebtPaymentUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    debtId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    IncomeDebt?: IncomeDebtUpdateOneWithoutPaymentsNestedInput
    ExpenseDebt?: ExpenseDebtUpdateOneWithoutPaymentsNestedInput
  }

  type DebtPaymentUncheckedUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    debtId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    incomeDebtId?: NullableStringFieldUpdateOperationsInput | string | null
    expenseDebtId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  type DebtPaymentCreateManyInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    debtId?: string | null
    description?: string | null
    paymentMethod: PaymentMethod
    paidAt: Date | string
    incomeDebtId?: string | null
    expenseDebtId?: string | null
  }

  type DebtPaymentUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    debtId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  type DebtPaymentUncheckedUpdateManyInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    debtId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    incomeDebtId?: NullableStringFieldUpdateOperationsInput | string | null
    expenseDebtId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  type UserAccountRelationFilter = {
    is?: UserAccountWhereInput | null
    isNot?: UserAccountWhereInput | null
  }

  type EnumBusinessTypeNullableFilter = {
    equals?: BusinessType | null
    in?: Enumerable<BusinessType> | null
    notIn?: Enumerable<BusinessType> | null
    not?: NestedEnumBusinessTypeNullableFilter | BusinessType | null
    isSet?: boolean
  }

  type BudgetListRelationFilter = {
    every?: BudgetWhereInput
    some?: BudgetWhereInput
    none?: BudgetWhereInput
  }

  type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  type ProductCategoryListRelationFilter = {
    every?: ProductCategoryWhereInput
    some?: ProductCategoryWhereInput
    none?: ProductCategoryWhereInput
  }

  type ContactListRelationFilter = {
    every?: ContactWhereInput
    some?: ContactWhereInput
    none?: ContactWhereInput
  }

  type IncomeListRelationFilter = {
    every?: IncomeWhereInput
    some?: IncomeWhereInput
    none?: IncomeWhereInput
  }

  type ExpenseListRelationFilter = {
    every?: ExpenseWhereInput
    some?: ExpenseWhereInput
    none?: ExpenseWhereInput
  }

  type ServiceListRelationFilter = {
    every?: ServiceWhereInput
    some?: ServiceWhereInput
    none?: ServiceWhereInput
  }

  type ExpenseDebtListRelationFilter = {
    every?: ExpenseDebtWhereInput
    some?: ExpenseDebtWhereInput
    none?: ExpenseDebtWhereInput
  }

  type IncomeDebtListRelationFilter = {
    every?: IncomeDebtWhereInput
    some?: IncomeDebtWhereInput
    none?: IncomeDebtWhereInput
  }

  type BudgetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  type ProductCategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  type ContactOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  type IncomeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  type ExpenseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  type ServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  type ExpenseDebtOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  type IncomeDebtOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    Business?: SortOrder
  }

  type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    Business?: SortOrder
  }

  type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    Business?: SortOrder
  }

  type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  type EnumBusinessTypeNullableWithAggregatesFilter = {
    equals?: BusinessType | null
    in?: Enumerable<BusinessType> | null
    notIn?: Enumerable<BusinessType> | null
    not?: NestedEnumBusinessTypeNullableWithAggregatesFilter | BusinessType | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumBusinessTypeNullableFilter
    _max?: NestedEnumBusinessTypeNullableFilter
    isSet?: boolean
  }

  type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
    isSet?: boolean
  }

  type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  type UserAccountCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    cellPhone?: SortOrder
    image?: SortOrder
    address?: SortOrder
    userId?: SortOrder
  }

  type UserAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    cellPhone?: SortOrder
    image?: SortOrder
    address?: SortOrder
    userId?: SortOrder
  }

  type UserAccountMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    cellPhone?: SortOrder
    image?: SortOrder
    address?: SortOrder
    userId?: SortOrder
  }

  type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
    isSet?: boolean
  }

  type EnumBusinessTypeFilter = {
    equals?: BusinessType
    in?: Enumerable<BusinessType>
    notIn?: Enumerable<BusinessType>
    not?: NestedEnumBusinessTypeFilter | BusinessType
  }

  type BusinessAccountCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    cuit?: SortOrder
    location?: SortOrder
    address?: SortOrder
    image?: SortOrder
    firmEmail?: SortOrder
    cellphone?: SortOrder
    businessType?: SortOrder
  }

  type BusinessAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    cuit?: SortOrder
    location?: SortOrder
    address?: SortOrder
    image?: SortOrder
    firmEmail?: SortOrder
    cellphone?: SortOrder
    businessType?: SortOrder
  }

  type BusinessAccountMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    cuit?: SortOrder
    location?: SortOrder
    address?: SortOrder
    image?: SortOrder
    firmEmail?: SortOrder
    cellphone?: SortOrder
    businessType?: SortOrder
  }

  type EnumBusinessTypeWithAggregatesFilter = {
    equals?: BusinessType
    in?: Enumerable<BusinessType>
    notIn?: Enumerable<BusinessType>
    not?: NestedEnumBusinessTypeWithAggregatesFilter | BusinessType
    _count?: NestedIntFilter
    _min?: NestedEnumBusinessTypeFilter
    _max?: NestedEnumBusinessTypeFilter
  }

  type ExpenseCategoryRelationFilter = {
    is?: ExpenseCategoryWhereInput
    isNot?: ExpenseCategoryWhereInput
  }

  type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  type FloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  type BudgetCountOrderByAggregateInput = {
    id?: SortOrder
    ExpenseCategoryId?: SortOrder
    startingDate?: SortOrder
    endingDate?: SortOrder
    total?: SortOrder
    userId?: SortOrder
  }

  type BudgetAvgOrderByAggregateInput = {
    total?: SortOrder
  }

  type BudgetMaxOrderByAggregateInput = {
    id?: SortOrder
    ExpenseCategoryId?: SortOrder
    startingDate?: SortOrder
    endingDate?: SortOrder
    total?: SortOrder
    userId?: SortOrder
  }

  type BudgetMinOrderByAggregateInput = {
    id?: SortOrder
    ExpenseCategoryId?: SortOrder
    startingDate?: SortOrder
    endingDate?: SortOrder
    total?: SortOrder
    userId?: SortOrder
  }

  type BudgetSumOrderByAggregateInput = {
    total?: SortOrder
  }

  type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  type FloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  type FloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
    isSet?: boolean
  }

  type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  type ProductCategoryRelationFilter = {
    is?: ProductCategoryWhereInput | null
    isNot?: ProductCategoryWhereInput | null
  }

  type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
    isSet?: boolean
  }

  type IncomeProductsListRelationFilter = {
    every?: IncomeProductsWhereInput
    some?: IncomeProductsWhereInput
    none?: IncomeProductsWhereInput
  }

  type IncomeProductsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    retailPrice?: SortOrder
    cost?: SortOrder
    unit?: SortOrder
    quantity?: SortOrder
    image?: SortOrder
    stock?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    categoryId?: SortOrder
    ownerId?: SortOrder
    deletedAt?: SortOrder
  }

  type ProductAvgOrderByAggregateInput = {
    retailPrice?: SortOrder
    cost?: SortOrder
    quantity?: SortOrder
    stock?: SortOrder
  }

  type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    retailPrice?: SortOrder
    cost?: SortOrder
    unit?: SortOrder
    quantity?: SortOrder
    image?: SortOrder
    stock?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    categoryId?: SortOrder
    ownerId?: SortOrder
    deletedAt?: SortOrder
  }

  type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    retailPrice?: SortOrder
    cost?: SortOrder
    unit?: SortOrder
    quantity?: SortOrder
    image?: SortOrder
    stock?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    categoryId?: SortOrder
    ownerId?: SortOrder
    deletedAt?: SortOrder
  }

  type ProductSumOrderByAggregateInput = {
    retailPrice?: SortOrder
    cost?: SortOrder
    quantity?: SortOrder
    stock?: SortOrder
  }

  type FloatNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedFloatNullableFilter
    _min?: NestedFloatNullableFilter
    _max?: NestedFloatNullableFilter
    isSet?: boolean
  }

  type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
    isSet?: boolean
  }

  type StringNullableListFilter = {
    equals?: Enumerable<string> | null
    has?: string | null
    hasEvery?: Enumerable<string>
    hasSome?: Enumerable<string>
    isEmpty?: boolean
  }

  type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrder
    description?: SortOrder
    retailPrice?: SortOrder
    createdAt?: SortOrder
    categoryId?: SortOrder
    ownerId?: SortOrder
    saleIDs?: SortOrder
  }

  type ServiceAvgOrderByAggregateInput = {
    retailPrice?: SortOrder
  }

  type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrder
    description?: SortOrder
    retailPrice?: SortOrder
    createdAt?: SortOrder
    categoryId?: SortOrder
    ownerId?: SortOrder
  }

  type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrder
    description?: SortOrder
    retailPrice?: SortOrder
    createdAt?: SortOrder
    categoryId?: SortOrder
    ownerId?: SortOrder
  }

  type ServiceSumOrderByAggregateInput = {
    retailPrice?: SortOrder
  }

  type ProductCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
  }

  type ProductCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
  }

  type ProductCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
  }

  type EnumTypeOfContactFilter = {
    equals?: TypeOfContact
    in?: Enumerable<TypeOfContact>
    notIn?: Enumerable<TypeOfContact>
    not?: NestedEnumTypeOfContactFilter | TypeOfContact
  }

  type ContactCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    typeOfContact?: SortOrder
    email?: SortOrder
    comments?: SortOrder
    deletedAt?: SortOrder
    ownerId?: SortOrder
  }

  type ContactMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    typeOfContact?: SortOrder
    email?: SortOrder
    comments?: SortOrder
    deletedAt?: SortOrder
    ownerId?: SortOrder
  }

  type ContactMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    typeOfContact?: SortOrder
    email?: SortOrder
    comments?: SortOrder
    deletedAt?: SortOrder
    ownerId?: SortOrder
  }

  type EnumTypeOfContactWithAggregatesFilter = {
    equals?: TypeOfContact
    in?: Enumerable<TypeOfContact>
    notIn?: Enumerable<TypeOfContact>
    not?: NestedEnumTypeOfContactWithAggregatesFilter | TypeOfContact
    _count?: NestedIntFilter
    _min?: NestedEnumTypeOfContactFilter
    _max?: NestedEnumTypeOfContactFilter
  }

  type ExpenseCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
  }

  type ExpenseCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
  }

  type ExpenseCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
  }

  type IncomeCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
  }

  type IncomeCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
  }

  type IncomeCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    imageUrl?: SortOrder
  }

  type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  type ContactRelationFilter = {
    is?: ContactWhereInput | null
    isNot?: ContactWhereInput | null
  }

  type EnumPaymentMethodNullableFilter = {
    equals?: PaymentMethod | null
    in?: Enumerable<PaymentMethod> | null
    notIn?: Enumerable<PaymentMethod> | null
    not?: NestedEnumPaymentMethodNullableFilter | PaymentMethod | null
    isSet?: boolean
  }

  type ExpenseCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    value?: SortOrder
    name?: SortOrder
    date?: SortOrder
    isPaid?: SortOrder
    deletedAt?: SortOrder
    categoryId?: SortOrder
    providerId?: SortOrder
    paymentMethod?: SortOrder
    ownerId?: SortOrder
    expenseDebtIds?: SortOrder
  }

  type ExpenseAvgOrderByAggregateInput = {
    value?: SortOrder
  }

  type ExpenseMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    value?: SortOrder
    name?: SortOrder
    date?: SortOrder
    isPaid?: SortOrder
    deletedAt?: SortOrder
    categoryId?: SortOrder
    providerId?: SortOrder
    paymentMethod?: SortOrder
    ownerId?: SortOrder
  }

  type ExpenseMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    value?: SortOrder
    name?: SortOrder
    date?: SortOrder
    isPaid?: SortOrder
    deletedAt?: SortOrder
    categoryId?: SortOrder
    providerId?: SortOrder
    paymentMethod?: SortOrder
    ownerId?: SortOrder
  }

  type ExpenseSumOrderByAggregateInput = {
    value?: SortOrder
  }

  type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  type EnumPaymentMethodNullableWithAggregatesFilter = {
    equals?: PaymentMethod | null
    in?: Enumerable<PaymentMethod> | null
    notIn?: Enumerable<PaymentMethod> | null
    not?: NestedEnumPaymentMethodNullableWithAggregatesFilter | PaymentMethod | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumPaymentMethodNullableFilter
    _max?: NestedEnumPaymentMethodNullableFilter
    isSet?: boolean
  }

  type IncomeCategoryRelationFilter = {
    is?: IncomeCategoryWhereInput
    isNot?: IncomeCategoryWhereInput
  }

  type IncomeCountOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    name?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    serviceIDs?: SortOrder
    clientId?: SortOrder
    categoryId?: SortOrder
    isPaid?: SortOrder
    paymentMethod?: SortOrder
    ownerId?: SortOrder
    incomeDebtIds?: SortOrder
  }

  type IncomeAvgOrderByAggregateInput = {
    value?: SortOrder
  }

  type IncomeMaxOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    name?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    clientId?: SortOrder
    categoryId?: SortOrder
    isPaid?: SortOrder
    paymentMethod?: SortOrder
    ownerId?: SortOrder
  }

  type IncomeMinOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    name?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    deletedAt?: SortOrder
    clientId?: SortOrder
    categoryId?: SortOrder
    isPaid?: SortOrder
    paymentMethod?: SortOrder
    ownerId?: SortOrder
  }

  type IncomeSumOrderByAggregateInput = {
    value?: SortOrder
  }

  type DebtPaymentListRelationFilter = {
    every?: DebtPaymentWhereInput
    some?: DebtPaymentWhereInput
    none?: DebtPaymentWhereInput
  }

  type DebtPaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  type IncomeDebtCountOrderByAggregateInput = {
    id?: SortOrder
    initialDate?: SortOrder
    ownerId?: SortOrder
    incomeIDs?: SortOrder
  }

  type IncomeDebtMaxOrderByAggregateInput = {
    id?: SortOrder
    initialDate?: SortOrder
    ownerId?: SortOrder
  }

  type IncomeDebtMinOrderByAggregateInput = {
    id?: SortOrder
    initialDate?: SortOrder
    ownerId?: SortOrder
  }

  type ExpenseDebtCountOrderByAggregateInput = {
    id?: SortOrder
    initialDate?: SortOrder
    ownerId?: SortOrder
    expenseIDs?: SortOrder
  }

  type ExpenseDebtMaxOrderByAggregateInput = {
    id?: SortOrder
    initialDate?: SortOrder
    ownerId?: SortOrder
  }

  type ExpenseDebtMinOrderByAggregateInput = {
    id?: SortOrder
    initialDate?: SortOrder
    ownerId?: SortOrder
  }

  type IncomeRelationFilter = {
    is?: IncomeWhereInput
    isNot?: IncomeWhereInput
  }

  type ProductRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  type IncomeProductsCountOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    incomeId?: SortOrder
    productId?: SortOrder
  }

  type IncomeProductsAvgOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
  }

  type IncomeProductsMaxOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    incomeId?: SortOrder
    productId?: SortOrder
  }

  type IncomeProductsMinOrderByAggregateInput = {
    id?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    incomeId?: SortOrder
    productId?: SortOrder
  }

  type IncomeProductsSumOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
  }

  type EnumPaymentMethodFilter = {
    equals?: PaymentMethod
    in?: Enumerable<PaymentMethod>
    notIn?: Enumerable<PaymentMethod>
    not?: NestedEnumPaymentMethodFilter | PaymentMethod
  }

  type IncomeDebtRelationFilter = {
    is?: IncomeDebtWhereInput | null
    isNot?: IncomeDebtWhereInput | null
  }

  type ExpenseDebtRelationFilter = {
    is?: ExpenseDebtWhereInput | null
    isNot?: ExpenseDebtWhereInput | null
  }

  type DebtPaymentCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    amount?: SortOrder
    debtId?: SortOrder
    description?: SortOrder
    paymentMethod?: SortOrder
    paidAt?: SortOrder
    incomeDebtId?: SortOrder
    expenseDebtId?: SortOrder
  }

  type DebtPaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  type DebtPaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    amount?: SortOrder
    debtId?: SortOrder
    description?: SortOrder
    paymentMethod?: SortOrder
    paidAt?: SortOrder
    incomeDebtId?: SortOrder
    expenseDebtId?: SortOrder
  }

  type DebtPaymentMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    amount?: SortOrder
    debtId?: SortOrder
    description?: SortOrder
    paymentMethod?: SortOrder
    paidAt?: SortOrder
    incomeDebtId?: SortOrder
    expenseDebtId?: SortOrder
  }

  type DebtPaymentSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  type EnumPaymentMethodWithAggregatesFilter = {
    equals?: PaymentMethod
    in?: Enumerable<PaymentMethod>
    notIn?: Enumerable<PaymentMethod>
    not?: NestedEnumPaymentMethodWithAggregatesFilter | PaymentMethod
    _count?: NestedIntFilter
    _min?: NestedEnumPaymentMethodFilter
    _max?: NestedEnumPaymentMethodFilter
  }

  type UserAccountCreateNestedOneWithoutUserInput = {
    create?: XOR<UserAccountCreateWithoutUserInput, UserAccountUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserAccountCreateOrConnectWithoutUserInput
    connect?: UserAccountWhereUniqueInput
  }

  type BudgetCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<BudgetCreateWithoutUserInput>, Enumerable<BudgetUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<BudgetCreateOrConnectWithoutUserInput>
    createMany?: BudgetCreateManyUserInputEnvelope
    connect?: Enumerable<BudgetWhereUniqueInput>
  }

  type ProductCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<ProductCreateWithoutOwnerInput>, Enumerable<ProductUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ProductCreateOrConnectWithoutOwnerInput>
    createMany?: ProductCreateManyOwnerInputEnvelope
    connect?: Enumerable<ProductWhereUniqueInput>
  }

  type ProductCategoryCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ProductCategoryCreateWithoutUserInput>, Enumerable<ProductCategoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ProductCategoryCreateOrConnectWithoutUserInput>
    createMany?: ProductCategoryCreateManyUserInputEnvelope
    connect?: Enumerable<ProductCategoryWhereUniqueInput>
  }

  type ContactCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<ContactCreateWithoutOwnerInput>, Enumerable<ContactUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ContactCreateOrConnectWithoutOwnerInput>
    createMany?: ContactCreateManyOwnerInputEnvelope
    connect?: Enumerable<ContactWhereUniqueInput>
  }

  type IncomeCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutOwnerInput>, Enumerable<IncomeUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutOwnerInput>
    createMany?: IncomeCreateManyOwnerInputEnvelope
    connect?: Enumerable<IncomeWhereUniqueInput>
  }

  type ExpenseCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<ExpenseCreateWithoutOwnerInput>, Enumerable<ExpenseUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ExpenseCreateOrConnectWithoutOwnerInput>
    createMany?: ExpenseCreateManyOwnerInputEnvelope
    connect?: Enumerable<ExpenseWhereUniqueInput>
  }

  type ServiceCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutOwnerInput>, Enumerable<ServiceUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutOwnerInput>
    createMany?: ServiceCreateManyOwnerInputEnvelope
    connect?: Enumerable<ServiceWhereUniqueInput>
  }

  type ExpenseDebtCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<ExpenseDebtCreateWithoutOwnerInput>, Enumerable<ExpenseDebtUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ExpenseDebtCreateOrConnectWithoutOwnerInput>
    createMany?: ExpenseDebtCreateManyOwnerInputEnvelope
    connect?: Enumerable<ExpenseDebtWhereUniqueInput>
  }

  type IncomeDebtCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<IncomeDebtCreateWithoutOwnerInput>, Enumerable<IncomeDebtUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<IncomeDebtCreateOrConnectWithoutOwnerInput>
    createMany?: IncomeDebtCreateManyOwnerInputEnvelope
    connect?: Enumerable<IncomeDebtWhereUniqueInput>
  }

  type UserAccountUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserAccountCreateWithoutUserInput, UserAccountUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserAccountCreateOrConnectWithoutUserInput
    connect?: UserAccountWhereUniqueInput
  }

  type BudgetUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<BudgetCreateWithoutUserInput>, Enumerable<BudgetUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<BudgetCreateOrConnectWithoutUserInput>
    createMany?: BudgetCreateManyUserInputEnvelope
    connect?: Enumerable<BudgetWhereUniqueInput>
  }

  type ProductUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<ProductCreateWithoutOwnerInput>, Enumerable<ProductUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ProductCreateOrConnectWithoutOwnerInput>
    createMany?: ProductCreateManyOwnerInputEnvelope
    connect?: Enumerable<ProductWhereUniqueInput>
  }

  type ProductCategoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ProductCategoryCreateWithoutUserInput>, Enumerable<ProductCategoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ProductCategoryCreateOrConnectWithoutUserInput>
    createMany?: ProductCategoryCreateManyUserInputEnvelope
    connect?: Enumerable<ProductCategoryWhereUniqueInput>
  }

  type ContactUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<ContactCreateWithoutOwnerInput>, Enumerable<ContactUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ContactCreateOrConnectWithoutOwnerInput>
    createMany?: ContactCreateManyOwnerInputEnvelope
    connect?: Enumerable<ContactWhereUniqueInput>
  }

  type IncomeUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutOwnerInput>, Enumerable<IncomeUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutOwnerInput>
    createMany?: IncomeCreateManyOwnerInputEnvelope
    connect?: Enumerable<IncomeWhereUniqueInput>
  }

  type ExpenseUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<ExpenseCreateWithoutOwnerInput>, Enumerable<ExpenseUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ExpenseCreateOrConnectWithoutOwnerInput>
    createMany?: ExpenseCreateManyOwnerInputEnvelope
    connect?: Enumerable<ExpenseWhereUniqueInput>
  }

  type ServiceUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutOwnerInput>, Enumerable<ServiceUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutOwnerInput>
    createMany?: ServiceCreateManyOwnerInputEnvelope
    connect?: Enumerable<ServiceWhereUniqueInput>
  }

  type ExpenseDebtUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<ExpenseDebtCreateWithoutOwnerInput>, Enumerable<ExpenseDebtUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ExpenseDebtCreateOrConnectWithoutOwnerInput>
    createMany?: ExpenseDebtCreateManyOwnerInputEnvelope
    connect?: Enumerable<ExpenseDebtWhereUniqueInput>
  }

  type IncomeDebtUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<Enumerable<IncomeDebtCreateWithoutOwnerInput>, Enumerable<IncomeDebtUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<IncomeDebtCreateOrConnectWithoutOwnerInput>
    createMany?: IncomeDebtCreateManyOwnerInputEnvelope
    connect?: Enumerable<IncomeDebtWhereUniqueInput>
  }

  type StringFieldUpdateOperationsInput = {
    set?: string
  }

  type UserAccountUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserAccountCreateWithoutUserInput, UserAccountUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserAccountCreateOrConnectWithoutUserInput
    upsert?: UserAccountUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: UserAccountWhereUniqueInput
    update?: XOR<UserAccountUpdateWithoutUserInput, UserAccountUncheckedUpdateWithoutUserInput>
  }

  type NullableEnumBusinessTypeFieldUpdateOperationsInput = {
    set?: BusinessType | null
    unset?: boolean
  }

  type BudgetUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<BudgetCreateWithoutUserInput>, Enumerable<BudgetUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<BudgetCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<BudgetUpsertWithWhereUniqueWithoutUserInput>
    createMany?: BudgetCreateManyUserInputEnvelope
    set?: Enumerable<BudgetWhereUniqueInput>
    disconnect?: Enumerable<BudgetWhereUniqueInput>
    delete?: Enumerable<BudgetWhereUniqueInput>
    connect?: Enumerable<BudgetWhereUniqueInput>
    update?: Enumerable<BudgetUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<BudgetUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<BudgetScalarWhereInput>
  }

  type ProductUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<Enumerable<ProductCreateWithoutOwnerInput>, Enumerable<ProductUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ProductCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<ProductUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: ProductCreateManyOwnerInputEnvelope
    set?: Enumerable<ProductWhereUniqueInput>
    disconnect?: Enumerable<ProductWhereUniqueInput>
    delete?: Enumerable<ProductWhereUniqueInput>
    connect?: Enumerable<ProductWhereUniqueInput>
    update?: Enumerable<ProductUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<ProductUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<ProductScalarWhereInput>
  }

  type ProductCategoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<ProductCategoryCreateWithoutUserInput>, Enumerable<ProductCategoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ProductCategoryCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ProductCategoryUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ProductCategoryCreateManyUserInputEnvelope
    set?: Enumerable<ProductCategoryWhereUniqueInput>
    disconnect?: Enumerable<ProductCategoryWhereUniqueInput>
    delete?: Enumerable<ProductCategoryWhereUniqueInput>
    connect?: Enumerable<ProductCategoryWhereUniqueInput>
    update?: Enumerable<ProductCategoryUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ProductCategoryUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ProductCategoryScalarWhereInput>
  }

  type ContactUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<Enumerable<ContactCreateWithoutOwnerInput>, Enumerable<ContactUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ContactCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<ContactUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: ContactCreateManyOwnerInputEnvelope
    set?: Enumerable<ContactWhereUniqueInput>
    disconnect?: Enumerable<ContactWhereUniqueInput>
    delete?: Enumerable<ContactWhereUniqueInput>
    connect?: Enumerable<ContactWhereUniqueInput>
    update?: Enumerable<ContactUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<ContactUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<ContactScalarWhereInput>
  }

  type IncomeUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutOwnerInput>, Enumerable<IncomeUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<IncomeUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: IncomeCreateManyOwnerInputEnvelope
    set?: Enumerable<IncomeWhereUniqueInput>
    disconnect?: Enumerable<IncomeWhereUniqueInput>
    delete?: Enumerable<IncomeWhereUniqueInput>
    connect?: Enumerable<IncomeWhereUniqueInput>
    update?: Enumerable<IncomeUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<IncomeUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<IncomeScalarWhereInput>
  }

  type ExpenseUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<Enumerable<ExpenseCreateWithoutOwnerInput>, Enumerable<ExpenseUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ExpenseCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<ExpenseUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: ExpenseCreateManyOwnerInputEnvelope
    set?: Enumerable<ExpenseWhereUniqueInput>
    disconnect?: Enumerable<ExpenseWhereUniqueInput>
    delete?: Enumerable<ExpenseWhereUniqueInput>
    connect?: Enumerable<ExpenseWhereUniqueInput>
    update?: Enumerable<ExpenseUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<ExpenseUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<ExpenseScalarWhereInput>
  }

  type ServiceUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutOwnerInput>, Enumerable<ServiceUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<ServiceUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: ServiceCreateManyOwnerInputEnvelope
    set?: Enumerable<ServiceWhereUniqueInput>
    disconnect?: Enumerable<ServiceWhereUniqueInput>
    delete?: Enumerable<ServiceWhereUniqueInput>
    connect?: Enumerable<ServiceWhereUniqueInput>
    update?: Enumerable<ServiceUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<ServiceUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<ServiceScalarWhereInput>
  }

  type ExpenseDebtUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<Enumerable<ExpenseDebtCreateWithoutOwnerInput>, Enumerable<ExpenseDebtUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ExpenseDebtCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<ExpenseDebtUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: ExpenseDebtCreateManyOwnerInputEnvelope
    set?: Enumerable<ExpenseDebtWhereUniqueInput>
    disconnect?: Enumerable<ExpenseDebtWhereUniqueInput>
    delete?: Enumerable<ExpenseDebtWhereUniqueInput>
    connect?: Enumerable<ExpenseDebtWhereUniqueInput>
    update?: Enumerable<ExpenseDebtUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<ExpenseDebtUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<ExpenseDebtScalarWhereInput>
  }

  type IncomeDebtUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<Enumerable<IncomeDebtCreateWithoutOwnerInput>, Enumerable<IncomeDebtUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<IncomeDebtCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<IncomeDebtUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: IncomeDebtCreateManyOwnerInputEnvelope
    set?: Enumerable<IncomeDebtWhereUniqueInput>
    disconnect?: Enumerable<IncomeDebtWhereUniqueInput>
    delete?: Enumerable<IncomeDebtWhereUniqueInput>
    connect?: Enumerable<IncomeDebtWhereUniqueInput>
    update?: Enumerable<IncomeDebtUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<IncomeDebtUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<IncomeDebtScalarWhereInput>
  }

  type UserAccountUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserAccountCreateWithoutUserInput, UserAccountUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserAccountCreateOrConnectWithoutUserInput
    upsert?: UserAccountUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: UserAccountWhereUniqueInput
    update?: XOR<UserAccountUpdateWithoutUserInput, UserAccountUncheckedUpdateWithoutUserInput>
  }

  type BudgetUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<BudgetCreateWithoutUserInput>, Enumerable<BudgetUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<BudgetCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<BudgetUpsertWithWhereUniqueWithoutUserInput>
    createMany?: BudgetCreateManyUserInputEnvelope
    set?: Enumerable<BudgetWhereUniqueInput>
    disconnect?: Enumerable<BudgetWhereUniqueInput>
    delete?: Enumerable<BudgetWhereUniqueInput>
    connect?: Enumerable<BudgetWhereUniqueInput>
    update?: Enumerable<BudgetUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<BudgetUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<BudgetScalarWhereInput>
  }

  type ProductUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<Enumerable<ProductCreateWithoutOwnerInput>, Enumerable<ProductUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ProductCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<ProductUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: ProductCreateManyOwnerInputEnvelope
    set?: Enumerable<ProductWhereUniqueInput>
    disconnect?: Enumerable<ProductWhereUniqueInput>
    delete?: Enumerable<ProductWhereUniqueInput>
    connect?: Enumerable<ProductWhereUniqueInput>
    update?: Enumerable<ProductUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<ProductUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<ProductScalarWhereInput>
  }

  type ProductCategoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<ProductCategoryCreateWithoutUserInput>, Enumerable<ProductCategoryUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ProductCategoryCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ProductCategoryUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ProductCategoryCreateManyUserInputEnvelope
    set?: Enumerable<ProductCategoryWhereUniqueInput>
    disconnect?: Enumerable<ProductCategoryWhereUniqueInput>
    delete?: Enumerable<ProductCategoryWhereUniqueInput>
    connect?: Enumerable<ProductCategoryWhereUniqueInput>
    update?: Enumerable<ProductCategoryUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ProductCategoryUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ProductCategoryScalarWhereInput>
  }

  type ContactUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<Enumerable<ContactCreateWithoutOwnerInput>, Enumerable<ContactUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ContactCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<ContactUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: ContactCreateManyOwnerInputEnvelope
    set?: Enumerable<ContactWhereUniqueInput>
    disconnect?: Enumerable<ContactWhereUniqueInput>
    delete?: Enumerable<ContactWhereUniqueInput>
    connect?: Enumerable<ContactWhereUniqueInput>
    update?: Enumerable<ContactUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<ContactUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<ContactScalarWhereInput>
  }

  type IncomeUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutOwnerInput>, Enumerable<IncomeUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<IncomeUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: IncomeCreateManyOwnerInputEnvelope
    set?: Enumerable<IncomeWhereUniqueInput>
    disconnect?: Enumerable<IncomeWhereUniqueInput>
    delete?: Enumerable<IncomeWhereUniqueInput>
    connect?: Enumerable<IncomeWhereUniqueInput>
    update?: Enumerable<IncomeUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<IncomeUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<IncomeScalarWhereInput>
  }

  type ExpenseUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<Enumerable<ExpenseCreateWithoutOwnerInput>, Enumerable<ExpenseUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ExpenseCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<ExpenseUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: ExpenseCreateManyOwnerInputEnvelope
    set?: Enumerable<ExpenseWhereUniqueInput>
    disconnect?: Enumerable<ExpenseWhereUniqueInput>
    delete?: Enumerable<ExpenseWhereUniqueInput>
    connect?: Enumerable<ExpenseWhereUniqueInput>
    update?: Enumerable<ExpenseUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<ExpenseUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<ExpenseScalarWhereInput>
  }

  type ServiceUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutOwnerInput>, Enumerable<ServiceUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<ServiceUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: ServiceCreateManyOwnerInputEnvelope
    set?: Enumerable<ServiceWhereUniqueInput>
    disconnect?: Enumerable<ServiceWhereUniqueInput>
    delete?: Enumerable<ServiceWhereUniqueInput>
    connect?: Enumerable<ServiceWhereUniqueInput>
    update?: Enumerable<ServiceUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<ServiceUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<ServiceScalarWhereInput>
  }

  type ExpenseDebtUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<Enumerable<ExpenseDebtCreateWithoutOwnerInput>, Enumerable<ExpenseDebtUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<ExpenseDebtCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<ExpenseDebtUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: ExpenseDebtCreateManyOwnerInputEnvelope
    set?: Enumerable<ExpenseDebtWhereUniqueInput>
    disconnect?: Enumerable<ExpenseDebtWhereUniqueInput>
    delete?: Enumerable<ExpenseDebtWhereUniqueInput>
    connect?: Enumerable<ExpenseDebtWhereUniqueInput>
    update?: Enumerable<ExpenseDebtUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<ExpenseDebtUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<ExpenseDebtScalarWhereInput>
  }

  type IncomeDebtUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<Enumerable<IncomeDebtCreateWithoutOwnerInput>, Enumerable<IncomeDebtUncheckedCreateWithoutOwnerInput>>
    connectOrCreate?: Enumerable<IncomeDebtCreateOrConnectWithoutOwnerInput>
    upsert?: Enumerable<IncomeDebtUpsertWithWhereUniqueWithoutOwnerInput>
    createMany?: IncomeDebtCreateManyOwnerInputEnvelope
    set?: Enumerable<IncomeDebtWhereUniqueInput>
    disconnect?: Enumerable<IncomeDebtWhereUniqueInput>
    delete?: Enumerable<IncomeDebtWhereUniqueInput>
    connect?: Enumerable<IncomeDebtWhereUniqueInput>
    update?: Enumerable<IncomeDebtUpdateWithWhereUniqueWithoutOwnerInput>
    updateMany?: Enumerable<IncomeDebtUpdateManyWithWhereWithoutOwnerInput>
    deleteMany?: Enumerable<IncomeDebtScalarWhereInput>
  }

  type UserCreateNestedOneWithoutAccountInput = {
    create?: XOR<UserCreateWithoutAccountInput, UserUncheckedCreateWithoutAccountInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountInput
    connect?: UserWhereUniqueInput
  }

  type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  type UserUpdateOneRequiredWithoutAccountNestedInput = {
    create?: XOR<UserCreateWithoutAccountInput, UserUncheckedCreateWithoutAccountInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountInput
    upsert?: UserUpsertWithoutAccountInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutAccountInput, UserUncheckedUpdateWithoutAccountInput>
  }

  type EnumBusinessTypeFieldUpdateOperationsInput = {
    set?: BusinessType
  }

  type ExpenseCategoryCreateNestedOneWithoutBudgetInput = {
    create?: XOR<ExpenseCategoryCreateWithoutBudgetInput, ExpenseCategoryUncheckedCreateWithoutBudgetInput>
    connectOrCreate?: ExpenseCategoryCreateOrConnectWithoutBudgetInput
    connect?: ExpenseCategoryWhereUniqueInput
  }

  type UserCreateNestedOneWithoutBudgetsInput = {
    create?: XOR<UserCreateWithoutBudgetsInput, UserUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBudgetsInput
    connect?: UserWhereUniqueInput
  }

  type ExpenseCategoryUpdateOneRequiredWithoutBudgetNestedInput = {
    create?: XOR<ExpenseCategoryCreateWithoutBudgetInput, ExpenseCategoryUncheckedCreateWithoutBudgetInput>
    connectOrCreate?: ExpenseCategoryCreateOrConnectWithoutBudgetInput
    upsert?: ExpenseCategoryUpsertWithoutBudgetInput
    connect?: ExpenseCategoryWhereUniqueInput
    update?: XOR<ExpenseCategoryUpdateWithoutBudgetInput, ExpenseCategoryUncheckedUpdateWithoutBudgetInput>
  }

  type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  type UserUpdateOneRequiredWithoutBudgetsNestedInput = {
    create?: XOR<UserCreateWithoutBudgetsInput, UserUncheckedCreateWithoutBudgetsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBudgetsInput
    upsert?: UserUpsertWithoutBudgetsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutBudgetsInput, UserUncheckedUpdateWithoutBudgetsInput>
  }

  type ProductCategoryCreateNestedOneWithoutProductInput = {
    create?: XOR<ProductCategoryCreateWithoutProductInput, ProductCategoryUncheckedCreateWithoutProductInput>
    connectOrCreate?: ProductCategoryCreateOrConnectWithoutProductInput
    connect?: ProductCategoryWhereUniqueInput
  }

  type UserCreateNestedOneWithoutProductsInput = {
    create?: XOR<UserCreateWithoutProductsInput, UserUncheckedCreateWithoutProductsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProductsInput
    connect?: UserWhereUniqueInput
  }

  type IncomeProductsCreateNestedManyWithoutProductInput = {
    create?: XOR<Enumerable<IncomeProductsCreateWithoutProductInput>, Enumerable<IncomeProductsUncheckedCreateWithoutProductInput>>
    connectOrCreate?: Enumerable<IncomeProductsCreateOrConnectWithoutProductInput>
    createMany?: IncomeProductsCreateManyProductInputEnvelope
    connect?: Enumerable<IncomeProductsWhereUniqueInput>
  }

  type IncomeProductsUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<Enumerable<IncomeProductsCreateWithoutProductInput>, Enumerable<IncomeProductsUncheckedCreateWithoutProductInput>>
    connectOrCreate?: Enumerable<IncomeProductsCreateOrConnectWithoutProductInput>
    createMany?: IncomeProductsCreateManyProductInputEnvelope
    connect?: Enumerable<IncomeProductsWhereUniqueInput>
  }

  type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  type ProductCategoryUpdateOneWithoutProductNestedInput = {
    create?: XOR<ProductCategoryCreateWithoutProductInput, ProductCategoryUncheckedCreateWithoutProductInput>
    connectOrCreate?: ProductCategoryCreateOrConnectWithoutProductInput
    upsert?: ProductCategoryUpsertWithoutProductInput
    disconnect?: boolean
    delete?: boolean
    connect?: ProductCategoryWhereUniqueInput
    update?: XOR<ProductCategoryUpdateWithoutProductInput, ProductCategoryUncheckedUpdateWithoutProductInput>
  }

  type UserUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<UserCreateWithoutProductsInput, UserUncheckedCreateWithoutProductsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProductsInput
    upsert?: UserUpsertWithoutProductsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutProductsInput, UserUncheckedUpdateWithoutProductsInput>
  }

  type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  type IncomeProductsUpdateManyWithoutProductNestedInput = {
    create?: XOR<Enumerable<IncomeProductsCreateWithoutProductInput>, Enumerable<IncomeProductsUncheckedCreateWithoutProductInput>>
    connectOrCreate?: Enumerable<IncomeProductsCreateOrConnectWithoutProductInput>
    upsert?: Enumerable<IncomeProductsUpsertWithWhereUniqueWithoutProductInput>
    createMany?: IncomeProductsCreateManyProductInputEnvelope
    set?: Enumerable<IncomeProductsWhereUniqueInput>
    disconnect?: Enumerable<IncomeProductsWhereUniqueInput>
    delete?: Enumerable<IncomeProductsWhereUniqueInput>
    connect?: Enumerable<IncomeProductsWhereUniqueInput>
    update?: Enumerable<IncomeProductsUpdateWithWhereUniqueWithoutProductInput>
    updateMany?: Enumerable<IncomeProductsUpdateManyWithWhereWithoutProductInput>
    deleteMany?: Enumerable<IncomeProductsScalarWhereInput>
  }

  type IncomeProductsUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<Enumerable<IncomeProductsCreateWithoutProductInput>, Enumerable<IncomeProductsUncheckedCreateWithoutProductInput>>
    connectOrCreate?: Enumerable<IncomeProductsCreateOrConnectWithoutProductInput>
    upsert?: Enumerable<IncomeProductsUpsertWithWhereUniqueWithoutProductInput>
    createMany?: IncomeProductsCreateManyProductInputEnvelope
    set?: Enumerable<IncomeProductsWhereUniqueInput>
    disconnect?: Enumerable<IncomeProductsWhereUniqueInput>
    delete?: Enumerable<IncomeProductsWhereUniqueInput>
    connect?: Enumerable<IncomeProductsWhereUniqueInput>
    update?: Enumerable<IncomeProductsUpdateWithWhereUniqueWithoutProductInput>
    updateMany?: Enumerable<IncomeProductsUpdateManyWithWhereWithoutProductInput>
    deleteMany?: Enumerable<IncomeProductsScalarWhereInput>
  }

  type ProductCategoryCreateNestedOneWithoutServiceInput = {
    create?: XOR<ProductCategoryCreateWithoutServiceInput, ProductCategoryUncheckedCreateWithoutServiceInput>
    connectOrCreate?: ProductCategoryCreateOrConnectWithoutServiceInput
    connect?: ProductCategoryWhereUniqueInput
  }

  type UserCreateNestedOneWithoutServicesInput = {
    create?: XOR<UserCreateWithoutServicesInput, UserUncheckedCreateWithoutServicesInput>
    connectOrCreate?: UserCreateOrConnectWithoutServicesInput
    connect?: UserWhereUniqueInput
  }

  type ServiceCreatesaleIDsInput = {
    set: Enumerable<string>
  }

  type IncomeCreateNestedManyWithoutServicesInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutServicesInput>, Enumerable<IncomeUncheckedCreateWithoutServicesInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutServicesInput>
    connect?: Enumerable<IncomeWhereUniqueInput>
  }

  type IncomeUncheckedCreateNestedManyWithoutServicesInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutServicesInput>, Enumerable<IncomeUncheckedCreateWithoutServicesInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutServicesInput>
    connect?: Enumerable<IncomeWhereUniqueInput>
  }

  type ProductCategoryUpdateOneWithoutServiceNestedInput = {
    create?: XOR<ProductCategoryCreateWithoutServiceInput, ProductCategoryUncheckedCreateWithoutServiceInput>
    connectOrCreate?: ProductCategoryCreateOrConnectWithoutServiceInput
    upsert?: ProductCategoryUpsertWithoutServiceInput
    disconnect?: boolean
    delete?: boolean
    connect?: ProductCategoryWhereUniqueInput
    update?: XOR<ProductCategoryUpdateWithoutServiceInput, ProductCategoryUncheckedUpdateWithoutServiceInput>
  }

  type UserUpdateOneRequiredWithoutServicesNestedInput = {
    create?: XOR<UserCreateWithoutServicesInput, UserUncheckedCreateWithoutServicesInput>
    connectOrCreate?: UserCreateOrConnectWithoutServicesInput
    upsert?: UserUpsertWithoutServicesInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutServicesInput, UserUncheckedUpdateWithoutServicesInput>
  }

  type ServiceUpdatesaleIDsInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  type IncomeUpdateManyWithoutServicesNestedInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutServicesInput>, Enumerable<IncomeUncheckedCreateWithoutServicesInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutServicesInput>
    upsert?: Enumerable<IncomeUpsertWithWhereUniqueWithoutServicesInput>
    set?: Enumerable<IncomeWhereUniqueInput>
    disconnect?: Enumerable<IncomeWhereUniqueInput>
    delete?: Enumerable<IncomeWhereUniqueInput>
    connect?: Enumerable<IncomeWhereUniqueInput>
    update?: Enumerable<IncomeUpdateWithWhereUniqueWithoutServicesInput>
    updateMany?: Enumerable<IncomeUpdateManyWithWhereWithoutServicesInput>
    deleteMany?: Enumerable<IncomeScalarWhereInput>
  }

  type IncomeUncheckedUpdateManyWithoutServicesNestedInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutServicesInput>, Enumerable<IncomeUncheckedCreateWithoutServicesInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutServicesInput>
    upsert?: Enumerable<IncomeUpsertWithWhereUniqueWithoutServicesInput>
    set?: Enumerable<IncomeWhereUniqueInput>
    disconnect?: Enumerable<IncomeWhereUniqueInput>
    delete?: Enumerable<IncomeWhereUniqueInput>
    connect?: Enumerable<IncomeWhereUniqueInput>
    update?: Enumerable<IncomeUpdateWithWhereUniqueWithoutServicesInput>
    updateMany?: Enumerable<IncomeUpdateManyWithWhereWithoutServicesInput>
    deleteMany?: Enumerable<IncomeScalarWhereInput>
  }

  type UserCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCategoriesInput
    connect?: UserWhereUniqueInput
  }

  type ProductCreateNestedManyWithoutCategoryInput = {
    create?: XOR<Enumerable<ProductCreateWithoutCategoryInput>, Enumerable<ProductUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<ProductCreateOrConnectWithoutCategoryInput>
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: Enumerable<ProductWhereUniqueInput>
  }

  type ServiceCreateNestedManyWithoutCategoryInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutCategoryInput>, Enumerable<ServiceUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutCategoryInput>
    createMany?: ServiceCreateManyCategoryInputEnvelope
    connect?: Enumerable<ServiceWhereUniqueInput>
  }

  type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<Enumerable<ProductCreateWithoutCategoryInput>, Enumerable<ProductUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<ProductCreateOrConnectWithoutCategoryInput>
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: Enumerable<ProductWhereUniqueInput>
  }

  type ServiceUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutCategoryInput>, Enumerable<ServiceUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutCategoryInput>
    createMany?: ServiceCreateManyCategoryInputEnvelope
    connect?: Enumerable<ServiceWhereUniqueInput>
  }

  type UserUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCategoriesInput
    upsert?: UserUpsertWithoutCategoriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutCategoriesInput, UserUncheckedUpdateWithoutCategoriesInput>
  }

  type ProductUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<Enumerable<ProductCreateWithoutCategoryInput>, Enumerable<ProductUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<ProductCreateOrConnectWithoutCategoryInput>
    upsert?: Enumerable<ProductUpsertWithWhereUniqueWithoutCategoryInput>
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: Enumerable<ProductWhereUniqueInput>
    disconnect?: Enumerable<ProductWhereUniqueInput>
    delete?: Enumerable<ProductWhereUniqueInput>
    connect?: Enumerable<ProductWhereUniqueInput>
    update?: Enumerable<ProductUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<ProductUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<ProductScalarWhereInput>
  }

  type ServiceUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutCategoryInput>, Enumerable<ServiceUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutCategoryInput>
    upsert?: Enumerable<ServiceUpsertWithWhereUniqueWithoutCategoryInput>
    createMany?: ServiceCreateManyCategoryInputEnvelope
    set?: Enumerable<ServiceWhereUniqueInput>
    disconnect?: Enumerable<ServiceWhereUniqueInput>
    delete?: Enumerable<ServiceWhereUniqueInput>
    connect?: Enumerable<ServiceWhereUniqueInput>
    update?: Enumerable<ServiceUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<ServiceUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<ServiceScalarWhereInput>
  }

  type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<Enumerable<ProductCreateWithoutCategoryInput>, Enumerable<ProductUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<ProductCreateOrConnectWithoutCategoryInput>
    upsert?: Enumerable<ProductUpsertWithWhereUniqueWithoutCategoryInput>
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: Enumerable<ProductWhereUniqueInput>
    disconnect?: Enumerable<ProductWhereUniqueInput>
    delete?: Enumerable<ProductWhereUniqueInput>
    connect?: Enumerable<ProductWhereUniqueInput>
    update?: Enumerable<ProductUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<ProductUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<ProductScalarWhereInput>
  }

  type ServiceUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutCategoryInput>, Enumerable<ServiceUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutCategoryInput>
    upsert?: Enumerable<ServiceUpsertWithWhereUniqueWithoutCategoryInput>
    createMany?: ServiceCreateManyCategoryInputEnvelope
    set?: Enumerable<ServiceWhereUniqueInput>
    disconnect?: Enumerable<ServiceWhereUniqueInput>
    delete?: Enumerable<ServiceWhereUniqueInput>
    connect?: Enumerable<ServiceWhereUniqueInput>
    update?: Enumerable<ServiceUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<ServiceUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<ServiceScalarWhereInput>
  }

  type UserCreateNestedOneWithoutContactsInput = {
    create?: XOR<UserCreateWithoutContactsInput, UserUncheckedCreateWithoutContactsInput>
    connectOrCreate?: UserCreateOrConnectWithoutContactsInput
    connect?: UserWhereUniqueInput
  }

  type IncomeCreateNestedManyWithoutClientInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutClientInput>, Enumerable<IncomeUncheckedCreateWithoutClientInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutClientInput>
    createMany?: IncomeCreateManyClientInputEnvelope
    connect?: Enumerable<IncomeWhereUniqueInput>
  }

  type ExpenseCreateNestedManyWithoutProviderInput = {
    create?: XOR<Enumerable<ExpenseCreateWithoutProviderInput>, Enumerable<ExpenseUncheckedCreateWithoutProviderInput>>
    connectOrCreate?: Enumerable<ExpenseCreateOrConnectWithoutProviderInput>
    createMany?: ExpenseCreateManyProviderInputEnvelope
    connect?: Enumerable<ExpenseWhereUniqueInput>
  }

  type IncomeUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutClientInput>, Enumerable<IncomeUncheckedCreateWithoutClientInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutClientInput>
    createMany?: IncomeCreateManyClientInputEnvelope
    connect?: Enumerable<IncomeWhereUniqueInput>
  }

  type ExpenseUncheckedCreateNestedManyWithoutProviderInput = {
    create?: XOR<Enumerable<ExpenseCreateWithoutProviderInput>, Enumerable<ExpenseUncheckedCreateWithoutProviderInput>>
    connectOrCreate?: Enumerable<ExpenseCreateOrConnectWithoutProviderInput>
    createMany?: ExpenseCreateManyProviderInputEnvelope
    connect?: Enumerable<ExpenseWhereUniqueInput>
  }

  type EnumTypeOfContactFieldUpdateOperationsInput = {
    set?: TypeOfContact
  }

  type UserUpdateOneRequiredWithoutContactsNestedInput = {
    create?: XOR<UserCreateWithoutContactsInput, UserUncheckedCreateWithoutContactsInput>
    connectOrCreate?: UserCreateOrConnectWithoutContactsInput
    upsert?: UserUpsertWithoutContactsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutContactsInput, UserUncheckedUpdateWithoutContactsInput>
  }

  type IncomeUpdateManyWithoutClientNestedInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutClientInput>, Enumerable<IncomeUncheckedCreateWithoutClientInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutClientInput>
    upsert?: Enumerable<IncomeUpsertWithWhereUniqueWithoutClientInput>
    createMany?: IncomeCreateManyClientInputEnvelope
    set?: Enumerable<IncomeWhereUniqueInput>
    disconnect?: Enumerable<IncomeWhereUniqueInput>
    delete?: Enumerable<IncomeWhereUniqueInput>
    connect?: Enumerable<IncomeWhereUniqueInput>
    update?: Enumerable<IncomeUpdateWithWhereUniqueWithoutClientInput>
    updateMany?: Enumerable<IncomeUpdateManyWithWhereWithoutClientInput>
    deleteMany?: Enumerable<IncomeScalarWhereInput>
  }

  type ExpenseUpdateManyWithoutProviderNestedInput = {
    create?: XOR<Enumerable<ExpenseCreateWithoutProviderInput>, Enumerable<ExpenseUncheckedCreateWithoutProviderInput>>
    connectOrCreate?: Enumerable<ExpenseCreateOrConnectWithoutProviderInput>
    upsert?: Enumerable<ExpenseUpsertWithWhereUniqueWithoutProviderInput>
    createMany?: ExpenseCreateManyProviderInputEnvelope
    set?: Enumerable<ExpenseWhereUniqueInput>
    disconnect?: Enumerable<ExpenseWhereUniqueInput>
    delete?: Enumerable<ExpenseWhereUniqueInput>
    connect?: Enumerable<ExpenseWhereUniqueInput>
    update?: Enumerable<ExpenseUpdateWithWhereUniqueWithoutProviderInput>
    updateMany?: Enumerable<ExpenseUpdateManyWithWhereWithoutProviderInput>
    deleteMany?: Enumerable<ExpenseScalarWhereInput>
  }

  type IncomeUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutClientInput>, Enumerable<IncomeUncheckedCreateWithoutClientInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutClientInput>
    upsert?: Enumerable<IncomeUpsertWithWhereUniqueWithoutClientInput>
    createMany?: IncomeCreateManyClientInputEnvelope
    set?: Enumerable<IncomeWhereUniqueInput>
    disconnect?: Enumerable<IncomeWhereUniqueInput>
    delete?: Enumerable<IncomeWhereUniqueInput>
    connect?: Enumerable<IncomeWhereUniqueInput>
    update?: Enumerable<IncomeUpdateWithWhereUniqueWithoutClientInput>
    updateMany?: Enumerable<IncomeUpdateManyWithWhereWithoutClientInput>
    deleteMany?: Enumerable<IncomeScalarWhereInput>
  }

  type ExpenseUncheckedUpdateManyWithoutProviderNestedInput = {
    create?: XOR<Enumerable<ExpenseCreateWithoutProviderInput>, Enumerable<ExpenseUncheckedCreateWithoutProviderInput>>
    connectOrCreate?: Enumerable<ExpenseCreateOrConnectWithoutProviderInput>
    upsert?: Enumerable<ExpenseUpsertWithWhereUniqueWithoutProviderInput>
    createMany?: ExpenseCreateManyProviderInputEnvelope
    set?: Enumerable<ExpenseWhereUniqueInput>
    disconnect?: Enumerable<ExpenseWhereUniqueInput>
    delete?: Enumerable<ExpenseWhereUniqueInput>
    connect?: Enumerable<ExpenseWhereUniqueInput>
    update?: Enumerable<ExpenseUpdateWithWhereUniqueWithoutProviderInput>
    updateMany?: Enumerable<ExpenseUpdateManyWithWhereWithoutProviderInput>
    deleteMany?: Enumerable<ExpenseScalarWhereInput>
  }

  type BudgetCreateNestedManyWithoutExpenseCategoryInput = {
    create?: XOR<Enumerable<BudgetCreateWithoutExpenseCategoryInput>, Enumerable<BudgetUncheckedCreateWithoutExpenseCategoryInput>>
    connectOrCreate?: Enumerable<BudgetCreateOrConnectWithoutExpenseCategoryInput>
    createMany?: BudgetCreateManyExpenseCategoryInputEnvelope
    connect?: Enumerable<BudgetWhereUniqueInput>
  }

  type ExpenseCreateNestedManyWithoutCategoryInput = {
    create?: XOR<Enumerable<ExpenseCreateWithoutCategoryInput>, Enumerable<ExpenseUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<ExpenseCreateOrConnectWithoutCategoryInput>
    createMany?: ExpenseCreateManyCategoryInputEnvelope
    connect?: Enumerable<ExpenseWhereUniqueInput>
  }

  type BudgetUncheckedCreateNestedManyWithoutExpenseCategoryInput = {
    create?: XOR<Enumerable<BudgetCreateWithoutExpenseCategoryInput>, Enumerable<BudgetUncheckedCreateWithoutExpenseCategoryInput>>
    connectOrCreate?: Enumerable<BudgetCreateOrConnectWithoutExpenseCategoryInput>
    createMany?: BudgetCreateManyExpenseCategoryInputEnvelope
    connect?: Enumerable<BudgetWhereUniqueInput>
  }

  type ExpenseUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<Enumerable<ExpenseCreateWithoutCategoryInput>, Enumerable<ExpenseUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<ExpenseCreateOrConnectWithoutCategoryInput>
    createMany?: ExpenseCreateManyCategoryInputEnvelope
    connect?: Enumerable<ExpenseWhereUniqueInput>
  }

  type BudgetUpdateManyWithoutExpenseCategoryNestedInput = {
    create?: XOR<Enumerable<BudgetCreateWithoutExpenseCategoryInput>, Enumerable<BudgetUncheckedCreateWithoutExpenseCategoryInput>>
    connectOrCreate?: Enumerable<BudgetCreateOrConnectWithoutExpenseCategoryInput>
    upsert?: Enumerable<BudgetUpsertWithWhereUniqueWithoutExpenseCategoryInput>
    createMany?: BudgetCreateManyExpenseCategoryInputEnvelope
    set?: Enumerable<BudgetWhereUniqueInput>
    disconnect?: Enumerable<BudgetWhereUniqueInput>
    delete?: Enumerable<BudgetWhereUniqueInput>
    connect?: Enumerable<BudgetWhereUniqueInput>
    update?: Enumerable<BudgetUpdateWithWhereUniqueWithoutExpenseCategoryInput>
    updateMany?: Enumerable<BudgetUpdateManyWithWhereWithoutExpenseCategoryInput>
    deleteMany?: Enumerable<BudgetScalarWhereInput>
  }

  type ExpenseUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<Enumerable<ExpenseCreateWithoutCategoryInput>, Enumerable<ExpenseUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<ExpenseCreateOrConnectWithoutCategoryInput>
    upsert?: Enumerable<ExpenseUpsertWithWhereUniqueWithoutCategoryInput>
    createMany?: ExpenseCreateManyCategoryInputEnvelope
    set?: Enumerable<ExpenseWhereUniqueInput>
    disconnect?: Enumerable<ExpenseWhereUniqueInput>
    delete?: Enumerable<ExpenseWhereUniqueInput>
    connect?: Enumerable<ExpenseWhereUniqueInput>
    update?: Enumerable<ExpenseUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<ExpenseUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<ExpenseScalarWhereInput>
  }

  type BudgetUncheckedUpdateManyWithoutExpenseCategoryNestedInput = {
    create?: XOR<Enumerable<BudgetCreateWithoutExpenseCategoryInput>, Enumerable<BudgetUncheckedCreateWithoutExpenseCategoryInput>>
    connectOrCreate?: Enumerable<BudgetCreateOrConnectWithoutExpenseCategoryInput>
    upsert?: Enumerable<BudgetUpsertWithWhereUniqueWithoutExpenseCategoryInput>
    createMany?: BudgetCreateManyExpenseCategoryInputEnvelope
    set?: Enumerable<BudgetWhereUniqueInput>
    disconnect?: Enumerable<BudgetWhereUniqueInput>
    delete?: Enumerable<BudgetWhereUniqueInput>
    connect?: Enumerable<BudgetWhereUniqueInput>
    update?: Enumerable<BudgetUpdateWithWhereUniqueWithoutExpenseCategoryInput>
    updateMany?: Enumerable<BudgetUpdateManyWithWhereWithoutExpenseCategoryInput>
    deleteMany?: Enumerable<BudgetScalarWhereInput>
  }

  type ExpenseUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<Enumerable<ExpenseCreateWithoutCategoryInput>, Enumerable<ExpenseUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<ExpenseCreateOrConnectWithoutCategoryInput>
    upsert?: Enumerable<ExpenseUpsertWithWhereUniqueWithoutCategoryInput>
    createMany?: ExpenseCreateManyCategoryInputEnvelope
    set?: Enumerable<ExpenseWhereUniqueInput>
    disconnect?: Enumerable<ExpenseWhereUniqueInput>
    delete?: Enumerable<ExpenseWhereUniqueInput>
    connect?: Enumerable<ExpenseWhereUniqueInput>
    update?: Enumerable<ExpenseUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<ExpenseUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<ExpenseScalarWhereInput>
  }

  type IncomeCreateNestedManyWithoutCategoryInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutCategoryInput>, Enumerable<IncomeUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutCategoryInput>
    createMany?: IncomeCreateManyCategoryInputEnvelope
    connect?: Enumerable<IncomeWhereUniqueInput>
  }

  type IncomeUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutCategoryInput>, Enumerable<IncomeUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutCategoryInput>
    createMany?: IncomeCreateManyCategoryInputEnvelope
    connect?: Enumerable<IncomeWhereUniqueInput>
  }

  type IncomeUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutCategoryInput>, Enumerable<IncomeUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutCategoryInput>
    upsert?: Enumerable<IncomeUpsertWithWhereUniqueWithoutCategoryInput>
    createMany?: IncomeCreateManyCategoryInputEnvelope
    set?: Enumerable<IncomeWhereUniqueInput>
    disconnect?: Enumerable<IncomeWhereUniqueInput>
    delete?: Enumerable<IncomeWhereUniqueInput>
    connect?: Enumerable<IncomeWhereUniqueInput>
    update?: Enumerable<IncomeUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<IncomeUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<IncomeScalarWhereInput>
  }

  type IncomeUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutCategoryInput>, Enumerable<IncomeUncheckedCreateWithoutCategoryInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutCategoryInput>
    upsert?: Enumerable<IncomeUpsertWithWhereUniqueWithoutCategoryInput>
    createMany?: IncomeCreateManyCategoryInputEnvelope
    set?: Enumerable<IncomeWhereUniqueInput>
    disconnect?: Enumerable<IncomeWhereUniqueInput>
    delete?: Enumerable<IncomeWhereUniqueInput>
    connect?: Enumerable<IncomeWhereUniqueInput>
    update?: Enumerable<IncomeUpdateWithWhereUniqueWithoutCategoryInput>
    updateMany?: Enumerable<IncomeUpdateManyWithWhereWithoutCategoryInput>
    deleteMany?: Enumerable<IncomeScalarWhereInput>
  }

  type ExpenseCategoryCreateNestedOneWithoutExpenseInput = {
    create?: XOR<ExpenseCategoryCreateWithoutExpenseInput, ExpenseCategoryUncheckedCreateWithoutExpenseInput>
    connectOrCreate?: ExpenseCategoryCreateOrConnectWithoutExpenseInput
    connect?: ExpenseCategoryWhereUniqueInput
  }

  type ContactCreateNestedOneWithoutExpenseInput = {
    create?: XOR<ContactCreateWithoutExpenseInput, ContactUncheckedCreateWithoutExpenseInput>
    connectOrCreate?: ContactCreateOrConnectWithoutExpenseInput
    connect?: ContactWhereUniqueInput
  }

  type UserCreateNestedOneWithoutExpensesInput = {
    create?: XOR<UserCreateWithoutExpensesInput, UserUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: UserCreateOrConnectWithoutExpensesInput
    connect?: UserWhereUniqueInput
  }

  type ExpenseDebtCreateNestedManyWithoutExpensesInput = {
    create?: XOR<Enumerable<ExpenseDebtCreateWithoutExpensesInput>, Enumerable<ExpenseDebtUncheckedCreateWithoutExpensesInput>>
    connectOrCreate?: Enumerable<ExpenseDebtCreateOrConnectWithoutExpensesInput>
    connect?: Enumerable<ExpenseDebtWhereUniqueInput>
  }

  type ExpenseCreateexpenseDebtIdsInput = {
    set: Enumerable<string>
  }

  type ExpenseDebtUncheckedCreateNestedManyWithoutExpensesInput = {
    create?: XOR<Enumerable<ExpenseDebtCreateWithoutExpensesInput>, Enumerable<ExpenseDebtUncheckedCreateWithoutExpensesInput>>
    connectOrCreate?: Enumerable<ExpenseDebtCreateOrConnectWithoutExpensesInput>
    connect?: Enumerable<ExpenseDebtWhereUniqueInput>
  }

  type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  type ExpenseCategoryUpdateOneRequiredWithoutExpenseNestedInput = {
    create?: XOR<ExpenseCategoryCreateWithoutExpenseInput, ExpenseCategoryUncheckedCreateWithoutExpenseInput>
    connectOrCreate?: ExpenseCategoryCreateOrConnectWithoutExpenseInput
    upsert?: ExpenseCategoryUpsertWithoutExpenseInput
    connect?: ExpenseCategoryWhereUniqueInput
    update?: XOR<ExpenseCategoryUpdateWithoutExpenseInput, ExpenseCategoryUncheckedUpdateWithoutExpenseInput>
  }

  type ContactUpdateOneWithoutExpenseNestedInput = {
    create?: XOR<ContactCreateWithoutExpenseInput, ContactUncheckedCreateWithoutExpenseInput>
    connectOrCreate?: ContactCreateOrConnectWithoutExpenseInput
    upsert?: ContactUpsertWithoutExpenseInput
    disconnect?: boolean
    delete?: boolean
    connect?: ContactWhereUniqueInput
    update?: XOR<ContactUpdateWithoutExpenseInput, ContactUncheckedUpdateWithoutExpenseInput>
  }

  type NullableEnumPaymentMethodFieldUpdateOperationsInput = {
    set?: PaymentMethod | null
    unset?: boolean
  }

  type UserUpdateOneRequiredWithoutExpensesNestedInput = {
    create?: XOR<UserCreateWithoutExpensesInput, UserUncheckedCreateWithoutExpensesInput>
    connectOrCreate?: UserCreateOrConnectWithoutExpensesInput
    upsert?: UserUpsertWithoutExpensesInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutExpensesInput, UserUncheckedUpdateWithoutExpensesInput>
  }

  type ExpenseDebtUpdateManyWithoutExpensesNestedInput = {
    create?: XOR<Enumerable<ExpenseDebtCreateWithoutExpensesInput>, Enumerable<ExpenseDebtUncheckedCreateWithoutExpensesInput>>
    connectOrCreate?: Enumerable<ExpenseDebtCreateOrConnectWithoutExpensesInput>
    upsert?: Enumerable<ExpenseDebtUpsertWithWhereUniqueWithoutExpensesInput>
    set?: Enumerable<ExpenseDebtWhereUniqueInput>
    disconnect?: Enumerable<ExpenseDebtWhereUniqueInput>
    delete?: Enumerable<ExpenseDebtWhereUniqueInput>
    connect?: Enumerable<ExpenseDebtWhereUniqueInput>
    update?: Enumerable<ExpenseDebtUpdateWithWhereUniqueWithoutExpensesInput>
    updateMany?: Enumerable<ExpenseDebtUpdateManyWithWhereWithoutExpensesInput>
    deleteMany?: Enumerable<ExpenseDebtScalarWhereInput>
  }

  type ExpenseUpdateexpenseDebtIdsInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  type ExpenseDebtUncheckedUpdateManyWithoutExpensesNestedInput = {
    create?: XOR<Enumerable<ExpenseDebtCreateWithoutExpensesInput>, Enumerable<ExpenseDebtUncheckedCreateWithoutExpensesInput>>
    connectOrCreate?: Enumerable<ExpenseDebtCreateOrConnectWithoutExpensesInput>
    upsert?: Enumerable<ExpenseDebtUpsertWithWhereUniqueWithoutExpensesInput>
    set?: Enumerable<ExpenseDebtWhereUniqueInput>
    disconnect?: Enumerable<ExpenseDebtWhereUniqueInput>
    delete?: Enumerable<ExpenseDebtWhereUniqueInput>
    connect?: Enumerable<ExpenseDebtWhereUniqueInput>
    update?: Enumerable<ExpenseDebtUpdateWithWhereUniqueWithoutExpensesInput>
    updateMany?: Enumerable<ExpenseDebtUpdateManyWithWhereWithoutExpensesInput>
    deleteMany?: Enumerable<ExpenseDebtScalarWhereInput>
  }

  type IncomeProductsCreateNestedManyWithoutIncomeInput = {
    create?: XOR<Enumerable<IncomeProductsCreateWithoutIncomeInput>, Enumerable<IncomeProductsUncheckedCreateWithoutIncomeInput>>
    connectOrCreate?: Enumerable<IncomeProductsCreateOrConnectWithoutIncomeInput>
    createMany?: IncomeProductsCreateManyIncomeInputEnvelope
    connect?: Enumerable<IncomeProductsWhereUniqueInput>
  }

  type IncomeCreateserviceIDsInput = {
    set: Enumerable<string>
  }

  type ServiceCreateNestedManyWithoutSalesInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutSalesInput>, Enumerable<ServiceUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutSalesInput>
    connect?: Enumerable<ServiceWhereUniqueInput>
  }

  type ContactCreateNestedOneWithoutSaleInput = {
    create?: XOR<ContactCreateWithoutSaleInput, ContactUncheckedCreateWithoutSaleInput>
    connectOrCreate?: ContactCreateOrConnectWithoutSaleInput
    connect?: ContactWhereUniqueInput
  }

  type IncomeCategoryCreateNestedOneWithoutIncomeInput = {
    create?: XOR<IncomeCategoryCreateWithoutIncomeInput, IncomeCategoryUncheckedCreateWithoutIncomeInput>
    connectOrCreate?: IncomeCategoryCreateOrConnectWithoutIncomeInput
    connect?: IncomeCategoryWhereUniqueInput
  }

  type UserCreateNestedOneWithoutIncomesInput = {
    create?: XOR<UserCreateWithoutIncomesInput, UserUncheckedCreateWithoutIncomesInput>
    connectOrCreate?: UserCreateOrConnectWithoutIncomesInput
    connect?: UserWhereUniqueInput
  }

  type IncomeDebtCreateNestedManyWithoutIncomesInput = {
    create?: XOR<Enumerable<IncomeDebtCreateWithoutIncomesInput>, Enumerable<IncomeDebtUncheckedCreateWithoutIncomesInput>>
    connectOrCreate?: Enumerable<IncomeDebtCreateOrConnectWithoutIncomesInput>
    connect?: Enumerable<IncomeDebtWhereUniqueInput>
  }

  type IncomeCreateincomeDebtIdsInput = {
    set: Enumerable<string>
  }

  type IncomeProductsUncheckedCreateNestedManyWithoutIncomeInput = {
    create?: XOR<Enumerable<IncomeProductsCreateWithoutIncomeInput>, Enumerable<IncomeProductsUncheckedCreateWithoutIncomeInput>>
    connectOrCreate?: Enumerable<IncomeProductsCreateOrConnectWithoutIncomeInput>
    createMany?: IncomeProductsCreateManyIncomeInputEnvelope
    connect?: Enumerable<IncomeProductsWhereUniqueInput>
  }

  type ServiceUncheckedCreateNestedManyWithoutSalesInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutSalesInput>, Enumerable<ServiceUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutSalesInput>
    connect?: Enumerable<ServiceWhereUniqueInput>
  }

  type IncomeDebtUncheckedCreateNestedManyWithoutIncomesInput = {
    create?: XOR<Enumerable<IncomeDebtCreateWithoutIncomesInput>, Enumerable<IncomeDebtUncheckedCreateWithoutIncomesInput>>
    connectOrCreate?: Enumerable<IncomeDebtCreateOrConnectWithoutIncomesInput>
    connect?: Enumerable<IncomeDebtWhereUniqueInput>
  }

  type IncomeProductsUpdateManyWithoutIncomeNestedInput = {
    create?: XOR<Enumerable<IncomeProductsCreateWithoutIncomeInput>, Enumerable<IncomeProductsUncheckedCreateWithoutIncomeInput>>
    connectOrCreate?: Enumerable<IncomeProductsCreateOrConnectWithoutIncomeInput>
    upsert?: Enumerable<IncomeProductsUpsertWithWhereUniqueWithoutIncomeInput>
    createMany?: IncomeProductsCreateManyIncomeInputEnvelope
    set?: Enumerable<IncomeProductsWhereUniqueInput>
    disconnect?: Enumerable<IncomeProductsWhereUniqueInput>
    delete?: Enumerable<IncomeProductsWhereUniqueInput>
    connect?: Enumerable<IncomeProductsWhereUniqueInput>
    update?: Enumerable<IncomeProductsUpdateWithWhereUniqueWithoutIncomeInput>
    updateMany?: Enumerable<IncomeProductsUpdateManyWithWhereWithoutIncomeInput>
    deleteMany?: Enumerable<IncomeProductsScalarWhereInput>
  }

  type IncomeUpdateserviceIDsInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  type ServiceUpdateManyWithoutSalesNestedInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutSalesInput>, Enumerable<ServiceUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutSalesInput>
    upsert?: Enumerable<ServiceUpsertWithWhereUniqueWithoutSalesInput>
    set?: Enumerable<ServiceWhereUniqueInput>
    disconnect?: Enumerable<ServiceWhereUniqueInput>
    delete?: Enumerable<ServiceWhereUniqueInput>
    connect?: Enumerable<ServiceWhereUniqueInput>
    update?: Enumerable<ServiceUpdateWithWhereUniqueWithoutSalesInput>
    updateMany?: Enumerable<ServiceUpdateManyWithWhereWithoutSalesInput>
    deleteMany?: Enumerable<ServiceScalarWhereInput>
  }

  type ContactUpdateOneWithoutSaleNestedInput = {
    create?: XOR<ContactCreateWithoutSaleInput, ContactUncheckedCreateWithoutSaleInput>
    connectOrCreate?: ContactCreateOrConnectWithoutSaleInput
    upsert?: ContactUpsertWithoutSaleInput
    disconnect?: boolean
    delete?: boolean
    connect?: ContactWhereUniqueInput
    update?: XOR<ContactUpdateWithoutSaleInput, ContactUncheckedUpdateWithoutSaleInput>
  }

  type IncomeCategoryUpdateOneRequiredWithoutIncomeNestedInput = {
    create?: XOR<IncomeCategoryCreateWithoutIncomeInput, IncomeCategoryUncheckedCreateWithoutIncomeInput>
    connectOrCreate?: IncomeCategoryCreateOrConnectWithoutIncomeInput
    upsert?: IncomeCategoryUpsertWithoutIncomeInput
    connect?: IncomeCategoryWhereUniqueInput
    update?: XOR<IncomeCategoryUpdateWithoutIncomeInput, IncomeCategoryUncheckedUpdateWithoutIncomeInput>
  }

  type UserUpdateOneRequiredWithoutIncomesNestedInput = {
    create?: XOR<UserCreateWithoutIncomesInput, UserUncheckedCreateWithoutIncomesInput>
    connectOrCreate?: UserCreateOrConnectWithoutIncomesInput
    upsert?: UserUpsertWithoutIncomesInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutIncomesInput, UserUncheckedUpdateWithoutIncomesInput>
  }

  type IncomeDebtUpdateManyWithoutIncomesNestedInput = {
    create?: XOR<Enumerable<IncomeDebtCreateWithoutIncomesInput>, Enumerable<IncomeDebtUncheckedCreateWithoutIncomesInput>>
    connectOrCreate?: Enumerable<IncomeDebtCreateOrConnectWithoutIncomesInput>
    upsert?: Enumerable<IncomeDebtUpsertWithWhereUniqueWithoutIncomesInput>
    set?: Enumerable<IncomeDebtWhereUniqueInput>
    disconnect?: Enumerable<IncomeDebtWhereUniqueInput>
    delete?: Enumerable<IncomeDebtWhereUniqueInput>
    connect?: Enumerable<IncomeDebtWhereUniqueInput>
    update?: Enumerable<IncomeDebtUpdateWithWhereUniqueWithoutIncomesInput>
    updateMany?: Enumerable<IncomeDebtUpdateManyWithWhereWithoutIncomesInput>
    deleteMany?: Enumerable<IncomeDebtScalarWhereInput>
  }

  type IncomeUpdateincomeDebtIdsInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  type IncomeProductsUncheckedUpdateManyWithoutIncomeNestedInput = {
    create?: XOR<Enumerable<IncomeProductsCreateWithoutIncomeInput>, Enumerable<IncomeProductsUncheckedCreateWithoutIncomeInput>>
    connectOrCreate?: Enumerable<IncomeProductsCreateOrConnectWithoutIncomeInput>
    upsert?: Enumerable<IncomeProductsUpsertWithWhereUniqueWithoutIncomeInput>
    createMany?: IncomeProductsCreateManyIncomeInputEnvelope
    set?: Enumerable<IncomeProductsWhereUniqueInput>
    disconnect?: Enumerable<IncomeProductsWhereUniqueInput>
    delete?: Enumerable<IncomeProductsWhereUniqueInput>
    connect?: Enumerable<IncomeProductsWhereUniqueInput>
    update?: Enumerable<IncomeProductsUpdateWithWhereUniqueWithoutIncomeInput>
    updateMany?: Enumerable<IncomeProductsUpdateManyWithWhereWithoutIncomeInput>
    deleteMany?: Enumerable<IncomeProductsScalarWhereInput>
  }

  type ServiceUncheckedUpdateManyWithoutSalesNestedInput = {
    create?: XOR<Enumerable<ServiceCreateWithoutSalesInput>, Enumerable<ServiceUncheckedCreateWithoutSalesInput>>
    connectOrCreate?: Enumerable<ServiceCreateOrConnectWithoutSalesInput>
    upsert?: Enumerable<ServiceUpsertWithWhereUniqueWithoutSalesInput>
    set?: Enumerable<ServiceWhereUniqueInput>
    disconnect?: Enumerable<ServiceWhereUniqueInput>
    delete?: Enumerable<ServiceWhereUniqueInput>
    connect?: Enumerable<ServiceWhereUniqueInput>
    update?: Enumerable<ServiceUpdateWithWhereUniqueWithoutSalesInput>
    updateMany?: Enumerable<ServiceUpdateManyWithWhereWithoutSalesInput>
    deleteMany?: Enumerable<ServiceScalarWhereInput>
  }

  type IncomeDebtUncheckedUpdateManyWithoutIncomesNestedInput = {
    create?: XOR<Enumerable<IncomeDebtCreateWithoutIncomesInput>, Enumerable<IncomeDebtUncheckedCreateWithoutIncomesInput>>
    connectOrCreate?: Enumerable<IncomeDebtCreateOrConnectWithoutIncomesInput>
    upsert?: Enumerable<IncomeDebtUpsertWithWhereUniqueWithoutIncomesInput>
    set?: Enumerable<IncomeDebtWhereUniqueInput>
    disconnect?: Enumerable<IncomeDebtWhereUniqueInput>
    delete?: Enumerable<IncomeDebtWhereUniqueInput>
    connect?: Enumerable<IncomeDebtWhereUniqueInput>
    update?: Enumerable<IncomeDebtUpdateWithWhereUniqueWithoutIncomesInput>
    updateMany?: Enumerable<IncomeDebtUpdateManyWithWhereWithoutIncomesInput>
    deleteMany?: Enumerable<IncomeDebtScalarWhereInput>
  }

  type UserCreateNestedOneWithoutIncomeDebtInput = {
    create?: XOR<UserCreateWithoutIncomeDebtInput, UserUncheckedCreateWithoutIncomeDebtInput>
    connectOrCreate?: UserCreateOrConnectWithoutIncomeDebtInput
    connect?: UserWhereUniqueInput
  }

  type IncomeDebtCreateincomeIDsInput = {
    set: Enumerable<string>
  }

  type IncomeCreateNestedManyWithoutIncomeDebtsInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutIncomeDebtsInput>, Enumerable<IncomeUncheckedCreateWithoutIncomeDebtsInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutIncomeDebtsInput>
    connect?: Enumerable<IncomeWhereUniqueInput>
  }

  type DebtPaymentCreateNestedManyWithoutIncomeDebtInput = {
    create?: XOR<Enumerable<DebtPaymentCreateWithoutIncomeDebtInput>, Enumerable<DebtPaymentUncheckedCreateWithoutIncomeDebtInput>>
    connectOrCreate?: Enumerable<DebtPaymentCreateOrConnectWithoutIncomeDebtInput>
    createMany?: DebtPaymentCreateManyIncomeDebtInputEnvelope
    connect?: Enumerable<DebtPaymentWhereUniqueInput>
  }

  type IncomeUncheckedCreateNestedManyWithoutIncomeDebtsInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutIncomeDebtsInput>, Enumerable<IncomeUncheckedCreateWithoutIncomeDebtsInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutIncomeDebtsInput>
    connect?: Enumerable<IncomeWhereUniqueInput>
  }

  type DebtPaymentUncheckedCreateNestedManyWithoutIncomeDebtInput = {
    create?: XOR<Enumerable<DebtPaymentCreateWithoutIncomeDebtInput>, Enumerable<DebtPaymentUncheckedCreateWithoutIncomeDebtInput>>
    connectOrCreate?: Enumerable<DebtPaymentCreateOrConnectWithoutIncomeDebtInput>
    createMany?: DebtPaymentCreateManyIncomeDebtInputEnvelope
    connect?: Enumerable<DebtPaymentWhereUniqueInput>
  }

  type UserUpdateOneRequiredWithoutIncomeDebtNestedInput = {
    create?: XOR<UserCreateWithoutIncomeDebtInput, UserUncheckedCreateWithoutIncomeDebtInput>
    connectOrCreate?: UserCreateOrConnectWithoutIncomeDebtInput
    upsert?: UserUpsertWithoutIncomeDebtInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutIncomeDebtInput, UserUncheckedUpdateWithoutIncomeDebtInput>
  }

  type IncomeDebtUpdateincomeIDsInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  type IncomeUpdateManyWithoutIncomeDebtsNestedInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutIncomeDebtsInput>, Enumerable<IncomeUncheckedCreateWithoutIncomeDebtsInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutIncomeDebtsInput>
    upsert?: Enumerable<IncomeUpsertWithWhereUniqueWithoutIncomeDebtsInput>
    set?: Enumerable<IncomeWhereUniqueInput>
    disconnect?: Enumerable<IncomeWhereUniqueInput>
    delete?: Enumerable<IncomeWhereUniqueInput>
    connect?: Enumerable<IncomeWhereUniqueInput>
    update?: Enumerable<IncomeUpdateWithWhereUniqueWithoutIncomeDebtsInput>
    updateMany?: Enumerable<IncomeUpdateManyWithWhereWithoutIncomeDebtsInput>
    deleteMany?: Enumerable<IncomeScalarWhereInput>
  }

  type DebtPaymentUpdateManyWithoutIncomeDebtNestedInput = {
    create?: XOR<Enumerable<DebtPaymentCreateWithoutIncomeDebtInput>, Enumerable<DebtPaymentUncheckedCreateWithoutIncomeDebtInput>>
    connectOrCreate?: Enumerable<DebtPaymentCreateOrConnectWithoutIncomeDebtInput>
    upsert?: Enumerable<DebtPaymentUpsertWithWhereUniqueWithoutIncomeDebtInput>
    createMany?: DebtPaymentCreateManyIncomeDebtInputEnvelope
    set?: Enumerable<DebtPaymentWhereUniqueInput>
    disconnect?: Enumerable<DebtPaymentWhereUniqueInput>
    delete?: Enumerable<DebtPaymentWhereUniqueInput>
    connect?: Enumerable<DebtPaymentWhereUniqueInput>
    update?: Enumerable<DebtPaymentUpdateWithWhereUniqueWithoutIncomeDebtInput>
    updateMany?: Enumerable<DebtPaymentUpdateManyWithWhereWithoutIncomeDebtInput>
    deleteMany?: Enumerable<DebtPaymentScalarWhereInput>
  }

  type IncomeUncheckedUpdateManyWithoutIncomeDebtsNestedInput = {
    create?: XOR<Enumerable<IncomeCreateWithoutIncomeDebtsInput>, Enumerable<IncomeUncheckedCreateWithoutIncomeDebtsInput>>
    connectOrCreate?: Enumerable<IncomeCreateOrConnectWithoutIncomeDebtsInput>
    upsert?: Enumerable<IncomeUpsertWithWhereUniqueWithoutIncomeDebtsInput>
    set?: Enumerable<IncomeWhereUniqueInput>
    disconnect?: Enumerable<IncomeWhereUniqueInput>
    delete?: Enumerable<IncomeWhereUniqueInput>
    connect?: Enumerable<IncomeWhereUniqueInput>
    update?: Enumerable<IncomeUpdateWithWhereUniqueWithoutIncomeDebtsInput>
    updateMany?: Enumerable<IncomeUpdateManyWithWhereWithoutIncomeDebtsInput>
    deleteMany?: Enumerable<IncomeScalarWhereInput>
  }

  type DebtPaymentUncheckedUpdateManyWithoutIncomeDebtNestedInput = {
    create?: XOR<Enumerable<DebtPaymentCreateWithoutIncomeDebtInput>, Enumerable<DebtPaymentUncheckedCreateWithoutIncomeDebtInput>>
    connectOrCreate?: Enumerable<DebtPaymentCreateOrConnectWithoutIncomeDebtInput>
    upsert?: Enumerable<DebtPaymentUpsertWithWhereUniqueWithoutIncomeDebtInput>
    createMany?: DebtPaymentCreateManyIncomeDebtInputEnvelope
    set?: Enumerable<DebtPaymentWhereUniqueInput>
    disconnect?: Enumerable<DebtPaymentWhereUniqueInput>
    delete?: Enumerable<DebtPaymentWhereUniqueInput>
    connect?: Enumerable<DebtPaymentWhereUniqueInput>
    update?: Enumerable<DebtPaymentUpdateWithWhereUniqueWithoutIncomeDebtInput>
    updateMany?: Enumerable<DebtPaymentUpdateManyWithWhereWithoutIncomeDebtInput>
    deleteMany?: Enumerable<DebtPaymentScalarWhereInput>
  }

  type UserCreateNestedOneWithoutExpenseDebtInput = {
    create?: XOR<UserCreateWithoutExpenseDebtInput, UserUncheckedCreateWithoutExpenseDebtInput>
    connectOrCreate?: UserCreateOrConnectWithoutExpenseDebtInput
    connect?: UserWhereUniqueInput
  }

  type ExpenseDebtCreateexpenseIDsInput = {
    set: Enumerable<string>
  }

  type ExpenseCreateNestedManyWithoutExpenseDebtsInput = {
    create?: XOR<Enumerable<ExpenseCreateWithoutExpenseDebtsInput>, Enumerable<ExpenseUncheckedCreateWithoutExpenseDebtsInput>>
    connectOrCreate?: Enumerable<ExpenseCreateOrConnectWithoutExpenseDebtsInput>
    connect?: Enumerable<ExpenseWhereUniqueInput>
  }

  type DebtPaymentCreateNestedManyWithoutExpenseDebtInput = {
    create?: XOR<Enumerable<DebtPaymentCreateWithoutExpenseDebtInput>, Enumerable<DebtPaymentUncheckedCreateWithoutExpenseDebtInput>>
    connectOrCreate?: Enumerable<DebtPaymentCreateOrConnectWithoutExpenseDebtInput>
    createMany?: DebtPaymentCreateManyExpenseDebtInputEnvelope
    connect?: Enumerable<DebtPaymentWhereUniqueInput>
  }

  type ExpenseUncheckedCreateNestedManyWithoutExpenseDebtsInput = {
    create?: XOR<Enumerable<ExpenseCreateWithoutExpenseDebtsInput>, Enumerable<ExpenseUncheckedCreateWithoutExpenseDebtsInput>>
    connectOrCreate?: Enumerable<ExpenseCreateOrConnectWithoutExpenseDebtsInput>
    connect?: Enumerable<ExpenseWhereUniqueInput>
  }

  type DebtPaymentUncheckedCreateNestedManyWithoutExpenseDebtInput = {
    create?: XOR<Enumerable<DebtPaymentCreateWithoutExpenseDebtInput>, Enumerable<DebtPaymentUncheckedCreateWithoutExpenseDebtInput>>
    connectOrCreate?: Enumerable<DebtPaymentCreateOrConnectWithoutExpenseDebtInput>
    createMany?: DebtPaymentCreateManyExpenseDebtInputEnvelope
    connect?: Enumerable<DebtPaymentWhereUniqueInput>
  }

  type UserUpdateOneRequiredWithoutExpenseDebtNestedInput = {
    create?: XOR<UserCreateWithoutExpenseDebtInput, UserUncheckedCreateWithoutExpenseDebtInput>
    connectOrCreate?: UserCreateOrConnectWithoutExpenseDebtInput
    upsert?: UserUpsertWithoutExpenseDebtInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutExpenseDebtInput, UserUncheckedUpdateWithoutExpenseDebtInput>
  }

  type ExpenseDebtUpdateexpenseIDsInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  type ExpenseUpdateManyWithoutExpenseDebtsNestedInput = {
    create?: XOR<Enumerable<ExpenseCreateWithoutExpenseDebtsInput>, Enumerable<ExpenseUncheckedCreateWithoutExpenseDebtsInput>>
    connectOrCreate?: Enumerable<ExpenseCreateOrConnectWithoutExpenseDebtsInput>
    upsert?: Enumerable<ExpenseUpsertWithWhereUniqueWithoutExpenseDebtsInput>
    set?: Enumerable<ExpenseWhereUniqueInput>
    disconnect?: Enumerable<ExpenseWhereUniqueInput>
    delete?: Enumerable<ExpenseWhereUniqueInput>
    connect?: Enumerable<ExpenseWhereUniqueInput>
    update?: Enumerable<ExpenseUpdateWithWhereUniqueWithoutExpenseDebtsInput>
    updateMany?: Enumerable<ExpenseUpdateManyWithWhereWithoutExpenseDebtsInput>
    deleteMany?: Enumerable<ExpenseScalarWhereInput>
  }

  type DebtPaymentUpdateManyWithoutExpenseDebtNestedInput = {
    create?: XOR<Enumerable<DebtPaymentCreateWithoutExpenseDebtInput>, Enumerable<DebtPaymentUncheckedCreateWithoutExpenseDebtInput>>
    connectOrCreate?: Enumerable<DebtPaymentCreateOrConnectWithoutExpenseDebtInput>
    upsert?: Enumerable<DebtPaymentUpsertWithWhereUniqueWithoutExpenseDebtInput>
    createMany?: DebtPaymentCreateManyExpenseDebtInputEnvelope
    set?: Enumerable<DebtPaymentWhereUniqueInput>
    disconnect?: Enumerable<DebtPaymentWhereUniqueInput>
    delete?: Enumerable<DebtPaymentWhereUniqueInput>
    connect?: Enumerable<DebtPaymentWhereUniqueInput>
    update?: Enumerable<DebtPaymentUpdateWithWhereUniqueWithoutExpenseDebtInput>
    updateMany?: Enumerable<DebtPaymentUpdateManyWithWhereWithoutExpenseDebtInput>
    deleteMany?: Enumerable<DebtPaymentScalarWhereInput>
  }

  type ExpenseUncheckedUpdateManyWithoutExpenseDebtsNestedInput = {
    create?: XOR<Enumerable<ExpenseCreateWithoutExpenseDebtsInput>, Enumerable<ExpenseUncheckedCreateWithoutExpenseDebtsInput>>
    connectOrCreate?: Enumerable<ExpenseCreateOrConnectWithoutExpenseDebtsInput>
    upsert?: Enumerable<ExpenseUpsertWithWhereUniqueWithoutExpenseDebtsInput>
    set?: Enumerable<ExpenseWhereUniqueInput>
    disconnect?: Enumerable<ExpenseWhereUniqueInput>
    delete?: Enumerable<ExpenseWhereUniqueInput>
    connect?: Enumerable<ExpenseWhereUniqueInput>
    update?: Enumerable<ExpenseUpdateWithWhereUniqueWithoutExpenseDebtsInput>
    updateMany?: Enumerable<ExpenseUpdateManyWithWhereWithoutExpenseDebtsInput>
    deleteMany?: Enumerable<ExpenseScalarWhereInput>
  }

  type DebtPaymentUncheckedUpdateManyWithoutExpenseDebtNestedInput = {
    create?: XOR<Enumerable<DebtPaymentCreateWithoutExpenseDebtInput>, Enumerable<DebtPaymentUncheckedCreateWithoutExpenseDebtInput>>
    connectOrCreate?: Enumerable<DebtPaymentCreateOrConnectWithoutExpenseDebtInput>
    upsert?: Enumerable<DebtPaymentUpsertWithWhereUniqueWithoutExpenseDebtInput>
    createMany?: DebtPaymentCreateManyExpenseDebtInputEnvelope
    set?: Enumerable<DebtPaymentWhereUniqueInput>
    disconnect?: Enumerable<DebtPaymentWhereUniqueInput>
    delete?: Enumerable<DebtPaymentWhereUniqueInput>
    connect?: Enumerable<DebtPaymentWhereUniqueInput>
    update?: Enumerable<DebtPaymentUpdateWithWhereUniqueWithoutExpenseDebtInput>
    updateMany?: Enumerable<DebtPaymentUpdateManyWithWhereWithoutExpenseDebtInput>
    deleteMany?: Enumerable<DebtPaymentScalarWhereInput>
  }

  type IncomeCreateNestedOneWithoutIncomeProductsInput = {
    create?: XOR<IncomeCreateWithoutIncomeProductsInput, IncomeUncheckedCreateWithoutIncomeProductsInput>
    connectOrCreate?: IncomeCreateOrConnectWithoutIncomeProductsInput
    connect?: IncomeWhereUniqueInput
  }

  type ProductCreateNestedOneWithoutIncomeProductsInput = {
    create?: XOR<ProductCreateWithoutIncomeProductsInput, ProductUncheckedCreateWithoutIncomeProductsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutIncomeProductsInput
    connect?: ProductWhereUniqueInput
  }

  type IncomeUpdateOneRequiredWithoutIncomeProductsNestedInput = {
    create?: XOR<IncomeCreateWithoutIncomeProductsInput, IncomeUncheckedCreateWithoutIncomeProductsInput>
    connectOrCreate?: IncomeCreateOrConnectWithoutIncomeProductsInput
    upsert?: IncomeUpsertWithoutIncomeProductsInput
    connect?: IncomeWhereUniqueInput
    update?: XOR<IncomeUpdateWithoutIncomeProductsInput, IncomeUncheckedUpdateWithoutIncomeProductsInput>
  }

  type ProductUpdateOneRequiredWithoutIncomeProductsNestedInput = {
    create?: XOR<ProductCreateWithoutIncomeProductsInput, ProductUncheckedCreateWithoutIncomeProductsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutIncomeProductsInput
    upsert?: ProductUpsertWithoutIncomeProductsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<ProductUpdateWithoutIncomeProductsInput, ProductUncheckedUpdateWithoutIncomeProductsInput>
  }

  type IncomeDebtCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<IncomeDebtCreateWithoutPaymentsInput, IncomeDebtUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: IncomeDebtCreateOrConnectWithoutPaymentsInput
    connect?: IncomeDebtWhereUniqueInput
  }

  type ExpenseDebtCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<ExpenseDebtCreateWithoutPaymentsInput, ExpenseDebtUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: ExpenseDebtCreateOrConnectWithoutPaymentsInput
    connect?: ExpenseDebtWhereUniqueInput
  }

  type EnumPaymentMethodFieldUpdateOperationsInput = {
    set?: PaymentMethod
  }

  type IncomeDebtUpdateOneWithoutPaymentsNestedInput = {
    create?: XOR<IncomeDebtCreateWithoutPaymentsInput, IncomeDebtUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: IncomeDebtCreateOrConnectWithoutPaymentsInput
    upsert?: IncomeDebtUpsertWithoutPaymentsInput
    disconnect?: boolean
    delete?: boolean
    connect?: IncomeDebtWhereUniqueInput
    update?: XOR<IncomeDebtUpdateWithoutPaymentsInput, IncomeDebtUncheckedUpdateWithoutPaymentsInput>
  }

  type ExpenseDebtUpdateOneWithoutPaymentsNestedInput = {
    create?: XOR<ExpenseDebtCreateWithoutPaymentsInput, ExpenseDebtUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: ExpenseDebtCreateOrConnectWithoutPaymentsInput
    upsert?: ExpenseDebtUpsertWithoutPaymentsInput
    disconnect?: boolean
    delete?: boolean
    connect?: ExpenseDebtWhereUniqueInput
    update?: XOR<ExpenseDebtUpdateWithoutPaymentsInput, ExpenseDebtUncheckedUpdateWithoutPaymentsInput>
  }

  type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  type NestedEnumBusinessTypeNullableFilter = {
    equals?: BusinessType | null
    in?: Enumerable<BusinessType> | null
    notIn?: Enumerable<BusinessType> | null
    not?: NestedEnumBusinessTypeNullableFilter | BusinessType | null
    isSet?: boolean
  }

  type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  type NestedEnumBusinessTypeNullableWithAggregatesFilter = {
    equals?: BusinessType | null
    in?: Enumerable<BusinessType> | null
    notIn?: Enumerable<BusinessType> | null
    not?: NestedEnumBusinessTypeNullableWithAggregatesFilter | BusinessType | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumBusinessTypeNullableFilter
    _max?: NestedEnumBusinessTypeNullableFilter
    isSet?: boolean
  }

  type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
    isSet?: boolean
  }

  type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
    isSet?: boolean
  }

  type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
    isSet?: boolean
  }

  type NestedEnumBusinessTypeFilter = {
    equals?: BusinessType
    in?: Enumerable<BusinessType>
    notIn?: Enumerable<BusinessType>
    not?: NestedEnumBusinessTypeFilter | BusinessType
  }

  type NestedEnumBusinessTypeWithAggregatesFilter = {
    equals?: BusinessType
    in?: Enumerable<BusinessType>
    notIn?: Enumerable<BusinessType>
    not?: NestedEnumBusinessTypeWithAggregatesFilter | BusinessType
    _count?: NestedIntFilter
    _min?: NestedEnumBusinessTypeFilter
    _max?: NestedEnumBusinessTypeFilter
  }

  type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  type NestedFloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
    isSet?: boolean
  }

  type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
    isSet?: boolean
  }

  type NestedFloatNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedFloatNullableFilter
    _min?: NestedFloatNullableFilter
    _max?: NestedFloatNullableFilter
    isSet?: boolean
  }

  type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
    isSet?: boolean
  }

  type NestedEnumTypeOfContactFilter = {
    equals?: TypeOfContact
    in?: Enumerable<TypeOfContact>
    notIn?: Enumerable<TypeOfContact>
    not?: NestedEnumTypeOfContactFilter | TypeOfContact
  }

  type NestedEnumTypeOfContactWithAggregatesFilter = {
    equals?: TypeOfContact
    in?: Enumerable<TypeOfContact>
    notIn?: Enumerable<TypeOfContact>
    not?: NestedEnumTypeOfContactWithAggregatesFilter | TypeOfContact
    _count?: NestedIntFilter
    _min?: NestedEnumTypeOfContactFilter
    _max?: NestedEnumTypeOfContactFilter
  }

  type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  type NestedEnumPaymentMethodNullableFilter = {
    equals?: PaymentMethod | null
    in?: Enumerable<PaymentMethod> | null
    notIn?: Enumerable<PaymentMethod> | null
    not?: NestedEnumPaymentMethodNullableFilter | PaymentMethod | null
    isSet?: boolean
  }

  type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  type NestedEnumPaymentMethodNullableWithAggregatesFilter = {
    equals?: PaymentMethod | null
    in?: Enumerable<PaymentMethod> | null
    notIn?: Enumerable<PaymentMethod> | null
    not?: NestedEnumPaymentMethodNullableWithAggregatesFilter | PaymentMethod | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumPaymentMethodNullableFilter
    _max?: NestedEnumPaymentMethodNullableFilter
    isSet?: boolean
  }

  type NestedEnumPaymentMethodFilter = {
    equals?: PaymentMethod
    in?: Enumerable<PaymentMethod>
    notIn?: Enumerable<PaymentMethod>
    not?: NestedEnumPaymentMethodFilter | PaymentMethod
  }

  type NestedEnumPaymentMethodWithAggregatesFilter = {
    equals?: PaymentMethod
    in?: Enumerable<PaymentMethod>
    notIn?: Enumerable<PaymentMethod>
    not?: NestedEnumPaymentMethodWithAggregatesFilter | PaymentMethod
    _count?: NestedIntFilter
    _min?: NestedEnumPaymentMethodFilter
    _max?: NestedEnumPaymentMethodFilter
  }

  type UserAccountCreateWithoutUserInput = {
    id?: string
    name: string
    cellPhone: string
    image?: string | null
    address?: string | null
  }

  type UserAccountUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    cellPhone: string
    image?: string | null
    address?: string | null
  }

  type UserAccountCreateOrConnectWithoutUserInput = {
    where: UserAccountWhereUniqueInput
    create: XOR<UserAccountCreateWithoutUserInput, UserAccountUncheckedCreateWithoutUserInput>
  }

  type BudgetCreateWithoutUserInput = {
    id?: string
    ExpenseCategory: ExpenseCategoryCreateNestedOneWithoutBudgetInput
    startingDate: Date | string
    endingDate: Date | string
    total: number
  }

  type BudgetUncheckedCreateWithoutUserInput = {
    id?: string
    ExpenseCategoryId: string
    startingDate: Date | string
    endingDate: Date | string
    total: number
  }

  type BudgetCreateOrConnectWithoutUserInput = {
    where: BudgetWhereUniqueInput
    create: XOR<BudgetCreateWithoutUserInput, BudgetUncheckedCreateWithoutUserInput>
  }

  type BudgetCreateManyUserInputEnvelope = {
    data: Enumerable<BudgetCreateManyUserInput>
  }

  type ProductCreateWithoutOwnerInput = {
    id?: string
    name: string
    retailPrice: number
    cost?: number | null
    unit?: string | null
    quantity?: number | null
    image?: string | null
    stock: number
    description?: string | null
    createdAt?: Date | string
    category?: ProductCategoryCreateNestedOneWithoutProductInput
    deletedAt?: Date | string | null
    IncomeProducts?: IncomeProductsCreateNestedManyWithoutProductInput
  }

  type ProductUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    retailPrice: number
    cost?: number | null
    unit?: string | null
    quantity?: number | null
    image?: string | null
    stock: number
    description?: string | null
    createdAt?: Date | string
    categoryId?: string | null
    deletedAt?: Date | string | null
    IncomeProducts?: IncomeProductsUncheckedCreateNestedManyWithoutProductInput
  }

  type ProductCreateOrConnectWithoutOwnerInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutOwnerInput, ProductUncheckedCreateWithoutOwnerInput>
  }

  type ProductCreateManyOwnerInputEnvelope = {
    data: Enumerable<ProductCreateManyOwnerInput>
  }

  type ProductCategoryCreateWithoutUserInput = {
    id?: string
    name: string
    Product?: ProductCreateNestedManyWithoutCategoryInput
    Service?: ServiceCreateNestedManyWithoutCategoryInput
  }

  type ProductCategoryUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    Product?: ProductUncheckedCreateNestedManyWithoutCategoryInput
    Service?: ServiceUncheckedCreateNestedManyWithoutCategoryInput
  }

  type ProductCategoryCreateOrConnectWithoutUserInput = {
    where: ProductCategoryWhereUniqueInput
    create: XOR<ProductCategoryCreateWithoutUserInput, ProductCategoryUncheckedCreateWithoutUserInput>
  }

  type ProductCategoryCreateManyUserInputEnvelope = {
    data: Enumerable<ProductCategoryCreateManyUserInput>
  }

  type ContactCreateWithoutOwnerInput = {
    id?: string
    name: string
    phone: string
    typeOfContact: TypeOfContact
    email: string
    comments: string
    deletedAt?: Date | string | null
    Sale?: IncomeCreateNestedManyWithoutClientInput
    Expense?: ExpenseCreateNestedManyWithoutProviderInput
  }

  type ContactUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    phone: string
    typeOfContact: TypeOfContact
    email: string
    comments: string
    deletedAt?: Date | string | null
    Sale?: IncomeUncheckedCreateNestedManyWithoutClientInput
    Expense?: ExpenseUncheckedCreateNestedManyWithoutProviderInput
  }

  type ContactCreateOrConnectWithoutOwnerInput = {
    where: ContactWhereUniqueInput
    create: XOR<ContactCreateWithoutOwnerInput, ContactUncheckedCreateWithoutOwnerInput>
  }

  type ContactCreateManyOwnerInputEnvelope = {
    data: Enumerable<ContactCreateManyOwnerInput>
  }

  type IncomeCreateWithoutOwnerInput = {
    id?: string
    value: number
    name?: string | null
    date: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    IncomeProducts?: IncomeProductsCreateNestedManyWithoutIncomeInput
    serviceIDs?: IncomeCreateserviceIDsInput | Enumerable<string>
    services?: ServiceCreateNestedManyWithoutSalesInput
    client?: ContactCreateNestedOneWithoutSaleInput
    category: IncomeCategoryCreateNestedOneWithoutIncomeInput
    isPaid: boolean
    paymentMethod?: PaymentMethod | null
    IncomeDebts?: IncomeDebtCreateNestedManyWithoutIncomesInput
    incomeDebtIds?: IncomeCreateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeUncheckedCreateWithoutOwnerInput = {
    id?: string
    value: number
    name?: string | null
    date: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    IncomeProducts?: IncomeProductsUncheckedCreateNestedManyWithoutIncomeInput
    serviceIDs?: IncomeCreateserviceIDsInput | Enumerable<string>
    services?: ServiceUncheckedCreateNestedManyWithoutSalesInput
    clientId?: string | null
    categoryId: string
    isPaid: boolean
    paymentMethod?: PaymentMethod | null
    IncomeDebts?: IncomeDebtUncheckedCreateNestedManyWithoutIncomesInput
    incomeDebtIds?: IncomeCreateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeCreateOrConnectWithoutOwnerInput = {
    where: IncomeWhereUniqueInput
    create: XOR<IncomeCreateWithoutOwnerInput, IncomeUncheckedCreateWithoutOwnerInput>
  }

  type IncomeCreateManyOwnerInputEnvelope = {
    data: Enumerable<IncomeCreateManyOwnerInput>
  }

  type ExpenseCreateWithoutOwnerInput = {
    id?: string
    createdAt?: Date | string
    value: number
    name: string
    date: string
    isPaid: boolean
    deletedAt?: Date | string | null
    category: ExpenseCategoryCreateNestedOneWithoutExpenseInput
    provider?: ContactCreateNestedOneWithoutExpenseInput
    paymentMethod?: PaymentMethod | null
    ExpenseDebts?: ExpenseDebtCreateNestedManyWithoutExpensesInput
    expenseDebtIds?: ExpenseCreateexpenseDebtIdsInput | Enumerable<string>
  }

  type ExpenseUncheckedCreateWithoutOwnerInput = {
    id?: string
    createdAt?: Date | string
    value: number
    name: string
    date: string
    isPaid: boolean
    deletedAt?: Date | string | null
    categoryId: string
    providerId?: string | null
    paymentMethod?: PaymentMethod | null
    ExpenseDebts?: ExpenseDebtUncheckedCreateNestedManyWithoutExpensesInput
    expenseDebtIds?: ExpenseCreateexpenseDebtIdsInput | Enumerable<string>
  }

  type ExpenseCreateOrConnectWithoutOwnerInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutOwnerInput, ExpenseUncheckedCreateWithoutOwnerInput>
  }

  type ExpenseCreateManyOwnerInputEnvelope = {
    data: Enumerable<ExpenseCreateManyOwnerInput>
  }

  type ServiceCreateWithoutOwnerInput = {
    id?: string
    name: string
    image?: string | null
    description?: string | null
    retailPrice: number
    createdAt?: Date | string
    category?: ProductCategoryCreateNestedOneWithoutServiceInput
    saleIDs?: ServiceCreatesaleIDsInput | Enumerable<string>
    sales?: IncomeCreateNestedManyWithoutServicesInput
  }

  type ServiceUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    image?: string | null
    description?: string | null
    retailPrice: number
    createdAt?: Date | string
    categoryId?: string | null
    saleIDs?: ServiceCreatesaleIDsInput | Enumerable<string>
    sales?: IncomeUncheckedCreateNestedManyWithoutServicesInput
  }

  type ServiceCreateOrConnectWithoutOwnerInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutOwnerInput, ServiceUncheckedCreateWithoutOwnerInput>
  }

  type ServiceCreateManyOwnerInputEnvelope = {
    data: Enumerable<ServiceCreateManyOwnerInput>
  }

  type ExpenseDebtCreateWithoutOwnerInput = {
    id?: string
    initialDate?: Date | string
    expenseIDs?: ExpenseDebtCreateexpenseIDsInput | Enumerable<string>
    expenses?: ExpenseCreateNestedManyWithoutExpenseDebtsInput
    payments?: DebtPaymentCreateNestedManyWithoutExpenseDebtInput
  }

  type ExpenseDebtUncheckedCreateWithoutOwnerInput = {
    id?: string
    initialDate?: Date | string
    expenseIDs?: ExpenseDebtCreateexpenseIDsInput | Enumerable<string>
    expenses?: ExpenseUncheckedCreateNestedManyWithoutExpenseDebtsInput
    payments?: DebtPaymentUncheckedCreateNestedManyWithoutExpenseDebtInput
  }

  type ExpenseDebtCreateOrConnectWithoutOwnerInput = {
    where: ExpenseDebtWhereUniqueInput
    create: XOR<ExpenseDebtCreateWithoutOwnerInput, ExpenseDebtUncheckedCreateWithoutOwnerInput>
  }

  type ExpenseDebtCreateManyOwnerInputEnvelope = {
    data: Enumerable<ExpenseDebtCreateManyOwnerInput>
  }

  type IncomeDebtCreateWithoutOwnerInput = {
    id?: string
    initialDate?: Date | string
    incomeIDs?: IncomeDebtCreateincomeIDsInput | Enumerable<string>
    incomes?: IncomeCreateNestedManyWithoutIncomeDebtsInput
    payments?: DebtPaymentCreateNestedManyWithoutIncomeDebtInput
  }

  type IncomeDebtUncheckedCreateWithoutOwnerInput = {
    id?: string
    initialDate?: Date | string
    incomeIDs?: IncomeDebtCreateincomeIDsInput | Enumerable<string>
    incomes?: IncomeUncheckedCreateNestedManyWithoutIncomeDebtsInput
    payments?: DebtPaymentUncheckedCreateNestedManyWithoutIncomeDebtInput
  }

  type IncomeDebtCreateOrConnectWithoutOwnerInput = {
    where: IncomeDebtWhereUniqueInput
    create: XOR<IncomeDebtCreateWithoutOwnerInput, IncomeDebtUncheckedCreateWithoutOwnerInput>
  }

  type IncomeDebtCreateManyOwnerInputEnvelope = {
    data: Enumerable<IncomeDebtCreateManyOwnerInput>
  }

  type UserAccountUpsertWithoutUserInput = {
    update: XOR<UserAccountUpdateWithoutUserInput, UserAccountUncheckedUpdateWithoutUserInput>
    create: XOR<UserAccountCreateWithoutUserInput, UserAccountUncheckedCreateWithoutUserInput>
  }

  type UserAccountUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    cellPhone?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
  }

  type UserAccountUncheckedUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    cellPhone?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
  }

  type BudgetUpsertWithWhereUniqueWithoutUserInput = {
    where: BudgetWhereUniqueInput
    update: XOR<BudgetUpdateWithoutUserInput, BudgetUncheckedUpdateWithoutUserInput>
    create: XOR<BudgetCreateWithoutUserInput, BudgetUncheckedCreateWithoutUserInput>
  }

  type BudgetUpdateWithWhereUniqueWithoutUserInput = {
    where: BudgetWhereUniqueInput
    data: XOR<BudgetUpdateWithoutUserInput, BudgetUncheckedUpdateWithoutUserInput>
  }

  type BudgetUpdateManyWithWhereWithoutUserInput = {
    where: BudgetScalarWhereInput
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyWithoutBudgetsInput>
  }

  type BudgetScalarWhereInput = {
    AND?: Enumerable<BudgetScalarWhereInput>
    OR?: Enumerable<BudgetScalarWhereInput>
    NOT?: Enumerable<BudgetScalarWhereInput>
    id?: StringFilter | string
    ExpenseCategoryId?: StringFilter | string
    startingDate?: DateTimeFilter | Date | string
    endingDate?: DateTimeFilter | Date | string
    total?: FloatFilter | number
    userId?: StringFilter | string
  }

  type ProductUpsertWithWhereUniqueWithoutOwnerInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutOwnerInput, ProductUncheckedUpdateWithoutOwnerInput>
    create: XOR<ProductCreateWithoutOwnerInput, ProductUncheckedCreateWithoutOwnerInput>
  }

  type ProductUpdateWithWhereUniqueWithoutOwnerInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutOwnerInput, ProductUncheckedUpdateWithoutOwnerInput>
  }

  type ProductUpdateManyWithWhereWithoutOwnerInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutProductsInput>
  }

  type ProductScalarWhereInput = {
    AND?: Enumerable<ProductScalarWhereInput>
    OR?: Enumerable<ProductScalarWhereInput>
    NOT?: Enumerable<ProductScalarWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    retailPrice?: FloatFilter | number
    cost?: FloatNullableFilter | number | null
    unit?: StringNullableFilter | string | null
    quantity?: FloatNullableFilter | number | null
    image?: StringNullableFilter | string | null
    stock?: IntFilter | number
    description?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    categoryId?: StringNullableFilter | string | null
    ownerId?: StringFilter | string
    deletedAt?: DateTimeNullableFilter | Date | string | null
  }

  type ProductCategoryUpsertWithWhereUniqueWithoutUserInput = {
    where: ProductCategoryWhereUniqueInput
    update: XOR<ProductCategoryUpdateWithoutUserInput, ProductCategoryUncheckedUpdateWithoutUserInput>
    create: XOR<ProductCategoryCreateWithoutUserInput, ProductCategoryUncheckedCreateWithoutUserInput>
  }

  type ProductCategoryUpdateWithWhereUniqueWithoutUserInput = {
    where: ProductCategoryWhereUniqueInput
    data: XOR<ProductCategoryUpdateWithoutUserInput, ProductCategoryUncheckedUpdateWithoutUserInput>
  }

  type ProductCategoryUpdateManyWithWhereWithoutUserInput = {
    where: ProductCategoryScalarWhereInput
    data: XOR<ProductCategoryUpdateManyMutationInput, ProductCategoryUncheckedUpdateManyWithoutCategoriesInput>
  }

  type ProductCategoryScalarWhereInput = {
    AND?: Enumerable<ProductCategoryScalarWhereInput>
    OR?: Enumerable<ProductCategoryScalarWhereInput>
    NOT?: Enumerable<ProductCategoryScalarWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    userId?: StringFilter | string
  }

  type ContactUpsertWithWhereUniqueWithoutOwnerInput = {
    where: ContactWhereUniqueInput
    update: XOR<ContactUpdateWithoutOwnerInput, ContactUncheckedUpdateWithoutOwnerInput>
    create: XOR<ContactCreateWithoutOwnerInput, ContactUncheckedCreateWithoutOwnerInput>
  }

  type ContactUpdateWithWhereUniqueWithoutOwnerInput = {
    where: ContactWhereUniqueInput
    data: XOR<ContactUpdateWithoutOwnerInput, ContactUncheckedUpdateWithoutOwnerInput>
  }

  type ContactUpdateManyWithWhereWithoutOwnerInput = {
    where: ContactScalarWhereInput
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyWithoutContactsInput>
  }

  type ContactScalarWhereInput = {
    AND?: Enumerable<ContactScalarWhereInput>
    OR?: Enumerable<ContactScalarWhereInput>
    NOT?: Enumerable<ContactScalarWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    phone?: StringFilter | string
    typeOfContact?: EnumTypeOfContactFilter | TypeOfContact
    email?: StringFilter | string
    comments?: StringFilter | string
    deletedAt?: DateTimeNullableFilter | Date | string | null
    ownerId?: StringFilter | string
  }

  type IncomeUpsertWithWhereUniqueWithoutOwnerInput = {
    where: IncomeWhereUniqueInput
    update: XOR<IncomeUpdateWithoutOwnerInput, IncomeUncheckedUpdateWithoutOwnerInput>
    create: XOR<IncomeCreateWithoutOwnerInput, IncomeUncheckedCreateWithoutOwnerInput>
  }

  type IncomeUpdateWithWhereUniqueWithoutOwnerInput = {
    where: IncomeWhereUniqueInput
    data: XOR<IncomeUpdateWithoutOwnerInput, IncomeUncheckedUpdateWithoutOwnerInput>
  }

  type IncomeUpdateManyWithWhereWithoutOwnerInput = {
    where: IncomeScalarWhereInput
    data: XOR<IncomeUpdateManyMutationInput, IncomeUncheckedUpdateManyWithoutIncomesInput>
  }

  type IncomeScalarWhereInput = {
    AND?: Enumerable<IncomeScalarWhereInput>
    OR?: Enumerable<IncomeScalarWhereInput>
    NOT?: Enumerable<IncomeScalarWhereInput>
    id?: StringFilter | string
    value?: FloatFilter | number
    name?: StringNullableFilter | string | null
    date?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    deletedAt?: DateTimeNullableFilter | Date | string | null
    serviceIDs?: StringNullableListFilter
    clientId?: StringNullableFilter | string | null
    categoryId?: StringFilter | string
    isPaid?: BoolFilter | boolean
    paymentMethod?: EnumPaymentMethodNullableFilter | PaymentMethod | null
    ownerId?: StringFilter | string
    incomeDebtIds?: StringNullableListFilter
  }

  type ExpenseUpsertWithWhereUniqueWithoutOwnerInput = {
    where: ExpenseWhereUniqueInput
    update: XOR<ExpenseUpdateWithoutOwnerInput, ExpenseUncheckedUpdateWithoutOwnerInput>
    create: XOR<ExpenseCreateWithoutOwnerInput, ExpenseUncheckedCreateWithoutOwnerInput>
  }

  type ExpenseUpdateWithWhereUniqueWithoutOwnerInput = {
    where: ExpenseWhereUniqueInput
    data: XOR<ExpenseUpdateWithoutOwnerInput, ExpenseUncheckedUpdateWithoutOwnerInput>
  }

  type ExpenseUpdateManyWithWhereWithoutOwnerInput = {
    where: ExpenseScalarWhereInput
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyWithoutExpensesInput>
  }

  type ExpenseScalarWhereInput = {
    AND?: Enumerable<ExpenseScalarWhereInput>
    OR?: Enumerable<ExpenseScalarWhereInput>
    NOT?: Enumerable<ExpenseScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    value?: FloatFilter | number
    name?: StringFilter | string
    date?: StringFilter | string
    isPaid?: BoolFilter | boolean
    deletedAt?: DateTimeNullableFilter | Date | string | null
    categoryId?: StringFilter | string
    providerId?: StringNullableFilter | string | null
    paymentMethod?: EnumPaymentMethodNullableFilter | PaymentMethod | null
    ownerId?: StringFilter | string
    expenseDebtIds?: StringNullableListFilter
  }

  type ServiceUpsertWithWhereUniqueWithoutOwnerInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutOwnerInput, ServiceUncheckedUpdateWithoutOwnerInput>
    create: XOR<ServiceCreateWithoutOwnerInput, ServiceUncheckedCreateWithoutOwnerInput>
  }

  type ServiceUpdateWithWhereUniqueWithoutOwnerInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutOwnerInput, ServiceUncheckedUpdateWithoutOwnerInput>
  }

  type ServiceUpdateManyWithWhereWithoutOwnerInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutServicesInput>
  }

  type ServiceScalarWhereInput = {
    AND?: Enumerable<ServiceScalarWhereInput>
    OR?: Enumerable<ServiceScalarWhereInput>
    NOT?: Enumerable<ServiceScalarWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    image?: StringNullableFilter | string | null
    description?: StringNullableFilter | string | null
    retailPrice?: FloatFilter | number
    createdAt?: DateTimeFilter | Date | string
    categoryId?: StringNullableFilter | string | null
    ownerId?: StringFilter | string
    saleIDs?: StringNullableListFilter
  }

  type ExpenseDebtUpsertWithWhereUniqueWithoutOwnerInput = {
    where: ExpenseDebtWhereUniqueInput
    update: XOR<ExpenseDebtUpdateWithoutOwnerInput, ExpenseDebtUncheckedUpdateWithoutOwnerInput>
    create: XOR<ExpenseDebtCreateWithoutOwnerInput, ExpenseDebtUncheckedCreateWithoutOwnerInput>
  }

  type ExpenseDebtUpdateWithWhereUniqueWithoutOwnerInput = {
    where: ExpenseDebtWhereUniqueInput
    data: XOR<ExpenseDebtUpdateWithoutOwnerInput, ExpenseDebtUncheckedUpdateWithoutOwnerInput>
  }

  type ExpenseDebtUpdateManyWithWhereWithoutOwnerInput = {
    where: ExpenseDebtScalarWhereInput
    data: XOR<ExpenseDebtUpdateManyMutationInput, ExpenseDebtUncheckedUpdateManyWithoutExpenseDebtInput>
  }

  type ExpenseDebtScalarWhereInput = {
    AND?: Enumerable<ExpenseDebtScalarWhereInput>
    OR?: Enumerable<ExpenseDebtScalarWhereInput>
    NOT?: Enumerable<ExpenseDebtScalarWhereInput>
    id?: StringFilter | string
    initialDate?: DateTimeFilter | Date | string
    ownerId?: StringFilter | string
    expenseIDs?: StringNullableListFilter
  }

  type IncomeDebtUpsertWithWhereUniqueWithoutOwnerInput = {
    where: IncomeDebtWhereUniqueInput
    update: XOR<IncomeDebtUpdateWithoutOwnerInput, IncomeDebtUncheckedUpdateWithoutOwnerInput>
    create: XOR<IncomeDebtCreateWithoutOwnerInput, IncomeDebtUncheckedCreateWithoutOwnerInput>
  }

  type IncomeDebtUpdateWithWhereUniqueWithoutOwnerInput = {
    where: IncomeDebtWhereUniqueInput
    data: XOR<IncomeDebtUpdateWithoutOwnerInput, IncomeDebtUncheckedUpdateWithoutOwnerInput>
  }

  type IncomeDebtUpdateManyWithWhereWithoutOwnerInput = {
    where: IncomeDebtScalarWhereInput
    data: XOR<IncomeDebtUpdateManyMutationInput, IncomeDebtUncheckedUpdateManyWithoutIncomeDebtInput>
  }

  type IncomeDebtScalarWhereInput = {
    AND?: Enumerable<IncomeDebtScalarWhereInput>
    OR?: Enumerable<IncomeDebtScalarWhereInput>
    NOT?: Enumerable<IncomeDebtScalarWhereInput>
    id?: StringFilter | string
    initialDate?: DateTimeFilter | Date | string
    ownerId?: StringFilter | string
    incomeIDs?: StringNullableListFilter
  }

  type UserCreateWithoutAccountInput = {
    id?: string
    email: string
    password: string
    Business?: BusinessType | null
    Budgets?: BudgetCreateNestedManyWithoutUserInput
    Products?: ProductCreateNestedManyWithoutOwnerInput
    Categories?: ProductCategoryCreateNestedManyWithoutUserInput
    Contacts?: ContactCreateNestedManyWithoutOwnerInput
    Incomes?: IncomeCreateNestedManyWithoutOwnerInput
    Expenses?: ExpenseCreateNestedManyWithoutOwnerInput
    Services?: ServiceCreateNestedManyWithoutOwnerInput
    ExpenseDebt?: ExpenseDebtCreateNestedManyWithoutOwnerInput
    IncomeDebt?: IncomeDebtCreateNestedManyWithoutOwnerInput
  }

  type UserUncheckedCreateWithoutAccountInput = {
    id?: string
    email: string
    password: string
    Business?: BusinessType | null
    Budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    Products?: ProductUncheckedCreateNestedManyWithoutOwnerInput
    Categories?: ProductCategoryUncheckedCreateNestedManyWithoutUserInput
    Contacts?: ContactUncheckedCreateNestedManyWithoutOwnerInput
    Incomes?: IncomeUncheckedCreateNestedManyWithoutOwnerInput
    Expenses?: ExpenseUncheckedCreateNestedManyWithoutOwnerInput
    Services?: ServiceUncheckedCreateNestedManyWithoutOwnerInput
    ExpenseDebt?: ExpenseDebtUncheckedCreateNestedManyWithoutOwnerInput
    IncomeDebt?: IncomeDebtUncheckedCreateNestedManyWithoutOwnerInput
  }

  type UserCreateOrConnectWithoutAccountInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountInput, UserUncheckedCreateWithoutAccountInput>
  }

  type UserUpsertWithoutAccountInput = {
    update: XOR<UserUpdateWithoutAccountInput, UserUncheckedUpdateWithoutAccountInput>
    create: XOR<UserCreateWithoutAccountInput, UserUncheckedCreateWithoutAccountInput>
  }

  type UserUpdateWithoutAccountInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
    Budgets?: BudgetUpdateManyWithoutUserNestedInput
    Products?: ProductUpdateManyWithoutOwnerNestedInput
    Categories?: ProductCategoryUpdateManyWithoutUserNestedInput
    Contacts?: ContactUpdateManyWithoutOwnerNestedInput
    Incomes?: IncomeUpdateManyWithoutOwnerNestedInput
    Expenses?: ExpenseUpdateManyWithoutOwnerNestedInput
    Services?: ServiceUpdateManyWithoutOwnerNestedInput
    ExpenseDebt?: ExpenseDebtUpdateManyWithoutOwnerNestedInput
    IncomeDebt?: IncomeDebtUpdateManyWithoutOwnerNestedInput
  }

  type UserUncheckedUpdateWithoutAccountInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
    Budgets?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    Products?: ProductUncheckedUpdateManyWithoutOwnerNestedInput
    Categories?: ProductCategoryUncheckedUpdateManyWithoutUserNestedInput
    Contacts?: ContactUncheckedUpdateManyWithoutOwnerNestedInput
    Incomes?: IncomeUncheckedUpdateManyWithoutOwnerNestedInput
    Expenses?: ExpenseUncheckedUpdateManyWithoutOwnerNestedInput
    Services?: ServiceUncheckedUpdateManyWithoutOwnerNestedInput
    ExpenseDebt?: ExpenseDebtUncheckedUpdateManyWithoutOwnerNestedInput
    IncomeDebt?: IncomeDebtUncheckedUpdateManyWithoutOwnerNestedInput
  }

  type ExpenseCategoryCreateWithoutBudgetInput = {
    id?: string
    name: string
    imageUrl: string
    Expense?: ExpenseCreateNestedManyWithoutCategoryInput
  }

  type ExpenseCategoryUncheckedCreateWithoutBudgetInput = {
    id?: string
    name: string
    imageUrl: string
    Expense?: ExpenseUncheckedCreateNestedManyWithoutCategoryInput
  }

  type ExpenseCategoryCreateOrConnectWithoutBudgetInput = {
    where: ExpenseCategoryWhereUniqueInput
    create: XOR<ExpenseCategoryCreateWithoutBudgetInput, ExpenseCategoryUncheckedCreateWithoutBudgetInput>
  }

  type UserCreateWithoutBudgetsInput = {
    id?: string
    email: string
    password: string
    Account?: UserAccountCreateNestedOneWithoutUserInput
    Business?: BusinessType | null
    Products?: ProductCreateNestedManyWithoutOwnerInput
    Categories?: ProductCategoryCreateNestedManyWithoutUserInput
    Contacts?: ContactCreateNestedManyWithoutOwnerInput
    Incomes?: IncomeCreateNestedManyWithoutOwnerInput
    Expenses?: ExpenseCreateNestedManyWithoutOwnerInput
    Services?: ServiceCreateNestedManyWithoutOwnerInput
    ExpenseDebt?: ExpenseDebtCreateNestedManyWithoutOwnerInput
    IncomeDebt?: IncomeDebtCreateNestedManyWithoutOwnerInput
  }

  type UserUncheckedCreateWithoutBudgetsInput = {
    id?: string
    email: string
    password: string
    Account?: UserAccountUncheckedCreateNestedOneWithoutUserInput
    Business?: BusinessType | null
    Products?: ProductUncheckedCreateNestedManyWithoutOwnerInput
    Categories?: ProductCategoryUncheckedCreateNestedManyWithoutUserInput
    Contacts?: ContactUncheckedCreateNestedManyWithoutOwnerInput
    Incomes?: IncomeUncheckedCreateNestedManyWithoutOwnerInput
    Expenses?: ExpenseUncheckedCreateNestedManyWithoutOwnerInput
    Services?: ServiceUncheckedCreateNestedManyWithoutOwnerInput
    ExpenseDebt?: ExpenseDebtUncheckedCreateNestedManyWithoutOwnerInput
    IncomeDebt?: IncomeDebtUncheckedCreateNestedManyWithoutOwnerInput
  }

  type UserCreateOrConnectWithoutBudgetsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBudgetsInput, UserUncheckedCreateWithoutBudgetsInput>
  }

  type ExpenseCategoryUpsertWithoutBudgetInput = {
    update: XOR<ExpenseCategoryUpdateWithoutBudgetInput, ExpenseCategoryUncheckedUpdateWithoutBudgetInput>
    create: XOR<ExpenseCategoryCreateWithoutBudgetInput, ExpenseCategoryUncheckedCreateWithoutBudgetInput>
  }

  type ExpenseCategoryUpdateWithoutBudgetInput = {
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    Expense?: ExpenseUpdateManyWithoutCategoryNestedInput
  }

  type ExpenseCategoryUncheckedUpdateWithoutBudgetInput = {
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    Expense?: ExpenseUncheckedUpdateManyWithoutCategoryNestedInput
  }

  type UserUpsertWithoutBudgetsInput = {
    update: XOR<UserUpdateWithoutBudgetsInput, UserUncheckedUpdateWithoutBudgetsInput>
    create: XOR<UserCreateWithoutBudgetsInput, UserUncheckedCreateWithoutBudgetsInput>
  }

  type UserUpdateWithoutBudgetsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Account?: UserAccountUpdateOneWithoutUserNestedInput
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
    Products?: ProductUpdateManyWithoutOwnerNestedInput
    Categories?: ProductCategoryUpdateManyWithoutUserNestedInput
    Contacts?: ContactUpdateManyWithoutOwnerNestedInput
    Incomes?: IncomeUpdateManyWithoutOwnerNestedInput
    Expenses?: ExpenseUpdateManyWithoutOwnerNestedInput
    Services?: ServiceUpdateManyWithoutOwnerNestedInput
    ExpenseDebt?: ExpenseDebtUpdateManyWithoutOwnerNestedInput
    IncomeDebt?: IncomeDebtUpdateManyWithoutOwnerNestedInput
  }

  type UserUncheckedUpdateWithoutBudgetsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Account?: UserAccountUncheckedUpdateOneWithoutUserNestedInput
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
    Products?: ProductUncheckedUpdateManyWithoutOwnerNestedInput
    Categories?: ProductCategoryUncheckedUpdateManyWithoutUserNestedInput
    Contacts?: ContactUncheckedUpdateManyWithoutOwnerNestedInput
    Incomes?: IncomeUncheckedUpdateManyWithoutOwnerNestedInput
    Expenses?: ExpenseUncheckedUpdateManyWithoutOwnerNestedInput
    Services?: ServiceUncheckedUpdateManyWithoutOwnerNestedInput
    ExpenseDebt?: ExpenseDebtUncheckedUpdateManyWithoutOwnerNestedInput
    IncomeDebt?: IncomeDebtUncheckedUpdateManyWithoutOwnerNestedInput
  }

  type ProductCategoryCreateWithoutProductInput = {
    id?: string
    name: string
    user: UserCreateNestedOneWithoutCategoriesInput
    Service?: ServiceCreateNestedManyWithoutCategoryInput
  }

  type ProductCategoryUncheckedCreateWithoutProductInput = {
    id?: string
    name: string
    userId: string
    Service?: ServiceUncheckedCreateNestedManyWithoutCategoryInput
  }

  type ProductCategoryCreateOrConnectWithoutProductInput = {
    where: ProductCategoryWhereUniqueInput
    create: XOR<ProductCategoryCreateWithoutProductInput, ProductCategoryUncheckedCreateWithoutProductInput>
  }

  type UserCreateWithoutProductsInput = {
    id?: string
    email: string
    password: string
    Account?: UserAccountCreateNestedOneWithoutUserInput
    Business?: BusinessType | null
    Budgets?: BudgetCreateNestedManyWithoutUserInput
    Categories?: ProductCategoryCreateNestedManyWithoutUserInput
    Contacts?: ContactCreateNestedManyWithoutOwnerInput
    Incomes?: IncomeCreateNestedManyWithoutOwnerInput
    Expenses?: ExpenseCreateNestedManyWithoutOwnerInput
    Services?: ServiceCreateNestedManyWithoutOwnerInput
    ExpenseDebt?: ExpenseDebtCreateNestedManyWithoutOwnerInput
    IncomeDebt?: IncomeDebtCreateNestedManyWithoutOwnerInput
  }

  type UserUncheckedCreateWithoutProductsInput = {
    id?: string
    email: string
    password: string
    Account?: UserAccountUncheckedCreateNestedOneWithoutUserInput
    Business?: BusinessType | null
    Budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    Categories?: ProductCategoryUncheckedCreateNestedManyWithoutUserInput
    Contacts?: ContactUncheckedCreateNestedManyWithoutOwnerInput
    Incomes?: IncomeUncheckedCreateNestedManyWithoutOwnerInput
    Expenses?: ExpenseUncheckedCreateNestedManyWithoutOwnerInput
    Services?: ServiceUncheckedCreateNestedManyWithoutOwnerInput
    ExpenseDebt?: ExpenseDebtUncheckedCreateNestedManyWithoutOwnerInput
    IncomeDebt?: IncomeDebtUncheckedCreateNestedManyWithoutOwnerInput
  }

  type UserCreateOrConnectWithoutProductsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProductsInput, UserUncheckedCreateWithoutProductsInput>
  }

  type IncomeProductsCreateWithoutProductInput = {
    id?: string
    quantity: number
    price: number
    income: IncomeCreateNestedOneWithoutIncomeProductsInput
  }

  type IncomeProductsUncheckedCreateWithoutProductInput = {
    id?: string
    quantity: number
    price: number
    incomeId: string
  }

  type IncomeProductsCreateOrConnectWithoutProductInput = {
    where: IncomeProductsWhereUniqueInput
    create: XOR<IncomeProductsCreateWithoutProductInput, IncomeProductsUncheckedCreateWithoutProductInput>
  }

  type IncomeProductsCreateManyProductInputEnvelope = {
    data: Enumerable<IncomeProductsCreateManyProductInput>
  }

  type ProductCategoryUpsertWithoutProductInput = {
    update: XOR<ProductCategoryUpdateWithoutProductInput, ProductCategoryUncheckedUpdateWithoutProductInput>
    create: XOR<ProductCategoryCreateWithoutProductInput, ProductCategoryUncheckedCreateWithoutProductInput>
  }

  type ProductCategoryUpdateWithoutProductInput = {
    name?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutCategoriesNestedInput
    Service?: ServiceUpdateManyWithoutCategoryNestedInput
  }

  type ProductCategoryUncheckedUpdateWithoutProductInput = {
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    Service?: ServiceUncheckedUpdateManyWithoutCategoryNestedInput
  }

  type UserUpsertWithoutProductsInput = {
    update: XOR<UserUpdateWithoutProductsInput, UserUncheckedUpdateWithoutProductsInput>
    create: XOR<UserCreateWithoutProductsInput, UserUncheckedCreateWithoutProductsInput>
  }

  type UserUpdateWithoutProductsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Account?: UserAccountUpdateOneWithoutUserNestedInput
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
    Budgets?: BudgetUpdateManyWithoutUserNestedInput
    Categories?: ProductCategoryUpdateManyWithoutUserNestedInput
    Contacts?: ContactUpdateManyWithoutOwnerNestedInput
    Incomes?: IncomeUpdateManyWithoutOwnerNestedInput
    Expenses?: ExpenseUpdateManyWithoutOwnerNestedInput
    Services?: ServiceUpdateManyWithoutOwnerNestedInput
    ExpenseDebt?: ExpenseDebtUpdateManyWithoutOwnerNestedInput
    IncomeDebt?: IncomeDebtUpdateManyWithoutOwnerNestedInput
  }

  type UserUncheckedUpdateWithoutProductsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Account?: UserAccountUncheckedUpdateOneWithoutUserNestedInput
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
    Budgets?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    Categories?: ProductCategoryUncheckedUpdateManyWithoutUserNestedInput
    Contacts?: ContactUncheckedUpdateManyWithoutOwnerNestedInput
    Incomes?: IncomeUncheckedUpdateManyWithoutOwnerNestedInput
    Expenses?: ExpenseUncheckedUpdateManyWithoutOwnerNestedInput
    Services?: ServiceUncheckedUpdateManyWithoutOwnerNestedInput
    ExpenseDebt?: ExpenseDebtUncheckedUpdateManyWithoutOwnerNestedInput
    IncomeDebt?: IncomeDebtUncheckedUpdateManyWithoutOwnerNestedInput
  }

  type IncomeProductsUpsertWithWhereUniqueWithoutProductInput = {
    where: IncomeProductsWhereUniqueInput
    update: XOR<IncomeProductsUpdateWithoutProductInput, IncomeProductsUncheckedUpdateWithoutProductInput>
    create: XOR<IncomeProductsCreateWithoutProductInput, IncomeProductsUncheckedCreateWithoutProductInput>
  }

  type IncomeProductsUpdateWithWhereUniqueWithoutProductInput = {
    where: IncomeProductsWhereUniqueInput
    data: XOR<IncomeProductsUpdateWithoutProductInput, IncomeProductsUncheckedUpdateWithoutProductInput>
  }

  type IncomeProductsUpdateManyWithWhereWithoutProductInput = {
    where: IncomeProductsScalarWhereInput
    data: XOR<IncomeProductsUpdateManyMutationInput, IncomeProductsUncheckedUpdateManyWithoutIncomeProductsInput>
  }

  type IncomeProductsScalarWhereInput = {
    AND?: Enumerable<IncomeProductsScalarWhereInput>
    OR?: Enumerable<IncomeProductsScalarWhereInput>
    NOT?: Enumerable<IncomeProductsScalarWhereInput>
    id?: StringFilter | string
    quantity?: FloatFilter | number
    price?: FloatFilter | number
    incomeId?: StringFilter | string
    productId?: StringFilter | string
  }

  type ProductCategoryCreateWithoutServiceInput = {
    id?: string
    name: string
    user: UserCreateNestedOneWithoutCategoriesInput
    Product?: ProductCreateNestedManyWithoutCategoryInput
  }

  type ProductCategoryUncheckedCreateWithoutServiceInput = {
    id?: string
    name: string
    userId: string
    Product?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  type ProductCategoryCreateOrConnectWithoutServiceInput = {
    where: ProductCategoryWhereUniqueInput
    create: XOR<ProductCategoryCreateWithoutServiceInput, ProductCategoryUncheckedCreateWithoutServiceInput>
  }

  type UserCreateWithoutServicesInput = {
    id?: string
    email: string
    password: string
    Account?: UserAccountCreateNestedOneWithoutUserInput
    Business?: BusinessType | null
    Budgets?: BudgetCreateNestedManyWithoutUserInput
    Products?: ProductCreateNestedManyWithoutOwnerInput
    Categories?: ProductCategoryCreateNestedManyWithoutUserInput
    Contacts?: ContactCreateNestedManyWithoutOwnerInput
    Incomes?: IncomeCreateNestedManyWithoutOwnerInput
    Expenses?: ExpenseCreateNestedManyWithoutOwnerInput
    ExpenseDebt?: ExpenseDebtCreateNestedManyWithoutOwnerInput
    IncomeDebt?: IncomeDebtCreateNestedManyWithoutOwnerInput
  }

  type UserUncheckedCreateWithoutServicesInput = {
    id?: string
    email: string
    password: string
    Account?: UserAccountUncheckedCreateNestedOneWithoutUserInput
    Business?: BusinessType | null
    Budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    Products?: ProductUncheckedCreateNestedManyWithoutOwnerInput
    Categories?: ProductCategoryUncheckedCreateNestedManyWithoutUserInput
    Contacts?: ContactUncheckedCreateNestedManyWithoutOwnerInput
    Incomes?: IncomeUncheckedCreateNestedManyWithoutOwnerInput
    Expenses?: ExpenseUncheckedCreateNestedManyWithoutOwnerInput
    ExpenseDebt?: ExpenseDebtUncheckedCreateNestedManyWithoutOwnerInput
    IncomeDebt?: IncomeDebtUncheckedCreateNestedManyWithoutOwnerInput
  }

  type UserCreateOrConnectWithoutServicesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutServicesInput, UserUncheckedCreateWithoutServicesInput>
  }

  type IncomeCreateWithoutServicesInput = {
    id?: string
    value: number
    name?: string | null
    date: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    IncomeProducts?: IncomeProductsCreateNestedManyWithoutIncomeInput
    serviceIDs?: IncomeCreateserviceIDsInput | Enumerable<string>
    client?: ContactCreateNestedOneWithoutSaleInput
    category: IncomeCategoryCreateNestedOneWithoutIncomeInput
    isPaid: boolean
    paymentMethod?: PaymentMethod | null
    Owner: UserCreateNestedOneWithoutIncomesInput
    IncomeDebts?: IncomeDebtCreateNestedManyWithoutIncomesInput
    incomeDebtIds?: IncomeCreateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeUncheckedCreateWithoutServicesInput = {
    id?: string
    value: number
    name?: string | null
    date: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    IncomeProducts?: IncomeProductsUncheckedCreateNestedManyWithoutIncomeInput
    serviceIDs?: IncomeCreateserviceIDsInput | Enumerable<string>
    clientId?: string | null
    categoryId: string
    isPaid: boolean
    paymentMethod?: PaymentMethod | null
    ownerId: string
    IncomeDebts?: IncomeDebtUncheckedCreateNestedManyWithoutIncomesInput
    incomeDebtIds?: IncomeCreateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeCreateOrConnectWithoutServicesInput = {
    where: IncomeWhereUniqueInput
    create: XOR<IncomeCreateWithoutServicesInput, IncomeUncheckedCreateWithoutServicesInput>
  }

  type ProductCategoryUpsertWithoutServiceInput = {
    update: XOR<ProductCategoryUpdateWithoutServiceInput, ProductCategoryUncheckedUpdateWithoutServiceInput>
    create: XOR<ProductCategoryCreateWithoutServiceInput, ProductCategoryUncheckedCreateWithoutServiceInput>
  }

  type ProductCategoryUpdateWithoutServiceInput = {
    name?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutCategoriesNestedInput
    Product?: ProductUpdateManyWithoutCategoryNestedInput
  }

  type ProductCategoryUncheckedUpdateWithoutServiceInput = {
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    Product?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  type UserUpsertWithoutServicesInput = {
    update: XOR<UserUpdateWithoutServicesInput, UserUncheckedUpdateWithoutServicesInput>
    create: XOR<UserCreateWithoutServicesInput, UserUncheckedCreateWithoutServicesInput>
  }

  type UserUpdateWithoutServicesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Account?: UserAccountUpdateOneWithoutUserNestedInput
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
    Budgets?: BudgetUpdateManyWithoutUserNestedInput
    Products?: ProductUpdateManyWithoutOwnerNestedInput
    Categories?: ProductCategoryUpdateManyWithoutUserNestedInput
    Contacts?: ContactUpdateManyWithoutOwnerNestedInput
    Incomes?: IncomeUpdateManyWithoutOwnerNestedInput
    Expenses?: ExpenseUpdateManyWithoutOwnerNestedInput
    ExpenseDebt?: ExpenseDebtUpdateManyWithoutOwnerNestedInput
    IncomeDebt?: IncomeDebtUpdateManyWithoutOwnerNestedInput
  }

  type UserUncheckedUpdateWithoutServicesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Account?: UserAccountUncheckedUpdateOneWithoutUserNestedInput
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
    Budgets?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    Products?: ProductUncheckedUpdateManyWithoutOwnerNestedInput
    Categories?: ProductCategoryUncheckedUpdateManyWithoutUserNestedInput
    Contacts?: ContactUncheckedUpdateManyWithoutOwnerNestedInput
    Incomes?: IncomeUncheckedUpdateManyWithoutOwnerNestedInput
    Expenses?: ExpenseUncheckedUpdateManyWithoutOwnerNestedInput
    ExpenseDebt?: ExpenseDebtUncheckedUpdateManyWithoutOwnerNestedInput
    IncomeDebt?: IncomeDebtUncheckedUpdateManyWithoutOwnerNestedInput
  }

  type IncomeUpsertWithWhereUniqueWithoutServicesInput = {
    where: IncomeWhereUniqueInput
    update: XOR<IncomeUpdateWithoutServicesInput, IncomeUncheckedUpdateWithoutServicesInput>
    create: XOR<IncomeCreateWithoutServicesInput, IncomeUncheckedCreateWithoutServicesInput>
  }

  type IncomeUpdateWithWhereUniqueWithoutServicesInput = {
    where: IncomeWhereUniqueInput
    data: XOR<IncomeUpdateWithoutServicesInput, IncomeUncheckedUpdateWithoutServicesInput>
  }

  type IncomeUpdateManyWithWhereWithoutServicesInput = {
    where: IncomeScalarWhereInput
    data: XOR<IncomeUpdateManyMutationInput, IncomeUncheckedUpdateManyWithoutSalesInput>
  }

  type UserCreateWithoutCategoriesInput = {
    id?: string
    email: string
    password: string
    Account?: UserAccountCreateNestedOneWithoutUserInput
    Business?: BusinessType | null
    Budgets?: BudgetCreateNestedManyWithoutUserInput
    Products?: ProductCreateNestedManyWithoutOwnerInput
    Contacts?: ContactCreateNestedManyWithoutOwnerInput
    Incomes?: IncomeCreateNestedManyWithoutOwnerInput
    Expenses?: ExpenseCreateNestedManyWithoutOwnerInput
    Services?: ServiceCreateNestedManyWithoutOwnerInput
    ExpenseDebt?: ExpenseDebtCreateNestedManyWithoutOwnerInput
    IncomeDebt?: IncomeDebtCreateNestedManyWithoutOwnerInput
  }

  type UserUncheckedCreateWithoutCategoriesInput = {
    id?: string
    email: string
    password: string
    Account?: UserAccountUncheckedCreateNestedOneWithoutUserInput
    Business?: BusinessType | null
    Budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    Products?: ProductUncheckedCreateNestedManyWithoutOwnerInput
    Contacts?: ContactUncheckedCreateNestedManyWithoutOwnerInput
    Incomes?: IncomeUncheckedCreateNestedManyWithoutOwnerInput
    Expenses?: ExpenseUncheckedCreateNestedManyWithoutOwnerInput
    Services?: ServiceUncheckedCreateNestedManyWithoutOwnerInput
    ExpenseDebt?: ExpenseDebtUncheckedCreateNestedManyWithoutOwnerInput
    IncomeDebt?: IncomeDebtUncheckedCreateNestedManyWithoutOwnerInput
  }

  type UserCreateOrConnectWithoutCategoriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
  }

  type ProductCreateWithoutCategoryInput = {
    id?: string
    name: string
    retailPrice: number
    cost?: number | null
    unit?: string | null
    quantity?: number | null
    image?: string | null
    stock: number
    description?: string | null
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutProductsInput
    deletedAt?: Date | string | null
    IncomeProducts?: IncomeProductsCreateNestedManyWithoutProductInput
  }

  type ProductUncheckedCreateWithoutCategoryInput = {
    id?: string
    name: string
    retailPrice: number
    cost?: number | null
    unit?: string | null
    quantity?: number | null
    image?: string | null
    stock: number
    description?: string | null
    createdAt?: Date | string
    ownerId: string
    deletedAt?: Date | string | null
    IncomeProducts?: IncomeProductsUncheckedCreateNestedManyWithoutProductInput
  }

  type ProductCreateOrConnectWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  type ProductCreateManyCategoryInputEnvelope = {
    data: Enumerable<ProductCreateManyCategoryInput>
  }

  type ServiceCreateWithoutCategoryInput = {
    id?: string
    name: string
    image?: string | null
    description?: string | null
    retailPrice: number
    createdAt?: Date | string
    owner: UserCreateNestedOneWithoutServicesInput
    saleIDs?: ServiceCreatesaleIDsInput | Enumerable<string>
    sales?: IncomeCreateNestedManyWithoutServicesInput
  }

  type ServiceUncheckedCreateWithoutCategoryInput = {
    id?: string
    name: string
    image?: string | null
    description?: string | null
    retailPrice: number
    createdAt?: Date | string
    ownerId: string
    saleIDs?: ServiceCreatesaleIDsInput | Enumerable<string>
    sales?: IncomeUncheckedCreateNestedManyWithoutServicesInput
  }

  type ServiceCreateOrConnectWithoutCategoryInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput>
  }

  type ServiceCreateManyCategoryInputEnvelope = {
    data: Enumerable<ServiceCreateManyCategoryInput>
  }

  type UserUpsertWithoutCategoriesInput = {
    update: XOR<UserUpdateWithoutCategoriesInput, UserUncheckedUpdateWithoutCategoriesInput>
    create: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
  }

  type UserUpdateWithoutCategoriesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Account?: UserAccountUpdateOneWithoutUserNestedInput
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
    Budgets?: BudgetUpdateManyWithoutUserNestedInput
    Products?: ProductUpdateManyWithoutOwnerNestedInput
    Contacts?: ContactUpdateManyWithoutOwnerNestedInput
    Incomes?: IncomeUpdateManyWithoutOwnerNestedInput
    Expenses?: ExpenseUpdateManyWithoutOwnerNestedInput
    Services?: ServiceUpdateManyWithoutOwnerNestedInput
    ExpenseDebt?: ExpenseDebtUpdateManyWithoutOwnerNestedInput
    IncomeDebt?: IncomeDebtUpdateManyWithoutOwnerNestedInput
  }

  type UserUncheckedUpdateWithoutCategoriesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Account?: UserAccountUncheckedUpdateOneWithoutUserNestedInput
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
    Budgets?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    Products?: ProductUncheckedUpdateManyWithoutOwnerNestedInput
    Contacts?: ContactUncheckedUpdateManyWithoutOwnerNestedInput
    Incomes?: IncomeUncheckedUpdateManyWithoutOwnerNestedInput
    Expenses?: ExpenseUncheckedUpdateManyWithoutOwnerNestedInput
    Services?: ServiceUncheckedUpdateManyWithoutOwnerNestedInput
    ExpenseDebt?: ExpenseDebtUncheckedUpdateManyWithoutOwnerNestedInput
    IncomeDebt?: IncomeDebtUncheckedUpdateManyWithoutOwnerNestedInput
  }

  type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
  }

  type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutProductInput>
  }

  type ServiceUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutCategoryInput, ServiceUncheckedUpdateWithoutCategoryInput>
    create: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput>
  }

  type ServiceUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutCategoryInput, ServiceUncheckedUpdateWithoutCategoryInput>
  }

  type ServiceUpdateManyWithWhereWithoutCategoryInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutServiceInput>
  }

  type UserCreateWithoutContactsInput = {
    id?: string
    email: string
    password: string
    Account?: UserAccountCreateNestedOneWithoutUserInput
    Business?: BusinessType | null
    Budgets?: BudgetCreateNestedManyWithoutUserInput
    Products?: ProductCreateNestedManyWithoutOwnerInput
    Categories?: ProductCategoryCreateNestedManyWithoutUserInput
    Incomes?: IncomeCreateNestedManyWithoutOwnerInput
    Expenses?: ExpenseCreateNestedManyWithoutOwnerInput
    Services?: ServiceCreateNestedManyWithoutOwnerInput
    ExpenseDebt?: ExpenseDebtCreateNestedManyWithoutOwnerInput
    IncomeDebt?: IncomeDebtCreateNestedManyWithoutOwnerInput
  }

  type UserUncheckedCreateWithoutContactsInput = {
    id?: string
    email: string
    password: string
    Account?: UserAccountUncheckedCreateNestedOneWithoutUserInput
    Business?: BusinessType | null
    Budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    Products?: ProductUncheckedCreateNestedManyWithoutOwnerInput
    Categories?: ProductCategoryUncheckedCreateNestedManyWithoutUserInput
    Incomes?: IncomeUncheckedCreateNestedManyWithoutOwnerInput
    Expenses?: ExpenseUncheckedCreateNestedManyWithoutOwnerInput
    Services?: ServiceUncheckedCreateNestedManyWithoutOwnerInput
    ExpenseDebt?: ExpenseDebtUncheckedCreateNestedManyWithoutOwnerInput
    IncomeDebt?: IncomeDebtUncheckedCreateNestedManyWithoutOwnerInput
  }

  type UserCreateOrConnectWithoutContactsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutContactsInput, UserUncheckedCreateWithoutContactsInput>
  }

  type IncomeCreateWithoutClientInput = {
    id?: string
    value: number
    name?: string | null
    date: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    IncomeProducts?: IncomeProductsCreateNestedManyWithoutIncomeInput
    serviceIDs?: IncomeCreateserviceIDsInput | Enumerable<string>
    services?: ServiceCreateNestedManyWithoutSalesInput
    category: IncomeCategoryCreateNestedOneWithoutIncomeInput
    isPaid: boolean
    paymentMethod?: PaymentMethod | null
    Owner: UserCreateNestedOneWithoutIncomesInput
    IncomeDebts?: IncomeDebtCreateNestedManyWithoutIncomesInput
    incomeDebtIds?: IncomeCreateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeUncheckedCreateWithoutClientInput = {
    id?: string
    value: number
    name?: string | null
    date: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    IncomeProducts?: IncomeProductsUncheckedCreateNestedManyWithoutIncomeInput
    serviceIDs?: IncomeCreateserviceIDsInput | Enumerable<string>
    services?: ServiceUncheckedCreateNestedManyWithoutSalesInput
    categoryId: string
    isPaid: boolean
    paymentMethod?: PaymentMethod | null
    ownerId: string
    IncomeDebts?: IncomeDebtUncheckedCreateNestedManyWithoutIncomesInput
    incomeDebtIds?: IncomeCreateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeCreateOrConnectWithoutClientInput = {
    where: IncomeWhereUniqueInput
    create: XOR<IncomeCreateWithoutClientInput, IncomeUncheckedCreateWithoutClientInput>
  }

  type IncomeCreateManyClientInputEnvelope = {
    data: Enumerable<IncomeCreateManyClientInput>
  }

  type ExpenseCreateWithoutProviderInput = {
    id?: string
    createdAt?: Date | string
    value: number
    name: string
    date: string
    isPaid: boolean
    deletedAt?: Date | string | null
    category: ExpenseCategoryCreateNestedOneWithoutExpenseInput
    paymentMethod?: PaymentMethod | null
    Owner: UserCreateNestedOneWithoutExpensesInput
    ExpenseDebts?: ExpenseDebtCreateNestedManyWithoutExpensesInput
    expenseDebtIds?: ExpenseCreateexpenseDebtIdsInput | Enumerable<string>
  }

  type ExpenseUncheckedCreateWithoutProviderInput = {
    id?: string
    createdAt?: Date | string
    value: number
    name: string
    date: string
    isPaid: boolean
    deletedAt?: Date | string | null
    categoryId: string
    paymentMethod?: PaymentMethod | null
    ownerId: string
    ExpenseDebts?: ExpenseDebtUncheckedCreateNestedManyWithoutExpensesInput
    expenseDebtIds?: ExpenseCreateexpenseDebtIdsInput | Enumerable<string>
  }

  type ExpenseCreateOrConnectWithoutProviderInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutProviderInput, ExpenseUncheckedCreateWithoutProviderInput>
  }

  type ExpenseCreateManyProviderInputEnvelope = {
    data: Enumerable<ExpenseCreateManyProviderInput>
  }

  type UserUpsertWithoutContactsInput = {
    update: XOR<UserUpdateWithoutContactsInput, UserUncheckedUpdateWithoutContactsInput>
    create: XOR<UserCreateWithoutContactsInput, UserUncheckedCreateWithoutContactsInput>
  }

  type UserUpdateWithoutContactsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Account?: UserAccountUpdateOneWithoutUserNestedInput
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
    Budgets?: BudgetUpdateManyWithoutUserNestedInput
    Products?: ProductUpdateManyWithoutOwnerNestedInput
    Categories?: ProductCategoryUpdateManyWithoutUserNestedInput
    Incomes?: IncomeUpdateManyWithoutOwnerNestedInput
    Expenses?: ExpenseUpdateManyWithoutOwnerNestedInput
    Services?: ServiceUpdateManyWithoutOwnerNestedInput
    ExpenseDebt?: ExpenseDebtUpdateManyWithoutOwnerNestedInput
    IncomeDebt?: IncomeDebtUpdateManyWithoutOwnerNestedInput
  }

  type UserUncheckedUpdateWithoutContactsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Account?: UserAccountUncheckedUpdateOneWithoutUserNestedInput
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
    Budgets?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    Products?: ProductUncheckedUpdateManyWithoutOwnerNestedInput
    Categories?: ProductCategoryUncheckedUpdateManyWithoutUserNestedInput
    Incomes?: IncomeUncheckedUpdateManyWithoutOwnerNestedInput
    Expenses?: ExpenseUncheckedUpdateManyWithoutOwnerNestedInput
    Services?: ServiceUncheckedUpdateManyWithoutOwnerNestedInput
    ExpenseDebt?: ExpenseDebtUncheckedUpdateManyWithoutOwnerNestedInput
    IncomeDebt?: IncomeDebtUncheckedUpdateManyWithoutOwnerNestedInput
  }

  type IncomeUpsertWithWhereUniqueWithoutClientInput = {
    where: IncomeWhereUniqueInput
    update: XOR<IncomeUpdateWithoutClientInput, IncomeUncheckedUpdateWithoutClientInput>
    create: XOR<IncomeCreateWithoutClientInput, IncomeUncheckedCreateWithoutClientInput>
  }

  type IncomeUpdateWithWhereUniqueWithoutClientInput = {
    where: IncomeWhereUniqueInput
    data: XOR<IncomeUpdateWithoutClientInput, IncomeUncheckedUpdateWithoutClientInput>
  }

  type IncomeUpdateManyWithWhereWithoutClientInput = {
    where: IncomeScalarWhereInput
    data: XOR<IncomeUpdateManyMutationInput, IncomeUncheckedUpdateManyWithoutSaleInput>
  }

  type ExpenseUpsertWithWhereUniqueWithoutProviderInput = {
    where: ExpenseWhereUniqueInput
    update: XOR<ExpenseUpdateWithoutProviderInput, ExpenseUncheckedUpdateWithoutProviderInput>
    create: XOR<ExpenseCreateWithoutProviderInput, ExpenseUncheckedCreateWithoutProviderInput>
  }

  type ExpenseUpdateWithWhereUniqueWithoutProviderInput = {
    where: ExpenseWhereUniqueInput
    data: XOR<ExpenseUpdateWithoutProviderInput, ExpenseUncheckedUpdateWithoutProviderInput>
  }

  type ExpenseUpdateManyWithWhereWithoutProviderInput = {
    where: ExpenseScalarWhereInput
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyWithoutExpenseInput>
  }

  type BudgetCreateWithoutExpenseCategoryInput = {
    id?: string
    startingDate: Date | string
    endingDate: Date | string
    total: number
    User: UserCreateNestedOneWithoutBudgetsInput
  }

  type BudgetUncheckedCreateWithoutExpenseCategoryInput = {
    id?: string
    startingDate: Date | string
    endingDate: Date | string
    total: number
    userId: string
  }

  type BudgetCreateOrConnectWithoutExpenseCategoryInput = {
    where: BudgetWhereUniqueInput
    create: XOR<BudgetCreateWithoutExpenseCategoryInput, BudgetUncheckedCreateWithoutExpenseCategoryInput>
  }

  type BudgetCreateManyExpenseCategoryInputEnvelope = {
    data: Enumerable<BudgetCreateManyExpenseCategoryInput>
  }

  type ExpenseCreateWithoutCategoryInput = {
    id?: string
    createdAt?: Date | string
    value: number
    name: string
    date: string
    isPaid: boolean
    deletedAt?: Date | string | null
    provider?: ContactCreateNestedOneWithoutExpenseInput
    paymentMethod?: PaymentMethod | null
    Owner: UserCreateNestedOneWithoutExpensesInput
    ExpenseDebts?: ExpenseDebtCreateNestedManyWithoutExpensesInput
    expenseDebtIds?: ExpenseCreateexpenseDebtIdsInput | Enumerable<string>
  }

  type ExpenseUncheckedCreateWithoutCategoryInput = {
    id?: string
    createdAt?: Date | string
    value: number
    name: string
    date: string
    isPaid: boolean
    deletedAt?: Date | string | null
    providerId?: string | null
    paymentMethod?: PaymentMethod | null
    ownerId: string
    ExpenseDebts?: ExpenseDebtUncheckedCreateNestedManyWithoutExpensesInput
    expenseDebtIds?: ExpenseCreateexpenseDebtIdsInput | Enumerable<string>
  }

  type ExpenseCreateOrConnectWithoutCategoryInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutCategoryInput, ExpenseUncheckedCreateWithoutCategoryInput>
  }

  type ExpenseCreateManyCategoryInputEnvelope = {
    data: Enumerable<ExpenseCreateManyCategoryInput>
  }

  type BudgetUpsertWithWhereUniqueWithoutExpenseCategoryInput = {
    where: BudgetWhereUniqueInput
    update: XOR<BudgetUpdateWithoutExpenseCategoryInput, BudgetUncheckedUpdateWithoutExpenseCategoryInput>
    create: XOR<BudgetCreateWithoutExpenseCategoryInput, BudgetUncheckedCreateWithoutExpenseCategoryInput>
  }

  type BudgetUpdateWithWhereUniqueWithoutExpenseCategoryInput = {
    where: BudgetWhereUniqueInput
    data: XOR<BudgetUpdateWithoutExpenseCategoryInput, BudgetUncheckedUpdateWithoutExpenseCategoryInput>
  }

  type BudgetUpdateManyWithWhereWithoutExpenseCategoryInput = {
    where: BudgetScalarWhereInput
    data: XOR<BudgetUpdateManyMutationInput, BudgetUncheckedUpdateManyWithoutBudgetInput>
  }

  type ExpenseUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ExpenseWhereUniqueInput
    update: XOR<ExpenseUpdateWithoutCategoryInput, ExpenseUncheckedUpdateWithoutCategoryInput>
    create: XOR<ExpenseCreateWithoutCategoryInput, ExpenseUncheckedCreateWithoutCategoryInput>
  }

  type ExpenseUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ExpenseWhereUniqueInput
    data: XOR<ExpenseUpdateWithoutCategoryInput, ExpenseUncheckedUpdateWithoutCategoryInput>
  }

  type ExpenseUpdateManyWithWhereWithoutCategoryInput = {
    where: ExpenseScalarWhereInput
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyWithoutExpenseInput>
  }

  type IncomeCreateWithoutCategoryInput = {
    id?: string
    value: number
    name?: string | null
    date: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    IncomeProducts?: IncomeProductsCreateNestedManyWithoutIncomeInput
    serviceIDs?: IncomeCreateserviceIDsInput | Enumerable<string>
    services?: ServiceCreateNestedManyWithoutSalesInput
    client?: ContactCreateNestedOneWithoutSaleInput
    isPaid: boolean
    paymentMethod?: PaymentMethod | null
    Owner: UserCreateNestedOneWithoutIncomesInput
    IncomeDebts?: IncomeDebtCreateNestedManyWithoutIncomesInput
    incomeDebtIds?: IncomeCreateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeUncheckedCreateWithoutCategoryInput = {
    id?: string
    value: number
    name?: string | null
    date: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    IncomeProducts?: IncomeProductsUncheckedCreateNestedManyWithoutIncomeInput
    serviceIDs?: IncomeCreateserviceIDsInput | Enumerable<string>
    services?: ServiceUncheckedCreateNestedManyWithoutSalesInput
    clientId?: string | null
    isPaid: boolean
    paymentMethod?: PaymentMethod | null
    ownerId: string
    IncomeDebts?: IncomeDebtUncheckedCreateNestedManyWithoutIncomesInput
    incomeDebtIds?: IncomeCreateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeCreateOrConnectWithoutCategoryInput = {
    where: IncomeWhereUniqueInput
    create: XOR<IncomeCreateWithoutCategoryInput, IncomeUncheckedCreateWithoutCategoryInput>
  }

  type IncomeCreateManyCategoryInputEnvelope = {
    data: Enumerable<IncomeCreateManyCategoryInput>
  }

  type IncomeUpsertWithWhereUniqueWithoutCategoryInput = {
    where: IncomeWhereUniqueInput
    update: XOR<IncomeUpdateWithoutCategoryInput, IncomeUncheckedUpdateWithoutCategoryInput>
    create: XOR<IncomeCreateWithoutCategoryInput, IncomeUncheckedCreateWithoutCategoryInput>
  }

  type IncomeUpdateWithWhereUniqueWithoutCategoryInput = {
    where: IncomeWhereUniqueInput
    data: XOR<IncomeUpdateWithoutCategoryInput, IncomeUncheckedUpdateWithoutCategoryInput>
  }

  type IncomeUpdateManyWithWhereWithoutCategoryInput = {
    where: IncomeScalarWhereInput
    data: XOR<IncomeUpdateManyMutationInput, IncomeUncheckedUpdateManyWithoutIncomeInput>
  }

  type ExpenseCategoryCreateWithoutExpenseInput = {
    id?: string
    name: string
    imageUrl: string
    Budget?: BudgetCreateNestedManyWithoutExpenseCategoryInput
  }

  type ExpenseCategoryUncheckedCreateWithoutExpenseInput = {
    id?: string
    name: string
    imageUrl: string
    Budget?: BudgetUncheckedCreateNestedManyWithoutExpenseCategoryInput
  }

  type ExpenseCategoryCreateOrConnectWithoutExpenseInput = {
    where: ExpenseCategoryWhereUniqueInput
    create: XOR<ExpenseCategoryCreateWithoutExpenseInput, ExpenseCategoryUncheckedCreateWithoutExpenseInput>
  }

  type ContactCreateWithoutExpenseInput = {
    id?: string
    name: string
    phone: string
    typeOfContact: TypeOfContact
    email: string
    comments: string
    deletedAt?: Date | string | null
    owner: UserCreateNestedOneWithoutContactsInput
    Sale?: IncomeCreateNestedManyWithoutClientInput
  }

  type ContactUncheckedCreateWithoutExpenseInput = {
    id?: string
    name: string
    phone: string
    typeOfContact: TypeOfContact
    email: string
    comments: string
    deletedAt?: Date | string | null
    ownerId: string
    Sale?: IncomeUncheckedCreateNestedManyWithoutClientInput
  }

  type ContactCreateOrConnectWithoutExpenseInput = {
    where: ContactWhereUniqueInput
    create: XOR<ContactCreateWithoutExpenseInput, ContactUncheckedCreateWithoutExpenseInput>
  }

  type UserCreateWithoutExpensesInput = {
    id?: string
    email: string
    password: string
    Account?: UserAccountCreateNestedOneWithoutUserInput
    Business?: BusinessType | null
    Budgets?: BudgetCreateNestedManyWithoutUserInput
    Products?: ProductCreateNestedManyWithoutOwnerInput
    Categories?: ProductCategoryCreateNestedManyWithoutUserInput
    Contacts?: ContactCreateNestedManyWithoutOwnerInput
    Incomes?: IncomeCreateNestedManyWithoutOwnerInput
    Services?: ServiceCreateNestedManyWithoutOwnerInput
    ExpenseDebt?: ExpenseDebtCreateNestedManyWithoutOwnerInput
    IncomeDebt?: IncomeDebtCreateNestedManyWithoutOwnerInput
  }

  type UserUncheckedCreateWithoutExpensesInput = {
    id?: string
    email: string
    password: string
    Account?: UserAccountUncheckedCreateNestedOneWithoutUserInput
    Business?: BusinessType | null
    Budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    Products?: ProductUncheckedCreateNestedManyWithoutOwnerInput
    Categories?: ProductCategoryUncheckedCreateNestedManyWithoutUserInput
    Contacts?: ContactUncheckedCreateNestedManyWithoutOwnerInput
    Incomes?: IncomeUncheckedCreateNestedManyWithoutOwnerInput
    Services?: ServiceUncheckedCreateNestedManyWithoutOwnerInput
    ExpenseDebt?: ExpenseDebtUncheckedCreateNestedManyWithoutOwnerInput
    IncomeDebt?: IncomeDebtUncheckedCreateNestedManyWithoutOwnerInput
  }

  type UserCreateOrConnectWithoutExpensesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutExpensesInput, UserUncheckedCreateWithoutExpensesInput>
  }

  type ExpenseDebtCreateWithoutExpensesInput = {
    id?: string
    initialDate?: Date | string
    Owner: UserCreateNestedOneWithoutExpenseDebtInput
    expenseIDs?: ExpenseDebtCreateexpenseIDsInput | Enumerable<string>
    payments?: DebtPaymentCreateNestedManyWithoutExpenseDebtInput
  }

  type ExpenseDebtUncheckedCreateWithoutExpensesInput = {
    id?: string
    initialDate?: Date | string
    ownerId: string
    expenseIDs?: ExpenseDebtCreateexpenseIDsInput | Enumerable<string>
    payments?: DebtPaymentUncheckedCreateNestedManyWithoutExpenseDebtInput
  }

  type ExpenseDebtCreateOrConnectWithoutExpensesInput = {
    where: ExpenseDebtWhereUniqueInput
    create: XOR<ExpenseDebtCreateWithoutExpensesInput, ExpenseDebtUncheckedCreateWithoutExpensesInput>
  }

  type ExpenseCategoryUpsertWithoutExpenseInput = {
    update: XOR<ExpenseCategoryUpdateWithoutExpenseInput, ExpenseCategoryUncheckedUpdateWithoutExpenseInput>
    create: XOR<ExpenseCategoryCreateWithoutExpenseInput, ExpenseCategoryUncheckedCreateWithoutExpenseInput>
  }

  type ExpenseCategoryUpdateWithoutExpenseInput = {
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    Budget?: BudgetUpdateManyWithoutExpenseCategoryNestedInput
  }

  type ExpenseCategoryUncheckedUpdateWithoutExpenseInput = {
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    Budget?: BudgetUncheckedUpdateManyWithoutExpenseCategoryNestedInput
  }

  type ContactUpsertWithoutExpenseInput = {
    update: XOR<ContactUpdateWithoutExpenseInput, ContactUncheckedUpdateWithoutExpenseInput>
    create: XOR<ContactCreateWithoutExpenseInput, ContactUncheckedCreateWithoutExpenseInput>
  }

  type ContactUpdateWithoutExpenseInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    typeOfContact?: EnumTypeOfContactFieldUpdateOperationsInput | TypeOfContact
    email?: StringFieldUpdateOperationsInput | string
    comments?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutContactsNestedInput
    Sale?: IncomeUpdateManyWithoutClientNestedInput
  }

  type ContactUncheckedUpdateWithoutExpenseInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    typeOfContact?: EnumTypeOfContactFieldUpdateOperationsInput | TypeOfContact
    email?: StringFieldUpdateOperationsInput | string
    comments?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    Sale?: IncomeUncheckedUpdateManyWithoutClientNestedInput
  }

  type UserUpsertWithoutExpensesInput = {
    update: XOR<UserUpdateWithoutExpensesInput, UserUncheckedUpdateWithoutExpensesInput>
    create: XOR<UserCreateWithoutExpensesInput, UserUncheckedCreateWithoutExpensesInput>
  }

  type UserUpdateWithoutExpensesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Account?: UserAccountUpdateOneWithoutUserNestedInput
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
    Budgets?: BudgetUpdateManyWithoutUserNestedInput
    Products?: ProductUpdateManyWithoutOwnerNestedInput
    Categories?: ProductCategoryUpdateManyWithoutUserNestedInput
    Contacts?: ContactUpdateManyWithoutOwnerNestedInput
    Incomes?: IncomeUpdateManyWithoutOwnerNestedInput
    Services?: ServiceUpdateManyWithoutOwnerNestedInput
    ExpenseDebt?: ExpenseDebtUpdateManyWithoutOwnerNestedInput
    IncomeDebt?: IncomeDebtUpdateManyWithoutOwnerNestedInput
  }

  type UserUncheckedUpdateWithoutExpensesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Account?: UserAccountUncheckedUpdateOneWithoutUserNestedInput
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
    Budgets?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    Products?: ProductUncheckedUpdateManyWithoutOwnerNestedInput
    Categories?: ProductCategoryUncheckedUpdateManyWithoutUserNestedInput
    Contacts?: ContactUncheckedUpdateManyWithoutOwnerNestedInput
    Incomes?: IncomeUncheckedUpdateManyWithoutOwnerNestedInput
    Services?: ServiceUncheckedUpdateManyWithoutOwnerNestedInput
    ExpenseDebt?: ExpenseDebtUncheckedUpdateManyWithoutOwnerNestedInput
    IncomeDebt?: IncomeDebtUncheckedUpdateManyWithoutOwnerNestedInput
  }

  type ExpenseDebtUpsertWithWhereUniqueWithoutExpensesInput = {
    where: ExpenseDebtWhereUniqueInput
    update: XOR<ExpenseDebtUpdateWithoutExpensesInput, ExpenseDebtUncheckedUpdateWithoutExpensesInput>
    create: XOR<ExpenseDebtCreateWithoutExpensesInput, ExpenseDebtUncheckedCreateWithoutExpensesInput>
  }

  type ExpenseDebtUpdateWithWhereUniqueWithoutExpensesInput = {
    where: ExpenseDebtWhereUniqueInput
    data: XOR<ExpenseDebtUpdateWithoutExpensesInput, ExpenseDebtUncheckedUpdateWithoutExpensesInput>
  }

  type ExpenseDebtUpdateManyWithWhereWithoutExpensesInput = {
    where: ExpenseDebtScalarWhereInput
    data: XOR<ExpenseDebtUpdateManyMutationInput, ExpenseDebtUncheckedUpdateManyWithoutExpenseDebtsInput>
  }

  type IncomeProductsCreateWithoutIncomeInput = {
    id?: string
    quantity: number
    price: number
    product: ProductCreateNestedOneWithoutIncomeProductsInput
  }

  type IncomeProductsUncheckedCreateWithoutIncomeInput = {
    id?: string
    quantity: number
    price: number
    productId: string
  }

  type IncomeProductsCreateOrConnectWithoutIncomeInput = {
    where: IncomeProductsWhereUniqueInput
    create: XOR<IncomeProductsCreateWithoutIncomeInput, IncomeProductsUncheckedCreateWithoutIncomeInput>
  }

  type IncomeProductsCreateManyIncomeInputEnvelope = {
    data: Enumerable<IncomeProductsCreateManyIncomeInput>
  }

  type ServiceCreateWithoutSalesInput = {
    id?: string
    name: string
    image?: string | null
    description?: string | null
    retailPrice: number
    createdAt?: Date | string
    category?: ProductCategoryCreateNestedOneWithoutServiceInput
    owner: UserCreateNestedOneWithoutServicesInput
    saleIDs?: ServiceCreatesaleIDsInput | Enumerable<string>
  }

  type ServiceUncheckedCreateWithoutSalesInput = {
    id?: string
    name: string
    image?: string | null
    description?: string | null
    retailPrice: number
    createdAt?: Date | string
    categoryId?: string | null
    ownerId: string
    saleIDs?: ServiceCreatesaleIDsInput | Enumerable<string>
  }

  type ServiceCreateOrConnectWithoutSalesInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutSalesInput, ServiceUncheckedCreateWithoutSalesInput>
  }

  type ContactCreateWithoutSaleInput = {
    id?: string
    name: string
    phone: string
    typeOfContact: TypeOfContact
    email: string
    comments: string
    deletedAt?: Date | string | null
    owner: UserCreateNestedOneWithoutContactsInput
    Expense?: ExpenseCreateNestedManyWithoutProviderInput
  }

  type ContactUncheckedCreateWithoutSaleInput = {
    id?: string
    name: string
    phone: string
    typeOfContact: TypeOfContact
    email: string
    comments: string
    deletedAt?: Date | string | null
    ownerId: string
    Expense?: ExpenseUncheckedCreateNestedManyWithoutProviderInput
  }

  type ContactCreateOrConnectWithoutSaleInput = {
    where: ContactWhereUniqueInput
    create: XOR<ContactCreateWithoutSaleInput, ContactUncheckedCreateWithoutSaleInput>
  }

  type IncomeCategoryCreateWithoutIncomeInput = {
    id?: string
    name: string
    imageUrl: string
  }

  type IncomeCategoryUncheckedCreateWithoutIncomeInput = {
    id?: string
    name: string
    imageUrl: string
  }

  type IncomeCategoryCreateOrConnectWithoutIncomeInput = {
    where: IncomeCategoryWhereUniqueInput
    create: XOR<IncomeCategoryCreateWithoutIncomeInput, IncomeCategoryUncheckedCreateWithoutIncomeInput>
  }

  type UserCreateWithoutIncomesInput = {
    id?: string
    email: string
    password: string
    Account?: UserAccountCreateNestedOneWithoutUserInput
    Business?: BusinessType | null
    Budgets?: BudgetCreateNestedManyWithoutUserInput
    Products?: ProductCreateNestedManyWithoutOwnerInput
    Categories?: ProductCategoryCreateNestedManyWithoutUserInput
    Contacts?: ContactCreateNestedManyWithoutOwnerInput
    Expenses?: ExpenseCreateNestedManyWithoutOwnerInput
    Services?: ServiceCreateNestedManyWithoutOwnerInput
    ExpenseDebt?: ExpenseDebtCreateNestedManyWithoutOwnerInput
    IncomeDebt?: IncomeDebtCreateNestedManyWithoutOwnerInput
  }

  type UserUncheckedCreateWithoutIncomesInput = {
    id?: string
    email: string
    password: string
    Account?: UserAccountUncheckedCreateNestedOneWithoutUserInput
    Business?: BusinessType | null
    Budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    Products?: ProductUncheckedCreateNestedManyWithoutOwnerInput
    Categories?: ProductCategoryUncheckedCreateNestedManyWithoutUserInput
    Contacts?: ContactUncheckedCreateNestedManyWithoutOwnerInput
    Expenses?: ExpenseUncheckedCreateNestedManyWithoutOwnerInput
    Services?: ServiceUncheckedCreateNestedManyWithoutOwnerInput
    ExpenseDebt?: ExpenseDebtUncheckedCreateNestedManyWithoutOwnerInput
    IncomeDebt?: IncomeDebtUncheckedCreateNestedManyWithoutOwnerInput
  }

  type UserCreateOrConnectWithoutIncomesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutIncomesInput, UserUncheckedCreateWithoutIncomesInput>
  }

  type IncomeDebtCreateWithoutIncomesInput = {
    id?: string
    initialDate?: Date | string
    Owner: UserCreateNestedOneWithoutIncomeDebtInput
    incomeIDs?: IncomeDebtCreateincomeIDsInput | Enumerable<string>
    payments?: DebtPaymentCreateNestedManyWithoutIncomeDebtInput
  }

  type IncomeDebtUncheckedCreateWithoutIncomesInput = {
    id?: string
    initialDate?: Date | string
    ownerId: string
    incomeIDs?: IncomeDebtCreateincomeIDsInput | Enumerable<string>
    payments?: DebtPaymentUncheckedCreateNestedManyWithoutIncomeDebtInput
  }

  type IncomeDebtCreateOrConnectWithoutIncomesInput = {
    where: IncomeDebtWhereUniqueInput
    create: XOR<IncomeDebtCreateWithoutIncomesInput, IncomeDebtUncheckedCreateWithoutIncomesInput>
  }

  type IncomeProductsUpsertWithWhereUniqueWithoutIncomeInput = {
    where: IncomeProductsWhereUniqueInput
    update: XOR<IncomeProductsUpdateWithoutIncomeInput, IncomeProductsUncheckedUpdateWithoutIncomeInput>
    create: XOR<IncomeProductsCreateWithoutIncomeInput, IncomeProductsUncheckedCreateWithoutIncomeInput>
  }

  type IncomeProductsUpdateWithWhereUniqueWithoutIncomeInput = {
    where: IncomeProductsWhereUniqueInput
    data: XOR<IncomeProductsUpdateWithoutIncomeInput, IncomeProductsUncheckedUpdateWithoutIncomeInput>
  }

  type IncomeProductsUpdateManyWithWhereWithoutIncomeInput = {
    where: IncomeProductsScalarWhereInput
    data: XOR<IncomeProductsUpdateManyMutationInput, IncomeProductsUncheckedUpdateManyWithoutIncomeProductsInput>
  }

  type ServiceUpsertWithWhereUniqueWithoutSalesInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutSalesInput, ServiceUncheckedUpdateWithoutSalesInput>
    create: XOR<ServiceCreateWithoutSalesInput, ServiceUncheckedCreateWithoutSalesInput>
  }

  type ServiceUpdateWithWhereUniqueWithoutSalesInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutSalesInput, ServiceUncheckedUpdateWithoutSalesInput>
  }

  type ServiceUpdateManyWithWhereWithoutSalesInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutServicesInput>
  }

  type ContactUpsertWithoutSaleInput = {
    update: XOR<ContactUpdateWithoutSaleInput, ContactUncheckedUpdateWithoutSaleInput>
    create: XOR<ContactCreateWithoutSaleInput, ContactUncheckedCreateWithoutSaleInput>
  }

  type ContactUpdateWithoutSaleInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    typeOfContact?: EnumTypeOfContactFieldUpdateOperationsInput | TypeOfContact
    email?: StringFieldUpdateOperationsInput | string
    comments?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    owner?: UserUpdateOneRequiredWithoutContactsNestedInput
    Expense?: ExpenseUpdateManyWithoutProviderNestedInput
  }

  type ContactUncheckedUpdateWithoutSaleInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    typeOfContact?: EnumTypeOfContactFieldUpdateOperationsInput | TypeOfContact
    email?: StringFieldUpdateOperationsInput | string
    comments?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    Expense?: ExpenseUncheckedUpdateManyWithoutProviderNestedInput
  }

  type IncomeCategoryUpsertWithoutIncomeInput = {
    update: XOR<IncomeCategoryUpdateWithoutIncomeInput, IncomeCategoryUncheckedUpdateWithoutIncomeInput>
    create: XOR<IncomeCategoryCreateWithoutIncomeInput, IncomeCategoryUncheckedCreateWithoutIncomeInput>
  }

  type IncomeCategoryUpdateWithoutIncomeInput = {
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
  }

  type IncomeCategoryUncheckedUpdateWithoutIncomeInput = {
    name?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
  }

  type UserUpsertWithoutIncomesInput = {
    update: XOR<UserUpdateWithoutIncomesInput, UserUncheckedUpdateWithoutIncomesInput>
    create: XOR<UserCreateWithoutIncomesInput, UserUncheckedCreateWithoutIncomesInput>
  }

  type UserUpdateWithoutIncomesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Account?: UserAccountUpdateOneWithoutUserNestedInput
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
    Budgets?: BudgetUpdateManyWithoutUserNestedInput
    Products?: ProductUpdateManyWithoutOwnerNestedInput
    Categories?: ProductCategoryUpdateManyWithoutUserNestedInput
    Contacts?: ContactUpdateManyWithoutOwnerNestedInput
    Expenses?: ExpenseUpdateManyWithoutOwnerNestedInput
    Services?: ServiceUpdateManyWithoutOwnerNestedInput
    ExpenseDebt?: ExpenseDebtUpdateManyWithoutOwnerNestedInput
    IncomeDebt?: IncomeDebtUpdateManyWithoutOwnerNestedInput
  }

  type UserUncheckedUpdateWithoutIncomesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Account?: UserAccountUncheckedUpdateOneWithoutUserNestedInput
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
    Budgets?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    Products?: ProductUncheckedUpdateManyWithoutOwnerNestedInput
    Categories?: ProductCategoryUncheckedUpdateManyWithoutUserNestedInput
    Contacts?: ContactUncheckedUpdateManyWithoutOwnerNestedInput
    Expenses?: ExpenseUncheckedUpdateManyWithoutOwnerNestedInput
    Services?: ServiceUncheckedUpdateManyWithoutOwnerNestedInput
    ExpenseDebt?: ExpenseDebtUncheckedUpdateManyWithoutOwnerNestedInput
    IncomeDebt?: IncomeDebtUncheckedUpdateManyWithoutOwnerNestedInput
  }

  type IncomeDebtUpsertWithWhereUniqueWithoutIncomesInput = {
    where: IncomeDebtWhereUniqueInput
    update: XOR<IncomeDebtUpdateWithoutIncomesInput, IncomeDebtUncheckedUpdateWithoutIncomesInput>
    create: XOR<IncomeDebtCreateWithoutIncomesInput, IncomeDebtUncheckedCreateWithoutIncomesInput>
  }

  type IncomeDebtUpdateWithWhereUniqueWithoutIncomesInput = {
    where: IncomeDebtWhereUniqueInput
    data: XOR<IncomeDebtUpdateWithoutIncomesInput, IncomeDebtUncheckedUpdateWithoutIncomesInput>
  }

  type IncomeDebtUpdateManyWithWhereWithoutIncomesInput = {
    where: IncomeDebtScalarWhereInput
    data: XOR<IncomeDebtUpdateManyMutationInput, IncomeDebtUncheckedUpdateManyWithoutIncomeDebtsInput>
  }

  type UserCreateWithoutIncomeDebtInput = {
    id?: string
    email: string
    password: string
    Account?: UserAccountCreateNestedOneWithoutUserInput
    Business?: BusinessType | null
    Budgets?: BudgetCreateNestedManyWithoutUserInput
    Products?: ProductCreateNestedManyWithoutOwnerInput
    Categories?: ProductCategoryCreateNestedManyWithoutUserInput
    Contacts?: ContactCreateNestedManyWithoutOwnerInput
    Incomes?: IncomeCreateNestedManyWithoutOwnerInput
    Expenses?: ExpenseCreateNestedManyWithoutOwnerInput
    Services?: ServiceCreateNestedManyWithoutOwnerInput
    ExpenseDebt?: ExpenseDebtCreateNestedManyWithoutOwnerInput
  }

  type UserUncheckedCreateWithoutIncomeDebtInput = {
    id?: string
    email: string
    password: string
    Account?: UserAccountUncheckedCreateNestedOneWithoutUserInput
    Business?: BusinessType | null
    Budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    Products?: ProductUncheckedCreateNestedManyWithoutOwnerInput
    Categories?: ProductCategoryUncheckedCreateNestedManyWithoutUserInput
    Contacts?: ContactUncheckedCreateNestedManyWithoutOwnerInput
    Incomes?: IncomeUncheckedCreateNestedManyWithoutOwnerInput
    Expenses?: ExpenseUncheckedCreateNestedManyWithoutOwnerInput
    Services?: ServiceUncheckedCreateNestedManyWithoutOwnerInput
    ExpenseDebt?: ExpenseDebtUncheckedCreateNestedManyWithoutOwnerInput
  }

  type UserCreateOrConnectWithoutIncomeDebtInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutIncomeDebtInput, UserUncheckedCreateWithoutIncomeDebtInput>
  }

  type IncomeCreateWithoutIncomeDebtsInput = {
    id?: string
    value: number
    name?: string | null
    date: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    IncomeProducts?: IncomeProductsCreateNestedManyWithoutIncomeInput
    serviceIDs?: IncomeCreateserviceIDsInput | Enumerable<string>
    services?: ServiceCreateNestedManyWithoutSalesInput
    client?: ContactCreateNestedOneWithoutSaleInput
    category: IncomeCategoryCreateNestedOneWithoutIncomeInput
    isPaid: boolean
    paymentMethod?: PaymentMethod | null
    Owner: UserCreateNestedOneWithoutIncomesInput
    incomeDebtIds?: IncomeCreateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeUncheckedCreateWithoutIncomeDebtsInput = {
    id?: string
    value: number
    name?: string | null
    date: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    IncomeProducts?: IncomeProductsUncheckedCreateNestedManyWithoutIncomeInput
    serviceIDs?: IncomeCreateserviceIDsInput | Enumerable<string>
    services?: ServiceUncheckedCreateNestedManyWithoutSalesInput
    clientId?: string | null
    categoryId: string
    isPaid: boolean
    paymentMethod?: PaymentMethod | null
    ownerId: string
    incomeDebtIds?: IncomeCreateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeCreateOrConnectWithoutIncomeDebtsInput = {
    where: IncomeWhereUniqueInput
    create: XOR<IncomeCreateWithoutIncomeDebtsInput, IncomeUncheckedCreateWithoutIncomeDebtsInput>
  }

  type DebtPaymentCreateWithoutIncomeDebtInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    debtId?: string | null
    description?: string | null
    paymentMethod: PaymentMethod
    paidAt: Date | string
    ExpenseDebt?: ExpenseDebtCreateNestedOneWithoutPaymentsInput
  }

  type DebtPaymentUncheckedCreateWithoutIncomeDebtInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    debtId?: string | null
    description?: string | null
    paymentMethod: PaymentMethod
    paidAt: Date | string
    expenseDebtId?: string | null
  }

  type DebtPaymentCreateOrConnectWithoutIncomeDebtInput = {
    where: DebtPaymentWhereUniqueInput
    create: XOR<DebtPaymentCreateWithoutIncomeDebtInput, DebtPaymentUncheckedCreateWithoutIncomeDebtInput>
  }

  type DebtPaymentCreateManyIncomeDebtInputEnvelope = {
    data: Enumerable<DebtPaymentCreateManyIncomeDebtInput>
  }

  type UserUpsertWithoutIncomeDebtInput = {
    update: XOR<UserUpdateWithoutIncomeDebtInput, UserUncheckedUpdateWithoutIncomeDebtInput>
    create: XOR<UserCreateWithoutIncomeDebtInput, UserUncheckedCreateWithoutIncomeDebtInput>
  }

  type UserUpdateWithoutIncomeDebtInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Account?: UserAccountUpdateOneWithoutUserNestedInput
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
    Budgets?: BudgetUpdateManyWithoutUserNestedInput
    Products?: ProductUpdateManyWithoutOwnerNestedInput
    Categories?: ProductCategoryUpdateManyWithoutUserNestedInput
    Contacts?: ContactUpdateManyWithoutOwnerNestedInput
    Incomes?: IncomeUpdateManyWithoutOwnerNestedInput
    Expenses?: ExpenseUpdateManyWithoutOwnerNestedInput
    Services?: ServiceUpdateManyWithoutOwnerNestedInput
    ExpenseDebt?: ExpenseDebtUpdateManyWithoutOwnerNestedInput
  }

  type UserUncheckedUpdateWithoutIncomeDebtInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Account?: UserAccountUncheckedUpdateOneWithoutUserNestedInput
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
    Budgets?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    Products?: ProductUncheckedUpdateManyWithoutOwnerNestedInput
    Categories?: ProductCategoryUncheckedUpdateManyWithoutUserNestedInput
    Contacts?: ContactUncheckedUpdateManyWithoutOwnerNestedInput
    Incomes?: IncomeUncheckedUpdateManyWithoutOwnerNestedInput
    Expenses?: ExpenseUncheckedUpdateManyWithoutOwnerNestedInput
    Services?: ServiceUncheckedUpdateManyWithoutOwnerNestedInput
    ExpenseDebt?: ExpenseDebtUncheckedUpdateManyWithoutOwnerNestedInput
  }

  type IncomeUpsertWithWhereUniqueWithoutIncomeDebtsInput = {
    where: IncomeWhereUniqueInput
    update: XOR<IncomeUpdateWithoutIncomeDebtsInput, IncomeUncheckedUpdateWithoutIncomeDebtsInput>
    create: XOR<IncomeCreateWithoutIncomeDebtsInput, IncomeUncheckedCreateWithoutIncomeDebtsInput>
  }

  type IncomeUpdateWithWhereUniqueWithoutIncomeDebtsInput = {
    where: IncomeWhereUniqueInput
    data: XOR<IncomeUpdateWithoutIncomeDebtsInput, IncomeUncheckedUpdateWithoutIncomeDebtsInput>
  }

  type IncomeUpdateManyWithWhereWithoutIncomeDebtsInput = {
    where: IncomeScalarWhereInput
    data: XOR<IncomeUpdateManyMutationInput, IncomeUncheckedUpdateManyWithoutIncomesInput>
  }

  type DebtPaymentUpsertWithWhereUniqueWithoutIncomeDebtInput = {
    where: DebtPaymentWhereUniqueInput
    update: XOR<DebtPaymentUpdateWithoutIncomeDebtInput, DebtPaymentUncheckedUpdateWithoutIncomeDebtInput>
    create: XOR<DebtPaymentCreateWithoutIncomeDebtInput, DebtPaymentUncheckedCreateWithoutIncomeDebtInput>
  }

  type DebtPaymentUpdateWithWhereUniqueWithoutIncomeDebtInput = {
    where: DebtPaymentWhereUniqueInput
    data: XOR<DebtPaymentUpdateWithoutIncomeDebtInput, DebtPaymentUncheckedUpdateWithoutIncomeDebtInput>
  }

  type DebtPaymentUpdateManyWithWhereWithoutIncomeDebtInput = {
    where: DebtPaymentScalarWhereInput
    data: XOR<DebtPaymentUpdateManyMutationInput, DebtPaymentUncheckedUpdateManyWithoutPaymentsInput>
  }

  type DebtPaymentScalarWhereInput = {
    AND?: Enumerable<DebtPaymentScalarWhereInput>
    OR?: Enumerable<DebtPaymentScalarWhereInput>
    NOT?: Enumerable<DebtPaymentScalarWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    amount?: FloatFilter | number
    debtId?: StringNullableFilter | string | null
    description?: StringNullableFilter | string | null
    paymentMethod?: EnumPaymentMethodFilter | PaymentMethod
    paidAt?: DateTimeFilter | Date | string
    incomeDebtId?: StringNullableFilter | string | null
    expenseDebtId?: StringNullableFilter | string | null
  }

  type UserCreateWithoutExpenseDebtInput = {
    id?: string
    email: string
    password: string
    Account?: UserAccountCreateNestedOneWithoutUserInput
    Business?: BusinessType | null
    Budgets?: BudgetCreateNestedManyWithoutUserInput
    Products?: ProductCreateNestedManyWithoutOwnerInput
    Categories?: ProductCategoryCreateNestedManyWithoutUserInput
    Contacts?: ContactCreateNestedManyWithoutOwnerInput
    Incomes?: IncomeCreateNestedManyWithoutOwnerInput
    Expenses?: ExpenseCreateNestedManyWithoutOwnerInput
    Services?: ServiceCreateNestedManyWithoutOwnerInput
    IncomeDebt?: IncomeDebtCreateNestedManyWithoutOwnerInput
  }

  type UserUncheckedCreateWithoutExpenseDebtInput = {
    id?: string
    email: string
    password: string
    Account?: UserAccountUncheckedCreateNestedOneWithoutUserInput
    Business?: BusinessType | null
    Budgets?: BudgetUncheckedCreateNestedManyWithoutUserInput
    Products?: ProductUncheckedCreateNestedManyWithoutOwnerInput
    Categories?: ProductCategoryUncheckedCreateNestedManyWithoutUserInput
    Contacts?: ContactUncheckedCreateNestedManyWithoutOwnerInput
    Incomes?: IncomeUncheckedCreateNestedManyWithoutOwnerInput
    Expenses?: ExpenseUncheckedCreateNestedManyWithoutOwnerInput
    Services?: ServiceUncheckedCreateNestedManyWithoutOwnerInput
    IncomeDebt?: IncomeDebtUncheckedCreateNestedManyWithoutOwnerInput
  }

  type UserCreateOrConnectWithoutExpenseDebtInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutExpenseDebtInput, UserUncheckedCreateWithoutExpenseDebtInput>
  }

  type ExpenseCreateWithoutExpenseDebtsInput = {
    id?: string
    createdAt?: Date | string
    value: number
    name: string
    date: string
    isPaid: boolean
    deletedAt?: Date | string | null
    category: ExpenseCategoryCreateNestedOneWithoutExpenseInput
    provider?: ContactCreateNestedOneWithoutExpenseInput
    paymentMethod?: PaymentMethod | null
    Owner: UserCreateNestedOneWithoutExpensesInput
    expenseDebtIds?: ExpenseCreateexpenseDebtIdsInput | Enumerable<string>
  }

  type ExpenseUncheckedCreateWithoutExpenseDebtsInput = {
    id?: string
    createdAt?: Date | string
    value: number
    name: string
    date: string
    isPaid: boolean
    deletedAt?: Date | string | null
    categoryId: string
    providerId?: string | null
    paymentMethod?: PaymentMethod | null
    ownerId: string
    expenseDebtIds?: ExpenseCreateexpenseDebtIdsInput | Enumerable<string>
  }

  type ExpenseCreateOrConnectWithoutExpenseDebtsInput = {
    where: ExpenseWhereUniqueInput
    create: XOR<ExpenseCreateWithoutExpenseDebtsInput, ExpenseUncheckedCreateWithoutExpenseDebtsInput>
  }

  type DebtPaymentCreateWithoutExpenseDebtInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    debtId?: string | null
    description?: string | null
    paymentMethod: PaymentMethod
    paidAt: Date | string
    IncomeDebt?: IncomeDebtCreateNestedOneWithoutPaymentsInput
  }

  type DebtPaymentUncheckedCreateWithoutExpenseDebtInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    debtId?: string | null
    description?: string | null
    paymentMethod: PaymentMethod
    paidAt: Date | string
    incomeDebtId?: string | null
  }

  type DebtPaymentCreateOrConnectWithoutExpenseDebtInput = {
    where: DebtPaymentWhereUniqueInput
    create: XOR<DebtPaymentCreateWithoutExpenseDebtInput, DebtPaymentUncheckedCreateWithoutExpenseDebtInput>
  }

  type DebtPaymentCreateManyExpenseDebtInputEnvelope = {
    data: Enumerable<DebtPaymentCreateManyExpenseDebtInput>
  }

  type UserUpsertWithoutExpenseDebtInput = {
    update: XOR<UserUpdateWithoutExpenseDebtInput, UserUncheckedUpdateWithoutExpenseDebtInput>
    create: XOR<UserCreateWithoutExpenseDebtInput, UserUncheckedCreateWithoutExpenseDebtInput>
  }

  type UserUpdateWithoutExpenseDebtInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Account?: UserAccountUpdateOneWithoutUserNestedInput
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
    Budgets?: BudgetUpdateManyWithoutUserNestedInput
    Products?: ProductUpdateManyWithoutOwnerNestedInput
    Categories?: ProductCategoryUpdateManyWithoutUserNestedInput
    Contacts?: ContactUpdateManyWithoutOwnerNestedInput
    Incomes?: IncomeUpdateManyWithoutOwnerNestedInput
    Expenses?: ExpenseUpdateManyWithoutOwnerNestedInput
    Services?: ServiceUpdateManyWithoutOwnerNestedInput
    IncomeDebt?: IncomeDebtUpdateManyWithoutOwnerNestedInput
  }

  type UserUncheckedUpdateWithoutExpenseDebtInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    Account?: UserAccountUncheckedUpdateOneWithoutUserNestedInput
    Business?: NullableEnumBusinessTypeFieldUpdateOperationsInput | BusinessType | null
    Budgets?: BudgetUncheckedUpdateManyWithoutUserNestedInput
    Products?: ProductUncheckedUpdateManyWithoutOwnerNestedInput
    Categories?: ProductCategoryUncheckedUpdateManyWithoutUserNestedInput
    Contacts?: ContactUncheckedUpdateManyWithoutOwnerNestedInput
    Incomes?: IncomeUncheckedUpdateManyWithoutOwnerNestedInput
    Expenses?: ExpenseUncheckedUpdateManyWithoutOwnerNestedInput
    Services?: ServiceUncheckedUpdateManyWithoutOwnerNestedInput
    IncomeDebt?: IncomeDebtUncheckedUpdateManyWithoutOwnerNestedInput
  }

  type ExpenseUpsertWithWhereUniqueWithoutExpenseDebtsInput = {
    where: ExpenseWhereUniqueInput
    update: XOR<ExpenseUpdateWithoutExpenseDebtsInput, ExpenseUncheckedUpdateWithoutExpenseDebtsInput>
    create: XOR<ExpenseCreateWithoutExpenseDebtsInput, ExpenseUncheckedCreateWithoutExpenseDebtsInput>
  }

  type ExpenseUpdateWithWhereUniqueWithoutExpenseDebtsInput = {
    where: ExpenseWhereUniqueInput
    data: XOR<ExpenseUpdateWithoutExpenseDebtsInput, ExpenseUncheckedUpdateWithoutExpenseDebtsInput>
  }

  type ExpenseUpdateManyWithWhereWithoutExpenseDebtsInput = {
    where: ExpenseScalarWhereInput
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyWithoutExpensesInput>
  }

  type DebtPaymentUpsertWithWhereUniqueWithoutExpenseDebtInput = {
    where: DebtPaymentWhereUniqueInput
    update: XOR<DebtPaymentUpdateWithoutExpenseDebtInput, DebtPaymentUncheckedUpdateWithoutExpenseDebtInput>
    create: XOR<DebtPaymentCreateWithoutExpenseDebtInput, DebtPaymentUncheckedCreateWithoutExpenseDebtInput>
  }

  type DebtPaymentUpdateWithWhereUniqueWithoutExpenseDebtInput = {
    where: DebtPaymentWhereUniqueInput
    data: XOR<DebtPaymentUpdateWithoutExpenseDebtInput, DebtPaymentUncheckedUpdateWithoutExpenseDebtInput>
  }

  type DebtPaymentUpdateManyWithWhereWithoutExpenseDebtInput = {
    where: DebtPaymentScalarWhereInput
    data: XOR<DebtPaymentUpdateManyMutationInput, DebtPaymentUncheckedUpdateManyWithoutPaymentsInput>
  }

  type IncomeCreateWithoutIncomeProductsInput = {
    id?: string
    value: number
    name?: string | null
    date: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    serviceIDs?: IncomeCreateserviceIDsInput | Enumerable<string>
    services?: ServiceCreateNestedManyWithoutSalesInput
    client?: ContactCreateNestedOneWithoutSaleInput
    category: IncomeCategoryCreateNestedOneWithoutIncomeInput
    isPaid: boolean
    paymentMethod?: PaymentMethod | null
    Owner: UserCreateNestedOneWithoutIncomesInput
    IncomeDebts?: IncomeDebtCreateNestedManyWithoutIncomesInput
    incomeDebtIds?: IncomeCreateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeUncheckedCreateWithoutIncomeProductsInput = {
    id?: string
    value: number
    name?: string | null
    date: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    serviceIDs?: IncomeCreateserviceIDsInput | Enumerable<string>
    services?: ServiceUncheckedCreateNestedManyWithoutSalesInput
    clientId?: string | null
    categoryId: string
    isPaid: boolean
    paymentMethod?: PaymentMethod | null
    ownerId: string
    IncomeDebts?: IncomeDebtUncheckedCreateNestedManyWithoutIncomesInput
    incomeDebtIds?: IncomeCreateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeCreateOrConnectWithoutIncomeProductsInput = {
    where: IncomeWhereUniqueInput
    create: XOR<IncomeCreateWithoutIncomeProductsInput, IncomeUncheckedCreateWithoutIncomeProductsInput>
  }

  type ProductCreateWithoutIncomeProductsInput = {
    id?: string
    name: string
    retailPrice: number
    cost?: number | null
    unit?: string | null
    quantity?: number | null
    image?: string | null
    stock: number
    description?: string | null
    createdAt?: Date | string
    category?: ProductCategoryCreateNestedOneWithoutProductInput
    owner: UserCreateNestedOneWithoutProductsInput
    deletedAt?: Date | string | null
  }

  type ProductUncheckedCreateWithoutIncomeProductsInput = {
    id?: string
    name: string
    retailPrice: number
    cost?: number | null
    unit?: string | null
    quantity?: number | null
    image?: string | null
    stock: number
    description?: string | null
    createdAt?: Date | string
    categoryId?: string | null
    ownerId: string
    deletedAt?: Date | string | null
  }

  type ProductCreateOrConnectWithoutIncomeProductsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutIncomeProductsInput, ProductUncheckedCreateWithoutIncomeProductsInput>
  }

  type IncomeUpsertWithoutIncomeProductsInput = {
    update: XOR<IncomeUpdateWithoutIncomeProductsInput, IncomeUncheckedUpdateWithoutIncomeProductsInput>
    create: XOR<IncomeCreateWithoutIncomeProductsInput, IncomeUncheckedCreateWithoutIncomeProductsInput>
  }

  type IncomeUpdateWithoutIncomeProductsInput = {
    value?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    serviceIDs?: IncomeUpdateserviceIDsInput | Enumerable<string>
    services?: ServiceUpdateManyWithoutSalesNestedInput
    client?: ContactUpdateOneWithoutSaleNestedInput
    category?: IncomeCategoryUpdateOneRequiredWithoutIncomeNestedInput
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    Owner?: UserUpdateOneRequiredWithoutIncomesNestedInput
    IncomeDebts?: IncomeDebtUpdateManyWithoutIncomesNestedInput
    incomeDebtIds?: IncomeUpdateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeUncheckedUpdateWithoutIncomeProductsInput = {
    value?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    serviceIDs?: IncomeUpdateserviceIDsInput | Enumerable<string>
    services?: ServiceUncheckedUpdateManyWithoutSalesNestedInput
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    ownerId?: StringFieldUpdateOperationsInput | string
    IncomeDebts?: IncomeDebtUncheckedUpdateManyWithoutIncomesNestedInput
    incomeDebtIds?: IncomeUpdateincomeDebtIdsInput | Enumerable<string>
  }

  type ProductUpsertWithoutIncomeProductsInput = {
    update: XOR<ProductUpdateWithoutIncomeProductsInput, ProductUncheckedUpdateWithoutIncomeProductsInput>
    create: XOR<ProductCreateWithoutIncomeProductsInput, ProductUncheckedCreateWithoutIncomeProductsInput>
  }

  type ProductUpdateWithoutIncomeProductsInput = {
    name?: StringFieldUpdateOperationsInput | string
    retailPrice?: FloatFieldUpdateOperationsInput | number
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: ProductCategoryUpdateOneWithoutProductNestedInput
    owner?: UserUpdateOneRequiredWithoutProductsNestedInput
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  type ProductUncheckedUpdateWithoutIncomeProductsInput = {
    name?: StringFieldUpdateOperationsInput | string
    retailPrice?: FloatFieldUpdateOperationsInput | number
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  type IncomeDebtCreateWithoutPaymentsInput = {
    id?: string
    initialDate?: Date | string
    Owner: UserCreateNestedOneWithoutIncomeDebtInput
    incomeIDs?: IncomeDebtCreateincomeIDsInput | Enumerable<string>
    incomes?: IncomeCreateNestedManyWithoutIncomeDebtsInput
  }

  type IncomeDebtUncheckedCreateWithoutPaymentsInput = {
    id?: string
    initialDate?: Date | string
    ownerId: string
    incomeIDs?: IncomeDebtCreateincomeIDsInput | Enumerable<string>
    incomes?: IncomeUncheckedCreateNestedManyWithoutIncomeDebtsInput
  }

  type IncomeDebtCreateOrConnectWithoutPaymentsInput = {
    where: IncomeDebtWhereUniqueInput
    create: XOR<IncomeDebtCreateWithoutPaymentsInput, IncomeDebtUncheckedCreateWithoutPaymentsInput>
  }

  type ExpenseDebtCreateWithoutPaymentsInput = {
    id?: string
    initialDate?: Date | string
    Owner: UserCreateNestedOneWithoutExpenseDebtInput
    expenseIDs?: ExpenseDebtCreateexpenseIDsInput | Enumerable<string>
    expenses?: ExpenseCreateNestedManyWithoutExpenseDebtsInput
  }

  type ExpenseDebtUncheckedCreateWithoutPaymentsInput = {
    id?: string
    initialDate?: Date | string
    ownerId: string
    expenseIDs?: ExpenseDebtCreateexpenseIDsInput | Enumerable<string>
    expenses?: ExpenseUncheckedCreateNestedManyWithoutExpenseDebtsInput
  }

  type ExpenseDebtCreateOrConnectWithoutPaymentsInput = {
    where: ExpenseDebtWhereUniqueInput
    create: XOR<ExpenseDebtCreateWithoutPaymentsInput, ExpenseDebtUncheckedCreateWithoutPaymentsInput>
  }

  type IncomeDebtUpsertWithoutPaymentsInput = {
    update: XOR<IncomeDebtUpdateWithoutPaymentsInput, IncomeDebtUncheckedUpdateWithoutPaymentsInput>
    create: XOR<IncomeDebtCreateWithoutPaymentsInput, IncomeDebtUncheckedCreateWithoutPaymentsInput>
  }

  type IncomeDebtUpdateWithoutPaymentsInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    Owner?: UserUpdateOneRequiredWithoutIncomeDebtNestedInput
    incomeIDs?: IncomeDebtUpdateincomeIDsInput | Enumerable<string>
    incomes?: IncomeUpdateManyWithoutIncomeDebtsNestedInput
  }

  type IncomeDebtUncheckedUpdateWithoutPaymentsInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    incomeIDs?: IncomeDebtUpdateincomeIDsInput | Enumerable<string>
    incomes?: IncomeUncheckedUpdateManyWithoutIncomeDebtsNestedInput
  }

  type ExpenseDebtUpsertWithoutPaymentsInput = {
    update: XOR<ExpenseDebtUpdateWithoutPaymentsInput, ExpenseDebtUncheckedUpdateWithoutPaymentsInput>
    create: XOR<ExpenseDebtCreateWithoutPaymentsInput, ExpenseDebtUncheckedCreateWithoutPaymentsInput>
  }

  type ExpenseDebtUpdateWithoutPaymentsInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    Owner?: UserUpdateOneRequiredWithoutExpenseDebtNestedInput
    expenseIDs?: ExpenseDebtUpdateexpenseIDsInput | Enumerable<string>
    expenses?: ExpenseUpdateManyWithoutExpenseDebtsNestedInput
  }

  type ExpenseDebtUncheckedUpdateWithoutPaymentsInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    expenseIDs?: ExpenseDebtUpdateexpenseIDsInput | Enumerable<string>
    expenses?: ExpenseUncheckedUpdateManyWithoutExpenseDebtsNestedInput
  }

  type BudgetCreateManyUserInput = {
    id?: string
    ExpenseCategoryId: string
    startingDate: Date | string
    endingDate: Date | string
    total: number
  }

  type ProductCreateManyOwnerInput = {
    id?: string
    name: string
    retailPrice: number
    cost?: number | null
    unit?: string | null
    quantity?: number | null
    image?: string | null
    stock: number
    description?: string | null
    createdAt?: Date | string
    categoryId?: string | null
    deletedAt?: Date | string | null
  }

  type ProductCategoryCreateManyUserInput = {
    id?: string
    name: string
  }

  type ContactCreateManyOwnerInput = {
    id?: string
    name: string
    phone: string
    typeOfContact: TypeOfContact
    email: string
    comments: string
    deletedAt?: Date | string | null
  }

  type IncomeCreateManyOwnerInput = {
    id?: string
    value: number
    name?: string | null
    date: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    serviceIDs?: IncomeCreateserviceIDsInput | Enumerable<string>
    clientId?: string | null
    categoryId: string
    isPaid: boolean
    paymentMethod?: PaymentMethod | null
    incomeDebtIds?: IncomeCreateincomeDebtIdsInput | Enumerable<string>
  }

  type ExpenseCreateManyOwnerInput = {
    id?: string
    createdAt?: Date | string
    value: number
    name: string
    date: string
    isPaid: boolean
    deletedAt?: Date | string | null
    categoryId: string
    providerId?: string | null
    paymentMethod?: PaymentMethod | null
    expenseDebtIds?: ExpenseCreateexpenseDebtIdsInput | Enumerable<string>
  }

  type ServiceCreateManyOwnerInput = {
    id?: string
    name: string
    image?: string | null
    description?: string | null
    retailPrice: number
    createdAt?: Date | string
    categoryId?: string | null
    saleIDs?: ServiceCreatesaleIDsInput | Enumerable<string>
  }

  type ExpenseDebtCreateManyOwnerInput = {
    id?: string
    initialDate?: Date | string
    expenseIDs?: ExpenseDebtCreateexpenseIDsInput | Enumerable<string>
  }

  type IncomeDebtCreateManyOwnerInput = {
    id?: string
    initialDate?: Date | string
    incomeIDs?: IncomeDebtCreateincomeIDsInput | Enumerable<string>
  }

  type BudgetUpdateWithoutUserInput = {
    ExpenseCategory?: ExpenseCategoryUpdateOneRequiredWithoutBudgetNestedInput
    startingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: FloatFieldUpdateOperationsInput | number
  }

  type BudgetUncheckedUpdateWithoutUserInput = {
    ExpenseCategoryId?: StringFieldUpdateOperationsInput | string
    startingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: FloatFieldUpdateOperationsInput | number
  }

  type BudgetUncheckedUpdateManyWithoutBudgetsInput = {
    ExpenseCategoryId?: StringFieldUpdateOperationsInput | string
    startingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: FloatFieldUpdateOperationsInput | number
  }

  type ProductUpdateWithoutOwnerInput = {
    name?: StringFieldUpdateOperationsInput | string
    retailPrice?: FloatFieldUpdateOperationsInput | number
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: ProductCategoryUpdateOneWithoutProductNestedInput
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    IncomeProducts?: IncomeProductsUpdateManyWithoutProductNestedInput
  }

  type ProductUncheckedUpdateWithoutOwnerInput = {
    name?: StringFieldUpdateOperationsInput | string
    retailPrice?: FloatFieldUpdateOperationsInput | number
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    IncomeProducts?: IncomeProductsUncheckedUpdateManyWithoutProductNestedInput
  }

  type ProductUncheckedUpdateManyWithoutProductsInput = {
    name?: StringFieldUpdateOperationsInput | string
    retailPrice?: FloatFieldUpdateOperationsInput | number
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  type ProductCategoryUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    Product?: ProductUpdateManyWithoutCategoryNestedInput
    Service?: ServiceUpdateManyWithoutCategoryNestedInput
  }

  type ProductCategoryUncheckedUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    Product?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
    Service?: ServiceUncheckedUpdateManyWithoutCategoryNestedInput
  }

  type ProductCategoryUncheckedUpdateManyWithoutCategoriesInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  type ContactUpdateWithoutOwnerInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    typeOfContact?: EnumTypeOfContactFieldUpdateOperationsInput | TypeOfContact
    email?: StringFieldUpdateOperationsInput | string
    comments?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Sale?: IncomeUpdateManyWithoutClientNestedInput
    Expense?: ExpenseUpdateManyWithoutProviderNestedInput
  }

  type ContactUncheckedUpdateWithoutOwnerInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    typeOfContact?: EnumTypeOfContactFieldUpdateOperationsInput | TypeOfContact
    email?: StringFieldUpdateOperationsInput | string
    comments?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Sale?: IncomeUncheckedUpdateManyWithoutClientNestedInput
    Expense?: ExpenseUncheckedUpdateManyWithoutProviderNestedInput
  }

  type ContactUncheckedUpdateManyWithoutContactsInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    typeOfContact?: EnumTypeOfContactFieldUpdateOperationsInput | TypeOfContact
    email?: StringFieldUpdateOperationsInput | string
    comments?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  type IncomeUpdateWithoutOwnerInput = {
    value?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    IncomeProducts?: IncomeProductsUpdateManyWithoutIncomeNestedInput
    serviceIDs?: IncomeUpdateserviceIDsInput | Enumerable<string>
    services?: ServiceUpdateManyWithoutSalesNestedInput
    client?: ContactUpdateOneWithoutSaleNestedInput
    category?: IncomeCategoryUpdateOneRequiredWithoutIncomeNestedInput
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    IncomeDebts?: IncomeDebtUpdateManyWithoutIncomesNestedInput
    incomeDebtIds?: IncomeUpdateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeUncheckedUpdateWithoutOwnerInput = {
    value?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    IncomeProducts?: IncomeProductsUncheckedUpdateManyWithoutIncomeNestedInput
    serviceIDs?: IncomeUpdateserviceIDsInput | Enumerable<string>
    services?: ServiceUncheckedUpdateManyWithoutSalesNestedInput
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    IncomeDebts?: IncomeDebtUncheckedUpdateManyWithoutIncomesNestedInput
    incomeDebtIds?: IncomeUpdateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeUncheckedUpdateManyWithoutIncomesInput = {
    value?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    serviceIDs?: IncomeUpdateserviceIDsInput | Enumerable<string>
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    incomeDebtIds?: IncomeUpdateincomeDebtIdsInput | Enumerable<string>
  }

  type ExpenseUpdateWithoutOwnerInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: ExpenseCategoryUpdateOneRequiredWithoutExpenseNestedInput
    provider?: ContactUpdateOneWithoutExpenseNestedInput
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    ExpenseDebts?: ExpenseDebtUpdateManyWithoutExpensesNestedInput
    expenseDebtIds?: ExpenseUpdateexpenseDebtIdsInput | Enumerable<string>
  }

  type ExpenseUncheckedUpdateWithoutOwnerInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    ExpenseDebts?: ExpenseDebtUncheckedUpdateManyWithoutExpensesNestedInput
    expenseDebtIds?: ExpenseUpdateexpenseDebtIdsInput | Enumerable<string>
  }

  type ExpenseUncheckedUpdateManyWithoutExpensesInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    expenseDebtIds?: ExpenseUpdateexpenseDebtIdsInput | Enumerable<string>
  }

  type ServiceUpdateWithoutOwnerInput = {
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    retailPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: ProductCategoryUpdateOneWithoutServiceNestedInput
    saleIDs?: ServiceUpdatesaleIDsInput | Enumerable<string>
    sales?: IncomeUpdateManyWithoutServicesNestedInput
  }

  type ServiceUncheckedUpdateWithoutOwnerInput = {
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    retailPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    saleIDs?: ServiceUpdatesaleIDsInput | Enumerable<string>
    sales?: IncomeUncheckedUpdateManyWithoutServicesNestedInput
  }

  type ServiceUncheckedUpdateManyWithoutServicesInput = {
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    retailPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    saleIDs?: ServiceUpdatesaleIDsInput | Enumerable<string>
  }

  type ExpenseDebtUpdateWithoutOwnerInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expenseIDs?: ExpenseDebtUpdateexpenseIDsInput | Enumerable<string>
    expenses?: ExpenseUpdateManyWithoutExpenseDebtsNestedInput
    payments?: DebtPaymentUpdateManyWithoutExpenseDebtNestedInput
  }

  type ExpenseDebtUncheckedUpdateWithoutOwnerInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expenseIDs?: ExpenseDebtUpdateexpenseIDsInput | Enumerable<string>
    expenses?: ExpenseUncheckedUpdateManyWithoutExpenseDebtsNestedInput
    payments?: DebtPaymentUncheckedUpdateManyWithoutExpenseDebtNestedInput
  }

  type ExpenseDebtUncheckedUpdateManyWithoutExpenseDebtInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    expenseIDs?: ExpenseDebtUpdateexpenseIDsInput | Enumerable<string>
  }

  type IncomeDebtUpdateWithoutOwnerInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    incomeIDs?: IncomeDebtUpdateincomeIDsInput | Enumerable<string>
    incomes?: IncomeUpdateManyWithoutIncomeDebtsNestedInput
    payments?: DebtPaymentUpdateManyWithoutIncomeDebtNestedInput
  }

  type IncomeDebtUncheckedUpdateWithoutOwnerInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    incomeIDs?: IncomeDebtUpdateincomeIDsInput | Enumerable<string>
    incomes?: IncomeUncheckedUpdateManyWithoutIncomeDebtsNestedInput
    payments?: DebtPaymentUncheckedUpdateManyWithoutIncomeDebtNestedInput
  }

  type IncomeDebtUncheckedUpdateManyWithoutIncomeDebtInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    incomeIDs?: IncomeDebtUpdateincomeIDsInput | Enumerable<string>
  }

  type IncomeProductsCreateManyProductInput = {
    id?: string
    quantity: number
    price: number
    incomeId: string
  }

  type IncomeProductsUpdateWithoutProductInput = {
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    income?: IncomeUpdateOneRequiredWithoutIncomeProductsNestedInput
  }

  type IncomeProductsUncheckedUpdateWithoutProductInput = {
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    incomeId?: StringFieldUpdateOperationsInput | string
  }

  type IncomeProductsUncheckedUpdateManyWithoutIncomeProductsInput = {
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    incomeId?: StringFieldUpdateOperationsInput | string
  }

  type IncomeUpdateWithoutServicesInput = {
    value?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    IncomeProducts?: IncomeProductsUpdateManyWithoutIncomeNestedInput
    serviceIDs?: IncomeUpdateserviceIDsInput | Enumerable<string>
    client?: ContactUpdateOneWithoutSaleNestedInput
    category?: IncomeCategoryUpdateOneRequiredWithoutIncomeNestedInput
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    Owner?: UserUpdateOneRequiredWithoutIncomesNestedInput
    IncomeDebts?: IncomeDebtUpdateManyWithoutIncomesNestedInput
    incomeDebtIds?: IncomeUpdateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeUncheckedUpdateWithoutServicesInput = {
    value?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    IncomeProducts?: IncomeProductsUncheckedUpdateManyWithoutIncomeNestedInput
    serviceIDs?: IncomeUpdateserviceIDsInput | Enumerable<string>
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    ownerId?: StringFieldUpdateOperationsInput | string
    IncomeDebts?: IncomeDebtUncheckedUpdateManyWithoutIncomesNestedInput
    incomeDebtIds?: IncomeUpdateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeUncheckedUpdateManyWithoutSalesInput = {
    value?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    serviceIDs?: IncomeUpdateserviceIDsInput | Enumerable<string>
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    ownerId?: StringFieldUpdateOperationsInput | string
    incomeDebtIds?: IncomeUpdateincomeDebtIdsInput | Enumerable<string>
  }

  type ProductCreateManyCategoryInput = {
    id?: string
    name: string
    retailPrice: number
    cost?: number | null
    unit?: string | null
    quantity?: number | null
    image?: string | null
    stock: number
    description?: string | null
    createdAt?: Date | string
    ownerId: string
    deletedAt?: Date | string | null
  }

  type ServiceCreateManyCategoryInput = {
    id?: string
    name: string
    image?: string | null
    description?: string | null
    retailPrice: number
    createdAt?: Date | string
    ownerId: string
    saleIDs?: ServiceCreatesaleIDsInput | Enumerable<string>
  }

  type ProductUpdateWithoutCategoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    retailPrice?: FloatFieldUpdateOperationsInput | number
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutProductsNestedInput
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    IncomeProducts?: IncomeProductsUpdateManyWithoutProductNestedInput
  }

  type ProductUncheckedUpdateWithoutCategoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    retailPrice?: FloatFieldUpdateOperationsInput | number
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    IncomeProducts?: IncomeProductsUncheckedUpdateManyWithoutProductNestedInput
  }

  type ProductUncheckedUpdateManyWithoutProductInput = {
    name?: StringFieldUpdateOperationsInput | string
    retailPrice?: FloatFieldUpdateOperationsInput | number
    cost?: NullableFloatFieldUpdateOperationsInput | number | null
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableFloatFieldUpdateOperationsInput | number | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    stock?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  type ServiceUpdateWithoutCategoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    retailPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutServicesNestedInput
    saleIDs?: ServiceUpdatesaleIDsInput | Enumerable<string>
    sales?: IncomeUpdateManyWithoutServicesNestedInput
  }

  type ServiceUncheckedUpdateWithoutCategoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    retailPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    saleIDs?: ServiceUpdatesaleIDsInput | Enumerable<string>
    sales?: IncomeUncheckedUpdateManyWithoutServicesNestedInput
  }

  type ServiceUncheckedUpdateManyWithoutServiceInput = {
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    retailPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    saleIDs?: ServiceUpdatesaleIDsInput | Enumerable<string>
  }

  type IncomeCreateManyClientInput = {
    id?: string
    value: number
    name?: string | null
    date: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    serviceIDs?: IncomeCreateserviceIDsInput | Enumerable<string>
    categoryId: string
    isPaid: boolean
    paymentMethod?: PaymentMethod | null
    ownerId: string
    incomeDebtIds?: IncomeCreateincomeDebtIdsInput | Enumerable<string>
  }

  type ExpenseCreateManyProviderInput = {
    id?: string
    createdAt?: Date | string
    value: number
    name: string
    date: string
    isPaid: boolean
    deletedAt?: Date | string | null
    categoryId: string
    paymentMethod?: PaymentMethod | null
    ownerId: string
    expenseDebtIds?: ExpenseCreateexpenseDebtIdsInput | Enumerable<string>
  }

  type IncomeUpdateWithoutClientInput = {
    value?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    IncomeProducts?: IncomeProductsUpdateManyWithoutIncomeNestedInput
    serviceIDs?: IncomeUpdateserviceIDsInput | Enumerable<string>
    services?: ServiceUpdateManyWithoutSalesNestedInput
    category?: IncomeCategoryUpdateOneRequiredWithoutIncomeNestedInput
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    Owner?: UserUpdateOneRequiredWithoutIncomesNestedInput
    IncomeDebts?: IncomeDebtUpdateManyWithoutIncomesNestedInput
    incomeDebtIds?: IncomeUpdateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeUncheckedUpdateWithoutClientInput = {
    value?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    IncomeProducts?: IncomeProductsUncheckedUpdateManyWithoutIncomeNestedInput
    serviceIDs?: IncomeUpdateserviceIDsInput | Enumerable<string>
    services?: ServiceUncheckedUpdateManyWithoutSalesNestedInput
    categoryId?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    ownerId?: StringFieldUpdateOperationsInput | string
    IncomeDebts?: IncomeDebtUncheckedUpdateManyWithoutIncomesNestedInput
    incomeDebtIds?: IncomeUpdateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeUncheckedUpdateManyWithoutSaleInput = {
    value?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    serviceIDs?: IncomeUpdateserviceIDsInput | Enumerable<string>
    categoryId?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    ownerId?: StringFieldUpdateOperationsInput | string
    incomeDebtIds?: IncomeUpdateincomeDebtIdsInput | Enumerable<string>
  }

  type ExpenseUpdateWithoutProviderInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: ExpenseCategoryUpdateOneRequiredWithoutExpenseNestedInput
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    Owner?: UserUpdateOneRequiredWithoutExpensesNestedInput
    ExpenseDebts?: ExpenseDebtUpdateManyWithoutExpensesNestedInput
    expenseDebtIds?: ExpenseUpdateexpenseDebtIdsInput | Enumerable<string>
  }

  type ExpenseUncheckedUpdateWithoutProviderInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    ownerId?: StringFieldUpdateOperationsInput | string
    ExpenseDebts?: ExpenseDebtUncheckedUpdateManyWithoutExpensesNestedInput
    expenseDebtIds?: ExpenseUpdateexpenseDebtIdsInput | Enumerable<string>
  }

  type ExpenseUncheckedUpdateManyWithoutExpenseInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    ownerId?: StringFieldUpdateOperationsInput | string
    expenseDebtIds?: ExpenseUpdateexpenseDebtIdsInput | Enumerable<string>
  }

  type BudgetCreateManyExpenseCategoryInput = {
    id?: string
    startingDate: Date | string
    endingDate: Date | string
    total: number
    userId: string
  }

  type ExpenseCreateManyCategoryInput = {
    id?: string
    createdAt?: Date | string
    value: number
    name: string
    date: string
    isPaid: boolean
    deletedAt?: Date | string | null
    providerId?: string | null
    paymentMethod?: PaymentMethod | null
    ownerId: string
    expenseDebtIds?: ExpenseCreateexpenseDebtIdsInput | Enumerable<string>
  }

  type BudgetUpdateWithoutExpenseCategoryInput = {
    startingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: FloatFieldUpdateOperationsInput | number
    User?: UserUpdateOneRequiredWithoutBudgetsNestedInput
  }

  type BudgetUncheckedUpdateWithoutExpenseCategoryInput = {
    startingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: FloatFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
  }

  type BudgetUncheckedUpdateManyWithoutBudgetInput = {
    startingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: FloatFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
  }

  type ExpenseUpdateWithoutCategoryInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    provider?: ContactUpdateOneWithoutExpenseNestedInput
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    Owner?: UserUpdateOneRequiredWithoutExpensesNestedInput
    ExpenseDebts?: ExpenseDebtUpdateManyWithoutExpensesNestedInput
    expenseDebtIds?: ExpenseUpdateexpenseDebtIdsInput | Enumerable<string>
  }

  type ExpenseUncheckedUpdateWithoutCategoryInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    ownerId?: StringFieldUpdateOperationsInput | string
    ExpenseDebts?: ExpenseDebtUncheckedUpdateManyWithoutExpensesNestedInput
    expenseDebtIds?: ExpenseUpdateexpenseDebtIdsInput | Enumerable<string>
  }

  type IncomeCreateManyCategoryInput = {
    id?: string
    value: number
    name?: string | null
    date: string
    createdAt?: Date | string
    deletedAt?: Date | string | null
    serviceIDs?: IncomeCreateserviceIDsInput | Enumerable<string>
    clientId?: string | null
    isPaid: boolean
    paymentMethod?: PaymentMethod | null
    ownerId: string
    incomeDebtIds?: IncomeCreateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeUpdateWithoutCategoryInput = {
    value?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    IncomeProducts?: IncomeProductsUpdateManyWithoutIncomeNestedInput
    serviceIDs?: IncomeUpdateserviceIDsInput | Enumerable<string>
    services?: ServiceUpdateManyWithoutSalesNestedInput
    client?: ContactUpdateOneWithoutSaleNestedInput
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    Owner?: UserUpdateOneRequiredWithoutIncomesNestedInput
    IncomeDebts?: IncomeDebtUpdateManyWithoutIncomesNestedInput
    incomeDebtIds?: IncomeUpdateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeUncheckedUpdateWithoutCategoryInput = {
    value?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    IncomeProducts?: IncomeProductsUncheckedUpdateManyWithoutIncomeNestedInput
    serviceIDs?: IncomeUpdateserviceIDsInput | Enumerable<string>
    services?: ServiceUncheckedUpdateManyWithoutSalesNestedInput
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    ownerId?: StringFieldUpdateOperationsInput | string
    IncomeDebts?: IncomeDebtUncheckedUpdateManyWithoutIncomesNestedInput
    incomeDebtIds?: IncomeUpdateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeUncheckedUpdateManyWithoutIncomeInput = {
    value?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    serviceIDs?: IncomeUpdateserviceIDsInput | Enumerable<string>
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    ownerId?: StringFieldUpdateOperationsInput | string
    incomeDebtIds?: IncomeUpdateincomeDebtIdsInput | Enumerable<string>
  }

  type ExpenseDebtUpdateWithoutExpensesInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    Owner?: UserUpdateOneRequiredWithoutExpenseDebtNestedInput
    expenseIDs?: ExpenseDebtUpdateexpenseIDsInput | Enumerable<string>
    payments?: DebtPaymentUpdateManyWithoutExpenseDebtNestedInput
  }

  type ExpenseDebtUncheckedUpdateWithoutExpensesInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    expenseIDs?: ExpenseDebtUpdateexpenseIDsInput | Enumerable<string>
    payments?: DebtPaymentUncheckedUpdateManyWithoutExpenseDebtNestedInput
  }

  type ExpenseDebtUncheckedUpdateManyWithoutExpenseDebtsInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    expenseIDs?: ExpenseDebtUpdateexpenseIDsInput | Enumerable<string>
  }

  type IncomeProductsCreateManyIncomeInput = {
    id?: string
    quantity: number
    price: number
    productId: string
  }

  type IncomeProductsUpdateWithoutIncomeInput = {
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    product?: ProductUpdateOneRequiredWithoutIncomeProductsNestedInput
  }

  type IncomeProductsUncheckedUpdateWithoutIncomeInput = {
    quantity?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    productId?: StringFieldUpdateOperationsInput | string
  }

  type ServiceUpdateWithoutSalesInput = {
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    retailPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: ProductCategoryUpdateOneWithoutServiceNestedInput
    owner?: UserUpdateOneRequiredWithoutServicesNestedInput
    saleIDs?: ServiceUpdatesaleIDsInput | Enumerable<string>
  }

  type ServiceUncheckedUpdateWithoutSalesInput = {
    name?: StringFieldUpdateOperationsInput | string
    image?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    retailPrice?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    saleIDs?: ServiceUpdatesaleIDsInput | Enumerable<string>
  }

  type IncomeDebtUpdateWithoutIncomesInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    Owner?: UserUpdateOneRequiredWithoutIncomeDebtNestedInput
    incomeIDs?: IncomeDebtUpdateincomeIDsInput | Enumerable<string>
    payments?: DebtPaymentUpdateManyWithoutIncomeDebtNestedInput
  }

  type IncomeDebtUncheckedUpdateWithoutIncomesInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    incomeIDs?: IncomeDebtUpdateincomeIDsInput | Enumerable<string>
    payments?: DebtPaymentUncheckedUpdateManyWithoutIncomeDebtNestedInput
  }

  type IncomeDebtUncheckedUpdateManyWithoutIncomeDebtsInput = {
    initialDate?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerId?: StringFieldUpdateOperationsInput | string
    incomeIDs?: IncomeDebtUpdateincomeIDsInput | Enumerable<string>
  }

  type DebtPaymentCreateManyIncomeDebtInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    debtId?: string | null
    description?: string | null
    paymentMethod: PaymentMethod
    paidAt: Date | string
    expenseDebtId?: string | null
  }

  type IncomeUpdateWithoutIncomeDebtsInput = {
    value?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    IncomeProducts?: IncomeProductsUpdateManyWithoutIncomeNestedInput
    serviceIDs?: IncomeUpdateserviceIDsInput | Enumerable<string>
    services?: ServiceUpdateManyWithoutSalesNestedInput
    client?: ContactUpdateOneWithoutSaleNestedInput
    category?: IncomeCategoryUpdateOneRequiredWithoutIncomeNestedInput
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    Owner?: UserUpdateOneRequiredWithoutIncomesNestedInput
    incomeDebtIds?: IncomeUpdateincomeDebtIdsInput | Enumerable<string>
  }

  type IncomeUncheckedUpdateWithoutIncomeDebtsInput = {
    value?: FloatFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    date?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    IncomeProducts?: IncomeProductsUncheckedUpdateManyWithoutIncomeNestedInput
    serviceIDs?: IncomeUpdateserviceIDsInput | Enumerable<string>
    services?: ServiceUncheckedUpdateManyWithoutSalesNestedInput
    clientId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    ownerId?: StringFieldUpdateOperationsInput | string
    incomeDebtIds?: IncomeUpdateincomeDebtIdsInput | Enumerable<string>
  }

  type DebtPaymentUpdateWithoutIncomeDebtInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    debtId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ExpenseDebt?: ExpenseDebtUpdateOneWithoutPaymentsNestedInput
  }

  type DebtPaymentUncheckedUpdateWithoutIncomeDebtInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    debtId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expenseDebtId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  type DebtPaymentUncheckedUpdateManyWithoutPaymentsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    debtId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expenseDebtId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  type DebtPaymentCreateManyExpenseDebtInput = {
    id?: string
    createdAt?: Date | string
    amount: number
    debtId?: string | null
    description?: string | null
    paymentMethod: PaymentMethod
    paidAt: Date | string
    incomeDebtId?: string | null
  }

  type ExpenseUpdateWithoutExpenseDebtsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: ExpenseCategoryUpdateOneRequiredWithoutExpenseNestedInput
    provider?: ContactUpdateOneWithoutExpenseNestedInput
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    Owner?: UserUpdateOneRequiredWithoutExpensesNestedInput
    expenseDebtIds?: ExpenseUpdateexpenseDebtIdsInput | Enumerable<string>
  }

  type ExpenseUncheckedUpdateWithoutExpenseDebtsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    value?: FloatFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    isPaid?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    categoryId?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: NullableEnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod | null
    ownerId?: StringFieldUpdateOperationsInput | string
    expenseDebtIds?: ExpenseUpdateexpenseDebtIdsInput | Enumerable<string>
  }

  type DebtPaymentUpdateWithoutExpenseDebtInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    debtId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    IncomeDebt?: IncomeDebtUpdateOneWithoutPaymentsNestedInput
  }

  type DebtPaymentUncheckedUpdateWithoutExpenseDebtInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    amount?: FloatFieldUpdateOperationsInput | number
    debtId?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | PaymentMethod
    paidAt?: DateTimeFieldUpdateOperationsInput | Date | string
    incomeDebtId?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  const dmmf: runtime.BaseDMMF
}