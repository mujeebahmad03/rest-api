import { Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
  constructor() {}

  convertStringToObject(
    text: string,
    separator: string,
    subSeparator: string,
  ): any {
    if (!text || text.trim().length === 0) {
      return null;
    }
    const items = text.split(separator);
    const result = items.reduce((acc, item) => {
      if (item) {
        const keyValuePair = item.split(subSeparator);
        const key = keyValuePair[0]?.trim();
        const value = keyValuePair[1];
        if (key && value !== undefined) {
          acc[key] = value;
        }
      }
      return acc;
    }, {});
    return result;
  }
}
