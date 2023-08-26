/**
 * @je st-environment jsdom
 */
import React, {useEffect} from "react"
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'

import { UseReactBasicStoreProvider, ReactBasicStoreConsumer, useReactBasicStoreContext } from '../index'

const DummyComponent = () => {
    const formContext = useReactBasicStoreContext()
    useEffect(() => {
        formContext.dispatch({ dataRef: 'field1', value: 'some value' })
        formContext.dispatch({ dataRef: 'field2', value: 'some value' })
        formContext.dispatch({ dataRef: 'field2', value: 'some value second' })
    }, [])
    return (<div data-testid="dummyComponent">data looks like: {JSON.stringify(formContext.state)}</div>)
}

describe('React Basic Store', () => {
    it('should set correct data in the store', () => {
        render(
            <UseReactBasicStoreProvider>
                <ReactBasicStoreConsumer>
                    <DummyComponent />
                </ReactBasicStoreConsumer>
            </UseReactBasicStoreProvider>
        )
        expect(screen.getByTestId('dummyComponent')).toHaveTextContent(
            '{"field1":{"value":"some value"},"field2":{"value":"some value second"}}'
        )
    })
})