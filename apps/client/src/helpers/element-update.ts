export const elementUpdate = (
  element: Element,
  key: string,
  value?: string | number
): void => {
  if (value) {
    element.setAttribute(key, String(value));

    return;
  }

  const isExists = element.getAttribute(key);

  if (isExists) {
    element.toggleAttribute('isshown', false);

    return;
  }

  element.toggleAttribute('isshown', true);
};
