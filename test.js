let errors ={
    title1: {
        message: "hello"
    }
}

let output = `form-control ${errors.title ? "is-invalid":""}`
console.log(output)