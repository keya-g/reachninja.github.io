
document.body.style.backgroundColor = "black";
let gameCanvas = document.getElementById("gameCanvas");
let ctx = gameCanvas.getContext("2d");
let scoreCanvas = document.getElementById("leftCanvas");
let sc_ctx = scoreCanvas.getContext("2d");
let timeCanvas = document.getElementById("rightCanvas");
let tm_ctx = timeCanvas.getContext("2d");

function getTimeS(){
    var d = new Date();
    return (d.getTime()/1000)
}

function clearCanvas(curr_canvas, fill_color = "black"){
        var ctx = curr_canvas.getContext("2d");
        ctx.clearRect(0, 0, curr_canvas.width, curr_canvas.height);
        ctx.fillStyle = fill_color;
        ctx.fillRect(0, 0, curr_canvas.width, curr_canvas.height);
    }

function drawBG() {
    // Make the gameCanvas background white
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function norm(val_og_array){
    var norm_val = 0;
    for(c = 0; c<val_og_array.length; c++){
        norm_val += Math.pow(val_og_array[c],2);
    }
    norm_val = Math.pow(norm_val,1/2);
    return norm_val;
}

function arraySum(og_array1, og_array2){

    // // console.log(og_array1); // console.log(og_array2);
    if (og_array1.length != og_array2.length){console.log("og_array sum error"); return 0;}
    var sum = new Array();
    sum[0]=undefined;
    sum.length = og_array1.length;
    for(c = 0; c<og_array1.length; c++){
        sum[c] = og_array1[c] + og_array2[c];
    }
    return sum;
}

function scaleArray(og_array,scalar){
    // console.log(og_array,scalar);
    var newog_array = new Array();
    newog_array[0] = undefined;
    newog_array.length = og_array.length;
    for (c = 0; c<og_array.length; c++){
        newog_array[c] = og_array[c]*scalar;
    }
    return newog_array;
}

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

function arrayClamp(og_array, min, max) {
    // // console.log(og_array, min, max);
    for(c = 0; c < og_array.length; c++){
        num = og_array[c];
        og_array[c] = clamp(num, min, max); //(num <= min ? min : num >= max ? max : num);
    }
    return og_array;
}

function arrayDot(array1, array2){
    var dotproduct = 0;
    for (c = 0; c < array1.length; c++){
        dotproduct += array1[c]*array2[c];
    }
    return dotproduct;
}

function arrayElementWise(array1,array2){
    newarray = array1;
    for(c = 0; c<array1.length;c++){
        newarray[c] = array1[c]*array2[c];
    }
    return newarray;
}

function arrayScalarSum(og_array, scalar){
    var sum = new Array();
    sum[0] = undefined;
    sum.length = og_array.length;
    for(c = 0; c<og_array.length; c++){
        sum[c] = og_array[c] + scalar;
    }
    return sum;
}

function vectroMatrixProduct(array,mat){
    var newmat = mat;
    for (c = 0; c<mat.length;c++){
        newmat[c] = arrayElementWise(array,mat[c]);
    }
    return newmat;
}

function scaleMatrix(mat, scalar){
    var newmat = mat;
    for(c = 0; c < mat.length; c++){
        for (b = 0; b < mat[c].length; b++){
            newmat[c][b] = scalar*mat[c][b];
        }
    }
    return newmat
}


