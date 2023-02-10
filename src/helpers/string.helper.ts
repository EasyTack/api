export class StringHelper {
  static toSnakeCase(str: string) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
  }

  static toCamelCase(str: string) {
    return str.replace(/(\_\w)/g, function (m) {
      return m[1].toUpperCase();
    });
  }
}
