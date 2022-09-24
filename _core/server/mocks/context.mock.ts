import {v4 as uuidv4} from "uuid";

export default () => {
    const invocationId = uuidv4();
    return {
        log: {
            error: jest.fn(),
            warn: jest.fn(),
            info: jest.fn(),
            verbose: jest.fn()
        },
        done: jest.fn(),
        res: {},
        invocationId,
        executionContext: {
            invocationId,
            functionName: "test",
            functionDirectory: "test"
        },
        traceContext: {
            traceparent: null,
            tracestate: null,
            attributes: {}
        },
        bindings: {},
        bindingData: {},
        bindingDefinitions: []
    }
}