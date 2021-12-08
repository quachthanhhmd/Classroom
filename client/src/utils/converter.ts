export function removeAccents(str) {
    var AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ", "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ"    
    ];
    for (var i=0; i<AccentsMap.length; i++) {
      var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  }
export const getDateFormat = (date: Date) => {
    
    const newDate = new Date(date);
    if (sameDay(newDate, new Date())) {
        return `${`0${newDate.getHours()}`.substr(-2)}: ${`0${newDate.getMinutes()}`.substr(-2)}`
    }
    return `${newDate.getDay()} thg ${newDate.getMonth() + 1}`;
}

export const getDateTimeFormat = (date: Date) => {
    const newDate = new Date(date);
    return `${`0${newDate.getHours()}`.substr(-2)}:${`0${newDate.getMinutes()}`.substr(-2)}, ${newDate.getDay()} thg ${newDate.getMonth() + 1}`;
}

export const getDayFormat = (date: Date) => {
    const newDate = new Date(date);
    return `${newDate.getDay()}/${newDate.getMonth() + 1}`;
}

export const getTimeFormat = (date: Date) => {
    const newDate = new Date(date);
    return `${`0${newDate.getHours()}`.substr(-2)}:${`0${newDate.getMinutes()}`.substr(-2)}`;
}

export const sameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}

export const isRatherZero = (n: string) => {
    if (Number(n) && Number(n) > 0) return true;
    return false;
}