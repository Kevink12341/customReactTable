function includeFilter(this:any, row:{[key:string]:any}){
    if(row[this.Key].toLowerCase().includes(this.searchTerm)){
        return true
    }
    return false
};

function excludeFilter(this:any, row:{[key:string]:any}){
    if(row[this.Key].includes(this.searchTerm)){
        return false
    };
    return true
};

function greaterThanEqualsFilter(this:any, row:{[key:string]:any}){
    if(row[this.Key] >= Number(this.searchTerm)){
        return true
    };
    return false
};

function greaterThanFilter(this:any, row:{[key:string]:any}){
    if(row[this.Key] > Number(this.searchTerm)){
        return true
    };
    return false
};

const filters = {
    includeFilter,
    excludeFilter,
    greaterThanEqualsFilter,
    greaterThanFilter,
}

export default filters