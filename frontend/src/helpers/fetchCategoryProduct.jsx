const { default: SummaryApi } = require("../common")

const fetchCategoryProduct = async (category) => {
    const response = await fetch(SummaryApi.categoryProduct.url, {
        method: SummaryApi.categoryProduct.method,
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            category: category
        })
    })

    const dataResponse = response.json()

    return dataResponse
}

export default fetchCategoryProduct