function mySortFunction(data:Array<any>, key:any, direction?:string ): Array<any> {

    if(data[0][key] && direction || data[0][key] === 0){
        if(typeof(data[0][key]) == "string" && direction =="asc"){
            data = sortAscString(data, key)
        };
        if(typeof(data[0][key]) == "string" && direction =="desc"){
            data = sortDescString(data,key)
        };
        if(typeof(data[0][key]) == "number" && direction == "asc"){
            data = sortAscNumber(data,key)
        };
        if(typeof(data[0][key]) == "number" && direction == "desc"){
            data = sortDescNumber(data,key)
        };
    };
    return data
};

let sortAscString = (data:Array<any>, key:any) => {
    data.sort((a, b) => {
        const keyA:any = a[key] != undefined ? a[key].toString().toLowerCase() : "";
        const keyB:any = b[key] != undefined ? b[key].toString().toLowerCase() : "";
        return keyA < keyB ? -1 : 1
    })
    return data;
};

let sortDescString = (data:Array<any>, key:any) => {
    data.sort((a, b) => {
        const keyA:any = a[key] != undefined ? a[key].toString().toLowerCase() : "";
        const keyB:any = b[key] != undefined ? b[key].toString().toLowerCase() : "";
        return keyA > keyB ? -1 : 1
    });
    return data;
};

let sortAscNumber = (data:Array<any>, key:any) => {
    data.sort((a, b) => {
        const keyA:any = a[key] != undefined ? a[key] : 0;
        const keyB:any = b[key] != undefined ? b[key] : 0;
        return keyA < keyB ? -1 : 1
    })
    return data;
};

let sortDescNumber = (data:Array<any>, key:any) => {
    data.sort((a, b) => {
        const keyA:any = a[key] != undefined ? a[key] : 0;
        const keyB:any = b[key] != undefined ? b[key] : 0;
        return keyA > keyB ? -1 : 1
    })
    return data;
};



export default mySortFunction