import Cookies from 'js-cookie';

export const addHttps = (text:string) => {
  if (text?.includes("https://")){
      return text
  } else if (text?.includes("http://")){
      return text.replace("http://","https://")
  } else {
      return `https://${text}`
  }
}

export const getAccessToken = () => {
    return Cookies.get('accessToken');
};


function isEmptyObj(obj:any) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }

    return true;
}

function isObj(variable:any){
    return typeof variable === 'object'
}

export function uuidV4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}


export function objToArray(obj: any) {
    return Object.keys(obj).map((key) => obj[key]);
}

export function secondsToMinutesAndSeconds(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}


function onlyUnique(value: string, index: number, array: string[]) {
    return array.indexOf(value) === index;
}

export function filterArrayUniqueValues(arr: string[]) {
    return arr.filter(onlyUnique);
}

export function groupBy(array: any[], key: string) {
    try {
        return array.reduce((acc, item) => {
            acc[item[key]] = acc[item[key]] || [];
            acc[item[key]].push(item);
            return acc;
        }, {});
    } catch (error) {
        console.log(error, "groupBy");
        return {};
    }
}

export function objectToArray(obj: any, collectKeys: string[]) {
    try {
        return Object.keys(obj).map((key) => {
            const collected = collectKeys.reduce((acc, collectKey) => {
                acc[collectKey] = obj[key][0][collectKey];
                return acc;
            }, {} as Record<string, any>);
    
            return {
                items: obj[key],
                ...collected
            };
        });
    } catch (error) {
        return [];
    }
}


export function getRandomItemsFromArray(arr: any[], count: number) {
    return arr.sort(() => Math.random() - 0.5).slice(0, count);
}

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}   

export function filterArrayBySearchParams(arr: any[], searchParams: any, key: string = "name") {
    return arr.filter(item => searchParams?.includes(item[key]?.trim()) || searchParams?.includes(item[key]?.toLowerCase()?.trim()));
}

export function parseSearchParams(searchParams: any, keyByType: {key: string, type: 'string' | 'array'}[] = []) {
    return keyByType.reduce((acc: Record<string, any>, keyType) => {
        if (keyType.type === 'array') {
            acc[keyType.key] = typeof searchParams[keyType.key] === 'string' ? searchParams[keyType.key]?.split(',') : searchParams[keyType.key];
        } else {
            acc[keyType.key] = searchParams[keyType.key];
        }
        return acc;
    }, {});
}


export function stringToUrlEncode(string: string) {
    return encodeURIComponent(string);
}