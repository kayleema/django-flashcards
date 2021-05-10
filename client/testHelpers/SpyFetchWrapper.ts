import {FetchWrapper} from "../src/CardsRepo";

export default class SpyFetchWrapper implements FetchWrapper {
    fetch_arg_url?: any
    fetch_arg_options?: any
    fetch_return_value?: any

    fetch(url: string, options?: {}): Promise<any> {
        this.fetch_arg_url = url
        this.fetch_arg_options = options
        return Promise.resolve(this.fetch_return_value)
    }
}

