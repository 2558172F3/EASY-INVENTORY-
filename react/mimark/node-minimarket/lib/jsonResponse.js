exports.jsonResponse = (statusCode, res, body) => {
    return{
        statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(body)
    }

    
}