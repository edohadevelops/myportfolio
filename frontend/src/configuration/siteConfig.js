const environment = {
    production: {
        API_BASE_URL: import.meta.env.PRODUCTION_API_BASE_URL
    },
    development: {
        API_BASE_URL: import.meta.env.DEVELOPMENT_API_BASE_URL
    }
}

const currentEnvironment = "production";

export default environment[currentEnvironment]