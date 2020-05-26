import hostInReducer  from '../../src/reducers/hostInReducer';
import {getCharCode} from '../../src/parsers/parser';
import {hostIn,hostInBlockConsumed,hostInRtcConsumed} 
from '../../src/reducers/hostInReducer';

describe('reducer ', () => {
    const reducer=hostInReducer({statusRequest:getCharCode('?')});

    test('divide entrada en salida',()=>{
        let initialState={
            buffer: Buffer.from("foo"),
            blocks: [],
            rtcs: [],
            lastId: 0
        };
       
        let newState=reducer(initialState,
            hostIn(Buffer.from("bar?ba\nr2")));
        
        const expected = {
            buffer: Buffer.from("r2"),
            blocks: [
                {
                    id: 2,
                    type:'block',
                    payload: "foobarba"
                }],
            rtcs: [{id:1,type:'rtc',payload:getCharCode('?')}],
            lastId:2
        };
        //console.log("new state="+JSON.stringify(newState));
        //console.log("expected="+JSON.stringify(expected))
        expect(newState).toEqual(expected);
    });

    test('se puede consumir bloque',()=>{
        let initialState={
            buffer: Buffer.from("foo"),
            blocks: [
            {
                id:4,
                type:'block',
                payload:"foo"
            },
            {
                id:5,
                type:'block',
                payload:"bar"
            }
            ],
            rtcs: [],
            lastId: 0
        };
        let newState=reducer(initialState, hostInBlockConsumed(4));
 
        let expected={
            buffer: Buffer.from("foo"),
            blocks: [
                {
                    id:5,
                    type: 'block',
                    payload:"bar"
                }
            ],
            rtcs: [],
            lastId: 0
        };
        //console.log("new state="+JSON.stringify(newState));
        //console.log("expected="+JSON.stringify(expected))

        expect(newState).toEqual(expected);
    });

    test('se puede consumir rtc',()=>{
        let initialState={
            buffer: Buffer.from("foo"),
            blocks: [],
            rtcs: [
                {
                    id:4,
                    type:'rtc',
                    payload:22
                },
                {
                    id:5,
                    type:'rtc',
                    payload:23
                }
            ],
            lastId: 0
        };
        let newState=reducer(initialState, hostInRtcConsumed(4));
 
        let expected={
            buffer: Buffer.from("foo"),
            blocks: [],
            rtcs: [{
                id:5,
                type:'rtc',
                payload:23
            }],
            lastId: 0
        };
        //console.log("new state="+JSON.stringify(newState));
        //console.log("expected="+JSON.stringify(expected))

        expect(newState).toEqual(expected);
    });

 
});