import { Logger } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { snakeCase, camelCase } from 'lodash';

const logger = new Logger('expose-case.transformer');

type CaseType = 'snake_case' | 'camelCase';

/**
 * A factory function to create a custom {@link https://github.com/typestack/class-transformer#expose|@Expose} decorator for transforming property names
 * to a specified case type during serialization and deserialization.
 *
 * @param {CaseType} to - The target case type for the transformation.
 * @returns {PropertyDecorator} A decorator that transforms and exposes the field name.
 */
function caseConverterFactory(to: CaseType): PropertyDecorator {
  const transformer = (key: string) => {
    switch (to) {
      case 'snake_case':
        return snakeCase(key);
      case 'camelCase':
        return camelCase(key);
      default:
        return key;
    }
  };

  return (target: any, propertyKey: string) => {
    const transformedKey = transformer(propertyKey);
    Expose({ name: transformedKey })(target, propertyKey);
    logger.debug(`Exposing "${propertyKey}" field as "${transformedKey}" (${to})`);
  };
}

/**
 * A custom {@link https://github.com/typestack/class-transformer#expose|@Expose} decorator to map a property to its `snake_case` representation
 * for serialization and deserialization using `class-transformer`.
 *
 * Use this for APIs where database/entity fields use `snake_case`, and application logic uses `camelCase`.
 *
 * @example
 * // In a DTO class:
 * @ExposeSnakeCase()
 * someField: string; // Will be serialized as "some_field"
 *
 * @returns {PropertyDecorator} A decorator that exposes the field name in `snake_case`.
 */
export function ExposeSnakeCase(): PropertyDecorator {
  return caseConverterFactory('snake_case');
}

export function ExposeCamelCase(): PropertyDecorator {
  return caseConverterFactory('camelCase');
}
