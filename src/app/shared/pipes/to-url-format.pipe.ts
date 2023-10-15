import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toUrlFormat'
})
export class ToUrlFormatPipe implements PipeTransform {
  //transform text to valid url param
  transform(value: string): string {
    return value?.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/”/g, '')
      .replace(/:/g, '')
      .replace(/\//g, '-')
      .replace(/\\/g, '-');

  }

}
