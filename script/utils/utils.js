const sortArray = (input, attribute, haveAttr = true) => {
    let output = [];
    let inserted;

    for (let i = 0, ii = input.length ; i < ii ; i++){
        inserted = false;
        for (let j = 0, jj = output.length ; j < jj ; j++){
            if (haveAttr) {
                if (input[i][attribute] < output[j][attribute]){
                    inserted = true;
                    output.splice(j, 0, input[i]);
                    break;
                }
            }else {
                if (input[i] < output[j]){
                    inserted = true;
                    output.splice(j, 0, input[i]);
                    break;
                }
            }
        }
        if (!inserted)
            output.push(input[i])
    }
    return(output);
}

const extractAttributesFromArrayObject = (ArrayObject, attribute) => {
    let output = [];

    for (const object of ArrayObject) {
        output.push(object[attribute]);
    }
    return output;
}

const every = (array1, array2) => {
    for (let i = 0; i < array2.length; i++) {
        if (!array1.includes(array2[i])) {
            return false;
        }
    }
    return true;
}