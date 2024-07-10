import "reflect-metadata";
import {
  type ClassTransformOptions,
  plainToClassFromExist,
} from "class-transformer";
import {
  ValidatorOptions,
  validateOrReject,
  validateSync,
  ValidationError,
} from "class-validator";

type OmitDistributive<T, K extends PropertyKey> = T extends any
  ? T extends object
    ? Id<OmitRecursively<T, K>>
    : T
  : never;
type Id<T> = {} & { [P in keyof T]: T[P] }; // Cosmetic use only makes the tooltips expad the type can be removed
type OmitRecursively<T, K extends PropertyKey> = Omit<
  { [P in keyof T]: OmitDistributive<T[P], K> },
  K
>;

export { ValidationError };

export default class Resource {
  /**
   * @description Hydrate a resource from a plain object
   */
  public static hydrate<T extends Resource>(
    from: T | OmitRecursively<T, "validateOrReject" | "validateOrRejectSync">,
    options?: ClassTransformOptions
  ): T {
    const self: T = new (this as any)();
    return plainToClassFromExist(self, from, {
      strategy: "excludeAll",
      ...options,
    });
  }

  /**
   * @description Hydrate a resource from a plain object
   */
  public static hydratePartial<T extends Resource>(
    from: Partial<
      T | OmitRecursively<T, "validateOrReject" | "validateOrRejectSync">
    >,
    options?: ClassTransformOptions
  ): Partial<T> {
    const self: T = new (this as any)();
    return plainToClassFromExist(self, from, {
      strategy: "excludeAll",
      ...options,
    });
  }

  public static hydrateArray<T extends Resource>(
    fromArray:
      | T[]
      | OmitRecursively<T[], "validateOrReject" | "validateOrRejectSync">,
    options?: ClassTransformOptions
  ): T[] {
    return fromArray.map((from) => this.hydrate<T>(from, options));
  }

  public static hydratePartialArray<T extends Resource>(
    fromArray:
      | Partial<T>[]
      | OmitRecursively<T[], "validateOrReject" | "validateOrRejectSync">,
    options?: ClassTransformOptions
  ): Partial<T>[] {
    return fromArray.map((from) => this.hydratePartial<T>(from, options));
  }

  /**
   * Will first validate automatically all synchronous validators, then all asynchronous validators.
   * Because the asynchronous validators are usually database queries, validating the synchronous ones first will save time.
   */
  public validateOrReject(validatorOptions?: ValidatorOptions) {
    const validationError = validateSync(this, validatorOptions);
    if (validationError.length) return Promise.reject(validationError);
    return validateOrReject(this, validatorOptions).then(() => this);
  }

  public static validateOrReject<T extends Resource>(
    object: Partial<T>,
    validatorOptions?: ValidatorOptions
  ) {
    const validationError = validateSync(object, validatorOptions);
    if (validationError.length) return Promise.reject(validationError);
    return validateOrReject(object, validatorOptions).then(() => object);
  }

  /**
   * Will only validate all synchronous validators.
   */
  public validateOrRejectSync(validatorOptions?: ValidatorOptions) {
    const validationError = validateSync(this, validatorOptions);
    if (validationError.length) throw validationError;
    return this;
  }

  public static validateOrRejectSync<T extends Resource>(
    object: Partial<T>,
    validatorOptions?: ValidatorOptions
  ) {
    const validationError = validateSync(object, validatorOptions);
    if (validationError.length) throw validationError;
    return this;
  }

  /**
   * @description Validate an array of resources, if one of them is invalid, the promise will be rejected
   */
  public static async validateArrayOrReject<T extends Resource>(
    objects: Partial<T>[],
    validatorOptions?: ValidatorOptions
  ) {
    const allSettled = await Promise.allSettled(
      objects.map(async (object) => object.validateOrReject?.(validatorOptions))
    );
    const rejected = allSettled.filter(
      (result) => result.status === "rejected"
    );
    if (rejected.length) return Promise.reject(rejected);
    return Promise.resolve();
  }
}
