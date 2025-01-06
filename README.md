- A factory function to create a custom {@link https://github.com/typestack/class-transformer#expose|@Expose} decorator for transforming property names
to a specified case type during serialization and deserialization.

- A custom {@link https://github.com/typestack/class-transformer#expose|@Expose} decorator to map a property to its `snake_case` representation
for serialization and deserialization using `class-transformer`.
Use this for APIs where database/entity fields use `snake_case`, and application logic uses `camelCase` or vice-versa.
Example:
```Typescript
// In a DTO class
@ExposeSnakeCase()
someField: string; // Will be serialized as "some_fiel

@ExposeCamelCase()
 some_field: string; // Will be serialized as "someField"
```
