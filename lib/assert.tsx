export function assertHasProperty(
  obj: unknown,
  property: keyof string
): asserts obj is object & Record<typeof property, unknown> {
  if (!obj || typeof obj !== 'object' || !(property in obj)) {
    throw new Error(`Property ${String(property)} is not in object`);
  }
}

export function assertTruthy(value: unknown, message?: string): asserts value {
  if (
    value === false ||
    value === null ||
    value === undefined ||
    value === ''
  ) {
    throw new Error(`Value not truthy${message ? `: ${message}` : ''}`);
  }
}
