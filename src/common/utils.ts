class Utils {
  static filterArrayByString(mainArr: any[], searchText: string): any[] {
    if (searchText === '') {
      return mainArr;
    }

    searchText = searchText.toLowerCase();

    return mainArr.filter((itemObj) => {
      return this.searchInObj(itemObj, searchText);
    });
  }

  static searchInObj(itemObj: Record<string, any>, searchText: string): boolean {
    for (const prop in itemObj) {
      if (!itemObj.hasOwnProperty(prop)) {
        continue;
      }

      const value = itemObj[prop];

      if (typeof value === 'string') {
        if (this.searchInString(value, searchText)) {
          return true;
        }
      } else if (Array.isArray(value)) {
        if (this.searchInArray(value, searchText)) {
          return true;
        }
      }

      if (typeof value === 'object') {
        if (this.searchInObj(value, searchText)) {
          return true;
        }
      }
    }
    return false;
  }

  static searchInArray(arr: any[], searchText: string): boolean {
    for (const value of arr) {
      if (typeof value === 'string') {
        if (this.searchInString(value, searchText)) {
          return true;
        }
      }

      if (typeof value === 'object') {
        if (this.searchInObj(value, searchText)) {
          return true;
        }
      }
    }
    return false;
  }

  static searchInString(value: string, searchText: string): boolean {
    return value.toLowerCase().includes(searchText);
  }

  static generateGUID(): string {
    function S4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return S4() + S4();
  }

  static toggleInArray(item: any, array: any[]): void {
    if (array.indexOf(item) === -1) {
      array.push(item);
    } else {
      array.splice(array.indexOf(item), 1);
    }
  }

  static sanitizeString(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/\W+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }

  static stringToSlug(t: string): string {
    return t
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  static findById(o: { id: object; [k: string]: any }, id: object): object | null {
    //Early return
    if (o.id === id) {
      return o;
    }
    let result, p;
    for (p in o) {
      if (o.hasOwnProperty(p) && typeof o[p] === 'object') {
        result = this.findById(o[p], id);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

  static randomMatColor(hue: string): string[] {
    hue = hue ? hue : '400';
    const mainColors = [
      'amber',
      'blue',
      'blueGrey',
      'brown',
      'common',
      'cyan',
      'deepOrange',
      'deepPurple',
      'green',
      'grey',
      'indigo',
      'lightBlue',
      'lightGreen',
      'lime',
      'orange',
      'pink',
      'purple',
      'red',
      'teal',
      'yellow',
    ];
    const randomColor = mainColors[Math.floor(Math.random() * mainColors.length)];
    return [randomColor, hue];
  }

  static getParameterByName(name: string, url: string) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  // Check if list of arguments are all true
  static isLoading(...args: boolean[]): boolean {
    for (var i = 0; i < args.length; ++i) if (args[i]) return true;
    return false;
  }

  static displayDate(timestamp: number): string {
    let d = new Date(timestamp);
    return [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/') + ' ' + [d.getHours(), d.getMinutes()].join(':');
  }

  static getInvitationLinkFormat(id: string, code: string): string {
    return `${window.location.origin}/#/classes/join?classId=${id}&role=STUDENT&code=${code}`;
  }

  static toCapitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static getFullName(firstName: string | undefined, lastName: string | undefined): string {
    return firstName && lastName ? `${Utils.toCapitalize(firstName)} ${Utils.toCapitalize(lastName)}` : ' ';
  }
}

export default Utils;
