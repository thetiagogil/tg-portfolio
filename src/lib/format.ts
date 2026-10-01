/** Fills "{name}" placeholders: fill("{n} of {total}", { n: 3, total: 7 }) → "3 of 7". */
export const fill = (
  template: string,
  values: Record<string, string | number>,
) =>
  template.replace(/\{(\w+)\}/g, (_, k: string) =>
    String(values[k] ?? `{${k}}`),
  );
