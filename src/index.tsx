import { set } from 'lodash'
import React, { createContext, ReactNode, useContext, useReducer } from 'react'

export type InputValueTypes = string | number | boolean

type changedInputValueType = {
    dataRef: string // dataRef will be a string that points to the path in the store object i.e. employer.0.employer_name or employer_name
    value?: InputValueTypes
    valid?: boolean
    shown?: boolean
    afterChangeHandler?: () => void
}
export type ReactBasicStoreType = {
    state: Record<string, unknown>
    dispatch: (val: changedInputValueType) => void
}

const ReactBasicStore = createContext<ReactBasicStoreType>({
    state: {},
    dispatch: () => {},
})

const contextReducer = (
    state: Record<string, unknown>,
    changedInputValue: changedInputValueType
) => {
    const updatedState = Object.assign({}, state)
    set(updatedState, changedInputValue.dataRef, {
        value: changedInputValue.value,
        valid: changedInputValue.valid,
        shown: changedInputValue.shown,
    })
    if (changedInputValue.afterChangeHandler) {
        changedInputValue.afterChangeHandler() // executing the after change handler, if there is anything which should be done after the dispatch method is called.
    }
    return updatedState
}

const UseReactBasicStoreProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(contextReducer, {})
    return <ReactBasicStore.Provider value={{ state, dispatch }}>{children}</ReactBasicStore.Provider>
}

const useReactBasicStoreContext = () => {
    return useContext(ReactBasicStore)
}

const ReactBasicStoreConsumer = ({ children }: { children: ReactNode }) => {
    return (
        <ReactBasicStore.Consumer>
            {(): ReactNode => {
        return children
    }}
    </ReactBasicStore.Consumer>
)
}

export { UseReactBasicStoreProvider, useReactBasicStoreContext, ReactBasicStoreConsumer }
